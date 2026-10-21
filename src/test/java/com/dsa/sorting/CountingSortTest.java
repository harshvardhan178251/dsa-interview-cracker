package com.dsa.sorting;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertArrayEquals;
import static org.junit.jupiter.api.Assertions.assertEquals;

class CountingSortTest {

    @Test
    void sortsTheClassicExample() {
        assertArrayEquals(new int[]{1, 2, 2, 3, 3, 4, 8},
                CountingSort.countingSort(new int[]{4, 2, 2, 8, 3, 3, 1}));
    }

    @Test
    void sortsAnAlreadySortedArray() {
        assertArrayEquals(new int[]{1, 2, 3}, CountingSort.countingSort(new int[]{1, 2, 3}));
    }

    @Test
    void sortsAReversedArray() {
        assertArrayEquals(new int[]{1, 2, 3, 4}, CountingSort.countingSort(new int[]{4, 3, 2, 1}));
    }

    @Test
    void handlesDuplicates() {
        assertArrayEquals(new int[]{1, 1, 2, 2, 3}, CountingSort.countingSort(new int[]{2, 1, 3, 2, 1}));
    }

    @Test
    void handlesEmptyAndSingleElementArrays() {
        assertArrayEquals(new int[]{}, CountingSort.countingSort(new int[]{}));
        assertArrayEquals(new int[]{7}, CountingSort.countingSort(new int[]{7}));
    }

    @Test
    void handlesNegativeNumbers() {
        assertArrayEquals(new int[]{-3, -1, 0, 2}, CountingSort.countingSort(new int[]{2, -1, 0, -3}));
    }

    @Test
    void returnsASortedArrayOfTheSameLength() {
        assertEquals(3, CountingSort.countingSort(new int[]{3, 1, 2}).length);
    }
}
