---
title: Binary Tree Level Order Traversal
leetcode: 102
difficulty: Medium
patterns: [BFS, Queue]
companies: [Meta, Amazon, Google, Salesforce, Microsoft, Airbnb, Oracle, Wipro, Capgemini, Zebra]
frequency: 5
tags: [tree, traversal, bfs, queue]
sampleInput: |
  7
  3 9 20 null null 15 7
sampleOutput: |
  3
  9 20
  15 7
---

# Binary Tree Level Order Traversal — LeetCode 102

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | BFS · Queue |
| **Interview heat** | ★★★★★ |
| **Asked at** | Amazon, Google, Meta, Uber, Bloomberg |

## Problem Statement

Given the root of a binary tree, return the values of its nodes **level by level**,
from left to right, top to bottom.

For the tree

```
        3
       / \
      9   20
         /  \
        15   7
```

the answer is `[[3], [9, 20], [15, 7]]`.

## Input Format

The program reads from standard input:

```
t
v0 v1 ... v(t-1)
```

- `t` — how many level-order tokens follow (`0` for an empty tree)
- the tokens — the node values in **level order**; `null` marks a missing child and the
  first token is the root

The sample tree above is `7` followed by `3 9 20 null null 15 7`.

## Sample Input

```
7
3 9 20 null null 15 7
```

## Expected Output

```
3
9 20
15 7
```

One line per level.

## Approach — BFS with a queue

A FIFO queue visits nodes in breadth-first order for free: the queue always holds the
nodes that are waiting to be visited, and they come out in the order they were added.

The only subtlety is **knowing where one level ends**. The trick: remember the size of
the queue *before* you start the level.

```text
levelSize = queue.size()      // how many nodes are on this level
repeat levelSize times:
    poll one node, emit it, enqueue its children
```

Because you only enqueue children of the nodes you remove, and you remove exactly
`levelSize` nodes, the children of the next level cannot leak into the current one.

## Dry Run

Input: `3 9 20 null null 15 7`

| Step | `queue` before | `levelSize` | node polled | `queue` after | level collected |
|---:|---|---:|---|---|---|
| 1 | `[3]` | 1 | `3` | `[9, 20]` | `[3]` |
| 2 | `[9, 20]` | 2 | `9` | `[20, 15]` | `[9]` |
| 3 | `[20, 15]` | 2 | `20` | `[15, 7]` | `[9, 20]` |
| 4 | `[15, 7]` | 2 | `15` | `[7]` | `[15, 7]` |
| 5 | `[7]` | 1 | `7` | `[]` | `[15, 7]` |
| 6 | `[]` | — | — | — | queue empty → stop |

Note how the queue never contains a `null`: children are only enqueued when they exist.

## Java Solution

See [`BinaryTreeLevelOrderTraversal.java`](./BinaryTreeLevelOrderTraversal.java).

```java
public static List<List<Integer>> levelOrder(TreeNode root) {
    List<List<Integer>> levels = new ArrayList<>();
    if (root == null) {
        return levels;
    }
    Deque<TreeNode> queue = new ArrayDeque<>();
    queue.add(root);

    while (!queue.isEmpty()) {
        int levelSize = queue.size();
        List<Integer> level = new ArrayList<>(levelSize);
        for (int i = 0; i < levelSize; i++) {
            TreeNode node = queue.poll();
            level.add(node.val);
            if (node.left != null) queue.add(node.left);
            if (node.right != null) queue.add(node.right);
        }
        levels.add(level);
    }
    return levels;
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n) | Every node is enqueued and dequeued once |
| **Space** | O(w) | `w` = the width of the tree; the queue never holds more than a level and the next one |

## Interview Notes

**Follow-ups to raise yourself:**
- *"Return the level order bottom-up."* → reverse the list of levels at the end.
- *"Do it without a queue."* → you can use a `List` as the queue with an index pointer,
  but that is the same algorithm with more bookkeeping.
- *"How would you do it if the tree were huge (millions of nodes)?"* → BFS needs O(w)
  memory; DFS with an explicit stack is O(h) and is the better choice for a deep tree.

**Common mistakes:**
- ❌ Taking `queue.size()` **inside** the inner loop → the level never ends and you loop
  forever.
- ❌ Enqueueing `null` children → the queue fills with nulls and `ArrayDeque` throws.
- ❌ Forgetting that the children of the *current* level belong to the *next* level.

**How to narrate:**
> "This is a textbook BFS. The queue gives me the breadth-first order; the only thing I
> have to add is a marker for the end of a level. I snapshot the queue size at the
> start of the level and process exactly that many nodes, so the children I enqueue
> belong to the next level. Time O(n), space O(w)."

## Related Problems

- [Zigzag Level Order Traversal](./ZigzagLevelOrderTraversal.java) — reverse every second level
- [Binary Tree Cameras](./BinaryTreeCameras.java) — BFS with a state machine
- [Serialize and Deserialize Binary Tree](./SerializeAndDeserializeBinaryTree.java) — level order as an encoding
