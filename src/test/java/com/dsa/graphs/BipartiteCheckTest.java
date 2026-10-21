package com.dsa.graphs;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

class BipartiteCheckTest {

    @Test
    void aTriangleIsNotBipartite() {
        assertFalse(BipartiteCheck.isBipartite(3, new int[][]{{0, 1}, {1, 2}, {2, 0}}));
    }

    @Test
    void anEvenCycleIsBipartite() {
        assertTrue(BipartiteCheck.isBipartite(4, new int[][]{{0, 1}, {1, 2}, {2, 3}, {3, 0}}));
    }

    @Test
    void aTreeIsBipartite() {
        assertTrue(BipartiteCheck.isBipartite(4, new int[][]{{0, 1}, {0, 2}, {0, 3}}));
    }

    @Test
    void aGraphWithoutEdgesIsBipartite() {
        assertTrue(BipartiteCheck.isBipartite(4, new int[0][2]));
    }

    @Test
    void aSingleVertexIsBipartite() {
        assertTrue(BipartiteCheck.isBipartite(1, new int[0][2]));
    }

    @Test
    void twoOddCyclesInDifferentComponentsAreStillNotBipartite() {
        assertFalse(BipartiteCheck.isBipartite(6,
                new int[][]{{0, 1}, {1, 2}, {2, 0}, {3, 4}, {4, 5}, {5, 3}}));
    }

    @Test
    void anOddCycleOfLengthFiveIsNotBipartite() {
        assertFalse(BipartiteCheck.isBipartite(5,
                new int[][]{{0, 1}, {1, 2}, {2, 3}, {3, 4}, {4, 0}}));
    }

    @Test
    void aPathIsBipartite() {
        assertTrue(BipartiteCheck.isBipartite(5,
                new int[][]{{0, 1}, {1, 2}, {2, 3}, {3, 4}}));
    }
}
