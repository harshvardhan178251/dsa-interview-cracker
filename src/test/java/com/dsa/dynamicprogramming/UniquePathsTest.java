package com.dsa.dynamicprogramming;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class UniquePathsTest {

    @Test
    void classicExample() {
        assertEquals(28, UniquePaths.uniquePaths(3, 7));
    }

    @Test
    void singleRowOrColumnHasOnePath() {
        assertEquals(1, UniquePaths.uniquePaths(1, 10));
        assertEquals(1, UniquePaths.uniquePaths(10, 1));
    }

    @Test
    void twoByTwoGrid() {
        assertEquals(2, UniquePaths.uniquePaths(2, 2));
    }

    @Test
    void squareGrid() {
        assertEquals(6, UniquePaths.uniquePaths(3, 3));
    }

    @Test
    void symmetricInRowsAndColumns() {
        assertEquals(UniquePaths.uniquePaths(3, 7), UniquePaths.uniquePaths(7, 3));
    }
}
