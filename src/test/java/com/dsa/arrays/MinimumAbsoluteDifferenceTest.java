package com.dsa.arrays;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class MinimumAbsoluteDifferenceTest {

    @Test
    void findsTheClosestPair() {
        assertEquals(1, MinimumAbsoluteDifference.minimumAbsoluteDifference(new int[]{4, 2, 1, 3, 5}));
    }

    @Test
    void findsALargerGap() {
        assertEquals(4, MinimumAbsoluteDifference.minimumAbsoluteDifference(new int[]{1, 5, 9, 13}));
    }

    @Test
    void handlesDuplicates() {
        assertEquals(0, MinimumAbsoluteDifference.minimumAbsoluteDifference(new int[]{3, 3, 3}));
    }

    @Test
    void handlesTwoElements() {
        assertEquals(4, MinimumAbsoluteDifference.minimumAbsoluteDifference(new int[]{2, 6}));
    }

    @Test
    void handlesNegativeValues() {
        // sorted: -5, -3, -1 -> gaps 2, 2
        assertEquals(2, MinimumAbsoluteDifference.minimumAbsoluteDifference(new int[]{-5, -3, -1}));
    }

    @Test
    void doesNotModifyTheInput() {
        int[] nums = {4, 2, 1};
        MinimumAbsoluteDifference.minimumAbsoluteDifference(nums);
        assertEquals(4, nums[0]);
    }
}
