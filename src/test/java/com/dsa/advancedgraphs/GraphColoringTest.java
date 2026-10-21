package com.dsa.advancedgraphs;

import org.junit.jupiter.api.Test;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

class GraphColoringTest {

    @Test
    void aTriangleNeedsThreeColours() {
        int[] colouring = GraphColoring.minimumColoring(3, new int[][]{{0, 1}, {1, 2}, {2, 0}});
        assertEquals(3, colouring[0]);
    }

    @Test
    void theSampleGraphNeedsThreeColours() {
        int[] colouring = GraphColoring.minimumColoring(5,
                new int[][]{{0, 1}, {1, 2}, {2, 0}, {2, 3}, {3, 4}});
        assertEquals(3, colouring[0]);
    }

    @Test
    void aPathNeedsTwoColours() {
        int[] colouring = GraphColoring.minimumColoring(4,
                new int[][]{{0, 1}, {1, 2}, {2, 3}});
        assertEquals(2, colouring[0]);
    }

    @Test
    void aGraphWithoutEdgesNeedsOneColour() {
        int[] colouring = GraphColoring.minimumColoring(3, new int[0][2]);
        assertEquals(1, colouring[0]);
    }

    @Test
    void aCompleteGraphNeedsOneColourPerVertex() {
        int[] colouring = GraphColoring.minimumColoring(4,
                new int[][]{{0, 1}, {0, 2}, {0, 3}, {1, 2}, {1, 3}, {2, 3}});
        assertEquals(4, colouring[0]);
    }

    @Test
    void theColouringIsProper() {
        int[][] edges = {{0, 1}, {1, 2}, {2, 0}, {2, 3}, {3, 4}};
        int[] colouring = GraphColoring.minimumColoring(5, edges);
        for (int[] edge : edges) {
            assertTrue(colouring[edge[0] + 1] != colouring[edge[1] + 1],
                    "vertices " + edge[0] + " and " + edge[1] + " share a colour");
        }
    }

    @Test
    void everyColourIsBetweenOneAndTheNumberOfColours() {
        int[] colouring = GraphColoring.minimumColoring(5,
                new int[][]{{0, 1}, {1, 2}, {2, 0}, {2, 3}, {3, 4}});
        Set<Integer> used = new HashSet<>();
        for (int v = 0; v < 5; v++) {
            int colour = colouring[v + 1];
            assertTrue(colour >= 1 && colour <= colouring[0]);
            used.add(colour);
        }
        assertEquals(colouring[0], used.size());
    }

    @Test
    void theColouringIsReproducible() {
        int[][] edges = {{0, 1}, {1, 2}, {2, 0}, {2, 3}, {3, 4}};
        int[] first = GraphColoring.minimumColoring(5, edges);
        int[] second = GraphColoring.minimumColoring(5, edges);
        assertEquals(first[0], second[0]);
        for (int v = 1; v < first.length; v++) {
            assertEquals(first[v], second[v]);
        }
    }

    @Test
    void aSingleVertexNeedsOneColour() {
        assertEquals(1, GraphColoring.minimumColoring(1, new int[0][2])[0]);
    }
}
