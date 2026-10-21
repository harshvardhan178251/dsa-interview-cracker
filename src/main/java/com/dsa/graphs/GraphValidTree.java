package com.dsa.graphs;

import com.dsa.utils.FastScanner;
import com.dsa.utils.UnionFind;

/**
 * Problem: Graph Valid Tree
 * LeetCode: 261 | Difficulty: Medium | Frequency: 3/5
 * Pattern: Union-Find, cycle detection
 *
 * <p>Problem: Given an undirected graph with {@code n} vertices, decide whether it is a valid
 * tree. A graph is a tree when it is connected and has no cycle. Equivalently: it has
 * {@code n - 1} edges and no two edges close a cycle.
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
 * 5 4
 * 0 1
 * 0 2
 * 1 2
 * 3 4
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * false
 * </pre>
 *
 * <p>Approach: add the edges one by one to a {@link UnionFind}. If an edge joins two vertices
 * that are already in the same set, it closes a cycle — the graph is not a tree. If no edge does
 * and only one set remains at the end, the graph is connected, so it is a tree.
 *
 * <p>Complexity: Time O(m * alpha(n)), Space O(n).
 */
public class GraphValidTree {

    /**
     * Decides whether the undirected graph is a tree.
     *
     * @param n     number of vertices {@code 0..n-1}
     * @param edges undirected edges {@code {u, v}}
     * @return {@code true} when the graph is a tree
     */
    public static boolean isValidTree(int n, int[][] edges) {
        if (n <= 0) {
            return false;
        }
        // A tree on n vertices has exactly n - 1 edges.
        if (edges.length != n - 1) {
            return false;
        }
        UnionFind uf = new UnionFind(n);
        for (int[] edge : edges) {
            if (!uf.union(edge[0], edge[1])) {
                return false; // this edge closes a cycle
            }
        }
        return uf.components() == 1;
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

        System.out.println(isValidTree(n, edges));
    }
}
