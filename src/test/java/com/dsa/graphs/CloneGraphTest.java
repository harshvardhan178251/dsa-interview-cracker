package com.dsa.graphs;

import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotSame;
import static org.junit.jupiter.api.Assertions.assertTrue;

class CloneGraphTest {

    private static CloneGraph.Node[] graph(int[] values, int[][] edges) {
        CloneGraph.Node[] nodes = new CloneGraph.Node[values.length];
        for (int i = 0; i < values.length; i++) {
            nodes[i] = new CloneGraph.Node(values[i]);
        }
        for (int[] edge : edges) {
            nodes[edge[0]].neighbors.add(nodes[edge[1]]);
            nodes[edge[1]].neighbors.add(nodes[edge[0]]);
        }
        return nodes;
    }

    @Test
    void theCopyHasTheSameShape() {
        CloneGraph.Node[] nodes = graph(new int[]{1, 2, 3}, new int[][]{{0, 1}, {1, 2}});
        CloneGraph.Node copy = CloneGraph.cloneGraph(nodes[0]);
        assertEquals(1, copy.val);
        assertEquals(1, copy.neighbors.size());
        assertEquals(2, copy.neighbors.get(0).val);
        assertEquals(2, copy.neighbors.get(0).neighbors.size());
    }

    @Test
    void theCopySharesNoNodeWithTheOriginal() {
        CloneGraph.Node[] nodes = graph(new int[]{1, 2, 3}, new int[][]{{0, 1}, {1, 2}});
        CloneGraph.Node copy = CloneGraph.cloneGraph(nodes[0]);
        assertNotSame(nodes[0], copy);
        assertNotSame(nodes[1], copy.neighbors.get(0));
    }

    @Test
    void aCycleIsCopiedWithoutLooping() {
        CloneGraph.Node[] nodes = graph(new int[]{1, 2, 3}, new int[][]{{0, 1}, {1, 2}, {2, 0}});
        CloneGraph.Node copy = CloneGraph.cloneGraph(nodes[0]);
        assertEquals(2, copy.neighbors.size());
        assertEquals(2, copy.neighbors.get(0).neighbors.size());
    }

    @Test
    void aSingleNodeWithNoNeighboursIsCopied() {
        CloneGraph.Node node = new CloneGraph.Node(7);
        CloneGraph.Node copy = CloneGraph.cloneGraph(node);
        assertEquals(7, copy.val);
        assertTrue(copy.neighbors.isEmpty());
        assertNotSame(node, copy);
    }

    @Test
    void aSelfLoopIsCopied() {
        CloneGraph.Node node = new CloneGraph.Node(1);
        node.neighbors.add(node);
        CloneGraph.Node copy = CloneGraph.cloneGraph(node);
        assertEquals(1, copy.neighbors.size());
        assertEquals(1, copy.neighbors.get(0).val);
    }

    @Test
    void cloningNullGivesNull() {
        org.junit.jupiter.api.Assertions.assertNull(CloneGraph.cloneGraph(null));
    }

    @Test
    void everyOriginalNodeHasExactlyOneCopy() {
        CloneGraph.Node[] nodes = graph(new int[]{1, 2, 3, 4},
                new int[][]{{0, 1}, {1, 2}, {2, 3}, {3, 0}});
        java.util.Map<CloneGraph.Node, CloneGraph.Node> copies = new java.util.HashMap<>();
        CloneGraph.cloneGraph(nodes[0], copies);
        assertEquals(4, copies.size());
        for (CloneGraph.Node original : nodes) {
            assertTrue(copies.containsKey(original));
        }
    }

    @Test
    void aDisconnectedSecondComponentIsCopiedToo() {
        CloneGraph.Node[] nodes = graph(new int[]{1, 2}, new int[][]{});
        java.util.Map<CloneGraph.Node, CloneGraph.Node> copies = new java.util.HashMap<>();
        for (CloneGraph.Node node : nodes) {
            CloneGraph.cloneGraph(node, copies);
        }
        assertEquals(2, copies.size());
        List<Integer> values = new ArrayList<>();
        for (CloneGraph.Node copy : copies.values()) {
            values.add(copy.val);
        }
        assertTrue(values.contains(1));
        assertTrue(values.contains(2));
    }
}
