package com.dsa.math;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class LargestPrimeFactorTest {

    @Test
    void findsTheLargestPrimeFactor() {
        assertEquals(29, LargestPrimeFactor.largestPrimeFactor(13195));
    }

    @Test
    void aPrimeIsItsOwnLargestPrimeFactor() {
        assertEquals(97, LargestPrimeFactor.largestPrimeFactor(97));
    }

    @Test
    void numbersBelowTwoHaveNoPrimeFactor() {
        assertEquals(-1, LargestPrimeFactor.largestPrimeFactor(1));
        assertEquals(-1, LargestPrimeFactor.largestPrimeFactor(0));
    }

    @Test
    void aPowerOfTwoHasTwoAsItsLargestPrimeFactor() {
        assertEquals(2, LargestPrimeFactor.largestPrimeFactor(1024));
    }

    @Test
    void repeatedFactorsAreRemovedCompletely() {
        assertEquals(3, LargestPrimeFactor.largestPrimeFactor(12));
    }

    @Test
    void aMixedFactorisationWorks() {
        assertEquals(23, LargestPrimeFactor.largestPrimeFactor(2024));
    }
}
