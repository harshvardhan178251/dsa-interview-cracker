package com.dsa.trees;

import com.dsa.utils.TreeNode;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

class BinaryTreeLevelOrderTraversalTest {

    @Test
    void groupsTheNodesByLevel() {
        List<List<Integer>> levels = BinaryTreeLevelOrderTraversal.levelOrder(TreeNode.of(3, 9, 20, null, null, 15, 7));
        assertEquals(3, levels.size());
        assertEquals(List.of(3), levels.get(0));
        assertEquals(List.of(9, 20), levels.get(1));
        assertEquals(List.of(15, 7), levels.get(2));
    }

    @Test
    void handlesAnEmptyTree() {
        assertTrue(BinaryTreeLevelOrderTraversal.levelOrder(null).isEmpty());
    }

    @Test
    void handlesASingleNode() {
        assertEquals(List.of(List.of(7)), BinaryTreeLevelOrderTraversal.levelOrder(new TreeNode(7)));
    }

    @Test
    void handlesASkewedTree() {
        List<List<Integer>> levels = BinaryTreeLevelOrderTraversal.levelOrder(TreeNode.of(1, null, 2, null, 3));
        assertEquals(3, levels.size());
        assertEquals(List.of(1), levels.get(0));
        assertEquals(List.of(2), levels.get(1));
        assertEquals(List.of(3), levels.get(2));
    }

    @Test
    void keepsTheLeftToRightOrderInsideALevel() {
        List<List<Integer>> levels = BinaryTreeLevelOrderTraversal.levelOrder(TreeNode.of(1, 2, 3, 4, 5));
        assertEquals(List.of(1), levels.get(0));
        assertEquals(List.of(2, 3), levels.get(1));
        assertEquals(List.of(4, 5), levels.get(2));
    }
}
