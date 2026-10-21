package com.dsa.bitmanipulation;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class CountSetBitsTest {

    @Test
    void countsTheSetBits() {
        assertEquals(3, CountSetBits.countSetBits(11));
        assertEquals(1, CountSetBits.countSetBits(128));
        assertEquals(2, CountSetBits.countSetBits(10));
    }

    @Test
    void handlesZero() {
        assertEquals(0, CountSetBits.countSetBits(0));
    }

    @Test
    void handlesOne() {
        assertEquals(1, CountSetBits.countSetBits(1));
    }

    @Test
    void handlesTheLargestSignedValue() {
        assertEquals(31, CountSetBits.countSetBits(Integer.MAX_VALUE));
    }

    @Test
    void agreesWithIntegerBitCount() {
        for (int n = 0; n <= 5000; n++) {
            assertEquals(Integer.bitCount(n), CountSetBits.countSetBits(n), "n = " + n);
        }
    }
}
