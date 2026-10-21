---
title: Symmetric Tree
leetcode: 101
difficulty: Easy
patterns: [DFS, Mirror recursion]
companies: [Google, Amazon, Microsoft, JP Morgan, Pinterest]
frequency: 4
tags: [tree, dfs, recursion, mirror]
sampleInput: |
  7
  1 2 2 3 4 4 3
sampleOutput: "true"
---

# Symmetric Tree — LeetCode 101

| | |
|---|---|
| **Difficulty** | Easy |
| **Pattern** | DFS · Mirror recursion |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta |

## Problem Statement

Check whether a binary tree is **symmetric** — a mirror image of itself around its
centre.

```
      1
     / \
    2   2
   / \ / \
  3  4 4  3     → symmetric
```

```
      1
     / \
    2   2
    \   \
     3   3     → not symmetric
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

The sample tree above is `7` followed by `1 2 2 3 4 4 3`.

## Sample Input

```
7
1 2 2 3 4 4 3
```

## Expected Output

```
true
```

## Approach — two pointers instead of one

A single tree cannot be compared with itself position by position (the left half would
be compared with itself). So we walk **two positions at a time**:

- the root's **left** child against the root's **right** child,
- the left child's **left** against the right child's **right**,
- the left child's **right** against the right child's **left**.

```java
private static boolean isMirror(TreeNode left, TreeNode right) {
    if (left == null && right == null) return true;
    if (left == null || right == null) return false;
    if (left.val != right.val) return false;
    return isMirror(left.left, right.right) && isMirror(left.right, right.left);
}
```

Note the **crossed** pairing in the recursive calls — that is what makes it a mirror
and not just an equality check.

## Dry Run

Input: `1 2 2 3 4 4 3`

| Step | call `(left, right)` | left | right | verdict | next calls |
|---:|---|---:|---:|---|---|
| 1 | `isSymmetric(root)` | — | — | root exists → compare its children | `(2, 2)` |
| 2 | `(2, 2)` | 2 | 2 | values equal | `(3, 3)` and `(4, 4)` |
| 3 | `(3, 3)` | 3 | 3 | values equal | `(null, null)`, `(null, null)` |
| 4 | `(null, null)` | — | — | both empty → **true** | — |
| 5 | `(null, null)` | — | — | both empty → **true** | — |
| 6 | `(3, 3)` | — | — | → **true** | — |
| 7 | `(4, 4)` | 4 | 4 | values equal | `(null, null)`, `(null, null)` |
| 8 | `(null, null)` | — | — | both empty → **true** | — |
| 9 | `(null, null)` | — | — | both empty → **true** | — |
| 10 | `(4, 4)` | — | — | → **true** | — |
| 11 | `(2, 2)` | — | — | left true, right true → **true** | — |
| 12 | `isSymmetric(root)` | — | — | → **true** | — |

### The failing case

With `1 2 2 null 3 null 4` the tree is

```
      1
     / \
    2   2
     \   \
      3   4
```

step 2 is `(2, 2)` → the values are equal → the next calls are
`isMirror(2.left = null, 2.right = 4)` → one side is `null` → **false** immediately.

## Java Solution

See [`SymmetricTree.java`](./SymmetricTree.java).

```java
public static boolean isSymmetric(TreeNode root) {
    if (root == null) {
        return true;
    }
    return isMirror(root.left, root.right);
}

private static boolean isMirror(TreeNode left, TreeNode right) {
    if (left == null && right == null) {
        return true;
    }
    if (left == null || right == null) {
        return false;
    }
    if (left.val != right.val) {
        return false;
    }
    return isMirror(left.left, right.right) && isMirror(left.right, right.left);
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n) | Every node is visited once |
| **Space** | O(h) | The call stack mirrors the height of the tree |

## Interview Notes

**Follow-ups to raise yourself:**
- *"Is a tree symmetric if and only if its two subtrees are mirror images?"* → yes, that
  is exactly the definition we coded.
- *"Check whether two trees are mirror images of each other."* → the same helper, called
  with the two roots.
- *"Do it iteratively."* → use a queue and push the pairs in crossed order.

**Common mistakes:**
- ❌ Comparing `left.left` with `right.left` → that is an **equality** check, not a
  mirror check.
- ❌ Forgetting to compare the **root's** two children before recursing.
- ❌ Returning `false` for an empty tree → an empty tree is trivially symmetric.

**How to narrate:**
> "Symmetry means the left subtree and the right subtree are mirror images. So I
> compare two nodes at a time: the root's left child against its right child, then the
> crossed pairs inside. Two empty positions match, one empty position does not, and two
> real positions must have the same value. O(n) time."

## Related Problems

- [Same Tree](./SameTree.java) — the same comparison without the crossing
- [Invert Binary Tree](./InvertBinaryTree.java) — creates the mirror explicitly
- [Subtree of Another Tree](./SubtreeOfAnotherTree.java) — structural comparison again
