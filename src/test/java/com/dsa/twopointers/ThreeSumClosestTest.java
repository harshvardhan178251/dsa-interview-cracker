package com.dsa.twopointers;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class ThreeSumClosestTest {

    @Test
    void findsTheClosestSum() {
        assertEquals(2, ThreeSumClosest.threeSumClosest(new int[]{-1, 2, 1, -4}, 1));
    }

    @Test
    void exactMatchIsReturnedImmediately() {
        assertEquals(6, ThreeSumClosest.threeSumClosest(new int[]{1, 2, 3}, 6));
    }

    @Test
    void threeElementsOnly() {
        assertEquals(6, ThreeSumClosest.threeSumClosest(new int[]{1, 2, 3}, 100));
    }

    @Test
    void allNegativeValues() {
        assertEquals(-6, ThreeSumClosest.threeSumClosest(new int[]{-3, -2, -1}, 0));
    }

    @Test
    void allPositiveValues() {
        assertEquals(13, ThreeSumClosest.threeSumClosest(new int[]{1, 2, 5, 7}, 13));
    }

    @Test
    void handlesDuplicates() {
        // the only sums are 0 and 1 - the closest to 2 is 1
        assertEquals(1, ThreeSumClosest.threeSumClosest(new int[]{0, 0, 0, 1}, 2));
    }

    @Test
    void theInputArrayIsNotModified() {
        int[] nums = {-1, 2, 1, -4};
        ThreeSumClosest.threeSumClosest(nums, 1);
        assertEquals(-1, nums[0]);
        assertEquals(2, nums[1]);
    }
}
