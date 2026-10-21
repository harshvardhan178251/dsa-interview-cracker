package com.dsa.stacks;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertArrayEquals;

class NextGreaterElementTest {

    @Test
    void findsTheHappyPath() {
        assertArrayEquals(new int[]{2, 4, 4, -1},
                NextGreaterElement.nextGreaterElements(new int[]{1, 2, 1, 4}));
    }

    @Test
    void handlesADecreasingArray() {
        assertArrayEquals(new int[]{-1, -1, -1, -1, -1},
                NextGreaterElement.nextGreaterElements(new int[]{5, 4, 3, 2, 1}));
    }

    @Test
    void handlesAnIncreasingArray() {
        assertArrayEquals(new int[]{2, 3, 4, -1},
                NextGreaterElement.nextGreaterElements(new int[]{1, 2, 3, 4}));
    }

    @Test
    void handlesDuplicateValues() {
        assertArrayEquals(new int[]{-1, -1, -1},
                NextGreaterElement.nextGreaterElements(new int[]{2, 2, 2}));
    }

    @Test
    void handlesASingleElement() {
        assertArrayEquals(new int[]{-1}, NextGreaterElement.nextGreaterElements(new int[]{1}));
    }

    @Test
    void handlesNegativeValues() {
        assertArrayEquals(new int[]{-1, -1, -1},
                NextGreaterElement.nextGreaterElements(new int[]{-2, -1, -3}));
    }
}
