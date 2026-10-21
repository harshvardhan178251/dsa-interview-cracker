---
title: Populating Next Right Pointers in Each Node
leetcode: 116
difficulty: Medium
patterns: [BFS, Level linking]
companies: [Amazon, Google, Meta, Uber]
frequency: 4
tags: [tree, bfs, pointers, level-order]
sampleInput: |
  6
  1 2 3 null 4 5
sampleOutput: "null 3 null 5 null"
---

# Populating Next Right Pointers in Each Node — LeetCode 116

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | BFS · Level linking |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Uber |

## Problem Statement

Give every node of a binary tree a pointer to the **next node on the same level**
(left to right). The last node of a level points to nothing.

```
      1        1 -> null
     / \       / \
    2   3  →  2 -> 3
   / \         / \
  4   5       4 -> 5
```

## Input Format

The program reads from standard input:

```
t
v0 v1 ... v(t-1)
```

- `t` — how many level-order tokens follow (`0` for an empty tree)
- the tokens — the node values in **level order**; `null` marks a missing child and the
  first token is the root

The sample tree above is `6` followed by `1 2 3 null 4 5`.

## Sample Input

```
6
1 2 3 null 4 5
```

## Expected Output

```
null 3 null 5 null
```

For every node of the tree — in level order — the value of its next pointer (`null`
when it has none).

## Approach — link the nodes of each level

The BFS gives us the nodes of a level in order. Inside a level, the "next" node is
simply the one that follows:

```java
while (!queue.isEmpty()) {
    int levelSize = queue.size();
    TreeNode previous = null;
    for (int i = 0; i < levelSize; i++) {
        TreeNode node = queue.poll();
        if (previous != null) {
            next.put(previous, node);   // link the previous node of this level
        }
        previous = node;
        ... enqueue the children ...
    }
    next.put(previous, null);          // the last node of the level points nowhere
}
```

The `previous` pointer does the work: when the next node of the level is dequeued, it
becomes the next pointer of the one before it. The last node of the level is reset to
`null`.

> **Follow-up:** the same problem can be solved in O(1) extra space without a queue:
> walk the tree with two pointers (`leftChild` and `rightChild`) and connect the
> children of the `leftChild` to the children of the `rightChild` for every node.

## Dry Run

Input: tree `1 → (2, 3)`, `2 → (null, 4)`, `3 → (5, null)`

| Step | `queue` before | node polled | `previous` | link created | `queue` after |
|---:|---|---|---|---|---|
| 1 | `[1]` | `1` | `null` | — (first of the level) | `[2, 3]` |
| 2 | `[2, 3]` | `2` | `1` | `1 → 2` | `[3, 4]` |
| 3 | `[3, 4]` | `3` | `2` | `2 → 3` | `[4, 5]` |
| 4 | `[4, 5]` | — | — | end of the level → `3 → null` | `[5]` |
| 5 | `[5]` | `4` | `null` | — (first of the level) | `[5]` |
| 6 | `[5]` | `5` | `4` | `4 → 5` | `[]` |
| 7 | `[]` | — | — | end of the level → `5 → null` | `[]` |

Resulting next pointers: `1 → 2 → 3 → null` and `4 → 5 → null`.

The nodes in level order are `1, 2, 3, 4, 5`, so the answer is
`null 3 null 5 null` ✓

## Java Solution

See [`PopulateNextRightPointers.java`](./PopulateNextRightPointers.java).

```java
public static Map<TreeNode, TreeNode> connect(TreeNode root) {
    Map<TreeNode, TreeNode> next = new HashMap<>();
    if (root == null) {
        return next;
    }
    Deque<TreeNode> queue = new ArrayDeque<>();
    queue.add(root);

    while (!queue.isEmpty()) {
        int levelSize = queue.size();
        TreeNode previous = null;
        for (int i = 0; i < levelSize; i++) {
            TreeNode node = queue.poll();
            if (previous != null) {
                next.put(previous, node);
            }
            previous = node;
            if (node.left != null) queue.add(node.left);
            if (node.right != null) queue.add(node.right);
        }
        if (previous != null) {
            next.put(previous, null);
        }
    }
    return next;
}
```

`TreeNode` does not override `equals`, so the map behaves like an identity map — which
is exactly what we want here.

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n) | Every node is visited once |
| **Space** | O(n) | The map holds one entry per node (O(w) with the queue-based variant) |

## Interview Notes

**Follow-ups to raise yourself:**
- *"Solve it without a queue and in O(1) space."* → the two-pointer trick: for every
  node, connect the children of its left child to the children of its right child, and
  recurse on both children.
- *"Do it for a perfect binary tree."* → then the next pointer of a node is its
  sibling's right child (or its parent's left child) — a pure pointer chase, O(1) per
  node.
- *"What if the tree is not perfect?"* → the queue-based level walk above is the general
  solution.

**Common mistakes:**
- ❌ Forgetting to reset the last node of a level to `null` → the pointers leak into
  the next level.
- ❌ Linking the nodes of **different** levels → the level size is what prevents it.
- ❌ Using a `HashMap<TreeNode, TreeNode>` and expecting value equality → `TreeNode`
  uses identity equality; that is what you want, but do not rely on `equals`.

**How to narrate:**
> "This is a BFS where the queue size tells me the level boundaries. I keep the
> previously dequeued node and, as soon as the next node of the level comes out, I
> link them. At the end of the level I point the last node at null. O(n) time."

## Related Problems

- [Binary Tree Level Order Traversal](./BinaryTreeLevelOrderTraversal.java) — the same walk
- [Zigzag Level Order Traversal](./ZigzagLevelOrderTraversal.java) — the same walk with a direction flag
- [Binary Tree Cameras](./BinaryTreeCameras.java) — BFS with a state machine
