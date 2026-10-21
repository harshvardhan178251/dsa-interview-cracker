---
title: Odd Even Linked List
leetcode: 328
difficulty: Medium
patterns: [Pointer rewiring, Two chains]
companies: [Google, Meta, Bloomberg, Adobe, Zillow]
frequency: 4
tags: [linked-list, pointers, in-place]
sampleInput: |
  5
  1 2 3 4 5
sampleOutput: "1 3 5 2 4"
---

# Odd Even Linked List — LeetCode 328

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Pointer rewiring · Two chains |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Microsoft, Uber, Bloomberg |

## Problem Statement

Reorder a singly linked list so that all the nodes at **odd** positions are followed by all the
nodes at **even** positions. The relative order within each group is preserved.

- `1 -> 2 -> 3 -> 4 -> 5` becomes `1 -> 3 -> 5 -> 2 -> 4`.
- `1 -> 2 -> 3 -> 4` becomes `1 -> 3 -> 2 -> 4`.
- Positions are 1-indexed: the head is position 1 (odd).

## Input Format

The program reads from standard input:

```
len
values[0] values[1] ... values[len-1]
```

- `len` — number of nodes (1 ≤ len ≤ 5 × 10⁴)
- `values` — len space-separated integers

## Sample Input

```
5
1 2 3 4 5
```

## Expected Output

```
1 3 5 2 4
```

## Approach — Two Chains, One Pass

The list is already a perfect interleaving of two subsequences: the odd positions and the
even positions. The job is to **separate** them and then **concatenate** them.

1. `oddHead` = node 1, `evenHead` = node 2.
2. Walk both chains at once. `odd.next = even.next` links the next odd node; `even.next =
   odd.next` links the next even node. Then advance both pointers.
3. The loop stops when the even chain runs out — at that point the last odd node is the
   tail of the odd chain.
4. `odd.next = evenHead` joins the two chains.

Doing it with two chains avoids the alternative "collect into an array and rebuild" which
costs O(n) space.

**Why the loop condition is `even != null && even.next != null`:** the even chain must
have a *successor* for the odd chain to be extended. On a list of odd length the even chain
is the shorter one and the last odd node stays the tail of the whole list.

## Dry Run

Input: `1 -> 2 -> 3 -> 4 -> 5`, `odd = 1`, `even = 2`

| Step | `odd` | `even` | `odd.next` set to | `even.next` set to | list |
|---:|---|---|---|---|---|
| 0 | `1` | `2` | — | — | `1 -> 2 -> 3 -> 4 -> 5` |
| 1 | `1` | `2` | `3` | `4` | `1 -> 3 -> 2 -> 4 -> 5` |
| 2 | `3` | `4` | `5` | `null` | `1 -> 3 -> 5 -> 2 -> 4` |
| 3 | `5` | `null` | — | — | loop ends (`even == null`) |

Now `odd` is on `5` (the tail of the odd chain) and `evenHead` is still `2`.

| Step | action | list |
|---:|---|---|
| 4 | `odd.next = evenHead` → `5.next = 2` | `1 -> 3 -> 5 -> 2 -> 4` |

The result is `1 3 5 2 4`. ✓

### Even length — `1 -> 2 -> 3 -> 4`

| Step | `odd` | `even` | `odd.next` | `even.next` | list |
|---:|---|---|---|---|---|
| 1 | `1` | `2` | `3` | `4` | `1 -> 3 -> 2 -> 4` |
| 2 | `3` | `4` | — | — | loop ends (`even.next == null`) |
| 3 | join: `3.next = 2` | | | | `1 -> 3 -> 2 -> 4` |

## Java Solution

See [`OddEvenLinkedList.java`](./OddEvenLinkedList.java).

```java
public static ListNode oddEvenList(ListNode head) {
    if (head == null || head.next == null) {
        return head;
    }
    ListNode oddHead = head;
    ListNode evenHead = head.next;
    ListNode odd = oddHead;
    ListNode even = evenHead;

    while (even != null && even.next != null) {
        odd.next = even.next;
        odd = odd.next;
        even.next = odd.next;
        even = even.next;
    }
    odd.next = evenHead;
    return oddHead;
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(len) | One pass over the nodes |
| **Space** | O(1) | Only four pointers |

## Interview Notes

**Follow-ups to raise yourself:**
- *"Odd positions first, then even, but reversed inside each group?"* → collect into two
  stacks and rebuild.
- *"Group the nodes by value parity instead of position."* → two buckets and a join.
- *"Rotate the list by one."* → the same shape of surgery — see
  [Rotate List](RotateList.md).
- *"Do it in O(1) space without mutating the list."* → you must copy into an array first:
  O(n) space, O(n) time.

**Common mistakes:**
- ❌ Setting `even.next = odd.next` **before** `odd.next = even.next` → the odd chain is
  broken and nodes are lost.
- ❌ Using `while (even != null)` only → the last iteration writes `odd.next = null` and
  drops the tail.
- ❌ Forgetting the final `odd.next = evenHead` → the even chain is left dangling.

**How to narrate:**
> "The list is already an interleaving of the odd and the even positions, so I split it into
> two chains in a single pass: the odd chain takes every second node, the even chain takes
> the rest. While the even chain has a successor, I rewire both `next` pointers. Then I
> link the tail of the odd chain to the head of the even chain. One pass, O(1) space, and
> the order inside each group is preserved."

## Related Problems

- [Rotate List](RotateList.md) — the same kind of surgery
- [Swap Nodes in Pairs](SwapPairs.md) — pairs instead of parity
- [Reorder List](ReorderList.md) — front/back interleaving
