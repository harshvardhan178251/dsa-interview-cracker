package com.dsa.dynamicprogramming;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class LongestCommonSubsequenceTest {

    @Test
    void classicExample() {
        assertEquals(3, LongestCommonSubsequence.lcs("abcde", "ace"));
    }

    @Test
    void identicalStrings() {
        assertEquals(4, LongestCommonSubsequence.lcs("abcd", "abcd"));
    }

    @Test
    void nothingInCommon() {
        assertEquals(0, LongestCommonSubsequence.lcs("abc", "def"));
    }

    @Test
    void emptyStringHasNoSubsequence() {
        assertEquals(0, LongestCommonSubsequence.lcs("", "abc"));
        assertEquals(0, LongestCommonSubsequence.lcs("abc", ""));
    }

    @Test
    void orderMatters() {
        assertEquals(1, LongestCommonSubsequence.lcs("abc", "cba"));
    }
}
