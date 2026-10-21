package com.dsa.intervals;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class CarFleetTest {

    @Test
    void countsTheFleetsThatReachTheTarget() {
        assertEquals(3, CarFleet.carFleet(12,
                new int[]{10, 8, 0, 3, 0}, new int[]{2, 4, 1, 1, 1}));
    }

    @Test
    void aSingleCarIsOneFleet() {
        assertEquals(1, CarFleet.carFleet(10, new int[]{0}, new int[]{1}));
    }

    @Test
    void withoutCarsThereIsNoFleet() {
        assertEquals(0, CarFleet.carFleet(10, new int[]{}, new int[]{}));
    }

    @Test
    void carsThatCatchUpJoinOneFleet() {
        assertEquals(1, CarFleet.carFleet(10, new int[]{0, 5}, new int[]{2, 1}));
    }

    @Test
    void theOrderOfTheInputDoesNotMatter() {
        assertEquals(3, CarFleet.carFleet(12,
                new int[]{0, 3, 0, 8, 10}, new int[]{1, 1, 1, 4, 2}));
    }

    @Test
    void carsThatNeverCatchUpFormSeparateFleets() {
        assertEquals(2, CarFleet.carFleet(10, new int[]{2, 0}, new int[]{1, 1}));
    }

    @Test
    void aFasterCarBehindCatchesUpAndJoinsTheFleet() {
        assertEquals(1, CarFleet.carFleet(10, new int[]{2, 0}, new int[]{1, 2}));
    }
}
