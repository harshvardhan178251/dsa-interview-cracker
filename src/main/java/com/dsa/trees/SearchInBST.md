---
title: Search in a Binary Search Tree
leetcode: 700
difficulty: Easy
patterns: [BST, Iterative descent]
companies: [Amazon, Meta, Adobe, Bloomberg, Cloudflare]
frequency: 4
tags: [tree, bst, iteration, search]
sampleInput: |
  5
  4 2 7 1 3
  2
sampleOutput: "true"
---

# Search in a Binary Search Tree — LeetCode 700

| | |
|---|---|
| **Difficulty** | Easy |
| **Pattern** | BST · Iterative descent |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta |

## Problem Statement

Search for a target value in a binary search tree. Return whether the value is present.

```
    4
   / \
  2   7
 / \
1   3
```

Searching for `2` walks `4 → 2` and stops.

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
- `target` — the value to look for

The sample tree above is `5` followed by `4 2 7 1 3`.

## Sample Input

```
5
4 2 7 1 3
2
```

## Expected Output

```
true
```

## Approach — only one branch can hold the target

At every node the BST ordering eliminates half of the remaining tree:

```java
while (current != null) {
    if (current.val == target) return true;
    current = target < current.val ? current.left : current.right;
}
return false;
```

The loop ends in one of two ways: we found the value, or we walked off the tree
(`current == null`). There is no need to look at the other subtree — the ordering
guarantees the target is not there.

This is the same descent as
[Insert into a Binary Search Tree](./InsertIntoBST.java),
without the modification.

## Dry Run

Input: tree `4 → (2, 7)`, `2 → (1, 3)`, target `2`

| Step | `current` | `current.val` | comparison | next `current` |
|---:|---|---:|---|---|
| 1 | `4` | 4 | `2 < 4` → go left | node `2` |
| 2 | `2` | 2 | `2 == 2` → **found** | — |

Result: `true`

### A failed search — target `5`

| Step | `current` | `current.val` | comparison | next `current` |
|---:|---|---:|---|---|
| 1 | `4` | 4 | `5 > 4` → go right | node `7` |
| 2 | `7` | 7 | `5 < 7` → go left | `null` |
| 3 | `null` | — | loop ends | — |

Result: `false` — and note that the subtree `2 → (1, 3)` was never visited, because
every value in it is smaller than `4`.

## Java Solution

See [`SearchInBST.java`](./SearchInBST.java).

```java
public static boolean searchBST(TreeNode root, int target) {
    TreeNode current = root;
    while (current != null) {
        if (current.val == target) {
            return true;
        }
        current = target < current.val ? current.left : current.right;
    }
    return false;
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(h) | Only one root-to-leaf path is walked |
| **Space** | O(1) | The iterative version needs a single pointer |

## Interview Notes

**Follow-ups to raise yourself:**
- *"Find the k-th smallest element."* → the same descent, but with an in-order
  traversal: see [Kth Smallest Element in a BST](./KthSmallestElementInBST.java).
- *"Find the floor and the ceiling of a target."* → keep the last node that was ≤ (≥)
  the target while you descend.
- *"What if the tree is not a BST?"* → you must search both subtrees, O(n).

**Common mistakes:**
- ❌ Searching **both** subtrees → throws away the whole point of the BST.
- ❌ Comparing with `>=` / `<=` instead of `==` → the target may live in either subtree.
- ❌ Forgetting the `null` check in the loop condition → `NullPointerException`.

**How to narrate:**
> "Because the tree is sorted, each comparison eliminates one whole subtree, so the
> search follows a single path down the tree. I compare, go left or right accordingly,
> and stop when I either find the value or fall off the tree. O(h) time and O(1)
> space."

## Related Problems

- [Insert into a Binary Search Tree](./InsertIntoBST.java) — the same descent
- [Delete Node in a BST](./DeleteFromBST.java) — the same descent with three cases
- [Kth Smallest Element in a BST](./KthSmallestElementInBST.java) — in-order traversal
