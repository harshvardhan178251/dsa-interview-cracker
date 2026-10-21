package com.dsa.strings;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class ReverseStringTest {

    @Test
    void reversesTheClassicExample() {
        assertEquals("olleh", ReverseString.reverse("hello"));
    }

    @Test
    void reversesAPalindrome() {
        assertEquals("racecar", ReverseString.reverse("racecar"));
    }

    @Test
    void handlesEmptyAndSingleCharacterStrings() {
        assertEquals("", ReverseString.reverse(""));
        assertEquals("a", ReverseString.reverse("a"));
    }

    @Test
    void reversesTwoCharacterStrings() {
        assertEquals("ba", ReverseString.reverse("ab"));
    }

    @Test
    void reversesAnEvenLengthString() {
        assertEquals("cba", ReverseString.reverse("abc"));
    }

    @Test
    void reversesAnOddLengthString() {
        assertEquals("edcba", ReverseString.reverse("abcde"));
    }
}
