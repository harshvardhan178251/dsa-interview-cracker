package com.dsa.trees;

import com.dsa.utils.FastScanner;
import com.dsa.utils.TreeNode;

import java.io.IOException;
import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Problem: Populating Next Right Pointers in Each Node
 * LeetCode: 116 | Difficulty: Medium | Frequency: 4/5
 * Pattern: BFS, Level linking
 *
 * <p>Problem: Give every node of a binary tree a pointer to the next node on the same
 * level (left to right). The last node of a level points to nothing.
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
 * 6
 * 1 2 3 null 4 5
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * null 3 null 5 null
 * </pre>
 * The output lists, for every node of the tree in level order, the value of its next
 * pointer ({@code null} when there is none).
 *
 * <p>Approach: a breadth-first walk knows the size of every level. While a level is
 * being processed we link each node to the node that follows it in that level, and the
 * last node of the level to nothing.
 *
 * <p>Complexity: Time O(n), Space O(w).
 */
public class PopulateNextRightPointers {

    /**
     * Links every node to the next node on its level.
     *
     * @param root root of the tree, may be {@code null}
     * @return a map from every node of the tree to its next node ({@code null} at the
     *         end of a level). {@link TreeNode} does not override {@code equals}, so
     *         the map behaves like an identity map.
     */
    public static Map<TreeNode, TreeNode> connect(TreeNode root) {
        Map<TreeNode, TreeNode> next = new HashMap<>();
        if (root == null) {
            return next;
        }
        Deque<TreeNode> queue = new ArrayDeque<>();
        queue.add(root);

        while (!queue.isEmpty()) {
            int levelSize = queue.size();
            TreeNode previous = null;
            for (int i = 0; i < levelSize; i++) {
                TreeNode node = queue.poll();
                if (previous != null) {
                    next.put(previous, node); // link the previous node of this level
                }
                previous = node;
                if (node.left != null) {
                    queue.add(node.left);
                }
                if (node.right != null) {
                    queue.add(node.right);
                }
            }
            if (previous != null) {
                next.put(previous, null); // the last node of a level points nowhere
            }
        }
        return next;
    }

    /**
     * Returns, for every node of the tree in level order, the value of its next pointer
     * ({@code null} when it has none).
     */
    public static List<Integer> nextValues(TreeNode root) {
        Map<TreeNode, TreeNode> next = connect(root);
        List<Integer> values = new ArrayList<>();
        if (root == null) {
            return values;
        }
        Deque<TreeNode> queue = new ArrayDeque<>();
        queue.add(root);
        while (!queue.isEmpty()) {
            TreeNode node = queue.poll();
            TreeNode neighbour = next.get(node);
            values.add(neighbour == null ? null : neighbour.val);
            if (node.left != null) {
                queue.add(node.left);
            }
            if (node.right != null) {
                queue.add(node.right);
            }
        }
        return values;
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

        List<Integer> values = nextValues(root);
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < values.size(); i++) {
            if (i > 0) {
                sb.append(' ');
            }
            Integer value = values.get(i);
            sb.append(value == null ? "null" : value.toString());
        }
        System.out.println(sb);
    }
}
