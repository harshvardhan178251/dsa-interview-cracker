package com.dsa.dynamicprogramming;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class HouseRobberTest {

    @Test
    void classicExample() {
        assertEquals(4, HouseRobber.rob(new int[]{1, 2, 3, 1}));
    }

    @Test
    void greedyTrap() {
        assertEquals(11, HouseRobber.rob(new int[]{2, 7, 9, 3}));
    }

    @Test
    void singleHouse() {
        assertEquals(5, HouseRobber.rob(new int[]{5}));
    }

    @Test
    void emptyStreet() {
        assertEquals(0, HouseRobber.rob(new int[]{}));
    }

    @Test
    void twoAdjacentHousesPickTheBigger() {
        assertEquals(9, HouseRobber.rob(new int[]{4, 9}));
    }

    @Test
    void zerosAreAllowed() {
        assertEquals(0, HouseRobber.rob(new int[]{0, 0, 0}));
    }
}
