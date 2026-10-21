package com.dsa.slidingwindow;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

class LongestRepeatingCharacterReplacementTest {

    @Test
    void findsTheLongestReplaceableSubstring() {
        assertEquals(4, LongestRepeatingCharacterReplacement.characterReplacement("AABABBA", 1));
    }

    @Test
    void withZeroReplacementsItFindsTheLongestRun() {
        assertEquals(3, LongestRepeatingCharacterReplacement.characterReplacement("AAABBBCCC", 0));
    }

    @Test
    void withEnoughReplacementsTheWholeStringIsValid() {
        assertEquals(5, LongestRepeatingCharacterReplacement.characterReplacement("ABCDE", 4));
    }

    @Test
    void handlesASingleCharacter() {
        assertEquals(1, LongestRepeatingCharacterReplacement.characterReplacement("A", 0));
        assertEquals(1, LongestRepeatingCharacterReplacement.characterReplacement("A", 5));
    }

    @Test
    void handlesAnEmptyString() {
        assertEquals(0, LongestRepeatingCharacterReplacement.characterReplacement("", 0));
    }

    @Test
    void theAnswerIsNeverLongerThanTheString() {
        for (String s : new String[]{"AABABBA", "AAAA", "ABCDE", "", "XYZ"}) {
            for (int k = 0; k <= s.length(); k++) {
                int answer = LongestRepeatingCharacterReplacement.characterReplacement(s, k);
                assertTrue(answer <= s.length(), "s = " + s + ", k = " + k);
            }
        }
    }

    @Test
    void moreReplacementsNeverShortenTheAnswer() {
        String s = "AABABBA";
        int previous = 0;
        for (int k = 0; k <= s.length(); k++) {
            int answer = LongestRepeatingCharacterReplacement.characterReplacement(s, k);
            assertTrue(answer >= previous, "k = " + k);
            previous = answer;
        }
    }
}
