package com.dsa.advancedgraphs;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertArrayEquals;
import static org.junit.jupiter.api.Assertions.assertEquals;

class FloydWarshallTest {

    @Test
    void computesTheWholeDistanceMatrix() {
        int[][] dist = FloydWarshall.allPairsShortestPaths(4,
                new int[][]{{0, 1, 3}, {1, 2, 4}, {0, 2, 1}, {2, 3, 2}});
        assertArrayEquals(new int[]{0, 3, 1, 3}, dist[0]);
        assertArrayEquals(new int[]{Integer.MAX_VALUE, 0, 4, 6}, dist[1]);
        assertArrayEquals(new int[]{Integer.MAX_VALUE, Integer.MAX_VALUE, 0, 2}, dist[2]);
        assertArrayEquals(new int[]{Integer.MAX_VALUE, Integer.MAX_VALUE, Integer.MAX_VALUE, 0}, dist[3]);
    }

    @Test
    void theDiagonalIsZero() {
        int[][] dist = FloydWarshall.allPairsShortestPaths(3, new int[0][3]);
        for (int i = 0; i < 3; i++) {
            assertEquals(0, dist[i][i]);
        }
    }

    @Test
    void anUnreachablePairStaysInfinite() {
        int[][] dist = FloydWarshall.allPairsShortestPaths(2, new int[0][3]);
        assertEquals(Integer.MAX_VALUE, dist[0][1]);
        assertEquals(Integer.MAX_VALUE, dist[1][0]);
    }

    @Test
    void aParallelEdgeKeepsTheCheapestOne() {
        int[][] dist = FloydWarshall.allPairsShortestPaths(2,
                new int[][]{{0, 1, 9}, {0, 1, 2}});
        assertEquals(2, dist[0][1]);
    }

    @Test
    void negativeWeightsAreAllowed() {
        int[][] dist = FloydWarshall.allPairsShortestPaths(3,
                new int[][]{{0, 1, 4}, {1, 2, -2}});
        assertEquals(2, dist[0][2]);
    }

    @Test
    void theMatrixAgreesWithDijkstraForEverySource() {
        int[][] edges = {{0, 1, 3}, {1, 2, 4}, {0, 2, 1}, {2, 3, 2}};
        int[][] dist = FloydWarshall.allPairsShortestPaths(4, edges);
        for (int source = 0; source < 4; source++) {
            assertArrayEquals(DijkstraShortestPath.shortestPaths(4, edges, source), dist[source]);
        }
    }
}
