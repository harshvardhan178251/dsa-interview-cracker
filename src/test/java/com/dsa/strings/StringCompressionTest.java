package com.dsa.strings;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class StringCompressionTest {

    @Test
    void compressesTheClassicExample() {
        assertEquals("a2b1c5a3", StringCompression.compress("aabcccccaaa"));
    }

    @Test
    void writesTheCountEvenForASingleCharacter() {
        assertEquals("a1b1c1", StringCompression.compress("abc"));
    }

    @Test
    void compressesOneLongRun() {
        assertEquals("a5", StringCompression.compress("aaaaa"));
    }

    @Test
    void handlesAnEmptyString() {
        assertEquals("", StringCompression.compress(""));
    }

    @Test
    void handlesASingleCharacter() {
        assertEquals("z1", StringCompression.compress("z"));
    }

    @Test
    void handlesAlternatingCharacters() {
        assertEquals("a1b1a1b1", StringCompression.compress("abab"));
    }

    @Test
    void handlesDigitsInTheInput() {
        assertEquals("1222", StringCompression.compress("1122"));
        assertEquals("11", StringCompression.compress("1"));
    }
}
