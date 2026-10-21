---
title: Maximum Depth of Binary Tree
leetcode: 104
difficulty: Easy
patterns: [DFS, Post-order recursion]
companies: [Amazon, Google, Meta, Uber, Adobe]
frequency: 5
tags: [tree, dfs, recursion, depth]
sampleInput: |
  7
  3 9 20 null null 15 7
sampleOutput: "3"
---

# Maximum Depth of Binary Tree — LeetCode 104

| | |
|---|---|
| **Difficulty** | Easy |
| **Pattern** | DFS · Post-order recursion |
| **Interview heat** | ★★★★★ |
| **Asked at** | Amazon, Google, Meta, Uber, Adobe |

## Problem Statement

Given the root of a binary tree, return its **maximum depth** — the number of nodes on
the longest root-to-leaf path.

For the tree

```
        3
       / \
      9   20
         /  \
        15   7
```

the maximum depth is `3` (path `3 → 20 → 15`).

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
3
```

## Approach — one line of recursion

Two facts do all the work:

- the depth of an **empty** tree is `0`,
- the depth of a **node** is `1 + max(depth(left), depth(right))`.

```java
if (root == null) return 0;
return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
```

The recursion returns the answer for a subtree; each parent adds its own level on the
way back up. It is a *post-order* walk: both children are solved before the parent.

The same idea gives the **minimum** depth — but with a twist, see
[Binary Tree Minimum Depth](./BinaryTreeMinimumDepth.java).

## Dry Run

Input: `3 9 20 null null 15 7`

| Step | call | node | left result | right result | returned |
|---:|---|---|---:|---:|---:|
| 1 | `maxDepth(3)` | `3` | — | — | — |
| 2 | `maxDepth(9)` | `9` | `maxDepth(null)` = 0 | `maxDepth(null)` = 0 | 1 |
| 3 | `maxDepth(20)` | `20` | — | — | — |
| 4 | `maxDepth(null)` | — | — | — | 0 |
| 5 | `maxDepth(15)` | `15` | `maxDepth(null)` = 0 | `maxDepth(null)` = 0 | 1 |
| 6 | `maxDepth(7)` | `7` | `maxDepth(null)` = 0 | `maxDepth(null)` = 0 | 1 |
| 7 | `maxDepth(20)` | `20` | 0 | 1 | `1 + max(0, 1)` = **2** |
| 8 | `maxDepth(3)` | `3` | 1 | 2 | `1 + max(1, 2)` = **3** |

The recursion order is `3 → 9 → null → null → 20 → null → 15 → null → null → 7 → …`;
every node contributes exactly one `+1`.

## Java Solution

See [`BinaryTreeMaximumDepth.java`](./BinaryTreeMaximumDepth.java).

```java
public static int maxDepth(TreeNode root) {
    if (root == null) {
        return 0;
    }
    return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n) | Every node is visited once |
| **Space** | O(h) | The call stack mirrors the height of the tree |

## Interview Notes

**Follow-ups to raise yourself:**
- *"What if the tree is a DAG with shared subtrees?"* → memoise on the node, otherwise
  shared subtrees are recomputed exponentially often.
- *"Compute the minimum depth as well."* → you cannot just take the `min` of the
  children: a missing child is not a path to a leaf.
- *"Do it iteratively."* → BFS level by level (count the levels) or DFS with an explicit
  stack that stores the depth.

**Common mistakes:**
- ❌ Returning `0` for an empty tree and then adding `1` at the root → the answer is off
  by one.
- ❌ Counting **edges** instead of **nodes** — LeetCode wants nodes, so a single node
  has depth 1.
- ❌ Forgetting the `null` base case → infinite recursion.

**How to narrate:**
> "The depth of a node is one plus the deeper of its two subtrees, and an empty subtree
> has depth zero. That's the whole algorithm — I recurse into both children and take
> the max on the way back up. O(n) time, O(h) stack."

## Related Problems

- [Binary Tree Minimum Depth](./BinaryTreeMinimumDepth.java) — the same walk with a different rule
- [Diameter of Binary Tree](./DiameterOfBinaryTree.java) — height plus a global maximum
- [Balanced Binary Tree](./BalancedBinaryTree.java) — compares the two heights
