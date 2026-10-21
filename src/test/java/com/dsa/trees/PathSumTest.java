package com.dsa.trees;

import com.dsa.utils.TreeNode;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

class PathSumTest {

    @Test
    void findsTheSamplePath() {
        assertTrue(PathSum.hasPathSum(TreeNode.of(1, 2, 3, null, 4), 7));
    }

    @Test
    void doesNotCountAPathThatStopsInTheMiddle() {
        // 1 -> 2 -> 3: the path 1 -> 2 sums to 3 but does not end in a leaf
        assertFalse(PathSum.hasPathSum(TreeNode.of(1, 2, null, 3), 3));
    }

    @Test
    void handlesAnEmptyTree() {
        assertFalse(PathSum.hasPathSum(null, 0));
    }

    @Test
    void handlesASingleNode() {
        assertTrue(PathSum.hasPathSum(new TreeNode(5), 5));
        assertFalse(PathSum.hasPathSum(new TreeNode(5), 0));
    }

    @Test
    void handlesNegativeValues() {
        assertTrue(PathSum.hasPathSum(TreeNode.of(5, 4, 8, 11, null, 13, 4), 20));
    }

    @Test
    void rejectsATargetThatIsNotReachable() {
        assertFalse(PathSum.hasPathSum(TreeNode.of(1, 2, 3), 100));
    }
}
