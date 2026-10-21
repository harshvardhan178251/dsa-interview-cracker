package com.dsa.advancedgraphs;

import com.dsa.utils.FastScanner;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * Problem: Articulation Points in a Graph
 * LeetCode: null | Difficulty: Hard | Frequency: 4/5
 * Pattern: Low-link values, DFS cut vertices
 *
 * <p>Problem: An articulation point (cut vertex) is a vertex whose removal increases the number
 * of connected components. Find all articulation points of an undirected graph.
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
 * 1
 * 3
 * </pre>
 *
 * <p>Output: the number of articulation points on the first line, then one vertex per line in
 * ascending order.
 *
 * <p>Approach: the same low-link DFS used for bridges. A non-root vertex {@code u} is an
 * articulation point when some DFS child {@code v} has {@code low[v] >= tin[u]} — the subtree of
 * {@code v} can then only be reached through {@code u}. A DFS root is an articulation point when
 * it has more than one DFS child. Edges are tracked by id so parallel edges are handled
 * correctly.
 *
 * <p>Complexity: Time O(n + m), Space O(n + m).
 */
public class ArticulationPoints {

    /** Mutable DFS state. */
    private static final class Solver {
        final List<List<int[]>> adj; // {neighbour, edgeId}
        final int[] tin;
        final int[] low;
        final boolean[] articulation;
        int timer = 0;

        Solver(List<List<int[]>> adj) {
            this.adj = adj;
            this.tin = new int[adj.size()];
            this.low = new int[adj.size()];
            this.articulation = new boolean[adj.size()];
            Arrays.fill(tin, -1);
            Arrays.fill(low, -1);
        }

        void visit(int u, int parentEdge) {
            tin[u] = low[u] = timer++;
            int children = 0;
            for (int[] edge : adj.get(u)) {
                int v = edge[0];
                int id = edge[1];
                if (id == parentEdge) {
                    continue; // the edge we came in through
                }
                if (tin[v] != -1) {
                    low[u] = Math.min(low[u], tin[v]); // back edge
                } else {
                    children++;
                    visit(v, id);
                    low[u] = Math.min(low[u], low[v]);
                    if (parentEdge != -1 && low[v] >= tin[u]) {
                        articulation[u] = true;
                    }
                }
            }
            if (parentEdge == -1 && children > 1) {
                articulation[u] = true; // a root with several DFS subtrees
            }
        }
    }

    /**
     * Finds every articulation point of an undirected graph.
     *
     * @param n     number of vertices {@code 0..n-1}
     * @param edges undirected edges {@code {u, v}}
     * @return the articulation points in ascending order
     */
    public static List<Integer> findArticulationPoints(int n, int[][] edges) {
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

        List<Integer> result = new ArrayList<>();
        for (int v = 0; v < n; v++) {
            if (solver.articulation[v]) {
                result.add(v);
            }
        }
        return result;
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

        List<Integer> points = findArticulationPoints(n, edges);
        System.out.println(points.size());
        for (int v : points) {
            System.out.println(v);
        }
    }
}
