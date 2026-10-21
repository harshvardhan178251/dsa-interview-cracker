package com.dsa.twopointers;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class ContainerWithMostWaterTest {

    @Test
    void findsTheBiggestContainer() {
        assertEquals(49, ContainerWithMostWater.maxArea(new int[]{1, 8, 6, 2, 5, 4, 8, 3, 7}));
    }

    @Test
    void twoLinesOnly() {
        assertEquals(1, ContainerWithMostWater.maxArea(new int[]{1, 2}));
    }

    @Test
    void equalHeights() {
        assertEquals(6, ContainerWithMostWater.maxArea(new int[]{3, 3, 3}));
    }

    @Test
    void zeroHeights() {
        assertEquals(0, ContainerWithMostWater.maxArea(new int[]{0, 0}));
    }

    @Test
    void strictlyIncreasingHeights() {
        assertEquals(4, ContainerWithMostWater.maxArea(new int[]{1, 2, 3, 4}));
    }

    @Test
    void strictlyDecreasingHeights() {
        assertEquals(4, ContainerWithMostWater.maxArea(new int[]{4, 3, 2, 1}));
    }

    @Test
    void singleLineHoldsNothing() {
        assertEquals(0, ContainerWithMostWater.maxArea(new int[]{5}));
    }
}
