package com.dsa.trees;

import com.dsa.utils.FastScanner;
import com.dsa.utils.TreeNode;

import java.io.IOException;
import java.util.ArrayDeque;
import java.util.Deque;

/**
 * Problem: Delete Node in a BST
 * LeetCode: 450 | Difficulty: Medium | Frequency: 4/5
 * Pattern: BST, Recursive descent
 *
 * <p>Problem: Delete a node with a given value from a binary search tree. When the node
 * has two children its value is replaced by its in-order successor (the smallest value
 * in its right subtree) and the successor is deleted instead.
 *
 * <p>Input format (stdin):
 * <pre>
 * t
 * v0 v1 ... v(t-1)
 * key
 * </pre>
 * The tree is given in level order; {@code null} marks a missing child and the first
 * value is the root. {@code key} is the value to delete.
 *
 * <p>Sample input:
 * <pre>
 * 7
 * 5 3 6 2 4 null 7
 * 3
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 5 4 6 2 7
 * </pre>
 * The output lists the values of the resulting tree in level order (breadth first, left
 * to right); missing children are omitted.
 *
 * <p>Approach: descend like in a search. Once the node is found there are three cases:
 * no left child (return the right child), no right child (return the left child), or two
 * children (copy the in-order successor's value and delete that successor).
 *
 * <p>Complexity: Time O(h) for the descent plus O(h) for finding the successor.
 * Space O(h).
 */
public class DeleteFromBST {

    /**
     * Deletes {@code key} from the BST, modifying the tree in place.
     *
     * @param root root of the tree, may be {@code null}
     * @param key  the value to delete
     * @return the root of the remaining tree
     */
    public static TreeNode deleteNode(TreeNode root, int key) {
        if (root == null) {
            return null;
        }
        if (key < root.val) {
            root.left = deleteNode(root.left, key);
        } else if (key > root.val) {
            root.right = deleteNode(root.right, key);
        } else {
            if (root.left == null) {
                return root.right; // zero or one child
            }
            if (root.right == null) {
                return root.left;
            }
            // Two children: replace the value with the in-order successor.
            TreeNode successor = root.right;
            while (successor.left != null) {
                successor = successor.left;
            }
            root.val = successor.val;
            root.right = deleteNode(root.right, successor.val);
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
        int key = fs.nextInt();

        TreeNode updated = deleteNode(root, key);
        System.out.println(levelOrderValues(updated));
    }
}
