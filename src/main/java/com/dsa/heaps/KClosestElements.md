---
title: K Closest Elements
leetcode: 658
difficulty: Medium
patterns: [Heap, Top-K, Distance ranking, Two pointers]
companies: [Meta, Google, Uber, Adobe, Twitter, Accenture, Tech Mahindra, KPMG]
frequency: 4
tags: [heap, array, binary-search, top-k]
sampleInput: |
  7
  1 2 4 8 9 15 16
  4
  10
sampleOutput: "4 8 9 15"
---

# K Closest Elements — LeetCode 658

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Heap · Top-K · Distance ranking · Two pointers |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Meta, Google, Microsoft, Uber |

## Problem Statement

Given a **sorted** integer array `nums` and an integer `k`, return the `k` elements of
`nums` that are closest to `x`. The result is printed in increasing order.

For `nums = [1, 2, 4, 8, 9, 15, 16]`, `k = 4` and `x = 10` the distances are

| value | 1 | 2 | 4 | 8 | 9 | 15 | 16 |
|---|---|---|---|---|---|---|---|
| distance | 9 | 8 | 6 | 2 | 1 | 5 | 6 |

The four smallest distances belong to `9`, `8`, `15` and `4` (or `16` — a tie at
distance 6). The program keeps the **smaller** value on a tie, so the answer is
`4 8 9 15`.

## Input Format

The program reads from standard input:

```
n
nums[0] nums[1] ... nums[n-1]
k
x
```

- `n` — length of the array (1 ≤ n ≤ 10⁵)
- `nums` — n space-separated integers in **ascending** order
- `k` — how many elements to return (1 ≤ k ≤ n)
- `x` — the target value

## Sample Input

```
7
1 2 4 8 9 15 16
4
10
```

## Expected Output

```
4 8 9 15
```

## Approach — A bounded heap ordered by distance

The same bounded-heap trick as the top-K problems, but the ranking key is the
**distance to `x`** instead of the value itself.

Keep a **max-heap** of at most `k` elements ordered by distance:

1. Push the next value into the heap.
2. If the heap now holds more than `k` elements, remove its **maximum** — the farthest
   candidate, which cannot be among the k closest.

At the end the heap holds the k closest elements; they are sorted before printing.

**Why a max-heap?** The heap must give up its worst candidate, and the worst of the k
closest is the **farthest** one — the maximum distance. Ties are broken towards the
larger value, so the smaller one survives.

**Why not use the sortedness?** With a sorted array the answer is a **contiguous window**
of k elements, so binary searching for the best window start is O(log n) with O(1)
space — better than the heap. The heap version is the right answer when the array is
*not* sorted.

## Dry Run

Input: `nums = [1, 2, 4, 8, 9, 15, 16]`, `k = 4`, `x = 10`

The heap is printed as the values it holds; the root is the farthest candidate.

| Step | value | distance | heap after insert | action | heap after action |
|---:|---:|---:|---|---|---|
| 1 | 1 | 9 | `[1]` | keep | `[1]` |
| 2 | 2 | 8 | `[1, 2]` | keep | `[1, 2]` |
| 3 | 4 | 6 | `[1, 2, 4]` | keep | `[1, 2, 4]` |
| 4 | 8 | 2 | `[1, 2, 4, 8]` | keep | `[1, 2, 4, 8]` |
| 5 | 9 | 1 | `[2, 8, 4, 9]` | **pop the farthest (`1`, d = 9)** | `[2, 8, 4, 9]` |
| 6 | 15 | 5 | `[4, 15, 8, 9]` | **pop the farthest (`2`, d = 8)** | `[4, 15, 8, 9]` |
| 7 | 16 | 6 | `[4, 15, 8, 9]` | **pop the farthest (`16`, d = 6)** | `[4, 15, 8, 9]` |

Step 7 is the tie: `4` and `16` are both at distance 6, and the tie-break drops the
larger value, so `4` survives. Sorted, the answer is `4 8 9 15` ✓

## Java Solution

See [`KClosestElements.java`](./KClosestElements.java).

```java
MaxHeap<int[]> heap = new MaxHeap<int[]>((a, b) -> {
    int da = Math.abs(a[0] - x);
    int db = Math.abs(b[0] - x);
    if (da != db) {
        return Integer.compare(da, db);
    }
    return Integer.compare(a[0], b[0]);
});

for (int value : nums) {
    heap.add(new int[]{value});
    if (heap.size() > k) {
        heap.poll();
    }
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n log k) | one heap operation per element |
| **Space** | O(k) | only the k closest values are stored |

**Better (with the sorted input):** binary search for the window. Find the first index
`i` with `nums[i] >= x`; the best window starts at either `i - k` or `i`; compare the
window's two end distances and pick the better one — O(log n) time, O(1) space.

## Interview Notes

**Follow-ups to raise yourself:**
- *"The array is sorted — what is the optimal solution?"* → binary search for the window
  start, O(log n).
- *"What if the array is not sorted?"* → the bounded heap, O(n log k).
- *"What if x changes between queries?"* → with the sorted array, binary search again for
  each x; with the heap, rebuild it.
- *"How would you return the k closest in an unsorted array with duplicates?"* → the same
  heap; duplicates are separate candidates.

**Common mistakes:**
- ❌ Ordering the heap by **value** instead of distance → the heap keeps the k largest
  values, not the k closest.
- ❌ Forgetting that the answer is a **contiguous window** in a sorted array → the
  "k closest" set is always a window, which makes the binary search possible.
- ❌ Getting the tie-break wrong → with `x = 10` and `k = 3`, `[1, 2, 3]` and
  `[2, 3, 4]` are both "valid" only under the rule "keep the smaller values".

**How to narrate:**
> "With a heap: I keep a max-heap of size k ordered by distance to x. Whenever it
> overflows I drop its maximum — the farthest candidate, which cannot be in the answer.
> At the end I sort the k survivors. That's O(n log k). But the input is sorted, so the
> k closest elements must be a contiguous window, and I can binary search for the best
> window start in O(log n) with O(1) space."

## Related Problems

- [Kth Largest Element in an Array](KthLargestElement.md) — the same bounded heap
- [Top K Frequent Elements](TopKFrequentElements.md) — bounded heap by count
- [Median of Two Sorted Arrays](MedianOfTwoSortedArrays.md) — order statistics
- [Find Median from Data Stream](FindMedianFromDataStream.md) — order statistics under a stream
