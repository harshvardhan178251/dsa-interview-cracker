package com.dsa.stacks;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class LargestRectangleInHistogramTest {

    @Test
    void findsTheHappyPath() {
        assertEquals(10, LargestRectangleInHistogram.largestRectangle(new int[]{2, 1, 5, 6, 2}));
    }

    @Test
    void handlesTwoBars() {
        assertEquals(4, LargestRectangleInHistogram.largestRectangle(new int[]{2, 4}));
    }

    @Test
    void handlesASingleBar() {
        assertEquals(3, LargestRectangleInHistogram.largestRectangle(new int[]{3}));
    }

    @Test
    void handlesAnIncreasingHistogram() {
        // height 2 over the last two bars: 2 * 2 = 4
        assertEquals(4, LargestRectangleInHistogram.largestRectangle(new int[]{1, 2, 3}));
    }

    @Test
    void handlesADecreasingHistogram() {
        // height 2 over the first two bars: 2 * 2 = 4
        assertEquals(4, LargestRectangleInHistogram.largestRectangle(new int[]{3, 2, 1}));
    }

    @Test
    void handlesAllEqualBars() {
        assertEquals(12, LargestRectangleInHistogram.largestRectangle(new int[]{3, 3, 3, 3}));
    }

    @Test
    void handlesZeroHeights() {
        assertEquals(0, LargestRectangleInHistogram.largestRectangle(new int[]{0, 0}));
    }
}
