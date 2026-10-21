package com.dsa.dynamicprogramming;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class EditDistanceTest {

    @Test
    void classicExample() {
        assertEquals(3, EditDistance.minDistance("horse", "ros"));
    }

    @Test
    void identicalStringsNeedNoEdits() {
        assertEquals(0, EditDistance.minDistance("same", "same"));
    }

    @Test
    void emptySourceNeedsOnlyInsertions() {
        assertEquals(3, EditDistance.minDistance("", "abc"));
    }

    @Test
    void emptyTargetNeedsOnlyDeletions() {
        assertEquals(3, EditDistance.minDistance("abc", ""));
    }

    @Test
    void oneReplacement() {
        assertEquals(1, EditDistance.minDistance("cat", "cut"));
    }

    @Test
    void classicLevenshteinExample() {
        assertEquals(3, EditDistance.minDistance("kitten", "sitting"));
    }
}
