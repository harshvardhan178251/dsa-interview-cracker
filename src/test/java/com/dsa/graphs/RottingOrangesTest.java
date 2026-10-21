package com.dsa.graphs;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class RottingOrangesTest {

    @Test
    void aColumnOfRottenOrangesRottsInThreeMinutes() {
        assertEquals(3, RottingOranges.orangesRotting(new int[][]{
                {1, 0, 0, 0},
                {1, 0, 0, 0},
                {1, 0, 0, 0}}));
    }

    @Test
    void orangesWithNoRottenNeighbourNeverRot() {
        assertEquals(-1, RottingOranges.orangesRotting(new int[][]{
                {2, 0, 0},
                {0, 0, 0},
                {0, 0, 0}}));
    }

    @Test
    void everythingIsAlreadyRotten() {
        assertEquals(0, RottingOranges.orangesRotting(new int[][]{{1, 1}, {1, 1}}));
    }

    @Test
    void thereIsNoFreshOrangeAtAll() {
        assertEquals(0, RottingOranges.orangesRotting(new int[][]{{2, 2}, {2, 2}}));
    }

    @Test
    void aSingleOrangeTwoStepsAwayRottsInTwoMinutes() {
        assertEquals(2, RottingOranges.orangesRotting(new int[][]{{0, 1}, {0, 0}}));
    }

    @Test
    void freshOrangesNextToRottenOnesRotInOneMinute() {
        assertEquals(1, RottingOranges.orangesRotting(new int[][]{
                {2, 1, 1},
                {1, 1, 0},
                {0, 1, 1}}));
    }

    @Test
    void theGridIsMutatedInPlace() {
        int[][] grid = {{1, 0}, {0, 0}};
        RottingOranges.orangesRotting(grid);
        assertEquals(1, grid[0][1]);
        assertEquals(1, grid[1][0]);
    }
}
