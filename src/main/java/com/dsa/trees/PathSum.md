---
title: Path Sum
leetcode: 112
difficulty: Easy
patterns: [DFS, Running sum]
companies: [Meta, Amazon, Google, Salesforce, Microsoft, Apple, Visa]
frequency: 5
tags: [tree, dfs, recursion, path-sum]
sampleInput: |
  5
  1 2 3 null 4
  7
sampleOutput: "true"
---

# Path Sum — LeetCode 112

| | |
|---|---|
| **Difficulty** | Easy |
| **Pattern** | DFS · Running sum |
| **Interview heat** | ★★★★★ |
| **Asked at** | Amazon, Google, Meta, Uber, Adobe |

## Problem Statement

Check whether the tree has a **root-to-leaf path** whose values add up to a target. A
path must start at the root and end at a leaf — a partial path does not count.

```
    1
   / \
  2   3
   \
    4
```

The paths are `1 → 2`, `1 → 2 → 4` and `1 → 3`. The target `7` is reached by
`1 → 2 → 4`.

## Input Format

The program reads from standard input:

```
t
v0 v1 ... v(t-1)
target
```

- `t` — how many level-order tokens follow (`0` for an empty tree)
- the tokens — the node values in **level order**; `null` marks a missing child and the
  first token is the root
- `target` — the required sum

The sample tree above is `5` followed by `1 2 3 null 4`.

## Sample Input

```
5
1 2 3 null 4
7
```

## Expected Output

```
true
```

## Approach — carry the remaining sum down

Instead of accumulating a path and undoing it on the way back (backtracking), pass the
**remaining sum** down the recursion:

```java
if (root == null) return false;
if (root.left == null && root.right == null) return targetSum == root.val;
int remaining = targetSum - root.val;
return hasPathSum(root.left, remaining) || hasPathSum(root.right, remaining);
```

Two rules do the work:

1. A path is only complete at a **leaf** — so the sum is only checked there.
2. The `||` short-circuits: as soon as one side succeeds we stop.

Note that `targetSum == root.val` is checked **at the leaf**, with the value still
included: the recursion subtracts a node's value on the way *down*, and the leaf is
compared with what is left.

## Dry Run

Input: tree `1 → (2, 3)`, `2 → (null, 4)`, target `7`

| Step | call | node | remaining | leaf? | verdict |
|---:|---|---:|---:|---|---|
| 1 | `hasPathSum(1, 7)` | 1 | 7 | no | remaining = `7 - 1` = 6 → try both children |
| 2 | `hasPathSum(2, 6)` | 2 | 6 | no | remaining = `6 - 2` = 4 → try both children |
| 3 | `hasPathSum(null, 4)` | — | 4 | — | **false** (no node) |
| 4 | `hasPathSum(4, 4)` | 4 | 4 | **yes** | `4 == 4` → **true** ✓ |
| 5 | `hasPathSum(2, 6)` | — | — | — | left side true → short-circuit, `||` stops |
| 6 | `hasPathSum(1, 7)` | — | — | — | → **true** |

The right subtree (`3`) is never visited — the left branch already answered the
question.

### A failing case

With target `8` on the same tree: step 4 compares `4 == 8` → false; then
`hasPathSum(3, 6)` → `3` is a leaf and `3 != 6` → false → the whole call returns
`false`.

## Java Solution

See [`PathSum.java`](./PathSum.java).

```java
public static boolean hasPathSum(TreeNode root, int targetSum) {
    if (root == null) {
        return false;
    }
    if (root.left == null && root.right == null) {
        return targetSum == root.val;
    }
    int remaining = targetSum - root.val;
    return hasPathSum(root.left, remaining) || hasPathSum(root.right, remaining);
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n) | Every node is visited at most once |
| **Space** | O(h) | The call stack mirrors the height of the tree |

## Interview Notes

**Follow-ups to raise yourself:**
- *"Return all the paths that sum to the target."* → keep the path in a list and copy it
  at every matching leaf.
- *"Count the paths (starting at any node)."* → that is
  [Path Sum III](./CountPathsWithGivenSum.java); the
  prefix-sum map makes it O(n).
- *"What if the values can be negative?"* → this solution still works (the remaining sum
  simply goes up and down), but the prefix-sum version needs care.

**Common mistakes:**
- ❌ Checking the sum at **every** node → a path that stops in the middle is counted.
- ❌ Forgetting to subtract the node's value before recursing.
- ❌ Returning `targetSum == 0` at a non-leaf → wrong.
- ❌ Using `&&` instead of `||` when combining the two children → you would require
  *both* sides to have a path.

**How to narrate:**
> "I carry the remaining sum down the recursion. At a leaf I compare what is left with
> the node's value; everywhere else I subtract the node's value and try both children.
> Because the sum is passed down instead of accumulated, I don't need backtracking. O(n)
> time, O(h) space."

## Related Problems

- [Path Sum III](./CountPathsWithGivenSum.java) — paths that may start anywhere
- [Binary Tree Paths](./BinaryTreePaths.java) — prints every path
- [Binary Tree Minimum Depth](./BinaryTreeMinimumDepth.java) — the same "only leaves count" rule
