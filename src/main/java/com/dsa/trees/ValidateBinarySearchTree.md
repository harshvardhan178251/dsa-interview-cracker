---
title: Validate Binary Search Tree
leetcode: 98
difficulty: Medium
patterns: [DFS, Range bounds]
companies: [Meta, Amazon, Google, Salesforce, LinkedIn, Microsoft, Cloudflare, Accenture, Wipro, Barclays]
frequency: 5
tags: [tree, dfs, recursion, bst]
sampleInput: |
  7
  5 1 4 null null 3 6
sampleOutput: "false"
---

# Validate Binary Search Tree — LeetCode 98

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | DFS · Range bounds |
| **Interview heat** | ★★★★★ |
| **Asked at** | Amazon, Google, Meta, Uber, Bloomberg |

## Problem Statement

Check whether a binary tree is a valid **binary search tree**: every node's value is
strictly greater than all the values in its left subtree and strictly smaller than all
the values in its right subtree.

```
    5
   / \
  1   4
     / \
    3   6
```

This is **not** a valid BST: `3` is in the right subtree of `5` but smaller than `5`.

## Input Format

The program reads from standard input:

```
t
v0 v1 ... v(t-1)
```

- `t` — how many level-order tokens follow (`0` for an empty tree)
- the tokens — the node values in **level order**; `null` marks a missing child and the
  first token is the root

The sample tree above is `7` followed by `5 1 4 null null 3 6`.

## Sample Input

```
7
5 1 4 null null 3 6
```

## Expected Output

```
false
```

## Approach — carry the allowed range down

The tempting check — "is the left child smaller and the right child bigger?" — is
**wrong**: it only compares neighbours. The real rule involves *every* ancestor.

So we pass the open interval `(low, high)` down the tree:

- a node must satisfy `low < node.val < high`,
- its left subtree inherits `(low, node.val)`,
- its right subtree inherits `(node.val, high)`.

The root gets `(-∞, +∞)`. Because the bound comes from the ancestors, a node deep in the
tree is compared with all of them at once.

## Dry Run

Input: `5 1 4 null null 3 6` — the tree `5 → (1, 4)`, `4 → (3, 6)`

| Step | call `(node, low, high)` | node.val | check | verdict |
|---:|---|---:|---|---|
| 1 | `(5, -∞, +∞)` | 5 | `-∞ < 5 < +∞` | ok → children get `(-∞, 5)` and `(5, +∞)` |
| 2 | `(1, -∞, 5)` | 1 | `-∞ < 1 < 5` | ok → children get `(-∞, 1)` and `(1, 5)` |
| 3 | `(null, -∞, 1)` | — | — | **true** |
| 4 | `(null, 1, 5)` | — | — | **true** |
| 5 | `(4, 5, +∞)` | 4 | `5 < 4` is false | **false** ✗ |

The walk stops at step 5 — node `4` sits in the right subtree of `5`, so it must be
larger than `5`, and it is not.

### The case that fools the naive check

```
    10
   /  \
  5    15
      /  \
     6    20
```

`6` is bigger than its parent `15`? No — `6 < 15`, so the naive parent/child check
passes, yet the tree is **invalid** because `6` is smaller than `10`, the ancestor that
bounds the whole right subtree. The range check catches it: `6` must satisfy
`15 < 6 < 20`.

## Java Solution

See [`ValidateBinarySearchTree.java`](./ValidateBinarySearchTree.java).

```java
public static boolean isValidBST(TreeNode root) {
    return valid(root, Long.MIN_VALUE, Long.MAX_VALUE);
}

private static boolean valid(TreeNode node, long low, long high) {
    if (node == null) {
        return true;
    }
    if (node.val <= low || node.val >= high) {
        return false;
    }
    return valid(node.left, low, node.val) && valid(node.right, node.val, high);
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n) | Every node is visited once (and the walk stops at the first violation) |
| **Space** | O(h) | The call stack mirrors the height of the tree |

## Interview Notes

**Follow-ups to raise yourself:**
- *"How do you find the k-th smallest element in a BST?"* → in-order traversal; see
  [Kth Smallest Element in a BST](./KthSmallestElementInBST.java).
- *"What if the values can be `null`?"* → use `Integer` and an explicit "no bound" flag
  instead of `±∞`.
- *"Validate a binary tree with arbitrary values."* → in-order traversal and check that
  the sequence is strictly increasing.

**Common mistakes:**
- ❌ Only comparing a node with its **parent** → misses the ancestor violations.
- ❌ Using `Integer.MIN_VALUE` / `Integer.MAX_VALUE` as the initial bounds → a tree that
  really contains those values fails; `long` avoids the problem.
- ❌ Using `<=` instead of `<` → duplicate values are **not** allowed in a strict BST.
- ❌ Passing `node.val` as the *inclusive* bound on the wrong side.

**How to narrate:**
> "A node must be bigger than every value above it on the left and smaller than every
> value above it on the right. I carry that interval down the recursion: a node has to
> sit strictly inside (low, high), and then I tighten the interval for its children.
> That way each node is compared with all its ancestors. O(n) time."

## Related Problems

- [Lowest Common Ancestor of a BST](./LowestCommonAncestorOfBST.java) — uses the ordering the bounds prove
- [Insert into a Binary Search Tree](./InsertIntoBST.java) — keeps the property
- [Search in a Binary Search Tree](./SearchInBST.java) — relies on it
