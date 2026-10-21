package com.dsa.trees;

import com.dsa.utils.TreeNode;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

class BinaryTreeInorderTraversalTest {

    @Test
    void traversesTheSampleTree() {
        assertEquals(List.of(1, 3, 2), BinaryTreeInorderTraversal.inorderTraversal(TreeNode.of(1, null, 2, 3)));
    }

    @Test
    void traversesAPerfectTree() {
        // 1 -> (2, 3), 2 -> (4, 5), 3 -> (6, 7)
        assertEquals(List.of(4, 2, 5, 1, 6, 3, 7),
                BinaryTreeInorderTraversal.inorderTraversal(TreeNode.of(1, 2, 3, 4, 5, 6, 7)));
    }

    @Test
    void handlesAnEmptyTree() {
        assertTrue(BinaryTreeInorderTraversal.inorderTraversal(null).isEmpty());
    }

    @Test
    void handlesASingleNode() {
        assertEquals(List.of(42), BinaryTreeInorderTraversal.inorderTraversal(new TreeNode(42)));
    }

    @Test
    void handlesASkewedTree() {
        assertEquals(List.of(1, 2, 3),
                BinaryTreeInorderTraversal.inorderTraversal(TreeNode.of(1, null, 2, null, 3)));
    }

    @Test
    void handlesDuplicateValues() {
        assertEquals(List.of(2, 2, 2),
                BinaryTreeInorderTraversal.inorderTraversal(TreeNode.of(2, 2, 2)));
    }
}
