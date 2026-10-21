---
title: Merge Two Sorted Lists
leetcode: 21
difficulty: Easy
patterns: [Two pointers, Dummy head]
companies: [Google, Amazon, Meta, Adobe, Netflix, Uber, Datadog]
frequency: 5
tags: [linked-list, pointers, merge]
sampleInput: |
  3
  1 2 4
  3
  1 3 4
sampleOutput: "1 1 2 3 4 4"
---

# Merge Two Sorted Lists — LeetCode 21

| | |
|---|---|
| **Difficulty** | Easy |
| **Pattern** | Two pointers · Dummy head |
| **Interview heat** | ★★★★★ |
| **Asked at** | Amazon, Google, Meta, Microsoft, Uber, Bloomberg |

## Problem Statement

Merge two **sorted** (ascending) singly linked lists and return the head of the merged list.

- `1 -> 2 -> 4` and `1 -> 3 -> 4` merge into `1 -> 1 -> 2 -> 3 -> 4 -> 4`.
- The result must be sorted.
- The existing nodes are **re-linked**, not copied — this is what separates it from "merge two
  sorted arrays" where you build a new array.
- Either list may be empty.

## Input Format

The program reads from standard input:

```
n1
list1[0] list1[1] ... list1[n1-1]
n2
list2[0] list2[1] ... list2[n2-1]
```

- `n1` — length of the first list (0 ≤ n1 ≤ 10⁴)
- `list1` — n1 space-separated integers in ascending order
- `n2` — length of the second list (0 ≤ n2 ≤ 10⁴)
- `list2` — n2 space-separated integers in ascending order

## Sample Input

```
3
1 2 4
3
1 3 4
```

## Expected Output

```
1 1 2 3 4 4
```

## Approach — Two Pointers and a Dummy Head

The classic merge: keep a pointer at the head of each list, repeatedly take the **smaller**
head and append it to the result.

The only fiddly part is the *head* of the result. Instead of special-casing "what if the
first element I take comes from list 1?", we start the result with a **dummy head** node
whose value is irrelevant. We keep a `tail` pointer to the last node written and always do
`tail.next = chosen; tail = tail.next`. At the end `dummy.next` is the real head.

When one list is exhausted the loop stops — and because the other list is still sorted, its
entire remainder can be attached in one assignment: `tail.next = list1 != null ? list1 : list2`.

**Why `<=` and not `<`?** With `<=` the first list wins ties, which keeps the merge
**stable** — equal elements keep their relative order. Stability matters when the payloads
carry extra data.

## Dry Run

Input: `A = 1 -> 2 -> 4`, `B = 1 -> 3 -> 4`

| Step | `A.val` | `B.val` | chosen | `tail.next` after | result so far |
|---:|---:|---:|---|---|---|
| 0 | `1` | `1` | — | `dummy -> 1` (A) | `1` |
| 1 | `2` | `1` | B (`1 < 2`) | `1 -> 1` (B) | `1 -> 1` |
| 2 | `2` | `3` | A (`2 <= 3`) | `1 -> 1 -> 2` (A) | `1 -> 1 -> 2` |
| 3 | `4` | `3` | B (`3 < 4`) | `... -> 3` (B) | `1 -> 1 -> 2 -> 3` |
| 4 | `4` | `4` | A (`4 <= 4`) | `... -> 4` (A) | `1 -> 1 -> 2 -> 3 -> 4` |
| 5 | `4` | `null` | — | `tail.next = A` (rest) | `1 -> 1 -> 2 -> 3 -> 4 -> 4` |

Step 5 is the payoff of the sorted-input promise: the remaining `4` is attached in O(1). ✓

## Java Solution

See [`MergeTwoSortedLists.java`](./MergeTwoSortedLists.java).

```java
public static ListNode mergeTwoLists(ListNode list1, ListNode list2) {
    ListNode dummy = new ListNode(0);
    ListNode tail = dummy;

    while (list1 != null && list2 != null) {
        if (list1.val <= list2.val) {
            tail.next = list1;
            list1 = list1.next;
        } else {
            tail.next = list2;
            list2 = list2.next;
        }
        tail = tail.next;
    }
    tail.next = list1 != null ? list1 : list2;
    return dummy.next;
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n + m) | Each node is visited once; the tail is attached in O(1) |
| **Space** | O(1) | Only the dummy head and a few pointers |

## Interview Notes

**Follow-ups to raise yourself:**
- *"Merge `k` sorted lists."* → a min-heap of heads (each pop advances one list), or divide
  and conquer with pairwise merges.
- *"Merge two sorted **arrays** instead."* → same idea, but you may write into a third
  array; the in-place variant is the classic two-pointer exercise.
- *"What if the lists are not sorted?"* → sort them first (O(n log n)) and then merge.
- *"Reverse the merged list."* → another pointer exercise, see
  [Reverse Linked List](ReverseLinkedList.md).

**Common mistakes:**
- ❌ Advancing the chosen pointer **before** linking it → the node is skipped.
- ❌ Losing the tail (`tail = tail.next` missing) → every write lands on the same node.
- ❌ Building a brand new list instead of re-linking the existing nodes → the interviewer
  asked for a merge, not a concatenation.

**How to narrate:**
> "Both lists are sorted, so the smallest remaining element is always at the head of one of
> them. I keep a tail pointer to the result and repeatedly attach the smaller head. I'll use
> a dummy head so I don't have to special-case the first element. When one list runs out,
> the rest of the other is still sorted, so I attach it in one step. O(n + m) time, O(1)
> space, and the merge is stable because I use `<=`."

## Related Problems

- [Merge k Sorted Lists](../../../../../../docs/topics/06-heaps.md) — the heap generalisation
- [Add Two Numbers](AddTwoNumbers.md) — merge two digit lists
- [Reverse Linked List](ReverseLinkedList.md) — pointer rewiring drill
