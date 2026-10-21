package com.dsa.slidingwindow;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

class PermutationInStringTest {

    @Test
    void findsAPermutation() {
        assertTrue(PermutationInString.checkInclusion("ab", "eidbaooo"));
    }

    @Test
    void returnsFalseWhenNoPermutationExists() {
        assertFalse(PermutationInString.checkInclusion("ab", "eidboaoo"));
    }

    @Test
    void handlesAPatternLongerThanTheHaystack() {
        assertFalse(PermutationInString.checkInclusion("abc", "ab"));
    }

    @Test
    void handlesIdenticalStrings() {
        assertTrue(PermutationInString.checkInclusion("abc", "abc"));
        assertTrue(PermutationInString.checkInclusion("abc", "cba"));
    }

    @Test
    void handlesASingleCharacter() {
        assertTrue(PermutationInString.checkInclusion("a", "a"));
        assertFalse(PermutationInString.checkInclusion("a", "b"));
    }

    @Test
    void handlesDuplicateCharactersInThePattern() {
        // "baa" is a permutation of "aab"; "xba" and "bya" are not.
        assertTrue(PermutationInString.checkInclusion("aab", "xxbaay"));
        assertFalse(PermutationInString.checkInclusion("aab", "xxbya"));
    }

    @Test
    void findsThePermutationAtTheVeryEnd() {
        assertTrue(PermutationInString.checkInclusion("ab", "xxba"));
    }
}
