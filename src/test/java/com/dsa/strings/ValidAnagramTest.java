package com.dsa.strings;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

class ValidAnagramTest {

    @Test
    void acceptsTheClassicExample() {
        assertTrue(ValidAnagram.isAnagram("anagram", "nagaram"));
    }

    @Test
    void rejectsDifferentLengths() {
        assertFalse(ValidAnagram.isAnagram("a", "ab"));
        assertFalse(ValidAnagram.isAnagram("", "a"));
    }

    @Test
    void rejectsWhenTheCountsDiffer() {
        assertFalse(ValidAnagram.isAnagram("aab", "abb"));
        assertFalse(ValidAnagram.isAnagram("rat", "car"));
    }

    @Test
    void acceptsIdenticalStrings() {
        assertTrue(ValidAnagram.isAnagram("abc", "abc"));
        assertTrue(ValidAnagram.isAnagram("", ""));
    }

    @Test
    void acceptsDuplicateHeavyStrings() {
        assertTrue(ValidAnagram.isAnagram("aabb", "baba"));
    }

    @Test
    void rejectsAStringThatUsesAnUnknownCharacter() {
        assertFalse(ValidAnagram.isAnagram("abc", "abd"));
        assertFalse(ValidAnagram.isAnagram("abc", "xyz"));
    }
}
