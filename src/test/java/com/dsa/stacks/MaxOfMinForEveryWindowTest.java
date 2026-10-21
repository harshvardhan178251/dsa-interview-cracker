package com.dsa.stacks;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class MaxOfMinForEveryWindowTest {

    @Test
    void findsTheHappyPath() {
        assertEquals(2, MaxOfMinForEveryWindow.maxOfMins(new int[]{4, 2, 6, 1, 5}, 3));
    }

    @Test
    void handlesAWindowOfOne() {
        assertEquals(6, MaxOfMinForEveryWindow.maxOfMins(new int[]{4, 2, 6, 1, 5}, 1));
    }

    @Test
    void handlesAWindowOfTheWholeArray() {
        assertEquals(1, MaxOfMinForEveryWindow.maxOfMins(new int[]{4, 2, 6, 1, 5}, 5));
    }

    @Test
    void handlesADecreasingArray() {
        // windows [5,4] [4,3] [3,2] [2,1] -> minimums 4 3 2 1 -> the largest is 4
        assertEquals(4, MaxOfMinForEveryWindow.maxOfMins(new int[]{5, 4, 3, 2, 1}, 2));
    }

    @Test
    void handlesAnIncreasingArray() {
        // windows [1,2] [2,3] [3,4] -> minimums 1 2 3 -> the largest is 3
        assertEquals(3, MaxOfMinForEveryWindow.maxOfMins(new int[]{1, 2, 3, 4}, 2));
    }

    @Test
    void handlesEqualValues() {
        assertEquals(7, MaxOfMinForEveryWindow.maxOfMins(new int[]{7, 7, 7}, 2));
    }

    @Test
    void handlesASingleElement() {
        assertEquals(5, MaxOfMinForEveryWindow.maxOfMins(new int[]{5}, 1));
    }
}
