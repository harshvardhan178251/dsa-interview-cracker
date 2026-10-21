package com.dsa.arrays;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class MaxSubarrayTest {

    @Test
    void findsTheClassicExample() {
        assertEquals(6, MaxSubarray.maxSubarraySum(new int[]{-2, 1, -3, 4, -1, 2, 1}));
    }

    @Test
    void returnsTheOnlyElementForASingleElementArray() {
        assertEquals(-3, MaxSubarray.maxSubarraySum(new int[]{-3}));
    }

    @Test
    void returnsTheLargestElementWhenAllAreNegative() {
        assertEquals(-2, MaxSubarray.maxSubarraySum(new int[]{-8, -3, -6, -2, -5, -4}));
    }

    @Test
    void handlesAnAllPositiveArray() {
        assertEquals(15, MaxSubarray.maxSubarraySum(new int[]{1, 2, 3, 4, 5}));
    }

    @Test
    void handlesAnEmptyArray() {
        assertEquals(0, MaxSubarray.maxSubarraySum(new int[]{}));
    }

    @Test
    void handlesZerosAndDuplicates() {
        assertEquals(0, MaxSubarray.maxSubarraySum(new int[]{0, 0, 0}));
    }
}
