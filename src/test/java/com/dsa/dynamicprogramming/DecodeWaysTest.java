package com.dsa.dynamicprogramming;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class DecodeWaysTest {

    @Test
    void classicExample() {
        assertEquals(3, DecodeWays.decodeWays("226"));
    }

    @Test
    void singleDigit() {
        assertEquals(0, DecodeWays.decodeWays("0"));
        assertEquals(1, DecodeWays.decodeWays("9"));
    }

    @Test
    void leadingZeroIsInvalid() {
        assertEquals(0, DecodeWays.decodeWays("06"));
    }

    @Test
    void zeroOnlyAsPartOfTenOrTwenty() {
        assertEquals(1, DecodeWays.decodeWays("10"));
        assertEquals(1, DecodeWays.decodeWays("20"));
        assertEquals(0, DecodeWays.decodeWays("30"));
    }

    @Test
    void fullAlphabetRange() {
        assertEquals(2, DecodeWays.decodeWays("26"));
        assertEquals(1, DecodeWays.decodeWays("27"));
    }

    @Test
    void longerString() {
        assertEquals(5, DecodeWays.decodeWays("1111"));
    }
}
