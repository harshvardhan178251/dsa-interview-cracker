package com.dsa.stacks;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertArrayEquals;

class StockSpanTest {

    @Test
    void findsTheHappyPath() {
        assertArrayEquals(new int[]{1, 1, 1, 2, 1, 4},
                StockSpan.spans(new int[]{100, 80, 60, 70, 60, 75}));
    }

    @Test
    void handlesAnIncreasingSeries() {
        assertArrayEquals(new int[]{1, 2, 3, 4},
                StockSpan.spans(new int[]{10, 20, 30, 40}));
    }

    @Test
    void handlesADecreasingSeries() {
        assertArrayEquals(new int[]{1, 1, 1, 1},
                StockSpan.spans(new int[]{40, 30, 20, 10}));
    }

    @Test
    void handlesEqualPrices() {
        assertArrayEquals(new int[]{1, 2, 3},
                StockSpan.spans(new int[]{5, 5, 5}));
    }

    @Test
    void handlesASingleDay() {
        assertArrayEquals(new int[]{1}, StockSpan.spans(new int[]{42}));
    }

    @Test
    void handlesTwoDays() {
        assertArrayEquals(new int[]{1, 2}, StockSpan.spans(new int[]{1, 2}));
        assertArrayEquals(new int[]{1, 1}, StockSpan.spans(new int[]{2, 1}));
    }
}
