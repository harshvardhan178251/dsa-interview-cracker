package com.dsa.math;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

class PalindromeNumberTest {

    @Test
    void anOddLengthPalindromeIsDetected() {
        assertTrue(PalindromeNumber.isPalindrome(121));
    }

    @Test
    void anEvenLengthPalindromeIsDetected() {
        assertTrue(PalindromeNumber.isPalindrome(1221));
    }

    @Test
    void zeroIsAPalindrome() {
        assertTrue(PalindromeNumber.isPalindrome(0));
    }

    @Test
    void negativeNumbersAreNotPalindromes() {
        assertFalse(PalindromeNumber.isPalindrome(-121));
    }

    @Test
    void aTrailingZeroBreaksTheSymmetry() {
        assertFalse(PalindromeNumber.isPalindrome(10));
    }

    @Test
    void aNonPalindromeIsRejected() {
        assertFalse(PalindromeNumber.isPalindrome(123));
    }
}
