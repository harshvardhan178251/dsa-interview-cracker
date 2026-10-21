---
title: Binary Tree Cameras
leetcode: 757
difficulty: Medium
patterns: [Greedy post-order, Tree DP]
companies: [Amazon, Google, Meta]
frequency: 3
tags: [tree, dfs, greedy, dynamic-programming]
sampleInput: |
  5
  0 0 null 0 0
sampleOutput: "1"
---

# Binary Tree Cameras — LeetCode 757

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Greedy post-order · Tree DP |
| **Interview heat** | ★★★☆☆ |
| **Asked at** | Amazon, Google, Meta |

## Problem Statement

Place the **minimum number of cameras** on a binary tree so that every node is watched.
A camera watches its own node and its direct neighbours (its parent and its children).

```
      0
     / \
    0   null
   / \
  0   0
```

One camera on the left `0` watches itself, its two children and the root → **1**
camera is enough.

## Input Format

The program reads from standard input:

```
t
v0 v1 ... v(t-1)
```

- `t` — how many level-order tokens follow (`0` for an empty tree)
- the tokens — the node values in **level order**; `null` marks a missing child and the
  first token is the root

The sample tree above is `5` followed by `0 0 null 0 0`.

## Sample Input

```
5
0 0 null 0 0
```

## Expected Output

```
1
```

## Approach — bottom-up greedy with three states

Each node reports one of three states to its parent:

| state | meaning |
|---|---|
| `0` | **not covered** — the node needs its parent to place a camera |
| `1` | the node **has a camera** |
| `2` | the node is **covered** by a camera in its subtree |

The rules, applied bottom-up:

1. If **either child is in state 0** (uncovered), put a camera **here** — this is the
   last chance to cover that child. Return state 1.
2. Else if **either child has a camera** (state 1), this node is watched by it.
   Return state 2.
3. Else neither child watches this node → return state 0 and hope the parent covers
   it.

Finally, the root has no parent: if it ends in state 0 it needs a camera of its own.

**Why is this minimal?** A camera at a node covers that node and its children. If a
child is uncovered, the camera *must* go at this node or at the child — and putting it
at the child would not cover the child itself. Placing it here covers the most nodes,
so the greedy choice is optimal.

## Dry Run

Input: tree `0 → (0, null)`, the left `0 → (0, 0)`

| Step | call | node | left state | right state | rule | cameras | returned state |
|---:|---|---:|---:|---:|---|---:|---:|
| 1 | `walk(null)` | — | — | — | empty subtree | 0 | 2 (covered) |
| 2 | `walk(leaf)` | 0 | 2 | 2 | no camera, no uncovered child → needs cover | 0 | **0** |
| 3 | `walk(leaf)` | 0 | 2 | 2 | same | 0 | **0** |
| 4 | `walk(left 0)` | 0 | 0 | 0 | a child is uncovered → **place a camera** | **1** | **1** |
| 5 | `walk(right null)` | — | — | — | empty | 0 | 2 |
| 6 | `walk(root)` | 0 | 1 | 2 | a child has a camera → covered | 1 | 2 |

The root ends in state 2 (covered by the camera of its left child), so no extra camera
is needed → **1** ✓

### A case where the root needs its own camera

Tree `0` (a single node): the leaf returns state 0 → the root is uncovered → the final
check adds one camera → **1**.

Tree `0 → (0, 0)` (the root with two leaf children): both children return 0 → the root
places a camera → **1**. The final check is not reached (the root is in state 1).

## Java Solution

See [`BinaryTreeCameras.java`](./BinaryTreeCameras.java).

```java
public static int minCameraCover(TreeNode root) {
    cameras = 0;
    if (root == null) {
        return 0;
    }
    int state = walk(root);
    if (state == NEEDS_COVER) {
        cameras++; // the root has no parent
    }
    return cameras;
}

private static int walk(TreeNode node) {
    if (node == null) {
        return COVERED;
    }
    int left = walk(node.left);
    int right = walk(node.right);

    if (left == NEEDS_COVER || right == NEEDS_COVER) {
        cameras++;
        return HAS_CAMERA;
    }
    if (left == HAS_CAMERA || right == HAS_CAMERA) {
        return COVERED;
    }
    return NEEDS_COVER;
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n) | Every node is visited once |
| **Space** | O(h) | The call stack mirrors the height of the tree |

## Interview Notes

**Follow-ups to raise yourself:**
- *"What if a camera also watches the whole subtree?"* → the states change and the
  greedy proof has to be redone.
- *"Place the cameras and return their positions."* → collect the nodes where you place
  a camera.
- *"What if you have a limited budget of k cameras?"* → the same DP with a budget, or
  the tree DP formulation `dp[node][0..2]` with three states and the number of cameras
  as the value.

**Common mistakes:**
- ❌ Forgetting the final check for the root → the root can be left unwatched.
- ❌ Returning `NEEDS_COVER` for a leaf that has a camera — the states must be
  consistent.
- ❌ Placing a camera as soon as a node is "not covered by a child" → you would place
  far too many cameras; the camera goes at the **parent**, where it also covers the
  siblings.

**How to narrate:**
> "I walk the tree bottom-up and every node reports one of three states: uncovered,
> has a camera, or covered. If one of my children is uncovered, I place a camera here
> — that's the last moment I can cover it, and a camera here also covers my other
> child. If a child has a camera, I'm covered. Otherwise I ask my parent to cover me.
> At the end I check the root, which has no parent. O(n) time."

## Related Problems

- [Balanced Binary Tree](./BalancedBinaryTree.java) — the same bottom-up walk
- [Diameter of Binary Tree](./DiameterOfBinaryTree.java) — post-order with global state
- [Binary Tree Level Order Traversal](./BinaryTreeLevelOrderTraversal.java) — the breadth-first alternative
