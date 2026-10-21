package com.dsa.math;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class AddBinaryTest {

    @Test
    void addsTwoBinaryNumbers() {
        assertEquals("10101", AddBinary.addBinary("1010", "1011"));
    }

    @Test
    void aCarryCreatesANewDigit() {
        assertEquals("1000", AddBinary.addBinary("111", "001"));
    }

    @Test
    void zeroPlusZeroIsZero() {
        assertEquals("0", AddBinary.addBinary("0", "0"));
    }

    @Test
    void leadingZerosAreKeptInTheInput() {
        assertEquals("1001", AddBinary.addBinary("0001", "1000"));
    }

    @Test
    void anEmptyStringAddsNothing() {
        assertEquals("101", AddBinary.addBinary("101", ""));
    }

    @Test
    void differentLengthsAreHandled() {
        assertEquals("1100", AddBinary.addBinary("11", "1001"));
    }
}
