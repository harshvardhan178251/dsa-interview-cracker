package com.dsa.greedy;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class GreedyCoinChangeTest {

    @Test
    void usesTheBiggestCoinsFirst() {
        assertEquals(6, GreedyCoinChange.minCoins(63, new int[]{1, 5, 10, 25}));
    }

    @Test
    void anAmountOfZeroNeedsNoCoin() {
        assertEquals(0, GreedyCoinChange.minCoins(0, new int[]{1, 5, 10, 25}));
    }

    @Test
    void returnsMinusOneWhenTheAmountCannotBeMade() {
        assertEquals(-1, GreedyCoinChange.minCoins(7, new int[]{2, 4}));
    }

    @Test
    void withoutAnyCoinOnlyZeroCanBeMade() {
        assertEquals(-1, GreedyCoinChange.minCoins(5, new int[]{}));
    }

    @Test
    void theDenominationsMayComeInAnyOrder() {
        assertEquals(6, GreedyCoinChange.minCoins(63, new int[]{25, 1, 10, 5}));
    }

    @Test
    void aSingleDenominationIsUsedAsOftenAsPossible() {
        assertEquals(3, GreedyCoinChange.minCoins(9, new int[]{3}));
    }
}
