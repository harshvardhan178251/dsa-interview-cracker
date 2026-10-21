---
title: Serialize and Deserialize Binary Tree
leetcode: 297
difficulty: Medium
patterns: [Level-order encoding, Round trip]
companies: [Meta, Amazon, Adobe, Microsoft, Cloudflare, TCS, Infosys, Deloitte]
frequency: 4
tags: [tree, serialization, design, level-order]
sampleInput: |
  5
  1 2 3 null 4
sampleOutput: |
  1,2,3,null,4
  1 2 3 4
---

# Serialize and Deserialize Binary Tree — LeetCode 297

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Level-order encoding · Round trip |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Uber, Adobe |

## Problem Statement

Design an algorithm that **serialises** a binary tree to a string and **deserialises**
it back into exactly the same tree.

```
    1
   / \
  2   3
   \
    4
```

The serialised form used here is the level-order list, comma separated, with `null` for
the missing children:

```
1,2,3,null,4
```

## Input Format

The program reads from standard input:

```
t
v0 v1 ... v(t-1)
```

- `t` — how many level-order tokens follow (`0` for an empty tree)
- the tokens — the node values in **level order**; `null` marks a missing child and the
  first token is the root

The sample tree above is `5` followed by `1 2 3 null 4`.

## Sample Input

```
5
1 2 3 null 4
```

## Expected Output

```
1,2,3,null,4
1 2 3 4
```

The first line is the serialised tree; the second line is the deserialised tree printed
in level order, which proves the round trip.

## Approach — the level order is already an encoding

The input format of this repository **is** a level-order encoding, so the serialisation
is that list, comma separated. The only question is how to handle the missing children:
they must be in the string, otherwise the shape is lost.

`1,2,3` alone would rebuild `1 → (2, 3)` — the left child of `2` would be missing
information. With `null` in the list the shape is preserved.

**Trailing** `null`s can be dropped: they only describe empty slots at the end of the
tree and carry no information.

Deserialising is the reverse: split the string on `,`, turn `null` back into a missing
child and rebuild the tree from the level-order list.

## Dry Run

Input: tree `1 → (2, 3)`, `2 → (null, 4)`

| Step | node taken from the queue | emitted | enqueued | list so far |
|---:|---|---|---|---|
| 1 | `1` | `1` | `2`, `3` | `1` |
| 2 | `2` | `2` | `null`, `4` | `1,2` |
| 3 | `3` | `3` | `null`, `null` | `1,2,3` |
| 4 | `null` | `null` | — | `1,2,3,null` |
| 5 | `4` | `4` | `null`, `null` | `1,2,3,null,4` |
| 6 | `null` | `null` | — | `1,2,3,null,4,null` |
| 7 | `null` | `null` | — | `1,2,3,null,4,null,null` |

Trimming the trailing `null`s gives the serialised string `1,2,3,null,4`.

### The round trip

Deserialising splits `1,2,3,null,4` into `[1, 2, 3, null, 4]` and rebuilds the tree
level by level:

| Step | token | node created | attached to |
|---:|---|---|---|
| 1 | `1` | root `1` | — |
| 2 | `2` | `2` | `1.left` |
| 3 | `3` | `3` | `1.right` |
| 4 | `null` | — | `2.left` stays empty |
| 5 | `4` | `4` | `2.right` |

Printing the rebuilt tree in level order (missing children omitted) gives `1 2 3 4` ✓

## Java Solution

See [`SerializeAndDeserializeBinaryTree.java`](./SerializeAndDeserializeBinaryTree.java).

```java
public static String serialize(TreeNode root) {
    if (root == null) {
        return "";
    }
    Deque<TreeNode> queue = new LinkedList<>();   // a linked list stores null children
    queue.add(root);
    List<String> parts = new ArrayList<>();
    while (!queue.isEmpty()) {
        TreeNode node = queue.poll();
        if (node == null) {
            parts.add("null");
            continue;
        }
        parts.add(String.valueOf(node.val));
        queue.add(node.left);
        queue.add(node.right);
    }
    while (!parts.isEmpty() && "null".equals(parts.get(parts.size() - 1))) {
        parts.remove(parts.size() - 1);
    }
    return String.join(",", parts);
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n) | Every node is visited once in both directions |
| **Space** | O(n) | The encoding, plus O(w) for the queue |

## Interview Notes

**Follow-ups to raise yourself:**
- *"Use a different format."* → the classic LeetCode format is pre-order with `#` for
  the missing children (`1,2,#,3`); it is shorter and deserialises with a simple
  recursion.
- *"How would you store the tree in a database?"* → serialise to a string and store
  that; the format is an implementation detail as long as it round-trips.
- *"What if the tree is huge?"* → serialise iteratively (as here) to avoid a stack
  overflow, and consider a compact format.

**Common mistakes:**
- ❌ Dropping the `null` markers → the shape of the tree is lost.
- ❌ Using `ArrayDeque` for the queue → it rejects `null` elements; a `LinkedList` (or
  an index-based list) is needed.
- ❌ Not trimming the trailing `null`s → the string is longer than it has to be (it is
  still correct, just wasteful).
- ❌ Serialising in pre-order without the `null` markers → the tree cannot be rebuilt.

**How to narrate:**
> "I use the level-order encoding: the values in breadth-first order, `null` for every
> missing child, comma separated. The `null`s are what preserve the shape; the trailing
> ones are noise and can be trimmed. Deserialising is the same walk in reverse — split
> on commas and rebuild level by level. Both directions are O(n)."

## Related Problems

- [Binary Tree Level Order Traversal](./BinaryTreeLevelOrderTraversal.java) — the walk the encoding is based on
- [Build Tree From Preorder and Inorder](./BuildTreeFromPreorderAndInorder.java) — the other reconstruction problem
- [Invert Binary Tree](./InvertBinaryTree.java) — prints a tree in level order
