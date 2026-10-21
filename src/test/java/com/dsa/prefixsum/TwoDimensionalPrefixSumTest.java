package com.dsa.prefixsum;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class TwoDimensionalPrefixSumTest {

    private static int[][] sampleMatrix() {
        return new int[][]{{1, 2, 3}, {4, 5, 6}};
    }

    @Test
    void buildsThePaddedTable() {
        int[][] prefix = TwoDimensionalPrefixSum.buildPrefix(sampleMatrix());
        assertEquals(0, prefix[0][0]);
        assertEquals(3, prefix[1][2]);
        assertEquals(5, prefix[2][1]);
        assertEquals(21, prefix[2][3]);
    }

    @Test
    void answersTheSampleQueries() {
        int[][] prefix = TwoDimensionalPrefixSum.buildPrefix(sampleMatrix());
        assertEquals(3, TwoDimensionalPrefixSum.rectangleSum(prefix, 0, 0, 0, 1));
        assertEquals(11, TwoDimensionalPrefixSum.rectangleSum(prefix, 1, 1, 1, 2));
    }

    @Test
    void answersASingleCellRectangle() {
        int[][] prefix = TwoDimensionalPrefixSum.buildPrefix(sampleMatrix());
        assertEquals(5, TwoDimensionalPrefixSum.rectangleSum(prefix, 1, 1, 1, 1));
    }

    @Test
    void answersTheWholeMatrix() {
        int[][] prefix = TwoDimensionalPrefixSum.buildPrefix(sampleMatrix());
        assertEquals(21, TwoDimensionalPrefixSum.rectangleSum(prefix, 0, 0, 1, 2));
    }

    @Test
    void answersAWholeColumn() {
        int[][] prefix = TwoDimensionalPrefixSum.buildPrefix(sampleMatrix());
        assertEquals(9, TwoDimensionalPrefixSum.rectangleSum(prefix, 0, 2, 1, 2));
    }
}
