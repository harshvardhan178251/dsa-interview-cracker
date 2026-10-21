package com.dsa.advancedgraphs;

import com.dsa.utils.FastScanner;

import java.util.ArrayList;
import java.util.List;
import java.util.PriorityQueue;

/**
 * Problem: Dijkstra's Shortest Path
 * LeetCode: null | Difficulty: Medium | Frequency: 5/5
 * Pattern: Dijkstra, min-heap, single-source shortest path
 *
 * <p>Problem: Given a directed graph with <b>non-negative</b> edge weights, compute the shortest
 * distance from a source vertex to every other vertex.
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
 * 1 2 4
 * 0 2 1
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
 * An unreachable vertex is printed as {@code INF}.
 *
 * <p>Approach: a min-heap of (distance, vertex) pairs. We always expand the vertex with the
 * smallest tentative distance. Because all weights are non-negative, no later path can improve
 * a vertex that has already been popped, so each vertex is settled exactly once.
 *
 * <p>Complexity: Time O(m log n), Space O(n + m).
 */
public class DijkstraShortestPath {

    /**
     * Shortest distances from {@code source}.
     *
     * @param n      number of vertices {@code 0..n-1}
     * @param edges  directed weighted edges {@code {u, v, weight)}, all weights non-negative
     * @param source the starting vertex
     * @return the distance to every vertex, {@link Integer#MAX_VALUE} when unreachable
     */
    public static int[] shortestPaths(int n, int[][] edges, int source) {
        List<List<int[]>> adj = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            adj.add(new ArrayList<>());
        }
        for (int[] edge : edges) {
            adj.get(edge[0]).add(new int[]{edge[1], edge[2]});
        }

        int[] dist = new int[n];
        for (int i = 0; i < n; i++) {
            dist[i] = Integer.MAX_VALUE;
        }
        dist[source] = 0;

        // entries are {distance, vertex}
        PriorityQueue<int[]> heap = new PriorityQueue<>((a, b) -> Integer.compare(a[0], b[0]));
        heap.add(new int[]{0, source});

        while (!heap.isEmpty()) {
            int[] top = heap.poll();
            int currentDist = top[0];
            int u = top[1];
            if (currentDist > dist[u]) {
                continue; // stale heap entry: a better path was already found
            }
            for (int[] edge : adj.get(u)) {
                int v = edge[0];
                int newDist = currentDist + edge[1];
                if (newDist < dist[v]) {
                    dist[v] = newDist;
                    heap.add(new int[]{newDist, v});
                }
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
