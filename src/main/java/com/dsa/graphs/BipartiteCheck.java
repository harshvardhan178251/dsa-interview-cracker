package com.dsa.graphs;

import com.dsa.utils.FastScanner;

import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.List;

/**
 * Problem: Is Graph Bipartite
 * LeetCode: 785 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Two-colouring, BFS
 *
 * <p>Problem: Decide whether an undirected graph can be split into two groups so that no edge
 * joins two vertices of the same group. Equivalently: can the graph be 2-coloured without a
 * conflict?
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
 * 4 3
 * 0 1
 * 1 2
 * 2 0
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * false
 * </pre>
 *
 * <p>Approach: BFS two-colouring. Start every uncoloured component with colour 0 and propagate
 * the opposite colour to the neighbours. If we ever have to give a vertex the colour it already
 * has, the graph contains an odd cycle and is not bipartite.
 *
 * <p>Complexity: Time O(n + m), Space O(n + m).
 */
public class BipartiteCheck {

    /**
     * Decides whether the undirected graph is bipartite.
     *
     * @param n     number of vertices {@code 0..n-1}
     * @param edges undirected edges {@code {u, v}}
     * @return {@code true} when the graph is bipartite
     */
    public static boolean isBipartite(int n, int[][] edges) {
        List<List<Integer>> adj = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            adj.add(new ArrayList<>());
        }
        for (int[] edge : edges) {
            adj.get(edge[0]).add(edge[1]);
            adj.get(edge[1]).add(edge[0]);
        }

        int[] colour = new int[n];
        java.util.Arrays.fill(colour, -1); // -1 = uncoloured, 0/1 = the two groups

        for (int start = 0; start < n; start++) {
            if (colour[start] != -1) {
                continue;
            }
            colour[start] = 0;
            Deque<Integer> queue = new ArrayDeque<>();
            queue.add(start);
            while (!queue.isEmpty()) {
                int u = queue.poll();
                for (int v : adj.get(u)) {
                    if (colour[v] == -1) {
                        colour[v] = 1 - colour[u];
                        queue.add(v);
                    } else if (colour[v] == colour[u]) {
                        return false; // same group on both ends of an edge
                    }
                }
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

        System.out.println(isBipartite(n, edges));
    }
}
