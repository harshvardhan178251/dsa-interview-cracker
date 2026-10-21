package com.dsa.dynamicprogramming;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class MaximumProductSubarrayTest {

    @Test
    void classicExample() {
        assertEquals(6, MaximumProductSubarray.maxProduct(new int[]{2, 3, -2, 4}));
    }

    @Test
    void singleElement() {
        assertEquals(-2, MaximumProductSubarray.maxProduct(new int[]{-2}));
    }

    @Test
    void twoNegativesMultiply() {
        assertEquals(24, MaximumProductSubarray.maxProduct(new int[]{-2, 3, -4}));
    }

    @Test
    void zeroBreaksTheProduct() {
        assertEquals(0, MaximumProductSubarray.maxProduct(new int[]{0, -2}));
    }

    @Test
    void allPositives() {
        assertEquals(24, MaximumProductSubarray.maxProduct(new int[]{2, 3, 4}));
    }
}
