package com.dsa.strings;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class LongestPalindromicSubstringTest {

    @Test
    void findsTheClassicExample() {
        assertEquals("bab", LongestPalindromicSubstring.longestPalindrome("babad"));
    }

    @Test
    void findsAnEvenLengthPalindrome() {
        assertEquals("bb", LongestPalindromicSubstring.longestPalindrome("cbbd"));
        assertEquals("abba", LongestPalindromicSubstring.longestPalindrome("xabbac"));
    }

    @Test
    void wholeStringIsAPalindrome() {
        assertEquals("racecar", LongestPalindromicSubstring.longestPalindrome("racecar"));
    }

    @Test
    void emptyStringHasNoPalindrome() {
        assertEquals("", LongestPalindromicSubstring.longestPalindrome(""));
    }

    @Test
    void singleCharacterIsTheAnswer() {
        assertEquals("a", LongestPalindromicSubstring.longestPalindrome("a"));
    }

    @Test
    void noPalindromeLongerThanOneCharacter() {
        assertEquals("a", LongestPalindromicSubstring.longestPalindrome("abc"));
    }

    @Test
    void tiesAreBrokenByTheEarliestStart() {
        // "aba" and "bab" are both length 3; the earlier one wins.
        assertEquals("aba", LongestPalindromicSubstring.longestPalindrome("abab"));
    }
}
