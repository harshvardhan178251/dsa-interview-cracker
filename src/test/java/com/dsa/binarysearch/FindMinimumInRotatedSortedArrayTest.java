package com.dsa.binarysearch;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class FindMinimumInRotatedSortedArrayTest {

    @Test
    void findsTheMinimumAfterThePivot() {
        assertEquals(1, FindMinimumInRotatedSortedArray.findMin(new int[]{3, 4, 5, 1, 2}));
    }

    @Test
    void findsTheMinimumAtTheFirstIndex() {
        assertEquals(1, FindMinimumInRotatedSortedArray.findMin(new int[]{1, 2, 3, 4, 5}));
    }

    @Test
    void findsTheMinimumAtTheLastIndex() {
        assertEquals(1, FindMinimumInRotatedSortedArray.findMin(new int[]{2, 3, 4, 5, 1}));
    }

    @Test
    void handlesASingleElementArray() {
        assertEquals(7, FindMinimumInRotatedSortedArray.findMin(new int[]{7}));
    }

    @Test
    void handlesATwoElementArray() {
        assertEquals(1, FindMinimumInRotatedSortedArray.findMin(new int[]{2, 1}));
        assertEquals(1, FindMinimumInRotatedSortedArray.findMin(new int[]{1, 2}));
    }

    @Test
    void handlesNegativeValues() {
        assertEquals(-5, FindMinimumInRotatedSortedArray.findMin(new int[]{-3, -1, -5, -4, -2}));
    }

    @Test
    void agreesWithALinearScanOnEveryRotation() {
        int[] sorted = {-3, -1, 0, 4, 9, 12};
        for (int pivot = 0; pivot < sorted.length; pivot++) {
            int[] rotated = new int[sorted.length];
            for (int i = 0; i < sorted.length; i++) {
                rotated[i] = sorted[(i + pivot) % sorted.length];
            }
            int expected = sorted[0];
            for (int value : rotated) {
                expected = Math.min(expected, value);
            }
            assertEquals(expected, FindMinimumInRotatedSortedArray.findMin(rotated),
                    "rotation " + pivot);
        }
    }
}
