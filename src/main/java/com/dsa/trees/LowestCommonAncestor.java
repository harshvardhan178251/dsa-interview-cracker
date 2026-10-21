package com.dsa.trees;

import com.dsa.utils.FastScanner;
import com.dsa.utils.TreeNode;

import java.io.IOException;

/**
 * Problem: Lowest Common Ancestor of a Binary Tree
 * LeetCode: 236 | Difficulty: Medium | Frequency: 5/5
 * Pattern: DFS, Post-order recursion
 *
 * <p>Problem: Given a binary tree and two of its nodes {@code p} and {@code q}, find their
 * lowest common ancestor. The LCA is the node that is an ancestor of both and sits
 * closest to them. Node values are unique.
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
 * 3 5 1 6 2 0 8 null null 7 4
 * 5
 * 1
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 3
 * </pre>
 *
 * <p>Approach: a post-order walk that returns the answer for a subtree. If one of
 * {@code p}/{@code q} is found in a subtree we return that node; if both are found in
 * different subtrees, this node is the LCA. Otherwise we return whatever the children
 * returned (at most one of them can be non-null).
 *
 * <p>Complexity: Time O(n), Space O(h).
 */
public class LowestCommonAncestor {

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
        return find(root, p, q);
    }

    /** Checks whether the tree contains a node with the given value. */
    private static boolean contains(TreeNode node, int value) {
        if (node == null) {
            return false;
        }
        return node.val == value || contains(node.left, value) || contains(node.right, value);
    }

    /** Post-order search that returns the LCA of {@code p} and {@code q} inside a subtree. */
    private static Integer find(TreeNode node, int p, int q) {
        if (node == null) {
            return null;
        }
        if (node.val == p || node.val == q) {
            return node.val;
        }
        Integer left = find(node.left, p, q);
        Integer right = find(node.right, p, q);
        if (left != null && right != null) {
            // p is in the left subtree and q in the right one: this node is the LCA.
            return node.val;
        }
        return left != null ? left : right;
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
