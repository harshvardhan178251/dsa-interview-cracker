package com.dsa.bitmanipulation;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertArrayEquals;
import static org.junit.jupiter.api.Assertions.assertEquals;

class NumberOfSetBitsTest {

    @Test
    void countsTheBitsOfEveryValue() {
        assertArrayEquals(new int[]{0, 1, 1, 2, 1, 2}, NumberOfSetBits.countBits(5));
    }

    @Test
    void handlesZero() {
        assertArrayEquals(new int[]{0}, NumberOfSetBits.countBits(0));
    }

    @Test
    void handlesOne() {
        assertArrayEquals(new int[]{0, 1}, NumberOfSetBits.countBits(1));
    }

    @Test
    void handlesSeven() {
        assertArrayEquals(new int[]{0, 1, 1, 2, 1, 2, 2, 3}, NumberOfSetBits.countBits(7));
    }

    @Test
    void agreesWithIntegerBitCountForEveryValue() {
        int[] counts = NumberOfSetBits.countBits(1000);
        for (int i = 0; i < counts.length; i++) {
            assertEquals(Integer.bitCount(i), counts[i], "i = " + i);
        }
    }
}
