package com.dsa.arrays;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class BestTimeToBuyAndSellStockTest {

    @Test
    void findsTheBestSingleTransaction() {
        assertEquals(5, BestTimeToBuyAndSellStock.maxProfit(new int[]{7, 1, 5, 3, 6, 4}));
    }

    @Test
    void returnsZeroWhenPricesOnlyFall() {
        assertEquals(0, BestTimeToBuyAndSellStock.maxProfit(new int[]{7, 6, 4, 3, 1}));
    }

    @Test
    void handlesASingleDay() {
        assertEquals(0, BestTimeToBuyAndSellStock.maxProfit(new int[]{3}));
    }

    @Test
    void handlesAnEmptyArray() {
        assertEquals(0, BestTimeToBuyAndSellStock.maxProfit(new int[]{}));
    }

    @Test
    void findsTheProfitAtTheVeryEnd() {
        assertEquals(9, BestTimeToBuyAndSellStock.maxProfit(new int[]{1, 2, 3, 4, 10}));
    }

    @Test
    void handlesEqualPrices() {
        assertEquals(0, BestTimeToBuyAndSellStock.maxProfit(new int[]{5, 5, 5, 5}));
    }
}
