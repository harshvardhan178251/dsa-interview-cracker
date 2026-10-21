---
title: Sum of Left Leaves
leetcode: 404
difficulty: Easy
patterns: [DFS, Recursion]
companies: [Meta, Netflix, Microsoft]
frequency: 3
tags: [tree, dfs, recursion, leaves]
sampleInput: |
  5
  1 2 3 4 5
sampleOutput: "4"
---

# Sum of Left Leaves — LeetCode 404

| | |
|---|---|
| **Difficulty** | Easy |
| **Pattern** | DFS · Recursion |
| **Interview heat** | ★★★☆☆ |
| **Asked at** | Amazon, Google, Meta |

## Problem Statement

Sum the values of all the **leaves that are the left child** of their parent. A leaf
that is a right child does not count.

```
    1
   / \
  2   3
 / \
4   5
```

Only `4` is a left leaf — `5` is the right child of `2` — so the answer is `4`.

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
4
```

## Approach — pass the "am I a left child?" flag down

The information "is this node a left child?" is **not** available inside the node
itself — it belongs to the edge that leads to it. So the recursion carries it as a
parameter:

```java
private static int sum(TreeNode node, boolean isLeft) {
    if (node == null) {
        return 0;
    }
    if (node.left == null && node.right == null) {
        return isLeft ? node.val : 0;   // a leaf counts only when it is a left child
    }
    return sum(node.left, true) + sum(node.right, false);
}
```

- the left child is always called with `isLeft = true`,
- the right child is always called with `isLeft = false`,
- the root is called with `isLeft = false` (it has no parent, so it cannot be a left
  leaf — but it is not a leaf anyway).

## Dry Run

Input: tree `1 → (2, 3)`, `2 → (4, 5)`

| Step | call | node | `isLeft` | leaf? | returned |
|---:|---|---:|---|---|---:|
| 1 | `sum(1, false)` | 1 | false | no | — |
| 2 | `sum(2, true)` | 2 | true | no | — |
| 3 | `sum(4, true)` | 4 | true | **yes** | `4` ✓ |
| 4 | `sum(5, false)` | 5 | false | **yes** | `0` (right leaf) |
| 5 | `sum(2, true)` | 2 | — | — | `4 + 0` = 4 |
| 6 | `sum(3, false)` | 3 | false | no | — |
| 7 | `sum(null, true)` | — | — | — | 0 |
| 8 | `sum(null, false)` | — | — | — | 0 |
| 9 | `sum(3, false)` | 3 | — | — | `0 + 0` = 0 |
| 10 | `sum(1, false)` | 1 | — | — | `4 + 0` = **4** ✓ |

### The case that catches people

```
      1
     / \
    2   3
   /
  4
```

`4` is a left leaf and counts; `3` is a right child (and not a leaf) and does not.
The answer is `4`, not `7`.

## Java Solution

See [`SumOfLeftLeaves.java`](./SumOfLeftLeaves.java).

```java
public static int sumOfLeftLeaves(TreeNode root) {
    return sum(root, false);
}

private static int sum(TreeNode node, boolean isLeft) {
    if (node == null) {
        return 0;
    }
    if (node.left == null && node.right == null) {
        return isLeft ? node.val : 0;
    }
    return sum(node.left, true) + sum(node.right, false);
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n) | Every node is visited once |
| **Space** | O(h) | The call stack mirrors the height of the tree |

## Interview Notes

**Follow-ups to raise yourself:**
- *"Sum the left leaves of a binary **tree** (n-ary)."* → the same idea: the recursion
  takes the index of the child and counts index 0.
- *"Sum the right leaves."* → flip the flag.
- *"Sum the leaves of every subtree."* → the same walk, but you accumulate a map of
  subtree → sum.

**Common mistakes:**
- ❌ Forgetting to check that the node is a **leaf** → an inner node with a left child
  would be added even though it is not a leaf.
- ❌ Adding every leaf → the right leaves must be excluded.
- ❌ Passing `true` for the root → the root is not a left child of anything.

**How to narrate:**
> "Whether a node is a left child is a property of the edge, not of the node, so I pass
> it down as a flag. When I reach a leaf I add its value only if the flag says it is a
> left child. Everything else is a plain sum of the two subtrees. O(n) time."

## Related Problems

- [Binary Tree Paths](./BinaryTreePaths.java) — the same walk, building strings
- [Path Sum](./PathSum.java) — the "only leaves count" rule
- [Binary Tree Minimum Depth](./BinaryTreeMinimumDepth.java) — the same leaf rule
