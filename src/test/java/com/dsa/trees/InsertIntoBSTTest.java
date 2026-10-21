package com.dsa.trees;

import com.dsa.utils.TreeNode;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

class InsertIntoBSTTest {

    @Test
    void insertsIntoTheSampleTree() {
        TreeNode root = InsertIntoBST.insertIntoBST(TreeNode.of(4, 2, 7, 1, 3), 5);
        assertEquals("4 2 7 1 3 5", InsertIntoBST.levelOrderValues(root));
    }

    @Test
    void insertsIntoAnEmptyTree() {
        TreeNode root = InsertIntoBST.insertIntoBST(null, 7);
        assertEquals("7", InsertIntoBST.levelOrderValues(root));
    }

    @Test
    void insertsIntoTheLeftmostPosition() {
        TreeNode root = InsertIntoBST.insertIntoBST(TreeNode.of(4, 2, 7, 1, 3), 0);
        assertEquals("4 2 7 1 3 0", InsertIntoBST.levelOrderValues(root));
    }

    @Test
    void leavesTheTreeUnchangedForADuplicate() {
        TreeNode root = InsertIntoBST.insertIntoBST(TreeNode.of(4, 2, 7, 1, 3), 4);
        assertEquals("4 2 7 1 3", InsertIntoBST.levelOrderValues(root));
    }

    @Test
    void keepsTheTreeAValidBst() {
        TreeNode root = InsertIntoBST.insertIntoBST(TreeNode.of(4, 2, 7, 1, 3), 5);
        assertTrue(ValidateBinarySearchTree.isValidBST(root));
    }
}
