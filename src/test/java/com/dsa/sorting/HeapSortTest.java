package com.dsa.sorting;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertArrayEquals;
import static org.junit.jupiter.api.Assertions.assertEquals;

class HeapSortTest {

    @Test
    void sortsTheClassicExample() {
        assertArrayEquals(new int[]{1, 2, 4, 5, 6}, HeapSort.heapSort(new int[]{5, 2, 4, 6, 1}));
    }

    @Test
    void sortsAnAlreadySortedArray() {
        assertArrayEquals(new int[]{1, 2, 3}, HeapSort.heapSort(new int[]{1, 2, 3}));
    }

    @Test
    void sortsAReversedArray() {
        assertArrayEquals(new int[]{1, 2, 3, 4}, HeapSort.heapSort(new int[]{4, 3, 2, 1}));
    }

    @Test
    void handlesDuplicates() {
        assertArrayEquals(new int[]{1, 1, 2, 2, 3}, HeapSort.heapSort(new int[]{2, 1, 3, 2, 1}));
    }

    @Test
    void handlesEmptyAndSingleElementArrays() {
        assertArrayEquals(new int[]{}, HeapSort.heapSort(new int[]{}));
        assertArrayEquals(new int[]{7}, HeapSort.heapSort(new int[]{7}));
    }

    @Test
    void handlesNegativeNumbers() {
        assertArrayEquals(new int[]{-3, -1, 0, 2}, HeapSort.heapSort(new int[]{2, -1, 0, -3}));
    }

    @Test
    void sortsInPlaceAndReturnsTheSameArray() {
        int[] nums = {3, 1, 2};
        assertEquals(3, HeapSort.heapSort(nums).length);
        assertArrayEquals(new int[]{1, 2, 3}, nums);
    }
}
