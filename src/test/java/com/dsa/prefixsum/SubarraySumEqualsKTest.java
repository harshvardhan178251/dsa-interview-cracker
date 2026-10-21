package com.dsa.prefixsum;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class SubarraySumEqualsKTest {

    @Test
    void countsTheSampleSubarrays() {
        assertEquals(2, SubarraySumEqualsK.subarraySum(new int[]{1, 2, 3, 4, 5}, 3));
    }

    @Test
    void countsEveryOccurrenceWithDuplicates() {
        assertEquals(2, SubarraySumEqualsK.subarraySum(new int[]{1, 1, 1}, 2));
    }

    @Test
    void countsSubarraysThatStartAtIndexZero() {
        assertEquals(1, SubarraySumEqualsK.subarraySum(new int[]{3}, 3));
    }

    @Test
    void countsZeroSumSubarrays() {
        // [1, -1], [-1, 0] and [1, -1, 0]
        assertEquals(3, SubarraySumEqualsK.subarraySum(new int[]{1, -1, 0}, 0));
    }

    @Test
    void handlesNegativeValues() {
        // only [-1, 1] sums to zero
        assertEquals(1, SubarraySumEqualsK.subarraySum(new int[]{-1, -1, 1}, 0));
    }

    @Test
    void returnsZeroWhenNothingMatches() {
        assertEquals(0, SubarraySumEqualsK.subarraySum(new int[]{1, 2, 3}, 100));
    }
}
