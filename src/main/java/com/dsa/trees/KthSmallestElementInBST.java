package com.dsa.trees;

import com.dsa.utils.FastScanner;
import com.dsa.utils.TreeNode;

import java.io.IOException;
import java.util.ArrayDeque;
import java.util.Deque;

/**
 * Problem: Kth Smallest Element in a BST
 * LeetCode: 230 | Difficulty: Medium | Frequency: 5/5
 * Pattern: BST, In-order iteration
 *
 * <p>Problem: Find the k-th smallest value in a binary search tree, where k is 1-based.
 *
 * <p>Input format (stdin):
 * <pre>
 * t
 * v0 v1 ... v(t-1)
 * k
 * </pre>
 * The tree is given in level order; {@code null} marks a missing child and the first
 * value is the root. {@code k} is the 1-based rank to report.
 *
 * <p>Sample input:
 * <pre>
 * 5
 * 3 1 4 null 2
 * 2
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 2
 * </pre>
 *
 * <p>Approach: an in-order traversal of a BST visits the values in sorted order, so the
 * k-th node we pop off the stack is the answer. We stop as soon as we have counted k
 * values, which avoids traversing the rest of the tree.
 *
 * <p>Complexity: Time O(h + k) — at most k nodes are popped. Space O(h).
 */
public class KthSmallestElementInBST {

    /**
     * Returns the k-th smallest value in the BST.
     *
     * @param root root of the tree, may be {@code null}
     * @param k    1-based rank
     * @return the k-th smallest value
     */
    public static int kthSmallest(TreeNode root, int k) {
        Deque<TreeNode> stack = new ArrayDeque<>();
        TreeNode current = root;
        int remaining = k;

        while (current != null || !stack.isEmpty()) {
            while (current != null) {
                stack.push(current);
                current = current.left;
            }
            current = stack.pop();
            if (--remaining == 0) {
                return current.val;
            }
            current = current.right;
        }
        throw new IllegalArgumentException("k is out of range: " + k);
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
        int k = fs.nextInt();

        System.out.println(kthSmallest(root, k));
    }
}
