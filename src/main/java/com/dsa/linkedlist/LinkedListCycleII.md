---
title: Linked List Cycle II
leetcode: 142
difficulty: Medium
patterns: [Two pointers, Floyd cycle detection]
companies: [Google, Meta, JP Morgan, Airbnb, Walmart, HCLTech, Tech Mahindra, Qualcomm]
frequency: 4
tags: [linked-list, pointers, cycle]
sampleInput: |
  3
  1 2 3
  0
sampleOutput: "0"
---

# Linked List Cycle II — LeetCode 142

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Two pointers · Floyd cycle detection |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Microsoft, Uber, Bloomberg |

## Problem Statement

Given the head of a linked list, return the **node** where the cycle begins. If the list has
no cycle, return `null`.

The list `3 -> 2 -> 0 -> -4` whose tail points back at the node `2` has its cycle entry at
index `1`.

This program prints the **0-based index** of the entry node (`-1` when there is no cycle),
because an index is easier to check than a node identity on standard input.

## Input Format

The program reads from standard input:

```
n
values[0] values[1] ... values[n-1]
cyclePos
```

- `n` — number of nodes (0 ≤ n ≤ 10⁴)
- `values` — n space-separated integers
- `cyclePos` — the **0-based index** of the node that the last node points back to;
  use `-1` for a list without a cycle

## Sample Input

```
3
1 2 3
0
```

## Expected Output

```
0
```

The tail of `1 -> 2 -> 3` points back at index `0`, so the cycle begins at node `1`. ✓

## Approach — Floyd's Algorithm, Two Phases

**Phase 1 — find a meeting point inside the cycle.** Run the tortoise and hare exactly as in
[Linked List Cycle](DetectCycle.md): `slow` moves one step, `fast`
moves two. In a cyclic list they eventually meet *somewhere inside* the cycle; in an acyclic
list the fast pointer reaches `null` and we return `null`.

**Phase 2 — walk the meeting point back to the entry.** Reset one pointer to the head, keep
the other on the meeting node, and advance **both by exactly one step** until they meet.

Why does that work? Let the distance from the head to the entry node be `a` and the length of
the cycle be `L`. When the pointers meet, the fast pointer has travelled `2d` and the slow
pointer `d` for some `d`, so `d` is a multiple of `L` and `2d - d = d ≡ 0 (mod L)`. The
meeting node is therefore `d` steps past the head, and `d mod L` steps past the entry. The
second pointer, starting at the head, needs exactly `a` steps to reach the entry, and
`a ≡ d (mod L)`, so both pointers reach the entry node at the same time.

## Dry Run

Input: `1 -> 2 -> 3 -> (back to 1)`, `cyclePos = 0`

**Phase 1**

| Step | `slow` | `fast` | `slow == fast`? |
|---:|---|---|---|
| 1 | `2` | `3` | no |
| 2 | `3` | `2` | no |
| 3 | `1` | `1` | **yes** → meeting node is `1` |

**Phase 2** — `pointer = head (1)`, `slow = meeting node (1)`

| Step | `pointer` | `slow` | equal? |
|---:|---|---|---|
| 0 | `1` | `1` | **yes** → the entry node is `1` |

`1` is at index `0`, so the program prints `0`. ✓

### Acyclic list `1 -> 2 -> 3 -> null`

| Step | `slow` | `fast` | outcome |
|---:|---|---|---|
| 1 | `2` | `3` | continue |
| 2 | `3` | `null` | `fast == null` → no cycle → print `-1` |

## Java Solution

See [`LinkedListCycleII.java`](./LinkedListCycleII.java).

```java
public static ListNode detectCycle(ListNode head) {
    ListNode slow = head;
    ListNode fast = head;
    while (fast != null && fast.next != null) {
        slow = slow.next;
        fast = fast.next.next;
        if (slow == fast) {
            ListNode pointer = head;
            while (pointer != slow) {
                pointer = pointer.next;
                slow = slow.next;
            }
            return pointer;
        }
    }
    return null;
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n) | Phase one is one lap, phase two is at most one lap |
| **Space** | O(1) | Two pointers, no auxiliary container |

## Interview Notes

**Follow-ups to raise yourself:**
- *"Why not just remember the first repeated node in a `HashSet`?"* → works, but costs O(n)
  space; Floyd keeps it O(1). A set is the right answer when the list has *branches*.
- *"Return the values of all nodes in the cycle."* → from the entry node, walk until you
  come back to it.
- *"Remove the cycle."* → find the entry node, then rewire the node before it to the node
  after it.

**Common mistakes:**
- ❌ Resetting **both** pointers to the head in phase two → they meet at the head, not at
  the entry node.
- ❌ Advancing the fast pointer by two in phase two → they never meet at the entry.
- ❌ Comparing values instead of node identity → the entry node is a *position*, duplicates
  in the values make value comparison wrong.

**How to narrate:**
> "First I run Floyd's algorithm to find a meeting point inside the cycle. Then I put one
> pointer at the head and advance both pointers one step at a time. Because the head is
> `a` steps from the entry and the cycle length is `L`, and the meeting point is at a
> distance that is a multiple of `L` from the entry, both pointers arrive at the entry node
> at the same time. That node is the cycle's start."

## Related Problems

- [Linked List Cycle](DetectCycle.md) — the boolean version
- [Middle of the Linked List](MiddleOfTheLinkedList.md) — two pointers, no cycle
- [Reorder List](ReorderList.md) — split a list with two pointers
