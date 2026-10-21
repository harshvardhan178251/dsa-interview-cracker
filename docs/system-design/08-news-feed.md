---
title: Design a news feed
order: 8
summary: Facebook's news feed — pull vs push vs hybrid fan-out, the ranking layer, and why the naive "fan out on write" design breaks at scale.
---

# Design a news feed

*The classic fan-out design question.*

## Requirements

**Functional**
- `GET /feed?userId=X` returns the top N posts from the people X follows.
- `POST /posts` creates a post.

**Non-functional**
- Feed reads dominate: **100:1** read:write.
- A feed should load in **under 200 ms**.
- Roughly 1B users, ~500M posts/day.
- A user may follow up to 5,000 people.

**Estimates**

```
500M posts/day ≈ 5,800 posts/s average
1B users × 20 feed loads/day = 20B feed reads/day ≈ 230,000 reads/s average
Peak ≈ 20× → ~4.6M reads/s at peak
```

## The core question: pull or push?

This single decision defines the design.

### Push (fan-out on write)

When a post is created, write it into the feed table of **every follower**.

```
User A posts
  → look up 5,000 followers
  → insert the post into 5,000 feed tables
```

| Pro | Con |
|---|---|
| Read is a single indexed lookup — very fast | Write is O(followers) — expensive |
| | A user with 1M followers makes writing a post cost 1M writes |
| | Storage explodes: posts × followers × copies |

### Pull (fan-out on read)

When a feed is requested, gather the latest posts from each followee at read time.

```
GET /feed?userId=X
  → get X's 5,000 followees
  → fetch the latest post from each
  → merge, rank, take top N
```

| Pro | Con |
|---|---|
| Write is O(1) | Read is O(followees) — slow |
| Storage is one copy per post | Needs a fan-out service to fetch in parallel |

### Hybrid — what production actually does

**Push for normal users, pull for celebrities.**

```
Post created
  → if followers <= threshold (say 1,000): push to all follower inboxes
  → else: mark the post "pull" and let readers fetch it at read time
```

At read time:
1. Read the pushed inbox (fast, single lookup).
2. Merge in the pull-mode posts from high-fanout followees.
3. Rank and take the top N.

**This is the answer that shows you understand the trade-off.** Pure push fails for
celebrities; pure pull is too slow for everyone.

## Data model

```sql
-- The post itself
CREATE TABLE posts (
  id          BIGSERIAL PRIMARY KEY,
  user_id     BIGINT NOT NULL,
  content     TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Pushed inbox entries (only for followees with < threshold followers)
CREATE TABLE feed_entries (
  user_id     BIGINT NOT NULL,   -- the feed owner
  post_id     BIGINT NOT NULL,
  created_at  TIMESTAMPTZ NOT NULL,
  PRIMARY KEY (user_id, post_id)
);
CREATE INDEX idx_feed_user_created ON feed_entries (user_id, created_at DESC);

-- The follow graph
CREATE TABLE follows (
  follower_id BIGINT NOT NULL,
  followee_id BIGINT NOT NULL,
  PRIMARY KEY (follower_id, followee_id)
);
CREATE INDEX idx_follows_followee ON follows (followee_id);
```

**The `feed_entries` primary key `(user_id, post_id)`** makes the push idempotent — a
retried write does not duplicate the entry.

## The read path

```
GET /feed?userId=X
  1. Read the pushed inbox: SELECT post_id FROM feed_entries
       WHERE user_id = X ORDER BY created_at DESC LIMIT 100
  2. Find high-fanout followees whose posts are not in the inbox
  3. Fan out in parallel: fetch the latest posts from each
  4. Merge, rank, deduplicate, take the top N
```

Steps 1 and 3 run **in parallel** — step 3 is a set of independent calls to a fan-out
service. Use a scatter-gather with a timeout: if the fan-out does not return within 50 ms,
serve the inbox alone.

**Cache the feed itself.** For a high-traffic user, cache the rendered top-100 for a few
minutes. Most feed reads are the same user reading the same feed.

## Ranking

Raw reverse-chronological is not a good feed. Real ranking uses:

```
score = w1·recency + w2·affinity + w3·engagement + w4·quality − w5·penalty
```

| Signal | How to compute it |
|---|---|
| **Recency** | Exponential decay: `exp(-Δt / τ)` |
| **Affinity** | Interaction count between the two users, normalised |
| **Engagement** | Likes, comments, shares, weighted by how soon they arrived |
| **Quality** | Spam score, clickbait detection, author reputation |
| **Penalty** | Already seen, hidden by the user, muted author |

**Affinity is the expensive part.** Computing it per request is too slow. Precompute an
affinity score per (user, author) pair nightly in a batch job, and store it in a table
that the ranker joins.

**Diversity.** Take the top candidates by score, then apply a rule like "no more than 3
posts from the same author in the top 20". A feed of one author looks broken even if the
scores are technically correct.

## Write path

```
POST /posts
  → insert the post
  → find followers
  → for each follower with < threshold followers:
        INSERT INTO feed_entries (user_id, post_id, created_at)
  → publish a "post created" event to a queue for:
        · fan-out to high-fanout followers' pull caches
        · analytics
        · notifications
```

**Do the fan-out asynchronously for anything large.** If a post has 100k followers, the
push should not happen in the request path — publish an event and let workers do it.

**Idempotency matters** here because fan-out is retried. The unique primary key handles it.

## Storage estimate

```
Pushed entries = posts × avg followers (capped at threshold)
≈ 500M/day × 500 avg = 250B entries/day — too much
```

With the hybrid model, cap pushes at 1,000 followers:

```
≈ 500M/day × min(followers, 1000) ≈ realistic total of tens of billions/day
```

Even that is large. Real systems:
- Keep only the last few hundred entries per user's inbox (a ring buffer).
- **Periodically trim** old inbox entries — a user only cares about recent posts.
- Store the feed as a bounded list, not an unbounded table.

## Optimisation techniques worth naming

| Technique | Effect |
|---|---|
| **Feed cache** | Precompute the top-N feed per user, refreshed every few minutes |
| **Materialised view** | A denormalised feed table maintained by a stream processor |
| **Incremental fan-out** | Only push to followers who actually read |
| **Notification trimming** | Keep the last 100 entries per inbox |
| **Precomputed candidate sets** | Pre-rank candidates offline; rank online only within the candidate set |
| **Two-stage ranking** | A cheap model narrows 1,000 candidates to 100; an expensive model ranks those 100 |

## Failure modes

| Failure | Mitigation |
|---|---|
| The fan-out service is down | Serve the pushed inbox only; catch up from the queue later |
| A celebrity posts and the fan-out queue explodes | Scale workers on queue depth; the pull path still works |
| The ranking service is slow | Serve reverse-chronological from the inbox |
| A user's follow list is huge | Cap the number of followees consulted per read |
| The cache is cold | Fall back to the inbox query |

## Monitoring

- Feed latency p99 (the product's core promise).
- Inbox size distribution — a user with 100k entries means the trimming job is failing.
- Push lag: time between a post being created and appearing in followers' inboxes.
- Fan-out queue depth.
- Cache hit ratio on the feed cache.

## Follow-ups to expect

- **"Why not just push to everyone?"** → because a celebrity with 100M followers would make
  posting a 100M-write operation.
- **"How do you deduplicate?"** → the primary key `(user_id, post_id)` on push, plus a
  `DISTINCT` on post id when merging the pull results.
- **"What if a user unfollows someone?"** → delete their inbox entries (a background job,
  since it can be many rows) and filter at read time in the meantime.
- **"How do you handle a deleted post?"** → soft-delete, and filter at read time. The
  entries can be cleaned up lazily.
- **"How do you test this?"** → property-based testing of the merge and rank logic;
  replay a recorded dataset and assert the ordering invariants.
