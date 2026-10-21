package com.dsa.hashing;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class FirstUniqueCharacterInStringTest {

    @Test
    void findsTheClassicExample() {
        assertEquals(0, FirstUniqueCharacterInString.firstUniqueCharacter("leetcode"));
    }

    @Test
    void skipsTheRepeatedCharacters() {
        assertEquals(2, FirstUniqueCharacterInString.firstUniqueCharacter("loveleetcode"));
        assertEquals(4, FirstUniqueCharacterInString.firstUniqueCharacter("aabbcd"));
    }

    @Test
    void returnsMinusOneWhenEveryCharacterRepeats() {
        assertEquals(-1, FirstUniqueCharacterInString.firstUniqueCharacter("aabb"));
        assertEquals(-1, FirstUniqueCharacterInString.firstUniqueCharacter("abcabc"));
    }

    @Test
    void handlesAnEmptyString() {
        assertEquals(-1, FirstUniqueCharacterInString.firstUniqueCharacter(""));
    }

    @Test
    void handlesASingleCharacter() {
        assertEquals(0, FirstUniqueCharacterInString.firstUniqueCharacter("a"));
    }

    @Test
    void handlesOnlyTheLastCharacterBeingUnique() {
        assertEquals(1, FirstUniqueCharacterInString.firstUniqueCharacter("aba"));
        assertEquals(2, FirstUniqueCharacterInString.firstUniqueCharacter("aab"));
    }
}
