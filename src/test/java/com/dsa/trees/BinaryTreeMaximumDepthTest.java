package com.dsa.trees;

import com.dsa.utils.TreeNode;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class BinaryTreeMaximumDepthTest {

    @Test
    void measuresTheSampleTree() {
        assertEquals(3, BinaryTreeMaximumDepth.maxDepth(TreeNode.of(3, 9, 20, null, null, 15, 7)));
    }

    @Test
    void handlesAnEmptyTree() {
        assertEquals(0, BinaryTreeMaximumDepth.maxDepth(null));
    }

    @Test
    void handlesASingleNode() {
        assertEquals(1, BinaryTreeMaximumDepth.maxDepth(new TreeNode(1)));
    }

    @Test
    void measuresADegeneratedTree() {
        assertEquals(5, BinaryTreeMaximumDepth.maxDepth(TreeNode.of(1, null, 2, null, 3, null, 4, null, 5)));
    }

    @Test
    void measuresTheLargestAllowedTree() {
        TreeNode root = new TreeNode(0);
        TreeNode current = root;
        for (int i = 1; i < 1000; i++) {
            current.left = new TreeNode(i);
            current = current.left;
        }
        assertEquals(1000, BinaryTreeMaximumDepth.maxDepth(root));
    }
}
