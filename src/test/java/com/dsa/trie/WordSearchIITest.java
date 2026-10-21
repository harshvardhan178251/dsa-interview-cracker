package com.dsa.trie;

import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

class WordSearchIITest {

    private static char[][] board(String... rows) {
        char[][] grid = new char[rows.length][];
        for (int i = 0; i < rows.length; i++) {
            grid[i] = rows[i].toCharArray();
        }
        return grid;
    }

    @Test
    void findsTheSampleWords() {
        char[][] grid = board("oaan", "etae", "ihkr", "iflv");
        assertEquals(List.of("eat", "oath"),
                WordSearchII.findWords(grid, List.of("oath", "pea", "eat", "rain")));
    }

    @Test
    void findsASingleLetter() {
        assertEquals(List.of("a"), WordSearchII.findWords(board("a"), List.of("a", "b")));
    }

    @Test
    void handlesAnEmptyBoard() {
        assertTrue(WordSearchII.findWords(new char[0][], List.of("a")).isEmpty());
    }

    @Test
    void handlesAnEmptyDictionary() {
        assertTrue(WordSearchII.findWords(board("abc"), List.of()).isEmpty());
    }

    @Test
    void doesNotReuseACell() {
        // the word "aa" needs two a's, but the board only has one
        assertTrue(WordSearchII.findWords(board("a"), List.of("aa")).isEmpty());
    }

    @Test
    void findsAWordThatUsesTwoNeighbours() {
        assertEquals(List.of("ab"), WordSearchII.findWords(board("ab"), List.of("ab")));
    }

    @Test
    void reportsEveryWordOnlyOnce() {
        assertEquals(List.of("ab"), WordSearchII.findWords(board("aba"), List.of("ab", "ab")));
    }
}
