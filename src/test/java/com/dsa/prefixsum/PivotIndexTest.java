package com.dsa.prefixsum;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class PivotIndexTest {

    @Test
    void findsThePivot() {
        assertEquals(2, PivotIndex.pivotIndex(new int[]{1, 2, 3, 1, 2}));
    }

    @Test
    void returnsMinusOneWhenThereIsNoPivot() {
        assertEquals(-1, PivotIndex.pivotIndex(new int[]{1, 7, 3, 6, 5}));
    }

    @Test
    void treatsIndexZeroAsAPivotWhenTheRestSumsToZero() {
        assertEquals(0, PivotIndex.pivotIndex(new int[]{0, 1, -1}));
    }

    @Test
    void returnsZeroForASingleElement() {
        assertEquals(0, PivotIndex.pivotIndex(new int[]{5}));
    }

    @Test
    void returnsTheLeftmostPivot() {
        // index 1 and index 2 are both pivots
        assertEquals(1, PivotIndex.pivotIndex(new int[]{1, 0, 0, 1}));
    }

    @Test
    void handlesAnEmptyArray() {
        assertEquals(-1, PivotIndex.pivotIndex(new int[]{}));
    }
}
