package com.dsa.graphs;

import com.dsa.utils.FastScanner;

import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Deque;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Problem: Clone Graph
 * LeetCode: 133 | Difficulty: Medium | Frequency: 3/5
 * Pattern: Graph traversal, map from original to copy
 *
 * <p>Problem: Deep-copy an undirected connected graph. Every node keeps its value and the list of
 * its neighbours; the copy must share no node with the original.
 *
 * <p>Input format (stdin):
 * <pre>
 * n m
 * val0 val1 ... val(n-1)
 * u1 v1
 * ...
 * um vm
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 3 2
 * 1 2 3
 * 0 1
 * 1 2
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 1 2
 * 2 1 3
 * 3 2
 * </pre>
 *
 * <p>The output has one line per node, in the input order: the node's own value followed by
 * the values of its neighbours in the <b>clone</b>, sorted ascending.
 *
 * <p>Approach: BFS with a map from the original node to its copy. The map is what guarantees a
 * deep copy — when we meet a neighbour for the second time we reuse the copy we already made
 * instead of creating a second one.
 *
 * <p>Complexity: Time O(n + m), Space O(n + m).
 */
public class CloneGraph {

    /** A node of an undirected graph. */
    public static class Node {
        public int val;
        public List<Node> neighbors;

        public Node(int val) {
            this.val = val;
            this.neighbors = new ArrayList<>();
        }
    }

    /**
     * Deep-copies the connected component that contains {@code node}.
     *
     * @param node the node to clone
     * @return the copy of {@code node}
     */
    public static Node cloneGraph(Node node) {
        return cloneGraph(node, new HashMap<>());
    }

    /**
     * Deep-copies the connected component that contains {@code node}, reusing and extending an
     * existing original-to-copy map.
     *
     * @param node   the node to clone
     * @param copies map from original node to its copy; it is filled in place
     * @return the copy of {@code node}
     */
    public static Node cloneGraph(Node node, Map<Node, Node> copies) {
        if (node == null) {
            return null;
        }
        if (copies.containsKey(node)) {
            return copies.get(node); // already copied: never make a second copy of a node
        }
        Deque<Node> queue = new ArrayDeque<>();
        queue.add(node);
        copies.put(node, new Node(node.val));

        while (!queue.isEmpty()) {
            Node current = queue.poll();
            Node currentCopy = copies.get(current);
            for (Node neighbour : current.neighbors) {
                if (!copies.containsKey(neighbour)) {
                    copies.put(neighbour, new Node(neighbour.val));
                    queue.add(neighbour);
                }
                currentCopy.neighbors.add(copies.get(neighbour));
            }
        }
        return copies.get(node);
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int m = fs.nextInt();

        Node[] nodes = new Node[n];
        for (int i = 0; i < n; i++) {
            nodes[i] = new Node(fs.nextInt());
        }
        for (int i = 0; i < m; i++) {
            int u = fs.nextInt();
            int v = fs.nextInt();
            nodes[u].neighbors.add(nodes[v]);
            nodes[v].neighbors.add(nodes[u]);
        }

        Map<Node, Node> copies = new HashMap<>();
        for (int i = 0; i < n; i++) {
            cloneGraph(nodes[i], copies);
        }

        for (int i = 0; i < n; i++) {
            Node copy = copies.get(nodes[i]);
            List<Integer> neighbourValues = new ArrayList<>();
            for (Node neighbour : copy.neighbors) {
                neighbourValues.add(neighbour.val);
            }
            Collections.sort(neighbourValues);
            StringBuilder line = new StringBuilder();
            line.append(copy.val);
            for (int value : neighbourValues) {
                line.append(' ').append(value);
            }
            System.out.println(line);
        }
    }
}
