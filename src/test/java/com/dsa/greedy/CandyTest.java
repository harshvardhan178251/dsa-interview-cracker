package com.dsa.greedy;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class CandyTest {

    @Test
    void givesMoreCandiesToTheHigherRatedChild() {
        assertEquals(5, Candy.minCandies(new int[]{1, 0, 2}));
    }

    @Test
    void handlesEqualRatings() {
        assertEquals(4, Candy.minCandies(new int[]{1, 2, 2}));
    }

    @Test
    void aSingleChildGetsOneCandy() {
        assertEquals(1, Candy.minCandies(new int[]{7}));
    }

    @Test
    void anEmptyRowGetsNoCandies() {
        assertEquals(0, Candy.minCandies(new int[]{}));
    }

    @Test
    void handlesTheTwoSidedConstraint() {
        assertEquals(8, Candy.minCandies(new int[]{1, 0, 2, 2, 5}));
    }

    @Test
    void aStrictlyIncreasingRowNeedsConsecutiveCounts() {
        assertEquals(10, Candy.minCandies(new int[]{1, 2, 3, 4}));
    }
}
