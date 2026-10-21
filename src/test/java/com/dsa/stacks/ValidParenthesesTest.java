package com.dsa.stacks;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

class ValidParenthesesTest {

    @Test
    void acceptsTheHappyPath() {
        assertTrue(ValidParentheses.isValid("()[]{}"));
    }

    @Test
    void acceptsNestedBrackets() {
        assertTrue(ValidParentheses.isValid("([{}])"));
    }

    @Test
    void rejectsInterleavedBrackets() {
        assertFalse(ValidParentheses.isValid("([)]"));
    }

    @Test
    void rejectsAnUnclosedBracket() {
        assertFalse(ValidParentheses.isValid("("));
        assertFalse(ValidParentheses.isValid("([{}]"));
    }

    @Test
    void rejectsAnExtraClosingBracket() {
        assertFalse(ValidParentheses.isValid(")"));
        assertFalse(ValidParentheses.isValid("()()("));
    }

    @Test
    void acceptsASinglePair() {
        assertTrue(ValidParentheses.isValid("()"));
    }

    @Test
    void handlesAnEmptyString() {
        assertTrue(ValidParentheses.isValid(""));
    }
}
