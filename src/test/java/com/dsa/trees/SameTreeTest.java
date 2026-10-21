package com.dsa.trees;

import com.dsa.utils.TreeNode;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

class SameTreeTest {

    @Test
    void acceptsTwoEqualTrees() {
        assertTrue(SameTree.isSameTree(TreeNode.of(1, 2, 3, 4), TreeNode.of(1, 2, 3, 4)));
    }

    @Test
    void rejectsTreesWithDifferentValues() {
        assertFalse(SameTree.isSameTree(TreeNode.of(1, 2, 3), TreeNode.of(1, 2, 4)));
    }

    @Test
    void rejectsTreesWithDifferentShapes() {
        assertFalse(SameTree.isSameTree(TreeNode.of(1, 2, 3), TreeNode.of(1, 2)));
    }

    @Test
    void acceptsTwoEmptyTrees() {
        assertTrue(SameTree.isSameTree(null, null));
    }

    @Test
    void rejectsAnEmptyTreeAgainstANonEmptyOne() {
        assertFalse(SameTree.isSameTree(null, TreeNode.of(1)));
        assertFalse(SameTree.isSameTree(TreeNode.of(1), null));
    }

    @Test
    void acceptsDuplicateValuesWithTheSameShape() {
        assertTrue(SameTree.isSameTree(TreeNode.of(2, 2, 2), TreeNode.of(2, 2, 2)));
    }
}
