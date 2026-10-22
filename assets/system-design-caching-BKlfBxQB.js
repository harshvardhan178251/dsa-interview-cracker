var e=`system-design:caching`,t=`
# Caching

Caching is the single highest-leverage thing you can do in a system design round. It is also
the single most common source of "correct but wrong" designs, because people add a cache
without ever saying **when the entry becomes invalid**.

---

## The three questions

Every cache design must answer these. Say them out loud.

1. **What is the key?** Usually \`<entity type>:<id>\` plus any parameters that change the
   result. A cache key that omits a parameter is a correctness bug.
2. **What is the TTL?** How stale is too stale?
3. **How is it invalidated?** TTL only? On write? On an event?

If you cannot answer all three, do not add the cache.

---

## Where the cache sits

\`\`\`
Client ──▶ CDN ──▶ Load Balancer ──▶ API Server ──▶ Cache ──▶ Database
                              │                         (miss)
                              └──▶ API Server ─────────────┘
\`\`\`

Read the diagram as: the API server is the **only** component that talks to both the cache
and the database. Clients never touch the cache directly, and the database never knows a
cache exists.

### Cache-aside (read-through on demand)

The pattern you will use 90% of the time.

\`\`\`java
String value = cache.get(key);
if (value == null) {
    value = loadFromDatabase(key);      // may be null
    if (value != null) {
        cache.set(key, value, ttl);     // only cache what exists
    }
}
return value;
\`\`\`

**Why cache-aside wins:**
- The cache holds only what has actually been requested (no wasted space on preloading).
- If the cache is down, the app still works — it just goes to the database.
- You control the TTL per entry.

**The cost:** on a cold cache, every request misses and hits the database. That is the
**thundering herd** problem.

---

## Eviction policies

| Policy | How it works | When to use |
|---|---|---|
| **LRU** | Evicts the least recently used | The default. Most real workloads are recency-shaped |
| **LFU** | Evicts the least frequently used | Skewed access (one hot item, many one-hit items) |
| **TTL** | Entries expire at a fixed time | When staleness has a hard bound |
| **Random** | Evicts at random | When all entries cost the same |
| **ARC / 2Q** | Balances recency and frequency | Mixed workloads; adaptive |

**LRU in O(1)** needs a hash map plus a doubly linked list: the map gives you O(1) lookup
and O(1) "move to front"; the list gives you O(1) eviction of the tail. That is exactly
the [LRU cache design](../lld/01-lru-cache.md) problem.

**Note on real caches:** Redis's default eviction is *approximate* LRU — it samples a few
keys rather than maintaining a perfect order, which is much cheaper. Do not implement
perfect LRU in production.

---

## Invalidation strategies

| Strategy | How | Pros | Cons |
|---|---|---|---|
| **TTL only** | Entry expires after N seconds | Dead simple | Stale by up to N seconds |
| **Write-through** | Every write updates the cache too | Never stale from a write | Write latency doubles; needs cache write to succeed |
| **Write-behind (write-back)** | Write to DB, update cache asynchronously | Fast writes | Data loss if the cache dies before the flush |
| **Event-driven** | A domain event invalidates the key | Precise, decoupled | Eventual consistency; needs a reliable bus |
| **Delete on write** | Writes delete the key | Simple | Cache miss storm on hot keys |
| **Versioned keys** | \`key:version\`, bump the version on write | No invalidation logic at all | Version storage grows; lookup is a bit more work |

### The stale-read problem

> User A updates their profile. User B reads the profile from the cache and sees the old
> version.

Options, in increasing order of correctness and cost:

1. **Accept it.** If the staleness window is acceptable (a display name, a follower count),
   say so and move on. This is a legitimate answer, not a cop-out.
2. **Short TTL.** Bounded staleness, no extra infrastructure.
3. **Delete on write.** The next read repopulates. Introduces a miss.
4. **Event-driven invalidation.** Precise, but the invalidation event can itself be delayed.
5. **Strong consistency.** Bypass the cache for reads of that entity — usually not worth it.

**Say which one you are choosing and why.** "I'll use a 60-second TTL because profile
updates are rare and 60 seconds of staleness is acceptable" is a complete answer.

---

## The thundering herd

1000 concurrent requests for a key that is not cached → 1000 identical database queries.

### Request coalescing (single-flight)

\`\`\`java
// One thread loads; the rest wait for it.
CompletableFuture<String> future = inflight.computeIfAbsent(key, k -> {
    CompletableFuture<String> f = new CompletableFuture<>();
    executor.execute(() -> {
        try {
            f.complete(loadFromDatabase(key));
        } catch (Exception e) {
            f.completeExceptionally(e);
        } finally {
            inflight.remove(k);
        }
    });
    return f;
});
return future.get();
\`\`\`

### Probabilistic early expiry

Instead of expiring at exactly 300 s, expire at \`300 − rand(0, 30)\` seconds. Only one
request per window finds the entry expired and refreshes it; the rest keep serving the
(about to be refreshed) cached value. No coordination needed.

### Stale-while-revalidate

Serve the stale value immediately and refresh it in the background. The user never waits.
Best for latency-sensitive reads.

---

## Cache stampede on write

If 10,000 users update the same hot key at once, you get 10,000 cache deletes followed by
10,000 misses.

Mitigations:
- **Write-behind with batching** — coalesce the invalidations.
- **Jitter the TTL** so the keys do not expire together.
- **Local cache in front of the distributed cache** (see below) — absorbs the burst.

---

## Distributed cache vs local cache

| | Local (in-process) | Distributed (Redis) |
|---|---|---|
| Latency | ~nanoseconds | ~1 ms |
| Consistency | Per-node, stale | Shared, consistent-ish |
| Memory | Bounded by the box | Shared |
| Invalidation | Must be broadcast | Central |
| Best for | Very hot, small, read-mostly keys | General-purpose |

**The two-level cache** (local in front of Redis) is the standard high-performance design:
local cache absorbs the bulk of the reads, and you broadcast invalidations to other nodes
when an entry changes.

---

## What to cache (and what not to)

**Good candidates:**
- Expensive to compute, cheap to store, read far more than written.
- Read-heavy entities: user profiles, product details, feed fragments.
- Aggregates that change slowly: follower counts, view counts, leaderboards.

**Bad candidates:**
- Anything the user must see immediately after their own write (unless you write-through).
- Highly personalised, per-request data — the hit rate will be near zero.
- Very large objects that evict everything else from the cache.
- Secrets and credentials, unless you are using a dedicated secret store.

---

## Common interview traps

| Trap | What to say |
|---|---|
| "I'll add Redis" with no invalidation strategy | Always answer: key, TTL, invalidation |
| "Cache the whole user object" | Say which fields are hot; caching everything wastes memory and creates write amplification |
| "Consistent hash for cache nodes" | Only if you actually shard the cache. Say why the key distribution is even |
| Ignoring the cold start | Mention lazy warming, or a preload job |
| Ignoring the stampede | Mention coalescing or early expiry proactively |
| "The cache will have high hit rate" | Quantify: request rate × object size vs cache memory |
| No eviction policy named | Name LRU and say why |

---

## Numbers worth quoting

- A typical Redis instance handles **100,000+ ops/second** on a modest box.
- A cache hit is roughly **0.1–1 ms** over the network; a database query is **1–10 ms**;
  a disk-backed query is **10–100 ms**.
- Aim for a **hit rate above 90%** on a read-through cache. Below that, the cache is
  costing you more in complexity and memory than it saves in latency.
- A good rule of thumb: the cache should be sized so the working set fits. **Cache size
  ≈ hot data size × 2–3**, not the whole dataset.
`,n={id:e,body:t};export{t as body,n as default,e as id};