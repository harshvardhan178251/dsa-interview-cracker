package com.dsa.trees;

import com.dsa.utils.FastScanner;
import com.dsa.utils.TreeNode;

import java.io.IOException;

/**
 * Problem: Lowest Common Ancestor of a BST
 * LeetCode: 235 | Difficulty: Medium | Frequency: 5/5
 * Pattern: BST, Iterative descent
 *
 * <p>Problem: Find the lowest common ancestor of two nodes in a binary search tree.
 *
 * <p>Input format (stdin):
 * <pre>
 * t
 * v0 v1 ... v(t-1)
 * p
 * q
 * </pre>
 * The tree is given in level order; {@code null} marks a missing child and the first
 * value is the root. {@code p} and {@code q} are the values of the two nodes.
 *
 * <p>Sample input:
 * <pre>
 * 11
 * 6 2 8 0 4 7 9 null null 3 5
 * 2
 * 8
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 6
 * </pre>
 *
 * <p>Approach: the BST ordering tells us where to look. If both nodes are smaller than
 * the current node, the LCA must be in the left subtree; if both are larger, it must be
 * in the right subtree; otherwise the current node is the LCA (it is either one of the
 * two nodes, or they sit on different sides of it).
 *
 * <p>Complexity: Time O(h), Space O(1).
 */
public class LowestCommonAncestorOfBST {

    /**
     * Returns the value of the lowest common ancestor of {@code p} and {@code q}.
     *
     * @param root root of the tree, may be {@code null}
     * @param p    value of the first node
     * @param q    value of the second node
     * @return the value of the LCA, or {@code null} when there is none
     */
    public static Integer lowestCommonAncestor(TreeNode root, int p, int q) {
        if (!contains(root, p) || !contains(root, q)) {
            return null; // both nodes have to exist in the tree
        }
        TreeNode current = root;
        while (current != null) {
            if (p < current.val && q < current.val) {
                current = current.left; // both in the left subtree
            } else if (p > current.val && q > current.val) {
                current = current.right; // both in the right subtree
            } else {
                return current.val; // current node splits them apart
            }
        }
        return null;
    }

    /** Checks whether the tree contains a node with the given value. */
    private static boolean contains(TreeNode node, int value) {
        if (node == null) {
            return false;
        }
        return node.val == value || contains(node.left, value) || contains(node.right, value);
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
        int p = fs.nextInt();
        int q = fs.nextInt();

        Integer answer = lowestCommonAncestor(root, p, q);
        System.out.println(answer == null ? "null" : answer.toString());
    }
}
