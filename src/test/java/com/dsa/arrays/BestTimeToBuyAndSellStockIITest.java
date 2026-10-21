package com.dsa.arrays;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class BestTimeToBuyAndSellStockIITest {

    @Test
    void sumsEveryPositiveRise() {
        assertEquals(7, BestTimeToBuyAndSellStockII.maxProfit(new int[]{7, 1, 5, 3, 6, 4}));
    }

    @Test
    void returnsZeroWhenPricesOnlyFall() {
        assertEquals(0, BestTimeToBuyAndSellStockII.maxProfit(new int[]{7, 6, 4, 3, 1}));
    }

    @Test
    void handlesASingleDay() {
        assertEquals(0, BestTimeToBuyAndSellStockII.maxProfit(new int[]{5}));
    }

    @Test
    void handlesAnEmptyArray() {
        assertEquals(0, BestTimeToBuyAndSellStockII.maxProfit(new int[]{}));
    }

    @Test
    void capturesEveryStepOfAMonotonicRise() {
        // 1 + 1 + 1 = 3
        assertEquals(3, BestTimeToBuyAndSellStockII.maxProfit(new int[]{1, 2, 3, 4}));
    }

    @Test
    void handlesDuplicatePrices() {
        assertEquals(2, BestTimeToBuyAndSellStockII.maxProfit(new int[]{2, 2, 4, 2}));
    }
}
