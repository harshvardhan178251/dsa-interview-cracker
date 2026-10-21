package com.dsa.slidingwindow;

import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

class FindAllAnagramsInStringTest {

    @Test
    void findsEveryAnagram() {
        assertEquals(List.of(0, 6), FindAllAnagramsInString.findAnagrams("cbaebabacd", "abc"));
    }

    @Test
    void handlesTheSecondLeetCodeExample() {
        // "abab" contains "ab", "ba" and "ab" — all anagrams of "ab".
        assertEquals(List.of(0, 1, 2), FindAllAnagramsInString.findAnagrams("abab", "ab"));
    }

    @Test
    void handlesNoAnagramAtAll() {
        assertEquals(List.of(), FindAllAnagramsInString.findAnagrams("aa", "b"));
    }

    @Test
    void handlesAPatternLongerThanTheText() {
        assertEquals(List.of(), FindAllAnagramsInString.findAnagrams("a", "ab"));
    }

    @Test
    void handlesASingleCharacterPattern() {
        // 'c' occurs at index 0 and index 8 of "cbaebabacd".
        assertEquals(List.of(0, 8), FindAllAnagramsInString.findAnagrams("cbaebabacd", "c"));
    }

    @Test
    void handlesAnEmptyPattern() {
        assertEquals(List.of(), FindAllAnagramsInString.findAnagrams("abc", ""));
    }

    @Test
    void theAnswerIsNeverEmptyWhenTheTextIsAPermutation() {
        List<Integer> answer = FindAllAnagramsInString.findAnagrams("abc", "abc");
        assertEquals(List.of(0), answer);
        assertTrue(answer.get(0) == 0);
    }
}
