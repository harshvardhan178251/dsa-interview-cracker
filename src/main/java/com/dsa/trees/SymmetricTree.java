package com.dsa.trees;

import com.dsa.utils.FastScanner;
import com.dsa.utils.TreeNode;

import java.io.IOException;

/**
 * Problem: Symmetric Tree
 * LeetCode: 101 | Difficulty: Easy | Frequency: 4/5
 * Pattern: DFS, Mirror recursion
 *
 * <p>Problem: Check whether a binary tree is a mirror of itself, i.e. whether the tree is
 * symmetric about its centre.
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
 * 1 2 2 3 4 4 3
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * true
 * </pre>
 *
 * <p>Approach: the tree is symmetric when its left and right subtrees are mirror images
 * of each other. We therefore walk two positions at a time: the left child of the left
 * node against the right child of the right node, and so on. Both positions must be
 * empty, or both present with equal values.
 *
 * <p>Complexity: Time O(n), Space O(h).
 */
public class SymmetricTree {

    /**
     * Checks whether the tree is symmetric about its centre.
     *
     * @param root root of the tree, may be {@code null}
     * @return {@code true} when the tree mirrors itself
     */
    public static boolean isSymmetric(TreeNode root) {
        if (root == null) {
            return true;
        }
        return isMirror(root.left, root.right);
    }

    /** Compares two subtrees as mirror images of each other. */
    private static boolean isMirror(TreeNode left, TreeNode right) {
        if (left == null && right == null) {
            return true;
        }
        if (left == null || right == null) {
            return false;
        }
        if (left.val != right.val) {
            return false;
        }
        return isMirror(left.left, right.right) && isMirror(left.right, right.left);
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

        System.out.println(isSymmetric(root));
    }
}
