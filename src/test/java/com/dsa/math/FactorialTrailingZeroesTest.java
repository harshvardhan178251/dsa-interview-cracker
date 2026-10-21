package com.dsa.math;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class FactorialTrailingZeroesTest {

    @Test
    void countsTheZeroesOfTwentyFive() {
        assertEquals(6, FactorialTrailingZeroes.trailingZeroes(25));
    }

    @Test
    void aSmallFactorialHasNoTrailingZero() {
        assertEquals(0, FactorialTrailingZeroes.trailingZeroes(4));
    }

    @Test
    void zeroFactorialIsOne() {
        assertEquals(0, FactorialTrailingZeroes.trailingZeroes(0));
    }

    @Test
    void tenFactorialEndsInTwoZeroes() {
        assertEquals(2, FactorialTrailingZeroes.trailingZeroes(10));
    }

    @Test
    void aHundredFactorialEndsInTwentyFourZeroes() {
        assertEquals(24, FactorialTrailingZeroes.trailingZeroes(100));
    }

    @Test
    void aLargeFactorialIsStillFast() {
        assertEquals(249999998, FactorialTrailingZeroes.trailingZeroes(1000000000));
    }
}
