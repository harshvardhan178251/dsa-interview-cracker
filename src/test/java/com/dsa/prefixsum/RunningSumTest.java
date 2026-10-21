package com.dsa.prefixsum;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertArrayEquals;

class RunningSumTest {

    @Test
    void computesTheRunningSums() {
        assertArrayEquals(new int[]{1, 3, 6, 10}, RunningSum.runningSum(new int[]{1, 2, 3, 4}));
    }

    @Test
    void handlesASingleElement() {
        assertArrayEquals(new int[]{7}, RunningSum.runningSum(new int[]{7}));
    }

    @Test
    void handlesAnEmptyArray() {
        assertArrayEquals(new int[]{}, RunningSum.runningSum(new int[]{}));
    }

    @Test
    void handlesNegativeValues() {
        assertArrayEquals(new int[]{-2, -1, 0}, RunningSum.runningSum(new int[]{-2, 1, 1}));
    }

    @Test
    void handlesAllZeros() {
        assertArrayEquals(new int[]{0, 0, 0}, RunningSum.runningSum(new int[]{0, 0, 0}));
    }
}
