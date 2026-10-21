package com.dsa.graphs;

import com.dsa.utils.FastScanner;

import java.util.ArrayList;
import java.util.List;
import java.util.PriorityQueue;

/**
 * Problem: Topological Sort
 * LeetCode: null | Difficulty: Medium | Frequency: 4/5
 * Pattern: Topological sort, Kahn's algorithm
 *
 * <p>Problem: Given a directed graph, produce a linear ordering of its vertices such that every
 * edge {@code u -> v} places {@code u} before {@code v}. Such an ordering exists exactly when the
 * graph is acyclic.
 *
 * <p>Input format (stdin) — a directed graph given as an edge list:
 * <pre>
 * n m
 * u1 v1
 * u2 v2
 * ...
 * um vm
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 6 6
 * 5 2
 * 5 0
 * 4 0
 * 4 1
 * 2 3
 * 3 1
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 4 5 0 2 3 1
 * </pre>
 *
 * <p>Approach: Kahn's algorithm with a min-heap of "ready" (in-degree 0) vertices, so the
 * smallest available vertex is always emitted first and the output is deterministic.
 *
 * <p>Complexity: Time O(m + n log n), Space O(n + m).
 */
public class TopologicalSort {

    /**
     * Computes a topological ordering of a directed graph.
     *
     * @param n     number of vertices {@code 0..n-1}
     * @param edges directed edges {@code {u, v}}
     * @return the ordering, or an empty array when the graph contains a cycle
     */
    public static int[] topologicalOrder(int n, int[][] edges) {
        List<List<Integer>> adj = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            adj.add(new ArrayList<>());
        }
        int[] inDegree = new int[n];
        for (int[] edge : edges) {
            adj.get(edge[0]).add(edge[1]);
            inDegree[edge[1]]++;
        }

        PriorityQueue<Integer> ready = new PriorityQueue<>();
        for (int v = 0; v < n; v++) {
            if (inDegree[v] == 0) {
                ready.add(v);
            }
        }

        int[] order = new int[n];
        int emitted = 0;
        while (!ready.isEmpty()) {
            int u = ready.poll();
            order[emitted++] = u;
            for (int v : adj.get(u)) {
                if (--inDegree[v] == 0) {
                    ready.add(v);
                }
            }
        }
        return emitted == n ? order : new int[0];
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

        int[] order = topologicalOrder(n, edges);
        if (order.length == 0) {
            System.out.println(-1);
            return;
        }
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < order.length; i++) {
            if (i > 0) {
                sb.append(' ');
            }
            sb.append(order[i]);
        }
        System.out.println(sb);
    }
}
