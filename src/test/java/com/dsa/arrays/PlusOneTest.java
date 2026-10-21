package com.dsa.arrays;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertArrayEquals;

class PlusOneTest {

    @Test
    void incrementsTheLastDigit() {
        assertArrayEquals(new int[]{1, 2, 3, 5}, PlusOne.plusOne(new int[]{1, 2, 3, 4}));
    }

    @Test
    void carriesOverATrailingNine() {
        assertArrayEquals(new int[]{1, 3, 0}, PlusOne.plusOne(new int[]{1, 2, 9}));
    }

    @Test
    void growsTheArrayWhenEveryDigitIsNine() {
        assertArrayEquals(new int[]{1, 0, 0, 0}, PlusOne.plusOne(new int[]{9, 9, 9}));
    }

    @Test
    void handlesASingleDigit() {
        assertArrayEquals(new int[]{1}, PlusOne.plusOne(new int[]{0}));
        assertArrayEquals(new int[]{1, 0}, PlusOne.plusOne(new int[]{9}));
    }

    @Test
    void doesNotModifyTheInput() {
        int[] digits = {1, 2, 9};
        PlusOne.plusOne(digits);
        assertArrayEquals(new int[]{1, 2, 9}, digits);
    }
}
