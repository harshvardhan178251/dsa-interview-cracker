package com.dsa.dynamicprogramming;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class WildcardMatchingTest {

    @Test
    void classicExample() {
        assertTrue(WildcardMatching.isMatch("adceb", "*a*b"));
    }

    @Test
    void starMatchesEmptySequence() {
        assertTrue(WildcardMatching.isMatch("aa", "*"));
    }

    @Test
    void questionMarkMatchesExactlyOneCharacter() {
        assertTrue(WildcardMatching.isMatch("aa", "a?"));
        assertFalse(WildcardMatching.isMatch("a", "a?"));
    }

    @Test
    void literalMismatch() {
        assertFalse(WildcardMatching.isMatch("aa", "a"));
    }

    @Test
    void patternMustMatchTheWholeString() {
        assertFalse(WildcardMatching.isMatch("abc", "ab"));
        assertTrue(WildcardMatching.isMatch("abc", "abc"));
    }
}
