package com.dsa.trees;

import com.dsa.utils.FastScanner;
import com.dsa.utils.TreeNode;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

/**
 * Problem: Binary Tree Paths
 * LeetCode: 257 | Difficulty: Easy | Frequency: 4/5
 * Pattern: DFS, Backtracking
 *
 * <p>Problem: Return all root-to-leaf paths of a binary tree. A path is written as the
 * node values joined by {@code ->}, for example {@code 1->2->5}.
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
 * 1 2 3 null 5
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 1->2->5
 * 1->3
 * </pre>
 *
 * <p>Approach: a depth-first walk that keeps the current path in a string builder. On
 * reaching a leaf the builder holds a complete path and is copied into the result. When
 * the walk returns from a subtree the builder is truncated back to the length it had
 * before that subtree was entered.
 *
 * <p>Complexity: Time O(n^2) in the worst case — the paths of a skewed tree are O(n)
 * long each. Space O(h) for the builder plus the output.
 */
public class BinaryTreePaths {

    /**
     * Returns every root-to-leaf path of the tree.
     *
     * @param root root of the tree, may be {@code null}
     * @return the paths in depth-first (left subtree first) order
     */
    public static List<String> binaryTreePaths(TreeNode root) {
        List<String> paths = new ArrayList<>();
        walk(root, new StringBuilder(), paths);
        return paths;
    }

    /** Depth-first walk that appends to (and truncates) {@code path}. */
    private static void walk(TreeNode node, StringBuilder path, List<String> paths) {
        if (node == null) {
            return;
        }
        int mark = path.length();
        if (mark > 0) {
            path.append("->");
        }
        path.append(node.val);

        if (node.left == null && node.right == null) {
            paths.add(path.toString());
        } else {
            walk(node.left, path, paths);
            walk(node.right, path, paths);
        }
        path.setLength(mark); // backtrack
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

        for (String path : binaryTreePaths(root)) {
            System.out.println(path);
        }
    }
}
