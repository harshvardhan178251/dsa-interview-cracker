---
title: Find Kth Largest and Kth Smallest
leetcode: null
difficulty: Medium
patterns: [Heap, Top-K, Twin bounded heaps]
companies: [Google, LinkedIn, Infosys]
frequency: 3
tags: [heap, array, top-k, selection]
sampleInput: |
  7
  9 4 7 1 8 3 6
  3
sampleOutput: |
  7
  4
---

# Find Kth Largest and Kth Smallest

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Heap · Top-K · Twin bounded heaps |
| **Interview heat** | ★★★☆☆ |
| **Asked at** | Amazon, Meta, Google, Microsoft |

## Problem Statement

Given an integer array `nums` and an integer `k`, report **both** the kth largest and the
kth smallest element. Duplicates count separately.

For `nums = [9, 4, 7, 1, 8, 3, 6]` and `k = 3`:

- sorted ascending: `[1, 3, 4, 6, 7, 8, 9]` → the 3rd smallest is `4`
- sorted descending: `[9, 8, 7, 6, 4, 3, 1]` → the 3rd largest is `7`

## Input Format

The program reads from standard input:

```
n
nums[0] nums[1] ... nums[n-1]
k
```

- `n` — length of the array (1 ≤ n ≤ 10⁵)
- `nums` — n space-separated integers
- `k` — the rank, 1-based, counting duplicates separately (1 ≤ k ≤ n)

## Sample Input

```
7
9 4 7 1 8 3 6
3
```

## Expected Output

```
7
4
```

The first line is the kth largest element, the second line the kth smallest element.

## Approach — Two bounded heaps in one pass

Both answers come from the same idea, and both can be computed in a **single pass**:

| Answer | Heap | Kept elements | The answer is |
|---|---|---|---|
| kth largest | **min**-heap of size k | the k largest values | the heap's minimum |
| kth smallest | **max**-heap of size k | the k smallest values | the heap's maximum |

For every value: push it into both heaps and, in each heap, drop the extreme element if
the size grew past `k`. The two heaps mirror each other — one throws away its smallest,
the other its largest.

## Dry Run

Input: `nums = [9, 4, 7, 1, 8, 3, 6]`, `k = 3`

| Step | value | kth-largest heap (min-heap) | kth-smallest heap (max-heap) |
|---:|---:|---|---|
| 1 | 9 | `[9]` | `[9]` |
| 2 | 4 | `[4, 9]` | `[9, 4]` |
| 3 | 7 | `[4, 9, 7]` | `[9, 4, 7]` |
| 4 | 1 | `[4, 9, 7]` — dropped `1` | `[7, 4, 1]` |
| 5 | 8 | `[7, 8, 9]` — dropped `4` | `[7, 4, 1]` — dropped `8` |
| 6 | 3 | `[7, 8, 9]` — dropped `3` | `[4, 3, 1]` — dropped `7` |
| 7 | 6 | `[7, 8, 9]` — dropped `6` | `[4, 3, 1]` — dropped `6` |

- kth largest = the min-heap's minimum = `7` ✓
- kth smallest = the max-heap's maximum = `4` ✓

Both heaps now hold exactly the three values that matter, and every later value was
rejected by both.

## Java Solution

See [`FindKthLargestAndSmallest.java`](./FindKthLargestAndSmallest.java).

```java
MinHeap<Integer> largest = new MinHeap<>();
MaxHeap<Integer> smallest = new MaxHeap<>();

for (int value : nums) {
    largest.add(value);
    if (largest.size() > k) {
        largest.poll();
    }
    smallest.add(value);
    if (smallest.size() > k) {
        smallest.poll();
    }
}
return new int[]{largest.peek(), smallest.peek()};
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n log k) | two heap operations per element |
| **Space** | O(k) | the two heaps together hold 2k values |

## Interview Notes

**Follow-ups to raise yourself:**
- *"Can you do it with one heap?"* → yes, for the kth largest; for the kth smallest you
  would need to reverse the ordering, which a second heap does for free.
- *"What if k is unknown but you need the whole order statistic spectrum?"* → use a
  balanced tree / order-statistic tree, or sort once and index.
- *"What if the array is 10 GB and does not fit in memory?"* → external sort, or a
  bounded heap per partition and a merge afterwards.
- *"How would you extend this to the median?"* → the median is the kth smallest with
  `k = (n + 1) / 2` — see [Find Median from Data Stream](FindMedianFromDataStream.md).

**Common mistakes:**
- ❌ Using the **same** heap kind for both answers → one of the two numbers is wrong.
- ❌ Polling **before** adding → the heap can drop below k elements.
- ❌ Assuming the two answers are symmetric — with duplicates they are not, e.g.
  `nums = [2, 2, 2]`, `k = 2` gives kth largest `2` and kth smallest `2`, but
  `nums = [1, 2, 2]`, `k = 2` gives kth largest `2` and kth smallest `1`.

**How to narrate:**
> "These are two instances of the same pattern, so I can solve both in one pass. A
> min-heap of size k keeps the k largest values, so its minimum is the kth largest; a
> max-heap of size k keeps the k smallest values, so its maximum is the kth smallest.
> Each time a heap overflows I drop its extreme element. O(n log k) time, O(k) space."

## Related Problems

- [Kth Largest Element in an Array](KthLargestElement.md) — one of the two
- [Kth Smallest Element in a Sorted Matrix](KthSmallestElement.md) — the other one
- [Top K Frequent Elements](TopKFrequentElements.md) — bounded heap, different ranking
- [Find Median from Data Stream](FindMedianFromDataStream.md) — order statistics under a stream
