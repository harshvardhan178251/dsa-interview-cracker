package com.dsa.twopointers;

import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

class ThreeSumTest {

    @Test
    void findsBothTriplets() {
        List<int[]> result = ThreeSum.threeSum(new int[]{-1, 0, 1, 2, -1, -4});
        assertEquals(2, result.size());
        assertTrue(contains(result, -1, -1, 2));
        assertTrue(contains(result, -1, 0, 1));
    }

    @Test
    void noTripletProducesAnEmptyResult() {
        assertTrue(ThreeSum.threeSum(new int[]{1, 2, 3}).isEmpty());
    }

    @Test
    void allZeroInputProducesOnlyOneTriplet() {
        List<int[]> result = ThreeSum.threeSum(new int[]{0, 0, 0, 0});
        assertEquals(1, result.size());
        assertTrue(contains(result, 0, 0, 0));
    }

    @Test
    void duplicatesAreNotReportedTwice() {
        List<int[]> result = ThreeSum.threeSum(new int[]{-2, 0, 0, 2, 2});
        assertEquals(1, result.size());
        assertTrue(contains(result, -2, 0, 2));
    }

    @Test
    void arrayShorterThanThreeProducesNothing() {
        assertTrue(ThreeSum.threeSum(new int[]{1, 2}).isEmpty());
    }

    @Test
    void theInputArrayIsNotModified() {
        int[] nums = {3, -1, -2, 0};
        ThreeSum.threeSum(nums);
        assertEquals(3, nums[0]);
        assertEquals(-1, nums[1]);
    }

    private static boolean contains(List<int[]> result, int a, int b, int c) {
        for (int[] triplet : result) {
            if (triplet[0] == a && triplet[1] == b && triplet[2] == c) {
                return true;
            }
        }
        return false;
    }
}
