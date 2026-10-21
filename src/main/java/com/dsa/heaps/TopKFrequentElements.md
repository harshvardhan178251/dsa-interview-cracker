---
title: Top K Frequent Elements
leetcode: 347
difficulty: Medium
patterns: [Hashing, Heap, Top-K, Frequency counting]
companies: [Amazon, Meta, Google, Microsoft, Uber, Airbnb]
frequency: 5
tags: [heap, hashmap, frequency, top-k]
sampleInput: |
  6
  1 1 1 2 2 3
  2
sampleOutput: "1 2"
---

# Top K Frequent Elements — LeetCode 347

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Hashing · Heap · Top-K · Frequency counting |
| **Interview heat** | ★★★★★ |
| **Asked at** | Amazon, Meta, Google, Microsoft, Uber, Airbnb |

## Problem Statement

Given an integer array `nums` and an integer `k`, return the `k` most frequent elements.

For `nums = [1, 1, 1, 2, 2, 3]` the frequencies are `1 → 3`, `2 → 2`, `3 → 1`, so the two
most frequent elements are `1` and `2`.

The program prints the elements in **decreasing frequency**; elements with the same
frequency are printed in **increasing value** order (any order is accepted by the
judge, this one is simply deterministic).

## Input Format

The program reads from standard input:

```
n
nums[0] nums[1] ... nums[n-1]
k
```

- `n` — length of the array (1 ≤ n ≤ 10⁵)
- `nums` — n space-separated integers
- `k` — how many elements to report (1 ≤ k ≤ number of distinct values)

## Sample Input

```
6
1 1 1 2 2 3
2
```

## Expected Output

```
1 2
```

## Approach — Count, then keep a bounded heap

Two steps:

1. **Count** the occurrences of every value with a hash map. This is O(n) expected.
2. **Select** the k highest counts with a min-heap ordered by frequency.

The heap holds at most `k` candidates. When it overflows, its **top — the least frequent
candidate — is discarded**, because it cannot belong to the top k. At the end the heap
contains exactly the k most frequent values.

**Why a min-heap?** Again the heap must give up its worst candidate, and the worst of
the k most frequent is the one with the **smallest** count.

The candidates are inserted in increasing value order, so the trace is reproducible; the
final answer is sorted by decreasing frequency.

## Dry Run

Input: `nums = [1, 1, 1, 2, 2, 3]`, `k = 2`

Frequencies: `1 → 3`, `2 → 2`, `3 → 1`. The heap is printed as `value x count`.

| Step | candidate | heap after insert | size | action | heap after action |
|---:|---|---|---:|---|---|
| 1 | `1 x3` | `[1x3]` | 1 | keep | `[1x3]` |
| 2 | `2 x2` | `[2x2, 1x3]` | 2 | keep | `[2x2, 1x3]` |
| 3 | `3 x1` | `[3x1, 2x2, 1x3]` | 3 | **pop the least frequent (`3x1`)** | `[2x2, 1x3]` |

The final heap holds `1` (count 3) and `2` (count 2) → printed as `1 2` ✓

## Java Solution

See [`TopKFrequentElements.java`](./TopKFrequentElements.java).

```java
MinHeap<int[]> heap = new MinHeap<int[]>((a, b) -> {
    if (a[1] != b[1]) {
        return Integer.compare(a[1], b[1]);
    }
    return Integer.compare(b[0], a[0]);
});

for (int value : values) {
    heap.add(new int[]{value, frequency.get(value)});
    if (heap.size() > k) {
        heap.poll();
    }
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n log k) | counting is O(n), the heap work is O(d log k) with d distinct values |
| **Space** | O(n) | the frequency map holds every distinct value; the heap holds k of them |

**Better?** Bucket sort: count the frequencies, put the values into `frequency → list`
buckets, and walk the buckets from the highest frequency down — **O(n)** time. The heap
is O(n log k) but needs no extra bucket array.

## Interview Notes

**Follow-ups to raise yourself:**
- *"Can you do it in O(n)?"* → yes, bucket sort by frequency.
- *"What if the stream never ends?"* → the frequency map grows; a Space-Saving /
  heavy-hitters algorithm (Misra–Gries) keeps the k most frequent with O(k) memory.
- *"What if the values are strings?"* → the same, the map and the heap work with any key
  that has a stable ordering.
- *"What if k is 1?"* → just return the most frequent value; the heap degenerates to a
  single-element max-heap of counts.

**Common mistakes:**
- ❌ Using a **max**-heap ordered by count → it would keep the *least* frequent values.
- ❌ Confusing "k most frequent **distinct** values" with "the k values that appear most
  often" → the first asks for distinct values, the second may repeat one value.
- ❌ Forgetting that the map's iteration order is arbitrary → the answer would be
  non-deterministic; sorting the candidates fixes it.

**How to narrate:**
> "First I count the occurrences with a hash map — O(n). Then I need the k highest
> counts, which is a bounded-heap problem: a min-heap ordered by count holds at most k
> candidates, and when it overflows I drop its minimum, the least frequent candidate.
> The final heap holds the k most frequent elements. If I want O(n) instead of O(n log
> k), I bucket the values by frequency and walk the buckets from the top."

## Related Problems

- [Kth Largest Element in an Array](KthLargestElement.md) — the same bounded heap
- [Find Kth Largest and Kth Smallest](FindKthLargestAndSmallest.md) — two bounded heaps
- [K Closest Elements](KClosestElements.md) — bounded heap by distance
- [Group Anagrams](../hashing/GroupAnagrams.md) — grouping with a canonical key
