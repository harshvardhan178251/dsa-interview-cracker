package com.dsa.stacks;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class BasicCalculatorTest {

    @Test
    void evaluatesTheHappyPath() {
        assertEquals(2, BasicCalculator.evaluate("1 - (2 - 3)"));
    }

    @Test
    void evaluatesASimpleSum() {
        assertEquals(6, BasicCalculator.evaluate("1 + 2 + 3"));
    }

    @Test
    void evaluatesNestedParentheses() {
        // 1 - (2 - (3 - 4)) = 1 - (2 - (-1)) = 1 - 3 = -2
        assertEquals(-2, BasicCalculator.evaluate("1 - (2 - (3 - 4))"));
    }

    @Test
    void evaluatesAParenthesisedSum() {
        assertEquals(23, BasicCalculator.evaluate("(1 + (2 + 3)) + 17"));
    }

    @Test
    void handlesSpaces() {
        assertEquals(2, BasicCalculator.evaluate("  1  -  (  2  -  3  ) "));
    }

    @Test
    void handlesAUnaryMinus() {
        assertEquals(-7, BasicCalculator.evaluate("-(3 + 4)"));
    }

    @Test
    void handlesASingleNumber() {
        assertEquals(42, BasicCalculator.evaluate("42"));
    }

    @Test
    void handlesASingleNegativeNumber() {
        assertEquals(-5, BasicCalculator.evaluate("-5"));
    }
}
