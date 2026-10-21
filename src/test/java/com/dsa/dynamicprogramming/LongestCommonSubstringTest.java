package com.dsa.dynamicprogramming;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class LongestCommonSubstringTest {

    @Test
    void classicExample() {
        assertEquals(1, LongestCommonSubstring.longestCommonSubstring("abcde", "ace"));
    }

    @Test
    void identicalStrings() {
        assertEquals(4, LongestCommonSubstring.longestCommonSubstring("abcd", "abcd"));
    }

    @Test
    void noCommonSubstring() {
        assertEquals(0, LongestCommonSubstring.longestCommonSubstring("abc", "def"));
    }

    @Test
    void emptyString() {
        assertEquals(0, LongestCommonSubstring.longestCommonSubstring("", "abc"));
    }

    @Test
    void longerRunInTheMiddle() {
        assertEquals(3, LongestCommonSubstring.longestCommonSubstring("xabcdez", "qqabcz"));
    }
}
