package com.dsa.trees;

import com.dsa.utils.TreeNode;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

class BinaryTreePathsTest {

    @Test
    void collectsTheSamplePaths() {
        assertEquals(List.of("1->2->5", "1->3"),
                BinaryTreePaths.binaryTreePaths(TreeNode.of(1, 2, 3, null, 5)));
    }

    @Test
    void handlesAnEmptyTree() {
        assertTrue(BinaryTreePaths.binaryTreePaths(null).isEmpty());
    }

    @Test
    void handlesASingleNode() {
        assertEquals(List.of("1"), BinaryTreePaths.binaryTreePaths(new TreeNode(1)));
    }

    @Test
    void handlesADegeneratedTree() {
        assertEquals(List.of("1->2->3"), BinaryTreePaths.binaryTreePaths(TreeNode.of(1, 2, null, 3)));
    }

    @Test
    void visitsTheLeftSubtreeFirst() {
        assertEquals(List.of("1->2", "1->3"), BinaryTreePaths.binaryTreePaths(TreeNode.of(1, 2, 3)));
    }

    @Test
    void handlesNegativeValues() {
        assertEquals(List.of("1->-2"), BinaryTreePaths.binaryTreePaths(TreeNode.of(1, -2)));
    }
}
