package com.dsa.dynamicprogramming;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class BestTimeToBuySellStockIIITest {

    @Test
    void classicExample() {
        assertEquals(6, BestTimeToBuySellStockIII.maxProfit(new int[]{3, 3, 5, 0, 0, 3, 1, 4}));
    }

    @Test
    void atMostTwoTransactions() {
        assertEquals(4, BestTimeToBuySellStockIII.maxProfit(new int[]{1, 2, 3, 4, 5}));
    }

    @Test
    void noProfitIsZero() {
        assertEquals(0, BestTimeToBuySellStockIII.maxProfit(new int[]{7, 6, 4, 3, 1}));
    }

    @Test
    void singleDay() {
        assertEquals(0, BestTimeToBuySellStockIII.maxProfit(new int[]{5}));
    }

    @Test
    void twoClearTransactions() {
        assertEquals(8, BestTimeToBuySellStockIII.maxProfit(new int[]{1, 2, 5, 2, 6}));
    }
}
