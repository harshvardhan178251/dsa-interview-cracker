---
title: Same Tree
leetcode: 100
difficulty: Easy
patterns: [DFS, Structural comparison]
companies: [Amazon, Meta, Google, LinkedIn, Apple, Goldman Sachs, Stripe, TCS, Tech Mahindra, Qualcomm]
frequency: 5
tags: [tree, dfs, recursion, comparison]
sampleInput: |
  4
  1 2 3 4
  4
  1 2 3 4
sampleOutput: "true"
---

# Same Tree — LeetCode 100

| | |
|---|---|
| **Difficulty** | Easy |
| **Pattern** | DFS · Structural comparison |
| **Interview heat** | ★★★★★ |
| **Asked at** | Amazon, Google, Meta, Uber |

## Problem Statement

Given the roots of two binary trees, check whether they are **structurally identical**:
the same shape and the same values at the same positions.

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

The sample compares two copies of

```
  1
 / \
2   3
/
4
```

## Sample Input

```
4
1 2 3 4
4
1 2 3 4
```

## Expected Output

```
true
```

## Approach — compare in lockstep

The comparison has exactly three cases:

| situation | answer |
|---|---|
| both nodes are `null` | `true` — two empty subtrees match |
| exactly one node is `null` | `false` — the shapes differ |
| both nodes exist | their values must be equal **and** both child pairs must match |

```java
if (p == null && q == null) return true;
if (p == null || q == null) return false;
if (p.val != q.val) return false;
return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
```

The `&&` short-circuits: as soon as the left subtrees differ we never look at the
right ones.

## Dry Run

Input: tree A = `1 2 3 4`, tree B = `1 2 3 4`

| Step | call `(p, q)` | p | q | verdict | next call |
|---:|---|---:|---:|---|---|
| 1 | `(A.root, B.root)` | 1 | 1 | values equal → compare children | `(2, 2)` and `(3, 3)` |
| 2 | `(2, 2)` | 2 | 2 | values equal → compare children | `(4, 4)` and `(null, null)` |
| 3 | `(4, 4)` | 4 | 4 | values equal → compare children | `(null, null)` and `(null, null)` |
| 4 | `(null, null)` | — | — | both empty → **true** | — |
| 5 | `(null, null)` | — | — | both empty → **true** | — |
| 6 | `(2, 2)` | — | — | left pair true, right pair true → **true** | — |
| 7 | `(3, 3)` | 3 | 3 | values equal → compare children | `(null, null)` and `(null, null)` |
| 8 | `(null, null)` | — | — | both empty → **true** | — |
| 9 | `(null, null)` | — | — | both empty → **true** | — |
| 10 | `(3, 3)` | — | — | → **true** | — |
| 11 | `(1, 1)` | — | — | left true, right true → **true** | — |

### A failing case

Trees `1 2 3` and `1 2`: step 2 compares `(2, 2)` → true, then step 3 compares
`(3, null)` → one side is `null` → **false** in one line.

## Java Solution

See [`SameTree.java`](./SameTree.java).

```java
public static boolean isSameTree(TreeNode p, TreeNode q) {
    if (p == null && q == null) {
        return true;
    }
    if (p == null || q == null) {
        return false;
    }
    if (p.val != q.val) {
        return false;
    }
    return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n) | Every pair of nodes is compared once |
| **Space** | O(h) | The call stack mirrors the height of the trees |

## Interview Notes

**Follow-ups to raise yourself:**
- *"What if the values may be `null` as well?"* → use a sentinel or compare
  `Objects.equals(p.val, q.val)`.
- *"Compare two *serialised* trees."* → the same idea, but on the token lists.
- *"Can you do it iteratively?"* → yes, with two stacks or by pushing `(p, q)` pairs
  onto one stack.

**Common mistakes:**
- ❌ Checking `p.val == q.val` **before** the null checks → `NullPointerException`.
- ❌ Returning `true` when only one of the two nodes is `null` → the shapes differ.
- ❌ Using `||` instead of `&&` when combining the two child comparisons → the trees
  would match if *either* side matches.

**How to narrate:**
> "I walk both trees at the same time. If both are null they're equal; if exactly one is
> null the shapes differ; otherwise the values have to match and I recurse into both
> child pairs. It's O(n) with an O(h) stack."

## Related Problems

- [Symmetric Tree](./SymmetricTree.java) — the same comparison, mirrored
- [Subtree of Another Tree](./SubtreeOfAnotherTree.java) — the same comparison at every candidate root
- [Serialize and Deserialize Binary Tree](./SerializeAndDeserializeBinaryTree.java) — round-trips a tree
