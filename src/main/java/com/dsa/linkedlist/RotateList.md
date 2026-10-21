---
title: Rotate List
leetcode: 61
difficulty: Medium
patterns: [Pointer rewiring, Circular list]
companies: [Amazon, Meta, Microsoft, Netflix, Oracle]
frequency: 4
tags: [linked-list, pointers, in-place]
sampleInput: |
  5
  1 2 3 4 5
  2
sampleOutput: "4 5 1 2 3"
---

# Rotate List — LeetCode 61

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Pointer rewiring · Circular list |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Microsoft, Uber, Bloomberg |

## Problem Statement

Given the head of a singly linked list and an integer `k`, rotate the list to the **right** by
`k` positions.

- `1 -> 2 -> 3 -> 4 -> 5` with `k = 2` becomes `4 -> 5 -> 1 -> 2 -> 3`.
- `k` may be larger than the length of the list (use `k mod n`).
- `k = 0` returns the list unchanged.

## Input Format

The program reads from standard input:

```
len
values[0] values[1] ... values[len-1]
k
```

- `len` — number of nodes (1 ≤ len ≤ 5 × 10⁴)
- `values` — len space-separated integers
- `k` — how many positions to rotate right (0 ≤ k ≤ 2 × 10⁹)

## Sample Input

```
5
1 2 3 4 5
2
```

## Expected Output

```
4 5 1 2 3
```

## Approach — Close the Circle, Then Cut It

Rotating a list by `k` is the same as cutting a **circular** list at a different point. So:

1. Walk to the tail and remember the length `len`.
2. Reduce `k` to `k mod len` — rotating by `len` is the identity.
3. The node that ends up **last** is the `(len - k)`-th node; the node that ends up **first**
   is its successor. Walk `len - k - 1` steps to find that new tail.
4. Break the list there (`newTail.next = null`) and close the circle (`tail.next = head`).
5. The successor of the new tail is the new head.

**Why the new tail is the `(len - k)`-th node:** after rotating right by `k`, the last `k`
nodes end up in front. The node that was at position `len - k` (1-indexed) is the last node
of the remaining front part, so it becomes the tail of the whole list.

**Alternative:** reverse the list, take `k` nodes off the front, reverse again and stitch —
more steps, same complexity. The circular trick is the one to narrate.

## Dry Run

Input: `1 -> 2 -> 3 -> 4 -> 5`, `k = 2`, `len = 5`

| Step | action | `newTail` | `newHead` | list state |
|---:|---|---|---|---|
| 0 | initial | — | — | `1 -> 2 -> 3 -> 4 -> 5` |
| 1 | walk to the tail, `len = 5`, `tail = 5` | — | — | `1 -> 2 -> 3 -> 4 -> 5` |
| 2 | `k = 2 % 5 = 2` | — | — | `1 -> 2 -> 3 -> 4 -> 5` |
| 3 | walk `len - k - 1 = 2` steps | `3` | — | `1 -> 2 -> 3 -> 4 -> 5` |
| 4 | `newHead = newTail.next`; `newTail.next = null` | `3` | `4` | `1 -> 2 -> 3` and `4 -> 5` |
| 5 | `tail.next = head` (close the circle) | `3` | `4` | `1 -> 2 -> 3 -> 4 -> 5 -> 1 -> 2 -> 3` |
| 6 | return `newHead` | `3` | `4` | `4 -> 5 -> 1 -> 2 -> 3` |

The result is `4 5 1 2 3`. ✓

### Edge case — `k` larger than the list

`len = 3`, `k = 7` → `k = 7 % 3 = 1` → one position to the right → `3 -> 1 -> 2`.

## Java Solution

See [`RotateList.java`](./RotateList.java).

```java
public static ListNode rotateRight(ListNode head, int k) {
    if (head == null || head.next == null) {
        return head;
    }
    int length = 1;
    ListNode tail = head;
    while (tail.next != null) {
        tail = tail.next;
        length++;
    }
    k = ((k % length) + length) % length;
    if (k == 0) {
        return head;
    }
    ListNode newTail = head;
    for (int i = 1; i < length - k; i++) {
        newTail = newTail.next;
    }
    ListNode newHead = newTail.next;
    newTail.next = null;      // break the list in two
    tail.next = head;         // close the circle
    return newHead;
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(len) | Two linear walks |
| **Space** | O(1) | Only pointers |

## Interview Notes

**Follow-ups to raise yourself:**
- *"Rotate to the left instead."* → the new head is the `(k + 1)`-th node and the new tail
  is the `k`-th node; the same circle trick applies.
- *"What if `k` is huge?"* → reduce it with `k % len` first.
- *"Rotate an array instead."* → three reversals, or the same "cut the circle" idea with
  modular arithmetic.
- *"Rotate by `k` in O(1) space without knowing the length."* → impossible in one pass
  without the length or a sentinel; the two-pass version is the standard answer.

**Common mistakes:**
- ❌ Forgetting `k % len` → the walk runs past the end of the list.
- ❌ Breaking the list **before** saving `newHead` → `newHead` is lost.
- ❌ Setting `tail.next = head` before `newTail.next = null` → the old tail keeps the old
  successor and the list grows a loop in the wrong place.

**How to narrate:**
> "A rotation is a cut in a circular list. I walk to the tail, get the length, and reduce k
> modulo the length. The node that becomes the new tail is the (length − k)-th node, so I
> walk to it, remember its successor as the new head, cut the list after the new tail and
> link the old tail back to the head. O(n) time, O(1) space."

## Related Problems

- [Reverse Linked List](ReverseLinkedList.md) — the same pointer surgery
- [Reverse Nodes in k-Group](ReverseNodesInKGroup.md) — blocks of k
- [Reorder List](ReorderList.md) — split, reverse, interleave
