---
title: Median of Two Sorted Arrays
leetcode: 4
difficulty: Hard
patterns: [Heap, K-way merge, Order statistics, Binary search]
companies: [Amazon, Meta, Google, Microsoft, Uber, Bloomberg, Apple]
frequency: 5
tags: [heap, binary-search, divide-and-conquer, median]
sampleInput: |
  2
  1 3
  1
  2
sampleOutput: "2.0"
---

# Median of Two Sorted Arrays — LeetCode 4

| | |
|---|---|
| **Difficulty** | Hard |
| **Pattern** | Heap · K-way merge · Order statistics · Binary search |
| **Interview heat** | ★★★★★ |
| **Asked at** | Amazon, Meta, Google, Microsoft, Uber, Bloomberg, Apple |

## Problem Statement

Given two sorted integer arrays `nums1` and `nums2`, return the **median** of the
combined arrays. The arrays may have different lengths and either of them may be empty.

- An odd total → the middle value.
- An even total → the average of the two middle values.

## Input Format

The program reads from standard input:

```
m
nums1[0] nums1[1] ... nums1[m-1]
n
nums2[0] nums2[1] ... nums2[n-1]
```

- `m` — the length of the first array (0 ≤ m ≤ 1000)
- the m values of the first array, in ascending order
- `n` — the length of the second array (0 ≤ n ≤ 1000)
- the n values of the second array, in ascending order

The median is printed as `X.0` when it is a whole number and as `X.5` otherwise.

## Sample Input

```
2
1 3
1
2
```

## Expected Output

```
2.0
```

The combined array is `[1, 2, 3]` — three values, so the median is the middle one.

## Approach — Merge with two pointers, select with a bounded heap

The median of `m + n` values is the k-th smallest, with `k = (m + n + 1) / 2` (1-based).
So the question is: **what is the k-th smallest value of the union of two sorted
arrays?**

Step 1 — **merge** the two arrays with two pointers. Because both are sorted, the merged
sequence comes out in order without sorting anything.

Step 2 — **select** the k-th value with a bounded max-heap. Feed the merged values into
a max-heap that is capped at `k` elements; the heap then holds the k smallest values, so
its maximum is the k-th smallest. The first value that overflows the heap is the
(k+1)-th smallest — that is the second value needed for an even total.

```
merged value → push into the heap
if the heap holds k + 1 values:
    the first value popped out is the (k+1)-th smallest → remember it
    pop again to keep the heap at k values
```

**Why the *first* popped value is the (k+1)-th smallest:** the values arrive in
non-decreasing order, so the first time the heap holds k + 1 values, its maximum is the
largest of the first k + 1 values — which is exactly the (k+1)-th smallest of the whole
union.

## Dry Run

Input: `nums1 = [1, 3]`, `nums2 = [2]`, `m + n = 3`, `k = 2`

| Step | merged value | heap after insert | size | action | heap after action | `(k+1)`-th |
|---:|---:|---|---:|---|---|---|
| 1 | 1 | `[1]` | 1 | keep | `[1]` | — |
| 2 | 2 | `[2, 1]` | 2 | keep | `[2, 1]` | — |
| 3 | 3 | `[3, 2, 1]` | 3 | **pop the maximum `3`** | `[2, 1]` | `3` |

The total is odd, so the median is the k-th smallest: the heap's maximum is `2` ✓

For an even total the same run also yields the (k+1)-th smallest, and the median is
`(kth + (k+1)th) / 2`.

## Java Solution

See [`MedianOfTwoSortedArrays.java`](./MedianOfTwoSortedArrays.java).

```java
MaxHeap<Integer> kSmallest = new MaxHeap<>();
Integer overflow = null;
int i = 0;
int j = 0;
while (i < m || j < n) {
    int value;
    if (j >= n || (i < m && nums1[i] <= nums2[j])) {
        value = nums1[i++];
    } else {
        value = nums2[j++];
    }
    kSmallest.add(value);
    if (kSmallest.size() > k) {
        if (overflow == null) {
            overflow = kSmallest.poll();
        } else {
            kSmallest.poll();
        }
    }
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O((m + n) log k) | one heap operation per merged value |
| **Space** | O(k) | the heap holds at most k values |

**Better:** the classic optimal solution is **binary search on the partition** — cut
`nums1` after `i` elements and `nums2` after `j` elements so that the left half contains
`k` elements and every left value is `≤` every right value. The cut is found by binary
searching the smaller array: **O(log(min(m, n)))** time, O(1) space.

## Interview Notes

**Follow-ups to raise yourself:**
- *"What is the optimal solution?"* → binary search on the partition of the two arrays.
- *"What if the arrays were not sorted?"* → sort (or quickselect) the union first.
- *"Can you do it in O(1) space?"* → yes, with the partition binary search.
- *"Why is the heap-based merge not the intended answer?"* → it is O(n log k) instead of
  O(log n); the sortedness is meant to be exploited.

**Common mistakes:**
- ❌ Using `>=` in the merge comparison inconsistently → duplicates are fine, but the
  index arithmetic must still be right.
- ❌ Forgetting that for an **even** total the second middle value is the (k+1)-th
  smallest, not the (k+2)-th.
- ❌ Using integer division for the average → `(2 + 3) / 2` must be `2.5`.
- ❌ Assuming both arrays are non-empty → one of them may be empty.

**How to narrate:**
> "The median is an order statistic: the k-th smallest of the union. I merge the two
> sorted arrays with two pointers — no sorting needed — and feed the merged values into
> a max-heap capped at k. The heap's maximum is the k-th smallest, and the first value
> that overflows the heap is the (k+1)-th, which I need for an even total. That's
> O(n log k). The optimal solution binary searches the partition point instead, which
> is O(log min(m, n))."

## Related Problems

- [Find Median from Data Stream](FindMedianFromDataStream.md) — the streaming version
- [Kth Smallest Element in a Sorted Matrix](KthSmallestElement.md) — the same order statistic
- [Merge k Sorted Lists](MergeKSortedLists.md) — the same merge machinery
- [K Closest Elements](KClosestElements.md) — order statistics by distance
