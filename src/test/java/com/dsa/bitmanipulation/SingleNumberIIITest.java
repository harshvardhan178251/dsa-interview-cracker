package com.dsa.bitmanipulation;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertArrayEquals;

class SingleNumberIIITest {

    @Test
    void findsBothUnpairedElements() {
        assertArrayEquals(new int[]{3, 5}, SingleNumberIII.singleNumberIII(new int[]{1, 2, 1, 3, 2, 5}));
    }

    @Test
    void returnsThemInAscendingOrder() {
        assertArrayEquals(new int[]{1, 2}, SingleNumberIII.singleNumberIII(new int[]{2, 1}));
        assertArrayEquals(new int[]{5, 9}, SingleNumberIII.singleNumberIII(new int[]{5, 3, 3, 9}));
    }

    @Test
    void handlesAnArrayWithOnlyTwoElements() {
        assertArrayEquals(new int[]{-4, 7}, SingleNumberIII.singleNumberIII(new int[]{7, -4}));
    }

    @Test
    void handlesNegativeValues() {
        assertArrayEquals(new int[]{-8, -3}, SingleNumberIII.singleNumberIII(new int[]{-3, 5, 5, -8}));
    }

    @Test
    void handlesZeroAsOneOfTheSingles() {
        assertArrayEquals(new int[]{0, 4}, SingleNumberIII.singleNumberIII(new int[]{4, 1, 1, 0}));
    }
}
