package com.dsa.dynamicprogramming;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class GridUniquePathsIIITest {

    @Test
    void classicExample() {
        assertEquals(2, GridUniquePathsIII.uniquePathsIII(
                new int[][]{{1, 0, 0}, {0, 0, 0}, {0, 0, 2}}));
    }

    @Test
    void leetcodeExampleWithObstacle() {
        assertEquals(2, GridUniquePathsIII.uniquePathsIII(
                new int[][]{{1, 0, 0, 0}, {0, 0, 0, 0}, {0, 0, 2, -1}}));
    }

    @Test
    void singleRow() {
        assertEquals(1, GridUniquePathsIII.uniquePathsIII(new int[][]{{1, 0, 2}}));
    }

    @Test
    void noWalkExists() {
        assertEquals(0, GridUniquePathsIII.uniquePathsIII(new int[][]{{1, 0}, {0, 2}}));
    }

    @Test
    void fourByFourGrid() {
        assertEquals(0, GridUniquePathsIII.uniquePathsIII(
                new int[][]{{1, 0, 0, 0}, {0, 0, 0, 0}, {0, 0, 0, 0}, {0, 0, 0, 2}}));
    }
}
