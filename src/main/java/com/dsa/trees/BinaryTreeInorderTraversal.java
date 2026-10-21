package com.dsa.trees;

import com.dsa.utils.FastScanner;
import com.dsa.utils.TreeNode;

import java.io.IOException;
import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.List;

/**
 * Problem: Binary Tree Inorder Traversal
 * LeetCode: 94 | Difficulty: Easy | Frequency: 5/5
 * Pattern: DFS, Explicit stack
 *
 * <p>Problem: Given the root of a binary tree, return the values of its nodes in
 * <b>inorder</b>: left subtree, node, right subtree.
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
 * 4
 * 1 null 2 3
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 1 3 2
 * </pre>
 *
 * <p>Approach: an explicit stack replaces the call stack of the recursive version. We walk
 * down the left spine pushing every node we meet, then pop one node (the leftmost one),
 * emit its value and move to its right child. The loop condition
 * {@code current != null || !stack.isEmpty()} keeps the traversal alive until both the
 * current pointer and the stack are exhausted.
 *
 * <p>Complexity: Time O(n) — every node is pushed and popped once. Space O(h) — the stack
 * holds at most one root-to-leaf path.
 */
public class BinaryTreeInorderTraversal {

    /**
     * Returns the inorder traversal of the tree.
     *
     * @param root root of the tree, may be {@code null}
     * @return the node values in left-node-right order
     */
    public static List<Integer> inorderTraversal(TreeNode root) {
        List<Integer> out = new ArrayList<>();
        Deque<TreeNode> stack = new ArrayDeque<>();
        TreeNode current = root;

        while (current != null || !stack.isEmpty()) {
            // Go as far left as possible, remembering the way back.
            while (current != null) {
                stack.push(current);
                current = current.left;
            }
            // The top of the stack is the leftmost pending node.
            current = stack.pop();
            out.add(current.val);
            current = current.right;
        }
        return out;
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

        List<Integer> answer = inorderTraversal(root);
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < answer.size(); i++) {
            if (i > 0) {
                sb.append(' ');
            }
            sb.append(answer.get(i));
        }
        System.out.println(sb);
    }
}
