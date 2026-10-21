package com.dsa.trees;

import com.dsa.utils.FastScanner;
import com.dsa.utils.TreeNode;

import java.io.IOException;

/**
 * Problem: Validate Binary Search Tree
 * LeetCode: 98 | Difficulty: Medium | Frequency: 5/5
 * Pattern: DFS, Range bounds
 *
 * <p>Problem: Check whether a binary tree is a valid BST: every node's value is strictly
 * greater than all values in its left subtree and strictly smaller than all values in
 * its right subtree.
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
 * 5 1 4 null null 3 6
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * false
 * </pre>
 *
 * <p>Approach: passing the allowed range down the tree. A node must sit strictly inside
 * {@code (low, high)}; the left subtree inherits {@code (low, node.val)} and the right
 * subtree {@code (node.val, high)}. The bounds are what make the check correct — only
 * comparing a node with its direct parent is not enough.
 *
 * <p>Complexity: Time O(n), Space O(h).
 */
public class ValidateBinarySearchTree {

    /**
     * Checks whether the tree is a valid binary search tree.
     *
     * @param root root of the tree, may be {@code null}
     * @return {@code true} when the BST property holds everywhere
     */
    public static boolean isValidBST(TreeNode root) {
        return valid(root, Long.MIN_VALUE, Long.MAX_VALUE);
    }

    /** Checks the subtree against the open interval {@code (low, high)}. */
    private static boolean valid(TreeNode node, long low, long high) {
        if (node == null) {
            return true;
        }
        if (node.val <= low || node.val >= high) {
            return false;
        }
        return valid(node.left, low, node.val) && valid(node.right, node.val, high);
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

        System.out.println(isValidBST(root));
    }
}
