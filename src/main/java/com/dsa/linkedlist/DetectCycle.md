---
title: Linked List Cycle
leetcode: 141
difficulty: Easy
patterns: [Two pointers, Floyd cycle detection]
companies: [Amazon, Meta, Google, Goldman Sachs, Adobe, Airbnb, Cloudflare]
frequency: 5
tags: [linked-list, pointers, cycle]
sampleInput: |
  3
  1 2 3
  0
sampleOutput: "true"
---

# Linked List Cycle — LeetCode 141

| | |
|---|---|
| **Difficulty** | Easy |
| **Pattern** | Two pointers · Floyd cycle detection |
| **Interview heat** | ★★★★★ |
| **Asked at** | Amazon, Google, Meta, Microsoft, Uber, Bloomberg |

## Problem Statement

Given the head of a linked list, return `true` if the list contains a cycle and `false`
otherwise.

A cycle exists when the list walks back onto a node it has already visited — for example
`1 -> 2 -> 3 -> 1`.

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
  use `-1` for a list whose last node points at `null`

Example: `cyclePos = 0` builds `1 -> 2 -> 3 -> 1` (the tail loops back to the head).

## Sample Input

```
3
1 2 3
0
```

## Expected Output

```
true
```

## Approach — Floyd's Tortoise and Hare

Two pointers walk the same list at different speeds:

- `slow` advances **one** node per iteration,
- `fast` advances **two** nodes per iteration.

Two facts make this work:

1. **No cycle:** the fast pointer runs off the end of the list and the loop stops — the
   pointers can never meet because the slow pointer is always strictly behind.
2. **Cycle:** imagine the fast pointer laps the slow pointer. Every iteration the fast
   pointer gains exactly one node on the slow pointer, so after at most one lap the gap
   closes to zero and the two pointers point at the same node.

Because the pointers only meet *inside* the cycle, meeting is proof that a cycle exists.

**Why not a `HashSet` of visited nodes?** That also works, but it costs O(n) extra memory.
Floyd's algorithm uses O(1) space, which is exactly what interviewers want to hear.

## Dry Run

Input: `1 -> 2 -> 3 -> (back to 1)`, `cyclePos = 0`

| Step | `slow` (1 step) | `fast` (2 steps) | `slow == fast`? | list state |
|---:|---|---|---|---|
| 0 | `1` | `1` | yes (they start together) | `1 -> 2 -> 3 -> 1` |
| 1 | `2` | `3` | no | `1 -> 2 -> 3 -> 1` |
| 2 | `3` | `2` | no | `1 -> 2 -> 3 -> 1` |
| 3 | `1` | `1` | **yes** → cycle | `1 -> 2 -> 3 -> 1` |

The two pointers meet at node `1`, which proves the cycle exists. ✓

### Counter-example — an acyclic list `1 -> 2 -> 3 -> null`

| Step | `slow` | `fast` | `slow == fast`? | why the loop ends |
|---:|---|---|---|---|
| 1 | `2` | `3` | no | — |
| 2 | `3` | `null` | no | `fast == null` → loop condition fails |

The fast pointer fell off the end, so there is no cycle. ✓

## Java Solution

See [`DetectCycle.java`](./DetectCycle.java).

```java
public static boolean hasCycle(ListNode head) {
    ListNode slow = head;
    ListNode fast = head;
    while (fast != null && fast.next != null) {
        slow = slow.next;
        fast = fast.next.next;
        if (slow == fast) {
            return true;
        }
    }
    return false;
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n) | The fast pointer makes at most one extra lap |
| **Space** | O(1) | Two pointers, no auxiliary container |

## Interview Notes

**Follow-ups to raise yourself:**
- *"Return the node where the cycle starts."* → Floyd's second phase: after the pointers
  meet, put one pointer back at the head and advance both by one — see
  [Linked List Cycle II](LinkedListCycleII.md).
- *"Detect a cycle in a graph."* → the same two-pointer idea, but use colouring
  (white/grey/black) instead, because a graph can have branches.
- *"What about a cycle in a singly linked list with random access?"* → the same.

**Common mistakes:**
- ❌ Comparing **values** instead of node identity → `1 -> 2 -> 1` looks like a cycle of
  equal values, but `1 -> 1 -> null` is not a cycle.
- ❌ Moving the fast pointer before checking `fast.next` → `NullPointerException`.
- ❌ Checking `slow == fast` *before* the first move → the pointers are equal at the start,
  so every list would be reported as cyclic.

**How to narrate:**
> "I'll use Floyd's tortoise and hare: one pointer moves one step, the other moves two.
> If the fast pointer reaches the end there is no cycle. If the list is cyclic the fast
> pointer keeps lapping and the gap between the two pointers shrinks by one each round, so
> they must meet inside the cycle. That gives O(n) time and O(1) space — no visited set."

## Related Problems

- [Linked List Cycle II](LinkedListCycleII.md) — find the entry node
- [Reverse Linked List](ReverseLinkedList.md) — the other classic pointer drill
- [Reorder List](ReorderList.md) — split the list with two pointers
