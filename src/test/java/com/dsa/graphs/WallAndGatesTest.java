package com.dsa.graphs;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertArrayEquals;
import static org.junit.jupiter.api.Assertions.assertEquals;

class WallAndGatesTest {

    private static final int OPEN = 100000;

    @Test
    void distancesRippleOutFromTheOnlyGate() {
        int[][] grid = {{OPEN, -1, OPEN}, {OPEN, -1, OPEN}, {OPEN, OPEN, 0}};
        WallAndGates.wallsAndGates(grid);
        assertArrayEquals(new int[]{4, -1, 2}, grid[0]);
        assertArrayEquals(new int[]{3, -1, 1}, grid[1]);
        assertArrayEquals(new int[]{2, 1, 0}, grid[2]);
    }

    @Test
    void aGridOfOnlyGatesKeepsItsZeros() {
        int[][] grid = {{0, 0}, {0, 0}};
        WallAndGates.wallsAndGates(grid);
        assertArrayEquals(new int[]{0, 0}, grid[0]);
        assertArrayEquals(new int[]{0, 0}, grid[1]);
    }

    @Test
    void anEmptyGridIsUntouched() {
        int[][] grid = new int[0][0];
        WallAndGates.wallsAndGates(grid);
        assertEquals(0, grid.length);
    }

    @Test
    void twoGatesSplitTheDistanceInHalf() {
        int[][] grid = {{0, OPEN, 0}};
        WallAndGates.wallsAndGates(grid);
        assertArrayEquals(new int[]{0, 1, 0}, grid[0]);
    }

    @Test
    void wallsBlockTheWay() {
        int[][] grid = {{OPEN, -1, OPEN}, {0, -1, 0}};
        WallAndGates.wallsAndGates(grid);
        assertEquals(1, grid[0][0]);
        assertEquals(-1, grid[0][1]);
        assertEquals(1, grid[0][2]);
    }

    @Test
    void aSingleCellGateStaysZero() {
        int[][] grid = {{0}};
        WallAndGates.wallsAndGates(grid);
        assertArrayEquals(new int[]{0}, grid[0]);
    }
}
