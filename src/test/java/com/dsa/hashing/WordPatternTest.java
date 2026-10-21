package com.dsa.hashing;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

class WordPatternTest {

    @Test
    void acceptsTheClassicExample() {
        assertTrue(WordPattern.wordPattern("abba", new String[]{"dog", "cat", "cat", "dog"}));
    }

    @Test
    void rejectsDifferentLengths() {
        assertFalse(WordPattern.wordPattern("abba", new String[]{"dog", "cat", "cat"}));
    }

    @Test
    void rejectsOneLetterStandingForTwoWords() {
        assertFalse(WordPattern.wordPattern("aa", new String[]{"dog", "cat"}));
        assertFalse(WordPattern.wordPattern("abba", new String[]{"dog", "cat", "dog", "cat"}));
    }

    @Test
    void rejectsTwoLettersStandingForTheSameWord() {
        assertFalse(WordPattern.wordPattern("ab", new String[]{"dog", "dog"}));
        assertFalse(WordPattern.wordPattern("abc", new String[]{"dog", "cat", "dog"}));
    }

    @Test
    void rejectsAPatternThatDoesNotMatch() {
        assertFalse(WordPattern.wordPattern("abba", new String[]{"dog", "cat", "dog", "cat"}));
    }

    @Test
    void acceptsASingleLetterAndWord() {
        assertTrue(WordPattern.wordPattern("a", new String[]{"dog"}));
    }

    @Test
    void acceptsTwoEmptyPatterns() {
        assertTrue(WordPattern.wordPattern("", new String[]{}));
    }
}
