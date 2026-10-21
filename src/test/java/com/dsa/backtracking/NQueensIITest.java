package com.dsa.backtracking;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class NQueensIITest {

    @Test
    void fourQueensHaveTwoSolutions() {
        assertEquals(2, NQueensII.solveNQueens(4));
    }

    @Test
    void oneQueenHasOneSolution() {
        assertEquals(1, NQueensII.solveNQueens(1));
    }

    @Test
    void twoAndThreeQueensHaveNoSolution() {
        assertEquals(0, NQueensII.solveNQueens(2));
        assertEquals(0, NQueensII.solveNQueens(3));
    }

    @Test
    void knownCounts() {
        assertEquals(10, NQueensII.solveNQueens(5));
        assertEquals(4, NQueensII.solveNQueens(6));
        assertEquals(92, NQueensII.solveNQueens(8));
    }
}
