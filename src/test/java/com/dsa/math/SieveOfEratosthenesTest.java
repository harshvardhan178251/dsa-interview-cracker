package com.dsa.math;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class SieveOfEratosthenesTest {

    @Test
    void countsThePrimesUpToTwenty() {
        assertEquals(8, SieveOfEratosthenes.countPrimes(20));
    }

    @Test
    void aBoundBelowTwoHasNoPrimes() {
        assertEquals(0, SieveOfEratosthenes.countPrimes(1));
        assertEquals(0, SieveOfEratosthenes.countPrimes(0));
    }

    @Test
    void aNegativeBoundHasNoPrimes() {
        assertEquals(0, SieveOfEratosthenes.countPrimes(-5));
    }

    @Test
    void twoIsTheFirstPrime() {
        assertEquals(1, SieveOfEratosthenes.countPrimes(2));
    }

    @Test
    void theBoundItselfIsCountedWhenItIsPrime() {
        assertEquals(9, SieveOfEratosthenes.countPrimes(23));
    }

    @Test
    void aHundredContainsTwentyFivePrimes() {
        assertEquals(25, SieveOfEratosthenes.countPrimes(100));
    }
}
