package com.dsa.binarysearch;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class SquareRootOfANumberTest {

    @Test
    void truncatesANonPerfectSquare() {
        assertEquals(2, SquareRootOfANumber.mySqrt(8));
        assertEquals(5, SquareRootOfANumber.mySqrt(30));
    }

    @Test
    void returnsTheExactRootOfAPerfectSquare() {
        assertEquals(4, SquareRootOfANumber.mySqrt(16));
        assertEquals(9, SquareRootOfANumber.mySqrt(81));
    }

    @Test
    void handlesTheSmallestInputs() {
        assertEquals(0, SquareRootOfANumber.mySqrt(0));
        assertEquals(1, SquareRootOfANumber.mySqrt(1));
        assertEquals(1, SquareRootOfANumber.mySqrt(2));
        assertEquals(1, SquareRootOfANumber.mySqrt(3));
    }

    @Test
    void handlesTheLargestAllowedInput() {
        assertEquals(46_340, SquareRootOfANumber.mySqrt(Integer.MAX_VALUE));
    }

    @Test
    void agreesWithMathSqrtForEveryValueUpToFiveHundred() {
        for (int x = 0; x <= 500; x++) {
            assertEquals((int) Math.sqrt(x), SquareRootOfANumber.mySqrt(x), "x = " + x);
        }
    }
}
