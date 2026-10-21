package com.dsa.graphs;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class NumberOfIslandsTest {

    private static char[][] grid(String... rows) {
        char[][] g = new char[rows.length][rows[0].length()];
        for (int r = 0; r < rows.length; r++) {
            for (int c = 0; c < rows[r].length(); c++) {
                g[r][c] = rows[r].charAt(c);
            }
        }
        return g;
    }

    @Test
    void countsThreeSeparateIslands() {
        assertEquals(3, NumberOfIslands.numIslands(grid("110", "001", "100")));
    }

    @Test
    void aFullGridIsOneIsland() {
        assertEquals(1, NumberOfIslands.numIslands(grid("111", "111", "111")));
    }

    @Test
    void aGridOfWaterHasNoIslands() {
        assertEquals(0, NumberOfIslands.numIslands(grid("000", "000", "000")));
    }

    @Test
    void aSingleCellIsAnIslandOnlyWhenItIsLand() {
        assertEquals(1, NumberOfIslands.numIslands(grid("1")));
        assertEquals(0, NumberOfIslands.numIslands(grid("0")));
    }

    @Test
    void diagonalTouchingDoesNotMergeIslands() {
        assertEquals(2, NumberOfIslands.numIslands(grid("10", "01")));
    }

    @Test
    void anLShapeIsOneIsland() {
        assertEquals(1, NumberOfIslands.numIslands(grid("10", "11")));
    }

    @Test
    void theFloodFillTurnsEveryLandCellIntoWater() {
        char[][] g = grid("110", "001", "100");
        NumberOfIslands.numIslands(g);
        for (char[] row : g) {
            for (char cell : row) {
                assertEquals('0', cell);
            }
        }
    }

    @Test
    void anEmptyGridHasNoIslands() {
        assertEquals(0, NumberOfIslands.numIslands(new char[0][0]));
    }
}
