package com.dsa.heaps;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class KthLargestElementTest {

    @Test
    void findsTheKthLargestElement() {
        assertEquals(5, KthLargestElement.findKthLargest(new int[]{3, 2, 1, 5, 6, 4}, 2));
    }

    @Test
    void kEqualToOneReturnsTheMaximum() {
        assertEquals(9, KthLargestElement.findKthLargest(new int[]{3, 9, 1}, 1));
    }

    @Test
    void kEqualToTheLengthReturnsTheMinimum() {
        assertEquals(1, KthLargestElement.findKthLargest(new int[]{3, 9, 1}, 3));
    }

    @Test
    void singleElementArray() {
        assertEquals(7, KthLargestElement.findKthLargest(new int[]{7}, 1));
    }

    @Test
    void duplicatesCountSeparately() {
        assertEquals(3, KthLargestElement.findKthLargest(new int[]{3, 3, 1}, 2));
    }

    @Test
    void handlesNegativeValues() {
        assertEquals(-2, KthLargestElement.findKthLargest(new int[]{-1, -5, -2, -9}, 2));
    }

    @Test
    void outOfRangeKReturnsSentinel() {
        assertEquals(-1, KthLargestElement.findKthLargest(new int[]{1, 2, 3}, 4));
        assertEquals(-1, KthLargestElement.findKthLargest(new int[]{1, 2, 3}, 0));
        assertEquals(-1, KthLargestElement.findKthLargest(new int[0], 1));
    }
}
