package com.dsa.slidingwindow;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class LongestSubstringWithoutRepeatingCharactersTest {

    @Test
    void findsTheLongestDuplicateFreeSubstring() {
        assertEquals(3, LongestSubstringWithoutRepeatingCharacters.lengthOfLongestSubstring("abcabcbb"));
    }

    @Test
    void handlesAStringOfOneRepeatedCharacter() {
        assertEquals(1, LongestSubstringWithoutRepeatingCharacters.lengthOfLongestSubstring("bbbbb"));
    }

    @Test
    void handlesAStringWithNoRepeats() {
        assertEquals(5, LongestSubstringWithoutRepeatingCharacters.lengthOfLongestSubstring("abcde"));
    }

    @Test
    void handlesASingleCharacter() {
        assertEquals(1, LongestSubstringWithoutRepeatingCharacters.lengthOfLongestSubstring("a"));
    }

    @Test
    void handlesAnEmptyString() {
        assertEquals(0, LongestSubstringWithoutRepeatingCharacters.lengthOfLongestSubstring(""));
    }

    @Test
    void handlesTheClassicPwwkewCase() {
        assertEquals(3, LongestSubstringWithoutRepeatingCharacters.lengthOfLongestSubstring("pwwkew"));
    }

    @Test
    void neverReturnsMoreThanTheStringLength() {
        for (String s : new String[]{"abcabcbb", "bbbbb", "pwwkew", "dvdf", "abba", "tmmzuxt"}) {
            int answer = LongestSubstringWithoutRepeatingCharacters.lengthOfLongestSubstring(s);
            assertEquals(true, answer > 0 && answer <= s.length(), "s = " + s);
        }
    }
}
