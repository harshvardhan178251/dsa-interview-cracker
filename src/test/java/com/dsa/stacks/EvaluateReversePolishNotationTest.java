package com.dsa.stacks;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class EvaluateReversePolishNotationTest {

    @Test
    void evaluatesTheHappyPath() {
        assertEquals(5, EvaluateReversePolishNotation.evaluate(new String[]{"2", "1", "+", "3", "*", "4", "-"}));
    }

    @Test
    void evaluatesASingleNumber() {
        assertEquals(42, EvaluateReversePolishNotation.evaluate(new String[]{"42"}));
    }

    @Test
    void evaluatesASingleAddition() {
        assertEquals(6, EvaluateReversePolishNotation.evaluate(new String[]{"4", "2", "+"}));
    }

    @Test
    void evaluatesSubtractionInTheRightOrder() {
        assertEquals(4, EvaluateReversePolishNotation.evaluate(new String[]{"5", "1", "-"}));
    }

    @Test
    void evaluatesDivision() {
        assertEquals(4, EvaluateReversePolishNotation.evaluate(new String[]{"14", "3", "/"}));
    }

    @Test
    void evaluatesMultiplication() {
        assertEquals(12, EvaluateReversePolishNotation.evaluate(new String[]{"3", "4", "*"}));
    }

    @Test
    void evaluatesNestedExpressions() {
        // ((4 + 1) * 2) + 3 = 13
        assertEquals(13, EvaluateReversePolishNotation.evaluate(new String[]{"4", "1", "+", "2", "*", "3", "+"}));
    }
}
