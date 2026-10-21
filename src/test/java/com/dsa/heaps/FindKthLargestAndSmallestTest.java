package com.dsa.heaps;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertArrayEquals;

class FindKthLargestAndSmallestTest {

    @Test
    void reportsBothEndsOfTheRanking() {
        assertArrayEquals(new int[]{7, 4},
                FindKthLargestAndSmallest.findKthLargestAndSmallest(new int[]{9, 4, 7, 1, 8, 3, 6}, 3));
    }

    @Test
    void kEqualToOneReportsTheMaximumAndTheMinimum() {
        assertArrayEquals(new int[]{9, 1},
                FindKthLargestAndSmallest.findKthLargestAndSmallest(new int[]{9, 4, 7, 1, 8, 3, 6}, 1));
    }

    @Test
    void kEqualToTheLengthReportsTheMinimumAndTheMaximum() {
        assertArrayEquals(new int[]{1, 9},
                FindKthLargestAndSmallest.findKthLargestAndSmallest(new int[]{9, 4, 7, 1, 8, 3, 6}, 7));
    }

    @Test
    void duplicatesCountSeparately() {
        assertArrayEquals(new int[]{2, 2},
                FindKthLargestAndSmallest.findKthLargestAndSmallest(new int[]{2, 2, 2}, 2));
    }

    @Test
    void singleElementArray() {
        assertArrayEquals(new int[]{5, 5},
                FindKthLargestAndSmallest.findKthLargestAndSmallest(new int[]{5}, 1));
    }

    @Test
    void handlesNegativeValues() {
        // sorted: -5, -3, -1  ->  the 2nd largest and the 2nd smallest are both -3
        assertArrayEquals(new int[]{-3, -3},
                FindKthLargestAndSmallest.findKthLargestAndSmallest(new int[]{-1, -5, -3}, 2));
    }

    @Test
    void outOfRangeKReturnsSentinels() {
        assertArrayEquals(new int[]{-1, -1},
                FindKthLargestAndSmallest.findKthLargestAndSmallest(new int[]{1, 2}, 3));
    }
}
