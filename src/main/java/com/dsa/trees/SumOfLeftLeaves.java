package com.dsa.trees;

import com.dsa.utils.FastScanner;
import com.dsa.utils.TreeNode;

import java.io.IOException;

/**
 * Problem: Sum of Left Leaves
 * LeetCode: 404 | Difficulty: Easy | Frequency: 3/5
 * Pattern: DFS, Recursion
 *
 * <p>Problem: Sum the values of all the leaves that are the left child of their parent.
 * A node that is the right child of its parent does not count, even when it is a leaf.
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
 * 4
 * </pre>
 * The tree is 1 -&gt; (2, 3) with 2 -&gt; (4, 5). The leaf 4 is a left child and counts,
 * the leaf 5 is a right child and does not, so the answer is 4.
 *
 * <p>Approach: a post-order walk that returns the sum of the left leaves of a subtree.
 * A node contributes its own value only when it is a leaf <i>and</i> it is the left
 * child of its parent.
 *
 * <p>Complexity: Time O(n), Space O(h).
 */
public class SumOfLeftLeaves {

    /**
     * Sums the values of the leaves that are left children.
     *
     * @param root root of the tree, may be {@code null}
     * @return the sum of the left leaves, 0 when there are none
     */
    public static int sumOfLeftLeaves(TreeNode root) {
        return sum(root, false);
    }

    /**
     * Returns the sum of the left leaves of the subtree.
     *
     * @param node    the root of the subtree
     * @param isLeft  whether {@code node} is the left child of its parent
     */
    private static int sum(TreeNode node, boolean isLeft) {
        if (node == null) {
            return 0;
        }
        if (node.left == null && node.right == null) {
            return isLeft ? node.val : 0;
        }
        return sum(node.left, true) + sum(node.right, false);
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

        System.out.println(sumOfLeftLeaves(root));
    }
}
