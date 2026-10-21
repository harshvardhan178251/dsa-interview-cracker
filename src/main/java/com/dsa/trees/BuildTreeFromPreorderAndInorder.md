---
title: Construct Binary Tree from Preorder and Inorder Traversal
leetcode: 105
difficulty: Medium
patterns: [Divide and conquer, Index maps]
companies: [Meta, Google, JP Morgan, Airbnb, Visa]
frequency: 4
tags: [tree, recursion, divide-and-conquer, reconstruction]
sampleInput: |
  5
  3 9 20 15 7
  9 3 15 20 7
sampleOutput: "3 9 20 15 7"
---

# Construct Binary Tree from Preorder and Inorder Traversal — LeetCode 105

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Divide and conquer · Index maps |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Uber, Adobe |

## Problem Statement

Given the **preorder** and the **inorder** traversal of a binary tree with distinct
values, rebuild the tree.

```
      3
     / \
    9  20
      /  \
     15   7
```

- preorder `3 9 20 15 7` — root, left, right
- inorder `9 3 15 20 7` — left, root, right

## Input Format

The program reads from standard input:

```
n
pre[0] pre[1] ... pre[n-1]
in[0] in[1] ... in[n-1]
```

- `n` — the number of nodes
- the two lines — the preorder and the inorder traversal of the same tree

## Sample Input

```
5
3 9 20 15 7
9 3 15 20 7
```

## Expected Output

```
3 9 20 15 7
```

The values of the rebuilt tree in **level order** (breadth first, left to right);
missing children are omitted.

## Approach — the root splits everything

Two facts do all the work:

1. The **first** element of the preorder traversal is the root of the (sub)tree.
2. The root's position in the **inorder** traversal splits the tree: everything before
   it is the left subtree, everything after it is the right subtree.

So the recursion knows the inorder range `[inStart, inEnd]` and the preorder index
where the subtree starts:

```java
int rootValue = preorder[preStart];
int mid = inorderIndex.get(rootValue);       // O(1) thanks to the map
int leftSize = mid - inStart;
root.left  = build(preorder, preStart + 1,        inStart, mid - 1, map);
root.right = build(preorder, preStart + 1 + leftSize, mid + 1, inEnd, map);
```

The `leftSize` tells us how many elements the left subtree occupies in the preorder
array, so the right subtree starts at `preStart + 1 + leftSize`.

The map `value → inorder index` turns the lookup of the root's position into O(1);
without it the whole algorithm degrades to O(n²).

## Dry Run

Input: preorder `3 9 20 15 7`, inorder `9 3 15 20 7`, map `{9:0, 3:1, 15:2, 20:3, 7:4}`

| Step | call `(preStart, inStart, inEnd)` | root = pre[preStart] | `mid` | leftSize | left call | right call |
|---:|---|---:|---:|---:|---|---|
| 1 | `(0, 0, 4)` | 3 | 1 | 1 | `(1, 0, 0)` | `(2, 2, 4)` |
| 2 | `(1, 0, 0)` | 9 | 0 | 0 | `(2, 0, -1)` → empty | `(2, 1, 0)` → empty |
| 3 | `(2, 2, 4)` | 20 | 3 | 1 | `(3, 2, 2)` | `(4, 4, 4)` |
| 4 | `(3, 2, 2)` | 15 | 2 | 0 | `(4, 2, 1)` → empty | `(4, 3, 2)` → empty |
| 5 | `(4, 4, 4)` | 7 | 4 | 0 | `(5, 4, 3)` → empty | `(5, 5, 4)` → empty |

The empty calls are detected by `inStart > inEnd` — **not** by the preorder index: the
preorder index of a right subtree is larger than the inorder index of its range.

The tree that comes out:

```
      3
     / \
    9  20
      /  \
     15   7
```

Level order (missing children omitted): `3 9 20 15 7` ✓

## Java Solution

See [`BuildTreeFromPreorderAndInorder.java`](./BuildTreeFromPreorderAndInorder.java).

```java
public static TreeNode buildTree(int[] preorder, int[] inorder) {
    if (preorder == null || preorder.length == 0) {
        return null;
    }
    Map<Integer, Integer> inorderIndex = new HashMap<>();
    for (int i = 0; i < inorder.length; i++) {
        inorderIndex.put(inorder[i], i);
    }
    return build(preorder, 0, 0, inorder.length - 1, inorderIndex);
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n) | Every node is created once; the map lookup is O(1) on average |
| **Space** | O(n) | The index map plus O(h) recursion |

## Interview Notes

**Follow-ups to raise yourself:**
- *"What if the values are not distinct?"* → the position of the root in the inorder
  traversal is ambiguous; you have to search for all candidates (or the input is
  invalid).
- *"Rebuild the tree from inorder and postorder."* → the same idea, but the root is the
  **last** element of the postorder slice.
- *"Can you do it in O(1) extra space?"* → yes, but you need the index of the root in
  the inorder array, which is O(n) to find — the map is the price of O(n) time.

**Common mistakes:**
- ❌ Detecting the empty subtree with the **preorder** index → the right subtree of a
  node has a preorder index that is larger than its inorder range; the check must be
  `inStart > inEnd`.
- ❌ Forgetting the `leftSize` offset for the right subtree → the right subtree is
  rebuilt from the wrong elements.
- ❌ Scanning the inorder array for the root on every call → O(n²).

**How to narrate:**
> "The first element of the preorder slice is the root, and its position in the
> inorder traversal tells me how big the left subtree is. I keep a map from value to
> inorder index so that lookup is O(1), and I recurse on the two inorder ranges with
> the matching preorder offsets. Every node is created exactly once, so O(n) time."

## Related Problems

- [Serialize and Deserialize Binary Tree](./SerializeAndDeserializeBinaryTree.java) — the opposite direction
- [Lowest Common Ancestor of a Binary Tree](./LowestCommonAncestor.java) — traversals as input
- [Validate Binary Search Tree](./ValidateBinarySearchTree.java) — checks what the rebuild produces
