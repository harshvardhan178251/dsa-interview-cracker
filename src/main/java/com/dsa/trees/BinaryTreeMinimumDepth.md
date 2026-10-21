---
title: Binary Tree Minimum Depth
leetcode: 111
difficulty: Easy
patterns: [DFS, Post-order recursion]
companies: [Google, Amazon, Microsoft, JP Morgan, Paytm]
frequency: 4
tags: [tree, dfs, recursion, depth]
sampleInput: |
  7
  3 9 20 null null 15 7
sampleOutput: "2"
---

# Binary Tree Minimum Depth — LeetCode 111

| | |
|---|---|
| **Difficulty** | Easy |
| **Pattern** | DFS · Post-order recursion |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta |

## Problem Statement

Given the root of a binary tree, return its **minimum depth** — the number of nodes on
the *shortest* root-to-leaf path. An empty tree has depth 0.

For the tree

```
        3
       / \
      9   20
         /  \
        15   7
```

the minimum depth is `2` (the path `3 → 9`).

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
2
```

## Approach — the missing-child trap

The obvious formula `1 + min(left, right)` is **wrong**: a missing child is not a path
to a leaf, it is the *absence* of a path. In the sample the root's left child `9` is a
leaf (depth 1) and its right child `20` is not — the formula `1 + min(1, 2) = 2` happens
to be right here, but consider

```
    1
   /
  2
```

`1 + min(depth(null) = 0, depth(2) = 1) = 1` — yet the real minimum depth is 2,
because the path must end in a leaf.

The fix is to treat the empty side as "no answer" and take the other side:

- left child missing → `1 + minDepth(right)`
- right child missing → `1 + minDepth(left)`
- both present → `1 + min(minDepth(left), minDepth(right))`

## Dry Run

Input: `3 9 20 null null 15 7`

| Step | call | node | children | returned |
|---:|---|---|---|---:|
| 1 | `minDepth(3)` | `3` | left `9`, right `20` — both present | — |
| 2 | `minDepth(9)` | `9` | no children → left missing | `1 + minDepth(null)` = `1 + 0` = **1** |
| 3 | `minDepth(null)` | — | — | **0** |
| 4 | `minDepth(20)` | `20` | left missing, right `7` | `1 + minDepth(7)` = — |
| 5 | `minDepth(7)` | `7` | no children → left missing | `1 + minDepth(null)` = **1** |
| 6 | `minDepth(20)` | `20` | — | `1 + 1` = **2** |
| 7 | `minDepth(3)` | `3` | both present | `1 + min(1, 2)` = **2** |

The crucial line is step 2: `9` is a leaf, so its left child is missing and the answer
comes from the (empty) right side plus the node itself.

## Java Solution

See [`BinaryTreeMinimumDepth.java`](./BinaryTreeMinimumDepth.java).

```java
public static int minDepth(TreeNode root) {
    if (root == null) {
        return 0;
    }
    if (root.left == null) {
        return 1 + minDepth(root.right);
    }
    if (root.right == null) {
        return 1 + minDepth(root.left);
    }
    return 1 + Math.min(minDepth(root.left), minDepth(root.right));
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n) | Every node is visited once |
| **Space** | O(h) | The call stack mirrors the height of the tree |

## Interview Notes

**Follow-ups to raise yourself:**
- *"Return the shortest path itself, not just its length."* → keep the path in a list and
  copy it when you reach a leaf that improves the best length.
- *"What if the tree may contain cycles?"* → keep a visited set.
- *"How would you do it with BFS?"* → BFS reaches the first leaf in the fewest steps,
  so the number of levels is the answer.

**Common mistakes:**
- ❌ Using `1 + min(left, right)` unconditionally → a missing child is not a leaf.
- ❌ Returning `1` for an empty tree instead of `0`.
- ❌ Checking `root.left == null && root.right == null` **after** the min → you get the
  leaf case right but the one-sided case wrong.

**How to narrate:**
> "The trick here is that a null child is not a path to a leaf. So if one side is
> missing I have to take the other side, and only when both sides exist do I take the
> minimum. That is the difference between this problem and the maximum depth."

## Related Problems

- [Maximum Depth of Binary Tree](./BinaryTreeMaximumDepth.java) — the same walk, `max` instead of `min`
- [Path Sum](./PathSum.java) — the same "only leaves count" rule
- [Balanced Binary Tree](./BalancedBinaryTree.java) — compares the two subtree heights
