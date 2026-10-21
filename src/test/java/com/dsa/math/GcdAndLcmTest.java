package com.dsa.math;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class GcdAndLcmTest {

    @Test
    void findsGcdAndLcm() {
        assertEquals(6, GcdAndLcm.gcd(12, 18));
        assertEquals(36, GcdAndLcm.lcm(12, 18));
    }

    @Test
    void coprimeNumbersHaveGcdOne() {
        assertEquals(1, GcdAndLcm.gcd(13, 17));
        assertEquals(221, GcdAndLcm.lcm(13, 17));
    }

    @Test
    void equalNumbersAreTheirOwnGcdAndLcm() {
        assertEquals(7, GcdAndLcm.gcd(7, 7));
        assertEquals(7, GcdAndLcm.lcm(7, 7));
    }

    @Test
    void zeroHasNoLeastCommonMultiple() {
        assertEquals(0, GcdAndLcm.lcm(0, 5));
    }

    @Test
    void theOrderOfTheArgumentsDoesNotMatter() {
        assertEquals(GcdAndLcm.gcd(12, 18), GcdAndLcm.gcd(18, 12));
        assertEquals(GcdAndLcm.lcm(12, 18), GcdAndLcm.lcm(18, 12));
    }

    @Test
    void largeValuesStillWork() {
        assertEquals(1, GcdAndLcm.gcd(1000000007L, 998244353L));
    }
}
