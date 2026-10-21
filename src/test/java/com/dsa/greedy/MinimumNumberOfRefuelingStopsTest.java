package com.dsa.greedy;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class MinimumNumberOfRefuelingStopsTest {

    @Test
    void twoStopsAreEnough() {
        assertEquals(2, MinimumNumberOfRefuelingStops.minRefuelStops(100, 10,
                new int[][]{{10, 60}, {20, 30}, {30, 30}, {60, 40}}));
    }

    @Test
    void theInitialFuelIsEnough() {
        assertEquals(0, MinimumNumberOfRefuelingStops.minRefuelStops(10, 10,
                new int[][]{{5, 5}}));
    }

    @Test
    void anUnreachableTargetReturnsMinusOne() {
        assertEquals(-1, MinimumNumberOfRefuelingStops.minRefuelStops(100, 1,
                new int[][]{{10, 100}}));
    }

    @Test
    void aTargetOfZeroNeedsNoStop() {
        assertEquals(0, MinimumNumberOfRefuelingStops.minRefuelStops(0, 0,
                new int[][]{{1, 1}}));
    }

    @Test
    void withoutAnyStationOnlyTheInitialFuelCounts() {
        assertEquals(-1, MinimumNumberOfRefuelingStops.minRefuelStops(50, 10, new int[][]{}));
    }

    @Test
    void stationsAreSortedBeforeTheyAreUsed() {
        assertEquals(2, MinimumNumberOfRefuelingStops.minRefuelStops(100, 10,
                new int[][]{{60, 40}, {10, 60}, {30, 30}, {20, 30}}));
    }
}
