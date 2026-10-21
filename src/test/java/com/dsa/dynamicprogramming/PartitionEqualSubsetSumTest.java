package com.dsa.dynamicprogramming;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class PartitionEqualSubsetSumTest {

    @Test
    void classicExample() {
        assertTrue(PartitionEqualSubsetSum.canPartition(new int[]{1, 5, 11, 5}));
    }

    @Test
    void oddTotalIsImpossible() {
        assertFalse(PartitionEqualSubsetSum.canPartition(new int[]{1, 2, 5}));
    }

    @Test
    void singleElementCannotBeSplit() {
        assertFalse(PartitionEqualSubsetSum.canPartition(new int[]{7}));
    }

    @Test
    void twoEqualElements() {
        assertTrue(PartitionEqualSubsetSum.canPartition(new int[]{3, 3}));
    }

    @Test
    void emptyInput() {
        assertFalse(PartitionEqualSubsetSum.canPartition(new int[]{}));
    }

    @Test
    void allZeros() {
        assertTrue(PartitionEqualSubsetSum.canPartition(new int[]{0, 0}));
    }
}
