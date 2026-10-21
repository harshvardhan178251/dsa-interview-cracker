package com.dsa.heaps;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class MedianOfTwoSortedArraysTest {

    @Test
    void oddTotalUsesTheMiddleValue() {
        assertEquals(2.0, MedianOfTwoSortedArrays.findMedianSortedArrays(new int[]{1, 3}, new int[]{2}));
    }

    @Test
    void evenTotalAveragesTheTwoMiddles() {
        assertEquals(2.5, MedianOfTwoSortedArrays.findMedianSortedArrays(new int[]{1, 2}, new int[]{3, 4}));
    }

    @Test
    void oneArrayIsEmpty() {
        assertEquals(2.0, MedianOfTwoSortedArrays.findMedianSortedArrays(new int[]{1, 2, 3}, new int[0]));
    }

    @Test
    void theOtherArrayIsEmpty() {
        assertEquals(2.0, MedianOfTwoSortedArrays.findMedianSortedArrays(new int[0], new int[]{1, 2, 3}));
    }

    @Test
    void bothArraysHaveOneElement() {
        assertEquals(1.5, MedianOfTwoSortedArrays.findMedianSortedArrays(new int[]{1}, new int[]{2}));
    }

    @Test
    void handlesDuplicateValues() {
        assertEquals(2.0, MedianOfTwoSortedArrays.findMedianSortedArrays(new int[]{2, 2}, new int[]{2, 2}));
    }

    @Test
    void handlesNegativeValues() {
        assertEquals(-2.0, MedianOfTwoSortedArrays.findMedianSortedArrays(new int[]{-3, -1}, new int[]{-2}));
    }

    @Test
    void formatsTheMedianForPrinting() {
        assertEquals("2.0", MedianOfTwoSortedArrays.formatMedian(2.0));
        assertEquals("2.5", MedianOfTwoSortedArrays.formatMedian(2.5));
    }
}
