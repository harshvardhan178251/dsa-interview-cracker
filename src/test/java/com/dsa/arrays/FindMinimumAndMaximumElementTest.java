package com.dsa.arrays;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertArrayEquals;

class FindMinimumAndMaximumElementTest {

    @Test
    void findsBothExtremes() {
        assertArrayEquals(new int[]{-5, 8},
                FindMinimumAndMaximumElement.minAndMax(new int[]{3, -1, 8, 8, 0, -5}));
    }

    @Test
    void handlesASingleElement() {
        assertArrayEquals(new int[]{4, 4}, FindMinimumAndMaximumElement.minAndMax(new int[]{4}));
    }

    @Test
    void handlesAllEqualValues() {
        assertArrayEquals(new int[]{7, 7}, FindMinimumAndMaximumElement.minAndMax(new int[]{7, 7, 7}));
    }

    @Test
    void handlesAllNegativeValues() {
        assertArrayEquals(new int[]{-9, -1},
                FindMinimumAndMaximumElement.minAndMax(new int[]{-3, -9, -1}));
    }

    @Test
    void handlesAllPositiveValues() {
        assertArrayEquals(new int[]{1, 9},
                FindMinimumAndMaximumElement.minAndMax(new int[]{5, 1, 9}));
    }

    @Test
    void handlesZeros() {
        assertArrayEquals(new int[]{0, 0}, FindMinimumAndMaximumElement.minAndMax(new int[]{0, 0}));
    }
}
