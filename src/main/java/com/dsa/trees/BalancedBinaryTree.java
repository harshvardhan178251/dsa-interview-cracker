package com.dsa.trees;

import com.dsa.utils.FastScanner;
import com.dsa.utils.TreeNode;

import java.io.IOException;

/**
 * Problem: Balanced Binary Tree
 * LeetCode: 110 | Difficulty: Easy | Frequency: 5/5
 * Pattern: DFS, Post-order height check
 *
 * <p>Problem: Check whether a binary tree is height-balanced: for every node, the
 * heights of its two subtrees differ by at most one.
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
 * true
 * </pre>
 *
 * <p>Approach: a post-order walk returns the height of each subtree, or {@code -1} when
 * the subtree is already known to be unbalanced. Because the walk stops as soon as an
 * imbalance is found, a skewed tree costs O(n) in the worst case but usually much less.
 *
 * <p>Complexity: Time O(n), Space O(h).
 */
public class BalancedBinaryTree {

    /**
     * Checks whether the tree is height-balanced.
     *
     * @param root root of the tree, may be {@code null}
     * @return {@code true} when every node's subtrees differ in height by at most one
     */
    public static boolean isBalanced(TreeNode root) {
        return height(root) != -1;
    }

    /**
     * Returns the height of the subtree, or {@code -1} when it is not balanced.
     */
    private static int height(TreeNode node) {
        if (node == null) {
            return 0;
        }
        int left = height(node.left);
        if (left == -1) {
            return -1;
        }
        int right = height(node.right);
        if (right == -1) {
            return -1;
        }
        if (Math.abs(left - right) > 1) {
            return -1;
        }
        return 1 + Math.max(left, right);
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

        System.out.println(isBalanced(root));
    }
}
