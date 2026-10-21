package com.dsa.graphs;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertArrayEquals;

class DistanceToNearestZeroTest {

    private static int[][] grid(int... values) {
        int rows = values.length / 4;
        int[][] g = new int[rows][4];
        for (int i = 0; i < values.length; i++) {
            g[i / 4][i % 4] = values[i];
        }
        return g;
    }

    @Test
    void computesTheDistanceToTheNearestZero() {
        int[][] result = DistanceToNearestZero.updateMatrix(
                grid(0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1));
        assertArrayEquals(new int[]{0, 0, 0, 1}, result[0]);
        assertArrayEquals(new int[]{1, 0, 1, 2}, result[1]);
        assertArrayEquals(new int[]{2, 1, 2, 3}, result[2]);
    }

    @Test
    void anAllZeroGridStaysAllZero() {
        int[][] result = DistanceToNearestZero.updateMatrix(grid(0, 0, 0, 0));
        assertArrayEquals(new int[]{0, 0, 0, 0}, result[0]);
    }

    @Test
    void aGridWithoutZerosLeavesEveryDistanceUnset() {
        int[][] result = DistanceToNearestZero.updateMatrix(grid(1, 1, 1, 1));
        assertArrayEquals(new int[]{-1, -1, -1, -1}, result[0]);
    }

    @Test
    void aSingleZeroGivesTheManhattanDistanceToIt() {
        int[][] result = DistanceToNearestZero.updateMatrix(grid(0, 1, 1, 1));
        assertArrayEquals(new int[]{0, 1, 2, 3}, result[0]);
    }

    @Test
    void distancesGrowWithTheManhattanDistance() {
        int[][] result = DistanceToNearestZero.updateMatrix(grid(0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1));
        assertArrayEquals(new int[]{0, 1, 2, 3}, result[0]);
        assertArrayEquals(new int[]{1, 2, 3, 4}, result[1]);
        assertArrayEquals(new int[]{2, 3, 4, 5}, result[2]);
    }

    @Test
    void theNearestOfSeveralZerosWins() {
        int[][] result = DistanceToNearestZero.updateMatrix(grid(1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1));
        assertArrayEquals(new int[]{3, 2, 1, 0}, result[0]);
    }
}
