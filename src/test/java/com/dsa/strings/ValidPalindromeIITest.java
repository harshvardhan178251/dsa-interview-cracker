package com.dsa.strings;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

class ValidPalindromeIITest {

    @Test
    void alreadyAPalindrome() {
        assertTrue(ValidPalindromeII.validPalindrome("aba"));
        assertTrue(ValidPalindromeII.validPalindrome("abcba"));
    }

    @Test
    void oneDeletionOnTheLeftFixesIt() {
        assertTrue(ValidPalindromeII.validPalindrome("abca"));
    }

    @Test
    void oneDeletionOnTheRightFixesIt() {
        assertTrue(ValidPalindromeII.validPalindrome("aab"));
        assertTrue(ValidPalindromeII.validPalindrome("ab"));
    }

    @Test
    void needsTwoDeletionsSoItFails() {
        assertFalse(ValidPalindromeII.validPalindrome("abcd"));
        assertFalse(ValidPalindromeII.validPalindrome("abcda"));
        assertFalse(ValidPalindromeII.validPalindrome("abc"));
    }

    @Test
    void emptyAndSingleCharacterArePalindromes() {
        assertTrue(ValidPalindromeII.validPalindrome(""));
        assertTrue(ValidPalindromeII.validPalindrome("x"));
    }

    @Test
    void allDistinctCharactersOfLengthThreeFail() {
        assertFalse(ValidPalindromeII.validPalindrome("xyz"));
    }
}
