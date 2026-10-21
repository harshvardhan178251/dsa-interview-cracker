package com.dsa.backtracking;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class FloodFillTest {

    @Test
    void classicExample() {
        int[][] result = FloodFill.floodFill(
                new int[][]{{1, 1, 1}, {1, 1, 0}, {1, 0, 1}}, 1, 1, 2);
        assertArrayEquals(new int[]{2, 2, 2}, result[0]);
        assertArrayEquals(new int[]{2, 2, 0}, result[1]);
        assertArrayEquals(new int[]{2, 0, 1}, result[2]);
    }

    @Test
    void singlePixel() {
        int[][] result = FloodFill.floodFill(new int[][]{{0, 0}, {0, 0}}, 0, 0, 2);
        assertArrayEquals(new int[]{2, 2}, result[0]);
        assertArrayEquals(new int[]{2, 2}, result[1]);
    }

    @Test
    void differentColoursAreNotFlooded() {
        int[][] result = FloodFill.floodFill(new int[][]{{1, 0}, {0, 1}}, 0, 0, 2);
        assertArrayEquals(new int[]{2, 0}, result[0]);
        assertArrayEquals(new int[]{0, 1}, result[1]);
    }

    @Test
    void sameColourChangesNothing() {
        int[][] result = FloodFill.floodFill(new int[][]{{1, 1}, {1, 1}}, 0, 0, 1);
        assertArrayEquals(new int[]{1, 1}, result[0]);
    }

    @Test
    void floodStopsAtOtherColours() {
        int[][] result = FloodFill.floodFill(new int[][]{{1, 0, 1}}, 0, 0, 2);
        assertArrayEquals(new int[]{2, 0, 1}, result[0]);
    }
}
