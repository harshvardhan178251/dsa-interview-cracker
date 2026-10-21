package com.dsa.dynamicprogramming;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class BurstBalloonsTest {

    @Test
    void classicExample() {
        assertEquals(35, BurstBalloons.maxBurst(new int[]{3, 1, 5}));
    }

    @Test
    void leetcodeExample() {
        assertEquals(167, BurstBalloons.maxBurst(new int[]{3, 1, 5, 8}));
    }

    @Test
    void twoBalloons() {
        assertEquals(10, BurstBalloons.maxBurst(new int[]{1, 5}));
    }

    @Test
    void singleBalloon() {
        assertEquals(3, BurstBalloons.maxBurst(new int[]{3}));
    }

    @Test
    void zeroesAreFree() {
        assertEquals(0, BurstBalloons.maxBurst(new int[]{0, 0}));
    }
}
