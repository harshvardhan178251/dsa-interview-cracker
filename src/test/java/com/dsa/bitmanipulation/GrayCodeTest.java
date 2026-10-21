package com.dsa.bitmanipulation;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertArrayEquals;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

class GrayCodeTest {

    @Test
    void producesTheCanonicalTwoBitSequence() {
        assertArrayEquals(new int[]{0, 1, 3, 2}, GrayCode.grayCode(2));
    }

    @Test
    void producesTheOneBitSequence() {
        assertArrayEquals(new int[]{0, 1}, GrayCode.grayCode(1));
    }

    @Test
    void producesTheThreeBitSequence() {
        assertArrayEquals(new int[]{0, 1, 3, 2, 6, 7, 5, 4}, GrayCode.grayCode(3));
    }

    @Test
    void handlesZeroBits() {
        assertArrayEquals(new int[]{0}, GrayCode.grayCode(0));
    }

    @Test
    void theSequenceHasTheRightLength() {
        for (int n = 0; n <= 8; n++) {
            assertEquals(1 << n, GrayCode.grayCode(n).length, "n = " + n);
        }
    }

    @Test
    void everyValueAppearsExactlyOnce() {
        int[] code = GrayCode.grayCode(4);
        boolean[] seen = new boolean[16];
        for (int value : code) {
            assertTrue(value >= 0 && value < 16);
            assertTrue(!seen[value], "duplicate value " + value);
            seen[value] = true;
        }
    }

    @Test
    void consecutiveEntriesDifferInExactlyOneBit() {
        int[] code = GrayCode.grayCode(5);
        for (int i = 1; i < code.length; i++) {
            int differing = code[i] ^ code[i - 1];
            assertEquals(1, Integer.bitCount(differing), "between " + code[i - 1] + " and " + code[i]);
        }
    }

    @Test
    void matchesTheFormula() {
        int[] code = GrayCode.grayCode(4);
        for (int i = 0; i < code.length; i++) {
            assertEquals(i ^ (i >> 1), code[i], "i = " + i);
        }
    }
}
