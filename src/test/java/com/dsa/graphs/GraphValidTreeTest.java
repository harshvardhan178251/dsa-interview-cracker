package com.dsa.graphs;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

class GraphValidTreeTest {

    @Test
    void aPathIsATree() {
        assertTrue(GraphValidTree.isValidTree(4, new int[][]{{0, 1}, {1, 2}, {2, 3}}));
    }

    @Test
    void aTriangleIsNotATree() {
        assertFalse(GraphValidTree.isValidTree(3, new int[][]{{0, 1}, {1, 2}, {2, 0}}));
    }

    @Test
    void aDisconnectedGraphWithTheRightEdgeCountIsNotATree() {
        assertFalse(GraphValidTree.isValidTree(5,
                new int[][]{{0, 1}, {0, 2}, {1, 2}, {3, 4}}));
    }

    @Test
    void theWrongNumberOfEdgesIsRejectedImmediately() {
        assertFalse(GraphValidTree.isValidTree(4, new int[][]{{0, 1}, {1, 2}}));
    }

    @Test
    void aSingleVertexIsATree() {
        assertTrue(GraphValidTree.isValidTree(1, new int[0][2]));
    }

    @Test
    void twoVerticesWithOneEdgeAreATree() {
        assertTrue(GraphValidTree.isValidTree(2, new int[][]{{0, 1}}));
    }

    @Test
    void aStarIsATree() {
        assertTrue(GraphValidTree.isValidTree(4,
                new int[][]{{0, 1}, {0, 2}, {0, 3}}));
    }
}
