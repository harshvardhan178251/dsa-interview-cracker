package com.dsa.arrays;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class MaximumWidthRampTest {

    @Test
    void findsTheWidestRamp() {
        assertEquals(3, MaximumWidthRamp.maxWidthRamp(new int[]{3, 1, 3, 4, 2}));
    }

    @Test
    void returnsZeroWhenTheArrayIsStrictlyDecreasing() {
        assertEquals(0, MaximumWidthRamp.maxWidthRamp(new int[]{5, 4, 3, 2, 1}));
    }

    @Test
    void returnsZeroForASingleElement() {
        assertEquals(0, MaximumWidthRamp.maxWidthRamp(new int[]{7}));
    }

    @Test
    void handlesASortedArray() {
        assertEquals(4, MaximumWidthRamp.maxWidthRamp(new int[]{1, 2, 3, 4, 5}));
    }

    @Test
    void handlesEqualValues() {
        assertEquals(3, MaximumWidthRamp.maxWidthRamp(new int[]{2, 2, 2, 2}));
    }

    @Test
    void handlesAnEmptyArray() {
        assertEquals(0, MaximumWidthRamp.maxWidthRamp(new int[]{}));
    }
}
