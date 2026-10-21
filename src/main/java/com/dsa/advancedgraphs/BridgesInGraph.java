package com.dsa.advancedgraphs;

import com.dsa.utils.FastScanner;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * Problem: Bridges in a Graph
 * LeetCode: null | Difficulty: Hard | Frequency: 4/5
 * Pattern: Low-link values, Tarjan's bridge finding, DFS
 *
 * <p>Problem: A bridge is an edge whose removal disconnects the graph. Find all bridges of an
 * undirected graph.
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
 * 1 3
 * 3 4
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 2
 * 1 3
 * 3 4
 * </pre>
 *
 * <p>Output: the number of bridges on the first line, then one bridge per line as
 * {@code u v} with {@code u < v}, sorted.
 *
 * <p>Approach: a single DFS that remembers for every vertex the earliest discovery time
 * reachable from its subtree ({@code low}). A DFS tree edge {@code (u, v)} is a bridge exactly
 * when {@code low[v] > tin[u]} — the subtree of {@code v} cannot escape without that edge.
 * Edges are tracked by id so that parallel edges are handled correctly.
 *
 * <p>Complexity: Time O(n + m), Space O(n + m).
 */
public class BridgesInGraph {

    /** Mutable DFS state. */
    private static final class Solver {
        final List<List<int[]>> adj; // {neighbour, edgeId}
        final int[] tin;
        final int[] low;
        final List<int[]> bridges = new ArrayList<>();
        int timer = 0;

        Solver(List<List<int[]>> adj) {
            this.adj = adj;
            this.tin = new int[adj.size()];
            this.low = new int[adj.size()];
            Arrays.fill(tin, -1);
            Arrays.fill(low, -1);
        }

        void visit(int u, int parentEdge) {
            tin[u] = low[u] = timer++;
            for (int[] edge : adj.get(u)) {
                int v = edge[0];
                int id = edge[1];
                if (id == parentEdge) {
                    continue; // the edge we came in through
                }
                if (tin[v] != -1) {
                    low[u] = Math.min(low[u], tin[v]); // back edge
                } else {
                    visit(v, id);
                    low[u] = Math.min(low[u], low[v]);
                    if (low[v] > tin[u]) {
                        bridges.add(new int[]{Math.min(u, v), Math.max(u, v)});
                    }
                }
            }
        }
    }

    /**
     * Finds every bridge of an undirected graph.
     *
     * @param n     number of vertices {@code 0..n-1}
     * @param edges undirected edges {@code {u, v}}
     * @return the bridges, each as {@code {min(u,v), max(u,v)}}, sorted
     */
    public static List<int[]> findBridges(int n, int[][] edges) {
        List<List<int[]>> adj = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            adj.add(new ArrayList<>());
        }
        for (int id = 0; id < edges.length; id++) {
            int u = edges[id][0];
            int v = edges[id][1];
            adj.get(u).add(new int[]{v, id});
            adj.get(v).add(new int[]{u, id});
        }

        Solver solver = new Solver(adj);
        for (int v = 0; v < n; v++) {
            if (solver.tin[v] == -1) {
                solver.visit(v, -1);
            }
        }

        solver.bridges.sort((a, b) -> a[0] != b[0] ? Integer.compare(a[0], b[0])
                : Integer.compare(a[1], b[1]));
        return solver.bridges;
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

        List<int[]> bridges = findBridges(n, edges);
        System.out.println(bridges.size());
        for (int[] bridge : bridges) {
            System.out.println(bridge[0] + " " + bridge[1]);
        }
    }
}
