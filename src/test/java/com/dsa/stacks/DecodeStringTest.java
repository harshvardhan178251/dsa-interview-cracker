package com.dsa.stacks;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class DecodeStringTest {

    @Test
    void decodesTheHappyPath() {
        assertEquals("accaccacc", DecodeString.decode("3[a2[c]]"));
    }

    @Test
    void decodesAStringWithoutBrackets() {
        assertEquals("abc", DecodeString.decode("abc"));
    }

    @Test
    void decodesTwoBlocks() {
        assertEquals("abcabccdcdcdef", DecodeString.decode("2[abc]3[cd]ef"));
    }

    @Test
    void decodesACountOfOne() {
        assertEquals("ab", DecodeString.decode("1[ab]"));
    }

    @Test
    void decodesALargeCount() {
        assertEquals("aaaaaaaaaa", DecodeString.decode("10[a]"));
    }

    @Test
    void decodesDeeplyNestedBlocks() {
        assertEquals("aaa", DecodeString.decode("3[a]"));
        assertEquals("a", DecodeString.decode("1[1[1[a]]]"));
    }

    @Test
    void decodesAnEmptyString() {
        assertEquals("", DecodeString.decode(""));
    }
}
