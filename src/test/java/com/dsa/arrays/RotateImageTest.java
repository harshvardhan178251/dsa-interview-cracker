package com.dsa.arrays;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertArrayEquals;

class RotateImageTest {

    @Test
    void rotatesTheClassicMatrixClockwise() {
        int[][] matrix = {{1, 2, 3}, {4, 5, 6}, {7, 8, 9}};
        assertArrayEquals(new int[][]{{7, 4, 1}, {8, 5, 2}, {9, 6, 3}}, RotateImage.rotate(matrix));
    }

    @Test
    void rotatesASingleCell() {
        int[][] matrix = {{5}};
        assertArrayEquals(new int[][]{{5}}, RotateImage.rotate(matrix));
    }

    @Test
    void rotatesATwoByTwoMatrix() {
        int[][] matrix = {{1, 2}, {3, 4}};
        assertArrayEquals(new int[][]{{3, 1}, {4, 2}}, RotateImage.rotate(matrix));
    }

    @Test
    void rotatingFourTimesReturnsTheOriginal() {
        int[][] matrix = {{1, 2, 3}, {4, 5, 6}, {7, 8, 9}};
        int[][] rotated = matrix;
        for (int i = 0; i < 4; i++) {
            rotated = RotateImage.rotate(rotated);
        }
        assertArrayEquals(new int[][]{{1, 2, 3}, {4, 5, 6}, {7, 8, 9}}, rotated);
    }

    @Test
    void rotatesTheMatrixInPlace() {
        int[][] matrix = {{1, 2, 3}, {4, 5, 6}, {7, 8, 9}};
        int[][] result = RotateImage.rotate(matrix);
        assertArrayEquals(new int[][]{{7, 4, 1}, {8, 5, 2}, {9, 6, 3}}, result);
        // the very same array instance was rewritten
        assertArrayEquals(new int[][]{{7, 4, 1}, {8, 5, 2}, {9, 6, 3}}, matrix);
    }
}
