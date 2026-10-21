package com.dsa.trees;

import com.dsa.utils.TreeNode;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class DeleteFromBSTTest {

    @Test
    void deletesANodeWithTwoChildren() {
        TreeNode root = DeleteFromBST.deleteNode(TreeNode.of(5, 3, 6, 2, 4, null, 7), 3);
        assertEquals("5 4 6 2 7", DeleteFromBST.levelOrderValues(root));
    }

    @Test
    void deletesALeaf() {
        TreeNode root = DeleteFromBST.deleteNode(TreeNode.of(5, 3, 6, 2, 4, null, 7), 2);
        assertEquals("5 3 6 4 7", DeleteFromBST.levelOrderValues(root));
    }

    @Test
    void deletesTheRoot() {
        TreeNode root = DeleteFromBST.deleteNode(TreeNode.of(5, 3, 6, 2, 4, null, 7), 5);
        assertEquals("6 3 7 2 4", DeleteFromBST.levelOrderValues(root));
    }

    @Test
    void handlesAnEmptyTree() {
        assertEquals("", DeleteFromBST.levelOrderValues(DeleteFromBST.deleteNode(null, 1)));
    }

    @Test
    void ignoresAValueThatIsNotThere() {
        TreeNode root = DeleteFromBST.deleteNode(TreeNode.of(5, 3, 6, 2, 4, null, 7), 99);
        assertEquals("5 3 6 2 4 7", DeleteFromBST.levelOrderValues(root));
    }

    @Test
    void keepsTheTreeAValidBst() {
        TreeNode root = DeleteFromBST.deleteNode(TreeNode.of(5, 3, 6, 2, 4, null, 7), 3);
        org.junit.jupiter.api.Assertions.assertTrue(ValidateBinarySearchTree.isValidBST(root));
    }
}
