package com.dsa.trees;

import com.dsa.utils.FastScanner;
import com.dsa.utils.TreeNode;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

/**
 * Problem: Path Sum III
 * LeetCode: 437 | Difficulty: Medium | Frequency: 4/5
 * Pattern: DFS, Prefix sums
 *
 * <p>Problem: Count the number of downward paths in a binary tree whose values sum to a
 * target. A path may start at any node and end at any descendant.
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
 * 11
 * 10 5 -3 3 2 null 11 3 -2 null 1
 * 8
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 3
 * </pre>
 *
 * <p>Approach: a path from an ancestor down to the current node has sum
 * {@code currentPrefix - earlierPrefix}. While walking down the tree we keep a map of
 * the prefix sums seen on the current root-to-node path and how often each occurred, so
 * the number of matching prefixes tells us how many paths end here. The map entry is
 * removed again when the walk backtracks.
 *
 * <p>Complexity: Time O(n), Space O(h) for the map and the recursion.
 */
public class CountPathsWithGivenSum {

    /**
     * Counts the downward paths whose values add up to {@code targetSum}.
     *
     * @param root      root of the tree, may be {@code null}
     * @param targetSum the required sum
     * @return the number of matching paths
     */
    public static int pathSum(TreeNode root, int targetSum) {
        Map<Long, Integer> prefix = new HashMap<>();
        prefix.put(0L, 1); // the empty path above the root
        return walk(root, 0L, targetSum, prefix);
    }

    /** Depth-first walk that maintains the prefix sums of the current path. */
    private static int walk(TreeNode node, long sum, long target, Map<Long, Integer> prefix) {
        if (node == null) {
            return 0;
        }
        sum += node.val;
        int found = prefix.getOrDefault(sum - target, 0);
        prefix.merge(sum, 1, Integer::sum);

        int total = found
                + walk(node.left, sum, target, prefix)
                + walk(node.right, sum, target, prefix);

        prefix.merge(sum, -1, Integer::sum); // backtrack
        return total;
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

        System.out.println(pathSum(root, target));
    }
}
