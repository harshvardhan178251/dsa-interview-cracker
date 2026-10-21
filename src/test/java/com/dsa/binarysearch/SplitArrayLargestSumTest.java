package com.dsa.binarysearch;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

class SplitArrayLargestSumTest {

    @Test
    void findsTheMinimumLargestSum() {
        assertEquals(18, SplitArrayLargestSum.splitArray(new int[]{7, 2, 5, 10, 8}, 2));
    }

    @Test
    void handlesOneGroup() {
        assertEquals(32, SplitArrayLargestSum.splitArray(new int[]{7, 2, 5, 10, 8}, 1));
    }

    @Test
    void handlesOneGroupPerElement() {
        assertEquals(10, SplitArrayLargestSum.splitArray(new int[]{7, 2, 5, 10, 8}, 5));
    }

    @Test
    void handlesASingleElement() {
        assertEquals(9, SplitArrayLargestSum.splitArray(new int[]{9}, 1));
    }

    @Test
    void handlesZeroes() {
        assertEquals(0, SplitArrayLargestSum.splitArray(new int[]{0, 0, 0}, 2));
    }

    @Test
    void theAnswerIsNeverBelowTheLargestElement() {
        int[] nums = {4, 9, 3, 7, 1};
        for (int k = 1; k <= nums.length; k++) {
            int answer = SplitArrayLargestSum.splitArray(nums, k);
            assertTrue(answer >= 9, "k = " + k);
        }
    }
}
