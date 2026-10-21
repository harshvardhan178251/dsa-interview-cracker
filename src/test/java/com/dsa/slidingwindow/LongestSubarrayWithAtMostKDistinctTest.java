package com.dsa.slidingwindow;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

class LongestSubarrayWithAtMostKDistinctTest {

    @Test
    void findsTheLongestSubarray() {
        assertEquals(4, LongestSubarrayWithAtMostKDistinct.longestSubarray(new int[]{2, 1, 2, 2, 3}, 2));
    }

    @Test
    void handlesTheSecondLeetCodeExample() {
        // Neither [2,1,2,3] nor [1,2,3,3] has at most two distinct values.
        assertEquals(3, LongestSubarrayWithAtMostKDistinct.longestSubarray(new int[]{2, 1, 2, 3, 3}, 2));
    }

    @Test
    void handlesKEqualToOne() {
        assertEquals(3, LongestSubarrayWithAtMostKDistinct.longestSubarray(new int[]{1, 1, 1, 2, 2}, 1));
    }

    @Test
    void handlesKEqualToTheNumberOfDistinctValues() {
        assertEquals(5, LongestSubarrayWithAtMostKDistinct.longestSubarray(new int[]{1, 2, 3, 4, 5}, 5));
    }

    @Test
    void handlesAnEmptyArray() {
        assertEquals(0, LongestSubarrayWithAtMostKDistinct.longestSubarray(new int[]{}, 2));
    }

    @Test
    void handlesASingleElementArray() {
        assertEquals(1, LongestSubarrayWithAtMostKDistinct.longestSubarray(new int[]{9}, 1));
    }

    @Test
    void moreDistinctValuesNeverShortenTheAnswer() {
        int[] nums = {2, 1, 2, 2, 3};
        int previous = 0;
        for (int k = 1; k <= 4; k++) {
            int answer = LongestSubarrayWithAtMostKDistinct.longestSubarray(nums, k);
            assertTrue(answer >= previous, "k = " + k);
            previous = answer;
        }
    }
}
