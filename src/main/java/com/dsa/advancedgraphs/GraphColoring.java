package com.dsa.advancedgraphs;

import com.dsa.utils.FastScanner;

import java.util.ArrayList;
import java.util.List;

/**
 * Problem: Graph Coloring
 * LeetCode: null | Difficulty: Hard | Frequency: 4/5
 * Pattern: Backtracking, DSATUR, chromatic number
 *
 * <p>Problem: Colour the vertices of an undirected graph so that no edge joins two vertices of
 * the same colour, using as few colours as possible. The minimum number of colours is the
 * <b>chromatic number</b>.
 *
 * <p>Input format (stdin) — an <b>undirected</b> graph given as an edge list:
 * <pre>
 * n m
 * u1 v1
 * ...
 * um vm
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 5 5
 * 0 1
 * 1 2
 * 2 0
 * 2 3
 * 3 4
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 3
 * 1 2 3 1 2
 * </pre>
 *
 * <p>Output: the chromatic number on the first line, then the colour of every vertex
 * {@code 0..n-1} separated by spaces. Colours are numbered from 1.
 *
 * <p>Approach: the chromatic number is NP-hard in general, so the search is exponential. We try
 * {@code k = 1, 2, 3, ...} and for each {@code k} run a backtracking search that colours one
 * vertex at a time. The vertex to colour next is the one with the most <em>distinct</em> colours
 * among its already coloured neighbours (the DSATUR heuristic), which prunes the search
 * dramatically. The first {@code k} that works is the answer.
 *
 * <p>Complexity: Time exponential in the worst case (NP-hard), in practice far smaller thanks to
 * DSATUR and the early exit on the first colour count that works. Space O(n + m).
 */
public class GraphColoring {

    /**
     * Computes a minimum colouring of an undirected graph.
     *
     * @param n     number of vertices {@code 0..n-1}
     * @param edges undirected edges {@code {u, v}}
     * @return {@code {numberOfColours, colour of vertex 0, ..., colour of vertex n-1}}, or an
     *         empty array when the graph cannot be coloured
     */
    public static int[] minimumColoring(int n, int[][] edges) {
        List<List<Integer>> adj = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            adj.add(new ArrayList<>());
        }
        for (int[] edge : edges) {
            adj.get(edge[0]).add(edge[1]);
            adj.get(edge[1]).add(edge[0]);
        }

        for (int k = 1; k <= n; k++) {
            int[] colours = new int[n]; // 0 = uncoloured
            if (canColour(adj, colours, k)) {
                int[] result = new int[n + 1];
                result[0] = k;
                System.arraycopy(colours, 0, result, 1, n);
                return result;
            }
        }
        return new int[0];
    }

    /**
     * Backtracking search for a proper colouring with at most {@code k} colours.
     *
     * @param adj     adjacency list
     * @param colours current colouring, {@code 0} for uncoloured vertices
     * @param k       the number of colours we are allowed to use
     * @return {@code true} when a complete colouring was found
     */
    private static boolean canColour(List<List<Integer>> adj, int[] colours, int k) {
        int n = adj.size();

        // DSATUR: pick the uncoloured vertex whose coloured neighbours use the most colours.
        int vertex = -1;
        int bestSaturation = -1;
        for (int v = 0; v < n; v++) {
            if (colours[v] != 0) {
                continue;
            }
            int saturation = 0;
            boolean[] seen = new boolean[colours.length + 1];
            for (int u : adj.get(v)) {
                if (colours[u] != 0 && !seen[colours[u]]) {
                    seen[colours[u]] = true;
                    saturation++;
                }
            }
            if (saturation > bestSaturation) {
                bestSaturation = saturation;
                vertex = v;
            }
        }
        if (vertex == -1) {
            return true; // every vertex is coloured
        }

        for (int colour = 1; colour <= k; colour++) {
            if (isAllowed(adj, colours, vertex, colour)) {
                colours[vertex] = colour;
                if (canColour(adj, colours, k)) {
                    return true;
                }
                colours[vertex] = 0; // undo
            }
        }
        return false;
    }

    /** True when no already coloured neighbour of {@code v} uses {@code colour}. */
    private static boolean isAllowed(List<List<Integer>> adj, int[] colours, int v, int colour) {
        for (int u : adj.get(v)) {
            if (colours[u] == colour) {
                return false;
            }
        }
        return true;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int m = fs.nextInt();

        int[][] edges = new int[m][2];
        for (int i = 0; i < m; i++) {
            edges[i][0] = fs.nextInt();
            edges[i][1] = fs.nextInt();
        }

        int[] colouring = minimumColoring(n, edges);
        if (colouring.length == 0) {
            System.out.println(-1);
            return;
        }
        System.out.println(colouring[0]);
        StringBuilder sb = new StringBuilder();
        for (int v = 0; v < n; v++) {
            if (v > 0) {
                sb.append(' ');
            }
            sb.append(colouring[v + 1]);
        }
        System.out.println(sb);
    }
}
