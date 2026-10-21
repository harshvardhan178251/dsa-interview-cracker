package com.dsa.bitmanipulation;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class DivideTwoIntegersTest {

    @Test
    void dividesAndTruncatesTowardZero() {
        assertEquals(3, DivideTwoIntegers.divide(10, 3));
        assertEquals(2, DivideTwoIntegers.divide(7, 3));
        assertEquals(0, DivideTwoIntegers.divide(2, 3));
    }

    @Test
    void truncatesTowardZeroForNegativeResults() {
        assertEquals(-2, DivideTwoIntegers.divide(7, -3));
        assertEquals(-2, DivideTwoIntegers.divide(-7, 3));
        assertEquals(2, DivideTwoIntegers.divide(-7, -3));
    }

    @Test
    void handlesExactDivisions() {
        assertEquals(5, DivideTwoIntegers.divide(10, 2));
        assertEquals(-5, DivideTwoIntegers.divide(10, -2));
    }

    @Test
    void handlesDivisionByOne() {
        assertEquals(42, DivideTwoIntegers.divide(42, 1));
        assertEquals(-42, DivideTwoIntegers.divide(-42, 1));
    }

    @Test
    void handlesTheMinimumValueDividedByOne() {
        assertEquals(Integer.MIN_VALUE, DivideTwoIntegers.divide(Integer.MIN_VALUE, 1));
    }

    @Test
    void handlesTheOverflowingCase() {
        assertEquals(Integer.MIN_VALUE, DivideTwoIntegers.divide(Integer.MIN_VALUE, -1));
    }

    @Test
    void agreesWithIntegerDivision() {
        for (int a = -30; a <= 30; a++) {
            for (int b = -10; b <= 10; b++) {
                if (b == 0) {
                    continue;
                }
                assertEquals(a / b, DivideTwoIntegers.divide(a, b), a + " / " + b);
            }
        }
    }
}
