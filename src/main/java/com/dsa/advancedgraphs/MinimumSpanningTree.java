package com.dsa.advancedgraphs;

import com.dsa.utils.FastScanner;
import com.dsa.utils.UnionFind;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Comparator;
import java.util.List;

/**
 * Problem: Minimum Spanning Tree
 * LeetCode: 1584 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Minimum spanning tree, Union-Find, cut property
 *
 * <p>Problem: Given an undirected, weighted graph, build a minimum spanning tree and report
 * both its total weight and the edges it contains. This is the same MST problem as
 * <a href="https://leetcode.com/problems/min-cost-to-connect-all-points/">LeetCode 1584</a>
 * ("Min Cost to Connect All Points"), where the graph is implicit: the points form a complete
 * graph whose edge weights are Manhattan distances. Here the edges are given explicitly, which
 * is the general form of the problem.
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
 * 1 3 1
 * 0 2 2
 * 0 1 3
 * </pre>
 *
 * <p>Output: the total weight on the first line, then every MST edge as {@code u v w}, sorted
 * by weight (ties broken by {@code u} then {@code v}).
 *
 * <p>Approach: Kruskal's algorithm. Sort the edges by weight and keep an edge only when it
 * joins two different components, which a {@link UnionFind} answers in O(alpha(n)).
 *
 * <p>Complexity: Time O(m log m), Space O(n + m).
 */
public class MinimumSpanningTree {

    /**
     * Builds a minimum spanning tree.
     *
     * @param n     number of vertices {@code 0..n-1}
     * @param edges undirected weighted edges {@code {u, v, weight}}
     * @return {@code {totalWeight, u1, v1, w1, ...}} with one triple per tree edge, or an
     *         empty array when the graph is disconnected
     */
    public static int[] minimumSpanningTree(int n, int[][] edges) {
        if (n <= 1) {
            return new int[]{0};
        }
        int[][] sorted = edges.clone();
        Arrays.sort(sorted, Comparator.<int[]>comparingInt(e -> e[2])
                .thenComparingInt(e -> e[0])
                .thenComparingInt(e -> e[1]));

        UnionFind uf = new UnionFind(n);
        List<int[]> tree = new ArrayList<>();
        int total = 0;
        for (int[] edge : sorted) {
            if (uf.union(edge[0], edge[1])) {
                tree.add(edge);
                total += edge[2];
                if (tree.size() == n - 1) {
                    break;
                }
            }
        }
        if (tree.size() != n - 1) {
            return new int[0]; // disconnected: no spanning tree exists
        }

        int[] result = new int[1 + 3 * tree.size()];
        result[0] = total;
        for (int i = 0; i < tree.size(); i++) {
            result[1 + 3 * i] = tree.get(i)[0];
            result[2 + 3 * i] = tree.get(i)[1];
            result[3 + 3 * i] = tree.get(i)[2];
        }
        return result;
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

        int[] mst = minimumSpanningTree(n, edges);
        if (mst.length == 0) {
            System.out.println(-1);
            return;
        }
        System.out.println(mst[0]);
        for (int i = 1; i < mst.length; i += 3) {
            System.out.println(mst[i] + " " + mst[i + 1] + " " + mst[i + 2]);
        }
    }
}
