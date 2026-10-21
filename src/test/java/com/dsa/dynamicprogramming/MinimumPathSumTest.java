package com.dsa.dynamicprogramming;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class MinimumPathSumTest {

    @Test
    void classicExample() {
        assertEquals(7, MinimumPathSum.minPathSum(new int[][]{{1, 3, 1}, {1, 5, 1}, {4, 2, 1}}));
    }

    @Test
    void singleCell() {
        assertEquals(5, MinimumPathSum.minPathSum(new int[][]{{5}}));
    }

    @Test
    void singleRow() {
        assertEquals(6, MinimumPathSum.minPathSum(new int[][]{{1, 2, 3}}));
    }

    @Test
    void singleColumn() {
        assertEquals(12, MinimumPathSum.minPathSum(new int[][]{{1}, {2}, {3}, {6}}));
    }

    @Test
    void allZeroes() {
        assertEquals(0, MinimumPathSum.minPathSum(new int[][]{{0, 0}, {0, 0}}));
    }
}
