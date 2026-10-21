package com.dsa.dynamicprogramming;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class HouseRobberIITest {

    @Test
    void classicExample() {
        assertEquals(3, HouseRobberII.rob(new int[]{2, 3, 2}));
    }

    @Test
    void fiveHouseCircle() {
        assertEquals(6, HouseRobberII.rob(new int[]{2, 3, 2, 3, 2}));
    }

    @Test
    void singleHouse() {
        assertEquals(7, HouseRobberII.rob(new int[]{7}));
    }

    @Test
    void twoHousesPickTheRicher() {
        assertEquals(9, HouseRobberII.rob(new int[]{4, 9}));
    }

    @Test
    void emptyStreet() {
        assertEquals(0, HouseRobberII.rob(new int[]{}));
    }

    @Test
    void firstAndLastAreNeverTakenTogether() {
        assertEquals(21, HouseRobberII.rob(new int[]{20, 1, 1, 20}));
    }
}
