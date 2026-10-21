package com.dsa.trees;

import com.dsa.utils.FastScanner;
import com.dsa.utils.TreeNode;

import java.io.IOException;

/**
 * Problem: Diameter of Binary Tree
 * LeetCode: 543 | Difficulty: Easy | Frequency: 4/5
 * Pattern: DFS, Post-order with global state
 *
 * <p>Problem: Given the root of a binary tree, return the length of its diameter — the
 * number of edges on the longest path between any two nodes.
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
 * 5
 * 1 2 3 4 5
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 3
 * </pre>
 *
 * <p>Approach: the longest path of any tree goes through the root or lies completely
 * inside one subtree. In a post-order walk every node knows the height of its two
 * subtrees, so the longest path <i>through</i> that node is
 * {@code height(left) + height(right)}. We return the height from the recursion and keep
 * the best diameter seen in a field.
 *
 * <p>Complexity: Time O(n), Space O(h).
 */
public class DiameterOfBinaryTree {

    /** Longest path found so far, in edges. */
    private static int diameter;

    /**
     * Returns the diameter of the tree in edges.
     *
     * @param root root of the tree, may be {@code null}
     * @return the length of the longest path between any two nodes
     */
    public static int diameter(TreeNode root) {
        diameter = 0;
        height(root);
        return diameter;
    }

    /**
     * Returns the height of the subtree rooted at {@code node} (a leaf has height 1) and
     * updates the diameter on the way back up.
     */
    private static int height(TreeNode node) {
        if (node == null) {
            return 0;
        }
        int left = height(node.left);
        int right = height(node.right);
        int through = left + right; // edges of the path that goes through this node
        if (through > diameter) {
            diameter = through;
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

        System.out.println(diameter(root));
    }
}
