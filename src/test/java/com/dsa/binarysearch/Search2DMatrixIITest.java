package com.dsa.binarysearch;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertArrayEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

class Search2DMatrixIITest {

    private static final int[][] MATRIX = {
            {5, 7, 7, 8},
            {8, 10, 11, 13},
            {9, 11, 13, 15}
    };

    @Test
    void findsATarget() {
        int[] answer = Search2DMatrixII.searchMatrix(MATRIX, 13);
        assertTrue(answer[0] >= 0);
        assertTrue(MATRIX[answer[0]][answer[1]] == 13, "the reported cell must hold the target");
    }

    @Test
    void findsTheTopRightCorner() {
        assertArrayEquals(new int[]{0, 3}, Search2DMatrixII.searchMatrix(MATRIX, 8));
    }

    @Test
    void findsTheBottomLeftCorner() {
        assertArrayEquals(new int[]{2, 0}, Search2DMatrixII.searchMatrix(MATRIX, 9));
    }

    @Test
    void returnsSentinelWhenTheTargetIsAbsent() {
        assertArrayEquals(new int[]{-1, -1}, Search2DMatrixII.searchMatrix(MATRIX, 12));
        assertArrayEquals(new int[]{-1, -1}, Search2DMatrixII.searchMatrix(MATRIX, 4));
        assertArrayEquals(new int[]{-1, -1}, Search2DMatrixII.searchMatrix(MATRIX, 16));
    }

    @Test
    void handlesASingleCellMatrix() {
        assertArrayEquals(new int[]{0, 0}, Search2DMatrixII.searchMatrix(new int[][]{{9}}, 9));
        assertArrayEquals(new int[]{-1, -1}, Search2DMatrixII.searchMatrix(new int[][]{{9}}, 8));
    }

    @Test
    void handlesASingleColumnMatrix() {
        int[][] column = {{1}, {3}, {5}};
        assertArrayEquals(new int[]{2, 0}, Search2DMatrixII.searchMatrix(column, 5));
        assertArrayEquals(new int[]{-1, -1}, Search2DMatrixII.searchMatrix(column, 4));
    }
}
