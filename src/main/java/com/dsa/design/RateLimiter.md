---
title: Rate Limiter
leetcode: null
difficulty: Medium
patterns: [Design, Sliding window, Rate limiting]
companies: [Amazon, Salesforce, Goldman Sachs, Tech Mahindra, Freshworks, Ernst & Young]
frequency: 4
tags: [sliding window, deque, system design]
sampleInput: |
  2 10
  5
  0
  0
  1
  11
  12
sampleOutput: |
  1
  1
  0
  1
  1
---

# Rate Limiter

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Design · Sliding window · Rate limiting |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Uber, Stripe, Cloudflare |

## Problem Statement

A rate limiter allows at most `capacity` requests inside any window of `window` seconds.
Every request that arrives is either **allowed** or **rejected**.

The request timestamps arrive in non-decreasing order. A request at time `t` counts
towards the limit of every window that contains `t`, so the interesting state is
"requests that are still inside the window".

## Input Format

```
capacity window
n
t1
t2
...
tn
```

- `capacity window` — the limit and the window length in seconds (first line).
- `n` — the number of requests.
- `t1..tn` — the request timestamps, non-decreasing.

The program prints one line per request: `1` when the request is allowed, `0` when it is
rejected.

## Sample Input

```
2 10
5
0
0
1
11
12
```

## Expected Output

```
1
1
0
1
1
```

At `t = 0` and `t = 0` the window `(−10, 0]` holds 0 and then 1 requests, so both are
allowed. At `t = 1` the window `(−9, 1]` already holds 2 requests → rejected. At
`t = 11` the two requests from `t = 0` fell out of the window `(1, 11]` → allowed again.

## Approach — a deque of the requests still inside the window

The window is half open: a request at time `t` is inside the window of a later request at
time `t'` exactly when `t' - window < t <= t'`. That means the request at `t` expires as
soon as a request arrives at `t + window` or later.

Keep a deque of the timestamps that are still alive:

1. **Evict** every timestamp `<= t - window` from the front — those requests left the
   window.
2. If the deque holds **fewer than `capacity`** timestamps → allow the request and push
   `t` at the back.
3. Otherwise → reject it (and do not push anything).

The deque never holds more than `capacity` entries, and every timestamp is pushed once
and popped once, so the whole run is O(n) amortised.

**Fixed window vs sliding window.** The classic cheap alternative counts requests per
calendar window (`floor(t / window)`), which allows `2 * capacity` requests around a
boundary. The sliding window above never does that.

## Dry Run

`capacity = 2`, `window = 10`. The deque column shows the live window, oldest first.

| Step | Request `t` | Evicted (`<= t - 10`) | Deque before | Size | Allowed? | Deque after | Output |
|---:|---:|---|---|---:|---|---|---|
| 1 | 0 | — | `[]` | 0 | yes (0 < 2) | `[0]` | `1` |
| 2 | 0 | — | `[0]` | 1 | yes (1 < 2) | `[0, 0]` | `1` |
| 3 | 1 | — | `[0, 0]` | 2 | **no** (2 ≥ 2) | `[0, 0]` | `0` |
| 4 | 11 | `0`, `0` (`<= 1`) | `[0, 0]` | 0 | yes (0 < 2) | `[11]` | `1` |
| 5 | 12 | — (`<= 2`, none) | `[11]` | 1 | yes (1 < 2) | `[11, 12]` | `1` |

Step 4 is the interesting one: the two rejected requests of step 3 were *not* stored, so
they did not keep the window busy. Only allowed requests occupy a slot.

## Java Solution

See [`RateLimiter.java`](./RateLimiter.java).

```java
public boolean allow(long timestamp) {
    while (!hits.isEmpty() && hits.peekFirst() <= timestamp - window) {
        hits.pollFirst();                       // the request left the window
    }
    if (hits.size() >= capacity) {
        return false;                           // the window is full
    }
    hits.addLast(timestamp);
    return true;
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(1) amortised per request | each timestamp is pushed once and popped once |
| **Space** | O(capacity) | the deque never holds more than `capacity` timestamps |

## Interview Notes

**Follow-ups to raise yourself:**
- *"How would you scale this to many machines?"* → a shared store (Redis `INCR` +
  `EXPIRE`) or a token bucket per API key in the gateway; the sliding window itself does
  not move.
- *"Token bucket vs leaky bucket vs fixed window?"* → token bucket allows bursts up to the
  bucket size and refills at a fixed rate; the leaky bucket smooths the output rate.
- *"What about per-user limits?"* → keep a limiter per key, e.g. a `Map<String, Limiter>`
  with eviction of idle entries.
- *"How would you handle 10 million requests per second?"* → shard the counters by key
  hash, pre-allocate, and use a hierarchical limiter (local + global).

**Common mistakes:**
- ❌ Evicting with `<` instead of `<=` — a request exactly `window` seconds old has
  already left the window.
- ❌ Pushing the timestamp of a **rejected** request → rejected requests would keep
  blocking later ones.
- ❌ Using `Math.abs` style rounding on the window boundary.
- ❌ Forgetting that the timestamps may repeat — the deque holds duplicates, one per
  request.

**How to narrate:**
> "A sliding window over the request log. I keep a deque of the requests that are still
> inside the window; on every request I first drop the ones that fell out, then allow the
> request if the deque has room. Because every timestamp is inserted once and removed
> once, the whole thing is O(n) amortised, and the deque is bounded by the capacity."

## Related Problems

- [Design HitCounter — LeetCode 362](./DesignHitCounter.md) — the same sliding window, fixed at
  300 seconds
- [LRU Cache — LeetCode 146](./LRUCache.md) — eviction by recency
- [MovingAverage — LeetCode 346](./MovingAverage.md) — the sliding window on values
