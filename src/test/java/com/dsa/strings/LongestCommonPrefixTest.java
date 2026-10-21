package com.dsa.strings;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class LongestCommonPrefixTest {

    @Test
    void findsTheClassicExample() {
        assertEquals("fl", LongestCommonPrefix.longestCommonPrefix(
                new String[]{"flower", "flow", "flight"}));
    }

    @Test
    void handlesASingleString() {
        assertEquals("flower", LongestCommonPrefix.longestCommonPrefix(new String[]{"flower"}));
    }

    @Test
    void returnsEmptyWhenThereIsNoCommonPrefix() {
        assertEquals("", LongestCommonPrefix.longestCommonPrefix(new String[]{"dog", "racecar"}));
        assertEquals("", LongestCommonPrefix.longestCommonPrefix(new String[]{"a", "b"}));
    }

    @Test
    void handlesAnEmptyStringInTheArray() {
        assertEquals("", LongestCommonPrefix.longestCommonPrefix(new String[]{"", "abc"}));
        assertEquals("", LongestCommonPrefix.longestCommonPrefix(new String[]{"abc", ""}));
    }

    @Test
    void handlesAnEmptyArray() {
        assertEquals("", LongestCommonPrefix.longestCommonPrefix(new String[]{}));
    }

    @Test
    void handlesDuplicates() {
        assertEquals("abc", LongestCommonPrefix.longestCommonPrefix(
                new String[]{"abc", "abc", "abc"}));
    }
}
