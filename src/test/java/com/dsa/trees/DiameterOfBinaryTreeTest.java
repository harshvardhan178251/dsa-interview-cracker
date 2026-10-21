package com.dsa.trees;

import com.dsa.utils.TreeNode;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class DiameterOfBinaryTreeTest {

    @Test
    void measuresTheSampleTree() {
        assertEquals(3, DiameterOfBinaryTree.diameter(TreeNode.of(1, 2, 3, 4, 5)));
    }

    @Test
    void handlesAnEmptyTree() {
        assertEquals(0, DiameterOfBinaryTree.diameter(null));
    }

    @Test
    void handlesASingleNode() {
        assertEquals(0, DiameterOfBinaryTree.diameter(new TreeNode(1)));
    }

    @Test
    void countsEdgesNotNodes() {
        // 1 -> 2 -> 3: the longest path is 1 -> 2 -> 3, two edges
        assertEquals(2, DiameterOfBinaryTree.diameter(TreeNode.of(1, 2, 3)));
    }

    @Test
    void findsThePathInsideASubtree() {
        // the longest path (5 -> 3 -> 2 -> 4 -> 8) does not pass through the root
        assertEquals(4, DiameterOfBinaryTree.diameter(TreeNode.of(1, 2, null, 3, 4, 5, 6, 7, 8)));
    }

    @Test
    void isRepeatableAcrossCalls() {
        TreeNode root = TreeNode.of(1, 2, 3, 4, 5);
        assertEquals(DiameterOfBinaryTree.diameter(root), DiameterOfBinaryTree.diameter(root));
    }
}
