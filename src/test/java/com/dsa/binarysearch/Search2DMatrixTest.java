package com.dsa.binarysearch;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertArrayEquals;

class Search2DMatrixTest {

    private static final int[][] MATRIX = {
            {1, 3, 5, 7},
            {10, 11, 16, 20},
            {23, 30, 34, 60}
    };

    @Test
    void findsATargetInTheFirstRow() {
        assertArrayEquals(new int[]{0, 1}, Search2DMatrix.searchMatrix(MATRIX, 3));
    }

    @Test
    void findsATargetInAMiddleRow() {
        assertArrayEquals(new int[]{1, 3}, Search2DMatrix.searchMatrix(MATRIX, 20));
    }

    @Test
    void findsATargetInTheLastRow() {
        assertArrayEquals(new int[]{2, 3}, Search2DMatrix.searchMatrix(MATRIX, 60));
    }

    @Test
    void returnsSentinelWhenTheTargetIsAbsent() {
        assertArrayEquals(new int[]{-1, -1}, Search2DMatrix.searchMatrix(MATRIX, 13));
        assertArrayEquals(new int[]{-1, -1}, Search2DMatrix.searchMatrix(MATRIX, 0));
        assertArrayEquals(new int[]{-1, -1}, Search2DMatrix.searchMatrix(MATRIX, 61));
    }

    @Test
    void handlesASingleCellMatrix() {
        assertArrayEquals(new int[]{0, 0}, Search2DMatrix.searchMatrix(new int[][]{{9}}, 9));
        assertArrayEquals(new int[]{-1, -1}, Search2DMatrix.searchMatrix(new int[][]{{9}}, 8));
    }

    @Test
    void handlesASingleRowMatrix() {
        int[][] row = {{1, 3, 5, 7}};
        assertArrayEquals(new int[]{0, 2}, Search2DMatrix.searchMatrix(row, 5));
        assertArrayEquals(new int[]{-1, -1}, Search2DMatrix.searchMatrix(row, 4));
    }

    @Test
    void handlesAnEmptyMatrix() {
        assertArrayEquals(new int[]{-1, -1}, Search2DMatrix.searchMatrix(new int[0][0], 1));
    }
}
