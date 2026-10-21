---
title: Diameter of Binary Tree
leetcode: 543
difficulty: Easy
patterns: [DFS, Post-order with global state]
companies: [Google, Amazon, Microsoft, Uber, Paytm]
frequency: 4
tags: [tree, dfs, recursion, diameter]
sampleInput: |
  5
  1 2 3 4 5
sampleOutput: "3"
---

# Diameter of Binary Tree — LeetCode 543

| | |
|---|---|
| **Difficulty** | Easy |
| **Pattern** | DFS · Post-order with global state |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Uber |

## Problem Statement

Given the root of a binary tree, return the length of its **diameter** — the number of
**edges** on the longest path between any two nodes (the path does not have to start at
the root).

For the tree

```
    1
   / \
  2   3
 / \
4   5
```

the longest path is `4 → 2 → 1 → 3`, which is `3` edges.

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
3
```

## Approach — height on the way up, diameter on the side

Every longest path either

1. lies completely inside the left subtree, or
2. lies completely inside the right subtree, or
3. **passes through** the current node.

A post-order walk solves (1) and (2) by recursion. For (3) the path through a node is
the left height plus the right height (in edges), because the node itself is not
counted.

```java
int left  = height(node.left);    // height in nodes
int right = height(node.right);
diameter = max(diameter, left + right);
return 1 + max(left, right);      // height in nodes
```

The recursion returns the **height**, the diameter is kept in a field and updated on
the way back up.

## Dry Run

Input: `1 2 3 4 5`

| Step | call | node | left height | right height | `left + right` | diameter after | height returned |
|---:|---|---|---:|---:|---:|---:|---:|
| 1 | `height(1)` | `1` | — | — | — | 0 | — |
| 2 | `height(2)` | `2` | — | — | — | 0 | — |
| 3 | `height(4)` | `4` | 0 | 0 | 0 | 0 | 1 |
| 4 | `height(5)` | `5` | 0 | 0 | 0 | 0 | 1 |
| 5 | `height(2)` | `2` | 1 | 1 | **2** | **2** | 2 |
| 6 | `height(3)` | `3` | 0 | 0 | 0 | 2 | 1 |
| 7 | `height(1)` | `1` | 2 | 1 | **3** | **3** | 3 |

The best path is found at the root: `left height 2` (node `2` → `4`) plus
`right height 1` (node `3`) = 3 edges.

### Why the heights are counted in nodes

`height(4) = 1` although `4` has no children. The path `4 → 2` uses one edge, and the
formula `left + right` at node `2` is `1 + 1 = 2` — the two edges `2–4` and `2–5`.
Because the node itself contributes `+1` to the height but nothing to the diameter, the
arithmetic lines up.

## Java Solution

See [`DiameterOfBinaryTree.java`](./DiameterOfBinaryTree.java).

```java
public static int diameter(TreeNode root) {
    diameter = 0;
    height(root);
    return diameter;
}

private static int height(TreeNode node) {
    if (node == null) {
        return 0;
    }
    int left = height(node.left);
    int right = height(node.right);
    int through = left + right;
    if (through > diameter) {
        diameter = through;
    }
    return 1 + Math.max(left, right);
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n) | Every node is visited once |
| **Space** | O(h) | The call stack plus one field for the answer |

## Interview Notes

**Follow-ups to raise yourself:**
- *"Return the diameter itself, not its length."* → also store the two endpoint nodes
  when you improve the maximum.
- *"Do it without a global field."* → return a small `record {height, diameter}` from
  the recursion and merge the two children. Cleaner and thread-safe.
- *"What if the tree is a BST — can you do better?"* → no, the diameter is not related to
  the ordering; it is still O(n).

**Common mistakes:**
- ❌ Counting **nodes** instead of edges → the answer is one too large.
- ❌ Forgetting that the path does not have to pass through the root.
- ❌ Sharing one global field between calls without resetting it → the second call
  returns the first call's maximum.

**How to narrate:**
> "A longest path either stays inside a subtree or passes through the current node.
> My recursion returns the height of each subtree; on the way back up I check whether
> the path through this node — left height plus right height — beats the best I have
> seen. That's O(n) time and O(h) space."

## Related Problems

- [Maximum Depth of Binary Tree](./BinaryTreeMaximumDepth.java) — the height function alone
- [Balanced Binary Tree](./BalancedBinaryTree.java) — same walk, different question
- [Binary Tree Cameras](./BinaryTreeCameras.java) — post-order with a state machine
