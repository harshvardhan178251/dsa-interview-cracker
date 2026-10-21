package com.dsa.binarysearch;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

class KokoEatingBananasTest {

    @Test
    void findsTheMinimumSpeed() {
        assertEquals(5, KokoEatingBananas.minEatingSpeed(new int[]{3, 1, 4, 1, 5}, 5));
    }

    @Test
    void handlesASinglePile() {
        assertEquals(1, KokoEatingBananas.minEatingSpeed(new int[]{4}, 4));
        assertEquals(2, KokoEatingBananas.minEatingSpeed(new int[]{4}, 2));
    }

    @Test
    void handlesASinglePileWithOneHourPerPile() {
        assertEquals(9, KokoEatingBananas.minEatingSpeed(new int[]{9}, 1));
    }

    @Test
    void returnsOneWhenTheHourBudgetIsHuge() {
        assertEquals(1, KokoEatingBananas.minEatingSpeed(new int[]{3, 1, 4, 1, 5}, 100));
    }

    @Test
    void theAnswerIsNeverFasterThanTheLargestPile() {
        int[] piles = {30, 11, 23, 4, 20};
        for (int h = piles.length; h <= 200; h++) {
            int speed = KokoEatingBananas.minEatingSpeed(piles, h);
            assertTrue(speed >= 1 && speed <= 30, "h = " + h);
        }
    }

    @Test
    void aSlowerSpeedNeverFinishesInTime() {
        int[] piles = {3, 1, 4, 1, 5};
        int h = 5;
        int answer = KokoEatingBananas.minEatingSpeed(piles, h);
        long hours = 0;
        for (int pile : piles) {
            hours += (pile + answer - 1) / answer;
        }
        assertTrue(hours <= h, "the answer must finish in time");

        if (answer > 1) {
            long slower = 0;
            for (int pile : piles) {
                slower += (pile + answer - 2) / (answer - 1);
            }
            assertTrue(slower > h, "one notch slower must not finish in time");
        }
    }
}
