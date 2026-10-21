package com.dsa.binarysearch;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

class CapacityToShipPackagesTest {

    @Test
    void findsTheMinimumCapacity() {
        assertEquals(9, CapacityToShipPackages.shipWithinDays(new int[]{1, 2, 3, 4, 5, 6}, 3));
    }

    @Test
    void handlesOneDay() {
        assertEquals(21, CapacityToShipPackages.shipWithinDays(new int[]{1, 2, 3, 4, 5, 6}, 1));
    }

    @Test
    void handlesOneDayPerPackage() {
        assertEquals(6, CapacityToShipPackages.shipWithinDays(new int[]{1, 2, 3, 4, 5, 6}, 6));
    }

    @Test
    void handlesASinglePackage() {
        assertEquals(7, CapacityToShipPackages.shipWithinDays(new int[]{7}, 1));
        assertEquals(7, CapacityToShipPackages.shipWithinDays(new int[]{7}, 5));
    }

    @Test
    void handlesEqualWeights() {
        assertEquals(20, CapacityToShipPackages.shipWithinDays(new int[]{10, 10, 10, 10}, 2));
        assertEquals(10, CapacityToShipPackages.shipWithinDays(new int[]{10, 10, 10, 10}, 4));
    }

    @Test
    void theCapacityIsNeverBelowTheHeaviestPackage() {
        int[] weights = {3, 5, 6, 7, 9};
        for (int days = 1; days <= weights.length; days++) {
            int capacity = CapacityToShipPackages.shipWithinDays(weights, days);
            assertTrue(capacity >= 9, "days = " + days);
        }
    }
}
