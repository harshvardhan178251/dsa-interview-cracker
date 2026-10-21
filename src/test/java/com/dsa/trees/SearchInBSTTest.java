package com.dsa.trees;

import com.dsa.utils.TreeNode;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

class SearchInBSTTest {

    @Test
    void findsTheSampleTarget() {
        assertTrue(SearchInBST.searchBST(TreeNode.of(4, 2, 7, 1, 3), 2));
    }

    @Test
    void doesNotFindAMissingValue() {
        assertFalse(SearchInBST.searchBST(TreeNode.of(4, 2, 7, 1, 3), 5));
    }

    @Test
    void handlesAnEmptyTree() {
        assertFalse(SearchInBST.searchBST(null, 1));
    }

    @Test
    void findsTheRoot() {
        assertTrue(SearchInBST.searchBST(TreeNode.of(4, 2, 7, 1, 3), 4));
    }

    @Test
    void findsALeaf() {
        assertTrue(SearchInBST.searchBST(TreeNode.of(4, 2, 7, 1, 3), 1));
        assertTrue(SearchInBST.searchBST(TreeNode.of(4, 2, 7, 1, 3), 3));
    }

    @Test
    void findsNegativeValues() {
        assertTrue(SearchInBST.searchBST(TreeNode.of(-4, -7, -1), -7));
        assertTrue(SearchInBST.searchBST(TreeNode.of(-4, -7, -1), -1));
        assertFalse(SearchInBST.searchBST(TreeNode.of(-4, -7, -1), 0));
    }
}
