package com.dsa.advancedgraphs;

import com.dsa.utils.FastScanner;

import java.util.Arrays;

/**
 * Problem: Floyd-Warshall All-Pairs Shortest Path
 * LeetCode: null | Difficulty: Medium | Frequency: 4/5
 * Pattern: Floyd-Warshall, dynamic programming on a graph
 *
 * <p>Problem: Compute the shortest distance between <b>every</b> pair of vertices. Negative edge
 * weights are allowed, but a negative cycle makes the answer meaningless.
 *
 * <p>Input format (stdin) — a directed, weighted graph given as an edge list:
 * <pre>
 * n m
 * u1 v1 w1
 * ...
 * um vm wm
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 4 4
 * 0 1 3
 * 1 2 4
 * 0 2 1
 * 2 3 2
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 0 3 1 3
 * INF 0 4 6
 * INF INF 0 2
 * INF INF INF 0
 * </pre>
 *
 * <p>Output: the distance matrix, one row per line, with {@code INF} for unreachable pairs and
 * {@code 0} on the diagonal.
 *
 * <p>Approach: classic dynamic programming over the intermediate vertices. Let
 * {@code dist[i][j]} be the best distance using only the vertices {@code 0..k} as intermediate
 * stops. Each round either keeps the old distance or routes through vertex {@code k}:
 * {@code dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j])}.
 *
 * <p>Complexity: Time O(n³), Space O(n²).
 */
public class FloydWarshall {

    /**
     * All-pairs shortest distances.
     *
     * @param n     number of vertices {@code 0..n-1}
     * @param edges directed weighted edges {@code {u, v, weight}}
     * @return the distance matrix; {@link Integer#MAX_VALUE} marks an unreachable pair
     */
    public static int[][] allPairsShortestPaths(int n, int[][] edges) {
        int[][] dist = new int[n][n];
        for (int i = 0; i < n; i++) {
            Arrays.fill(dist[i], Integer.MAX_VALUE);
            dist[i][i] = 0;
        }
        for (int[] edge : edges) {
            int u = edge[0];
            int v = edge[1];
            int weight = edge[2];
            if (weight < dist[u][v]) {
                dist[u][v] = weight; // keep the cheapest parallel edge
            }
        }

        for (int k = 0; k < n; k++) {
            for (int i = 0; i < n; i++) {
                if (dist[i][k] == Integer.MAX_VALUE) {
                    continue;
                }
                for (int j = 0; j < n; j++) {
                    if (dist[k][j] == Integer.MAX_VALUE) {
                        continue;
                    }
                    int throughK = dist[i][k] + dist[k][j];
                    if (throughK < dist[i][j]) {
                        dist[i][j] = throughK;
                    }
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

        int[][] dist = allPairsShortestPaths(n, edges);
        for (int i = 0; i < n; i++) {
            StringBuilder row = new StringBuilder();
            for (int j = 0; j < n; j++) {
                if (j > 0) {
                    row.append(' ');
                }
                row.append(dist[i][j] == Integer.MAX_VALUE ? "INF" : String.valueOf(dist[i][j]));
            }
            System.out.println(row);
        }
    }
}
