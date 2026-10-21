package com.dsa.trees;

import com.dsa.utils.TreeNode;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

class ValidateBinarySearchTreeTest {

    @Test
    void acceptsAValidTree() {
        assertTrue(ValidateBinarySearchTree.isValidBST(TreeNode.of(2, 1, 3)));
    }

    @Test
    void rejectsTheClassicCounterExample() {
        assertFalse(ValidateBinarySearchTree.isValidBST(TreeNode.of(5, 1, 4, null, null, 3, 6)));
    }

    @Test
    void rejectsAViolationThatOnlyAnAncestorSees() {
        // 6 sits in the right subtree of 10 but is smaller than 10
        assertFalse(ValidateBinarySearchTree.isValidBST(TreeNode.of(10, 5, 15, null, null, 6, 20)));
    }

    @Test
    void handlesAnEmptyTree() {
        assertTrue(ValidateBinarySearchTree.isValidBST(null));
    }

    @Test
    void handlesASingleNode() {
        assertTrue(ValidateBinarySearchTree.isValidBST(new TreeNode(1)));
    }

    @Test
    void rejectsDuplicateValues() {
        assertFalse(ValidateBinarySearchTree.isValidBST(TreeNode.of(2, 2, 2)));
    }

    @Test
    void acceptsNegativeValues() {
        assertTrue(ValidateBinarySearchTree.isValidBST(TreeNode.of(-3, -5, -1)));
    }
}
