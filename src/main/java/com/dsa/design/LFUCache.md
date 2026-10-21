---
title: LFU Cache
leetcode: 460
difficulty: Hard
patterns: [Design, Frequency buckets, HashMap]
companies: [Google, Meta, Adobe, LinkedIn, Datadog]
frequency: 4
tags: [cache, hashmap, linked list, eviction]
sampleInput: |
  capacity 2
  put 1 1
  put 2 2
  get 1
  put 3 3
  get 2
  get 3
sampleOutput: |
  1
  -1
  3
---

# LFU Cache — LeetCode 460

| | |
|---|---|
| **Difficulty** | Hard |
| **Pattern** | Design · Frequency buckets · HashMap |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Uber, LinkedIn, Pinterest |

## Problem Statement

Design a cache with a fixed capacity where `get` and `put` are **O(1)**.

- The **least frequently used** entry is evicted when the cache is full.
- When several entries share the lowest frequency, the **least recently used** one among
  them is evicted.

A hit increases the frequency of the entry; inserting a new entry starts at frequency 1.

## Input Format

```
capacity c
put k v
get k
...
```

- `capacity c` — maximum number of entries (first line; a bare integer also works).
- `put k v` — insert or update.
- `get k` — read.

The program prints one line per `get`: the value, or `-1` on a miss.

## Sample Input

```
capacity 2
put 1 1
put 2 2
get 1
put 3 3
get 2
get 3
```

## Expected Output

```
1
-1
3
```

`get 1` makes key `1` the most used key (frequency 2), so key `2` (frequency 1) is the
eviction victim when key `3` is inserted.

## Approach — buckets per frequency

Keep three pieces of state:

1. `cache` — `key → node`, O(1) lookup.
2. `buckets` — `frequency → ordered set of nodes`. Each set keeps its nodes in
   *insertion order*, i.e. **least recently used first**.
3. `minFreq` — the lowest frequency that currently exists in the cache.

Operations:

- **hit on `get`** — move the node from bucket `f` to bucket `f + 1`. If bucket `f` was
  the lowest one and is now empty, `minFreq` moves up to `f + 1`.
- **insert** — the new node goes into bucket `1`, and `minFreq` becomes `1`.
- **evict** — take the **first** element of the `minFreq` bucket. Because the bucket is
  ordered least-recently-used first, that element is exactly "least frequent, and among
  those the least recently used".

Every step is a constant number of hash map and linked-hash-set operations.

## Dry Run

Input: `capacity = 2`. The bucket column shows `freq → {keys in LRU→MRU order}`.

| Step | Command | `cache` before | Buckets before | Action | `cache` after | Buckets after | `minFreq` | Output |
|---:|---|---|---|---|---|---|---:|---|
| 1 | `put 1 1` | `{}` | `{}` | insert key 1 at freq 1 | `{1=1}` | `{1→{1}}` | 1 | — |
| 2 | `put 2 2` | `{1=1}` | `{1→{1}}` | insert key 2 at freq 1 | `{1=1, 2=2}` | `{1→{1,2}}` | 1 | — |
| 3 | `get 1` | `{1=1, 2=2}` | `{1→{1,2}}` | hit → key 1 moves 1 → 2 | `{1=1, 2=2}` | `{1→{2}, 2→{1}}` | 1 | `1` |
| 4 | `put 3 3` | `{1=1, 2=2}` | `{1→{2}, 2→{1}}` | cache is full → evict head of bucket 1 = key 2; insert key 3 at freq 1 | `{1=1, 3=3}` | `{1→{3}, 2→{1}}` | 1 | — |
| 5 | `get 2` | `{1=1, 3=3}` | `{1→{3}, 2→{1}}` | miss | unchanged | unchanged | 1 | `-1` |
| 6 | `get 3` | `{1=1, 3=3}` | `{1→{3}, 2→{1}}` | hit → key 3 moves 1 → 2 | `{1=1, 3=3}` | `{1→{}, 2→{1,3}}` | 1 | `3` |

Note step 3: key `1` moved *out* of bucket 1, but bucket 1 still holds key `2`, so
`minFreq` stays at 1. It only moves up when the whole lowest bucket becomes empty.

### Tie break — two keys with the same frequency

`capacity 2`, commands `put 1 1`, `put 2 2`, `put 3 3`:

| Step | Command | Buckets before | Action | Buckets after | Evicted |
|---:|---|---|---|---|---|
| 1 | `put 1 1` | `{}` | insert key 1 | `{1→{1}}` | — |
| 2 | `put 2 2` | `{1→{1}}` | insert key 2 | `{1→{1,2}}` | — |
| 3 | `put 3 3` | `{1→{1,2}}` | evict head of bucket 1 | `{1→{3}}` | key **1** (inserted first ⇒ least recently used) |

## Java Solution

See [`LFUCache.java`](./LFUCache.java).

```java
public void put(int key, int value) {
    if (capacity == 0) {
        return;
    }
    Node node = cache.get(key);
    if (node != null) {                 // update: promote to the next frequency
        node.value = value;
        touch(node);
        return;
    }
    if (cache.size() >= capacity) {
        evict();                        // head of the lowest bucket
    }
    node = new Node(key, value);
    cache.put(key, node);
    bucket(1).add(node);
    minFreq = 1;
}

private void touch(Node node) {
    int freq = node.freq;
    LinkedHashSet<Node> current = bucket(freq);
    current.remove(node);
    if (freq == minFreq && current.isEmpty()) {
        minFreq = freq + 1;             // the lowest bucket disappeared
    }
    node.freq = freq + 1;
    bucket(node.freq).add(node);
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(1) per `get`/`put` | hash map lookups plus O(1) set insert/remove |
| **Space** | O(capacity) | one node per entry plus one bucket per distinct frequency |

## Interview Notes

**Follow-ups to raise yourself:**
- *"How would you find the least frequently used key in O(n)?"* → keep a frequency map
  and scan for the minimum; that is the naive version of this problem.
- *"What if frequencies should decay over time?"* → keep a sliding-window count per key
  (like an LFU with a TTL), often called an "LFU with aging" or "windowed LFU".
- *"Why not just use a priority queue by frequency?"* → the heap changes on every hit, so
  `get` would be O(log n) and promoting a key needs a lazy-deletion hack.
- *"How does Redis do it?"* → Redis uses an approximated LFU: an 8-bit counter with a
  logarithmic increment and random sampling, which is O(1) and needs no global ordering.

**Common mistakes:**
- ❌ Evicting the *most* recently used node of the lowest bucket — the tie break is
  wrong.
- ❌ Forgetting to move `minFreq` up when the lowest bucket becomes empty → the next
  eviction looks in an empty bucket and crashes.
- ❌ Using a `HashSet` for the bucket → the iteration order is undefined, so the "least
  recently used" tie break is lost. `LinkedHashSet` is the right tool.
- ❌ Not incrementing the frequency on a `get` — only on a `put`.

**How to narrate:**
> "LFU is LRU with a different ordering rule. I'll keep a map from key to node, a map
> from frequency to an insertion-ordered set of nodes, and a pointer to the lowest
> frequency in use. A hit moves a node one bucket up; an insertion always starts at
> frequency 1; and eviction takes the first node of the lowest bucket — the bucket is
> ordered by recency, so that handles the tie break for free. All of it is O(1)."

## Related Problems

- [LRU Cache — LeetCode 146](./LRUCache.md) — the simpler eviction rule
- [Design HashMap — LeetCode 706](./DesignHashMap.md) — the hash map half of this problem
- [Rate Limiter](./RateLimiter.md) — another sliding-window eviction rule
