package com.dsa.dynamicprogramming;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class FibonacciNumberTest {

    @Test
    void baseCases() {
        assertEquals(0, FibonacciNumber.fib(0));
        assertEquals(1, FibonacciNumber.fib(1));
    }

    @Test
    void matchesTheKnownSequence() {
        assertEquals(2, FibonacciNumber.fib(3));
        assertEquals(5, FibonacciNumber.fib(5));
        assertEquals(8, FibonacciNumber.fib(6));
    }

    @Test
    void largerIndex() {
        assertEquals(55, FibonacciNumber.fib(10));
        assertEquals(832040, FibonacciNumber.fib(30));
    }

    @Test
    void twoStairsStillTwoWays() {
        assertEquals(1, FibonacciNumber.fib(2));
    }
}
