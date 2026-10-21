package com.dsa.sorting;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertArrayEquals;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;

class SortArrayByParityTest {

    @Test
    void movesEveryEvenBeforeEveryOdd() {
        assertArrayEquals(new int[]{4, 2, 1, 3}, SortArrayByParity.sortArrayByParity(new int[]{3, 1, 2, 4}));
    }

    @Test
    void handlesAnAlreadySortedArray() {
        assertArrayEquals(new int[]{2, 4, 1, 3}, SortArrayByParity.sortArrayByParity(new int[]{2, 4, 1, 3}));
    }

    @Test
    void handlesOnlyEvenNumbers() {
        assertArrayEquals(new int[]{2, 4, 6}, SortArrayByParity.sortArrayByParity(new int[]{2, 4, 6}));
    }

    @Test
    void handlesOnlyOddNumbers() {
        assertArrayEquals(new int[]{1, 3, 5}, SortArrayByParity.sortArrayByParity(new int[]{1, 3, 5}));
    }

    @Test
    void handlesEmptyAndSingleElementArrays() {
        assertArrayEquals(new int[]{}, SortArrayByParity.sortArrayByParity(new int[]{}));
        assertArrayEquals(new int[]{4}, SortArrayByParity.sortArrayByParity(new int[]{4}));
    }

    @Test
    void handlesNegativeNumbers() {
        // -4 and -2 are even, -3 and -1 are odd.
        int[] result = SortArrayByParity.sortArrayByParity(new int[]{-3, -1, -2, -4});
        assertEquals(4, result.length);
        assertEquals(0, result[0] % 2);
        assertEquals(0, result[1] % 2);
        assertNotEquals(0, result[2] % 2);
        assertNotEquals(0, result[3] % 2);
    }

    @Test
    void sortsInPlaceAndReturnsTheSameArray() {
        int[] nums = {3, 1, 2};
        assertEquals(3, SortArrayByParity.sortArrayByParity(nums).length);
        assertArrayEquals(new int[]{2, 1, 3}, nums);
    }
}
