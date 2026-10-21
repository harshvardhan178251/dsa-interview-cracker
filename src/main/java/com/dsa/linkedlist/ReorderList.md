---
title: Reorder List
leetcode: 143
difficulty: Medium
patterns: [Two pointers, Divide and conquer on a list]
companies: [Amazon, Google, Salesforce, Uber, Intel]
frequency: 4
tags: [linked-list, pointers, in-place]
sampleInput: |
  5
  1 2 3 4 5
sampleOutput: "1 5 2 4 3"
---

# Reorder List — LeetCode 143

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Two pointers · Divide and conquer on a list |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Microsoft, Uber, Bloomberg |

## Problem Statement

Reorder the nodes of a singly linked list so that they alternate between the **first half**
and the **second half**:

- `1 -> 2 -> 3 -> 4 -> 5` becomes `1 -> 5 -> 2 -> 4 -> 3`.
- `1 -> 2 -> 3 -> 4` becomes `1 -> 4 -> 2 -> 3`.
- The list must be reordered **in place** — no new nodes, no extra list.

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
1 5 2 4 3
```

## Approach — Split, Reverse, Interleave

The target order takes one node from the front of the list and one from the back, alternating.
That decomposes into three classic list operations:

1. **Split** the list into two halves. A slow/fast pointer pair finds the middle: `fast`
   moves twice as fast, so when `fast` reaches the end, `slow` is on the last node of the
   first half. Cut the link there.
2. **Reverse** the second half. The second half is now in the order we want to consume it
   (back to front).
3. **Interleave** the two halves: take one node from the first half, then one from the
   reversed second half, and repeat.

The interleaving loop must save both `next` pointers *before* overwriting them — the
classic place to lose a list.

**Why the second half is longer for odd lengths:** with 5 nodes the first half has 2 nodes
and the second has 3. The interleave loop runs while the second half has nodes, so the
extra node ends up at the end (`1 5 2 4 3`) — exactly the required order.

## Dry Run

Input: `1 -> 2 -> 3 -> 4 -> 5`

**Step 1 — find the middle**

| Step | `slow` | `fast` | list |
|---:|---|---|---|
| 0 | `1` | `1` | `1 -> 2 -> 3 -> 4 -> 5` |
| 1 | `2` | `3` | `1 -> 2 -> 3 -> 4 -> 5` |
| 2 | `3` | `5` | `1 -> 2 -> 3 -> 4 -> 5` |

`fast.next == null` → stop. `slow` is on `3`; cutting `slow.next` gives
`1 -> 2 -> 3` and `4 -> 5`.

**Step 2 — reverse the second half**

| Step | `curr` | saved `next` | `curr.next` becomes | `prev` after | reversed chain |
|---:|---:|---:|---:|---:|---|
| 1 | `4` | `5` | `null` | `4` | `4` |
| 2 | `5` | `null` | `4` | `5` | `5 -> 4` |

**Step 3 — interleave** (`first = 1`, `secondHead = 5`)

| Step | `first` | `secondHead` | `first.next` | `secondHead.next` | list |
|---:|---|---|---|---|---|
| 1 | `1` | `5` | `5` | `2` | `1 -> 5 -> 2 -> 3 -> 4` |
| 2 | `2` | `4` | `4` | `3` | `1 -> 5 -> 2 -> 4 -> 3` |
| 3 | `3` | `null` | — | — | `1 -> 5 -> 2 -> 4 -> 3` |

`secondHead` is `null`, so the loop ends and the third node of the first half (`3`) stays at
the tail. ✓

## Java Solution

See [`ReorderList.java`](./ReorderList.java).

```java
public static void reorderList(ListNode head) {
    if (head == null || head.next == null) {
        return;
    }

    // 1. find the middle
    ListNode slow = head;
    ListNode fast = head;
    while (fast.next != null && fast.next.next != null) {
        slow = slow.next;
        fast = fast.next.next;
    }
    ListNode second = slow.next;
    slow.next = null;

    // 2. reverse the second half
    ListNode prev = null;
    ListNode curr = second;
    while (curr != null) {
        ListNode next = curr.next;
        curr.next = prev;
        prev = curr;
        curr = next;
    }

    // 3. interleave
    ListNode first = head;
    ListNode secondHead = prev;
    while (secondHead != null) {
        ListNode firstNext = first.next;
        ListNode secondNext = secondHead.next;
        first.next = secondHead;
        secondHead.next = firstNext;
        first = firstNext;
        secondHead = secondNext;
    }
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(len) | Three linear passes |
| **Space** | O(1) | Only pointers — no new nodes, no recursion |

## Interview Notes

**Follow-ups to raise yourself:**
- *"Do it with one pass / without reversing?"* → you can interleave by walking the second
  half backwards with a stack (O(n) space) or by reversing as above.
- *"Reorder into the zigzag pattern."* → the same three phases, but alternate the
  comparison direction.
- *"Reorder so that the first half keeps its order and the second half is reversed."* →
  that is just phases 1 and 2 without the interleave.
- *"Do it recursively."* → recurse on the second half, then splice the node before the
  midpoint to the end.

**Common mistakes:**
- ❌ Overwriting `first.next` before saving `firstNext` → the rest of the first half is lost.
- ❌ Cutting the list at the wrong node → the halves overlap or a node is duplicated.
- ❌ Forgetting the odd-length case → the loop must stop when the *second* half runs out,
  not the first.

**How to narrate:**
> "The target order alternates between the front and the back of the list, so I split it in
> three phases. First I find the middle with a slow and a fast pointer and cut the list in
> two. Then I reverse the second half, which turns it into exactly the order I want to
> consume it. Finally I interleave the two halves, saving both next pointers before I
> overwrite them. Three linear passes, O(1) extra space, and the list is modified in place."

## Related Problems

- [Reverse Linked List](ReverseLinkedList.md) — phase 2 on its own
- [Reverse Linked List II](ReverseLinkedListII.md) — reverse a segment
- [Middle of the Linked List](MiddleOfTheLinkedList.md) — phase 1 on its own
- [Palindrome Linked List](PalindromeLinkedList.md) — the same three phases
