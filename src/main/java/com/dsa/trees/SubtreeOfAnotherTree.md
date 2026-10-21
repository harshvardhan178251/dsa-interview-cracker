---
title: Subtree of Another Tree
leetcode: 572
difficulty: Easy
patterns: [DFS, Structural comparison]
companies: [Meta, Google, Adobe, Netflix, Pinterest]
frequency: 4
tags: [tree, dfs, recursion, subtree]
sampleInput: |
  5
  3 4 5 1 2
  3
  4 1 2
sampleOutput: "true"
---

# Subtree of Another Tree — LeetCode 572

| | |
|---|---|
| **Difficulty** | Easy |
| **Pattern** | DFS · Structural comparison |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Uber |

## Problem Statement

Check whether `subRoot` is a **subtree** of `root`: there must be a node of `root`
whose subtree is identical (same shape, same values) to `subRoot`.

```
    3
   / \
  4   5
 / \
1   2
```

The tree `4 → (1, 2)` is the left subtree of `3`, so the answer is `true`.

## Input Format

The program reads from standard input:

```
t1
v0 v1 ... v(t1-1)
t2
w0 w1 ... w(t2-1)
```

- `t1`, `t2` — how many level-order tokens follow for each tree (`0` for an empty tree)
- the tokens — the node values in **level order**; `null` marks a missing child and the
  first token of a block is that tree's root

The sample compares

```
    3              4
   / \            / \
  4   5    vs    1   2
 / \
1   2
```

## Sample Input

```
5
3 4 5 1 2
3
4 1 2
```

## Expected Output

```
true
```

## Approach — try every node as the root of the candidate

The subtree of `root` rooted at some node is a candidate; we simply test all of them.

```java
public static boolean isSubtree(TreeNode root, TreeNode subRoot) {
    if (subRoot == null) return true;
    if (root == null) return false;
    if (isSame(root, subRoot)) return true;
    return isSubtree(root.left, subRoot) || isSubtree(root.right, subRoot);
}
```

`isSame` is exactly the structural comparison of
[Same Tree](./SameTree.java): same shape, same values.

The recursion explores the big tree; `isSame` explores the candidate. The `||`
short-circuits as soon as one place matches.

## Dry Run

Input: root = `3 → (4, 5)`, `4 → (1, 2)`; subRoot = `4 → (1, 2)`

| Step | call | node | `isSame(node, subRoot)` | verdict |
|---:|---|---:|---|---|
| 1 | `isSubtree(3, 4)` | 3 | `3.val != 4.val` → false | try the children |
| 2 | `isSubtree(4, 4)` | 4 | values equal → compare the children | — |
| 3 | `isSame(4, 4)` | 4 | — | `4 == 4` → compare `(1,1)` and `(2,2)` |
| 4 | `isSame(1, 1)` | 1 | — | values equal → `(null, null)` twice → **true** |
| 5 | `isSame(2, 2)` | 2 | — | values equal → `(null, null)` twice → **true** |
| 6 | `isSame(4, 4)` | — | — | both children matched → **true** |
| 7 | `isSubtree(4, 4)` | — | — | → **true** ✓ |

The right subtree of `3` (the node `5`) is never visited — the `||` short-circuits.

### A failing case

root = `1 2 3`, subRoot = `1 2 3` as well, but with a different shape — say
`subRoot = 1 → (2, null)`: step 1 compares `1 == 1` → then `isSame(2, 2)` → true,
but `isSame(3, null)` → one side is `null` → **false**. The whole comparison fails, and
the recursion continues with the children of `1`.

## Java Solution

See [`SubtreeOfAnotherTree.java`](./SubtreeOfAnotherTree.java).

```java
public static boolean isSubtree(TreeNode root, TreeNode subRoot) {
    if (subRoot == null) {
        return true;
    }
    if (root == null) {
        return false;
    }
    if (isSame(root, subRoot)) {
        return true;
    }
    return isSubtree(root.left, subRoot) || isSubtree(root.right, subRoot);
}

private static boolean isSame(TreeNode a, TreeNode b) {
    if (a == null && b == null) return true;
    if (a == null || b == null) return false;
    if (a.val != b.val) return false;
    return isSame(a.left, b.left) && isSame(a.right, b.right);
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n · m) | In the worst case every node of the big tree is compared with the whole candidate |
| **Space** | O(h) | The call stack; the two recursions share it |

## Interview Notes

**Follow-ups to raise yourself:**
- *"Can you do it in O(n + m)?"* → yes: serialise both trees (with the `null`
  markers) and use the **KMP** string-matching algorithm to look for the candidate
  inside the big tree — the classic trick.
- *"What if the values may repeat?"* → the serialise-and-match trick still works; the
  naive version does too, it is just slower.
- *"What if the trees are huge and you get many queries?"* → serialise the big tree
  once and reuse it for every candidate.

**Common mistakes:**
- ❌ Comparing only the **values** and not the shape → `1 → (2, 3)` and `1 → (3, 2)`
  would be "equal".
- ❌ Checking the children of the candidate against the children of the *root* of the
  big tree instead of against the candidate's own children.
- ❌ Forgetting the empty-tree cases.

**How to narrate:**
> "The candidate has to match at one of the nodes of the big tree, so I walk the big
> tree and at every node run the same structural comparison I use for two identical
> trees. It's O(n·m) worst case; if I need better I would serialise both trees and use
> KMP to find the candidate inside the bigger string."

## Related Problems

- [Same Tree](./SameTree.java) — the comparison itself
- [Symmetric Tree](./SymmetricTree.java) — the mirrored comparison
- [Serialize and Deserialize Binary Tree](./SerializeAndDeserializeBinaryTree.java) — the O(n + m) trick's building block
