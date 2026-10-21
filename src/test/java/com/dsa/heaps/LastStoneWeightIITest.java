package com.dsa.heaps;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class LastStoneWeightIITest {

    @Test
    void findsTheOptimalRemainingWeight() {
        assertEquals(5, LastStoneWeightII.lastStoneWeightII(new int[]{31, 26, 33, 21, 40}));
    }

    @Test
    void singleStoneIsTheAnswer() {
        assertEquals(7, LastStoneWeightII.lastStoneWeightII(new int[]{7}));
    }

    @Test
    void twoEqualStonesCancelOut() {
        assertEquals(0, LastStoneWeightII.lastStoneWeightII(new int[]{5, 5}));
    }

    @Test
    void twoDifferentStonesLeaveTheDifference() {
        assertEquals(3, LastStoneWeightII.lastStoneWeightII(new int[]{5, 2}));
    }

    @Test
    void emptyInputLeavesNothing() {
        assertEquals(0, LastStoneWeightII.lastStoneWeightII(new int[0]));
    }

    @Test
    void theBestPartitionLeavesTheSmallestDifference() {
        // {1,2,3,4,5} splits into 7 and 8 - a difference of 1
        assertEquals(1, LastStoneWeightII.lastStoneWeightII(new int[]{1, 2, 3, 4, 5}));
    }

    @Test
    void theGreedyHeapIsNotOptimal() {
        int[] stones = {31, 26, 33, 21, 40};
        assertEquals(9, LastStoneWeightII.greedySmash(stones));
        assertEquals(5, LastStoneWeightII.lastStoneWeightII(stones));
    }
}
