package com.dsa.advancedgraphs;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class PrimMinimumSpanningTreeTest {

    private static final int[][] GRAPH = {
            {0, 1, 3}, {1, 2, 4}, {0, 2, 2}, {2, 3, 5}, {1, 3, 1}};

    @Test
    void theMstOfTheSampleGraphWeighsSix() {
        assertEquals(6, PrimMinimumSpanningTree.mstWeight(4, GRAPH));
    }

    @Test
    void primAndKruskalAgreeOnTheWeight() {
        assertEquals(KruskalMinimumSpanningTree.mstWeight(4, GRAPH),
                PrimMinimumSpanningTree.mstWeight(4, GRAPH));
    }

    @Test
    void aDisconnectedGraphHasNoSpanningTree() {
        assertEquals(-1, PrimMinimumSpanningTree.mstWeight(4,
                new int[][]{{0, 1, 1}, {2, 3, 1}}));
    }

    @Test
    void aSingleVertexHasAnEmptyTree() {
        assertEquals(0, PrimMinimumSpanningTree.mstWeight(1, new int[0][3]));
    }

    @Test
    void aSingleEdgeIsTheWholeTree() {
        assertEquals(7, PrimMinimumSpanningTree.mstWeight(2, new int[][]{{0, 1, 7}}));
    }

    @Test
    void aChainHasTheSumOfItsWeights() {
        assertEquals(6, PrimMinimumSpanningTree.mstWeight(4,
                new int[][]{{0, 1, 1}, {1, 2, 2}, {2, 3, 3}}));
    }

    @Test
    void aStarTakesEveryEdge() {
        assertEquals(6, PrimMinimumSpanningTree.mstWeight(4,
                new int[][]{{0, 1, 1}, {0, 2, 2}, {0, 3, 3}}));
    }

    @Test
    void negativeWeightsAreHandled() {
        assertEquals(-4, PrimMinimumSpanningTree.mstWeight(3,
                new int[][]{{0, 1, -2}, {1, 2, -2}, {0, 2, 10}}));
    }
}
