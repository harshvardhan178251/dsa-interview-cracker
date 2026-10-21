package com.dsa.binarysearch;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class BinarySearchTest {

    @Test
    void findsTargetInTheMiddle() {
        assertEquals(4, BinarySearch.search(new int[]{-1, 0, 3, 5, 9, 12}, 9));
    }

    @Test
    void findsTargetAtTheFirstPosition() {
        assertEquals(0, BinarySearch.search(new int[]{-1, 0, 3, 5, 9, 12}, -1));
    }

    @Test
    void findsTargetAtTheLastPosition() {
        assertEquals(5, BinarySearch.search(new int[]{-1, 0, 3, 5, 9, 12}, 12));
    }

    @Test
    void handlesASingleElementArray() {
        assertEquals(0, BinarySearch.search(new int[]{7}, 7));
        assertEquals(-1, BinarySearch.search(new int[]{7}, 8));
    }

    @Test
    void returnsMinusOneWhenTargetIsAbsent() {
        assertEquals(-1, BinarySearch.search(new int[]{-1, 0, 3, 5, 9, 12}, 4));
    }

    @Test
    void returnsMinusOneForAnEmptyArray() {
        assertEquals(-1, BinarySearch.search(new int[]{}, 3));
    }

    @Test
    void handlesNegativeTargets() {
        assertEquals(1, BinarySearch.search(new int[]{-5, -3, -1, 2, 4}, -3));
    }

    @Test
    void findsTargetInALargeArray() {
        int[] nums = new int[100_000];
        for (int i = 0; i < nums.length; i++) {
            nums[i] = i * 2;
        }
        assertEquals(49_999, BinarySearch.search(nums, 99_998));
        assertEquals(-1, BinarySearch.search(nums, 99_999));
    }
}
