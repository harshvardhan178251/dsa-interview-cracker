package com.dsa.dynamicprogramming;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class InterleavingStringTest {

    @Test
    void classicExample() {
        assertTrue(InterleavingString.isInterleave("aabcc", "dbbca", "aadbbcbcac"));
    }

    @Test
    void simpleInterleaving() {
        assertTrue(InterleavingString.isInterleave("ab", "cd", "acbd"));
    }

    @Test
    void wrongLengthIsRejected() {
        assertFalse(InterleavingString.isInterleave("ab", "cd", "abc"));
    }

    @Test
    void wrongOrderIsRejected() {
        assertFalse(InterleavingString.isInterleave("ab", "cd", "badc"));
    }

    @Test
    void emptyInputs() {
        assertTrue(InterleavingString.isInterleave("", "", ""));
        assertFalse(InterleavingString.isInterleave("", "a", "ab"));
    }
}
