package com.dsa.graphs;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class NumberOfConnectedComponentsTest {

    @Test
    void countsTwoComponents() {
        assertEquals(2, NumberOfConnectedComponents.countComponents(5,
                new int[][]{{0, 1}, {1, 2}, {3, 4}}));
    }

    @Test
    void aGraphWithoutEdgesHasOneComponentPerVertex() {
        assertEquals(4, NumberOfConnectedComponents.countComponents(4, new int[0][2]));
    }

    @Test
    void aConnectedGraphHasOneComponent() {
        assertEquals(1, NumberOfConnectedComponents.countComponents(4,
                new int[][]{{0, 1}, {1, 2}, {2, 3}}));
    }

    @Test
    void aSingleVertexIsOneComponent() {
        assertEquals(1, NumberOfConnectedComponents.countComponents(1, new int[0][2]));
    }

    @Test
    void duplicateEdgesDoNotMergeComponents() {
        assertEquals(2, NumberOfConnectedComponents.countComponents(3,
                new int[][]{{0, 1}, {0, 1}, {0, 1}}));
    }

    @Test
    void aTriangleAndAnIsolatedVertex() {
        assertEquals(2, NumberOfConnectedComponents.countComponents(4,
                new int[][]{{0, 1}, {1, 2}, {2, 0}}));
    }

    @Test
    void aStarHasOneComponent() {
        assertEquals(1, NumberOfConnectedComponents.countComponents(4,
                new int[][]{{0, 1}, {0, 2}, {0, 3}}));
    }
}
