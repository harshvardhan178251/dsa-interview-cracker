package com.dsa.twopointers;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class MaximumDifferenceBetweenTwoElementsTest {

    @Test
    void findsTheMaximumDifference() {
        assertEquals(8, MaximumDifferenceBetweenTwoElements.maximumDifference(new int[]{7, 1, 5, 3, 6, 9, 2}));
    }

    @Test
    void twoElements() {
        assertEquals(4, MaximumDifferenceBetweenTwoElements.maximumDifference(new int[]{1, 5}));
    }

    @Test
    void strictlyDecreasingArrayHasNoPositiveDifference() {
        assertEquals(-1, MaximumDifferenceBetweenTwoElements.maximumDifference(new int[]{9, 4, 3, 2}));
    }

    @Test
    void equalValuesHaveNoPositiveDifference() {
        assertEquals(-1, MaximumDifferenceBetweenTwoElements.maximumDifference(new int[]{4, 4, 4}));
    }

    @Test
    void strictlyIncreasingArray() {
        assertEquals(9, MaximumDifferenceBetweenTwoElements.maximumDifference(new int[]{1, 2, 3, 10}));
    }

    @Test
    void singleElementHasNoPair() {
        assertEquals(-1, MaximumDifferenceBetweenTwoElements.maximumDifference(new int[]{5}));
    }

    @Test
    void theMinimumMayComeLast() {
        // the smallest value 1 is at the end, so the best pair is 7 - 3
        assertEquals(4, MaximumDifferenceBetweenTwoElements.maximumDifference(new int[]{3, 7, 1}));
    }
}
