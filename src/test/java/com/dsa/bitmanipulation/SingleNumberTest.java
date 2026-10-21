package com.dsa.bitmanipulation;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class SingleNumberTest {

    @Test
    void findsTheUnpairedElement() {
        assertEquals(4, SingleNumber.singleNumber(new int[]{4, 1, 2, 1, 2}));
    }

    @Test
    void handlesASingleElementArray() {
        assertEquals(7, SingleNumber.singleNumber(new int[]{7}));
    }

    @Test
    void handlesNegativeValues() {
        assertEquals(-3, SingleNumber.singleNumber(new int[]{-3, 5, 5, 1, 1}));
    }

    @Test
    void handlesZeroAsTheUnpairedElement() {
        assertEquals(0, SingleNumber.singleNumber(new int[]{0, 1, 1}));
    }

    @Test
    void handlesLargeValues() {
        assertEquals(1_000_000, SingleNumber.singleNumber(new int[]{1_000_000, 3, 3}));
    }

    @Test
    void handlesAnEmptyArray() {
        assertEquals(0, SingleNumber.singleNumber(new int[]{}));
    }
}
