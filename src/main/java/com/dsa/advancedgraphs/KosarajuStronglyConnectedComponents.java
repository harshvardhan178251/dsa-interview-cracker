package com.dsa.advancedgraphs;

import com.dsa.utils.FastScanner;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * Problem: Kosaraju's Strongly Connected Components
 * LeetCode: null | Difficulty: Hard | Frequency: 4/5
 * Pattern: Kosaraju, two DFS passes, transpose graph
 *
 * <p>Problem: Given a directed graph, split it into strongly connected components — maximal sets
 * of vertices where every vertex can reach every other one.
 *
 * <p>Input format (stdin) — a directed graph given as an edge list:
 * <pre>
 * n m
 * u1 v1
 * ...
 * um vm
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 4 4
 * 0 1
 * 1 2
 * 2 0
 * 2 3
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 2
 * 0 1 2
 * 3
 * </pre>
 *
 * <p>Output: the number of components on the first line, then one line per component holding
 * its vertices in ascending order; the components themselves are listed by their smallest
 * vertex. The answer is identical to the one produced by Tarjan's algorithm.
 *
 * <p>Approach: two DFS passes. The first one on the original graph records the vertices in
 * <em>finishing</em> order. The second one runs on the transposed graph (every edge reversed)
 * and processes the vertices in reverse finishing order: each DFS tree it discovers is exactly
 * one strongly connected component.
 *
 * <p>Complexity: Time O(n + m), Space O(n + m).
 */
public class KosarajuStronglyConnectedComponents {

    /**
     * Splits a directed graph into its strongly connected components.
     *
     * @param n     number of vertices {@code 0..n-1}
     * @param edges directed edges {@code {u, v}}
     * @return one list per component, each list sorted ascending; the components are ordered by
     *         their smallest vertex
     */
    public static List<List<Integer>> stronglyConnectedComponents(int n, int[][] edges) {
        List<List<Integer>> adj = new ArrayList<>();
        List<List<Integer>> transposed = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            adj.add(new ArrayList<>());
            transposed.add(new ArrayList<>());
        }
        for (int[] edge : edges) {
            adj.get(edge[0]).add(edge[1]);
            transposed.get(edge[1]).add(edge[0]);
        }

        boolean[] visited = new boolean[n];
        List<Integer> finishOrder = new ArrayList<>();
        for (int v = 0; v < n; v++) {
            if (!visited[v]) {
                recordFinishOrder(adj, visited, v, finishOrder);
            }
        }

        boolean[] seen = new boolean[n];
        List<List<Integer>> components = new ArrayList<>();
        for (int i = finishOrder.size() - 1; i >= 0; i--) {
            int v = finishOrder.get(i);
            if (seen[v]) {
                continue;
            }
            List<Integer> component = new ArrayList<>();
            collect(transposed, seen, v, component);
            Collections.sort(component);
            components.add(component);
        }
        components.sort((a, b) -> Integer.compare(a.get(0), b.get(0)));
        return components;
    }

    /** First pass: append {@code v} to the finish order once its whole subtree is explored. */
    private static void recordFinishOrder(List<List<Integer>> adj, boolean[] visited, int v,
            List<Integer> finishOrder) {
        visited[v] = true;
        for (int w : adj.get(v)) {
            if (!visited[w]) {
                recordFinishOrder(adj, visited, w, finishOrder);
            }
        }
        finishOrder.add(v);
    }

    /** Second pass: collect everything reachable from {@code v} in the transposed graph. */
    private static void collect(List<List<Integer>> transposed, boolean[] seen, int v,
            List<Integer> component) {
        seen[v] = true;
        component.add(v);
        for (int w : transposed.get(v)) {
            if (!seen[w]) {
                collect(transposed, seen, w, component);
            }
        }
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

        List<List<Integer>> components = stronglyConnectedComponents(n, edges);
        System.out.println(components.size());
        for (List<Integer> component : components) {
            StringBuilder line = new StringBuilder();
            for (int i = 0; i < component.size(); i++) {
                if (i > 0) {
                    line.append(' ');
                }
                line.append(component.get(i));
            }
            System.out.println(line);
        }
    }
}
