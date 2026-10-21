package com.dsa.strings;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class LongestPalindromicSubsequenceTest {

    @Test
    void findsTheClassicExample() {
        assertEquals(4, LongestPalindromicSubsequence.longestPalindromeSubsequence("bbbab"));
    }

    @Test
    void skipsCharactersToFormThePalindrome() {
        // "aabb" holds "aa" and "bb" but no 3+ palindrome.
        assertEquals(2, LongestPalindromicSubsequence.longestPalindromeSubsequence("aabb"));
        // "aabba" holds "abba" as a subsequence.
        assertEquals(4, LongestPalindromicSubsequence.longestPalindromeSubsequence("aabba"));
    }

    @Test
    void wholeStringIsAPalindrome() {
        assertEquals(7, LongestPalindromicSubsequence.longestPalindromeSubsequence("racecar"));
    }

    @Test
    void emptyStringHasLengthZero() {
        assertEquals(0, LongestPalindromicSubsequence.longestPalindromeSubsequence(""));
    }

    @Test
    void singleCharacterHasLengthOne() {
        assertEquals(1, LongestPalindromicSubsequence.longestPalindromeSubsequence("a"));
    }

    @Test
    void twoEqualCharactersAreAPalindrome() {
        assertEquals(2, LongestPalindromicSubsequence.longestPalindromeSubsequence("aa"));
    }

    @Test
    void allDistinctCharactersGiveLengthOne() {
        assertEquals(1, LongestPalindromicSubsequence.longestPalindromeSubsequence("abcde"));
    }
}
