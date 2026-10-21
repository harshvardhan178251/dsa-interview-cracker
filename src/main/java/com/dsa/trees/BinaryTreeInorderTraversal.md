---
title: Binary Tree Inorder Traversal
leetcode: 94
difficulty: Easy
patterns: [DFS, Explicit stack]
companies: [Amazon, Google, Meta, Uber, Adobe]
frequency: 5
tags: [tree, traversal, stack]
sampleInput: |
  4
  1 null 2 3
sampleOutput: "1 3 2"
---

# Binary Tree Inorder Traversal — LeetCode 94

| | |
|---|---|
| **Difficulty** | Easy |
| **Pattern** | DFS · Explicit stack |
| **Interview heat** | ★★★★★ |
| **Asked at** | Amazon, Google, Meta, Uber, Adobe |

## Problem Statement

Given the root of a binary tree, return the values of its nodes in **inorder**:
left subtree, then the node, then the right subtree.

For the tree

```
    1
     \
      2
     /
    3
```

the inorder traversal is `1 3 2`.

## Input Format

The program reads from standard input:

```
t
v0 v1 ... v(t-1)
```

- `t` — how many level-order tokens follow (`0` for an empty tree)
- the tokens — the node values in **level order**; `null` marks a missing child and the
  first token is the root

So the sample tree above is `4` followed by `1 null 2 3`.

## Sample Input

```
4
1 null 2 3
```

## Expected Output

```
1 3 2
```

## Approach — left spine, pop, go right

The recursive version is three lines: recurse left, visit, recurse right. The iterative
version replaces the call stack with an explicit one:

1. Walk down the **left spine**, pushing every node you meet onto a stack.
2. The top of the stack is now the leftmost node that still has to be visited — pop it
   and emit its value.
3. Move to its right child and repeat.

The loop condition `current != null || !stack.isEmpty()` is what keeps the traversal
alive: it runs while there is a node to descend into **or** something waiting on the
stack.

> Why not pre-order or post-order? Because inorder needs the *whole* left subtree
> before the node, so you must remember the way back — that memory is the stack.

## Dry Run

Input: `1 null 2 3` — the tree `1 → (null, 2)`, `2 → (3, null)`.

| Step | `current` | action | `stack` (bottom → top) | output so far |
|---:|---|---|---|---|
| 1 | `1` | push 1, go left | `[1]` | `[]` |
| 2 | `null` | left spine ends, pop | `[1]` → pop `1` | `[1]` |
| 3 | `1.right` = `2` | go right, push 2, go left | `[2]` | `[1]` |
| 4 | `2.left` = `3` | push 3, go left | `[2, 3]` | `[1]` |
| 5 | `null` | left spine ends, pop | `[2, 3]` → pop `3` | `[1, 3]` |
| 6 | `3.right` = `null` | nothing to the right, pop | `[2]` → pop `2` | `[1, 3, 2]` |
| 7 | `null` | stack empty and no current node → stop | `[]` | `[1, 3, 2]` |

Every node is pushed once and popped once, so the traversal is O(n).

## Java Solution

See [`BinaryTreeInorderTraversal.java`](./BinaryTreeInorderTraversal.java).

```java
public static List<Integer> inorderTraversal(TreeNode root) {
    List<Integer> out = new ArrayList<>();
    Deque<TreeNode> stack = new ArrayDeque<>();
    TreeNode current = root;

    while (current != null || !stack.isEmpty()) {
        while (current != null) {
            stack.push(current);
            current = current.left;
        }
        current = stack.pop();
        out.add(current.val);
        current = current.right;
    }
    return out;
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n) | Every node is pushed and popped exactly once |
| **Space** | O(h) | The stack holds at most one root-to-leaf path |

## Interview Notes

**Follow-ups to raise yourself:**
- *"Return the inorder traversal without a stack (O(1) extra space)."* → Morris traversal:
  thread the right pointer of every node to its in-order successor and undo the threads
  on the way back. O(n) time, O(1) space, but it mutates the tree.
- *"Do it for pre-order and post-order."* → pre-order is the same loop without the second
  inner loop; post-order is easier iteratively with **two** stacks or with a
  "visiting" marker pushed onto the same stack.
- *"What if the tree is a DAG / has cycles?"* → you need a visited set, and the problem
  changes completely.

**Common mistakes:**
- ❌ Forgetting the second `while` — without it you only visit the left spine.
- ❌ Popping **before** pushing the left child → that is a pre-order traversal.
- ❌ Using `ArrayDeque` and pushing `null` → `ArrayDeque` rejects null elements; guard
  with `if (current != null)`.

**How to narrate:**
> "Inorder is the one traversal that cannot be done without remembering the way back,
> so I'll use an explicit stack. I descend to the leftmost node, then pop and emit,
> then move right. The stack never holds more than the height of the tree, so it's
> O(h) space and O(n) time."

## Related Problems

- [Binary Tree Level Order Traversal](./BinaryTreeLevelOrderTraversal.java) — the breadth-first cousin
- [Binary Tree Paths](./BinaryTreePaths.java) — builds strings during a DFS
- [Kth Smallest Element in a BST](./KthSmallestElementInBST.java) — stops the same traversal after k steps
