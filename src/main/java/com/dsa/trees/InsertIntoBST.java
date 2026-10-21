package com.dsa.trees;

import com.dsa.utils.FastScanner;
import com.dsa.utils.TreeNode;

import java.io.IOException;
import java.util.ArrayDeque;
import java.util.Deque;

/**
 * Problem: Insert into a Binary Search Tree
 * LeetCode: 701 | Difficulty: Medium | Frequency: 4/5
 * Pattern: BST, Recursive descent
 *
 * <p>Problem: Insert a value into a binary search tree. If the value is already present
 * nothing changes; otherwise it becomes a new leaf.
 *
 * <p>Input format (stdin):
 * <pre>
 * t
 * v0 v1 ... v(t-1)
 * x
 * </pre>
 * The tree is given in level order; {@code null} marks a missing child and the first
 * value is the root. {@code x} is the value to insert.
 *
 * <p>Sample input:
 * <pre>
 * 5
 * 4 2 7 1 3
 * 5
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 4 2 7 1 3 5
 * </pre>
 * The output lists the values of the resulting tree in level order (breadth first, left
 * to right); missing children are omitted.
 *
 * <p>Approach: walk down from the root comparing with the value. Smaller values go
 * left, larger values go right. The first missing child we meet is where the new leaf
 * is attached, so exactly one pointer in the tree changes.
 *
 * <p>Complexity: Time O(h) — one path down the tree. Space O(h) for the recursion.
 */
public class InsertIntoBST {

    /**
     * Inserts {@code value} into the BST, modifying the tree in place.
     *
     * @param root  root of the tree, may be {@code null}
     * @param value the value to insert
     * @return the root of the (possibly new) tree
     */
    public static TreeNode insertIntoBST(TreeNode root, int value) {
        if (root == null) {
            return new TreeNode(value);
        }
        if (value < root.val) {
            root.left = insertIntoBST(root.left, value);
        } else if (value > root.val) {
            root.right = insertIntoBST(root.right, value);
        }
        return root;
    }

    /**
     * Renders the values of a tree in level order (breadth first, left to right),
     * skipping the missing children.
     */
    public static String levelOrderValues(TreeNode root) {
        if (root == null) {
            return "";
        }
        Deque<TreeNode> queue = new ArrayDeque<>();
        queue.add(root);
        StringBuilder sb = new StringBuilder();
        while (!queue.isEmpty()) {
            TreeNode node = queue.poll();
            if (sb.length() > 0) {
                sb.append(' ');
            }
            sb.append(node.val);
            if (node.left != null) {
                queue.add(node.left);
            }
            if (node.right != null) {
                queue.add(node.right);
            }
        }
        return sb.toString();
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
        int value = fs.nextInt();

        TreeNode updated = insertIntoBST(root, value);
        System.out.println(levelOrderValues(updated));
    }
}
