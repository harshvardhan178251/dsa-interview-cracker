package com.dsa.advancedgraphs;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertArrayEquals;
import static org.junit.jupiter.api.Assertions.assertEquals;

class EulerianPathTest {

    @Test
    void findsThePathOfTheSampleGraph() {
        assertArrayEquals(new int[]{0, 1, 2, 3},
                EulerianPath.eulerianPath(4, new int[][]{{0, 1}, {1, 2}, {2, 3}}));
    }

    @Test
    void findsAnEulerianCircuit() {
        assertArrayEquals(new int[]{0, 1, 2, 0},
                EulerianPath.eulerianPath(3, new int[][]{{0, 1}, {1, 2}, {2, 0}}));
    }

    @Test
    void aVertexWithTwoExtraOutgoingEdgesHasNoPath() {
        assertEquals(0, EulerianPath.eulerianPath(3,
                new int[][]{{0, 1}, {0, 2}}).length);
    }

    @Test
    void twoSeparateCyclesHaveNoSinglePath() {
        assertEquals(0, EulerianPath.eulerianPath(4,
                new int[][]{{0, 1}, {1, 0}, {2, 3}, {3, 2}}).length);
    }

    @Test
    void aGraphWithoutEdgesHasNoPath() {
        assertEquals(0, EulerianPath.eulerianPath(3, new int[0][2]).length);
    }

    @Test
    void everyEdgeIsUsedExactlyOnce() {
        int[][] edges = {{0, 1}, {1, 2}, {2, 0}, {2, 3}, {3, 4}, {4, 2}};
        int[] path = EulerianPath.eulerianPath(5, edges);
        assertEquals(edges.length + 1, path.length);
    }

    @Test
    void thePathFollowsTheEdges() {
        int[][] edges = {{0, 1}, {1, 2}, {2, 3}};
        int[] path = EulerianPath.eulerianPath(4, edges);
        for (int i = 0; i + 1 < path.length; i++) {
            boolean found = false;
            for (int[] edge : edges) {
                if (edge[0] == path[i] && edge[1] == path[i + 1]) {
                    found = true;
                    break;
                }
            }
            assertEquals(true, found, "no edge from " + path[i] + " to " + path[i + 1]);
        }
    }

    @Test
    void aSingleEdgeIsItsOwnPath() {
        assertArrayEquals(new int[]{0, 1},
                EulerianPath.eulerianPath(2, new int[][]{{0, 1}}));
    }
}
