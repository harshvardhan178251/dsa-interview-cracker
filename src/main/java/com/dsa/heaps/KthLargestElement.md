---
title: Kth Largest Element in an Array
leetcode: 215
difficulty: Medium
patterns: [Heap, Top-K, Bounded heap]
companies: [Meta, Google, Amazon, Uber, Facebook, Netflix, Oracle, Accenture, HCLTech, Cisco]
frequency: 5
tags: [heap, array, top-k, selection]
sampleInput: |
  6
  3 2 1 5 6 4
  2
sampleOutput: "5"
---

# Kth Largest Element in an Array — LeetCode 215

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Heap · Top-K · Bounded heap |
| **Interview heat** | ★★★★★ |
| **Asked at** | Amazon, Meta, Google, Microsoft, Uber, Bloomberg |

## Problem Statement

Given an integer array `nums` and an integer `k`, return the **kth largest** element —
the element at position `k` when the array is sorted in descending order.

- Duplicates count separately: for `nums = [3, 3, 1]` and `k = 2` the answer is `3`, not
  the second *distinct* value.
- `1 ≤ k ≤ nums.length`.

## Input Format

The program reads from standard input:

```
n
nums[0] nums[1] ... nums[n-1]
k
```

- `n` — length of the array (1 ≤ n ≤ 10⁵)
- `nums` — n space-separated integers
- `k` — the rank, 1-based, counting duplicates separately

## Sample Input

```
6
3 2 1 5 6 4
2
```

## Expected Output

```
5
```

Sorted in descending order the array is `[6, 5, 4, 3, 2, 1]`, so the second largest
element is `5`.

## Approach — A min-heap of size k

The full sort is O(n log n) and throws away everything except the answer. The insight is
that we only ever need the **k largest** values, and everything smaller can be discarded
the moment we see it.

Keep a **min-heap** holding at most `k` elements:

1. Push the next value into the heap.
2. If the heap now holds more than `k` elements, remove its **minimum**.

The heap's minimum is the smallest of the k largest values seen so far — exactly the
value that can no longer belong to the answer. After the whole array is processed, the
heap contains the k largest values and its minimum is the kth largest.

**Why a min-heap and not a max-heap?** The heap must be able to give up its *worst*
element quickly, and the worst element of the k largest is the smallest of them — the
minimum. A max-heap would hand out the largest value, which is the one we want to keep.

## Dry Run

Input: `nums = [3, 2, 1, 5, 6, 4]`, `k = 2`

The heap array is printed as it is stored (index 0 is the root = the heap's minimum).

| Step | value | heap after insert | heap size | action | heap after action |
|---:|---:|---|---:|---|---|
| 1 | 3 | `[3]` | 1 | keep | `[3]` |
| 2 | 2 | `[2, 3]` | 2 | keep | `[2, 3]` |
| 3 | 1 | `[1, 2, 3]` | 3 | **pop the minimum `1`** | `[2, 3]` |
| 4 | 5 | `[3, 5, 2]` | 3 | **pop the minimum `2`** | `[3, 5]` |
| 5 | 6 | `[5, 6, 3]` | 3 | **pop the minimum `3`** | `[5, 6]` |
| 6 | 4 | `[4, 5, 6]` | 3 | **pop the minimum `4`** | `[5, 6]` |

The final heap is `[5, 6]`: its minimum `5` is the second largest element of the array ✓

## Java Solution

See [`KthLargestElement.java`](./KthLargestElement.java).

```java
MinHeap<Integer> topK = new MinHeap<>();
for (int value : nums) {
    topK.add(value);
    if (topK.size() > k) {
        topK.poll();
    }
}
return topK.peek();
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n log k) | one heap operation per element, the heap never exceeds k + 1 elements |
| **Space** | O(k) | only the k largest values are stored |

**Better?** The heap is O(n log k); the theoretical optimum is O(n) expected time using
quickselect (choose the pivot so that the kth largest lands in place, then recurse on one
side). Quickselect is faster but mutates the array and is randomised, so the heap is the
safer interview answer.

## Interview Notes

**Follow-ups to raise yourself:**
- *"What if the array is a stream and k changes?"* → keep the bounded heap and rebalance
  when `k` grows or shrinks; shrinking means dropping the extra elements.
- *"What if you need the k largest of 10 million numbers on disk?"* → external memory:
  keep a bounded heap of size k while streaming the file once — the same algorithm, only
  the source changes.
- *"What if the values are not comparable with `<` but with a custom key?"* → the heap
  takes a `Comparator`, so the ordering is injected rather than hard-coded.
- *"What about the kth largest in a stream with duplicates?"* → the heap keeps duplicates
  as separate entries, which is exactly the LeetCode semantics.

**Common mistakes:**
- ❌ Using a **max**-heap of size k and popping the maximum → that keeps the k *smallest*
  values and answers a different question.
- ❌ Popping **before** inserting → the heap can end up with k − 1 elements and the
  minimum is then not the kth largest.
- ❌ Forgetting that duplicates count → the "kth distinct element" reading gives a
  different answer for `[3, 3, 1]`, `k = 2`.

**How to narrate:**
> "Sorting is O(n log n) but I only need the top k. I'll keep a min-heap of size k: push
> every value and, whenever the heap overflows, drop its minimum — that minimum is the
> smallest of the k largest so far, so it can never be in the answer. At the end the
> heap's minimum is the kth largest. That's O(n log k) time and O(k) space."

## Related Problems

- [Kth Smallest Element in a Sorted Matrix](KthSmallestElement.md) — the mirror image
- [Find Kth Largest and Kth Smallest](FindKthLargestAndSmallest.md) — both at once
- [Top K Frequent Elements](TopKFrequentElements.md) — the same bounded heap
- [K Closest Elements](KClosestElements.md) — bounded heap by distance
