package com.dsa.sorting;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertArrayEquals;
import static org.junit.jupiter.api.Assertions.assertEquals;

class DutchNationalFlagTest {

    @Test
    void sortsTheClassicExample() {
        assertArrayEquals(new int[]{0, 0, 1, 1, 2, 2},
                DutchNationalFlag.dutchNationalFlag(new int[]{2, 0, 2, 1, 1, 0}));
    }

    @Test
    void handlesAnAlreadySortedArray() {
        assertArrayEquals(new int[]{0, 0, 1, 2},
                DutchNationalFlag.dutchNationalFlag(new int[]{0, 0, 1, 2}));
    }

    @Test
    void handlesAReversedArray() {
        assertArrayEquals(new int[]{0, 0, 1, 2},
                DutchNationalFlag.dutchNationalFlag(new int[]{2, 1, 0, 0}));
    }

    @Test
    void handlesOnlyZeros() {
        assertArrayEquals(new int[]{0, 0, 0}, DutchNationalFlag.dutchNationalFlag(new int[]{0, 0, 0}));
    }

    @Test
    void handlesOnlyTwos() {
        assertArrayEquals(new int[]{2, 2, 2}, DutchNationalFlag.dutchNationalFlag(new int[]{2, 2, 2}));
    }

    @Test
    void handlesEmptyAndSingleElementArrays() {
        assertArrayEquals(new int[]{}, DutchNationalFlag.dutchNationalFlag(new int[]{}));
        assertArrayEquals(new int[]{1}, DutchNationalFlag.dutchNationalFlag(new int[]{1}));
    }

    @Test
    void sortsInPlaceAndReturnsTheSameArray() {
        int[] nums = {2, 0, 1};
        assertEquals(3, DutchNationalFlag.dutchNationalFlag(nums).length);
        assertArrayEquals(new int[]{0, 1, 2}, nums);
    }
}
