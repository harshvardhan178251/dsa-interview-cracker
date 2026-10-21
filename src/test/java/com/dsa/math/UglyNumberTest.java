package com.dsa.math;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class UglyNumberTest {

    @Test
    void theTenthUglyNumberIsTwelve() {
        assertEquals(12, UglyNumber.nthUglyNumber(10));
    }

    @Test
    void theFirstUglyNumberIsOne() {
        assertEquals(1, UglyNumber.nthUglyNumber(1));
    }

    @Test
    void theSequenceStartsWithOneTwoThree() {
        assertEquals(2, UglyNumber.nthUglyNumber(2));
        assertEquals(3, UglyNumber.nthUglyNumber(3));
    }

    @Test
    void aNonPositiveIndexIsZero() {
        assertEquals(0, UglyNumber.nthUglyNumber(0));
        assertEquals(0, UglyNumber.nthUglyNumber(-3));
    }

    @Test
    void theSequenceHasNoDuplicates() {
        assertEquals(12, UglyNumber.nthUglyNumber(10));
        assertEquals(15, UglyNumber.nthUglyNumber(11));
        assertEquals(16, UglyNumber.nthUglyNumber(12));
    }

    @Test
    void theLastUglyNumberOfTheLeetCodeRange() {
        assertEquals(2123366400, UglyNumber.nthUglyNumber(1690));
    }
}
