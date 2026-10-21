---
title: Remove Nth Node From End of List
leetcode: 19
difficulty: Medium
patterns: [Two pointers, Dummy head]
companies: [Amazon, Google, Meta, Microsoft, Uber, Bloomberg]
frequency: 5
tags: [linked-list, pointers]
sampleInput: |
  5
  1 2 3 4 5
  2
sampleOutput: "1 2 3 5"
---

# Remove Nth Node From End of List — LeetCode 19

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Two pointers · Dummy head |
| **Interview heat** | ★★★★★ |
| **Asked at** | Amazon, Google, Meta, Microsoft, Uber, Bloomberg |

## Problem Statement

Given the head of a singly linked list, remove the **n-th node from the end** of the list and
return its head.

- Removing the 2nd node from the end of `1 -> 2 -> 3 -> 4 -> 5` gives `1 -> 2 -> 3 -> 5`.
- `n = 1` removes the last node.
- `n` is 1-indexed.

## Input Format

The program reads from standard input:

```
len
values[0] values[1] ... values[len-1]
n
```

- `len` — number of nodes (1 ≤ len ≤ 10⁴)
- `values` — len space-separated integers
- `n` — the position from the end of the node to remove (1 ≤ n ≤ len)

## Sample Input

```
5
1 2 3 4 5
2
```

## Expected Output

```
1 2 3 5
```

The 2nd node from the end is the node holding `4`; it is unlinked. ✓

## Approach — Two Pointers, One Pass

Counting from the end means walking backwards, and a singly linked list only points
forwards. The trick is to create the distance in **advance**:

1. Put a **dummy head** in front of the list. It gives us a node to unlink from even when the
   node to remove is the very first one, and it removes the "is it the head?" special case.
2. Move `fast` `n` steps forward. `slow` stays on the dummy head.
3. Now `fast` is `n` links ahead of `slow`. Move **both** one step at a time until `fast` is
   the last node.
4. `slow` is now on the node **before** the one to remove → `slow.next = slow.next.next`.

The one-pass property is what makes this O(len): the list is walked a single time, and `n`
never has to be turned into "len − n" with a separate counting pass.

## Dry Run

Input: `dummy -> 1 -> 2 -> 3 -> 4 -> 5`, `n = 2`

**Phase 1 — move `fast` two steps**

| Step | `fast` | `slow` | list |
|---:|---|---|---|
| 0 | `dummy` | `dummy` | `dummy -> 1 -> 2 -> 3 -> 4 -> 5` |
| 1 | `1` | `dummy` | `dummy -> 1 -> 2 -> 3 -> 4 -> 5` |
| 2 | `2` | `dummy` | `dummy -> 1 -> 2 -> 3 -> 4 -> 5` |

`fast` is now 2 links ahead of `slow`.

**Phase 2 — move both until `fast` is the last node**

| Step | `fast` | `slow` | equal? | list |
|---:|---|---|---|---|
| 3 | `3` | `1` | no | `dummy -> 1 -> 2 -> 3 -> 4 -> 5` |
| 4 | `4` | `2` | no | `dummy -> 1 -> 2 -> 3 -> 4 -> 5` |
| 5 | `5` | `3` | no | `dummy -> 1 -> 2 -> 3 -> 4 -> 5` |

`fast.next` is `null`, so the loop stops. `slow` is on the node holding `3` — the node
**before** the one to delete.

**Phase 3 — unlink**

| Action | `slow.next` before | `slow.next` after | list |
|---|---|---|---|
| `slow.next = slow.next.next` | `4` | `5` | `dummy -> 1 -> 2 -> 3 -> 5` |

`dummy.next` is returned → `1 2 3 5` ✓

## Java Solution

See [`DeleteNthFromEnd.java`](./DeleteNthFromEnd.java).

```java
public static ListNode removeNthFromEnd(ListNode head, int n) {
    ListNode dummy = new ListNode(0, head);
    ListNode fast = dummy;
    ListNode slow = dummy;

    for (int i = 0; i < n && fast != null; i++) {
        fast = fast.next;
    }
    if (fast == null) {
        return head;       // n is larger than the list: nothing to remove
    }
    while (fast.next != null) {
        fast = fast.next;
        slow = slow.next;
    }
    slow.next = slow.next.next;   // unlink the node after slow
    return dummy.next;
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(len) | One pass; the two pointers move at most `len` steps in total |
| **Space** | O(1) | A dummy head and two pointers |

## Interview Notes

**Follow-ups to raise yourself:**
- *"Can you do it in two passes?"* → yes: count the length, then walk again to the
  (len − n)-th node — O(len) time but two traversals.
- *"What if `n` is larger than the list?"* → return the list unchanged.
- *"Delete the node you are given, without knowing its position."* → the classic trick: copy
  the next node's value into the given node and delete the *next* node instead.
- *"Remove duplicates, keep the first."* → see
  [Remove Duplicates from Sorted List II](RemoveDuplicatesFromSortedListII.md).

**Common mistakes:**
- ❌ Moving `slow` during phase 1 → the two pointers are no longer `n` apart.
- ❌ Stopping the second loop when `fast == null` instead of when `fast.next == null` → `slow`
  ends up on the node *to delete* and you unlink the wrong node.
- ❌ Forgetting the dummy head → removing the first node throws `NullPointerException`.

**How to narrate:**
> "I don't want to compute the length first, so I use two pointers. I put a dummy head in
> front so I can also delete the first node. I move the fast pointer n steps, then I move
> both pointers together until the fast one reaches the last node — at that point the slow
> pointer is exactly on the node before the one to delete, and I unlink it. One pass, O(1)
> space."

## Related Problems

- [Remove Duplicates from Sorted List II](RemoveDuplicatesFromSortedListII.md) — unlink runs of nodes
- [Middle of the Linked List](MiddleOfTheLinkedList.md) — the same two-pointer trick
- [Palindrome Linked List](PalindromeLinkedList.md) — find the middle, then walk inwards
