package com.dsa.arrays;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertArrayEquals;

class SetMatrixZeroesTest {

    @Test
    void clearsTheRowAndColumnOfAZero() {
        int[][] matrix = {{1, 1, 1, 1}, {1, 0, 1, 1}, {1, 1, 1, 1}};
        assertArrayEquals(new int[][]{{1, 0, 1, 1}, {0, 0, 0, 0}, {1, 0, 1, 1}},
                SetMatrixZeroes.setZeroes(matrix));
    }

    @Test
    void clearsEveryRowAndColumnThatHoldsAZero() {
        int[][] matrix = {{0, 1, 2, 0}, {3, 4, 5, 6}, {0, 7, 8, 0}};
        // rows 0 and 2 and columns 0 and 3 are marked
        assertArrayEquals(new int[][]{{0, 0, 0, 0}, {0, 4, 5, 0}, {0, 0, 0, 0}},
                SetMatrixZeroes.setZeroes(matrix));
    }

    @Test
    void leavesAMatrixWithoutZerosUntouched() {
        int[][] matrix = {{1, 2}, {3, 4}};
        assertArrayEquals(new int[][]{{1, 2}, {3, 4}}, SetMatrixZeroes.setZeroes(matrix));
    }

    @Test
    void handlesASingleCell() {
        int[][] matrix = {{0}};
        assertArrayEquals(new int[][]{{0}}, SetMatrixZeroes.setZeroes(matrix));
    }

    @Test
    void handlesASingleRow() {
        int[][] matrix = {{1, 0, 3}};
        assertArrayEquals(new int[][]{{0, 0, 0}}, SetMatrixZeroes.setZeroes(matrix));
    }
}
