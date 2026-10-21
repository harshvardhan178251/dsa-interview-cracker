package com.dsa.trees;

import com.dsa.utils.TreeNode;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

class KthSmallestElementInBSTTest {

    @Test
    void findsTheSampleElement() {
        assertEquals(2, KthSmallestElementInBST.kthSmallest(TreeNode.of(3, 1, 4, null, 2), 2));
    }

    @Test
    void findsTheSmallestElement() {
        assertEquals(1, KthSmallestElementInBST.kthSmallest(TreeNode.of(3, 1, 4, null, 2), 1));
    }

    @Test
    void findsTheLargestElement() {
        assertEquals(4, KthSmallestElementInBST.kthSmallest(TreeNode.of(3, 1, 4, null, 2), 4));
    }

    @Test
    void handlesASingleNode() {
        assertEquals(7, KthSmallestElementInBST.kthSmallest(new TreeNode(7), 1));
    }

    @Test
    void throwsWhenKIsTooLarge() {
        assertThrows(IllegalArgumentException.class,
                () -> KthSmallestElementInBST.kthSmallest(TreeNode.of(3, 1, 4, null, 2), 9));
    }

    @Test
    void handlesNegativeValues() {
        assertEquals(-7, KthSmallestElementInBST.kthSmallest(TreeNode.of(-4, -7, -1), 1));
    }
}
