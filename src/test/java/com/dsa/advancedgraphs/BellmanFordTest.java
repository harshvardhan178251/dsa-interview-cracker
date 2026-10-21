package com.dsa.advancedgraphs;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertArrayEquals;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;

class BellmanFordTest {

    @Test
    void handlesNegativeEdgeWeights() {
        assertArrayEquals(new int[]{0, 3, 1, 3}, BellmanFord.shortestPaths(4,
                new int[][]{{0, 1, 3}, {1, 2, -2}, {0, 2, 5}, {2, 3, 2}}, 0));
    }

    @Test
    void detectsANegativeCycle() {
        assertNull(BellmanFord.shortestPaths(4,
                new int[][]{{0, 1, 1}, {1, 2, -1}, {2, 1, -1}, {0, 3, 5}}, 0));
    }

    @Test
    void aNegativeCycleThatIsNotReachableIsIgnored() {
        // vertices 2 and 3 form a negative cycle, but neither is reachable from vertex 0
        int[] dist = BellmanFord.shortestPaths(4,
                new int[][]{{0, 1, 4}, {2, 3, -3}, {3, 2, -3}}, 0);
        assertArrayEquals(new int[]{0, 4, Integer.MAX_VALUE, Integer.MAX_VALUE}, dist);
    }

    @Test
    void anUnreachableVertexKeepsTheInfiniteDistance() {
        int[] dist = BellmanFord.shortestPaths(3, new int[][]{{0, 1, 5}}, 0);
        assertEquals(Integer.MAX_VALUE, dist[2]);
    }

    @Test
    void aSingleVertexHasDistanceZero() {
        assertArrayEquals(new int[]{0}, BellmanFord.shortestPaths(1, new int[0][3], 0));
    }

    @Test
    void aGraphWithoutNegativeWeightsAgreesWithDijkstra() {
        int[][] edges = {{0, 1, 3}, {1, 2, 4}, {0, 2, 1}, {2, 3, 2}};
        assertArrayEquals(DijkstraShortestPath.shortestPaths(4, edges, 0),
                BellmanFord.shortestPaths(4, edges, 0));
    }

    @Test
    void aNegativeEdgeCanMakeAShorterRoute() {
        assertArrayEquals(new int[]{0, 4, 2}, BellmanFord.shortestPaths(3,
                new int[][]{{0, 1, 4}, {1, 2, -2}}, 0));
    }
}
