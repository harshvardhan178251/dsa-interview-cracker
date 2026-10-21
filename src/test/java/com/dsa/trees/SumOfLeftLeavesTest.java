package com.dsa.trees;

import com.dsa.utils.TreeNode;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class SumOfLeftLeavesTest {

    @Test
    void sumsTheLeftLeavesOfTheSampleTree() {
        assertEquals(4, SumOfLeftLeaves.sumOfLeftLeaves(TreeNode.of(1, 2, 3, 4, 5)));
    }

    @Test
    void handlesAnEmptyTree() {
        assertEquals(0, SumOfLeftLeaves.sumOfLeftLeaves(null));
    }

    @Test
    void handlesASingleNode() {
        assertEquals(0, SumOfLeftLeaves.sumOfLeftLeaves(new TreeNode(5)));
    }

    @Test
    void ignoresRightLeaves() {
        // 1 -> (null, 2) -> (3, null): the leaf 3 is a left child
        assertEquals(3, SumOfLeftLeaves.sumOfLeftLeaves(TreeNode.of(1, null, 2, 3)));
    }

    @Test
    void sumsSeveralLeftLeaves() {
        //        1
        //       / \
        //      2   3
        //     / \ / \
        //    4   5 6  7
        // the leaves 4 and 6 are left children, 5 and 7 are not
        assertEquals(10, SumOfLeftLeaves.sumOfLeftLeaves(TreeNode.of(1, 2, 3, 4, 5, 6, 7)));
    }

    @Test
    void handlesNegativeValues() {
        assertEquals(-4, SumOfLeftLeaves.sumOfLeftLeaves(TreeNode.of(-1, -4)));
    }
}
