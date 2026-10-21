package com.dsa.graphs;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertArrayEquals;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

class ReconstructItineraryTest {

    @Test
    void reconstructsTheSampleItinerary() {
        assertArrayEquals(new int[]{0, 1, 2, 3, 4},
                ReconstructItinerary.reconstructItinerary(5,
                        new int[][]{{1, 2}, {0, 1}, {3, 4}, {2, 3}}));
    }

    @Test
    void everyTicketIsUsedExactlyOnce() {
        int[][] edges = {{0, 1}, {1, 2}, {2, 0}, {2, 3}, {3, 4}, {4, 2}};
        int[] itinerary = ReconstructItinerary.reconstructItinerary(5, edges);
        assertEquals(edges.length + 1, itinerary.length);
    }

    @Test
    void theItineraryFollowsTheFlights() {
        int[][] edges = {{0, 1}, {1, 2}, {2, 3}};
        int[] itinerary = ReconstructItinerary.reconstructItinerary(4, edges);
        for (int i = 0; i + 1 < itinerary.length; i++) {
            boolean found = false;
            for (int[] edge : edges) {
                if (edge[0] == itinerary[i] && edge[1] == itinerary[i + 1]) {
                    found = true;
                    break;
                }
            }
            assertTrue(found, "no flight from " + itinerary[i] + " to " + itinerary[i + 1]);
        }
    }

    @Test
    void anEulerianCircuitStartsAtTheSmallestAirport() {
        int[][] edges = {{0, 1}, {1, 2}, {2, 0}};
        int[] itinerary = ReconstructItinerary.reconstructItinerary(3, edges);
        assertEquals(0, itinerary[0]);
        assertEquals(4, itinerary.length);
    }

    @Test
    void aGraphWithoutAnItineraryGivesAnEmptyResult() {
        // airport 0 has two outgoing flights and no incoming one: no Eulerian path exists
        assertEquals(0, ReconstructItinerary.reconstructItinerary(3,
                new int[][]{{0, 1}, {0, 2}}).length);
    }

    @Test
    void aSingleFlightGivesTwoAirports() {
        assertArrayEquals(new int[]{0, 1},
                ReconstructItinerary.reconstructItinerary(2, new int[][]{{0, 1}}));
    }

    @Test
    void theItineraryStartsAtTheAirportWithOneExtraOutgoingFlight() {
        // out-degree minus in-degree: 0 -> +1, 1 -> -1, the rest balanced
        int[] itinerary = ReconstructItinerary.reconstructItinerary(5,
                new int[][]{{0, 1}, {0, 2}, {3, 0}, {2, 4}, {4, 3}});
        assertEquals(0, itinerary[0]);
        assertEquals(6, itinerary.length);
    }
}
