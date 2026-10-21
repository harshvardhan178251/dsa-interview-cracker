---
title: Lowest Common Ancestor of a BST
leetcode: 235
difficulty: Medium
patterns: [BST, Iterative descent]
companies: [Amazon, Google, Meta, Uber, Bloomberg]
frequency: 5
tags: [tree, bst, lca, iteration]
sampleInput: |
  11
  6 2 8 0 4 7 9 null null 3 5
  2
  8
sampleOutput: "6"
---

# Lowest Common Ancestor of a BST — LeetCode 235

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | BST · Iterative descent |
| **Interview heat** | ★★★★★ |
| **Asked at** | Amazon, Google, Meta, Uber, Bloomberg |

## Problem Statement

Find the lowest common ancestor of two nodes in a **binary search tree**.

```
        6
       / \
      2   8
     / \ / \
    0  4 7  9
      / \
     3   5
```

For `p = 2` and `q = 8` the LCA is `6`.

## Input Format

The program reads from standard input:

```
t
v0 v1 ... v(t-1)
p
q
```

- `t` — how many level-order tokens follow (`0` for an empty tree)
- the tokens — the node values in **level order**; `null` marks a missing child and the
  first token is the root
- `p`, `q` — the values of the two nodes

The sample tree above is `11` followed by `6 2 8 0 4 7 9 null null 3 5`.

## Sample Input

```
11
6 2 8 0 4 7 9 null null 3 5
2
8
```

## Expected Output

```
6
```

## Approach — let the ordering do the work

For a general binary tree you need a post-order walk (see
[Lowest Common Ancestor of a Binary Tree](./LowestCommonAncestor.java)).
A BST gives you much more: at every node you already know **where both nodes live**.

```java
while (current != null) {
    if (p < current.val && q < current.val)      current = current.left;
    else if (p > current.val && q > current.val)  current = current.right;
    else                                          return current.val;
}
```

Three cases:

| situation | meaning |
|---|---|
| both `p` and `q` are smaller than the current node | both are in the left subtree → go left |
| both are larger | both are in the right subtree → go right |
| otherwise | the current node is the LCA |

The last case covers two possibilities: the current node **is** `p` or `q` (then it is
its own ancestor's answer), or `p` and `q` are on **opposite sides** of it.

As in the general version, both nodes have to exist in the tree — if one of them is
missing the answer is `null`.

## Dry Run

Input: tree as above, `p = 2`, `q = 8`

| Step | `current` | `current.val` | relation of p and q | action |
|---:|---|---:|---|---|
| 1 | root | 6 | `2 < 6 < 8` — they straddle the node | **return 6** ✓ |

### A longer walk — p = 3, q = 5

| Step | `current.val` | relation | action |
|---:|---:|---|---|
| 1 | 6 | `3 < 6` and `5 < 6` → both smaller | go left → node `2` |
| 2 | 2 | `3 > 2` and `5 > 2` → both larger | go right → node `4` |
| 3 | 4 | `3 < 4 < 5` → they straddle the node | **return 4** ✓ |

`3 → 4 → 5` and `5 → 4`; the lowest common ancestor is `4`, found in three steps.

## Java Solution

See [`LowestCommonAncestorOfBST.java`](./LowestCommonAncestorOfBST.java).

```java
public static Integer lowestCommonAncestor(TreeNode root, int p, int q) {
    TreeNode current = root;
    while (current != null) {
        if (p < current.val && q < current.val) {
            current = current.left;
        } else if (p > current.val && q > current.val) {
            current = current.right;
        } else {
            return current.val;
        }
    }
    return null;
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(h) | One path from the root down to the LCA |
| **Space** | O(1) | A single pointer |

## Interview Notes

**Follow-ups to raise yourself:**
- *"What if the values are not unique?"* → the ordering argument breaks; fall back to the
  general post-order solution.
- *"What if one node is the ancestor of the other?"* → the "straddle" case returns the
  ancestor itself, because one value is smaller and the other larger than it.
- *"Find the LCA of k nodes."* → find the LCA of the smallest and the largest value; it
  is the LCA of all of them.

**Common mistakes:**
- ❌ Forgetting the case where `p` or `q` **equals** the current node → the comparison
  `p < current.val && q < current.val` is false and the node itself is returned, which
  is correct — but only if you also handle `p == current.val` (the "otherwise" branch).
- ❌ Writing the conditions with `||` instead of `&&` → the node would be returned too
  early.
- ❌ Copying the general binary-tree solution and ignoring the BST ordering → correct,
  but O(n) instead of O(h).

**How to narrate:**
> "Because the tree is sorted I don't need a post-order walk. At each node I check
> whether both values are smaller, both are larger, or they straddle the node. In the
> first two cases I descend into that side; in the third case this node is the LCA.
> It's O(h) time and O(1) space."

## Related Problems

- [Lowest Common Ancestor of a Binary Tree](./LowestCommonAncestor.java) — the general O(n) version
- [Validate Binary Search Tree](./ValidateBinarySearchTree.java) — the property this relies on
- [Search in a Binary Search Tree](./SearchInBST.java) — the same style of descent
