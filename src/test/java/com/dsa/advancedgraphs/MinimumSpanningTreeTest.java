package com.dsa.advancedgraphs;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertArrayEquals;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

class MinimumSpanningTreeTest {

    private static final int[][] GRAPH = {
            {0, 1, 3}, {1, 2, 4}, {0, 2, 2}, {2, 3, 5}, {1, 3, 1}};

    @Test
    void theTotalWeightAndTheEdgesAreReturned() {
        assertArrayEquals(new int[]{6, 1, 3, 1, 0, 2, 2, 0, 1, 3},
                MinimumSpanningTree.minimumSpanningTree(4, GRAPH));
    }

    @Test
    void theTreeHasExactlyNMinusOneEdges() {
        int[] mst = MinimumSpanningTree.minimumSpanningTree(4, GRAPH);
        assertEquals(1 + 3 * 3, mst.length);
    }

    @Test
    void theEdgesAreSortedByWeight() {
        int[] mst = MinimumSpanningTree.minimumSpanningTree(4, GRAPH);
        for (int i = 1; i + 3 < mst.length; i += 3) {
            assertTrue(mst[i + 2] <= mst[i + 5]);
        }
    }

    @Test
    void theTreeSpansEveryVertex() {
        int[] mst = MinimumSpanningTree.minimumSpanningTree(4, GRAPH);
        boolean[] seen = new boolean[4];
        for (int i = 1; i < mst.length; i += 3) {
            seen[mst[i]] = true;
            seen[mst[i + 1]] = true;
        }
        for (int v = 0; v < 4; v++) {
            assertTrue(seen[v], "vertex " + v + " is not in the tree");
        }
    }

    @Test
    void aDisconnectedGraphHasNoTree() {
        assertEquals(0, MinimumSpanningTree.minimumSpanningTree(4,
                new int[][]{{0, 1, 1}, {2, 3, 1}}).length);
    }

    @Test
    void aSingleVertexHasAnEmptyTree() {
        assertArrayEquals(new int[]{0}, MinimumSpanningTree.minimumSpanningTree(1, new int[0][3]));
    }

    @Test
    void theTotalWeightMatchesKruskal() {
        assertEquals(KruskalMinimumSpanningTree.mstWeight(4, GRAPH),
                MinimumSpanningTree.minimumSpanningTree(4, GRAPH)[0]);
    }
}
