---
title: Reverse Linked List II
leetcode: 92
difficulty: Medium
patterns: [Pointer rewiring, Segment reversal]
companies: [Amazon, Google, JP Morgan, Netflix, Walmart]
frequency: 4
tags: [linked-list, pointers, in-place]
sampleInput: |
  5
  1 2 3 4 5
  2
  4
sampleOutput: "1 4 3 2 5"
---

# Reverse Linked List II — LeetCode 92

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Pointer rewiring · Segment reversal |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Microsoft, Uber |

## Problem Statement

Given the head of a singly linked list and two positions `left` and `right` (1-indexed and
inclusive), **reverse the nodes in between** and return the head of the list.

- `left = 2, right = 4` on `1 -> 2 -> 3 -> 4 -> 5` yields `1 -> 4 -> 3 -> 2 -> 5`.
- Nodes outside `[left, right]` keep their positions.
- `left == right` changes nothing.

## Input Format

The program reads from standard input:

```
n
values[0] values[1] ... values[n-1]
left
right
```

- `n` — number of nodes (1 ≤ n ≤ 500)
- `values` — n space-separated integers
- `left` — 1-indexed first position of the segment to reverse
- `right` — 1-indexed last position of the segment to reverse

## Sample Input

```
5
1 2 3 4 5
2
4
```

## Expected Output

```
1 4 3 2 5
```

## Approach — Pull Nodes to the Front of the Segment

Reversing a segment "in place" is easy when you may use extra nodes, but here the node
objects themselves must be reused. The trick is to **move** nodes instead of moving data.

1. Walk to the node **before** `left` (`prev`) using a dummy head so that `left == 1` needs
   no special case.
2. Let `curr = prev.next` be the current first node of the segment.
3. Repeat `right - left` times:
   - `moved = curr.next` — the node directly after the segment,
   - `curr.next = moved.next` — unlink it (the segment shrinks by one),
   - `moved.next = prev.next` — insert it at the front of the segment,
   - `prev.next = moved` — the segment's head now points at it.

Each pass puts one more node at the front of the segment, so after `right - left` passes the
segment reads backwards. `curr` always stays the **last** node of the segment, which is
exactly where it must end up.

**Alternative:** reverse the whole list, reverse the part before `left`, reverse the part
after `right` — three reversals, also O(n) time. The move-to-front version touches fewer
nodes, so it is the one to narrate.

## Dry Run

Input: `1 -> 2 -> 3 -> 4 -> 5`, `left = 2`, `right = 4`

Setup: `dummy -> 1 -> 2 -> 3 -> 4 -> 5`, `prev = 1`, `curr = 2`, segment = `[2, 3, 4]`

| Step | `prev` | `curr` | `moved` | action | list after |
|---:|---:|---:|---:|---|---|
| 0 | `1` | `2` | — | setup (`dummy -> 1 -> 2 -> 3 -> 4 -> 5`) | `1 -> 2 -> 3 -> 4 -> 5` |
| 1 | `1` | `2` | `3` | unlink `3` from `2`; `3 -> 2`; `prev.next = 3` | `1 -> 3 -> 2 -> 4 -> 5` |
| 2 | `1` | `2` | `4` | unlink `4` from `2`; `4 -> 3`; `prev.next = 4` | `1 -> 4 -> 3 -> 2 -> 5` |
| 3 | `1` | `2` | `5` | loop ends (`right - left = 2` passes) | `1 -> 4 -> 3 -> 2 -> 5` |

`curr` is still `2` and it is now the **last** node of the segment `[4, 3, 2]` ✓

## Java Solution

See [`ReverseLinkedListII.java`](./ReverseLinkedListII.java).

```java
public static ListNode reverseBetween(ListNode head, int left, int right) {
    if (head == null || left >= right) {
        return head;
    }
    ListNode dummy = new ListNode(0, head);
    ListNode prev = dummy;
    for (int i = 1; i < left; i++) {
        prev = prev.next;
    }
    ListNode curr = prev.next;                 // the first node of the segment
    for (int i = 0; i < right - left; i++) {
        ListNode moved = curr.next;            // the node to move to the front
        curr.next = moved.next;                // unlink it from its place
        moved.next = prev.next;                // link it in front of the segment
        prev.next = moved;
    }
    return dummy.next;
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n) | One walk to `left` plus `right - left` O(1) moves |
| **Space** | O(1) | Only three references, no extra nodes |

## Interview Notes

**Follow-ups to raise yourself:**
- *"Can you do it with a head/tail swap instead?"* → yes: find the node before `left` and
  the node after `right`, then swap and rewire the tails of the two halves.
- *"What if the segment spans the whole list?"* → the dummy head covers `left == 1`; the
  algorithm is unchanged.
- *"Reverse the segment with a stack instead."* → push the segment onto a stack and rebuild
  it; O(k) extra space but conceptually simpler.

**Common mistakes:**
- ❌ Losing the reference to `curr.next` before saving it → the remainder of the list
  disappears.
- ❌ Moving `prev` forward during the loop → the front of the segment drifts and the result
  is wrong.
- ❌ Forgetting the dummy head → `left == 1` has no "node before the segment" and throws
  `NullPointerException`.

**How to narrate:**
> "I will not create new nodes. I find the node before `left` — using a dummy head so
> position 1 is handled — and then, `right - left` times, I pull the node that sits right
> after the segment and insert it at the front of the segment. Each pull adds one node to
> the front, so after the loop the segment reads backwards, and the nodes outside the
> segment never moved."

## Related Problems

- [Reverse Linked List](ReverseLinkedList.md) — reverse everything
- [Reverse Nodes in k-Group](ReverseNodesInKGroup.md) — reverse blocks of k
- [Swap Nodes in Pairs](SwapPairs.md) — reverse every two nodes
- [Rotate List](RotateList.md) — move the tail to the front
