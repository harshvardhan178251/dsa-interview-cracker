package com.dsa.twopointers;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

class ValidPalindromeTest {

    @Test
    void acceptsAPalindromeWithPunctuation() {
        assertTrue(ValidPalindrome.isPalindrome("A man, a plan, a canal: Panama"));
    }

    @Test
    void rejectsANonPalindrome() {
        assertFalse(ValidPalindrome.isPalindrome("race a car"));
    }

    @Test
    void singleCharacterIsAPalindrome() {
        assertTrue(ValidPalindrome.isPalindrome("a"));
    }

    @Test
    void emptyStringIsAPalindrome() {
        assertTrue(ValidPalindrome.isPalindrome(""));
    }

    @Test
    void stringOfOnlyPunctuationIsAPalindrome() {
        assertTrue(ValidPalindrome.isPalindrome("..."));
    }

    @Test
    void digitsAreComparedToo() {
        assertTrue(ValidPalindrome.isPalindrome("12321"));
        assertFalse(ValidPalindrome.isPalindrome("12345"));
    }

    @Test
    void caseIsIgnored() {
        assertTrue(ValidPalindrome.isPalindrome("AbBa"));
        assertFalse(ValidPalindrome.isPalindrome("AbBc"));
    }

    @Test
    void twoDifferentLettersFail() {
        assertFalse(ValidPalindrome.isPalindrome("ab"));
    }
}
