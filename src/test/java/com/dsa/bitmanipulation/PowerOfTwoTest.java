package com.dsa.bitmanipulation;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

class PowerOfTwoTest {

    @Test
    void recognisesPowersOfTwo() {
        assertTrue(PowerOfTwo.isPowerOfTwo(1));
        assertTrue(PowerOfTwo.isPowerOfTwo(2));
        assertTrue(PowerOfTwo.isPowerOfTwo(16));
        assertTrue(PowerOfTwo.isPowerOfTwo(1 << 30));
    }

    @Test
    void rejectsNonPowersOfTwo() {
        assertFalse(PowerOfTwo.isPowerOfTwo(3));
        assertFalse(PowerOfTwo.isPowerOfTwo(12));
        assertFalse(PowerOfTwo.isPowerOfTwo(100));
    }

    @Test
    void rejectsZero() {
        assertFalse(PowerOfTwo.isPowerOfTwo(0));
    }

    @Test
    void rejectsNegativeNumbers() {
        assertFalse(PowerOfTwo.isPowerOfTwo(-1));
        assertFalse(PowerOfTwo.isPowerOfTwo(-16));
    }

    @Test
    void handlesTheLargestPowerOfTwoInAnInt() {
        assertTrue(PowerOfTwo.isPowerOfTwo(1 << 30));
        assertFalse(PowerOfTwo.isPowerOfTwo(Integer.MAX_VALUE));
    }
}
