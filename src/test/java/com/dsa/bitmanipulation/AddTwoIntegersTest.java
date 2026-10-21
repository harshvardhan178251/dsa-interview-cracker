package com.dsa.bitmanipulation;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class AddTwoIntegersTest {

    @Test
    void addsTwoPositiveNumbers() {
        assertEquals(5, AddTwoIntegers.add(2, 3));
        assertEquals(100, AddTwoIntegers.add(40, 60));
    }

    @Test
    void addsZero() {
        assertEquals(7, AddTwoIntegers.add(7, 0));
        assertEquals(7, AddTwoIntegers.add(0, 7));
    }

    @Test
    void addsTwoNegativeNumbers() {
        assertEquals(-8, AddTwoIntegers.add(-3, -5));
    }

    @Test
    void addsANegativeAndAPositiveNumber() {
        assertEquals(-2, AddTwoIntegers.add(-5, 3));
        assertEquals(2, AddTwoIntegers.add(5, -3));
    }

    @Test
    void agreesWithThePlusOperator() {
        for (int a = -50; a <= 50; a++) {
            for (int b = -50; b <= 50; b++) {
                assertEquals(a + b, AddTwoIntegers.add(a, b), a + " + " + b);
            }
        }
    }

    @Test
    void handlesTheLargestResultThatFitsInAnInt() {
        assertEquals(Integer.MAX_VALUE, AddTwoIntegers.add(Integer.MAX_VALUE - 1, 1));
    }
}
