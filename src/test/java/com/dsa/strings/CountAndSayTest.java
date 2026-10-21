package com.dsa.strings;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class CountAndSayTest {

    @Test
    void generatesTheClassicSequence() {
        assertEquals("1", CountAndSay.countAndSay(1));
        assertEquals("11", CountAndSay.countAndSay(2));
        assertEquals("21", CountAndSay.countAndSay(3));
        assertEquals("1211", CountAndSay.countAndSay(4));
    }

    @Test
    void continuesTheSequence() {
        assertEquals("111221", CountAndSay.countAndSay(5));
        assertEquals("312211", CountAndSay.countAndSay(6));
        assertEquals("13112221", CountAndSay.countAndSay(7));
    }

    @Test
    void handlesTheFirstTermOnly() {
        assertEquals("1", CountAndSay.countAndSay(1));
    }

    @Test
    void handlesRunsOfThreeAndMore() {
        assertEquals("1113213211", CountAndSay.countAndSay(8)); // "1211" -> "111221" -> "312211"
        assertEquals("31131211131221", CountAndSay.countAndSay(9));
    }
}
