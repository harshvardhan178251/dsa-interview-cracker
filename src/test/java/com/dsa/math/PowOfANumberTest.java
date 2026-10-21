package com.dsa.math;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class PowOfANumberTest {

    @Test
    void raisesAPositiveExponent() {
        assertEquals(15.625, PowOfANumber.pow(2.5, 3), 1e-9);
    }

    @Test
    void anExponentOfZeroGivesOne() {
        assertEquals(1.0, PowOfANumber.pow(2.5, 0), 1e-9);
    }

    @Test
    void aNegativeExponentInvertsTheBase() {
        assertEquals(0.125, PowOfANumber.pow(2, -3), 1e-9);
    }

    @Test
    void theLargestPossibleExponentIsHandled() {
        assertEquals(1024.0, PowOfANumber.pow(2, 10), 1e-9);
    }

    @Test
    void aBaseOfOneAlwaysGivesOne() {
        assertEquals(1.0, PowOfANumber.pow(1, 12345), 1e-9);
    }

    @Test
    void theSmallestIntExponentDoesNotOverflow() {
        assertEquals(0.0, PowOfANumber.pow(2, Integer.MIN_VALUE), 1e-9);
    }
}
