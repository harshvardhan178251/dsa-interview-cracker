package com.dsa.dynamicprogramming;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class WordBreakTest {

    @Test
    void classicExample() {
        assertTrue(WordBreak.wordBreak("leetcode", java.util.List.of("leet", "code")));
    }

    @Test
    void notBreakable() {
        assertFalse(WordBreak.wordBreak("leets", java.util.List.of("leet", "code")));
    }

    @Test
    void wordsMayRepeat() {
        assertTrue(WordBreak.wordBreak("aaaaaaa", java.util.List.of("a", "aa")));
    }

    @Test
    void emptyStringIsBreakable() {
        assertTrue(WordBreak.wordBreak("", java.util.List.of("a")));
    }

    @Test
    void dictionaryWithoutAnyPrefixFails() {
        assertFalse(WordBreak.wordBreak("applepenapple", java.util.List.of("apple")));
    }
}
