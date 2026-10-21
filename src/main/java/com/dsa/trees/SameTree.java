package com.dsa.trees;

import com.dsa.utils.FastScanner;
import com.dsa.utils.TreeNode;

import java.io.IOException;

/**
 * Problem: Same Tree
 * LeetCode: 100 | Difficulty: Easy | Frequency: 5/5
 * Pattern: DFS, Structural comparison
 *
 * <p>Problem: Given the roots of two binary trees, check whether they are structurally
 * identical: same shape and same values at the same positions.
 *
 * <p>Input format (stdin):
 * <pre>
 * t1
 * v0 v1 ... v(t1-1)
 * t2
 * w0 w1 ... w(t2-1)
 * </pre>
 * Each tree is given in level order; {@code null} marks a missing child and the first
 * value of a block is that tree's root.
 *
 * <p>Sample input:
 * <pre>
 * 4
 * 1 2 3 4
 * 4
 * 1 2 3 4
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * true
 * </pre>
 *
 * <p>Approach: compare the two trees in lockstep. Two empty subtrees are equal, two
 * non-empty ones are equal when their values match and both children pairs are equal.
 * The moment one side is empty and the other is not, the trees differ.
 *
 * <p>Complexity: Time O(n), Space O(h).
 */
public class SameTree {

    /**
     * Checks whether two trees are structurally identical.
     *
     * @param p root of the first tree
     * @param q root of the second tree
     * @return {@code true} when the trees have the same shape and the same values
     */
    public static boolean isSameTree(TreeNode p, TreeNode q) {
        if (p == null && q == null) {
            return true;
        }
        if (p == null || q == null) {
            return false;
        }
        if (p.val != q.val) {
            return false;
        }
        return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
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
        TreeNode p = readTree(fs);
        TreeNode q = readTree(fs);

        System.out.println(isSameTree(p, q));
    }
}
