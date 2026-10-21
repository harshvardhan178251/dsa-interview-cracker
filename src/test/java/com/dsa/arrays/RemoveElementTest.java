package com.dsa.arrays;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertArrayEquals;
import static org.junit.jupiter.api.Assertions.assertEquals;

class RemoveElementTest {

    @Test
    void removesEveryOccurrence() {
        int[] nums = {3, 2, 2, 3, 4};
        assertEquals(3, RemoveElement.removeElement(nums, 2));
        assertArrayEquals(new int[]{3, 3, 4}, new int[]{nums[0], nums[1], nums[2]});
    }

    @Test
    void keepsTheOrderOfTheSurvivors() {
        int[] nums = {5, 1, 4, 1, 5};
        RemoveElement.removeElement(nums, 1);
        assertArrayEquals(new int[]{5, 4, 5}, new int[]{nums[0], nums[1], nums[2]});
    }

    @Test
    void returnsTheLengthWhenNothingIsRemoved() {
        int[] nums = {1, 2, 3};
        assertEquals(3, RemoveElement.removeElement(nums, 9));
    }

    @Test
    void returnsZeroWhenEverythingIsRemoved() {
        int[] nums = {7, 7, 7};
        assertEquals(0, RemoveElement.removeElement(nums, 7));
    }

    @Test
    void handlesAnEmptyArray() {
        assertEquals(0, RemoveElement.removeElement(new int[]{}, 3));
    }
}
