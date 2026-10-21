package com.dsa.dynamicprogramming;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class RodCuttingTest {

    @Test
    void classicExample() {
        assertEquals(12, RodCutting.maxRevenue(4, new int[]{2, 6, 8, 10}));
    }

    @Test
    void singleUnitRod() {
        assertEquals(5, RodCutting.maxRevenue(1, new int[]{5}));
    }

    @Test
    void cuttingIsAlwaysAllowed() {
        assertEquals(22, RodCutting.maxRevenue(8, new int[]{1, 5, 8, 9, 10, 17, 17, 20}));
    }

    @Test
    void neverWorthCutting() {
        assertEquals(7, RodCutting.maxRevenue(3, new int[]{2, 3, 7}));
    }

    @Test
    void alwaysWorthCutting() {
        assertEquals(12, RodCutting.maxRevenue(3, new int[]{4, 4, 4}));
    }
}
