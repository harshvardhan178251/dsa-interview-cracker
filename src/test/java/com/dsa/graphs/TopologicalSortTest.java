package com.dsa.graphs;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertArrayEquals;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;

class TopologicalSortTest {

    @Test
    void sortsTheSampleGraph() {
        assertArrayEquals(new int[]{4, 5, 0, 2, 3, 1},
                TopologicalSort.topologicalOrder(6,
                        new int[][]{{5, 2}, {5, 0}, {4, 0}, {4, 1}, {2, 3}, {3, 1}}));
    }

    @Test
    void theOrderRespectsEveryEdge() {
        int[][] edges = {{0, 1}, {0, 2}, {1, 3}, {2, 3}, {3, 4}};
        int[] order = TopologicalSort.topologicalOrder(5, edges);
        int[] position = new int[5];
        for (int i = 0; i < order.length; i++) {
            position[order[i]] = i;
        }
        for (int[] edge : edges) {
            assertEquals(true, position[edge[0]] < position[edge[1]]);
        }
    }

    @Test
    void aCycleProducesAnEmptyOrder() {
        assertEquals(0, TopologicalSort.topologicalOrder(3,
                new int[][]{{0, 1}, {1, 2}, {2, 0}}).length);
    }

    @Test
    void aGraphWithoutEdgesKeepsTheVertexOrder() {
        assertArrayEquals(new int[]{0, 1, 2}, TopologicalSort.topologicalOrder(3, new int[0][2]));
    }

    @Test
    void aSingleVertexIsItsOwnOrder() {
        assertArrayEquals(new int[]{0}, TopologicalSort.topologicalOrder(1, new int[0][2]));
    }

    @Test
    void everyVertexAppearsExactlyOnce() {
        int[] order = TopologicalSort.topologicalOrder(4,
                new int[][]{{0, 1}, {1, 2}, {2, 3}});
        boolean[] seen = new boolean[4];
        for (int v : order) {
            assertFalse(seen[v]);
            seen[v] = true;
        }
    }
}
