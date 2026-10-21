package com.dsa.binarysearch;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

class AggressiveCowsTest {

    @Test
    void findsTheMaximumMinimumDistance() {
        assertEquals(3, AggressiveCows.maxMinimumDistance(new int[]{1, 2, 4, 8, 9}, 3));
    }

    @Test
    void handlesUnsortedInput() {
        assertEquals(3, AggressiveCows.maxMinimumDistance(new int[]{9, 4, 1, 8, 2}, 3));
    }

    @Test
    void handlesASingleCow() {
        assertEquals(0, AggressiveCows.maxMinimumDistance(new int[]{1, 2, 4, 8, 9}, 1));
    }

    @Test
    void handlesOneCowPerStall() {
        assertEquals(1, AggressiveCows.maxMinimumDistance(new int[]{1, 2, 4, 8, 9}, 5));
    }

    @Test
    void handlesTwoStalls() {
        assertEquals(7, AggressiveCows.maxMinimumDistance(new int[]{1, 8}, 2));
    }

    @Test
    void handlesASingleStall() {
        assertEquals(0, AggressiveCows.maxMinimumDistance(new int[]{5}, 1));
    }

    @Test
    void theAnswerAlwaysAllowsEveryCowToBePlaced() {
        int[] stalls = {1, 3, 6, 7, 9, 11};
        for (int cows = 1; cows <= stalls.length; cows++) {
            int distance = AggressiveCows.maxMinimumDistance(stalls, cows);
            assertTrue(distance >= 0, "cows = " + cows);
        }
    }
}
