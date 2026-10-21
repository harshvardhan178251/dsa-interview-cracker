package com.dsa.strings;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class StringToIntegerTest {

    @Test
    void parsesAPlainNumber() {
        assertEquals(42, StringToInteger.myAtoi("42"));
        assertEquals(0, StringToInteger.myAtoi("0"));
    }

    @Test
    void honoursTheSign() {
        assertEquals(-42, StringToInteger.myAtoi("-42"));
        assertEquals(42, StringToInteger.myAtoi("+42"));
        assertEquals(-7, StringToInteger.myAtoi("-7"));
    }

    @Test
    void skipsLeadingWhitespace() {
        assertEquals(-42, StringToInteger.myAtoi("   -42"));
        assertEquals(42, StringToInteger.myAtoi("\t\n 42"));
    }

    @Test
    void stopsAtTheFirstNonDigit() {
        assertEquals(4193, StringToInteger.myAtoi("4193 with words"));
        assertEquals(0, StringToInteger.myAtoi("words 4193"));
    }

    @Test
    void clampsOverflowToTheIntRange() {
        assertEquals(Integer.MAX_VALUE, StringToInteger.myAtoi("2147483648"));
        assertEquals(Integer.MIN_VALUE, StringToInteger.myAtoi("-2147483649"));
        assertEquals(Integer.MAX_VALUE, StringToInteger.myAtoi("99999999999999999999"));
    }

    @Test
    void handlesTheBoundaryValuesExactly() {
        assertEquals(Integer.MAX_VALUE, StringToInteger.myAtoi("2147483647"));
        assertEquals(Integer.MIN_VALUE, StringToInteger.myAtoi("-2147483648"));
    }

    @Test
    void emptyOrNonNumericInputIsZero() {
        assertEquals(0, StringToInteger.myAtoi(""));
        assertEquals(0, StringToInteger.myAtoi("   "));
        assertEquals(0, StringToInteger.myAtoi("abc"));
    }
}
