---
title: LRU Cache
leetcode: 146
difficulty: Medium
patterns: [Design, HashMap, Doubly linked list]
companies: [Google, Meta, Amazon, Facebook, Adobe, Airbnb, Walmart]
frequency: 5
tags: [cache, hashmap, linked list, eviction]
sampleInput: |
  capacity 2
  put 1 1
  put 2 2
  get 1
  put 3 3
  get 2
sampleOutput: |
  1
  -1
---

# LRU Cache — LeetCode 146

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Design · HashMap · Doubly linked list |
| **Interview heat** | ★★★★★ |
| **Asked at** | Amazon, Google, Meta, Uber, LinkedIn, Netflix, Airbnb |

## Problem Statement

Design a cache that stores at most `capacity` key/value pairs.

- `put(key, value)` inserts or updates a pair. If the cache is full, the **least recently
  used** entry is evicted to make room.
- `get(key)` returns the value for the key, or `-1` when the key is not in the cache.
- Both operations must run in **O(1)**.

"Recently used" means *recently touched*: a `get` refreshes an entry exactly like a `put`
does.

## Input Format

```
capacity c
put k v
get k
...
```

- `capacity c` — the maximum number of entries (always the first line; a bare integer is
  accepted too).
- `put k v` — insert or update the pair.
- `get k` — read the pair.

The program prints one line per `get`: the cached value, or `-1` on a miss.

## Sample Input

```
capacity 2
put 1 1
put 2 2
get 1
put 3 3
get 2
```

## Expected Output

```
1
-1
```

`get 1` hits (value `1`). `put 3 3` has to evict something — key `2` is now the least
recently used entry — so `get 2` misses.

## Approach — HashMap + doubly linked list

Two data structures, one job each:

- a **HashMap** `key → node` gives O(1) lookup of an entry;
- a **doubly linked list** ordered *most recently used first* gives O(1) recency
  manipulation: moving a node to the front and removing the last node are both pointer
  swaps.

```
head <-> [3] <-> [1] <-> [2] <-> tail      most recent .......... least recent
         ^                              ^
      new entry                   eviction candidate
```

Two sentinel nodes (`head`, `tail`) mean there is never a "first node" or "last node"
special case — the list is never empty in the structural sense.

Every operation is the same three-step recipe:

1. **Look up** the node in the map. Missing → miss (`get`) or insert (`put`).
2. **Unlink** the node from its current position.
3. **Relink** it right after `head`.

Eviction is simply "unlink `tail.prev` and remove it from the map".

**Why not a plain `LinkedHashMap`?** Java's `LinkedHashMap` with `accessOrder = true`
does exactly this, but the interview question is about *building* it. In production you
would of course use `LinkedHashMap` (or Caffeine) — say that out loud.

## Dry Run

Input: `capacity = 2`, commands `put 1 1`, `put 2 2`, `get 1`, `put 3 3`, `get 2`

The list is shown most recent first. `map` is the key → node index.

| Step | Command | Node | `map` before | List before | Action | `map` after | List after | Output |
|---:|---|---|---|---|---|---|---|---|
| 1 | `put 1 1` | new(1) | `{}` | `head ↔ tail` | insert after head | `{1→n1}` | `head ↔ [1] ↔ tail` | — |
| 2 | `put 2 2` | new(2) | `{1→n1}` | `head ↔ [1] ↔ tail` | insert after head | `{1→n1, 2→n2}` | `head ↔ [2] ↔ [1] ↔ tail` | — |
| 3 | `get 1` | n1 | `{1→n1, 2→n2}` | `head ↔ [2] ↔ [1] ↔ tail` | hit → unlink n1, relink after head | `{1→n1, 2→n2}` | `head ↔ [1] ↔ [2] ↔ tail` | `1` |
| 4 | `put 3 3` | new(3) | `{1→n1, 2→n2}` | `head ↔ [1] ↔ [2] ↔ tail` | insert after head → size 3 > 2 → evict `tail.prev` = n2 | `{1→n1, 3→n3}` | `head ↔ [3] ↔ [1] ↔ tail` | — |
| 5 | `get 2` | — | `{1→n1, 3→n3}` | `head ↔ [3] ↔ [1] ↔ tail` | miss | unchanged | unchanged | `-1` |

The eviction victim at step 4 is key `2`: it was inserted at step 2 and never touched
again, while key `1` was refreshed at step 3.

## Java Solution

See [`LRUCache.java`](./LRUCache.java).

```java
public void put(int key, int value) {
    Node node = index.get(key);
    if (node != null) {                 // update: refresh recency
        node.value = value;
        moveToFront(node);
        return;
    }
    if (capacity == 0) {
        return;
    }
    node = new Node(key, value);
    index.put(key, node);
    insertAfterHead(node);
    if (index.size() > capacity) {      // evict the least recently used entry
        Node victim = tail.prev;
        remove(victim);
        index.remove(victim.key);
    }
}

private void moveToFront(Node node) {
    remove(node);
    insertAfterHead(node);
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(1) per `get`/`put` | one map lookup + a constant number of pointer writes |
| **Space** | O(capacity) | one node per entry plus the map |

## Interview Notes

**Follow-ups to raise yourself:**
- *"What if the cache is shared by several threads?"* → a `ConcurrentHashMap` plus a
  `ReentrantLock` around the list manipulation, or a striped lock; the invariant is that
  the map and the list must be changed under the same lock.
- *"What if `get` must not change the order?"* → that is FIFO / clock replacement, and
  the `get` no longer touches the list.
- *"How would you make it distributed?"* → keep the eviction order in a shared ordered
  structure (Redis `allkeys-lru` uses an approximated LRU with random sampling).
- *"How would you add a TTL?"* → store the expiry next to the value and treat expired
  entries as eviction candidates.

**Common mistakes:**
- ❌ Forgetting that `get` must refresh the recency — the classic bug that turns the
  cache into FIFO.
- ❌ Evicting the *head* instead of the tail of the list.
- ❌ Leaving the map entry behind when the node is evicted → memory leak and a stale
  "hit" that returns the wrong value.
- ❌ Not handling `capacity == 0`.

**How to narrate:**
> "I need O(1) lookup and O(1) recency updates, so I'll combine a hash map with a
> doubly linked list. The map gives me the node for a key; the list keeps the nodes in
> recency order with the most recent first. Every touch is 'unlink and relink at the
> front', and eviction is 'drop the last node'. With sentinel nodes I don't need any
> boundary special cases."

## Related Problems

- [LFU Cache — LeetCode 460](./LFUCache.md) — same shape, but the eviction order is by frequency
- [Design HashMap — LeetCode 706](./DesignHashMap.md) — the hash map half of this problem
- [Design Underground System — LeetCode 373](./DesignUndergroundSystem.md) — aggregation instead
  of eviction
