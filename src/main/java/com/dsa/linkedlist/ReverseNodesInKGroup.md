---
title: Reverse Nodes in k-Group
leetcode: 25
difficulty: Hard
patterns: [Pointer rewiring, Block reversal]
companies: [Amazon, Google, Meta, Microsoft, Uber, Bloomberg]
frequency: 4
tags: [linked-list, pointers, in-place]
sampleInput: |
  5
  1 2 3 4 5
  2
sampleOutput: "2 1 4 3 5"
---

# Reverse Nodes in k-Group — LeetCode 25

| | |
|---|---|
| **Difficulty** | Hard |
| **Pattern** | Pointer rewiring · Block reversal |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Microsoft, Uber, Bloomberg |

## Problem Statement

Given the head of a linked list and a positive integer `k`, reverse the order of the nodes in
**every group of `k` consecutive nodes**.

- The list `1 -> 2 -> 3 -> 4 -> 5` with `k = 2` becomes `2 -> 1 -> 4 -> 3 -> 5`.
- With `k = 3` it becomes `3 -> 2 -> 1 -> 4 -> 5`.
- If the last group has fewer than `k` nodes, those nodes stay in their original order.

## Input Format

The program reads from standard input:

```
n
values[0] values[1] ... values[n-1]
k
```

- `n` — number of nodes (1 ≤ n ≤ 10⁴)
- `values` — n space-separated integers
- `k` — the group size (1 ≤ k ≤ n)

## Sample Input

```
5
1 2 3 4 5
2
```

## Expected Output

```
2 1 4 3 5
```

## Approach — Reverse Block by Block

The classic reversal works on a contiguous run of nodes. Here the list is chopped into
consecutive runs of `k`, and each run is reversed independently — but a reversed run has to be
**stitched back** at exactly the right place, otherwise the groups interleave.

Per group:

1. **Locate** the `k`-th node of the group by walking `k` steps from the node in front of
   the group. If the list runs out, stop — the leftover nodes stay untouched.
2. **Remember** the node after the group (`groupNext`); it becomes the new `prev` seed when
   the block is reversed.
3. **Reverse** the block, starting `prev` at `groupNext` so the last node of the block points
   at the untouched remainder instead of at `null`.
4. **Stitch**: the block's old first node is now its tail, so the node in front of the group
   must point at the block's *last* node (the `k`-th node), and the group boundary moves to
   the block's old first node.

The dummy head removes the "what if the first group starts at the head?" special case.

## Dry Run

Input: `1 -> 2 -> 3 -> 4 -> 5`, `k = 2`

| Step | `groupPrev` | block before | `k`-th node | block after (reversed) | whole list |
|---:|---|---|---|---|---|
| 0 | `dummy` | `1 -> 2` | `2` | — | `1 -> 2 -> 3 -> 4 -> 5` |
| 1 | `dummy` | `1 -> 2` | `2` | `2 -> 1` | `2 -> 1 -> 3 -> 4 -> 5` |
| 2 | `1` | `3 -> 4` | `4` | `4 -> 3` | `2 -> 1 -> 4 -> 3 -> 5` |
| 3 | `3` | `5 -> null` | `null` | — (fewer than k nodes left) | `2 -> 1 -> 4 -> 3 -> 5` |

Inside step 1 the block reversal runs with `prev = 3` (the node after the group):

| micro-step | `curr` | `next` saved | `curr.next` becomes | `prev` after | block state |
|---:|---:|---:|---:|---:|---|
| 1 | `1` | `2` | `3` | `1` | `1 -> 3` |
| 2 | `2` | `3` | `1` | `2` | `2 -> 1 -> 3` |

After the block is reversed we set `groupPrev.next = kth (2)` and move `groupPrev` to the
block's old first node (`1`). The list is now `2 -> 1 -> 3 -> 4 -> 5` ✓

## Java Solution

See [`ReverseNodesInKGroup.java`](./ReverseNodesInKGroup.java).

```java
public static ListNode reverseKGroup(ListNode head, int k) {
    if (head == null || k <= 1) {
        return head;
    }
    ListNode dummy = new ListNode(0, head);
    ListNode groupPrev = dummy;

    while (true) {
        ListNode kth = groupPrev;
        for (int i = 0; i < k && kth != null; i++) {
            kth = kth.next;
        }
        if (kth == null) {
            break;                      // fewer than k nodes left: keep them as they are
        }
        ListNode groupNext = kth.next;

        ListNode prev = groupNext;
        ListNode curr = groupPrev.next;
        while (curr != groupNext) {
            ListNode next = curr.next;
            curr.next = prev;
            prev = curr;
            curr = next;
        }

        ListNode newGroupPrev = groupPrev.next;
        groupPrev.next = kth;
        groupPrev = newGroupPrev;
    }
    return dummy.next;
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n) | Every node is walked a constant number of times (once to find the `k`-th, once to reverse) |
| **Space** | O(1) | Only a handful of references |

## Interview Notes

**Follow-ups to raise yourself:**
- *"What if `k` is larger than the list length?"* → nothing is reversed; the loop breaks on
  the first `k`-th-node search.
- *"Can you do it in place without a dummy node?"* → yes, handle the first group separately
  — more code, no benefit.
- *"What if you must reverse the leftover group too?"* → reverse it unconditionally instead of
  breaking out of the loop.

**Common mistakes:**
- ❌ Seeding the reversal with `prev = null` → the last node of the block points at `null`
  and the rest of the list is cut off.
- ❌ Forgetting to keep `groupNext` before reversing → the remainder is lost.
- ❌ Moving `groupPrev` to `kth` instead of to the block's **old first node** → the next group
  starts in the wrong place.

**How to narrate:**
> "I process the list group by group. For each group I first walk `k` steps to find the
> group's last node — if I run out of list, the rest stays as it is. Then I remember the node
> after the group, reverse the block using that node as the seed so the block's tail points
> at the untouched remainder, and finally I re-link: the node before the group now points at
> the block's last node, and the group boundary becomes the block's old first node. Every node
> is visited O(1) times, so the whole thing is O(n) time and O(1) space."

## Related Problems

- [Reverse Linked List](ReverseLinkedList.md) — reverse the whole list
- [Reverse Linked List II](ReverseLinkedListII.md) — reverse one segment
- [Swap Nodes in Pairs](SwapPairs.md) — the special case k = 2
- [Rotate List](RotateList.md) — move the tail to the front
