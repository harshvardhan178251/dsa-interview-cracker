---
title: Copy List with Random Pointer
leetcode: 138
difficulty: Medium
patterns: [Interleaving, Deep copy with cycles]
companies: [Amazon, Google, Meta, Microsoft, Uber, Bloomberg]
frequency: 4
tags: [linked-list, pointers, deep-copy]
sampleInput: |
  3
  7 13 11
  2 0 0
sampleOutput: |
  2
  0
  0
---

# Copy List with Random Pointer — LeetCode 138

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Interleaving · Deep copy with cycles |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Microsoft, Uber, Bloomberg |

## Problem Statement

A linked list node has a `next` pointer and a **`random`** pointer that may point at any node
of the list (or at `null`). Return a **deep copy**:

- every node of the result is a *new* node,
- the copy's `next` chain points at the copy's nodes,
- the copy's `random` pointers point at the **copy's** nodes, never at the originals.

The list `7 -> 13 -> 11` with `7.random = 11`, `13.random = 7` and `11.random = 7` must be
copied so that the new nodes' random pointers refer to the new nodes.

## Input Format

The program reads from standard input:

```
n
values[0] values[1] ... values[n-1]
random[0] random[1] ... random[n-1]
```

- `n` — number of nodes (0 ≤ n ≤ 1000)
- `values` — n space-separated integers
- `random` — n space-separated integers; `random[i]` is the **0-based index** of the node
  that node `i`'s random pointer refers to, or `-1` for `null`

The program prints, one per line, the index **inside the copy** that each copied node's
random pointer refers to (`-1` for `null`). Printing the copy's own indices proves the
random pointers were rewired to the copy and not left pointing into the original.

## Sample Input

```
3
7 13 11
2 0 0
```

## Expected Output

```
2
0
0
```

The copy's `7` points (randomly) at the copy's third node (index 2), and the copy's `13` and
`11` both point at the copy's first node (index 0). ✓

## Approach — Weave, Wire, Split

Copying the list is easy; copying the **random** pointers is the hard part, because a node's
random pointer may point *backwards*, to a node that has not been copied yet.

The **interleaving** trick removes the problem entirely:

1. **Weave.** Put a copy of every node directly *after* its original:
   `A -> A' -> B -> B' -> C -> C'`. Now every original node is immediately followed by its
   copy, and the copy of any node `X` is always `X.next`.
2. **Wire the random pointers.** For every original node `X` with `X.random = Y`, set
   `X.next.random = Y.next` — the copy of `X` now points at the copy of `Y`. Because the
   copy of `Y` sits right next to `Y`, this is a single assignment, and the "backwards
   pointer" problem disappears.
3. **Split.** Walk the chain and pull out the even-indexed nodes (the copies) into a chain
   of their own. The original chain is restored as it was.

**Why not a hash map?** `map.get(node.random)` gives you the copy, but the map costs O(n)
space and the whole point of this problem is that the O(1)-space solution exists.

## Dry Run

Input: `7 -> 13 -> 11`, random indices `2 0 0`

**Step 1 — weave**

| Step | `cur` | copy created | chain |
|---:|---|---|---|
| 1 | `7` | `7'` | `7 -> 7' -> 13 -> 11` |
| 2 | `13` | `13'` | `7 -> 7' -> 13 -> 13' -> 11` |
| 3 | `11` | `11'` | `7 -> 7' -> 13 -> 13' -> 11 -> 11'` |

**Step 2 — wire the random pointers** (`cur.next` is the copy, `cur.random.next` is the
copy of the random target)

| Step | `cur` | `cur.random` | assignment | result |
|---:|---|---|---|---|
| 1 | `7` | `11` | `7'.random = 11.next = 11'` | `7'.random = 11'` ✓ |
| 2 | `13` | `7` | `13'.random = 7.next = 7'` | `13'.random = 7'` ✓ |
| 3 | `11` | `7` | `11'.random = 7.next = 7'` | `11'.random = 7'` ✓ |

**Step 3 — split** (even positions go to the copy chain)

| Step | `cur` | `copy` | original chain | copy chain |
|---:|---|---|---|---|
| 1 | `7` | `7'` | `13 -> 13' -> 11 -> 11'` | `7'` |
| 2 | `13` | `13'` | `11 -> 11'` | `7' -> 13'` |
| 3 | `11` | `11'` | `null` | `7' -> 13' -> 11'` |

Copy indices: `7'` is 0, `13'` is 1, `11'` is 2. The random pointers of the copy are
`11'` (index 2), `7'` (index 0) and `7'` (index 0) → the output

```
2
0
0
```

✓

## Java Solution

See [`CopyListWithRandomPointer.java`](./CopyListWithRandomPointer.java).

```java
public static RandomNode copyList(RandomNode head) {
    if (head == null) {
        return null;
    }
    // 1. weave: A -> A' -> B -> B' -> C -> C'
    for (RandomNode cur = head; cur != null; ) {
        RandomNode copy = new RandomNode(cur.val);
        copy.next = cur.next;
        cur.next = copy;
        cur = copy.next;
    }
    // 2. random pointers: the copy of X points at the copy of X.random
    for (RandomNode cur = head; cur != null; cur = cur.next.next) {
        if (cur.random != null) {
            cur.next.random = cur.random.next;
        }
    }
    // 3. split the two chains apart again
    RandomNode copyHead = null;
    RandomNode copyTail = null;
    for (RandomNode cur = head; cur != null; ) {
        RandomNode copy = cur.next;
        cur.next = copy.next;
        if (copyTail == null) {
            copyHead = copy;
        } else {
            copyTail.next = copy;
        }
        copyTail = copy;
        cur = cur.next;
    }
    return copyHead;
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n) | Three linear passes |
| **Space** | O(n) | The copy itself — the algorithm needs no extra container beyond it |

## Interview Notes

**Follow-ups to raise yourself:**
- *"Can you do it with a hash map?"* → yes: `map.get(node.random)`; O(n) space but much
  shorter code. Mention it as the fallback.
- *"The random pointer points to a node outside the list."* → the map approach still works;
  the interleaving approach needs the outside node to be copied too.
- *"What if the node had three extra pointers?"* → the same weaving idea generalises.
- *"Do it without allocating the copy until later."* → the copy is the point, so no.

**Common mistakes:**
- ❌ Setting `copy.random = cur.random` → the copy points into the **original** list; the
  whole point is to avoid that.
- ❌ Forgetting the `cur.random != null` check → `NullPointerException` for nodes whose
  random pointer is null.
- ❌ Splitting the chains in the wrong order → the original list ends up with the copy's
  nodes; the original chain must be relinked with `cur.next = copy.next` **before** the copy
  chain is extended.

**How to narrate:**
> "The tricky part is the random pointers, because they can point backwards. Instead of a
> map I interleave: I put a copy of every node right after its original, so the copy of any
> node is always its `next`. Now the random pointer of a copy is one assignment:
> `copy.random = original.random.next`. After that I split the two chains apart. Three
> linear passes and no extra container beyond the copy itself."

## Related Problems

- [Reverse Linked List](ReverseLinkedList.md) — pointer rewiring drill
- [Clone a graph](../../../../../../docs/topics/15-graphs.md) — the same "copy with extra pointers" idea
- [Copy List with Random Pointer](../../../../../../docs/topics/23-design.md) — the hash-map variant
