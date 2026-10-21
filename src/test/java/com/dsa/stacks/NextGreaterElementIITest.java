package com.dsa.stacks;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertArrayEquals;

class NextGreaterElementIITest {

    @Test
    void findsTheHappyPath() {
        assertArrayEquals(new int[]{2, 3, 4, -1, 4},
                NextGreaterElementII.nextGreaterCircular(new int[]{1, 2, 3, 4, 3}));
    }

    @Test
    void wrapsAroundTheEnd() {
        // only the last element finds its partner by wrapping around
        assertArrayEquals(new int[]{-1, 2, 3, 4, 5},
                NextGreaterElementII.nextGreaterCircular(new int[]{5, 1, 2, 3, 4}));
    }

    @Test
    void handlesASingleElement() {
        assertArrayEquals(new int[]{-1}, NextGreaterElementII.nextGreaterCircular(new int[]{1}));
    }

    @Test
    void handlesAnEqualArray() {
        assertArrayEquals(new int[]{-1, -1, -1},
                NextGreaterElementII.nextGreaterCircular(new int[]{2, 2, 2}));
    }

    @Test
    void handlesADecreasingArray() {
        // every element except the largest finds the largest by wrapping around
        assertArrayEquals(new int[]{-1, 4, 4, 4},
                NextGreaterElementII.nextGreaterCircular(new int[]{4, 3, 2, 1}));
    }

    @Test
    void handlesAnIncreasingArray() {
        assertArrayEquals(new int[]{2, 3, 4, -1},
                NextGreaterElementII.nextGreaterCircular(new int[]{1, 2, 3, 4}));
    }
}
