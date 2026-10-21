---
title: Insert into a Binary Search Tree
leetcode: 701
difficulty: Medium
patterns: [BST, Recursive descent]
companies: [Meta, Amazon, Bloomberg, Goldman Sachs, Cloudflare]
frequency: 4
tags: [tree, bst, recursion, insertion]
sampleInput: |
  5
  4 2 7 1 3
  5
sampleOutput: "4 2 7 1 3 5"
---

# Insert into a Binary Search Tree — LeetCode 701

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | BST · Recursive descent |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta |

## Problem Statement

Insert a value into a binary search tree. If the value is already in the tree nothing
changes; otherwise it becomes a new leaf in the right place.

```
    4          4
   / \        / \
  2   7   →  2   7
 / \          / \ \
1   3        1   3 5
```

## Input Format

The program reads from standard input:

```
t
v0 v1 ... v(t-1)
x
```

- `t` — how many level-order tokens follow (`0` for an empty tree)
- the tokens — the node values in **level order**; `null` marks a missing child and the
  first token is the root
- `x` — the value to insert

The sample tree above is `5` followed by `4 2 7 1 3`.

## Sample Input

```
5
4 2 7 1 3
5
```

## Expected Output

```
4 2 7 1 3 5
```

The values of the resulting tree in **level order** (breadth first, left to right);
missing children are omitted.

## Approach — descend until a child is missing

The BST ordering tells us where the value belongs at every step:

- `x < node.val` → it belongs in the **left** subtree,
- `x > node.val` → it belongs in the **right** subtree,
- `x == node.val` → it is already there, stop.

The recursion returns the (possibly new) subtree root, so the assignment
`root.left = insert(root.left, x)` re-attaches it. Exactly **one** pointer in the tree
changes — the leaf that is created.

```java
if (root == null) return new TreeNode(value);
if (value < root.val) root.left = insertIntoBST(root.left, value);
else if (value > root.val) root.right = insertIntoBST(root.right, value);
return root;
```

## Dry Run

Input: tree `4 → (2, 7)`, `2 → (1, 3)`, insert `x = 5`

| Step | call | node.val | comparison | action | subtree returned |
|---:|---|---:|---|---|---|
| 1 | `insert(4, 5)` | 4 | `5 > 4` | go right | — |
| 2 | `insert(7, 5)` | 7 | `5 < 7` | go left | — |
| 3 | `insert(null, 5)` | — | — | create a leaf `5` | node `5` |
| 4 | `insert(7, 5)` | 7 | — | `7.left = 5` | node `7` |
| 5 | `insert(4, 5)` | 4 | — | `4.right = 7` | node `4` |

Resulting tree:

```
    4
   / \
  2   7
 / \  /
1  3 5
```

Level order (missing children omitted): `4 2 7 1 3 5` ✓

### The duplicate case

Inserting `5` again: step 1 (`5 > 4` → right), step 2 (`5 < 7` → left), step 3
(`5 == 5` → neither branch) → the tree is unchanged. The `else if` for `>` is what
prevents an infinite recursion.

## Java Solution

See [`InsertIntoBST.java`](./InsertIntoBST.java).

```java
public static TreeNode insertIntoBST(TreeNode root, int value) {
    if (root == null) {
        return new TreeNode(value);
    }
    if (value < root.val) {
        root.left = insertIntoBST(root.left, value);
    } else if (value > root.val) {
        root.right = insertIntoBST(root.right, value);
    }
    return root;
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(h) | One path from the root to the insertion point |
| **Space** | O(h) | The call stack follows the same path |

## Interview Notes

**Follow-ups to raise yourself:**
- *"Insert several values — is it still O(n log n)?"* → yes, if you insert them in
  sorted order it degenerates to O(n²); randomising the order keeps it O(n log n) on
  average.
- *"Can you do it iteratively?"* → yes: keep a parent pointer and attach the new leaf
  at the end; O(1) extra space.
- *"What if the tree is not balanced?"* → the insert is still correct, but the height can
  be O(n); that is why self-balancing trees exist.

**Common mistakes:**
- ❌ Using `else` instead of `else if` → an equal value would recurse into the right
  subtree forever (or duplicate the value).
- ❌ Forgetting `root.left = ...` → the new subtree is created but never attached.
- ❌ Inserting into a leaf's *left* child when the value is bigger → the BST property
  breaks.

**How to narrate:**
> "I walk down from the root: smaller values go left, bigger values go right. The first
> missing child is where the new leaf goes, so only one pointer changes. I use two
> separate comparisons so a duplicate value is a no-op. O(h) time."

## Related Problems

- [Search in a Binary Search Tree](./SearchInBST.java) — the same descent
- [Delete Node in a BST](./DeleteFromBST.java) — the same descent, with three cases
- [Validate Binary Search Tree](./ValidateBinarySearchTree.java) — checks the property the insert maintains
