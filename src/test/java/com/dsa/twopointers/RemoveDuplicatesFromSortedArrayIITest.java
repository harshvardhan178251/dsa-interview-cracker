package com.dsa.twopointers;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertArrayEquals;
import static org.junit.jupiter.api.Assertions.assertEquals;

class RemoveDuplicatesFromSortedArrayIITest {

    @Test
    void keepsAtMostTwoCopiesOfEveryValue() {
        int[] nums = {1, 1, 1, 2, 2, 3};
        int k = RemoveDuplicatesFromSortedArrayII.removeDuplicates(nums);
        assertEquals(5, k);
        assertArrayEquals(new int[]{1, 1, 2, 2, 3}, new int[]{nums[0], nums[1], nums[2], nums[3], nums[4]});
    }

    @Test
    void longRunIsTruncatedToTwo() {
        int[] nums = {0, 0, 1, 1, 1, 1, 2, 3, 3};
        int k = RemoveDuplicatesFromSortedArrayII.removeDuplicates(nums);
        assertEquals(7, k);
        assertArrayEquals(new int[]{0, 0, 1, 1, 2, 3, 3},
                new int[]{nums[0], nums[1], nums[2], nums[3], nums[4], nums[5], nums[6]});
    }

    @Test
    void arrayWithoutDuplicatesIsUnchanged() {
        int[] nums = {1, 2, 3};
        assertEquals(3, RemoveDuplicatesFromSortedArrayII.removeDuplicates(nums));
        assertArrayEquals(new int[]{1, 2, 3}, nums);
    }

    @Test
    void allElementsAreEqual() {
        int[] nums = {9, 9, 9, 9, 9};
        assertEquals(2, RemoveDuplicatesFromSortedArrayII.removeDuplicates(nums));
    }

    @Test
    void singleElement() {
        int[] nums = {5};
        assertEquals(1, RemoveDuplicatesFromSortedArrayII.removeDuplicates(nums));
    }

    @Test
    void emptyArray() {
        assertEquals(0, RemoveDuplicatesFromSortedArrayII.removeDuplicates(new int[0]));
    }

    @Test
    void negativeValuesAreSupported() {
        int[] nums = {-2, -2, -2, -1, 0};
        int k = RemoveDuplicatesFromSortedArrayII.removeDuplicates(nums);
        assertEquals(4, k);
        assertArrayEquals(new int[]{-2, -2, -1, 0}, new int[]{nums[0], nums[1], nums[2], nums[3]});
    }
}
