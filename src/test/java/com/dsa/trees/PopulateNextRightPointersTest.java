package com.dsa.trees;

import com.dsa.utils.TreeNode;
import org.junit.jupiter.api.Test;

import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertSame;
import static org.junit.jupiter.api.Assertions.assertTrue;

class PopulateNextRightPointersTest {

    @Test
    void linksTheNodesOfEveryLevel() {
        TreeNode root = TreeNode.of(1, 2, 3, null, 4, 5);
        Map<TreeNode, TreeNode> next = PopulateNextRightPointers.connect(root);
        assertSame(root.right, next.get(root.left));
        assertNull(next.get(root));
        assertSame(root.right.left, next.get(root.left.right));
    }

    @Test
    void reportsTheNextValuesInLevelOrder() {
        List<Integer> values = PopulateNextRightPointers.nextValues(TreeNode.of(1, 2, 3, null, 4, 5));
        assertEquals(5, values.size());
        assertNull(values.get(0));
        assertEquals(3, values.get(1));
        assertNull(values.get(2));
        assertEquals(5, values.get(3));
        assertNull(values.get(4));
    }

    @Test
    void handlesAnEmptyTree() {
        assertTrue(PopulateNextRightPointers.nextValues(null).isEmpty());
        assertTrue(PopulateNextRightPointers.connect(null).isEmpty());
    }

    @Test
    void handlesASingleNode() {
        List<Integer> values = PopulateNextRightPointers.nextValues(new TreeNode(1));
        assertEquals(1, values.size());
        assertNull(values.get(0));
    }

    @Test
    void linksACompleteTree() {
        TreeNode root = TreeNode.of(1, 2, 3, 4, 5, 6, 7);
        Map<TreeNode, TreeNode> next = PopulateNextRightPointers.connect(root);
        assertSame(root.left.right, next.get(root.left.left));
        assertSame(root.right.left, next.get(root.left.right));
        assertNull(next.get(root.right));
    }
}
