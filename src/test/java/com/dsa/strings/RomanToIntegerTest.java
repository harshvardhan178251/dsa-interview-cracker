package com.dsa.strings;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class RomanToIntegerTest {

    @Test
    void convertsTheClassicExample() {
        assertEquals(1994, RomanToInteger.romanToInt("MCMXCIV"));
    }

    @Test
    void convertsSingleSymbols() {
        assertEquals(1, RomanToInteger.romanToInt("I"));
        assertEquals(5, RomanToInteger.romanToInt("V"));
        assertEquals(10, RomanToInteger.romanToInt("X"));
        assertEquals(1000, RomanToInteger.romanToInt("M"));
    }

    @Test
    void handlesSubtractivePairs() {
        assertEquals(4, RomanToInteger.romanToInt("IV"));
        assertEquals(9, RomanToInteger.romanToInt("IX"));
        assertEquals(40, RomanToInteger.romanToInt("XL"));
        assertEquals(90, RomanToInteger.romanToInt("XC"));
        assertEquals(400, RomanToInteger.romanToInt("CD"));
        assertEquals(900, RomanToInteger.romanToInt("CM"));
    }

    @Test
    void convertsAdditiveNumerals() {
        assertEquals(58, RomanToInteger.romanToInt("LVIII"));
        assertEquals(1984, RomanToInteger.romanToInt("MCMLXXXIV"));
    }

    @Test
    void emptyStringIsZero() {
        assertEquals(0, RomanToInteger.romanToInt(""));
    }
}
