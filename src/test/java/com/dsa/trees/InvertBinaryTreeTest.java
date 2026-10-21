package com.dsa.trees;

import com.dsa.utils.TreeNode;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;

class InvertBinaryTreeTest {

    @Test
    void invertsTheSampleTree() {
        TreeNode root = InvertBinaryTree.invertTree(TreeNode.of(1, 2, 3, 4, 5));
        assertEquals("1 3 2 5 4", InvertBinaryTree.levelOrderValues(root));
    }

    @Test
    void handlesAnEmptyTree() {
        assertNull(InvertBinaryTree.invertTree(null));
    }

    @Test
    void handlesASingleNode() {
        assertEquals("1", InvertBinaryTree.levelOrderValues(InvertBinaryTree.invertTree(new TreeNode(1))));
    }

    @Test
    void invertingTwiceGivesTheOriginalTree() {
        TreeNode root = TreeNode.of(1, 2, 3, 4, 5);
        InvertBinaryTree.invertTree(InvertBinaryTree.invertTree(root));
        assertEquals("1 2 3 4 5", InvertBinaryTree.levelOrderValues(root));
    }

    @Test
    void swapsTheChildrenOfASingleNode() {
        TreeNode root = TreeNode.of(1, 2, 3);
        TreeNode inverted = InvertBinaryTree.invertTree(root);
        assertEquals(3, inverted.left.val);
        assertEquals(2, inverted.right.val);
    }

    @Test
    void keepsTheValuesUnchanged() {
        TreeNode inverted = InvertBinaryTree.invertTree(TreeNode.of(1, 2, 3, 4, 5));
        assertEquals(5, inverted.right.left.val);
        assertEquals(4, inverted.right.right.val);
    }
}
