package com.dsa.arrays;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertArrayEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

class TwoSumTest {

    @Test
    void findsPairAtTheStart() {
        assertArrayEquals(new int[]{0, 1}, TwoSum.twoSum(new int[]{2, 7, 11, 15}, 9));
    }

    @Test
    void findsPairInTheMiddle() {
        assertArrayEquals(new int[]{1, 2}, TwoSum.twoSum(new int[]{3, 2, 4}, 6));
    }

    @Test
    void handlesDuplicatesWithoutReusingAnElement() {
        assertArrayEquals(new int[]{0, 1}, TwoSum.twoSum(new int[]{3, 3}, 6));
    }

    @Test
    void handlesNegativeNumbers() {
        assertArrayEquals(new int[]{0, 2}, TwoSum.twoSum(new int[]{-3, 4, 3}, 0));
    }

    @Test
    void returnsSentinelWhenNoPairExists() {
        assertArrayEquals(new int[]{-1, -1}, TwoSum.twoSum(new int[]{1, 2, 3}, 100));
    }

    @Test
    void resultIndicesAlwaysPointAtAValidPair() {
        int[] nums = {5, 75, 25};
        int[] answer = TwoSum.twoSum(nums, 100);
        assertTrue(answer[0] >= 0 && answer[1] >= 0);
        assertArrayEquals(new int[]{1, 2}, answer);
    }
}
