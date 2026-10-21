package com.dsa.dynamicprogramming;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class TargetSumTest {

    @Test
    void classicExample() {
        assertEquals(5, TargetSum.findTargetSumWays(new int[]{1, 1, 1, 1, 1}, 3));
    }

    @Test
    void oneElement() {
        assertEquals(1, TargetSum.findTargetSumWays(new int[]{1}, 1));
        assertEquals(1, TargetSum.findTargetSumWays(new int[]{1}, -1));
    }

    @Test
    void impossibleTarget() {
        assertEquals(0, TargetSum.findTargetSumWays(new int[]{1, 2}, 5));
    }

    @Test
    void zeroCountsBothSigns() {
        assertEquals(2, TargetSum.findTargetSumWays(new int[]{0}, 0));
    }

    @Test
    void mixedSigns() {
        assertEquals(2, TargetSum.findTargetSumWays(new int[]{1, 1}, 0));
    }
}
