package com.dsa.trees;

import com.dsa.utils.TreeNode;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class BinaryTreeMinimumDepthTest {

    @Test
    void measuresTheSampleTree() {
        assertEquals(2, BinaryTreeMinimumDepth.minDepth(TreeNode.of(3, 9, 20, null, null, 15, 7)));
    }

    @Test
    void handlesAnEmptyTree() {
        assertEquals(0, BinaryTreeMinimumDepth.minDepth(null));
    }

    @Test
    void handlesASingleNode() {
        assertEquals(1, BinaryTreeMinimumDepth.minDepth(new TreeNode(1)));
    }

    @Test
    void doesNotCountAMissingChildAsALeaf() {
        // 1 -> 2 -> 3 has only one leaf, so the minimum depth is 3
        assertEquals(3, BinaryTreeMinimumDepth.minDepth(TreeNode.of(1, 2, null, 3)));
    }

    @Test
    void handlesADegeneratedTree() {
        assertEquals(3, BinaryTreeMinimumDepth.minDepth(TreeNode.of(1, null, 2, null, 3)));
    }
}
