package com.dsa.graphs;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class CheapestFlightsWithinKStopsTest {

    @Test
    void theCheapestRouteWithOneStopIsFound() {
        assertEquals(300, CheapestFlightsWithinKStops.findCheapestPrice(4,
                new int[][]{{0, 1, 100}, {1, 2, 100}, {0, 2, 300}, {2, 3, 100}, {1, 3, 200}},
                0, 3, 1));
    }

    @Test
    void moreStopsAllowTheCheaperRoute() {
        // with two stops the route 0 -> 1 -> 2 -> 3 costs 300 as well, but 0 -> 1 -> 3 costs 300 too
        assertEquals(300, CheapestFlightsWithinKStops.findCheapestPrice(4,
                new int[][]{{0, 1, 100}, {1, 2, 100}, {0, 2, 300}, {2, 3, 100}, {1, 3, 200}},
                0, 3, 2));
    }

    @Test
    void zeroStopsMeansADirectFlightOnly() {
        assertEquals(-1, CheapestFlightsWithinKStops.findCheapestPrice(4,
                new int[][]{{0, 1, 100}, {1, 2, 100}, {0, 2, 300}, {2, 3, 100}, {1, 3, 200}},
                0, 3, 0));
    }

    @Test
    void aDirectFlightIsFoundWithZeroStops() {
        assertEquals(50, CheapestFlightsWithinKStops.findCheapestPrice(2,
                new int[][]{{0, 1, 50}}, 0, 1, 0));
    }

    @Test
    void anUnreachableDestinationGivesMinusOne() {
        assertEquals(-1, CheapestFlightsWithinKStops.findCheapestPrice(2, new int[0][3], 0, 1, 5));
    }

    @Test
    void theSourceIsTheDestinationCostsNothing() {
        assertEquals(0, CheapestFlightsWithinKStops.findCheapestPrice(2, new int[0][3], 1, 1, 3));
    }

    @Test
    void aCycleIsHandledWithoutLoopingForever() {
        assertEquals(1, CheapestFlightsWithinKStops.findCheapestPrice(2,
                new int[][]{{0, 1, 1}, {1, 0, 1}}, 0, 1, 3));
    }
}
