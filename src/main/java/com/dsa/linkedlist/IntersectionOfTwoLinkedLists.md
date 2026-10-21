---
title: Intersection of Two Linked Lists
leetcode: 160
difficulty: Easy
patterns: [Two pointers, Pointer switching]
companies: [Amazon, Google, Apple, LinkedIn, Stripe, TCS, HCLTech, EY]
frequency: 4
tags: [linked-list, pointers, identity]
sampleInput: |
  5
  4 1 8 4 5
  3
  5 6 1
  3
sampleOutput: "8"
---

# Intersection of Two Linked Lists — LeetCode 160

| | |
|---|---|
| **Difficulty** | Easy |
| **Pattern** | Two pointers · Pointer switching |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Microsoft, Uber, Bloomberg |

## Problem Statement

Given the heads of two singly linked lists, return the node where they **intersect** — the
first node that is physically **shared** by both lists. Return `null` if they never meet.

- List A: `4 -> 1 -> 8 -> 4 -> 5`
- List B: `5 -> 6 -> 1 -> 8 -> 4 -> 5` (it rejoins A at the node holding `8`)
- The answer is the node holding `8` — the **first** shared node, not the first shared
  *value*.

> The intersection is defined by **node identity**, not by value. In the example above list B
> contains the values `5` and `1`, which also occur in list A, but those are different nodes.

## Input Format

The program reads from standard input:

```
nA
A[0] A[1] ... A[nA-1]
nB
B[0] B[1] ... B[nB-1]
shared
```

- `nA` — number of nodes in list A (0 ≤ nA ≤ 10³)
- `A` — nA space-separated integers
- `nB` — number of **prefix** nodes in list B (0 ≤ nB ≤ 10³)
- `B` — nB space-separated integers — the nodes of list B that are *not* shared
  (with `nB = 0` list B is exactly the shared tail)
- `shared` — how many trailing nodes of list A list B continues with (0 ≤ shared ≤ nA);
  `shared = 0` builds two disjoint lists

The program prints the value of the first shared node, or `none` when the lists do not
intersect.

## Sample Input

```
5
4 1 8 4 5
3
5 6 1
3
```

## Expected Output

```
8
```

List B is `5 -> 6 -> 1` followed by A's last three nodes `8 -> 4 -> 5`, so the first shared
node holds `8`. ✓

## Approach — Switch Pointers at the End

Because the lists share a *tail*, the path from each head to the shared node has a different
length. The neat trick is to make the two paths the same length:

1. Walk one pointer through list A and one through list B.
2. When a pointer reaches the end of its list, send it to the **head of the other list**
   instead of stopping.
3. Both pointers now travel paths of exactly `len(A) + len(B)` steps, so they must arrive at
   the shared node at the same moment — that is where they meet.

If the lists do not intersect, both pointers reach `null` at the same time, so the loop ends
with `a == b == null` and we correctly report "no intersection".

**Why not compare values?** Two lists can contain the same numbers without sharing any node.
The check is `a != b` — reference comparison.

## Dry Run

List A: `A0(4) -> A1(1) -> A2(8) -> A3(4) -> A4(5) -> null`
List B: `B0(5) -> B1(6) -> B2(1) -> A2(8) -> A3(4) -> A4(5) -> null`

| Step | `a` | `b` | `a == b`? | note |
|---:|---|---|---|---|
| 0 | `A0(4)` | `B0(5)` | no | |
| 1 | `A1(1)` | `B1(6)` | no | |
| 2 | `A2(8)` | `B2(1)` | no | `a` has reached the shared part |
| 3 | `A3(4)` | `A2(8)` | no | `b` has reached the shared part |
| 4 | `A4(5)` | `A3(4)` | no | |
| 5 | `null` | `A4(5)` | no | `a` reached the end of A |
| 6 | `B0(5)` | `null` | no | `a` switches to the head of B, `b` reaches the end |
| 7 | `B1(6)` | `A0(4)` | no | `b` switches to the head of A |
| 8 | `B2(1)` | `A1(1)` | **no** | equal *values*, different nodes — identity matters! |
| 9 | `A2(8)` | `A2(8)` | **yes** | the first shared node |

The answer is the node holding `8`. ✓

## Java Solution

See [`IntersectionOfTwoLinkedLists.java`](./IntersectionOfTwoLinkedLists.java).

```java
public static ListNode getIntersectionNode(ListNode headA, ListNode headB) {
    if (headA == null || headB == null) {
        return null;
    }
    ListNode a = headA;
    ListNode b = headB;
    while (a != b) {
        a = (a == null) ? headB : a.next;
        b = (b == null) ? headA : b.next;
    }
    return a;
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n + m) | Each pointer walks at most `n + m` links |
| **Space** | O(1) | Two pointers |

## Interview Notes

**Follow-ups to raise yourself:**
- *"What if the lists do not share a tail but merely cross?"* → not possible in a singly
  linked list; sharing requires sharing the tail.
- *"What if you want every common node?"* → walk the shared tail and collect the values.
- *"How would you detect the intersection with a hash set?"* → collect the node identities
  of list A in a set, then walk list B — O(n + m) time but O(n) space.
- *"Does the answer change if the lists can have cycles?"* → yes, you must first find where
  each cycle starts.

**Common mistakes:**
- ❌ Comparing **values** (`a.val == b.val`) → reports a false intersection; the sample's
  step 8 is exactly this trap.
- ❌ Forgetting the "switch to the other head" step → the loop ends when one pointer is
  `null` and the other is not.
- ❌ Comparing node objects with `equals()` instead of `==` → `ListNode` does not override
  `equals`, but writing `equals` on a node type is a trap for the reader; use `==`.

**How to narrate:**
> "Two lists intersect only if they share the actual nodes of a tail, so the answer is a
> node identity, not a value. I run two pointers, one per list, and whenever a pointer runs
> off the end of its list I send it to the head of the other list. Both pointers then travel
> the same total distance, so they meet exactly at the first shared node — and if the lists
> are disjoint they both reach null at the same time. O(n + m) time, O(1) space."

## Related Problems

- [Linked List Cycle](DetectCycle.md) — Floyd's algorithm, same territory
- [Merge Two Sorted Lists](MergeTwoSortedLists.md) — the other two-pointer list drill
- [Middle of the Linked List](MiddleOfTheLinkedList.md) — two pointers, different goal
