package com.dsa.backtracking;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class WordSearchTest {

    @Test
    void classicExample() {
        char[][] board = {
            {'A', 'B', 'C', 'E'},
            {'S', 'F', 'C', 'S'},
            {'A', 'D', 'E', 'E'}
        };
        assertTrue(WordSearch.exist(board, "ABCCED"));
    }

    @Test
    void wordIsNotInTheBoard() {
        char[][] board = {
            {'A', 'B', 'C', 'E'},
            {'S', 'F', 'C', 'S'},
            {'A', 'D', 'E', 'E'}
        };
        assertFalse(WordSearch.exist(board, "ABCB"));
    }

    @Test
    void singleLetterWord() {
        char[][] board = {{'A'}};
        assertTrue(WordSearch.exist(board, "A"));
        assertFalse(WordSearch.exist(board, "B"));
    }

    @Test
    void aCellMayNotBeUsedTwice() {
        char[][] board = {{'A'}};
        assertFalse(WordSearch.exist(board, "AA"));
    }

    @Test
    void emptyBoardHasNoWord() {
        assertFalse(WordSearch.exist(new char[][]{}, "A"));
    }
}
