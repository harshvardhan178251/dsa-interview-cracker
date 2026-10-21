package com.dsa.math;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class ReverseIntegerTest {

    @Test
    void reversesANegativeNumber() {
        assertEquals(-321, ReverseInteger.reverse(-123));
    }

    @Test
    void reversesAPositiveNumber() {
        assertEquals(321, ReverseInteger.reverse(123));
    }

    @Test
    void trailingZerosDisappear() {
        assertEquals(21, ReverseInteger.reverse(120));
    }

    @Test
    void zeroStaysZero() {
        assertEquals(0, ReverseInteger.reverse(0));
    }

    @Test
    void anOverflowingResultBecomesZero() {
        assertEquals(0, ReverseInteger.reverse(1534236469));
    }

    @Test
    void theLargestIntDoesNotOverflow() {
        assertEquals(0, ReverseInteger.reverse(1534236469));
        assertEquals(0, ReverseInteger.reverse(Integer.MAX_VALUE));
    }

    @Test
    void aReversalThatStillFitsIsReturned() {
        assertEquals(123456789, ReverseInteger.reverse(987654321));
    }
}
