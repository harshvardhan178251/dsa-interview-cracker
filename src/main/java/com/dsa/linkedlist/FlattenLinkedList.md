---
title: Flatten a Multilevel Linked List
leetcode: null
difficulty: Medium
patterns: [Recursion, Parsing a nested structure]
companies: [Amazon, Facebook]
frequency: 3
tags: [linked-list, recursion, tree, parsing]
sampleInput: |
  1[2[3],4],5
sampleOutput: "1 2 3 4 5"
---

# Flatten a Multilevel Linked List

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Recursion · Parsing a nested structure |
| **Interview heat** | ★★★☆☆ |
| **Asked at** | Amazon, Google, Meta, Microsoft |

## Problem Statement

A **multilevel linked list** is a list where a node may own a *child list* of its own:

```
1 -> 5
     |
     2 -> 9
          |
          3
```

Flattening it means producing a single list that contains every node, in the order a
depth-first walk reaches them: a node, then everything below it, then its next sibling.

- `1[2[3],4],5` flattens to `1 -> 2 -> 3 -> 4 -> 5`.
- The flattening is done **in place** — the child pointers are removed.

## Input Format

The program reads a **single line** from standard input: a nested description of the list.

```
value[childList],value[childList],...
```

- A node is written as its value, optionally followed by `[` and a child list in the same
  format, closed by `]`.
- Nodes inside a level are separated by commas.

Example: `1[2[3],4],5` is the list `1 -> 5` where `1` owns the child list `2 -> 4` and `2`
owns the child list `3`.

## Sample Input

```
1[2[3],4],5
```

## Expected Output

```
1 2 3 4 5
```

## Approach — Parse, Then Splice

**Phase 1 — parse.** A recursive descent parser. `parseList` reads nodes until it hits a
closing bracket or the end of the text:

1. Skip `,` separators.
2. Read the digits of the value.
3. If the next character is `[`, consume it and recurse — the result is the node's child list.
4. Link the node into the chain being built.

**Phase 2 — flatten.** Walk the top level. For every node that owns a child list:

1. **Recursively flatten the child list first** (otherwise a grandchild would be spliced
   into the wrong place).
2. Walk to the tail of the flattened child list.
3. `tail.next = cur.next` and `cur.next = cur.child` — the child list is now spliced in
   right after its owner.
4. `cur.child = null` — the multilevel structure is gone.

## Dry Run

Input: `1[2[3],4],5`

**Phase 1 — parse**

| Step | text consumed | node created | link built |
|---:|---|---|---|
| 1 | `1` | `1` | — |
| 2 | `[` | — | recurse into level 2 |
| 3 | `2` | `2` | level 2: `2` |
| 4 | `[` | — | recurse into level 3 |
| 5 | `3` | `3` | level 3: `3` → `3.child = null`, back to level 2 |
| 6 | `]`, `,` | — | level 2 continues: `2 -> 4` |
| 7 | `4` | `4` | level 2: `2 -> 4` |
| 8 | `]`, `,` | — | level 2 ends → `1.child = 2 -> 4` |
| 9 | `5` | `5` | level 1: `1 -> 5` |

Parsed structure:

```
1 -> 5
     |
     2 -> 4
          |
          3
```

**Phase 2 — flatten**

| Step | node | action | list |
|---:|---|---|---|
| 1 | `1` | flatten child `2 -> 4`: `2` owns `3`, so `3` is spliced in → child becomes `2 -> 3 -> 4` | `1 -> 5`, `1.child = 2 -> 3 -> 4` |
| 2 | `1` | tail of child = `4`; `4.next = 1.next (5)`; `1.next = 2`; `1.child = null` | `1 -> 2 -> 3 -> 4 -> 5` |
| 3 | `2` | `child == null` → nothing to do | `1 -> 2 -> 3 -> 4 -> 5` |
| 4 | `3` | `child == null` → nothing to do | `1 -> 2 -> 3 -> 4 -> 5` |
| 5 | `4` | `child == null` → nothing to do | `1 -> 2 -> 3 -> 4 -> 5` |
| 6 | `5` | `child == null` → nothing to do | `1 -> 2 -> 3 -> 4 -> 5` |

The flattened list is `1 2 3 4 5`. ✓

## Java Solution

See [`FlattenLinkedList.java`](./FlattenLinkedList.java).

```java
public static void flatten(MultiNode head) {
    for (MultiNode cur = head; cur != null; cur = cur.next) {
        if (cur.child != null) {
            flatten(cur.child);                    // flatten the child list first
            MultiNode tail = cur.child;
            while (tail.next != null) {
                tail = tail.next;
            }
            tail.next = cur.next;                  // attach it after the owner
            cur.next = cur.child;                   // and put it in front of the sibling
            cur.child = null;
        }
    }
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n) | Every node is parsed once and spliced once |
| **Space** | O(n) | The parse builds the tree; the flattening itself is in place (O(h) recursion depth) |

## Interview Notes

**Follow-ups to raise yourself:**
- *"Flatten into a new list instead of in place."* → collect the values in a list during
  the walk and build a fresh chain.
- *"Flatten depth-first with an explicit stack."* → the recursion can be replaced by a stack
  of pending lists; the depth may be large.
- *"Merge the child lists in sorted order."* → flatten, then sort.
- *"What if a node can have several child lists?"* → the parse already generalises: store
  the children in a list and splice them one by one.

**Common mistakes:**
- ❌ Splicing the child list in **before** flattening it → a grandchild ends up after the
  wrong node.
- ❌ Forgetting `cur.child = null` → the list still looks multilevel.
- ❌ Losing the sibling link (`tail.next = cur.next` before `cur.next = cur.child`) → the
  rest of the list disappears.

**How to narrate:**
> "First I parse the text recursively: read a value, and if it is followed by a bracket
> recurse for the child list. Then I flatten: for every node that owns a child list I first
> flatten that child list recursively, then walk to its tail, link the tail to the current
> next, and link the current node to the child head. The result is a single list in
> depth-first order."

## Related Problems

- [Reorder List](ReorderList.md) — the same split/reverse/interleave family
- [Flatten Binary Tree to Linked List](../../../../../../docs/topics/13-trees.md) — the tree version of this problem
- [Merge Two Sorted Lists](MergeTwoSortedLists.md) — splicing chains
