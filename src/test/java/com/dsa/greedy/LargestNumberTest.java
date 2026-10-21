package com.dsa.greedy;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class LargestNumberTest {

    @Test
    void sortsByTheConcatenationRule() {
        assertEquals("93210", LargestNumber.largestNumber(new int[]{10, 2, 9, 3}));
    }

    @Test
    void aSingleNumberIsReturnedUnchanged() {
        assertEquals("7", LargestNumber.largestNumber(new int[]{7}));
    }

    @Test
    void allZerosCollapseToASingleZero() {
        assertEquals("0", LargestNumber.largestNumber(new int[]{0, 0, 0}));
    }

    @Test
    void zeroGoesLast() {
        assertEquals("100", LargestNumber.largestNumber(new int[]{0, 0, 1}));
    }

    @Test
    void anEmptyArrayProducesAnEmptyString() {
        assertEquals("", LargestNumber.largestNumber(new int[]{}));
    }

    @Test
    void thePrefixRuleBeatsTheNumericOrder() {
        assertEquals("9534330", LargestNumber.largestNumber(new int[]{3, 30, 34, 5, 9}));
    }
}
