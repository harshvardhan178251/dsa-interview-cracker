package com.dsa.prefixsum;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertArrayEquals;

class ProductExceptSelfTest {

    @Test
    void computesTheProductExceptSelf() {
        assertArrayEquals(new int[]{24, 12, 8, 6}, ProductExceptSelf.productExceptSelf(new int[]{1, 2, 3, 4}));
    }

    @Test
    void handlesTwoElements() {
        assertArrayEquals(new int[]{4, 2}, ProductExceptSelf.productExceptSelf(new int[]{2, 4}));
    }

    @Test
    void handlesAZeroWithoutDividing() {
        assertArrayEquals(new int[]{0, 12, 0, 0}, ProductExceptSelf.productExceptSelf(new int[]{1, 0, 3, 4}));
    }

    @Test
    void handlesASingleElement() {
        assertArrayEquals(new int[]{1}, ProductExceptSelf.productExceptSelf(new int[]{7}));
    }

    @Test
    void handlesAnEmptyArray() {
        assertArrayEquals(new int[]{}, ProductExceptSelf.productExceptSelf(new int[]{}));
    }

    @Test
    void doesNotModifyTheInput() {
        int[] nums = {1, 2, 3, 4};
        ProductExceptSelf.productExceptSelf(nums);
        assertArrayEquals(new int[]{1, 2, 3, 4}, nums);
    }
}
