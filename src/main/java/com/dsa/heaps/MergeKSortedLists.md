---
title: Merge k Sorted Lists
leetcode: 23
difficulty: Hard
patterns: [Heap, K-way merge, Divide and conquer]
companies: [Amazon, Google, Apple, Bloomberg, Stripe]
frequency: 4
tags: [heap, linked-list, merge, k-way]
sampleInput: |
  3
  4 1 4 5 6
  3 1 3 4
  2 2 6
sampleOutput: "1 1 2 3 4 4 5 6 6"
---

# Merge k Sorted Lists — LeetCode 23

| | |
|---|---|
| **Difficulty** | Hard |
| **Pattern** | Heap · K-way merge · Divide and conquer |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Meta, Google, Microsoft, Uber, LinkedIn |

## Problem Statement

Given `k` sorted singly linked lists, return one list that contains all the nodes of the
input lists in sorted order.

```
List 1: 1 → 4 → 5 → 6
List 2: 1 → 3 → 4
List 3: 2 → 6
```

Merged: `1 → 1 → 2 → 3 → 4 → 4 → 5 → 6 → 6`

## Input Format

The program reads from standard input:

```
k
m1 v1 v2 ... vm1
m2 v1 v2 ... vm2
...
```

- `k` — the number of lists (1 ≤ k ≤ 10³)
- one line per list: its length `mi` followed by its `mi` values in ascending order
- a length of `0` means an empty list

The program prints the merged values, separated by single spaces, on one line.

## Sample Input

```
3
4 1 4 5 6
3 1 3 4
2 2 6
```

## Expected Output

```
1 1 2 3 4 4 5 6 6
```

## Approach — The heap is the frontier of a k-way merge

Merging **two** sorted lists is a classic two-pointer walk. Merging **k** lists with the
same idea would need k pointers and a scan of k candidates per output element — O(k) per
element, O(Nk) in total.

A heap fixes that: keep the **current head of every list** in a min-heap. The heap's
minimum is the smallest value that has not been emitted yet.

1. Push the head of every non-empty list into the heap.
2. Pop the smallest node, append it to the output, and push its successor.
3. Repeat until the heap is empty.

The heap never holds more than one node per list, so it is exactly the set of "candidates
for the next output value".

**Why it is correct:** at every moment the heap contains the smallest not-yet-emitted
element of every list. The smallest of those is the smallest not-yet-emitted element of
the whole merge.

## Dry Run

Input: three lists `[1,4,5,6]`, `[1,3,4]`, `[2,6]`

The heap holds the **values** of the nodes it contains — one per list that still has
unemitted nodes.

| Step | heap before | popped | pushed back | heap after | emitted |
|---:|---|---:|---|---|---|
| 0 | — | — | 1, 1, 2 | `[1, 1, 2]` | — |
| 1 | `[1, 1, 2]` | 1 (list 1) | 4 | `[1, 2, 4]` | `1` |
| 2 | `[1, 2, 4]` | 1 (list 2) | 3 | `[2, 4, 3]` | `1` |
| 3 | `[2, 4, 3]` | 2 (list 3) | 6 | `[3, 4, 6]` | `2` |
| 4 | `[3, 4, 6]` | 3 (list 2) | 4 | `[4, 6, 4]` | `3` |
| 5 | `[4, 6, 4]` | 4 (list 1) | 5 | `[4, 6, 5]` | `4` |
| 6 | `[4, 6, 5]` | 4 (list 2) | — | `[5, 6]` | `4` |
| 7 | `[5, 6]` | 5 (list 1) | 6 | `[6, 6]` | `5` |
| 8 | `[6, 6]` | 6 (list 1) | — | `[6]` | `6` |
| 9 | `[6]` | 6 (list 3) | — | `[]` | `6` |

Every emitted value is the smallest value still hidden in one of the lists ✓

## Java Solution

See [`MergeKSortedLists.java`](./MergeKSortedLists.java).

```java
MinHeap<ListNode> heap = new MinHeap<ListNode>(Comparator.comparingInt((ListNode node) -> node.val));
for (ListNode head : lists) {
    if (head != null) {
        heap.add(head);
    }
}

ListNode dummy = new ListNode();
ListNode tail = dummy;
while (!heap.isEmpty()) {
    ListNode node = heap.poll();
    tail.next = node;
    tail = node;
    if (node.next != null) {
        heap.add(node.next);
    }
}
tail.next = null;
return dummy.next;
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(N log k) | one heap push and one pop per node, N nodes in total |
| **Space** | O(k) | the heap holds at most one node per list |

**Alternatives:** dividing the lists in half and merging pairwise is also
O(N log k) time with O(1) extra space — a good follow-up answer when the interviewer
wants you to avoid the heap.

## Interview Notes

**Follow-ups to raise yourself:**
- *"Can you do it without a heap?"* → yes, divide and conquer: merge the lists pairwise,
  halving the number of lists each round — O(N log k) time, O(1) space.
- *"What if the lists are not sorted?"* → nothing helps: you need a full sort, O(N log N).
- *"What if the merge has to be lazy / streaming?"* → the heap version is naturally
  streaming: it emits values one at a time and only holds k nodes.
- *"How would you merge k sorted files from disk?"* → the same k-way merge with a heap of
  file readers — that is literally how `sort` works in Unix.

**Common mistakes:**
- ❌ Forgetting to push the **successor** of the popped node → the merge stops early.
- ❌ Reusing the popped node's `next` pointer and then overwriting it → the input lists
  get corrupted (the classic "linked list aliasing" bug).
- ❌ Not terminating the merged list with `null` → the last node still points into an
  input list and the result has a cycle.

**How to narrate:**
> "Merging two lists is a two-pointer walk, but merging k lists with k pointers costs O(k)
> per output value. Instead I keep the current head of every list in a min-heap: the
> heap's minimum is always the next value of the merge. I pop it, emit it and push its
> successor. The heap holds at most k nodes, so this is O(N log k) time and O(k) space."

## Related Problems

- [Kth Smallest Element in a Sorted Matrix](KthSmallestElement.md) — the same heap over many sorted rows
- [Merge Two Sorted Lists](../linkedlist/MergeTwoSortedLists.md) — the k = 2 case
- [Top K Frequent Elements](TopKFrequentElements.md) — a bounded heap
- [Find Median from Data Stream](FindMedianFromDataStream.md) — two heaps
