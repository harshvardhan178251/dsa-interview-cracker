package com.dsa.twopointers;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertArrayEquals;

class TwoSumIITest {

    @Test
    void findsThePairWithOneBasedIndices() {
        assertArrayEquals(new int[]{1, 2}, TwoSumII.twoSumII(new int[]{2, 7, 11, 15}, 9));
    }

    @Test
    void findsThePairAtTheEnds() {
        assertArrayEquals(new int[]{1, 4}, TwoSumII.twoSumII(new int[]{2, 7, 11, 15}, 17));
    }

    @Test
    void findsThePairInTheMiddle() {
        assertArrayEquals(new int[]{2, 3}, TwoSumII.twoSumII(new int[]{2, 7, 11, 15}, 18));
    }

    @Test
    void handlesNegativeValues() {
        assertArrayEquals(new int[]{1, 4}, TwoSumII.twoSumII(new int[]{-5, -2, 3, 7}, 2));
    }

    @Test
    void handlesDuplicates() {
        assertArrayEquals(new int[]{1, 2}, TwoSumII.twoSumII(new int[]{3, 3, 6}, 6));
    }

    @Test
    void twoElementsAreEnough() {
        assertArrayEquals(new int[]{1, 2}, TwoSumII.twoSumII(new int[]{1, 2}, 3));
    }

    @Test
    void noPairReturnsSentinel() {
        assertArrayEquals(new int[]{-1, -1}, TwoSumII.twoSumII(new int[]{1, 2, 3}, 100));
    }
}
