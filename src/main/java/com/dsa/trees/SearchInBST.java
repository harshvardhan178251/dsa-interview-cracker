package com.dsa.trees;

import com.dsa.utils.FastScanner;
import com.dsa.utils.TreeNode;

import java.io.IOException;

/**
 * Problem: Search in a Binary Search Tree
 * LeetCode: 700 | Difficulty: Easy | Frequency: 4/5
 * Pattern: BST, Iterative descent
 *
 * <p>Problem: Search for a target value in a binary search tree.
 *
 * <p>Input format (stdin):
 * <pre>
 * t
 * v0 v1 ... v(t-1)
 * target
 * </pre>
 * The tree is given in level order; {@code null} marks a missing child and the first
 * value is the root. {@code target} is the value to look for.
 *
 * <p>Sample input:
 * <pre>
 * 5
 * 4 2 7 1 3
 * 2
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * true
 * </pre>
 *
 * <p>Approach: the BST ordering means only one branch can contain the target. Compare
 * the target with the current node: if it is smaller go left, if it is bigger go right,
 * if it is equal we are done. An empty subtree ends the search.
 *
 * <p>Complexity: Time O(h) — at most one path is walked. Space O(1) with the iterative
 * version, O(h) with the recursive one.
 */
public class SearchInBST {

    /**
     * Searches the BST for {@code target}.
     *
     * @param root   root of the tree, may be {@code null}
     * @param target the value to look for
     * @return {@code true} when the value is present
     */
    public static boolean searchBST(TreeNode root, int target) {
        TreeNode current = root;
        while (current != null) {
            if (current.val == target) {
                return true;
            }
            current = target < current.val ? current.left : current.right;
        }
        return false;
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

        System.out.println(searchBST(root, target));
    }
}
