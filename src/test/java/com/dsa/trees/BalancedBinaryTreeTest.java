package com.dsa.trees;

import com.dsa.utils.TreeNode;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

class BalancedBinaryTreeTest {

    @Test
    void acceptsTheSampleTree() {
        assertTrue(BalancedBinaryTree.isBalanced(TreeNode.of(3, 9, 20, null, null, 15, 7)));
    }

    @Test
    void rejectsADegeneratedTree() {
        assertFalse(BalancedBinaryTree.isBalanced(TreeNode.of(1, null, 2, null, 3, null, 4, null, 5)));
    }

    @Test
    void handlesAnEmptyTree() {
        assertTrue(BalancedBinaryTree.isBalanced(null));
    }

    @Test
    void handlesASingleNode() {
        assertTrue(BalancedBinaryTree.isBalanced(new TreeNode(1)));
    }

    @Test
    void acceptsATreeThatIsBalancedOnlyByOneLevel() {
        // left height 2, right height 1 -> the difference is exactly 1
        assertTrue(BalancedBinaryTree.isBalanced(TreeNode.of(1, 2, 3, 4)));
    }

    @Test
    void rejectsATreeThatIsTooLopsided() {
        // left height 3, right height 1 -> the difference is 2
        assertFalse(BalancedBinaryTree.isBalanced(TreeNode.of(1, 2, null, 3, null, null, null)));
    }
}
