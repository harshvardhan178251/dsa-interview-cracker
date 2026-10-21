package com.dsa.trees;

import com.dsa.utils.TreeNode;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

class ZigzagLevelOrderTraversalTest {

    @Test
    void reversesEverySecondLevel() {
        List<List<Integer>> levels = ZigzagLevelOrderTraversal.zigzagLevelOrder(
                TreeNode.of(3, 9, 20, null, null, 15, 7));
        assertEquals(List.of(3), levels.get(0));
        assertEquals(List.of(20, 9), levels.get(1));
        assertEquals(List.of(15, 7), levels.get(2));
    }

    @Test
    void handlesAnEmptyTree() {
        assertTrue(ZigzagLevelOrderTraversal.zigzagLevelOrder(null).isEmpty());
    }

    @Test
    void handlesASingleNode() {
        assertEquals(List.of(List.of(1)), ZigzagLevelOrderTraversal.zigzagLevelOrder(new TreeNode(1)));
    }

    @Test
    void alternatesTheDirection() {
        List<List<Integer>> levels = ZigzagLevelOrderTraversal.zigzagLevelOrder(TreeNode.of(1, 2, 3, 4, 5));
        assertEquals(List.of(1), levels.get(0));
        assertEquals(List.of(3, 2), levels.get(1));
        assertEquals(List.of(4, 5), levels.get(2));
    }

    @Test
    void reversesTheThirdLevelAsWell() {
        List<List<Integer>> levels = ZigzagLevelOrderTraversal.zigzagLevelOrder(
                TreeNode.of(1, 2, 3, 4, 5, 6, 7, 8, 9, null, null));
        assertEquals(4, levels.size());
        assertEquals(List.of(1), levels.get(0));
        assertEquals(List.of(3, 2), levels.get(1));
        assertEquals(List.of(4, 5, 6, 7), levels.get(2));
        assertEquals(List.of(9, 8), levels.get(3));
    }
}
