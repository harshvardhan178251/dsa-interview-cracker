---
title: Zigzag Level Order Traversal
leetcode: 103
difficulty: Medium
patterns: [BFS, Alternating direction]
companies: [Amazon, Meta, Airbnb, Adobe, Pinterest, Cognizant, Capgemini, Zomato]
frequency: 4
tags: [tree, bfs, traversal, queue]
sampleInput: |
  7
  3 9 20 null null 15 7
sampleOutput: |
  3
  20 9
  15 7
---

# Zigzag Level Order Traversal — LeetCode 103

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | BFS · Alternating direction |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Uber |

## Problem Statement

Return the node values of a binary tree level by level, but **reverse the order of
every second level**.

```
        3
       / \
      9   20
         /  \
        15   7
```

The answer is `[[3], [20, 9], [15, 7]]` — level 2 is printed right to left.

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
20 9
15 7
```

One level per line.

## Approach — BFS, then reverse every second level

The traversal itself is the ordinary
[level order traversal](./BinaryTreeLevelOrderTraversal.java):
a queue, and the queue size at the start of the round tells you the size of the level.

The zigzag comes from a flag that flips after every level:

```java
if (!leftToRight) {
    Collections.reverse(level);
}
leftToRight = !leftToRight;
```

Reversing a level after it was collected left-to-right is much simpler than pushing the
children in the opposite order (which would need a stack or a different enqueue
discipline).

## Dry Run

Input: `3 9 20 null null 15 7`, direction flag starts at `leftToRight = true`

| Step | `queue` before | level collected | `leftToRight` before | reversed? | level emitted |
|---:|---|---|---|---|---|
| 1 | `[3]` | `[3]` | true | no | `3` |
| 2 | `[9, 20]` | `[9, 20]` | false | **yes** → `[20, 9]` | `20 9` |
| 3 | `[20, 15, 7]` (after the previous round) | `[15, 7]` | true | no | `15 7` |
| 4 | `[]` | — | — | — | queue empty → stop |

The flag after step 1 is `false`, after step 2 it is `true` again — so the levels
alternate `L→R`, `R→L`, `L→R`, …

### Why not enqueue the children in reverse order?

You could (push the right child first on every second level), but then the *children*
of the reversed level would be enqueued in the wrong order for the next level. The
"collect then reverse" approach keeps the enqueueing discipline constant, so the
direction flag is the only state you have to flip.

## Java Solution

See [`ZigzagLevelOrderTraversal.java`](./ZigzagLevelOrderTraversal.java).

```java
public static List<List<Integer>> zigzagLevelOrder(TreeNode root) {
    List<List<Integer>> levels = new ArrayList<>();
    if (root == null) {
        return levels;
    }
    Deque<TreeNode> queue = new ArrayDeque<>();
    queue.add(root);
    boolean leftToRight = true;

    while (!queue.isEmpty()) {
        int levelSize = queue.size();
        List<Integer> level = new ArrayList<>(levelSize);
        for (int i = 0; i < levelSize; i++) {
            TreeNode node = queue.poll();
            level.add(node.val);
            if (node.left != null) queue.add(node.left);
            if (node.right != null) queue.add(node.right);
        }
        if (!leftToRight) {
            Collections.reverse(level);
        }
        levels.add(level);
        leftToRight = !leftToRight;
    }
    return levels;
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n) | Every node is visited once; reversing a level is linear in its size |
| **Space** | O(w) | `w` = the width of the tree |

## Interview Notes

**Follow-ups to raise yourself:**
- *"Print the zigzag traversal without building the lists."* → print each level as soon
> as it is complete; the reversal happens per level.
- *"Do it for a k-ary tree."* → the same idea, the level size is the number of children
> times the number of nodes.
- *"What if you only want every k-th level reversed?"* → replace the boolean flag with a
> counter.

**Common mistakes:**
- ❌ Reversing the **whole** result instead of every second level.
- ❌ Flipping the flag at the wrong place (before vs. after the level) → the first level
  would be reversed.
- ❌ Taking `queue.size()` inside the inner loop → the level never ends.

**How to narrate:**
> "It's the ordinary level-order traversal with one extra bit of state: a flag that
> tells me whether to print the current level left to right or right to left. I collect
> the level left to right as usual and reverse it when the flag says so, then flip the
> flag. O(n) time, O(w) space."

## Related Problems

- [Binary Tree Level Order Traversal](./BinaryTreeLevelOrderTraversal.java) — the same walk without the flag
- [Populating Next Right Pointers](./PopulateNextRightPointers.java) — links the nodes of each level
- [Binary Tree Paths](./BinaryTreePaths.java) — the depth-first counterpart
