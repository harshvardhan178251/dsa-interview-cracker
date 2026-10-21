package com.dsa.advancedgraphs;

import com.dsa.utils.FastScanner;

/**
 * Problem: Bellman-Ford Shortest Path
 * LeetCode: null | Difficulty: Medium | Frequency: 4/5
 * Pattern: Bellman-Ford, negative weights, negative cycle detection
 *
 * <p>Problem: Given a directed graph whose edges may carry <b>negative</b> weights, compute the
 * shortest distance from a source vertex to every other vertex. If a negative cycle is reachable
 * from the source, the distances are meaningless and the answer is {@code NEGATIVE CYCLE}.
 *
 * <p>Input format (stdin) — a directed, weighted graph given as an edge list:
 * <pre>
 * n m
 * u1 v1 w1
 * ...
 * um vm wm
 * source
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 4 4
 * 0 1 3
 * 1 2 -2
 * 0 2 5
 * 2 3 2
 * 0
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 0 3 1 3
 * </pre>
 *
 * <p>Output: the distance from the source to every vertex {@code 0..n-1}, separated by spaces.
 * An unreachable vertex is printed as {@code INF}; a reachable negative cycle prints
 * {@code NEGATIVE CYCLE} instead.
 *
 * <p>Approach: relax every edge {@code n - 1} times. After that many rounds every shortest path
 * (which uses at most {@code n - 1} edges) is already known. One extra round that still improves
 * a distance proves that a negative cycle is reachable.
 *
 * <p>Complexity: Time O(n * m), Space O(n + m).
 */
public class BellmanFord {

    /**
     * Shortest distances from {@code source}.
     *
     * @param n      number of vertices {@code 0..n-1}
     * @param edges  directed weighted edges {@code {u, v, weight}}, weights may be negative
     * @param source the starting vertex
     * @return the distance to every vertex, or {@code null} when a negative cycle is reachable
     */
    public static int[] shortestPaths(int n, int[][] edges, int source) {
        int[] dist = new int[n];
        for (int i = 0; i < n; i++) {
            dist[i] = Integer.MAX_VALUE;
        }
        dist[source] = 0;

        for (int round = 0; round < n - 1; round++) {
            boolean changed = false;
            for (int[] edge : edges) {
                int u = edge[0];
                int v = edge[1];
                int weight = edge[2];
                if (dist[u] == Integer.MAX_VALUE) {
                    continue;
                }
                if (dist[u] + weight < dist[v]) {
                    dist[v] = dist[u] + weight;
                    changed = true;
                }
            }
            if (!changed) {
                break; // converged early
            }
        }

        // One more pass: any improvement means a negative cycle is reachable.
        for (int[] edge : edges) {
            int u = edge[0];
            int v = edge[1];
            int weight = edge[2];
            if (dist[u] != Integer.MAX_VALUE && dist[u] + weight < dist[v]) {
                return null;
            }
        }
        return dist;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int m = fs.nextInt();

        int[][] edges = new int[m][3];
        for (int i = 0; i < m; i++) {
            edges[i][0] = fs.nextInt();
            edges[i][1] = fs.nextInt();
            edges[i][2] = fs.nextInt();
        }
        int source = fs.nextInt();

        int[] dist = shortestPaths(n, edges, source);
        if (dist == null) {
            System.out.println("NEGATIVE CYCLE");
            return;
        }
        StringBuilder sb = new StringBuilder();
        for (int v = 0; v < n; v++) {
            if (v > 0) {
                sb.append(' ');
            }
            sb.append(dist[v] == Integer.MAX_VALUE ? "INF" : String.valueOf(dist[v]));
        }
        System.out.println(sb);
    }
}
