package com.dsa.trees;

import com.dsa.utils.FastScanner;
import com.dsa.utils.TreeNode;

import java.io.IOException;

/**
 * Problem: Minimum Depth of Binary Tree
 * LeetCode: 111 | Difficulty: Easy | Frequency: 4/5
 * Pattern: DFS, Post-order recursion
 *
 * <p>Problem: Given the root of a binary tree, return its minimum depth — the number of
 * nodes on the shortest root-to-leaf path. An empty tree has depth 0.
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
 * 2
 * </pre>
 *
 * <p>Approach: unlike the maximum depth we cannot simply take the minimum of the two
 * subtrees, because a missing child is not a path to a leaf. When one side is empty the
 * answer must come from the other side: {@code 1 + minDepth(other)}. Only when both
 * sides exist do we take the minimum of the two.
 *
 * <p>Complexity: Time O(n), Space O(h).
 */
public class BinaryTreeMinimumDepth {

    /**
     * Returns the minimum depth of the tree.
     *
     * @param root root of the tree, may be {@code null}
     * @return the number of nodes on the shortest root-to-leaf path, 0 for an empty tree
     */
    public static int minDepth(TreeNode root) {
        if (root == null) {
            return 0;
        }
        if (root.left == null) {
            return 1 + minDepth(root.right);
        }
        if (root.right == null) {
            return 1 + minDepth(root.left);
        }
        return 1 + Math.min(minDepth(root.left), minDepth(root.right));
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

        System.out.println(minDepth(root));
    }
}
