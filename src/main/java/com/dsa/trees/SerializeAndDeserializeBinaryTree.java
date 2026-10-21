package com.dsa.trees;

import com.dsa.utils.FastScanner;
import com.dsa.utils.TreeNode;

import java.io.IOException;
import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.LinkedList;
import java.util.List;

/**
 * Problem: Serialize and Deserialize Binary Tree
 * LeetCode: 297 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Level-order encoding, Round trip
 *
 * <p>Problem: Design an algorithm that serialises a binary tree to a string and
 * deserialises it back into the very same tree.
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
 * 1 2 3 null 4
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 1,2,3,null,4
 * 1 2 3 4
 * </pre>
 * The first line is the serialised tree: the values in level order, separated by commas,
 * with {@code null} for the missing children and without the trailing {@code null}s. The
 * second line is the deserialised tree printed in level order, proving the round trip.
 *
 * <p>Approach: the level-order encoding is the input format of this repository, so the
 * serialisation is exactly that list, comma separated. Deserialising means splitting
 * the string again and rebuilding the tree from the level-order list. Trailing
 * {@code null}s may be dropped because they never carry information.
 *
 * <p>Complexity: Time O(n) for both directions, Space O(n) for the encoding.
 */
public class SerializeAndDeserializeBinaryTree {

    /**
     * Serialises a tree into a comma separated level-order string.
     *
     * @param root root of the tree, may be {@code null}
     * @return the serialised tree, or an empty string for an empty tree
     */
    public static String serialize(TreeNode root) {
        if (root == null) {
            return "";
        }
        // A linked list is used as the queue because it happily stores null children.
        Deque<TreeNode> queue = new LinkedList<>();
        queue.add(root);
        List<String> parts = new ArrayList<>();
        while (!queue.isEmpty()) {
            TreeNode node = queue.poll();
            if (node == null) {
                parts.add("null");
                continue;
            }
            parts.add(String.valueOf(node.val));
            queue.add(node.left);
            queue.add(node.right);
        }
        while (!parts.isEmpty() && "null".equals(parts.get(parts.size() - 1))) {
            parts.remove(parts.size() - 1); // trailing nulls carry no information
        }
        return String.join(",", parts);
    }

    /**
     * Rebuilds the tree from its serialised form.
     *
     * @param data the string produced by {@link #serialize(TreeNode)}
     * @return the rebuilt tree, or {@code null} for an empty string
     */
    public static TreeNode deserialize(String data) {
        if (data == null || data.isEmpty()) {
            return null;
        }
        String[] parts = data.split(",");
        Integer[] values = new Integer[parts.length];
        for (int i = 0; i < parts.length; i++) {
            values[i] = "null".equals(parts[i]) ? null : Integer.valueOf(parts[i]);
        }
        return TreeNode.of(values);
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

        String encoded = serialize(root);
        System.out.println(encoded);

        TreeNode restored = deserialize(encoded);
        System.out.println(levelOrderValues(restored));
    }

    /**
     * Renders the values of a tree in level order (breadth first, left to right),
     * skipping the missing children.
     */
    private static String levelOrderValues(TreeNode root) {
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
}
