package com.dsa.trees;

import com.dsa.utils.FastScanner;
import com.dsa.utils.TreeNode;

import java.io.IOException;

/**
 * Problem: Subtree of Another Tree
 * LeetCode: 572 | Difficulty: Easy | Frequency: 4/5
 * Pattern: DFS, Structural comparison
 *
 * <p>Problem: Check whether {@code subRoot} is a subtree of {@code root}: there must be
 * a node of {@code root} whose subtree is identical (same shape, same values) to
 * {@code subRoot}.
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
 * 5
 * 3 4 5 1 2
 * 3
 * 4 1 2
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * true
 * </pre>
 *
 * <p>Approach: try every node of the big tree as the root of the candidate subtree and
 * compare it with the small tree using the same structural comparison as
 * {@code SameTree}. The first match wins.
 *
 * <p>Complexity: Time O(n * m) in the worst case, Space O(h).
 */
public class SubtreeOfAnotherTree {

    /**
     * Checks whether {@code subRoot} is a subtree of {@code root}.
     *
     * @param root    root of the big tree
     * @param subRoot root of the candidate subtree
     * @return {@code true} when the candidate occurs inside the big tree
     */
    public static boolean isSubtree(TreeNode root, TreeNode subRoot) {
        if (subRoot == null) {
            return true;
        }
        if (root == null) {
            return false;
        }
        if (isSame(root, subRoot)) {
            return true;
        }
        return isSubtree(root.left, subRoot) || isSubtree(root.right, subRoot);
    }

    /** Structural comparison of two subtrees. */
    private static boolean isSame(TreeNode a, TreeNode b) {
        if (a == null && b == null) {
            return true;
        }
        if (a == null || b == null) {
            return false;
        }
        if (a.val != b.val) {
            return false;
        }
        return isSame(a.left, b.left) && isSame(a.right, b.right);
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
        TreeNode subRoot = readTree(fs);

        System.out.println(isSubtree(root, subRoot));
    }
}
