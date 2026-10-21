package com.dsa.bitmanipulation;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class ReverseBitsTest {

    @Test
    void reversesTheBits() {
        assertEquals(964176192L, ReverseBits.reverseBits(43261596));
    }

    @Test
    void handlesTheAllOnesExceptTheLastBitCase() {
        assertEquals(3221225471L, ReverseBits.reverseBits(-3));
    }

    @Test
    void reversingTwiceReturnsTheOriginal() {
        for (int n : new int[]{0, 1, 2, 5, 43261596, 123456789}) {
            long once = ReverseBits.reverseBits(n);
            assertEquals(n, (int) ReverseBits.reverseBits((int) once), "n = " + n);
        }
    }

    @Test
    void handlesZero() {
        assertEquals(0L, ReverseBits.reverseBits(0));
    }

    @Test
    void handlesOne() {
        assertEquals(2147483648L, ReverseBits.reverseBits(1));
    }

    @Test
    void keepsTheFullThirtyTwoBitRange() {
        assertEquals(4294967295L, ReverseBits.reverseBits(-1));
    }
}
