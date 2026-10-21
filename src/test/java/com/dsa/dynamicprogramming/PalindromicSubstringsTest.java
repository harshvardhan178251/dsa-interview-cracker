package com.dsa.dynamicprogramming;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class PalindromicSubstringsTest {

    @Test
    void classicExample() {
        assertEquals(6, PalindromicSubstrings.countSubstrings("aaa"));
    }

    @Test
    void allDistinctCharacters() {
        assertEquals(3, PalindromicSubstrings.countSubstrings("abc"));
    }

    @Test
    void singleCharacter() {
        assertEquals(1, PalindromicSubstrings.countSubstrings("a"));
    }

    @Test
    void emptyString() {
        assertEquals(0, PalindromicSubstrings.countSubstrings(""));
    }

    @Test
    void longerPalindrome() {
        assertEquals(4, PalindromicSubstrings.countSubstrings("aba"));
    }
}
