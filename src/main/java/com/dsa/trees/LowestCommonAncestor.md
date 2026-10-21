---
title: Lowest Common Ancestor of a Binary Tree
leetcode: 236
difficulty: Medium
patterns: [DFS, Post-order recursion]
companies: [Meta, Amazon, Google, JP Morgan, Uber, Bloomberg, Oracle]
frequency: 5
tags: [tree, dfs, recursion, lca]
sampleInput: |
  11
  3 5 1 6 2 0 8 null null 7 4
  5
  1
sampleOutput: "3"
---

# Lowest Common Ancestor of a Binary Tree — LeetCode 236

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | DFS · Post-order recursion |
| **Interview heat** | ★★★★★ |
| **Asked at** | Amazon, Google, Meta, Uber, Adobe |

## Problem Statement

Given a binary tree and two of its nodes `p` and `q`, find their **lowest common
ancestor** — the node that is an ancestor of both and is closest to them. The LCA can
be one of the two nodes itself.

Node values in the tree are unique, so a node is identified by its value.

```
        3
       / \
      5   1
     / \   \
    6   2   0
       / \   \
      7   4   8
```

For `p = 5` and `q = 1` the LCA is `3`.

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

The sample tree above is `11` followed by `3 5 1 6 2 0 8 null null 7 4`.

## Sample Input

```
11
3 5 1 6 2 0 8 null null 7 4
5
1
```

## Expected Output

```
3
```

## Approach — post-order, return the answer upward

The recursion answers one question: *"what is the LCA of p and q inside this subtree?"*
and it can answer it with three different values:

- `null` — neither node is here,
- a **node value** — exactly one of them is here (and it is the answer for this
  subtree),
- a **node value** — the LCA is this very node.

```java
if (node == null) return null;
if (node.val == p || node.val == q) return node.val;   // found one of them
Integer left  = find(node.left, p, q);
Integer right = find(node.right, p, q);
if (left != null && right != null) return node.val;    // they are on different sides
return left != null ? left : right;                    // at most one is non-null
```

The key line is the third one: if both subtrees returned something, then `p` and `q`
live in different subtrees and the current node is their lowest common ancestor.

Before the walk the code checks that **both** nodes exist in the tree; if one of them
is missing the answer is `null`.

## Dry Run

Input: `3 5 1 6 2 0 8 null null 7 4`, `p = 5`, `q = 1`

| Step | call | node | left result | right result | returned |
|---:|---|---:|---|---|---:|
| 1 | `find(3)` | 3 | — | — | — |
| 2 | `find(5)` | 5 | — | — | — |
| 3 | `find(6)` | 6 | `null` | `null` | `null` |
| 4 | `find(2)` | 2 | — | — | — |
| 5 | `find(7)` | 7 | `null` | `null` | `null` |
| 6 | `find(4)` | 4 | `null` | `null` | `null` |
| 7 | `find(2)` | 2 | `null` | `null` | `null` |
| 8 | `find(5)` | 5 | — | — | **5** (node.val == p) |
| 9 | `find(1)` | 1 | — | — | — |
| 10 | `find(0)` | 0 | `null` | `null` | `null` |
| 11 | `find(8)` | 8 | `null` | `null` | `null` |
| 12 | `find(1)` | 1 | — | — | **1** (node.val == q) |
| 13 | `find(3)` | 3 | `5` | `1` | both non-null → **3** ✓ |

Steps 8 and 12 stop the recursion immediately: once we have found `p` we do not need to
look inside its subtree.

## Java Solution

See [`LowestCommonAncestor.java`](./LowestCommonAncestor.java).

```java
public static Integer lowestCommonAncestor(TreeNode root, int p, int q) {
    return find(root, p, q);
}

private static Integer find(TreeNode node, int p, int q) {
    if (node == null) {
        return null;
    }
    if (node.val == p || node.val == q) {
        return node.val;
    }
    Integer left = find(node.left, p, q);
    Integer right = find(node.right, p, q);
    if (left != null && right != null) {
        return node.val;
    }
    return left != null ? left : right;
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n) | Every node is visited at most once |
| **Space** | O(h) | The call stack mirrors the height of the tree |

## Interview Notes

**Follow-ups to raise yourself:**
- *"What if the values are not unique?"* → you have to compare node **identity**, not
  values; pass the node references instead of the values.
- *"How do you do it for a BST?"* → the ordering does the work: walk left while both
  nodes are smaller, right while both are bigger, otherwise you have arrived.
- *"What if one of the nodes is the ancestor of the other?"* → the answer is the
  ancestor itself; the code handles it because hitting `p` returns immediately.
- *"Can you do it iteratively with a parent map?"* → yes: record the parents, then walk
  `p` and `q` up to the root and look for the first common ancestor.

**Common mistakes:**
- ❌ Returning `null` when one subtree is empty → you must propagate the other side's
  answer.
- ❌ Continuing the search *below* a node that already equals `p` or `q` → the answer
  would still be correct but you do unnecessary work.
- ❌ Assuming `p` is an ancestor of `q` → handle both orders.

**How to narrate:**
> "I'll do a post-order walk. Each call returns the LCA of p and q inside its subtree:
> null if neither is there, the node if one of them is there, and the node itself if
> both subtrees returned something — that means p and q are on opposite sides and this
> node is their lowest common ancestor. O(n) time, O(h) stack."

## Related Problems

- [Lowest Common Ancestor of a BST](./LowestCommonAncestorOfBST.java) — the same question, O(h) thanks to the ordering
- [Path Sum](./PathSum.java) — another "walk upward with an answer" recursion
- [Validate Binary Search Tree](./ValidateBinarySearchTree.java) — the bounds technique
