package com.dsa.twopointers;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertArrayEquals;
import static org.junit.jupiter.api.Assertions.assertEquals;

class RemoveDuplicatesFromSortedArrayTest {

    @Test
    void removesTheDuplicatesInPlace() {
        int[] nums = {0, 0, 1, 1, 1, 2};
        int k = RemoveDuplicatesFromSortedArray.removeDuplicates(nums);
        assertEquals(3, k);
        assertArrayEquals(new int[]{0, 1, 2}, new int[]{nums[0], nums[1], nums[2]});
    }

    @Test
    void arrayWithoutDuplicatesIsUnchanged() {
        int[] nums = {1, 2, 3};
        assertEquals(3, RemoveDuplicatesFromSortedArray.removeDuplicates(nums));
        assertArrayEquals(new int[]{1, 2, 3}, nums);
    }

    @Test
    void allElementsAreEqual() {
        int[] nums = {4, 4, 4, 4};
        assertEquals(1, RemoveDuplicatesFromSortedArray.removeDuplicates(nums));
        assertEquals(4, nums[0]);
    }

    @Test
    void singleElement() {
        int[] nums = {7};
        assertEquals(1, RemoveDuplicatesFromSortedArray.removeDuplicates(nums));
    }

    @Test
    void emptyArray() {
        assertEquals(0, RemoveDuplicatesFromSortedArray.removeDuplicates(new int[0]));
    }

    @Test
    void negativeValuesAreSupported() {
        int[] nums = {-3, -3, -1, 0, 0, 2};
        int k = RemoveDuplicatesFromSortedArray.removeDuplicates(nums);
        assertEquals(4, k);
        assertArrayEquals(new int[]{-3, -1, 0, 2}, new int[]{nums[0], nums[1], nums[2], nums[3]});
    }
}
