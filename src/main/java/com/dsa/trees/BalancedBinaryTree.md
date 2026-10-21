---
title: Balanced Binary Tree
leetcode: 110
difficulty: Easy
patterns: [DFS, Post-order height check]
companies: [Amazon, Google, Meta, Uber, Adobe]
frequency: 5
tags: [tree, dfs, recursion, balance]
sampleInput: |
  7
  3 9 20 null null 15 7
sampleOutput: "true"
---

# Balanced Binary Tree — LeetCode 110

| | |
|---|---|
| **Difficulty** | Easy |
| **Pattern** | DFS · Post-order height check |
| **Interview heat** | ★★★★★ |
| **Asked at** | Amazon, Google, Meta, Uber, Adobe |

## Problem Statement

Check whether a binary tree is **height-balanced**: for every node, the heights of its
two subtrees differ by at most one.

```
        3
       / \
      9   20
         /  \
        15   7
```

The left subtree has height 1 and the right one height 2 → the difference is 1 → the
tree is balanced.

## Input Format

The program reads from standard input:

```
t
v0 v1 ... v(t-1)
```

- `t` — how many level-order tokens follow (`0` for an empty tree)
- the tokens — the node values in **level order**; `null` marks a missing child and the
  first token is the root

The sample tree above is `7` followed by `3 9 20 null null 15 7`.

## Sample Input

```
7
3 9 20 null null 15 7
```

## Expected Output

```
true
```

## Approach — height, or -1 for "broken"

The naive solution computes the height of every subtree and compares the two heights —
but that is **O(n²)** on a skewed tree, because the heights are recomputed over and
over.

The trick is to compute the height **once** per node on the way up and to abort early:

```java
private static int height(TreeNode node) {
    if (node == null) return 0;
    int left = height(node.left);
    if (left == -1) return -1;          // the left subtree is already unbalanced
    int right = height(node.right);
    if (right == -1) return -1;
    if (Math.abs(left - right) > 1) return -1;
    return 1 + Math.max(left, right);
}
```

The function returns the height of a balanced subtree and `-1` for an unbalanced one.
The `-1` propagates all the way up, so the walk stops as soon as the first violation
is found.

## Dry Run

Input: `3 9 20 null null 15 7`

| Step | call | node | left | right | balanced? | returned |
|---:|---|---:|---:|---:|---|---:|
| 1 | `height(3)` | 3 | — | — | — | — |
| 2 | `height(9)` | 9 | 0 | 0 | `|0-0| = 0 ≤ 1` | 1 |
| 3 | `height(20)` | 20 | — | — | — | — |
| 4 | `height(15)` | 15 | 0 | 0 | ok | 1 |
| 5 | `height(7)` | 7 | 0 | 0 | ok | 1 |
| 6 | `height(20)` | 20 | 1 | 1 | `|1-1| = 0 ≤ 1` | 2 |
| 7 | `height(3)` | 3 | 1 | 2 | `|1-2| = 1 ≤ 1` | 3 |

No `-1` was ever returned → the tree is balanced → `true`.

### The failing case — `1 2 3 null 4 null 4 5`

```
        1
       / \
      2   3
     /     \
    4       4
             \
              5
```

| Step | call | node | left | right | returned |
|---:|---|---:|---:|---:|---:|
| 1 | `height(2)` | 2 | 0 | 1 (`4`) | 2 |
| 2 | `height(3)` | 3 | 0 | 2 (`4 → 5`) | 3 |
| 3 | `height(1)` | 1 | 2 | 3 | `|2-3| = 1` → ok → 4 |

This one is still balanced — the imbalance is one level deeper:

```
        1
       / \
      2   3
       \
        4
         \
          5
```

Here `height(2) = 3` (nodes 2 → 4 → 5) and `height(3) = 1`, so `|3-1| = 2 > 1` at the
root → the function returns `-1` → `false`.

## Java Solution

See [`BalancedBinaryTree.java`](./BalancedBinaryTree.java).

```java
public static boolean isBalanced(TreeNode root) {
    return height(root) != -1;
}

private static int height(TreeNode node) {
    if (node == null) {
        return 0;
    }
    int left = height(node.left);
    if (left == -1) {
        return -1;
    }
    int right = height(node.right);
    if (right == -1) {
        return -1;
    }
    if (Math.abs(left - right) > 1) {
        return -1;
    }
    return 1 + Math.max(left, right);
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n) | Every node is visited once; the walk stops early on an unbalanced tree |
| **Space** | O(h) | The call stack mirrors the height of the tree |

## Interview Notes

**Follow-ups to raise yourself:**
- *"What is the maximum possible height of a balanced tree with n nodes?"* → about
  `log2(n+1)`; ask for the proof.
- *"Balance the tree."* → the AVL rotation (rotate the taller subtree) or a red-black
  tree.
- *"Check whether it is a complete binary tree."* → BFS: all the leaves must be at the
  last two levels and on the left.

**Common mistakes:**
- ❌ Computing the height twice (once to compare, once to recurse) → O(n²).
- ❌ Forgetting the `left == -1` early exit → the recursion keeps going after the tree
  is already known to be unbalanced.
- ❌ Comparing the heights of the **root's** children only → the condition must hold at
  *every* node.
- ❌ Using `>` instead of `>=` for the difference → a difference of exactly 1 is allowed.

**How to narrate:**
> "I'll do a post-order walk that returns the height of each subtree, or -1 as soon as
> it finds an imbalance. Because the check happens on the way back up, every height is
> computed exactly once — O(n) instead of the O(n²) you get from calling a plain height
> function twice. The -1 short-circuits the rest of the walk."

## Related Problems

- [Maximum Depth of Binary Tree](./BinaryTreeMaximumDepth.java) — the height function alone
- [Diameter of Binary Tree](./DiameterOfBinaryTree.java) — the same walk, a different question
- [Binary Tree Cameras](./BinaryTreeCameras.java) — post-order with a three-state machine
