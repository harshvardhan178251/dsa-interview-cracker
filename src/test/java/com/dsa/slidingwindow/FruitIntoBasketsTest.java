package com.dsa.slidingwindow;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

class FruitIntoBasketsTest {

    @Test
    void findsTheMaximumNumberOfFruits() {
        assertEquals(4, FruitIntoBaskets.maxFruitBaskets(new int[]{1, 2, 3, 2, 2}, 2));
    }

    @Test
    void handlesASingleFruit() {
        assertEquals(1, FruitIntoBaskets.maxFruitBaskets(new int[]{7}, 2));
    }

    @Test
    void handlesOneBasket() {
        assertEquals(3, FruitIntoBaskets.maxFruitBaskets(new int[]{1, 1, 1, 2, 2, 3}, 1));
    }

    @Test
    void handlesMoreBasketsThanFruitTypes() {
        assertEquals(5, FruitIntoBaskets.maxFruitBaskets(new int[]{1, 2, 1, 2, 2}, 5));
    }

    @Test
    void handlesAnEmptyArray() {
        assertEquals(0, FruitIntoBaskets.maxFruitBaskets(new int[]{}, 2));
    }

    @Test
    void theAnswerIsNeverLongerThanTheArray() {
        int[][] cases = {{1, 2, 3, 2, 2}, {0, 1, 2}, {5, 5, 5}};
        for (int[] fruits : cases) {
            for (int k = 1; k <= 3; k++) {
                int answer = FruitIntoBaskets.maxFruitBaskets(fruits, k);
                assertTrue(answer <= fruits.length, "k = " + k);
            }
        }
    }
}
