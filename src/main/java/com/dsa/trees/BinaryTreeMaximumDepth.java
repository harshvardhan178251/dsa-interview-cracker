package com.dsa.trees;

import com.dsa.utils.FastScanner;
import com.dsa.utils.TreeNode;

import java.io.IOException;

/**
 * Problem: Maximum Depth of Binary Tree
 * LeetCode: 104 | Difficulty: Easy | Frequency: 5/5
 * Pattern: DFS, Post-order recursion
 *
 * <p>Problem: Given the root of a binary tree, return its maximum depth — the number of
 * nodes on the longest root-to-leaf path.
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
 * </pre>
 *
 * <p>Approach: the depth of an empty tree is 0 and the depth of a node is
 * {@code 1 + max(depth(left), depth(right))}. The recursion returns the answer for the
 * subtree and the parent adds its own level on the way back up.
 *
 * <p>Complexity: Time O(n) — every node is visited once. Space O(h) — the call stack
 * mirrors the height of the tree.
 */
public class BinaryTreeMaximumDepth {

    /**
     * Returns the maximum depth of the tree.
     *
     * @param root root of the tree, may be {@code null}
     * @return the number of nodes on the longest root-to-leaf path, 0 for an empty tree
     */
    public static int maxDepth(TreeNode root) {
        if (root == null) {
            return 0;
        }
        return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
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

        System.out.println(maxDepth(root));
    }
}
