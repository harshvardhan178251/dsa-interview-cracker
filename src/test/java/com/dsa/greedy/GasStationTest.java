package com.dsa.greedy;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class GasStationTest {

    @Test
    void findsTheStationWhereTheCircuitWorks() {
        assertEquals(3, GasStation.canCompleteCircuit(new int[]{1, 2, 3, 4, 5}, new int[]{3, 4, 5, 1, 2}));
    }

    @Test
    void aSingleStationWithEnoughFuelWorks() {
        assertEquals(0, GasStation.canCompleteCircuit(new int[]{5}, new int[]{4}));
    }

    @Test
    void returnsMinusOneWhenTheTotalIsNegative() {
        assertEquals(-1, GasStation.canCompleteCircuit(new int[]{2, 3, 4}, new int[]{3, 4, 5}));
    }

    @Test
    void returnsMinusOneWhenTheStationsAreEmpty() {
        assertEquals(-1, GasStation.canCompleteCircuit(new int[]{}, new int[]{}));
    }

    @Test
    void returnsMinusOneWhenTheArraysHaveDifferentLengths() {
        assertEquals(-1, GasStation.canCompleteCircuit(new int[]{1, 2}, new int[]{1}));
    }

    @Test
    void everyStationHavingTheSameBalancePicksTheFirst() {
        assertEquals(0, GasStation.canCompleteCircuit(new int[]{2, 2, 2}, new int[]{1, 1, 1}));
    }
}
