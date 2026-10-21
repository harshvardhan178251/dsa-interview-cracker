package com.dsa.advancedgraphs;

import com.dsa.utils.FastScanner;
import com.dsa.utils.UnionFind;

import java.util.Arrays;
import java.util.Comparator;

/**
 * Problem: Kruskal's Minimum Spanning Tree
 * LeetCode: null | Difficulty: Medium | Frequency: 4/5
 * Pattern: Kruskal, Union-Find, greedy
 *
 * <p>Problem: Given an undirected, weighted graph, find the total weight of a minimum spanning
 * tree — a set of edges that connects every vertex with the smallest possible total weight.
 * Return {@code -1} when the graph is disconnected and no spanning tree exists.
 *
 * <p>Input format (stdin) — an <b>undirected</b>, weighted graph given as an edge list:
 * <pre>
 * n m
 * u1 v1 w1
 * ...
 * um vm wm
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 4 5
 * 0 1 3
 * 1 2 4
 * 0 2 2
 * 2 3 5
 * 1 3 1
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 6
 * </pre>
 *
 * <p>Approach: sort the edges by weight and add them one at a time. An edge is kept only when it
 * joins two different components — that is decided in O(alpha(n)) by a {@link UnionFind}. The
 * algorithm stops after {@code n - 1} accepted edges.
 *
 * <p>Complexity: Time O(m log m) — the sort dominates. Space O(n + m).
 */
public class KruskalMinimumSpanningTree {

    /**
     * Total weight of a minimum spanning tree.
     *
     * @param n     number of vertices {@code 0..n-1}
     * @param edges undirected weighted edges {@code {u, v, weight}}
     * @return the MST weight, {@code -1} when the graph is disconnected
     */
    public static int mstWeight(int n, int[][] edges) {
        if (n <= 1) {
            return 0;
        }
        int[][] sorted = edges.clone();
        Arrays.sort(sorted, Comparator.<int[]>comparingInt(e -> e[2])
                .thenComparingInt(e -> e[0])
                .thenComparingInt(e -> e[1]));

        UnionFind uf = new UnionFind(n);
        int total = 0;
        int accepted = 0;
        for (int[] edge : sorted) {
            if (uf.union(edge[0], edge[1])) {
                total += edge[2];
                accepted++;
                if (accepted == n - 1) {
                    break;
                }
            }
        }
        return accepted == n - 1 ? total : -1;
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

        System.out.println(mstWeight(n, edges));
    }
}
