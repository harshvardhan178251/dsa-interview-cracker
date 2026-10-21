package com.dsa.arrays;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class MaxGapTest {

    @Test
    void findsTheLargestGapAfterSorting() {
        assertEquals(3, MaxGap.maxGap(new int[]{3, 6, 9, 1, 12, 5}));
    }

    @Test
    void handlesASortedArray() {
        assertEquals(1, MaxGap.maxGap(new int[]{1, 2, 3, 4, 5}));
    }

    @Test
    void handlesAReversedArray() {
        assertEquals(1, MaxGap.maxGap(new int[]{5, 4, 3, 2, 1}));
    }

    @Test
    void handlesTwoElements() {
        assertEquals(7, MaxGap.maxGap(new int[]{1, 8}));
    }

    @Test
    void handlesAllEqualValues() {
        assertEquals(0, MaxGap.maxGap(new int[]{4, 4, 4, 4}));
    }

    @Test
    void handlesASingleElement() {
        assertEquals(0, MaxGap.maxGap(new int[]{42}));
    }

    @Test
    void handlesNegativeValues() {
        // sorted: -10, -9, -5, -4 -> gaps 1, 4, 1
        assertEquals(4, MaxGap.maxGap(new int[]{-10, -4, -5, -9}));
    }
}
