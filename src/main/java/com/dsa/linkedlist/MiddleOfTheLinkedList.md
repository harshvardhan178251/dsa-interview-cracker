---
title: Middle of the Linked List
leetcode: 876
difficulty: Easy
patterns: [Two pointers, Fast and slow]
companies: [Amazon, Google, Apple, Salesforce, Zillow]
frequency: 4
tags: [linked-list, pointers]
sampleInput: |
  5
  1 2 3 4 5
sampleOutput: "3"
---

# Middle of the Linked List — LeetCode 876

| | |
|---|---|
| **Difficulty** | Easy |
| **Pattern** | Two pointers · Fast and slow |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Microsoft, Uber, Bloomberg |

## Problem Statement

Given the head of a singly linked list, return the **middle node**.

- `1 -> 2 -> 3 -> 4 -> 5` → the node holding `3`.
- `1 -> 2 -> 3 -> 4` → the node holding `3` (the **second** of the two middle nodes, the one
  at index `len / 2`).
- The answer is a *node*, not a value — but the program prints the value it holds.

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
3
```

## Approach — Fast and Slow Pointers

The classic trick: the fast pointer moves **two** steps per round, the slow pointer moves
**one**. The fast pointer therefore covers twice the distance, and when it can no longer
move two steps the slow pointer has covered exactly half the list.

```java
while (fast != null && fast.next != null) {
    slow = slow.next;
    fast = fast.next.next;
}
```

**Why this returns the second middle for even lengths:** the loop body only runs while
`fast.next` exists, so with 4 nodes the slow pointer advances twice and lands on the 3rd
node (index `4 / 2 = 2`) — the second middle. With 5 nodes it advances twice as well and
lands on the 3rd node (index 2), the true middle.

**Alternative:** two passes — count the length, then walk `len / 2` steps. Same O(n) time,
slightly more code. The one-pass version is what interviewers like to see.

## Dry Run

Input: `1 -> 2 -> 3 -> 4 -> 5`

| Step | `slow` | `fast` | `fast.next` | `fast.next.next` | note |
|---:|---|---|---|---|---|
| 0 | `1` | `1` | `2` | `3` | both at the head |
| 1 | `2` | `3` | `4` | `5` | continue |
| 2 | `3` | `5` | `null` | — | `fast.next == null` → stop |

`slow` is on the node holding `3` — the middle of 5 nodes. ✓

### Even length — `1 -> 2 -> 3 -> 4`

| Step | `slow` | `fast` | note |
|---:|---|---|---|
| 0 | `1` | `1` | |
| 1 | `2` | `3` | `fast.next` = `4` exists → the body runs |
| 2 | `3` | `null` | `fast == null` → stop |

`slow` ends on the node holding `3` — the second middle node (index `4 / 2 = 2`), exactly
what LeetCode asks for. ✓

## Java Solution

See [`MiddleOfTheLinkedList.java`](./MiddleOfTheLinkedList.java).

```java
public static ListNode middleNode(ListNode head) {
    ListNode slow = head;
    ListNode fast = head;
    while (fast != null && fast.next != null) {
        slow = slow.next;
        fast = fast.next.next;
    }
    return slow;
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(len) | One pass; the slow pointer travels half the list |
| **Space** | O(1) | Two pointers |

## Interview Notes

**Follow-ups to raise yourself:**
- *"Return the middle **value** instead of the node."* → read `slow.val`.
- *"Return the first middle node for even lengths."* → change the loop condition to
  `fast.next != null && fast.next.next != null`.
- *"What is the k-th node from the end?"* → the same two-pointer trick with an offset — see
  [Remove Nth Node From End of List](DeleteNthFromEnd.md).
- *"Delete the middle node."* → find it, then unlink it with a dummy head.

**Common mistakes:**
- ❌ Using `fast.next.next != null` as the loop condition → for even lengths the slow
  pointer stops one node too early.
- ❌ Moving the fast pointer only one step → both pointers stay in lock-step and the slow
  one lands on the wrong node.
- ❌ Forgetting the `fast != null` check → `NullPointerException` on an empty or one-node
  list.

**How to narrate:**
> "I run a slow pointer that moves one step and a fast pointer that moves two. While the
> fast pointer can still take two steps, the slow one advances. The fast pointer covers
> twice the distance, so when it runs out the slow pointer is exactly at the middle — and
> because the loop only advances while `fast.next` exists, on an even-length list the slow
> pointer lands on the second middle node. One pass, O(1) space."

## Related Problems

- [Remove Nth Node From End of List](DeleteNthFromEnd.md) — the offset variant
- [Palindrome Linked List](PalindromeLinkedList.md) — finds the middle first
- [Reorder List](ReorderList.md) — splits at the middle
- [Linked List Cycle](DetectCycle.md) — the same two-pointer family
