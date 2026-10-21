package com.dsa.trees;

import com.dsa.utils.FastScanner;
import com.dsa.utils.TreeNode;

import java.io.IOException;
import java.util.ArrayDeque;
import java.util.Deque;
import java.util.HashMap;
import java.util.Map;

/**
 * Problem: Construct Binary Tree from Preorder and Inorder Traversal
 * LeetCode: 105 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Divide and conquer, Index maps
 *
 * <p>Problem: Given the preorder and the inorder traversal of a tree with distinct
 * values, rebuild the tree.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * pre[0] pre[1] ... pre[n-1]
 * in[0] in[1] ... in[n-1]
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 5
 * 3 9 20 15 7
 * 9 3 15 20 7
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 3 9 20 15 7
 * </pre>
 * The output lists the values of the rebuilt tree in level order (breadth first, left
 * to right); missing children are omitted.
 *
 * <p>Approach: the first value of the preorder traversal is the root. Its position in
 * the inorder traversal splits the tree into the left subtree (everything before it)
 * and the right subtree (everything after it). A map from value to inorder index makes
 * that split O(1), and a pointer into the preorder array tells us where each subtree
 * starts.
 *
 * <p>Complexity: Time O(n), Space O(n) for the index map.
 */
public class BuildTreeFromPreorderAndInorder {

    /**
     * Rebuilds the tree from its preorder and inorder traversals.
     *
     * @param preorder the preorder traversal
     * @param inorder  the inorder traversal
     * @return the root of the rebuilt tree, or {@code null} for empty input
     */
    public static TreeNode buildTree(int[] preorder, int[] inorder) {
        if (preorder == null || preorder.length == 0) {
            return null;
        }
        Map<Integer, Integer> inorderIndex = new HashMap<>();
        for (int i = 0; i < inorder.length; i++) {
            inorderIndex.put(inorder[i], i);
        }
        return build(preorder, 0, 0, inorder.length - 1, inorderIndex);
    }

    /** Builds the subtree whose preorder slice starts at {@code preStart}. */
    private static TreeNode build(int[] preorder, int preStart, int inStart, int inEnd,
                                  Map<Integer, Integer> inorderIndex) {
        if (inStart > inEnd) {
            return null; // empty subtree
        }
        int rootValue = preorder[preStart];
        TreeNode root = new TreeNode(rootValue);
        int mid = inorderIndex.get(rootValue);
        int leftSize = mid - inStart;
        root.left = build(preorder, preStart + 1, inStart, mid - 1, inorderIndex);
        root.right = build(preorder, preStart + 1 + leftSize, mid + 1, inEnd, inorderIndex);
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

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] preorder = fs.nextIntArray(n);
        int[] inorder = fs.nextIntArray(n);

        TreeNode root = buildTree(preorder, inorder);
        System.out.println(levelOrderValues(root));
    }
}
