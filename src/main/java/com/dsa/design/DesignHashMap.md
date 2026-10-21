---
title: Design HashMap
leetcode: 706
difficulty: Easy
patterns: [Design, Hashing, Separate chaining]
companies: [Amazon, Bloomberg, Salesforce]
frequency: 3
tags: [hashmap, chaining, buckets]
sampleInput: |
  put 1 1
  put 2 2
  get 1
  get 3
  remove 2
  get 2
sampleOutput: |
  1
  -1
  -1
---

# Design HashMap — LeetCode 706

| | |
|---|---|
| **Difficulty** | Easy |
| **Pattern** | Design · Hashing · Separate chaining |
| **Interview heat** | ★★★☆☆ |
| **Asked at** | Amazon, Google, Meta, Uber, Bloomberg |

## Problem Statement

Implement a hash map from scratch. It must support

- `put(key, value)` — insert a pair or overwrite the value of an existing key,
- `get(key)` — return the value, or `-1` when the key is absent,
- `remove(key)` — delete the key; removing an absent key does nothing,

all in **O(1)** average time, without using `java.util.HashMap`.

## Input Format

```
put k v
get k
remove k
...
```

Each line is one command. The program prints one line per `get`.

## Sample Input

```
put 1 1
put 2 2
get 1
get 3
remove 2
get 2
```

## Expected Output

```
1
-1
-1
```

`get 1` hits with value `1`. `get 3` misses. After `remove 2` the key `2` is gone, so
the last `get 2` misses too.

## Approach — array of buckets with separate chaining

A hash map is two things glued together:

1. **A hash function** that turns a key into a bucket index. Here it is
   `(key & 0x7fffffff) % buckets.length`. The mask matters: `Math.abs(key)` throws for
   `Integer.MIN_VALUE`, while the mask maps it to bucket `0`.
2. **A bucket** that can hold several entries with the same index. Each bucket is a
   singly linked list of entries.

```
buckets[0] → (1,1) → (5,9) → null
buckets[1] → (2,2) → null
buckets[2] → null
```

`put` walks the chain looking for the key; if it is not there, the new entry is pushed
onto the front of the chain (O(1), no tail pointer needed). `remove` walks the chain
keeping the previous entry so it can unlink the match.

With 1024 buckets and a handful of keys, every chain has length 0 or 1, so every
operation touches exactly one node.

## Dry Run

Input: `put 1 1`, `put 2 2`, `get 1`, `get 3`, `remove 2`, `get 2`. Bucket index =
`(key & 0x7fffffff) % 1024`, so keys `1`, `2`, `3` all live in their own bucket.

| Step | Command | Bucket touched | Chain before | Action | Chain after | Result |
|---:|---|---|---|---|---|---|
| 1 | `put 1 1` | `b[1]` | `null` | push `(1,1)` | `(1,1) → null` | — |
| 2 | `put 2 2` | `b[2]` | `null` | push `(2,2)` | `(2,2) → null` | — |
| 3 | `get 1` | `b[1]` | `(1,1) → null` | walk: key matches | unchanged | `1` |
| 4 | `get 3` | `b[3]` | `null` | chain empty | unchanged | `-1` |
| 5 | `remove 2` | `b[2]` | `(2,2) → null` | key matches → unlink, `b[2] = null` | `null` | — |
| 6 | `get 2` | `b[2]` | `null` | chain empty | unchanged | `-1` |

### Collision — two keys in one bucket

With 2 buckets, keys `1` and `3` share `b[1]`:

| Step | Command | Chain before | Action | Chain after | Result |
|---:|---|---|---|---|---|
| 1 | `put 1 1` | `null` | push `(1,1)` | `(1,1) → null` | — |
| 2 | `put 3 3` | `(1,1) → null` | walk: key `1` ≠ `3` → push `(3,3)` | `(3,3) → (1,1) → null` | — |
| 3 | `get 1` | `(3,3) → (1,1) → null` | walk past `(3,3)`, key matches | unchanged | `1` |
| 4 | `remove 1` | `(3,3) → (1,1) → null` | previous = `(3,3)` → unlink | `(3,3) → null` | — |

## Java Solution

See [`DesignHashMap.java`](./DesignHashMap.java).

```java
public void put(int key, int value) {
    int index = indexOf(key);
    for (Entry entry = buckets[index]; entry != null; entry = entry.next) {
        if (entry.key == key) {
            entry.value = value;          // overwrite in place
            return;
        }
    }
    Entry fresh = new Entry(key, value);
    fresh.next = buckets[index];          // push onto the front of the chain
    buckets[index] = fresh;
    size++;
}

public void remove(int key) {
    int index = indexOf(key);
    Entry previous = null;
    for (Entry entry = buckets[index]; entry != null; entry = entry.next) {
        if (entry.key == key) {
            if (previous == null) {
                buckets[index] = entry.next;
            } else {
                previous.next = entry.next;
            }
            size--;
            return;
        }
        previous = entry;
    }
}

private int indexOf(int key) {
    return (key & 0x7fffffff) % buckets.length;
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(1) average per operation | one bucket is touched; the chain has O(n / buckets) entries |
| **Space** | O(n + buckets) | one entry per key plus the bucket array |

**Worst case?** O(n) per operation when every key collides into one bucket. Real hash
maps defend against this with treeified buckets (Java 8+) or randomised hashing.

## Interview Notes

**Follow-ups to raise yourself:**
- *"How would you resize it?"* → keep a load factor (e.g. 0.75); when `size` exceeds
  `buckets.length * 0.75`, double the array and rehash every key.
- *"How do you handle `Integer.MIN_VALUE`?"* → `Math.abs` overflows; use `key & 0x7fffffff`
  or `Math.floorMod(key, buckets.length)`.
- *"What about open addressing instead of chaining?"* → linear probing with a load factor
  below 0.7 and tombstones for deletions.
- *"How would you make it thread safe?"* → a `ConcurrentHashMap`, or a lock per bucket
  segment.

**Common mistakes:**
- ❌ Using `Math.abs(key) % n` → throws for `Integer.MIN_VALUE`.
- ❌ Comparing keys with `==` on boxed `Integer`s → use `int` keys, or `.equals()`.
- ❌ Forgetting the `previous` pointer in `remove` and corrupting the chain.
- ❌ Forgetting to overwrite the value when the key already exists.

**How to narrate:**
> "A hash map is a hash function plus a container per hash value. I'll use an array of
> buckets and separate chaining with a linked list per bucket. The index is the key
> masked and modulo the bucket count — masking avoids the `Math.abs` overflow for
> `MIN_VALUE`. Lookup, insert and delete each walk exactly one chain, so they're O(1) on
> average."

## Related Problems

- [LRU Cache — LeetCode 146](./LRUCache.md) — a hash map plus an eviction list
- [LFU Cache — LeetCode 460](./LFUCache.md) — a hash map plus frequency buckets
- [Two Sum — LeetCode 1](../arrays/TwoSum.java) — the user of
  this structure
