package com.dsa.trees;

import com.dsa.utils.TreeNode;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;

class LowestCommonAncestorTest {

    @Test
    void findsTheAncestorOfTheSampleTree() {
        TreeNode root = TreeNode.of(3, 5, 1, 6, 2, 0, 8, null, null, 7, 4);
        assertEquals(3, LowestCommonAncestor.lowestCommonAncestor(root, 5, 1));
    }

    @Test
    void findsTheAncestorInsideASubtree() {
        TreeNode root = TreeNode.of(3, 5, 1, 6, 2, 0, 8, null, null, 7, 4);
        assertEquals(2, LowestCommonAncestor.lowestCommonAncestor(root, 7, 4));
    }

    @Test
    void returnsTheAncestorItselfWhenOneNodeIsAnAncestorOfTheOther() {
        TreeNode root = TreeNode.of(3, 5, 1, 6, 2, 0, 8, null, null, 7, 4);
        assertEquals(5, LowestCommonAncestor.lowestCommonAncestor(root, 5, 2));
    }

    @Test
    void handlesAnEmptyTree() {
        assertNull(LowestCommonAncestor.lowestCommonAncestor(null, 1, 2));
    }

    @Test
    void returnsNullWhenOneNodeIsMissing() {
        TreeNode root = TreeNode.of(3, 5, 1);
        assertNull(LowestCommonAncestor.lowestCommonAncestor(root, 5, 99));
    }

    @Test
    void worksWithTheNodesInEitherOrder() {
        TreeNode root = TreeNode.of(3, 5, 1, 6, 2, 0, 8, null, null, 7, 4);
        assertEquals(3, LowestCommonAncestor.lowestCommonAncestor(root, 1, 5));
    }
}
