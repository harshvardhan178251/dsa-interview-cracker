---
title: Kth Smallest Element in a BST
leetcode: 230
difficulty: Medium
patterns: [BST, In-order iteration]
companies: [Amazon, Google, Meta, LinkedIn, Adobe, Apple, Stripe]
frequency: 5
tags: [tree, bst, traversal, stack]
sampleInput: |
  5
  3 1 4 null 2
  2
sampleOutput: "2"
---

# Kth Smallest Element in a BST — LeetCode 230

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | BST · In-order iteration |
| **Interview heat** | ★★★★★ |
| **Asked at** | Amazon, Google, Meta, Uber, Bloomberg |

## Problem Statement

Find the **k-th smallest** value in a binary search tree (k is 1-based).

```
    3
   / \
  1   4
   \
    2
```

The in-order traversal is `1 2 3 4`, so the 2nd smallest value is `2`.

## Input Format

The program reads from standard input:

```
t
v0 v1 ... v(t-1)
k
```

- `t` — how many level-order tokens follow (`0` for an empty tree)
- the tokens — the node values in **level order**; `null` marks a missing child and the
  first token is the root
- `k` — the 1-based rank to report

The sample tree above is `5` followed by `3 1 4 null 2`.

## Sample Input

```
5
3 1 4 null 2
2
```

## Expected Output

```
2
```

## Approach — in-order, stop after k pops

The magic of a BST is that an **in-order** traversal visits the values in **sorted
order**. So the k-th smallest value is simply the k-th node the in-order traversal
visits.

Instead of collecting all the values we count them and stop as soon as the counter
reaches `k`:

```java
while (current != null || !stack.isEmpty()) {
    while (current != null) {           // descend the left spine
        stack.push(current);
        current = current.left;
    }
    current = stack.pop();              // visit the next smallest value
    if (--remaining == 0) return current.val;
    current = current.right;           // and continue to the right
}
```

This is the same loop as
[Binary Tree Inorder Traversal](./BinaryTreeInorderTraversal.java)
with a counter and an early exit.

**Complexity:** O(h + k) time — we only touch the first k nodes — and O(h) space.

## Dry Run

Input: tree `3 → (1, 4)`, `1 → (null, 2)`, k = 2

| Step | `current` | action | `stack` (bottom → top) | `remaining` | result |
|---:|---|---|---|---:|---|
| 1 | `3` | push 3, go left | `[3]` | 2 | — |
| 2 | `1` | push 1, go left | `[3, 1]` | 2 | — |
| 3 | `null` | spine ends, pop `1` | `[3]` | 2 → **1** | not the answer yet |
| 4 | `1.right` = `2` | go right, push 2, go left | `[3, 2]` | 1 | — |
| 5 | `null` | spine ends, pop `2` | `[3]` | 1 → **0** | **return 2** ✓ |

Only five steps were needed — the rest of the tree (`4`) was never visited.

### The full in-order sequence

Continuing the same walk without the early exit would visit `1`, `2`, `3`, `4` — the
sorted order of the values.

## Java Solution

See [`KthSmallestElementInBST.java`](./KthSmallestElementInBST.java).

```java
public static int kthSmallest(TreeNode root, int k) {
    Deque<TreeNode> stack = new ArrayDeque<>();
    TreeNode current = root;
    int remaining = k;

    while (current != null || !stack.isEmpty()) {
        while (current != null) {
            stack.push(current);
            current = current.left;
        }
        current = stack.pop();
        if (--remaining == 0) {
            return current.val;
        }
        current = current.right;
    }
    throw new IllegalArgumentException("k is out of range: " + k);
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(h + k) | The left spine is walked once, then k nodes are visited |
| **Space** | O(h) | The stack holds at most one root-to-leaf path |

## Interview Notes

**Follow-ups to raise yourself:**
- *"Find the k-th **largest** value."* → walk the tree in reverse in-order (right, node,
  left) and count the same way.
- *"How often is this query made?"* → if it is repeated, augment the tree with the size
  of each subtree and descend with a rank comparison — O(h) regardless of k.
- *"Do it with recursion."* → return the k-th smallest from the left subtree when it
  holds enough elements, otherwise look in the right subtree with a reduced k.

**Common mistakes:**
- ❌ Using `k == 0` after decrementing → the 1-based rank is off by one.
- ❌ Traversing in pre-order or level order → the values are not sorted that way.
- ❌ Not handling the case where `k` is larger than the number of nodes → the stack
  empties and the loop ends without a result.

**How to narrate:**
> "A BST's in-order traversal is sorted, so the k-th smallest is the k-th node in
> in-order. I'll run an iterative in-order walk with a counter and stop as soon as I
> have counted k values — that keeps it O(h + k) instead of O(n) and uses O(h) space."

## Related Problems

- [Binary Tree Inorder Traversal](./BinaryTreeInorderTraversal.java) — the walk without the counter
- [Lowest Common Ancestor of a BST](./LowestCommonAncestorOfBST.java) — the other classic BST question
- [Search in a Binary Search Tree](./SearchInBST.java) — a single-path descent
