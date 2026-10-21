---
title: Kth Smallest Element in a Sorted Matrix
leetcode: 378
difficulty: Medium
patterns: [Heap, Top-K, Bounded heap]
companies: [Amazon, Google, Bloomberg, Facebook, Datadog, Accenture, HCLTech, Philips]
frequency: 4
tags: [heap, matrix, top-k, selection]
sampleInput: |
  3
  1 5 9
  10 11 13
  12 13 15
  8
sampleOutput: "13"
---

# Kth Smallest Element in a Sorted Matrix — LeetCode 378

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Heap · Top-K · Bounded heap |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Meta, Google, Microsoft, Uber |

## Problem Statement

Given an `n x n` matrix in which every row is sorted in non-decreasing order, return the
**kth smallest** element of the whole matrix. Duplicates count separately.

```
1  5  9
10 11 13
12 13 15
```

Flattened and sorted, the matrix is `[1, 5, 9, 10, 11, 12, 13, 13, 15]`, so with
`k = 8` the answer is the 8th value, `13`.

## Input Format

The program reads from standard input:

```
n
row0[0] row0[1] ... row0[n-1]
row1[0] row1[1] ... row1[n-1]
...
k
```

- `n` — the number of rows and columns (1 ≤ n ≤ 300)
- one line per row, n space-separated integers each
- `k` — the rank, 1-based, counting duplicates separately (1 ≤ k ≤ n²)

## Sample Input

```
3
1 5 9
10 11 13
12 13 15
8
```

## Expected Output

```
13
```

## Approach — A max-heap of size k

The row-sorted property is not even needed for this solution: flatten the matrix in your
head and apply the classic bounded-heap selection.

Keep a **max-heap** of at most `k` elements holding the k smallest values seen so far:

1. Push the next value into the heap.
2. If the heap now holds more than `k` elements, remove its **maximum**.

The heap's maximum is the largest of the k smallest values — exactly the value that can
no longer be in the answer. When the matrix is exhausted, the heap's maximum is the kth
smallest element.

**Why a max-heap and not a min-heap?** The heap must give up its *worst* candidate, and
the worst of the k smallest is the largest of them.

## Dry Run

Input: the matrix above, `k = 8`

The heap array is printed as it is stored (index 0 is the root = the heap's maximum).

| Step | value | heap after insert | size | action | heap after action |
|---:|---:|---|---:|---|---|
| 1 | 1 | `[1]` | 1 | keep | `[1]` |
| 2 | 5 | `[5, 1]` | 2 | keep | `[5, 1]` |
| 3 | 9 | `[9, 1, 5]` | 3 | keep | `[9, 1, 5]` |
| 4 | 10 | `[10, 9, 5, 1]` | 4 | keep | `[10, 9, 5, 1]` |
| 5 | 11 | `[11, 10, 5, 1, 9]` | 5 | keep | `[11, 10, 5, 1, 9]` |
| 6 | 13 | `[13, 10, 11, 1, 9, 5]` | 6 | keep | `[13, 10, 11, 1, 9, 5]` |
| 7 | 12 | `[13, 10, 12, 1, 9, 5, 11]` | 7 | keep | `[13, 10, 12, 1, 9, 5, 11]` |
| 8 | 13 | `[13, 13, 12, 10, 9, 5, 11, 1]` | 8 | keep | `[13, 13, 12, 10, 9, 5, 11, 1]` |
| 9 | 15 | `[15, 13, 12, 10, 9, 5, 11, 1]` | 9 | **pop the maximum `15`** | `[13, 13, 12, 10, 9, 5, 11, 1]` |

The heap ends with the eight smallest values and its maximum is `13` ✓

## Java Solution

See [`KthSmallestElement.java`](./KthSmallestElement.java).

```java
MaxHeap<Integer> topK = new MaxHeap<>();
for (int[] row : matrix) {
    for (int value : row) {
        topK.add(value);
        if (topK.size() > k) {
            topK.poll();
        }
    }
}
return topK.peek();
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n² log k) | one heap operation per matrix element |
| **Space** | O(k) | only the k smallest values are stored |

**Better?** Yes — and this is where the sorted rows pay off. Because each row is sorted,
the answer is the largest value `x` such that **at least k** matrix entries are `≤ x`.
That count can be computed per candidate in O(n) (one binary search per row), and the
candidates themselves are binary-searched → **O(n log(max − min))** time, O(1) space.
For a `300 x 300` matrix the heap solution does 90 000 heap operations, while the value
binary search does about 30 · 300 = 9 000 comparisons.

## Interview Notes

**Follow-ups to raise yourself:**
- *"How would you exploit the sorted rows?"* → binary search on the **value**: count how
  many entries are `≤ x` in O(n) and binary search the answer.
- *"What if the matrix were not square?"* → the same code works, the value binary search
  too.
- *"What if the rows were sorted but the columns were not?"* → the value binary search
  still works (only the rows matter).
- *"What if you could not hold the matrix in memory?"* → the heap solution streams the
  matrix row by row and only keeps k values; the value binary search needs random access.

**Common mistakes:**
- ❌ Using a **min**-heap of size k → it keeps the k largest values and answers the wrong
  question.
- ❌ Forgetting that the rows are 0-indexed in the code but 1-indexed in the statement →
  off-by-one on `k`.
- ❌ Assuming the matrix is fully sorted (it is only sorted **per row**) → a merge of the
  rows is *not* sorted overall.

**How to narrate:**
> "The simplest correct solution is a bounded heap: a max-heap of size k over all n²
> values, dropping the maximum whenever it overflows. The final maximum is the kth
> smallest. But since the rows are sorted, I can do better: binary search on the value —
> for a candidate x, count the entries that are ≤ x with one binary search per row, and
> find the smallest x whose count reaches k. That's O(n log range) instead of O(n² log k)."

## Related Problems

- [Kth Largest Element in an Array](KthLargestElement.md) — the mirror image
- [Find Kth Largest and Kth Smallest](FindKthLargestAndSmallest.md) — both at once
- [K Closest Elements](KClosestElements.md) — bounded heap by distance
- [Merge k Sorted Lists](MergeKSortedLists.md) — a heap over sorted inputs
