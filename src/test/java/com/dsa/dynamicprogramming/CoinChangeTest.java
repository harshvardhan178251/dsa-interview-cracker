package com.dsa.dynamicprogramming;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class CoinChangeTest {

    @Test
    void classicExample() {
        assertEquals(3, CoinChange.coinChange(new int[]{1, 2, 5}, 11));
    }

    @Test
    void greedyTrap() {
        assertEquals(2, CoinChange.coinChange(new int[]{1, 3, 4}, 6));
    }

    @Test
    void unreachableAmountReturnsMinusOne() {
        assertEquals(-1, CoinChange.coinChange(new int[]{2}, 3));
        assertEquals(-1, CoinChange.coinChange(new int[]{3}, 7));
    }

    @Test
    void zeroAmountNeedsNoCoins() {
        assertEquals(0, CoinChange.coinChange(new int[]{1, 2, 5}, 0));
    }

    @Test
    void singleCoinDenomination() {
        assertEquals(4, CoinChange.coinChange(new int[]{5}, 20));
    }

    @Test
    void largeAmount() {
        assertEquals(20, CoinChange.coinChange(new int[]{1, 2, 5}, 100));
    }
}
