package com.dsa.arrays;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertArrayEquals;
import static org.junit.jupiter.api.Assertions.assertEquals;

class RotateArrayTest {

    @Test
    void rotatesToTheRight() {
        assertArrayEquals(new int[]{4, 5, 1, 2, 3}, RotateArray.rotate(new int[]{1, 2, 3, 4, 5}, 2));
    }

    @Test
    void handlesAZeroShift() {
        assertArrayEquals(new int[]{1, 2, 3}, RotateArray.rotate(new int[]{1, 2, 3}, 0));
    }

    @Test
    void handlesAShiftEqualToTheLength() {
        assertArrayEquals(new int[]{1, 2, 3}, RotateArray.rotate(new int[]{1, 2, 3}, 3));
    }

    @Test
    void handlesAShiftLargerThanTheLength() {
        assertArrayEquals(new int[]{3, 1, 2}, RotateArray.rotate(new int[]{1, 2, 3}, 4));
    }

    @Test
    void handlesANegativeShift() {
        // rotating right by -1 is rotating left by 1
        assertArrayEquals(new int[]{2, 3, 1}, RotateArray.rotate(new int[]{1, 2, 3}, -1));
    }

    @Test
    void handlesASingleElement() {
        assertArrayEquals(new int[]{9}, RotateArray.rotate(new int[]{9}, 5));
    }

    @Test
    void handlesAnEmptyArray() {
        assertEquals(0, RotateArray.rotate(new int[]{}, 3).length);
    }
}
