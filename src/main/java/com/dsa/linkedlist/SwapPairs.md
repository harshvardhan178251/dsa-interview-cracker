---
title: Swap Nodes in Pairs
leetcode: 24
difficulty: Medium
patterns: [Pointer rewiring, Dummy head]
companies: [Amazon, Google, Apple, Microsoft, Zillow]
frequency: 4
tags: [linked-list, pointers, in-place]
sampleInput: |
  4
  1 2 3 4
sampleOutput: "2 1 4 3"
---

# Swap Nodes in Pairs — LeetCode 24

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Pointer rewiring · Dummy head |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Microsoft, Uber, Bloomberg |

## Problem Statement

Given the head of a singly linked list, swap every pair of **adjacent** nodes.

- `1 -> 2 -> 3 -> 4` becomes `2 -> 1 -> 4 -> 3`.
- `1 -> 2 -> 3` becomes `2 -> 1 -> 3` — the odd node at the end stays.
- `1` stays `1`.

## Input Format

The program reads from standard input:

```
len
values[0] values[1] ... values[len-1]
```

- `len` — number of nodes (1 ≤ len ≤ 100)
- `values` — len space-separated integers

## Sample Input

```
4
1 2 3 4
```

## Expected Output

```
2 1 4 3
```

## Approach — Dummy Head and a Two-Step Cursor

Swapping two nodes means changing **three** pointers, and the node in front of the pair
must be updated too. A **dummy head** provides that "node in front" even for the first pair,
so there is no special case for the head of the list.

For each pair (`first`, `second`) with the node `prev` in front of it:

1. `first.next = second.next` — the first node skips over the second.
2. `second.next = first` — the second node now points at the first.
3. `prev.next = second` — the node in front of the pair now points at the (new) first node
   of the pair.
4. `prev = first` — the cursor moves to the end of the swapped pair, because `first` is now
   the **second** node of it.

The loop condition `prev.next != null && prev.next.next != null` stops as soon as a pair
cannot be completed, which is exactly the odd-length case.

## Dry Run

Input: `dummy -> 1 -> 2 -> 3 -> 4`

| Step | `prev` | pair | `first.next` set to | `second.next` set to | `prev.next` set to | list |
|---:|---|---|---|---|---|---|
| 0 | `dummy` | `1, 2` | — | — | — | `dummy -> 1 -> 2 -> 3 -> 4` |
| 1 | `dummy` | `1, 2` | `3` | `1` | `2` | `dummy -> 2 -> 1 -> 3 -> 4` |
| 2 | `1` | `3, 4` | `null` | `3` | `4` | `dummy -> 2 -> 1 -> 4 -> 3` |
| 3 | `3` | — | — | — | — | `prev.next.next == null` → stop |

`dummy.next` is `2` → the result is `2 1 4 3`. ✓

### Odd length — `dummy -> 1 -> 2 -> 3`

| Step | `prev` | pair | list |
|---:|---|---|---|
| 1 | `dummy` | `1, 2` | `dummy -> 2 -> 1 -> 3` |
| 2 | `1` | — | `prev.next.next == null` → stop |

The lonely `3` stays at the end. ✓

## Java Solution

See [`SwapPairs.java`](./SwapPairs.java).

```java
public static ListNode swapPairs(ListNode head) {
    ListNode dummy = new ListNode(0, head);
    ListNode prev = dummy;

    while (prev.next != null && prev.next.next != null) {
        ListNode first = prev.next;
        ListNode second = first.next;
        first.next = second.next;
        second.next = first;
        prev.next = second;
        prev = first;
    }
    return dummy.next;
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(len) | One pass; every pair is touched once |
| **Space** | O(1) | A dummy head and three pointers |

## Interview Notes

**Follow-ups to raise yourself:**
- *"Swap the values instead of the nodes."* → a much easier problem: keep a `prev` and
  swap the two values.
- *"Reverse the list in groups of k (LeetCode 25)."* → the same skeleton with a loop inside
  the group.
- *"Reverse every three nodes."* → the same idea with a group of three.
- *"Do it recursively."* → swap the first two, then recurse on the rest; the recursion is
  O(n) stack.

**Common mistakes:**
- ❌ Setting `prev = second` instead of `prev = first` → the cursor stays inside the pair
  and the same pair is swapped again.
- ❌ Forgetting `prev.next = second` → the list keeps the original first node of the pair
  and the swap is invisible.
- ❌ Using `prev.next != null` only as the loop condition → the last node has no partner and
  the code throws `NullPointerException`.

**How to narrate:**
> "Swapping two adjacent nodes changes three pointers, and the node before the pair has to
> be updated too — a dummy head gives me that node for free. I keep `prev` pointing at the
> node before the current pair; for each pair I rewire first, second and prev, then move
> `prev` to the end of the swapped pair, which is the node that used to be first. The loop
> stops as soon as a complete pair is no longer available, so an odd last node is left
> alone. One pass, O(1) space."

## Related Problems

- [Reverse Nodes in k-Group](ReverseNodesInKGroup.md) — the group variant
- [Reverse Linked List II](ReverseLinkedListII.md) — reversing a segment
- [Odd Even Linked List](OddEvenLinkedList.md) — another two-chain rewiring
