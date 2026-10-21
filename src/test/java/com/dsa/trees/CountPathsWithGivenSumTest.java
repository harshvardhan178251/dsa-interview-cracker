package com.dsa.trees;

import com.dsa.utils.TreeNode;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class CountPathsWithGivenSumTest {

    @Test
    void countsTheSamplePaths() {
        TreeNode root = TreeNode.of(10, 5, -3, 3, 2, null, 11, 3, -2, null, 1);
        assertEquals(3, CountPathsWithGivenSum.pathSum(root, 8));
    }

    @Test
    void countsASinglePath() {
        // 1 -> 2 -> 3: only the path 2 -> 3 sums to 5
        assertEquals(1, CountPathsWithGivenSum.pathSum(TreeNode.of(1, 2, null, 3), 5));
    }

    @Test
    void handlesAnEmptyTree() {
        assertEquals(0, CountPathsWithGivenSum.pathSum(null, 0));
    }

    @Test
    void handlesASingleNode() {
        assertEquals(1, CountPathsWithGivenSum.pathSum(new TreeNode(5), 5));
        assertEquals(0, CountPathsWithGivenSum.pathSum(new TreeNode(5), 6));
    }

    @Test
    void handlesNegativeValues() {
        // the path 5 -> -3 sums to 2
        assertEquals(1, CountPathsWithGivenSum.pathSum(TreeNode.of(5, -3), 2));
    }

    @Test
    void countsEveryPossibleStart() {
        // 1 -> 2 -> 3: the paths that sum to 3 are 1->2 and 3
        assertEquals(2, CountPathsWithGivenSum.pathSum(TreeNode.of(1, 2, 3), 3));
    }
}
