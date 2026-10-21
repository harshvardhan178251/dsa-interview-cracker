package com.dsa.heaps;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class KthSmallestElementTest {

    @Test
    void findsTheKthSmallestElement() {
        int[][] matrix = {{1, 5, 9}, {10, 11, 13}, {12, 13, 15}};
        assertEquals(13, KthSmallestElement.findKthSmallest(matrix, 8));
    }

    @Test
    void kEqualToOneReturnsTheMinimum() {
        int[][] matrix = {{1, 5, 9}, {10, 11, 13}, {12, 13, 15}};
        assertEquals(1, KthSmallestElement.findKthSmallest(matrix, 1));
    }

    @Test
    void kEqualToTheElementCountReturnsTheMaximum() {
        int[][] matrix = {{1, 5, 9}, {10, 11, 13}, {12, 13, 15}};
        assertEquals(15, KthSmallestElement.findKthSmallest(matrix, 9));
    }

    @Test
    void singleRowMatrix() {
        assertEquals(4, KthSmallestElement.findKthSmallest(new int[][]{{1, 4, 9}}, 2));
    }

    @Test
    void duplicatesCountSeparately() {
        assertEquals(2, KthSmallestElement.findKthSmallest(new int[][]{{2, 2, 2}}, 2));
    }

    @Test
    void handlesNegativeValues() {
        assertEquals(-3, KthSmallestElement.findKthSmallest(new int[][]{{-1, -5, -3}}, 2));
    }

    @Test
    void outOfRangeKReturnsSentinel() {
        assertEquals(-1, KthSmallestElement.findKthSmallest(new int[][]{{1, 2}}, 5));
        assertEquals(-1, KthSmallestElement.findKthSmallest(new int[][]{{1, 2}}, 0));
    }
}
