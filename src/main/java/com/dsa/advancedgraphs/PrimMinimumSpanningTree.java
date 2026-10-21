package com.dsa.advancedgraphs;

import com.dsa.utils.FastScanner;

import java.util.ArrayList;
import java.util.List;
import java.util.PriorityQueue;

/**
 * Problem: Prim's Minimum Spanning Tree
 * LeetCode: null | Difficulty: Medium | Frequency: 4/5
 * Pattern: Prim, greedy, priority queue
 *
 * <p>Problem: Given an undirected, weighted graph, find the total weight of a minimum spanning
 * tree. Return {@code -1} when the graph is disconnected and no spanning tree exists.
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
 * <p>Approach: grow one tree outwards from vertex 0. At every step we take the cheapest edge
 * that connects the tree to a vertex outside it — a min-heap of candidate edges gives us exactly
 * that. Every edge taken crosses the cut between "in the tree" and "outside the tree", which is
 * what makes the greedy choice safe.
 *
 * <p>Complexity: Time O(m log m), Space O(n + m).
 */
public class PrimMinimumSpanningTree {

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
        List<List<int[]>> adj = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            adj.add(new ArrayList<>());
        }
        for (int[] edge : edges) {
            adj.get(edge[0]).add(new int[]{edge[1], edge[2]});
            adj.get(edge[1]).add(new int[]{edge[0], edge[2]});
        }

        boolean[] inTree = new boolean[n];
        // entries are {weight, target}
        PriorityQueue<int[]> heap = new PriorityQueue<>((a, b) -> Integer.compare(a[0], b[0]));

        inTree[0] = true;
        for (int[] edge : adj.get(0)) {
            heap.add(new int[]{edge[1], edge[0]});
        }

        int total = 0;
        int taken = 0;
        while (!heap.isEmpty()) {
            int[] top = heap.poll();
            int v = top[1];
            if (inTree[v]) {
                continue; // the far end is already in the tree
            }
            inTree[v] = true;
            total += top[0];
            taken++;
            for (int[] edge : adj.get(v)) {
                if (!inTree[edge[0]]) {
                    heap.add(new int[]{edge[1], edge[0]});
                }
            }
        }
        return taken == n - 1 ? total : -1;
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
