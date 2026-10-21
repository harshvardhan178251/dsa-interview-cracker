package com.dsa.strings;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class IntegerToRomanTest {

    @Test
    void convertsTheClassicExample() {
        assertEquals("MCMXCIV", IntegerToRoman.intToRoman(1994));
    }

    @Test
    void convertsSingleDigits() {
        assertEquals("I", IntegerToRoman.intToRoman(1));
        assertEquals("IV", IntegerToRoman.intToRoman(4));
        assertEquals("V", IntegerToRoman.intToRoman(5));
        assertEquals("IX", IntegerToRoman.intToRoman(9));
    }

    @Test
    void convertsTensAndHundreds() {
        assertEquals("XIV", IntegerToRoman.intToRoman(14));
        assertEquals("XL", IntegerToRoman.intToRoman(40));
        assertEquals("LVIII", IntegerToRoman.intToRoman(58));
        assertEquals("XC", IntegerToRoman.intToRoman(90));
        assertEquals("CD", IntegerToRoman.intToRoman(400));
        assertEquals("DCCC", IntegerToRoman.intToRoman(800));
    }

    @Test
    void convertsTheBoundaries() {
        assertEquals("I", IntegerToRoman.intToRoman(1));
        assertEquals("MMMCMXCIX", IntegerToRoman.intToRoman(3999));
    }

    @Test
    void valuesBelowOneAreEmpty() {
        assertEquals("", IntegerToRoman.intToRoman(0));
        assertEquals("", IntegerToRoman.intToRoman(-5));
    }
}
