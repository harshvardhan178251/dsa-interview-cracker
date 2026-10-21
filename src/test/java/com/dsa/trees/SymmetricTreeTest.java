package com.dsa.trees;

import com.dsa.utils.TreeNode;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

class SymmetricTreeTest {

    @Test
    void acceptsTheSymmetricSampleTree() {
        assertTrue(SymmetricTree.isSymmetric(TreeNode.of(1, 2, 2, 3, 4, 4, 3)));
    }

    @Test
    void rejectsTheAsymmetricSampleTree() {
        assertFalse(SymmetricTree.isSymmetric(TreeNode.of(1, 2, 2, null, 3, null, 4)));
    }

    @Test
    void handlesAnEmptyTree() {
        assertTrue(SymmetricTree.isSymmetric(null));
    }

    @Test
    void handlesASingleNode() {
        assertTrue(SymmetricTree.isSymmetric(new TreeNode(1)));
    }

    @Test
    void rejectsATreeWithOneSideOnly() {
        assertFalse(SymmetricTree.isSymmetric(TreeNode.of(1, 2, null, 3)));
    }

    @Test
    void rejectsATreeWithDifferentValuesOnBothSides() {
        assertFalse(SymmetricTree.isSymmetric(TreeNode.of(1, 2, 3, 4, 5)));
    }
}
