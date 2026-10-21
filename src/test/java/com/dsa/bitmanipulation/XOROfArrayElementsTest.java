package com.dsa.bitmanipulation;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class XOROfArrayElementsTest {

    @Test
    void foldsTheArray() {
        assertEquals(4, XOROfArrayElements.xorAll(new int[]{1, 2, 3, 4}));
    }

    @Test
    void handlesASingleElement() {
        assertEquals(7, XOROfArrayElements.xorAll(new int[]{7}));
    }

    @Test
    void handlesAnEmptyArray() {
        assertEquals(0, XOROfArrayElements.xorAll(new int[]{}));
    }

    @Test
    void duplicatesCancelOut() {
        assertEquals(0, XOROfArrayElements.xorAll(new int[]{5, 5}));
        assertEquals(9, XOROfArrayElements.xorAll(new int[]{9, 5, 5}));
    }

    @Test
    void handlesNegativeValues() {
        // -5 ^ 3 == 0xFFFFFFFB ^ 0x3 == 0xFFFFFFF8 == -8
        assertEquals(-8, XOROfArrayElements.xorAll(new int[]{-5, 3}));
    }

    @Test
    void isOrderIndependent() {
        int[] a = {4, 1, 7, 3};
        int[] b = {7, 3, 4, 1};
        assertEquals(XOROfArrayElements.xorAll(a), XOROfArrayElements.xorAll(b));
    }
}
