package com.dsa.trees;

import com.dsa.utils.TreeNode;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;

class LowestCommonAncestorOfBSTTest {

    @Test
    void findsTheAncestorOfTheSampleTree() {
        TreeNode root = TreeNode.of(6, 2, 8, 0, 4, 7, 9, null, null, 3, 5);
        assertEquals(6, LowestCommonAncestorOfBST.lowestCommonAncestor(root, 2, 8));
    }

    @Test
    void findsTheAncestorInsideASubtree() {
        TreeNode root = TreeNode.of(6, 2, 8, 0, 4, 7, 9, null, null, 3, 5);
        assertEquals(4, LowestCommonAncestorOfBST.lowestCommonAncestor(root, 3, 5));
    }

    @Test
    void returnsTheAncestorItselfWhenOneNodeIsAnAncestorOfTheOther() {
        TreeNode root = TreeNode.of(6, 2, 8, 0, 4, 7, 9, null, null, 3, 5);
        assertEquals(2, LowestCommonAncestorOfBST.lowestCommonAncestor(root, 2, 5));
    }

    @Test
    void handlesAnEmptyTree() {
        assertNull(LowestCommonAncestorOfBST.lowestCommonAncestor(null, 1, 2));
    }

    @Test
    void returnsNullWhenOneNodeIsMissing() {
        TreeNode root = TreeNode.of(6, 2, 8);
        assertNull(LowestCommonAncestorOfBST.lowestCommonAncestor(root, 2, 99));
    }

    @Test
    void worksWithTheNodesInEitherOrder() {
        TreeNode root = TreeNode.of(6, 2, 8, 0, 4, 7, 9, null, null, 3, 5);
        assertEquals(6, LowestCommonAncestorOfBST.lowestCommonAncestor(root, 8, 2));
    }
}
