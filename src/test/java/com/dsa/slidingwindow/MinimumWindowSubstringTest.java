package com.dsa.slidingwindow;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

class MinimumWindowSubstringTest {

    @Test
    void findsTheMinimumWindow() {
        assertEquals("BANC", MinimumWindowSubstring.minWindow("ADOBECODEBANC", "ABC"));
    }

    @Test
    void returnsTheEmptyStringWhenNoWindowExists() {
        assertEquals("", MinimumWindowSubstring.minWindow("a", "aa"));
        assertEquals("", MinimumWindowSubstring.minWindow("abc", "xyz"));
    }

    @Test
    void handlesTheWholeStringBeingTheWindow() {
        assertEquals("abc", MinimumWindowSubstring.minWindow("abc", "abc"));
    }

    @Test
    void handlesASingleCharacterNeedle() {
        assertEquals("c", MinimumWindowSubstring.minWindow("abc", "c"));
        assertEquals("a", MinimumWindowSubstring.minWindow("abc", "a"));
    }

    @Test
    void handlesDuplicateCharactersInTheNeedle() {
        assertEquals("BANC", MinimumWindowSubstring.minWindow("ADOBECODEBANC", "ABC"));
        assertEquals("AAB", MinimumWindowSubstring.minWindow("AAABBC", "AAB"));
    }

    @Test
    void handlesEmptyInputs() {
        assertEquals("", MinimumWindowSubstring.minWindow("", "ABC"));
        assertEquals("", MinimumWindowSubstring.minWindow("ABC", ""));
    }

    @Test
    void theAnswerAlwaysContainsEveryRequiredCharacter() {
        String s = "ADOBECODEBANC";
        String t = "ABC";
        String window = MinimumWindowSubstring.minWindow(s, t);
        assertTrue(window.length() > 0);
        for (char c : t.toCharArray()) {
            assertTrue(window.indexOf(c) >= 0, "missing " + c);
        }
    }
}
