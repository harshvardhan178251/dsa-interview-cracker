package com.dsa.queues;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertArrayEquals;
import static org.junit.jupiter.api.Assertions.assertEquals;

class SlidingWindowMaximumTest {

    @Test
    void computesEveryWindowMaximum() {
        assertArrayEquals(new int[]{3, 3, 5, 5, 6, 7},
                SlidingWindowMaximum.maxSlidingWindow(new int[]{1, 3, -1, -3, 5, 3, 6, 7}, 3));
    }

    @Test
    void windowOfSizeOneReturnsTheArrayItself() {
        assertArrayEquals(new int[]{1, 4, 9},
                SlidingWindowMaximum.maxSlidingWindow(new int[]{1, 4, 9}, 1));
    }

    @Test
    void windowOfSizeEqualToTheArrayReturnsASingleMaximum() {
        assertArrayEquals(new int[]{9},
                SlidingWindowMaximum.maxSlidingWindow(new int[]{1, 4, 9}, 3));
    }

    @Test
    void handlesNegativeValues() {
        assertArrayEquals(new int[]{-1, -1, -2},
                SlidingWindowMaximum.maxSlidingWindow(new int[]{-3, -1, -4, -2, -5}, 3));
    }

    @Test
    void handlesDuplicates() {
        assertArrayEquals(new int[]{2, 2},
                SlidingWindowMaximum.maxSlidingWindow(new int[]{2, 2, 2, 2}, 3));
    }

    @Test
    void emptyArrayProducesNoWindows() {
        assertEquals(0, SlidingWindowMaximum.maxSlidingWindow(new int[]{}, 3).length);
    }

    @Test
    void singleElementArray() {
        assertArrayEquals(new int[]{7},
                SlidingWindowMaximum.maxSlidingWindow(new int[]{7}, 1));
    }

    @Test
    void strictlyDecreasingArray() {
        assertArrayEquals(new int[]{5, 4, 3},
                SlidingWindowMaximum.maxSlidingWindow(new int[]{5, 4, 3, 2, 1}, 3));
    }
}
