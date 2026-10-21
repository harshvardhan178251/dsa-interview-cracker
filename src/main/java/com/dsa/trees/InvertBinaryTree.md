---
title: Invert Binary Tree
leetcode: 226
difficulty: Easy
patterns: [DFS, Mirror recursion]
companies: [Meta, Amazon, Adobe, JP Morgan, Visa]
frequency: 4
tags: [tree, dfs, recursion, mirror]
sampleInput: |
  5
  1 2 3 4 5
sampleOutput: "1 3 2 5 4"
---

# Invert Binary Tree — LeetCode 226

| | |
|---|---|
| **Difficulty** | Easy |
| **Pattern** | DFS · Mirror recursion |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Uber |

## Problem Statement

**Invert** a binary tree: every node's left and right children are swapped, so the tree
becomes its own mirror image.

```
    1            1
   / \          / \
  2   3   →    3   2
 / \              / \
4   5            5   4
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

The sample tree above is `5` followed by `1 2 3 4 5`.

## Sample Input

```
5
1 2 3 4 5
```

## Expected Output

```
1 3 2 5 4
```

The values of the inverted tree in **level order** (breadth first, left to right);
missing children are omitted.

## Approach — swap after recursing

```java
if (root == null) return null;
TreeNode left  = invertTree(root.left);
TreeNode right = invertTree(root.right);
root.left = right;
root.right = left;
return root;
```

The order matters: if you swap **before** recursing you would recurse into the swapped
subtrees, which inverts them twice (the tree comes out unchanged). Recursing first and
swapping afterwards inverts each subtree exactly once.

The tree is modified **in place** — no new nodes are allocated — so the complexity is
O(n) time and O(h) stack.

## Dry Run

Input: `1 2 3 4 5` — the tree `1 → (2, 3)`, `2 → (4, 5)`.

| Step | call | node | children before | after inverting the children | after the swap |
|---:|---|---:|---|---|---|
| 1 | `invert(2)` | `2` | left `4`, right `5` | `invert(4)` = `4`, `invert(5)` = `5` | left `5`, right `4` |
| 2 | `invert(4)` | `4` | no children | — | unchanged |
| 3 | `invert(5)` | `5` | no children | — | unchanged |
| 4 | `invert(3)` | `3` | no children | — | unchanged |
| 5 | `invert(1)` | `1` | left `2`, right `3` | left → `2 (now 5,4)`, right → `3` | left `3`, right `2` |

Resulting tree:

```
    1
   / \
  3   2
     / \
    5   4
```

Level order (missing children omitted): `1 3 2 5 4` ✓

## Java Solution

See [`InvertBinaryTree.java`](./InvertBinaryTree.java).

```java
public static TreeNode invertTree(TreeNode root) {
    if (root == null) {
        return null;
    }
    TreeNode left = invertTree(root.left);
    TreeNode right = invertTree(root.right);
    root.left = right;
    root.right = left;
    return root;
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n) | Every node is visited once |
| **Space** | O(h) | The call stack mirrors the height of the tree; the tree itself is changed in place |

## Interview Notes

**Follow-ups to raise yourself:**
- *"Do it without recursion."* → BFS level by level: swap the children of every node you
  dequeue.
- *"Is the inverted tree the same as the original if the tree is symmetric?"* → yes, and
  that is exactly the symmetry check.
- *"Invert only the nodes on a path from the root to a given node."* → the recursion can
  return a boolean telling you whether the target is in the subtree you just inverted.

**Common mistakes:**
- ❌ Swapping **before** the recursive calls → the subtrees get inverted twice.
- ❌ Writing `root.left = invertTree(root.right)` without keeping the old left child →
  the original left subtree is lost.
- ❌ Allocating new nodes instead of reusing the existing ones → wastes memory and loses
  any external references to the nodes.

**How to narrate:**
> "Inverting is just swapping the two children of every node. I recurse first so each
> subtree is inverted exactly once, then I swap. The tree is modified in place, so
> it's O(n) time and O(h) stack with no extra allocation."

## Related Problems

- [Symmetric Tree](./SymmetricTree.java) — a tree that is its own mirror
- [Binary Tree Inorder Traversal](./BinaryTreeInorderTraversal.java) — prints the mirrored order
- [Serialize and Deserialize Binary Tree](./SerializeAndDeserializeBinaryTree.java) — prints a tree in level order
