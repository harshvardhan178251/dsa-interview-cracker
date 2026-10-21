package com.dsa.backtracking;

import org.junit.jupiter.api.Test;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class NQueensTest {

    @Test
    void fourQueensHaveTwoSolutions() {
        assertEquals(2, NQueens.solveNQueens(4).size());
    }

    @Test
    void oneQueenHasOneSolution() {
        List<List<String>> result = NQueens.solveNQueens(1);
        assertEquals(1, result.size());
        assertEquals("Q", result.get(0).get(0));
    }

    @Test
    void twoAndThreeQueensHaveNoSolution() {
        assertEquals(0, NQueens.solveNQueens(2).size());
        assertEquals(0, NQueens.solveNQueens(3).size());
    }

    @Test
    void eightQueensHaveNinetyTwoSolutions() {
        assertEquals(92, NQueens.solveNQueens(8).size());
    }

    @Test
    void solutionsAreSortedLexicographically() {
        List<List<String>> result = NQueens.solveNQueens(4);
        assertEquals("..Q.", result.get(0).get(0));
        assertEquals(".Q..", result.get(1).get(0));
    }
}
