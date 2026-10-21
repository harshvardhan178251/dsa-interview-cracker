package com.dsa.graphs;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class ShortestPathInBinaryGridTest {

    private static int[][] grid(int... values) {
        int rows = values.length / 4;
        int[][] g = new int[rows][4];
        for (int i = 0; i < values.length; i++) {
            g[i / 4][i % 4] = values[i];
        }
        return g;
    }

    @Test
    void theSamplePathHasFiveSteps() {
        assertEquals(5, ShortestPathInBinaryGrid.shortestPathBinaryGrid(
                grid(0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0)));
    }

    @Test
    void aBlockedTargetGivesMinusOne() {
        assertEquals(-1, ShortestPathInBinaryGrid.shortestPathBinaryGrid(
                grid(0, 0, 0, 0, 0, 0, 0, 1)));
    }

    @Test
    void aBlockedStartGivesMinusOne() {
        assertEquals(-1, ShortestPathInBinaryGrid.shortestPathBinaryGrid(
                grid(1, 0, 0, 0, 0, 0, 0, 0)));
    }

    @Test
    void aFullyBlockedGridGivesMinusOne() {
        assertEquals(-1, ShortestPathInBinaryGrid.shortestPathBinaryGrid(
                grid(1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1)));
    }

    @Test
    void aStraightOpenRowNeedsThreeSteps() {
        assertEquals(3, ShortestPathInBinaryGrid.shortestPathBinaryGrid(
                grid(0, 0, 0, 0)));
    }

    @Test
    void aBlockedColumnForcesTheLongWayRound() {
        // 0 1 0 0
        // 0 1 0 0
        // 0 0 0 0
        assertEquals(5, ShortestPathInBinaryGrid.shortestPathBinaryGrid(
                grid(0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0)));
    }

    @Test
    void aDiagonalWallIsAvoidedAlongTheBottomRow() {
        // 0 0 1 0
        // 0 1 0 0
        // 0 0 0 0
        assertEquals(5, ShortestPathInBinaryGrid.shortestPathBinaryGrid(
                grid(0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0)));
    }
}
