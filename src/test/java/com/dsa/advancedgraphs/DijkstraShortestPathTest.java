package com.dsa.advancedgraphs;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertArrayEquals;
import static org.junit.jupiter.api.Assertions.assertEquals;

class DijkstraShortestPathTest {

    @Test
    void computesEveryDistanceFromTheSource() {
        assertArrayEquals(new int[]{0, 3, 1, 3}, DijkstraShortestPath.shortestPaths(4,
                new int[][]{{0, 1, 3}, {1, 2, 4}, {0, 2, 1}, {2, 3, 2}}, 0));
    }

    @Test
    void anUnreachableVertexKeepsTheInfiniteDistance() {
        int[] dist = DijkstraShortestPath.shortestPaths(3, new int[][]{{0, 1, 5}}, 0);
        assertEquals(0, dist[0]);
        assertEquals(5, dist[1]);
        assertEquals(Integer.MAX_VALUE, dist[2]);
    }

    @Test
    void aSingleVertexHasDistanceZero() {
        assertArrayEquals(new int[]{0}, DijkstraShortestPath.shortestPaths(1, new int[0][3], 0));
    }

    @Test
    void theCheaperOfTwoRoutesWins() {
        assertArrayEquals(new int[]{0, 3, 1}, DijkstraShortestPath.shortestPaths(3,
                new int[][]{{0, 1, 10}, {0, 2, 1}, {2, 1, 2}}, 0));
    }

    @Test
    void zeroWeightEdgesAreAllowed() {
        assertArrayEquals(new int[]{0, 0, 0}, DijkstraShortestPath.shortestPaths(3,
                new int[][]{{0, 1, 0}, {1, 2, 0}}, 0));
    }

    @Test
    void aParallelEdgeKeepsTheCheapestOne() {
        assertArrayEquals(new int[]{0, 2}, DijkstraShortestPath.shortestPaths(2,
                new int[][]{{0, 1, 7}, {0, 1, 2}}, 0));
    }

    @Test
    void theSourceCanBeAnyVertex() {
        assertArrayEquals(new int[]{3, 0}, DijkstraShortestPath.shortestPaths(2,
                new int[][]{{1, 0, 3}}, 1));
    }
}
