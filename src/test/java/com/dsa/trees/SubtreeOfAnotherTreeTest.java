package com.dsa.trees;

import com.dsa.utils.TreeNode;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

class SubtreeOfAnotherTreeTest {

    @Test
    void findsTheSubtreeOfTheSample() {
        assertTrue(SubtreeOfAnotherTree.isSubtree(TreeNode.of(3, 4, 5, 1, 2), TreeNode.of(4, 1, 2)));
    }

    @Test
    void rejectsASubtreeWithADifferentShape() {
        assertFalse(SubtreeOfAnotherTree.isSubtree(TreeNode.of(3, 4, 5, 1, 2), TreeNode.of(4, 1)));
    }

    @Test
    void rejectsASubtreeWithDifferentValues() {
        assertFalse(SubtreeOfAnotherTree.isSubtree(TreeNode.of(3, 4, 5, 1, 2), TreeNode.of(4, 1, 3)));
    }

    @Test
    void handlesAnEmptyBigTree() {
        assertFalse(SubtreeOfAnotherTree.isSubtree(null, TreeNode.of(1)));
    }

    @Test
    void acceptsAnEmptyCandidate() {
        assertTrue(SubtreeOfAnotherTree.isSubtree(TreeNode.of(1), null));
    }

    @Test
    void acceptsTheWholeTree() {
        assertTrue(SubtreeOfAnotherTree.isSubtree(TreeNode.of(3, 4, 5, 1, 2), TreeNode.of(3, 4, 5, 1, 2)));
    }
}
