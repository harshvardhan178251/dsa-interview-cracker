package com.dsa.twopointers;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertArrayEquals;

class SquaresOfSortedArrayTest {

    @Test
    void squaresAreReturnedInIncreasingOrder() {
        assertArrayEquals(new int[]{0, 1, 9, 16, 100},
                SquaresOfSortedArray.sortedSquares(new int[]{-4, -1, 0, 3, 10}));
    }

    @Test
    void allNegativeValues() {
        assertArrayEquals(new int[]{1, 4, 9},
                SquaresOfSortedArray.sortedSquares(new int[]{-3, -2, -1}));
    }

    @Test
    void allPositiveValues() {
        assertArrayEquals(new int[]{1, 4, 9},
                SquaresOfSortedArray.sortedSquares(new int[]{1, 2, 3}));
    }

    @Test
    void singleElement() {
        assertArrayEquals(new int[]{16}, SquaresOfSortedArray.sortedSquares(new int[]{-4}));
    }

    @Test
    void zeroInTheMiddle() {
        assertArrayEquals(new int[]{0, 0, 1, 1},
                SquaresOfSortedArray.sortedSquares(new int[]{-1, 0, 0, 1}));
    }

    @Test
    void emptyArrayProducesAnEmptyResult() {
        assertArrayEquals(new int[0], SquaresOfSortedArray.sortedSquares(new int[0]));
    }

    @Test
    void symmetricValues() {
        assertArrayEquals(new int[]{1, 1, 4, 4},
                SquaresOfSortedArray.sortedSquares(new int[]{-2, -1, 1, 2}));
    }
}
