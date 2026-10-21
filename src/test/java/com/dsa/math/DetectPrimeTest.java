package com.dsa.math;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

class DetectPrimeTest {

    @Test
    void ninetySevenIsPrime() {
        assertTrue(DetectPrime.isPrime(97));
    }

    @Test
    void twoIsPrime() {
        assertTrue(DetectPrime.isPrime(2));
    }

    @Test
    void oneIsNotPrime() {
        assertFalse(DetectPrime.isPrime(1));
    }

    @Test
    void zeroIsNotPrime() {
        assertFalse(DetectPrime.isPrime(0));
    }

    @Test
    void aCompositeNumberIsRejected() {
        assertFalse(DetectPrime.isPrime(91));
    }

    @Test
    void anEvenNumberBiggerThanTwoIsNotPrime() {
        assertFalse(DetectPrime.isPrime(4));
    }

    @Test
    void aSquareOfAPrimeIsNotPrime() {
        assertFalse(DetectPrime.isPrime(49));
    }
}
