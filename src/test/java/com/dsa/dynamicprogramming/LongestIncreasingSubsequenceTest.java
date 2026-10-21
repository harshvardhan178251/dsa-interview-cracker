package com.dsa.dynamicprogramming;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class LongestIncreasingSubsequenceTest {

    @Test
    void classicExample() {
        assertEquals(4, LongestIncreasingSubsequence.lengthOfLIS(new int[]{10, 9, 2, 5, 3, 7, 101, 18}));
    }

    @Test
    void strictlyDecreasingArrayHasLengthOne() {
        assertEquals(1, LongestIncreasingSubsequence.lengthOfLIS(new int[]{5, 4, 3, 2, 1}));
    }

    @Test
    void strictlyIncreasingArrayIsFullyTaken() {
        assertEquals(5, LongestIncreasingSubsequence.lengthOfLIS(new int[]{1, 2, 3, 4, 5}));
    }

    @Test
    void emptyArray() {
        assertEquals(0, LongestIncreasingSubsequence.lengthOfLIS(new int[]{}));
    }

    @Test
    void duplicatesDoNotExtendTheSequence() {
        assertEquals(1, LongestIncreasingSubsequence.lengthOfLIS(new int[]{2, 2, 2}));
    }

    @Test
    void singleElement() {
        assertEquals(1, LongestIncreasingSubsequence.lengthOfLIS(new int[]{7}));
    }
}
