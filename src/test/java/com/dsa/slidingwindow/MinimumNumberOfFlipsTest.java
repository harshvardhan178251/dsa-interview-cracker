package com.dsa.slidingwindow;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

class MinimumNumberOfFlipsTest {

    @Test
    void findsTheMinimumNumberOfFlips() {
        assertEquals(2, MinimumNumberOfFlips.minimumFlips("111000"));
    }

    @Test
    void handlesAnAlreadyAlternatingString() {
        assertEquals(0, MinimumNumberOfFlips.minimumFlips("010"));
        assertEquals(0, MinimumNumberOfFlips.minimumFlips("01010"));
    }

    @Test
    void handlesASingleCharacter() {
        assertEquals(0, MinimumNumberOfFlips.minimumFlips("0"));
        assertEquals(0, MinimumNumberOfFlips.minimumFlips("1"));
    }

    @Test
    void handlesAConstantString() {
        // "0000" needs two flips to become "0101".
        assertEquals(2, MinimumNumberOfFlips.minimumFlips("0000"));
        assertEquals(2, MinimumNumberOfFlips.minimumFlips("1111"));
    }

    @Test
    void handlesAnEmptyString() {
        assertEquals(0, MinimumNumberOfFlips.minimumFlips(""));
    }

    @Test
    void theResultIsNeverMoreThanHalfTheLength() {
        for (String s : new String[]{"111000", "0000", "010", "10101", "001011"}) {
            int answer = MinimumNumberOfFlips.minimumFlips(s);
            assertTrue(answer >= 0 && answer <= s.length() / 2 + 1, "s = " + s);
        }
    }
}
