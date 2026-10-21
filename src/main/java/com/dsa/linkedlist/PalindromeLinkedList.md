---
title: Palindrome Linked List
leetcode: 234
difficulty: Medium
patterns: [Two pointers, Reverse a half list]
companies: [Meta, Amazon, Goldman Sachs, Apple, Intel, Capgemini, HCLTech, Canva]
frequency: 4
tags: [linked-list, pointers, palindrome]
sampleInput: |
  5
  1 2 3 2 1
sampleOutput: "true"
---

# Palindrome Linked List — LeetCode 234

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Two pointers · Reverse a half list |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Microsoft, Uber, Bloomberg |

## Problem Statement

Given the head of a singly linked list, return `true` if the list is a **palindrome** — the
values read the same forwards and backwards — and `false` otherwise.

- `1 -> 2 -> 3 -> 2 -> 1` is a palindrome.
- `1 -> 2` is not.
- The list is not modified in the answer (the classic in-place version does modify it, but
  the values are what matters here).

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
1 2 3 2 1
```

## Expected Output

```
true
```

Reading backwards gives `1 2 3 2 1` as well. ✓

## Approach — Reverse the Back Half and Compare

You cannot walk backwards through a singly linked list, so the only way to compare the front
with the back is to **reverse the back**. Three phases, exactly like
[Reorder List](ReorderList.md):

1. **Find the middle.** A slow/fast pointer pair: `fast` moves two steps per round, `slow`
   one. The loop condition `fast.next != null && fast.next.next != null` stops with `slow`
   on the **last node of the first half** — which also makes the odd-length case work
   (the middle node is skipped, and it is its own mirror).
2. **Reverse the second half** in place.
3. **Compare** the front pointer with the reversed back pointer, one node at a time, until
   the back pointer runs out.

**Why the back pointer is the right stopping condition:** the back half is never longer than
the front half, so when the back pointer reaches `null` every mirrored pair has been checked.

## Dry Run

Input: `1 -> 2 -> 3 -> 2 -> 1`

**Step 1 — find the middle**

| Step | `slow` | `fast` | list |
|---:|---|---|---|
| 0 | `1` | `1` | `1 -> 2 -> 3 -> 2 -> 1` |
| 1 | `2` | `3` | `1 -> 2 -> 3 -> 2 -> 1` |
| 2 | `3` | `5` | `1 -> 2 -> 3 -> 2 -> 1` |

`fast.next == null` → stop. The first half is `1 -> 2 -> 3`, the second half is
`2 -> 1`.

**Step 2 — reverse the second half**

| Step | `curr` | saved `next` | `curr.next` becomes | `prev` after | reversed chain |
|---:|---:|---:|---:|---:|---|
| 1 | `2` | `1` | `null` | `2` | `2` |
| 2 | `1` | `null` | `2` | `1` | `1 -> 2` |

**Step 3 — compare**

| Step | `front` | `back` | equal? | verdict |
|---:|---|---|---|---|
| 1 | `1` | `1` | yes | continue |
| 2 | `2` | `2` | yes | continue |
| 3 | `3` | `null` | — | loop ends → **palindrome** |

The value `3` in the middle is never compared with anything, which is correct: the middle
node of an odd-length list mirrors itself. ✓

### Counter-example — `1 -> 2`

| Step | `front` | `back` | equal? | verdict |
|---:|---|---|---|---|
| 1 | `1` | `2` | **no** | not a palindrome |

## Java Solution

See [`PalindromeLinkedList.java`](./PalindromeLinkedList.java).

```java
public static boolean isPalindrome(ListNode head) {
    if (head == null || head.next == null) {
        return true;
    }
    ListNode slow = head;
    ListNode fast = head;
    while (fast.next != null && fast.next.next != null) {
        slow = slow.next;
        fast = fast.next.next;
    }
    ListNode prev = null;
    ListNode curr = slow.next;
    while (curr != null) {
        ListNode next = curr.next;
        curr.next = prev;
        prev = curr;
        curr = next;
    }
    ListNode front = head;
    ListNode back = prev;
    while (back != null) {
        if (front.val != back.val) {
            return false;
        }
        front = front.next;
        back = back.next;
    }
    return true;
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(len) | Three linear passes |
| **Space** | O(1) | Only pointers — the reversal is in place |

## Interview Notes

**Follow-ups to raise yourself:**
- *"Without modifying the list."* → copy the values into an array and compare the two
  halves: O(n) space, same time.
- *"Recursively."* → compare `head.val` with the last value, then recurse on the middle —
  needs a helper that returns both the verdict and the middle node.
- *"What about a palindrome with odd/even characters (LeetCode 125)?"* → skip the
  non-alphanumeric characters and ignore the case.
- *"Find the longest palindromic sublist."* → expand around the middle for each candidate
  centre: O(n²) time, O(1) space.

**Common mistakes:**
- ❌ Using `fast != null` only in the middle loop → `slow` ends one node too far for even
  lengths and the comparison compares the wrong pairs.
- ❌ Comparing until the **front** pointer is `null` → on odd lengths the front pointer runs
  out first and you would read past the end of the reversed half.
- ❌ Forgetting to reverse in place → a shallow copy of the second half would still point
  forwards and the comparison would be meaningless.

**How to narrate:**
> "A singly linked list can only be walked forwards, so I reverse the second half to be able
> to compare front against back. First I find the middle with a slow and a fast pointer,
> stopping when the fast pointer is two steps from the end. Then I reverse the second half
> in place, and finally I walk a front pointer and a back pointer towards each other
> comparing values until the back pointer runs out. O(n) time, O(1) space."

## Related Problems

- [Reorder List](ReorderList.md) — the same three phases
- [Reverse Linked List](ReverseLinkedList.md) — phase 2 on its own
- [Middle of the Linked List](MiddleOfTheLinkedList.md) — phase 1 on its own
