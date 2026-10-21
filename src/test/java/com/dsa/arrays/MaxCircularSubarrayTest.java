package com.dsa.arrays;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class MaxCircularSubarrayTest {

    @Test
    void findsTheWrappingSubarray() {
        assertEquals(11, MaxCircularSubarray.maxCircularSubarraySum(new int[]{5, -3, 5, -2, 3}));
    }

    @Test
    void returnsTheLargestElementWhenAllAreNegative() {
        assertEquals(-2, MaxCircularSubarray.maxCircularSubarraySum(new int[]{-3, -2, -5}));
    }

    @Test
    void handlesASingleElement() {
        assertEquals(7, MaxCircularSubarray.maxCircularSubarraySum(new int[]{7}));
    }

    @Test
    void handlesAnEmptyArray() {
        assertEquals(0, MaxCircularSubarray.maxCircularSubarraySum(new int[]{}));
    }

    @Test
    void handlesAnAllPositiveArray() {
        assertEquals(15, MaxCircularSubarray.maxCircularSubarraySum(new int[]{3, 4, 5, 3}));
    }

    @Test
    void matchesThePlainMaximumSubarrayWhenNothingWraps() {
        int[] nums = {1, -2, 3, -1, 4};
        // the plain maximum subarray is 6 ([3, -1, 4]) but wrapping gives 7 ([3, -1, 4, 1])
        assertEquals(7, MaxCircularSubarray.maxCircularSubarraySum(nums));
    }
}
