package com.dsa.trees;

import com.dsa.utils.FastScanner;
import com.dsa.utils.TreeNode;

import java.io.IOException;

/**
 * Problem: Path Sum
 * LeetCode: 112 | Difficulty: Easy | Frequency: 5/5
 * Pattern: DFS, Running sum
 *
 * <p>Problem: Check whether the tree has a root-to-leaf path whose values sum to a
 * target. A path must start at the root and end at a leaf.
 *
 * <p>Input format (stdin):
 * <pre>
 * t
 * v0 v1 ... v(t-1)
 * target
 * </pre>
 * The tree is given in level order; {@code null} marks a missing child and the first
 * value is the root. {@code target} is the required sum.
 *
 * <p>Sample input:
 * <pre>
 * 5
 * 1 2 3 null 4
 * 7
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * true
 * </pre>
 * The path 1 -&gt; 2 -&gt; 4 sums to 7.
 *
 * <p>Approach: carry the running sum down the tree. At a leaf the sum must equal the
 * target. Because the running sum is passed down instead of being accumulated and
 * undone, no backtracking is needed.
 *
 * <p>Complexity: Time O(n), Space O(h).
 */
public class PathSum {

    /**
     * Checks whether a root-to-leaf path adds up to {@code targetSum}.
     *
     * @param root      root of the tree, may be {@code null}
     * @param targetSum the required sum
     * @return {@code true} when such a path exists
     */
    public static boolean hasPathSum(TreeNode root, int targetSum) {
        if (root == null) {
            return false;
        }
        if (root.left == null && root.right == null) {
            return targetSum == root.val; // only a leaf closes a path
        }
        int remaining = targetSum - root.val;
        return hasPathSum(root.left, remaining) || hasPathSum(root.right, remaining);
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
        int target = fs.nextInt();

        System.out.println(hasPathSum(root, target));
    }
}
