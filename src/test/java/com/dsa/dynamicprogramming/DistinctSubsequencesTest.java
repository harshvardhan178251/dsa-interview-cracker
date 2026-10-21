package com.dsa.dynamicprogramming;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class DistinctSubsequencesTest {

    @Test
    void classicExample() {
        assertEquals(5, DistinctSubsequences.countDistinctSubsequences("babgbag", "bag"));
    }

    @Test
    void identicalStringsHaveOneWay() {
        assertEquals(1, DistinctSubsequences.countDistinctSubsequences("abc", "abc"));
    }

    @Test
    void repeatedCharacters() {
        assertEquals(3, DistinctSubsequences.countDistinctSubsequences("aaa", "aa"));
    }

    @Test
    void targetNotReachable() {
        assertEquals(0, DistinctSubsequences.countDistinctSubsequences("abc", "acb"));
    }

    @Test
    void emptyTargetHasOneWay() {
        assertEquals(1, DistinctSubsequences.countDistinctSubsequences("abc", ""));
    }
}
