package com.dsa.math;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

class PerfectNumberTest {

    @Test
    void twentyEightIsPerfect() {
        assertTrue(PerfectNumber.isPerfect(28));
    }

    @Test
    void sixIsPerfect() {
        assertTrue(PerfectNumber.isPerfect(6));
    }

    @Test
    void twelveIsNotPerfect() {
        assertFalse(PerfectNumber.isPerfect(12));
    }

    @Test
    void oneIsNotPerfect() {
        assertFalse(PerfectNumber.isPerfect(1));
    }

    @Test
    void aPrimeIsNotPerfect() {
        assertFalse(PerfectNumber.isPerfect(97));
    }

    @Test
    void aSquareIsCountedOnlyOnce() {
        assertFalse(PerfectNumber.isPerfect(36));
    }
}
