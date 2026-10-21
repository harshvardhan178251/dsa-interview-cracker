package com.dsa.strings;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

class ValidNumberTest {

    @Test
    void acceptsPlainIntegers() {
        assertTrue(ValidNumber.isValidNumber("0"));
        assertTrue(ValidNumber.isValidNumber("123"));
        assertTrue(ValidNumber.isValidNumber("-123"));
        assertTrue(ValidNumber.isValidNumber("+123"));
    }

    @Test
    void acceptsDecimals() {
        assertTrue(ValidNumber.isValidNumber("3.5"));
        assertTrue(ValidNumber.isValidNumber("-3.5"));
        assertTrue(ValidNumber.isValidNumber("3."));      // trailing dot is allowed
        assertTrue(ValidNumber.isValidNumber(".5"));      // leading dot is allowed
        assertTrue(ValidNumber.isValidNumber("0.0"));
    }

    @Test
    void acceptsExponents() {
        assertTrue(ValidNumber.isValidNumber("2e10"));
        assertTrue(ValidNumber.isValidNumber("2E10"));
        assertTrue(ValidNumber.isValidNumber("2e+10"));
        assertTrue(ValidNumber.isValidNumber("2e-10"));
        assertTrue(ValidNumber.isValidNumber("-3.5e+2"));
    }

    @Test
    void rejectsMissingDigits() {
        assertFalse(ValidNumber.isValidNumber("e3"));
        assertFalse(ValidNumber.isValidNumber("."));
        assertFalse(ValidNumber.isValidNumber(""));
        assertFalse(ValidNumber.isValidNumber("-"));
        assertFalse(ValidNumber.isValidNumber("+"));
    }

    @Test
    void rejectsIncompleteExponents() {
        assertFalse(ValidNumber.isValidNumber("1e"));
        assertFalse(ValidNumber.isValidNumber("1e+"));
        assertFalse(ValidNumber.isValidNumber("1e-"));
    }

    @Test
    void rejectsTrailingGarbage() {
        assertFalse(ValidNumber.isValidNumber("1e10a"));
        assertFalse(ValidNumber.isValidNumber("3.5.7"));
        assertFalse(ValidNumber.isValidNumber("99e2.5"));
        assertFalse(ValidNumber.isValidNumber("1 "));
    }
}
