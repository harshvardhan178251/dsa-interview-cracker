package com.dsa.hashing;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class LongestConsecutiveSequenceTest {

    @Test
    void findsTheClassicExample() {
        assertEquals(4, LongestConsecutiveSequence.longestConsecutiveSequence(
                new int[]{100, 4, 200, 1, 3, 2}));
    }

    @Test
    void handlesAnEmptyArray() {
        assertEquals(0, LongestConsecutiveSequence.longestConsecutiveSequence(new int[]{}));
    }

    @Test
    void handlesASingleElement() {
        assertEquals(1, LongestConsecutiveSequence.longestConsecutiveSequence(new int[]{7}));
    }

    @Test
    void handlesAllDuplicates() {
        assertEquals(1, LongestConsecutiveSequence.longestConsecutiveSequence(new int[]{2, 2, 2}));
    }

    @Test
    void handlesNegativeNumbers() {
        assertEquals(4, LongestConsecutiveSequence.longestConsecutiveSequence(
                new int[]{-3, -2, -1, 0, 10}));
    }

    @Test
    void handlesTwoSeparateRuns() {
        assertEquals(3, LongestConsecutiveSequence.longestConsecutiveSequence(
                new int[]{1, 2, 3, 10, 11, 12, 20}));
    }

    @Test
    void handlesUnsortedInput() {
        // The set is {-1, 0, 1, 3, 4, 5, 6, 7, 8, 9}: the run 3..9 has length 7.
        assertEquals(7, LongestConsecutiveSequence.longestConsecutiveSequence(
                new int[]{9, 1, 4, 7, 3, -1, 0, 5, 8, -1, 6}));
    }
}
