package com.dsa.trees;

import com.dsa.utils.FastScanner;
import com.dsa.utils.TreeNode;

import java.io.IOException;
import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.List;

/**
 * Problem: Binary Tree Level Order Traversal
 * LeetCode: 102 | Difficulty: Medium | Frequency: 5/5
 * Pattern: BFS, Queue
 *
 * <p>Problem: Given the root of a binary tree, return the values of its nodes level by
 * level, from left to right, top to bottom.
 *
 * <p>Input format (stdin):
 * <pre>
 * t
 * v0 v1 ... v(t-1)
 * </pre>
 * The tree is given in level order; {@code null} marks a missing child and the first
 * value is the root. {@code t} is the number of level-order tokens that follow.
 *
 * <p>Sample input:
 * <pre>
 * 7
 * 3 9 20 null null 15 7
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 3
 * 9 20
 * 15 7
 * </pre>
 *
 * <p>Approach: a FIFO queue gives breadth-first order for free. The queue always holds
 * exactly the nodes of the level being processed plus the children of the nodes already
 * taken out. We remember the queue size at the start of each round — that count is the
 * number of nodes on the current level — and process only that many nodes.
 *
 * <p>Complexity: Time O(n), Space O(w) where w is the width of the tree.
 */
public class BinaryTreeLevelOrderTraversal {

    /**
     * Returns the nodes of the tree grouped by level, top to bottom.
     *
     * @param root root of the tree, may be {@code null}
     * @return one list per level, each list left to right
     */
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
                if (node.left != null) {
                    queue.add(node.left);
                }
                if (node.right != null) {
                    queue.add(node.right);
                }
            }
            levels.add(level);
        }
        return levels;
    }

    /** Reads one level-order token: an integer, or {@code null} for a missing node. */
    private static Integer nextTreeValue(FastScanner fs) throws IOException {
        String token = fs.next();
        return "null".equals(token) ? null : Integer.valueOf(token);
    }

    /** Reads a tree: a token count followed by that many level-order tokens. */
    private static TreeNode readTree(FastScanner fs) throws IOException {
        int count = fs.nextInt();
        Integer[] values = new Integer[count];
        for (int i = 0; i < count; i++) {
            values[i] = nextTreeValue(fs);
        }
        return TreeNode.of(values);
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        TreeNode root = readTree(fs);

        for (List<Integer> level : levelOrder(root)) {
            StringBuilder sb = new StringBuilder();
            for (int i = 0; i < level.size(); i++) {
                if (i > 0) {
                    sb.append(' ');
                }
                sb.append(level.get(i));
            }
            System.out.println(sb);
        }
    }
}
