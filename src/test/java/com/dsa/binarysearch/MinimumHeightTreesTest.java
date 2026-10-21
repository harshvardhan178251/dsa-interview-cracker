package com.dsa.binarysearch;

import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

class MinimumHeightTreesTest {

    @Test
    void findsTheCentroidsOfTheTree() {
        int[][] edges = {{3, 0}, {3, 1}, {3, 2}, {3, 4}, {5, 4}};
        assertEquals(List.of(3, 4), MinimumHeightTrees.findMinHeightTrees(6, edges, 2));
    }

    @Test
    void findsTheSingleCentreOfAStarShapedTree() {
        int[][] edges = {{1, 0}, {1, 2}, {1, 3}};
        assertEquals(List.of(1), MinimumHeightTrees.findMinHeightTrees(4, edges, 2));
    }

    @Test
    void findsTheMiddleOfAPath() {
        int[][] edges = {{0, 1}, {1, 2}, {2, 3}, {3, 4}, {4, 5}};
        assertEquals(List.of(2, 3), MinimumHeightTrees.findMinHeightTrees(6, edges, 2));
    }

    @Test
    void handlesASingleNodeTree() {
        assertEquals(List.of(0), MinimumHeightTrees.findMinHeightTrees(1, new int[0][], 1));
    }

    @Test
    void handlesATwoNodeTree() {
        assertEquals(List.of(0, 1), MinimumHeightTrees.findMinHeightTrees(2, new int[][]{{0, 1}}, 2));
    }

    @Test
    void keepingMoreNodesStopsOneLayerEarlier() {
        int[][] edges = {{0, 1}, {1, 2}, {2, 3}, {3, 4}, {4, 5}};
        assertEquals(List.of(1, 4), MinimumHeightTrees.findMinHeightTrees(6, edges, 4));
    }
}
