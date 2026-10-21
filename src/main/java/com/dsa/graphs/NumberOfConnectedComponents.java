package com.dsa.graphs;

import com.dsa.utils.FastScanner;
import com.dsa.utils.UnionFind;

/**
 * Problem: Number of Connected Components in an Undirected Graph
 * LeetCode: 547 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Union-Find, connected components
 *
 * <p>Problem: Given an undirected graph, return the number of connected components — the number
 * of maximal groups of vertices where every pair is connected by some path.
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
 * 5 3
 * 0 1
 * 1 2
 * 3 4
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 2
 * </pre>
 *
 * <p>Approach: start with {@code n} singleton sets and merge the two endpoints of every edge.
 * The number of sets left at the end is the number of connected components. A {@link UnionFind}
 * with union by rank and path compression makes every merge effectively constant time.
 *
 * <p>Complexity: Time O(n + m * alpha(n)), Space O(n).
 */
public class NumberOfConnectedComponents {

    /**
     * Counts the connected components of an undirected graph.
     *
     * @param n     number of vertices {@code 0..n-1}
     * @param edges undirected edges {@code {u, v}}
     * @return the number of connected components
     */
    public static int countComponents(int n, int[][] edges) {
        UnionFind uf = new UnionFind(n);
        for (int[] edge : edges) {
            uf.union(edge[0], edge[1]);
        }
        return uf.components();
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

        System.out.println(countComponents(n, edges));
    }
}
