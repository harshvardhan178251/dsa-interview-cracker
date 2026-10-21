package com.dsa.heaps;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

class ReorganizeStringTest {

    @Test
    void separatesEqualLetters() {
        assertEquals("aba", ReorganizeString.reorganizeString("aab"));
    }

    @Test
    void singleLetterIsUnchanged() {
        assertEquals("a", ReorganizeString.reorganizeString("a"));
    }

    @Test
    void twoDifferentLetters() {
        assertEquals("ab", ReorganizeString.reorganizeString("ab"));
    }

    @Test
    void impossibleArrangementReturnsAnEmptyString() {
        assertEquals("", ReorganizeString.reorganizeString("aaab"));
    }

    @Test
    void everyLetterOfTheAlphabet() {
        String result = ReorganizeString.reorganizeString("abcdefghijklmnopqrstuvwxyz");
        assertEquals(26, result.length());
    }

    @Test
    void resultKeepsEveryCharacterAndNeverRepeatsTwice() {
        String s = "aaabbbccc";
        String result = ReorganizeString.reorganizeString(s);
        assertEquals(s.length(), result.length());
        for (int i = 1; i < result.length(); i++) {
            assertTrue(result.charAt(i) != result.charAt(i - 1), "two equal letters are adjacent");
        }
    }

    @Test
    void emptyStringStaysEmpty() {
        assertEquals("", ReorganizeString.reorganizeString(""));
    }
}
