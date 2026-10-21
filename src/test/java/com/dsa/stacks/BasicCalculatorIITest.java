package com.dsa.stacks;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class BasicCalculatorIITest {

    @Test
    void evaluatesTheHappyPath() {
        assertEquals(7, BasicCalculatorII.evaluate("3 + 2 * 2"));
    }

    @Test
    void evaluatesAPlainSum() {
        assertEquals(7, BasicCalculatorII.evaluate("1 + 2 + 4"));
    }

    @Test
    void evaluatesAMixedExpression() {
        assertEquals(7, BasicCalculatorII.evaluate("3*2+1"));
    }

    @Test
    void evaluatesDivision() {
        assertEquals(4, BasicCalculatorII.evaluate("14 / 3"));
    }

    @Test
    void evaluatesASubtraction() {
        assertEquals(1, BasicCalculatorII.evaluate("5 - 2 - 2"));
    }

    @Test
    void evaluatesSubtractionWithMultiplication() {
        assertEquals(1, BasicCalculatorII.evaluate("2 * 3 - 5"));
    }

    @Test
    void handlesSpaces() {
        assertEquals(7, BasicCalculatorII.evaluate(" 3 + 2 * 2 "));
    }

    @Test
    void handlesASingleNumber() {
        assertEquals(42, BasicCalculatorII.evaluate("42"));
    }
}
