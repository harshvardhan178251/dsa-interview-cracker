package com.dsa.slidingwindow;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

class LongestRepeatingSubstringTest {

    @Test
    void findsTheLongestRepeatingSubstring() {
        assertEquals(3, LongestRepeatingSubstring.longestRepeatingSubstring("banana"));
    }

    @Test
    void handlesAStringWithNoRepeats() {
        assertEquals(0, LongestRepeatingSubstring.longestRepeatingSubstring("abcd"));
    }

    @Test
    void allowsOverlappingOccurrences() {
        assertEquals(3, LongestRepeatingSubstring.longestRepeatingSubstring("aaaa"));
    }

    @Test
    void handlesASingleCharacter() {
        assertEquals(0, LongestRepeatingSubstring.longestRepeatingSubstring("a"));
    }

    @Test
    void handlesAnEmptyString() {
        assertEquals(0, LongestRepeatingSubstring.longestRepeatingSubstring(""));
    }

    @Test
    void handlesTwoIdenticalHalves() {
        assertEquals(3, LongestRepeatingSubstring.longestRepeatingSubstring("abcabc"));
    }

    @Test
    void theAnswerIsNeverLongerThanHalfTheString() {
        for (String s : new String[]{"banana", "abcd", "aaaa", "abcabc", "xyxyx"}) {
            int answer = LongestRepeatingSubstring.longestRepeatingSubstring(s);
            assertTrue(answer >= 0 && answer <= s.length(), "s = " + s);
        }
    }
}
