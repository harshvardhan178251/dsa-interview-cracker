---
title: Binary Tree Paths
leetcode: 257
difficulty: Easy
patterns: [DFS, Backtracking]
companies: [Amazon, Google, Meta]
frequency: 4
tags: [tree, dfs, backtracking, strings]
sampleInput: |
  5
  1 2 3 null 5
sampleOutput: |
  1->2->5
  1->3
---

# Binary Tree Paths — LeetCode 257

| | |
|---|---|
| **Difficulty** | Easy |
| **Pattern** | DFS · Backtracking |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta |

## Problem Statement

Return every **root-to-leaf path** of a binary tree. A path is written as the node
values joined by `->`.

```
    1
   / \
  2   3
   \
    5
```

The paths are `1->2->5` and `1->3`.

## Input Format

The program reads from standard input:

```
t
v0 v1 ... v(t-1)
```

- `t` — how many level-order tokens follow (`0` for an empty tree)
- the tokens — the node values in **level order**; `null` marks a missing child and the
  first token is the root

The sample tree above is `5` followed by `1 2 3 null 5`.

## Sample Input

```
5
1 2 3 null 5
```

## Expected Output

```
1->2->5
1->3
```

One path per line, in depth-first order (the left subtree first).

## Approach — one builder, truncated on the way back

A single `StringBuilder` holds the path of the current branch:

1. Remember how long the builder was (`mark`).
2. Append `->` (except at the root) and the node's value.
3. If the node is a leaf, copy the builder into the result.
4. Otherwise recurse into the left and the right child.
5. **Truncate** the builder back to `mark` — this is the backtracking step.

Truncating (instead of building a new string per call) keeps the whole walk O(n) for
the traversal itself.

```java
private static void walk(TreeNode node, StringBuilder path, List<String> paths) {
    if (node == null) return;
    int mark = path.length();
    if (mark > 0) path.append("->");
    path.append(node.val);
    if (node.left == null && node.right == null) {
        paths.add(path.toString());
    } else {
        walk(node.left, path, paths);
        walk(node.right, path, paths);
    }
    path.setLength(mark);
}
```

## Dry Run

Input: tree `1 → (2, 3)`, `2 → (null, 5)`

| Step | call | node | `path` before | action | `path` after | `paths` |
|---:|---|---:|---|---|---|---|
| 1 | `walk(1)` | 1 | `` | append `1` (mark = 0) | `1` | — |
| 2 | `walk(2)` | 2 | `1` | append `->2` (mark = 1) | `1->2` | — |
| 3 | `walk(null)` | — | `1->2` | nothing to do | `1->2` | — |
| 4 | `walk(5)` | 5 | `1->2` | append `->5` (mark = 4) | `1->2->5` | — |
| 5 | `walk(5)` | — | — | leaf → add `"1->2->5"` | — | `[1->2->5]` |
| 6 | `walk(2)` | — | — | truncate to mark 1 → `1` | `1` | — |
| 7 | `walk(3)` | 3 | `1` | append `->3` (mark = 1) | `1->3` | — |
| 8 | `walk(3)` | — | — | leaf → add `"1->3"` | — | `[1->2->5, 1->3]` |
| 9 | `walk(1)` | — | — | truncate to mark 0 → `` | `` | — |

The `mark` column is the key: it is the length the builder must have **before** the
node was appended, so the truncation removes exactly that node's contribution (and its
separator).

## Java Solution

See [`BinaryTreePaths.java`](./BinaryTreePaths.java).

```java
public static List<String> binaryTreePaths(TreeNode root) {
    List<String> paths = new ArrayList<>();
    walk(root, new StringBuilder(), paths);
    return paths;
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n²) | The output itself is quadratic: a skewed tree has O(n) paths of O(n) length |
| **Space** | O(h) | The builder holds one root-to-leaf path; the output is extra |

## Interview Notes

**Follow-ups to raise yourself:**
- *"Only print the paths that sum to a target."* → keep a running sum next to the
  builder.
- *"Do it without a global list."* → return the list from the recursion and merge the
  two children's lists.
- *"How would you stream the paths?"* → the builder already is the stream; print it at
  every leaf instead of collecting.

**Common mistakes:**
- ❌ Forgetting to truncate the builder after the recursive calls → the second path
  contains the first one (`1->2->5->3`).
- ❌ Truncating to the wrong length → use the `mark` you saved, not `path.length() - 1`
  (that would remove the separator but keep the digits).
- ❌ Adding a path at every node instead of only at the leaves.

**How to narrate:**
> "I keep the current path in a string builder. I remember its length before I append
> the node, recurse, and then truncate the builder back to that length — that is the
> backtracking. At a leaf the builder holds a complete path and I copy it into the
> result. The traversal is O(n); the output is what makes it O(n²)."

## Related Problems

- [Path Sum](./PathSum.java) — the same walk with a running sum
- [Binary Tree Inorder Traversal](./BinaryTreeInorderTraversal.java) — the same walk without the builder
- [Count Paths With Given Sum](./CountPathsWithGivenSum.java) — counts instead of printing
