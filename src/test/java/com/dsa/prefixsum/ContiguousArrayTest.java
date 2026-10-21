package com.dsa.prefixsum;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class ContiguousArrayTest {

    @Test
    void findsTheLongestBalancedSubarray() {
        assertEquals(4, ContiguousArray.findMaxLength(new int[]{0, 1, 0, 1, 0, 0}));
    }

    @Test
    void handlesTheClassicExample() {
        assertEquals(2, ContiguousArray.findMaxLength(new int[]{0, 1, 0}));
    }

    @Test
    void findsTheWholeArrayWhenItIsBalanced() {
        assertEquals(4, ContiguousArray.findMaxLength(new int[]{0, 0, 1, 1}));
    }

    @Test
    void handlesASingleElement() {
        assertEquals(0, ContiguousArray.findMaxLength(new int[]{1}));
    }

    @Test
    void handlesAllZeros() {
        assertEquals(0, ContiguousArray.findMaxLength(new int[]{0, 0, 0}));
    }

    @Test
    void handlesAnEmptyArray() {
        assertEquals(0, ContiguousArray.findMaxLength(new int[]{}));
    }
}
