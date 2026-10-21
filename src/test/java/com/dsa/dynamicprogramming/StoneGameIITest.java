package com.dsa.dynamicprogramming;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class StoneGameIITest {

    @Test
    void leetcodeExample() {
        assertEquals(10, StoneGameII.stoneGameII(new int[]{2, 7, 9, 4, 4}));
    }

    @Test
    void singlePile() {
        assertEquals(5, StoneGameII.stoneGameII(new int[]{5}));
    }

    @Test
    void twoPiles() {
        assertEquals(9, StoneGameII.stoneGameII(new int[]{4, 5}));
    }

    @Test
    void leetCodeExample() {
        assertEquals(104, StoneGameII.stoneGameII(new int[]{1, 2, 3, 4, 5, 100}));
    }

    @Test
    void equalPilesSplitEvenly() {
        assertEquals(8, StoneGameII.stoneGameII(new int[]{4, 4}));
    }
}
