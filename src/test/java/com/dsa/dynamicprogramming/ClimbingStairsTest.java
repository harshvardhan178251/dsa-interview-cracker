package com.dsa.dynamicprogramming;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class ClimbingStairsTest {

    @Test
    void singleStairHasOneWay() {
        assertEquals(1, ClimbingStairs.climbStairs(1));
    }

    @Test
    void twoStairsHaveTwoWays() {
        assertEquals(2, ClimbingStairs.climbStairs(2));
    }

    @Test
    void countsAllDistinctMoveOrders() {
        assertEquals(3, ClimbingStairs.climbStairs(3));
        assertEquals(8, ClimbingStairs.climbStairs(5));
    }

    @Test
    void followsTheFibonacciSequence() {
        assertEquals(13, ClimbingStairs.climbStairs(6));
        assertEquals(89, ClimbingStairs.climbStairs(10));
    }

    @Test
    void emptyClimbCountsAsOneWay() {
        assertEquals(1, ClimbingStairs.climbStairs(0));
    }
}
