package com.dsa.graphs;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class NetworkDelayTimeTest {

    @Test
    void theLargestShortestDistanceIsReturned() {
        assertEquals(3, NetworkDelayTime.networkDelayTime(4,
                new int[][]{{0, 1, 3}, {1, 2, 4}, {0, 3, 2}, {3, 2, 1}}, 0));
    }

    @Test
    void anUnreachableNodeGivesMinusOne() {
        assertEquals(-1, NetworkDelayTime.networkDelayTime(3,
                new int[][]{{0, 1, 5}}, 0));
    }

    @Test
    void aSingleNodeHasDelayZero() {
        assertEquals(0, NetworkDelayTime.networkDelayTime(1, new int[0][3], 0));
    }

    @Test
    void aGraphWithoutEdgesIsUnreachable() {
        assertEquals(-1, NetworkDelayTime.networkDelayTime(2, new int[0][3], 0));
    }

    @Test
    void aSingleEdgeGivesItsWeight() {
        assertEquals(7, NetworkDelayTime.networkDelayTime(2, new int[][]{{0, 1, 7}}, 0));
    }

    @Test
    void theCheaperOfTwoRoutesWins() {
        // 0->1 costs 10, 0->2->1 costs 3
        assertEquals(3, NetworkDelayTime.networkDelayTime(3,
                new int[][]{{0, 1, 10}, {0, 2, 1}, {2, 1, 2}}, 0));
    }

    @Test
    void theSourceItselfHasDistanceZero() {
        assertEquals(4, NetworkDelayTime.networkDelayTime(2, new int[][]{{0, 1, 4}}, 0));
    }
}
