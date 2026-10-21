package com.dsa.advancedgraphs;

import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

class BridgesInGraphTest {

    private static String format(List<int[]> bridges) {
        StringBuilder sb = new StringBuilder();
        sb.append(bridges.size()).append('\n');
        for (int[] bridge : bridges) {
            sb.append(bridge[0]).append(' ').append(bridge[1]).append('\n');
        }
        return sb.toString();
    }

    @Test
    void findsTheTwoBridgesOfTheSampleGraph() {
        assertEquals("2\n1 3\n3 4\n", format(BridgesInGraph.findBridges(5,
                new int[][]{{0, 1}, {1, 2}, {2, 0}, {1, 3}, {3, 4}})));
    }

    @Test
    void aTreeIsAllBridges() {
        assertEquals("3\n0 1\n1 2\n2 3\n", format(BridgesInGraph.findBridges(4,
                new int[][]{{0, 1}, {1, 2}, {2, 3}})));
    }

    @Test
    void aCycleHasNoBridges() {
        assertEquals("0\n", format(BridgesInGraph.findBridges(3,
                new int[][]{{0, 1}, {1, 2}, {2, 0}})));
    }

    @Test
    void aGraphWithoutEdgesHasNoBridges() {
        assertEquals("0\n", format(BridgesInGraph.findBridges(4, new int[0][2])));
    }

    @Test
    void aSingleEdgeIsABridge() {
        assertEquals("1\n0 1\n", format(BridgesInGraph.findBridges(2, new int[][]{{0, 1}})));
    }

    @Test
    void parallelEdgesAreNotBridges() {
        // two parallel edges between 0 and 1: removing one keeps the other
        assertEquals("0\n", format(BridgesInGraph.findBridges(2,
                new int[][]{{0, 1}, {0, 1}})));
    }

    @Test
    void aBridgeIsPrintedWithTheSmallerVertexFirst() {
        List<int[]> bridges = BridgesInGraph.findBridges(3, new int[][]{{2, 0}, {0, 1}});
        assertTrue(bridges.size() == 2);
        for (int[] bridge : bridges) {
            assertTrue(bridge[0] < bridge[1]);
        }
    }
}
