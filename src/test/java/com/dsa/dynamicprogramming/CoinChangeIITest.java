package com.dsa.dynamicprogramming;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class CoinChangeIITest {

    @Test
    void classicExample() {
        assertEquals(4, CoinChangeII.change(5, new int[]{1, 2, 5}));
    }

    @Test
    void orderDoesNotMatter() {
        assertEquals(2, CoinChangeII.change(3, new int[]{1, 2}));
    }

    @Test
    void zeroAmountHasExactlyOneCombination() {
        assertEquals(1, CoinChangeII.change(0, new int[]{1, 2, 5}));
    }

    @Test
    void impossibleAmountHasNoCombination() {
        assertEquals(0, CoinChangeII.change(3, new int[]{2, 4}));
    }

    @Test
    void singleCoinGivesOneCombination() {
        assertEquals(1, CoinChangeII.change(7, new int[]{7}));
    }

    @Test
    void largerAmount() {
        assertEquals(10, CoinChangeII.change(10, new int[]{1, 2, 5}));
    }
}
