package com.dsa.arrays;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class MissingNumberTest {

    @Test
    void findsTheMissingValueInTheMiddle() {
        assertEquals(2, MissingNumber.missingNumber(new int[]{0, 1, 3}));
    }

    @Test
    void findsTheMissingValueAtTheStart() {
        assertEquals(0, MissingNumber.missingNumber(new int[]{1, 2, 3}));
    }

    @Test
    void findsTheMissingValueAtTheEnd() {
        assertEquals(3, MissingNumber.missingNumber(new int[]{0, 1, 2}));
    }

    @Test
    void handlesASingleElementArray() {
        assertEquals(1, MissingNumber.missingNumber(new int[]{0}));
    }

    @Test
    void handlesTheLargestPossibleRange() {
        // the range is 0..9, only the value 4 is missing
        assertEquals(4, MissingNumber.missingNumber(new int[]{0, 1, 2, 3, 5, 6, 7, 8, 9}));
    }
}
