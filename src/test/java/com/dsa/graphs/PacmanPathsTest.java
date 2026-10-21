package com.dsa.graphs;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class PacmanPathsTest {

    private static char[][] maze(String... rows) {
        char[][] m = new char[rows.length][rows[0].length()];
        for (int r = 0; r < rows.length; r++) {
            for (int c = 0; c < rows[r].length(); c++) {
                m[r][c] = rows[r].charAt(c);
            }
        }
        return m;
    }

    @Test
    void walksAroundTheWallBlock() {
        assertEquals(8, PacmanPaths.shortestPath(
                maze(".....", ".###.", ".###.", ".###.", "....."), 0, 0, 4, 4));
    }

    @Test
    void aStraightCorridorIsItsLength() {
        assertEquals(4, PacmanPaths.shortestPath(maze("....."), 0, 0, 0, 4));
    }

    @Test
    void theStartEqualsTheTargetGivesZero() {
        assertEquals(0, PacmanPaths.shortestPath(maze("...", "...", "..."), 1, 1, 1, 1));
    }

    @Test
    void anUnreachableTargetGivesMinusOne() {
        assertEquals(-1, PacmanPaths.shortestPath(
                maze(".#.", ".#.", ".#."), 0, 0, 2, 2));
    }

    @Test
    void aStartOnAWallGivesMinusOne() {
        assertEquals(-1, PacmanPaths.shortestPath(
                maze(".#.", ".#.", ".#."), 0, 1, 2, 2));
    }

    @Test
    void aTargetOnAWallGivesMinusOne() {
        assertEquals(-1, PacmanPaths.shortestPath(maze(".#."), 0, 0, 0, 1));
    }

    @Test
    void theShortestRouteIsFoundInAnOpenGrid() {
        assertEquals(4, PacmanPaths.shortestPath(maze("...", "...", "..."), 0, 0, 2, 2));
    }
}
