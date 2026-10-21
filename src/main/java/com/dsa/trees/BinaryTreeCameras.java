package com.dsa.trees;

import com.dsa.utils.FastScanner;
import com.dsa.utils.TreeNode;

import java.io.IOException;

/**
 * Problem: Binary Tree Cameras
 * LeetCode: 757 | Difficulty: Medium | Frequency: 3/5
 * Pattern: Greedy post-order, Tree DP
 *
 * <p>Problem: Place the minimum number of cameras on a binary tree so that every node is
 * watched — a camera watches its own node and its direct neighbours.
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
 * 0 0 null 0 0
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 1
 * </pre>
 *
 * <p>Approach: a greedy bottom-up walk. Each node reports one of three states: 0 — it is
 * not covered and needs its parent; 1 — it holds a camera; 2 — it is already covered.
 * If a child is in state 0 the node places a camera, because a camera is the last
 * chance to cover that child. Otherwise the node is covered by a camera below it.
 * The root needs one final check.
 *
 * <p>Complexity: Time O(n), Space O(h).
 */
public class BinaryTreeCameras {

    /** The node is not covered and expects its parent to place a camera. */
    private static final int NEEDS_COVER = 0;
    /** The node holds a camera. */
    private static final int HAS_CAMERA = 1;
    /** The node is watched by a camera in its subtree. */
    private static final int COVERED = 2;

    /** Number of cameras placed so far. */
    private static int cameras;

    /**
     * Returns the minimum number of cameras needed to watch the whole tree.
     *
     * @param root root of the tree, may be {@code null}
     * @return the minimum number of cameras
     */
    public static int minCameraCover(TreeNode root) {
        cameras = 0;
        if (root == null) {
            return 0;
        }
        int state = walk(root);
        if (state == NEEDS_COVER) {
            cameras++; // the root has no parent, so it needs its own camera
        }
        return cameras;
    }

    /**
     * Walks the subtree bottom-up, places cameras greedily and returns the state of
     * the subtree root.
     */
    private static int walk(TreeNode node) {
        if (node == null) {
            return COVERED; // nothing to watch
        }
        int left = walk(node.left);
        int right = walk(node.right);

        if (left == NEEDS_COVER || right == NEEDS_COVER) {
            cameras++; // a child is unwatched: this is the last chance to cover it
            return HAS_CAMERA;
        }
        if (left == HAS_CAMERA || right == HAS_CAMERA) {
            return COVERED; // a child watches this node
        }
        return NEEDS_COVER;
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

        System.out.println(minCameraCover(root));
    }
}
