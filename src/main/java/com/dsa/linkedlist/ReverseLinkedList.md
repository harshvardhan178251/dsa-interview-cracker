---
title: Reverse Linked List
leetcode: 206
difficulty: Easy
patterns: [Pointer rewiring, Iterative reversal]
companies: [Google, Meta, Amazon, LinkedIn, JP Morgan, Salesforce, Paytm]
frequency: 5
tags: [linked-list, pointers, in-place]
sampleInput: |
  5
  1 2 3 4 5
sampleOutput: "5 4 3 2 1"
---

# Reverse Linked List — LeetCode 206

| | |
|---|---|
| **Difficulty** | Easy |
| **Pattern** | Pointer rewiring · Iterative reversal |
| **Interview heat** | ★★★★★ |
| **Asked at** | Amazon, Google, Meta, Microsoft, Uber, Bloomberg |

## Problem Statement

Given the head of a singly linked list, reverse the list **in place** and return its new head.

- The list `1 -> 2 -> 3 -> 4 -> 5` must become `5 -> 4 -> 3 -> 2 -> 1`.
- The node **values** stay the same; only the `next` arrows change.
- An empty list reverses to an empty list.

## Input Format

The program reads from standard input:

```
n
values[0] values[1] ... values[n-1]
```

- `n` — number of nodes (0 ≤ n ≤ 10⁴)
- `values` — n space-separated integers, the node values in order

## Sample Input

```
5
1 2 3 4 5
```

## Expected Output

```
5 4 3 2 1
```

## Approach — Three Pointers, One Pass

Reversal is nothing more than flipping every arrow. To flip an arrow safely you need to know
where it pointed *before* you overwrite it, so the loop keeps three pointers:

| Pointer | Meaning |
|---|---|
| `prev` | head of the part that has **already** been reversed |
| `curr` | the node currently being processed |
| `next` | the node `curr.next` pointed at, saved before the flip |

Each iteration does exactly four things:

1. `next = curr.next` — save the continuation.
2. `curr.next = prev` — flip the arrow backwards.
3. `prev = curr` — the reversed prefix grows by one node.
4. `curr = next` — advance into the untouched remainder.

When `curr` finally becomes `null` the whole list has been reversed and `prev` is the new head.

**Why not recursion?** A recursive version is shorter to write but costs O(n) call-stack space
and blows up on a 10⁵-node list in Java. The iterative version uses one extra variable and
is what you should write in an interview unless the interviewer asks for recursion.

## Dry Run

Input: `1 -> 2 -> 3 -> 4 -> 5`

| Step | `curr` | saved `next` | `curr.next` becomes | `prev` after | reversed prefix | untouched remainder |
|---:|---:|---:|---:|---:|---|---|
| 0 | — | — | — | `null` | `null` | `1 -> 2 -> 3 -> 4 -> 5` |
| 1 | `1` | `2` | `null` | `1` | `1` | `2 -> 3 -> 4 -> 5` |
| 2 | `2` | `3` | `1` | `2` | `2 -> 1` | `3 -> 4 -> 5` |
| 3 | `3` | `4` | `2` | `3` | `3 -> 2 -> 1` | `4 -> 5` |
| 4 | `4` | `5` | `3` | `4` | `4 -> 3 -> 2 -> 1` | `5` |
| 5 | `5` | `null` | `4` | `5` | `5 -> 4 -> 3 -> 2 -> 1` | `null` |

`curr` is now `null`, the loop ends, and `prev` (`5`) is returned. ✓

### Edge case — a single node

| Step | `curr` | saved `next` | `curr.next` becomes | `prev` after | result |
|---:|---:|---:|---:|---:|---|
| 1 | `7` | `null` | `null` | `7` | `7` |

One iteration, no special case needed.

## Java Solution

See [`ReverseLinkedList.java`](./ReverseLinkedList.java).

```java
public static ListNode reverse(ListNode head) {
    ListNode prev = null;
    ListNode curr = head;
    while (curr != null) {
        ListNode next = curr.next;   // remember where to go after the flip
        curr.next = prev;            // flip the arrow backwards
        prev = curr;                 // prev now owns the reversed prefix
        curr = next;                 // move on to the untouched remainder
    }
    return prev;
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n) | Every node is visited exactly once |
| **Space** | O(1) | Only three references, no new nodes allocated |

**Optimal?** Yes — you must touch every node, and the in-place version needs no extra memory.

## Interview Notes

**Follow-ups to raise yourself:**
- *"Do it recursively."* → `reverse(head.next)` returns the new head of the rest; set
  `head.next.next = head`, `head.next = null`, return the recursive result.
- *"Reverse only the first k nodes (LeetCode 25)."* → stop the loop after k flips; the
  remainder is spliced back in.
- *"Reverse the sublist between positions m and n (LeetCode 92)."* → find the node before
  `m`, then repeatedly move the node after the segment to the front of it.
- *"Reverse in groups of k, keeping the leftover order (LeetCode 25)."* → see
  [Reverse Nodes in k-Group](./ReverseNodesInKGroup.md).

**Common mistakes:**
- ❌ Overwriting `curr.next` **before** saving it → the rest of the list is lost and the
  traversal dies after one node.
- ❌ Returning `head` instead of `prev` → `head` is now the *last* node of the reversed list.
- ❌ Forgetting the `curr != null` guard → `NullPointerException` on the final iteration.

**How to narrate:**
> "I'll reverse iteratively with three pointers. `prev` holds the already-reversed prefix,
> `curr` is the node I'm on, and before I flip `curr.next` I save the old target in `next`.
> Then I flip the arrow, advance `prev` to `curr`, and move `curr` to the saved node.
> When `curr` hits null, `prev` is the reversed list's head. That's O(n) time, O(1) space."

## Related Problems

- [Reverse Linked List II](ReverseLinkedListII.md) — reverse only a segment
- [Reverse Nodes in k-Group](ReverseNodesInKGroup.md) — reverse in blocks of k
- [Swap Nodes in Pairs](SwapPairs.md) — reverse every two nodes
- [Reorder List](ReorderList.md) — reverse the second half, then interleave
- [Palindrome Linked List](PalindromeLinkedList.md) — reverse half, then compare
