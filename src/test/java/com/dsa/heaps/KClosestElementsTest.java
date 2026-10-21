package com.dsa.heaps;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertArrayEquals;

class KClosestElementsTest {

    @Test
    void findsTheClosestElements() {
        assertArrayEquals(new int[]{4, 8, 9, 15},
                KClosestElements.kClosestElements(new int[]{1, 2, 4, 8, 9, 15, 16}, 4, 10));
    }

    @Test
    void kEqualToOneReturnsTheNearestValue() {
        assertArrayEquals(new int[]{9},
                KClosestElements.kClosestElements(new int[]{1, 2, 4, 8, 9, 15, 16}, 1, 10));
    }

    @Test
    void resultIsSortedInIncreasingOrder() {
        int[] answer = KClosestElements.kClosestElements(new int[]{1, 2, 4, 8, 9, 15, 16}, 3, 10);
        assertArrayEquals(new int[]{8, 9, 15}, answer);
    }

    @Test
    void exactMatchIsIncluded() {
        assertArrayEquals(new int[]{5, 6},
                KClosestElements.kClosestElements(new int[]{1, 5, 6, 20}, 2, 5));
    }

    @Test
    void tiesKeepTheSmallerValue() {
        assertArrayEquals(new int[]{1, 2},
                KClosestElements.kClosestElements(new int[]{1, 2, 3}, 2, 2));
    }

    @Test
    void singleElementArray() {
        assertArrayEquals(new int[]{7}, KClosestElements.kClosestElements(new int[]{7}, 1, 0));
    }

    @Test
    void kEqualToTheArrayLengthReturnsEverything() {
        assertArrayEquals(new int[]{1, 2, 3},
                KClosestElements.kClosestElements(new int[]{1, 2, 3}, 3, 2));
    }
}
