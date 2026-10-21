package com.dsa.hashing;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

class IsomorphicStringsTest {

    @Test
    void acceptsTheClassicExample() {
        assertTrue(IsomorphicStrings.isIsomorphic("egg", "add"));
        assertTrue(IsomorphicStrings.isIsomorphic("paper", "title"));
    }

    @Test
    void rejectsDifferentLengths() {
        assertFalse(IsomorphicStrings.isIsomorphic("ab", "abc"));
    }

    @Test
    void rejectsOneCharacterMappingToTwo() {
        assertFalse(IsomorphicStrings.isIsomorphic("ab", "aa"));
        assertFalse(IsomorphicStrings.isIsomorphic("aa", "ab"));
    }

    @Test
    void acceptsTwoCharactersSwappingTheirRoles() {
        assertTrue(IsomorphicStrings.isIsomorphic("ab", "ba"));
    }

    @Test
    void handlesEmptyStrings() {
        assertTrue(IsomorphicStrings.isIsomorphic("", ""));
    }

    @Test
    void handlesSingleCharacters() {
        assertTrue(IsomorphicStrings.isIsomorphic("a", "b"));
        assertFalse(IsomorphicStrings.isIsomorphic("a", ""));
    }

    @Test
    void rejectsRepeatedLettersThatDoNotMatch() {
        assertFalse(IsomorphicStrings.isIsomorphic("badc", "baba"));
    }
}
