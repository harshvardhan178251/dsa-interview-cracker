---
title: Delete Node in a BST
leetcode: 450
difficulty: Medium
patterns: [BST, Recursive descent]
companies: [Amazon, Google, Meta, Uber]
frequency: 4
tags: [tree, bst, recursion, deletion]
sampleInput: |
  7
  5 3 6 2 4 null 7
  3
sampleOutput: "5 4 6 2 7"
---

# Delete Node in a BST — LeetCode 450

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | BST · Recursive descent |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Uber |

## Problem Statement

Delete a node with a given value from a binary search tree. The remaining tree must
still be a valid BST.

```
        5
       / \
      3   6
     / \   \
    2   4   7
```

Deleting `3` (which has two children) replaces it with its in-order successor `4`:

```
        5
       / \
      4   6
     /     \
    2       7
```

## Input Format

The program reads from standard input:

```
t
v0 v1 ... v(t-1)
key
```

- `t` — how many level-order tokens follow (`0` for an empty tree)
- the tokens — the node values in **level order**; `null` marks a missing child and the
  first token is the root
- `key` — the value to delete

The sample tree above is `7` followed by `5 3 6 2 4 null 7`.

## Sample Input

```
7
5 3 6 2 4 null 7
3
```

## Expected Output

```
5 4 6 2 7
```

The values of the remaining tree in **level order** (breadth first, left to right);
missing children are omitted.

## Approach — descend, then three cases

The search for the key is the familiar BST descent. Once the node is found there are
three cases:

| case | action |
|---|---|
| no left child | replace the node by its right child |
| no right child | replace the node by its left child |
| two children | copy the **in-order successor**'s value into the node, then delete that successor |

The in-order successor is the smallest value in the right subtree, found by walking
left from the right child. It has no left child, so deleting it is always the easy
case.

Copying the successor's *value* (instead of moving nodes) keeps the pointers of the
rest of the tree untouched.

## Dry Run

Input: tree `5 → (3, 6)`, `3 → (2, 4)`, `6 → (null, 7)`, delete `key = 3`

| Step | call | node.val | comparison | action | returned subtree |
|---:|---|---:|---|---|---|
| 1 | `delete(5, 3)` | 5 | `3 < 5` | `5.left = delete(3, 3)` | — |
| 2 | `delete(3, 3)` | 3 | `3 == 3` | found | — |
| 3 | — | — | — | two children → find the successor: `3.right = 4`, `4.left == null` → successor = `4` | — |
| 4 | — | — | — | `3.val = 4` (node becomes `4`) | — |
| 5 | `delete(6, 4)` | 6 | `4 < 6` | `6.left = delete(null, 4)` | — |
| 6 | `delete(null, 4)` | — | — | `null` → return `null` | `null` |
| 7 | `delete(6, 4)` | 6 | — | `6.left = null` (unchanged) | node `6` |
| 8 | `delete(3, 3)` | — | — | `3.right = delete(4, 4)` | — |
| 9 | `delete(4, 4)` | 4 | `4 == 4` | found, no left child → return `4.right` = `null` | `null` |
| 10 | `delete(3, 3)` | — | — | `3.right = null` | node `4` (left `2`, right `null`) |
| 11 | `delete(5, 3)` | — | — | `5.left = node 4` | node `5` |

Resulting tree:

```
        5
       / \
      4   6
     /     \
    2       7
```

Level order (missing children omitted): `5 4 6 2 7` ✓

## Java Solution

See [`DeleteFromBST.java`](./DeleteFromBST.java).

```java
public static TreeNode deleteNode(TreeNode root, int key) {
    if (root == null) {
        return null;
    }
    if (key < root.val) {
        root.left = deleteNode(root.left, key);
    } else if (key > root.val) {
        root.right = deleteNode(root.right, key);
    } else {
        if (root.left == null) {
            return root.right;
        }
        if (root.right == null) {
            return root.left;
        }
        TreeNode successor = root.right;
        while (successor.left != null) {
            successor = successor.left;
        }
        root.val = successor.val;
        root.right = deleteNode(root.right, successor.val);
    }
    return root;
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(h) | One descent to the node plus one descent to its successor |
| **Space** | O(h) | The call stack follows the same paths |

## Interview Notes

**Follow-ups to raise yourself:**
- *"Why the in-order successor and not the predecessor?"* → both work; the successor
  keeps the values that are currently larger in the same relative position, the
  predecessor does the mirror of it.
- *"Delete a whole subtree."* → return `null` for that child; the same code handles it.
- *"What if the tree has duplicates?"* → decide whether the duplicates live in the left
  or the right subtree and stay consistent.

**Common mistakes:**
- ❌ Deleting a node with two children by simply returning one child → the other
  subtree is lost.
- ❌ Replacing the node with the **predecessor** but deleting it from the *left* subtree
  without handling its right child.
- ❌ Forgetting to re-assign the returned subtree (`root.left = deleteNode(...)`).
- ❌ Searching for the successor with `root.right.right` → you need the *leftmost* node
  of the right subtree.

**How to narrate:**
> "I descend like a normal BST search. Once I find the node there are three cases: no
> left child, no right child, or both. In the two-children case I copy the in-order
> successor's value into the node and delete the successor, which is the easy case
> because it has no left child. Only one path is walked, so O(h)."

## Related Problems

- [Insert into a Binary Search Tree](./InsertIntoBST.java) — the same descent
- [Search in a Binary Search Tree](./SearchInBST.java) — the same descent
- [Kth Smallest Element in a BST](./KthSmallestElementInBST.java) — in-order traversal
