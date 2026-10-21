package com.dsa.dynamicprogramming;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class RegexMatchingTest {

    @Test
    void classicExample() {
        assertTrue(RegexMatching.isMatch("aab", "c*a*b"));
    }

    @Test
    void starMatchesZeroOrMore() {
        assertTrue(RegexMatching.isMatch("aa", "a*"));
        assertFalse(RegexMatching.isMatch("ab", "a*"));
    }

    @Test
    void dotMatchesAnySingleCharacter() {
        assertTrue(RegexMatching.isMatch("ab", "a."));
        assertFalse(RegexMatching.isMatch("ab", "a.."));
    }

    @Test
    void wholeStringMustMatch() {
        assertFalse(RegexMatching.isMatch("mississippi", "mis*is*p*."));
        assertTrue(RegexMatching.isMatch("mississippi", "mis*is*ip*."));
    }

    @Test
    void emptyPatternOnlyMatchesEmptyText() {
        assertFalse(RegexMatching.isMatch("a", ""));
        assertTrue(RegexMatching.isMatch("", "a*"));
    }
}
