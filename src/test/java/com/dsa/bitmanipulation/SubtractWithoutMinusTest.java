package com.dsa.bitmanipulation;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class SubtractWithoutMinusTest {

    @Test
    void subtractsTwoPositiveNumbers() {
        assertEquals(2, SubtractWithoutMinus.subtract(5, 3));
        assertEquals(0, SubtractWithoutMinus.subtract(4, 4));
    }

    @Test
    void producesANegativeResult() {
        assertEquals(-2, SubtractWithoutMinus.subtract(3, 5));
    }

    @Test
    void handlesZero() {
        assertEquals(9, SubtractWithoutMinus.subtract(9, 0));
        assertEquals(-9, SubtractWithoutMinus.subtract(0, 9));
        assertEquals(0, SubtractWithoutMinus.subtract(0, 0));
    }

    @Test
    void handlesNegativeOperands() {
        assertEquals(2, SubtractWithoutMinus.subtract(-3, -5));
        assertEquals(-8, SubtractWithoutMinus.subtract(-3, 5));
        assertEquals(8, SubtractWithoutMinus.subtract(3, -5));
    }

    @Test
    void agreesWithTheMinusOperator() {
        for (int a = -50; a <= 50; a++) {
            for (int b = -50; b <= 50; b++) {
                assertEquals(a - b, SubtractWithoutMinus.subtract(a, b), a + " - " + b);
            }
        }
    }
}
