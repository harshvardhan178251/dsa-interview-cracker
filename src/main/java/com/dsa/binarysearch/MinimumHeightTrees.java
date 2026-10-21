package com.dsa.binarysearch;

import com.dsa.utils.FastScanner;

import java.util.ArrayList;
import java.util.List;

/**
 * Problem: Minimum Height Trees
 * LeetCode: 910 | Difficulty: Medium | Frequency: 3/5
 * Pattern: Binary search / BFS by leaf layers
 *
 * <p>Problem:
 * Given a tree with {@code n} nodes labelled {@code 0 .. n-1} and {@code n-1} edges, and an
 * integer {@code k}, repeatedly strip one full layer of leaves (nodes of degree 1) from the
 * tree until at most {@code k} nodes remain. Return the labels of the leaves of the
 * remaining tree.
 *
 * <p>With {@code k = 2} this degenerates into the classic "minimum height tree roots"
 * problem (LeetCode 310): the surviving nodes are the tree centroids.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * u0 v0
 * u1 v1
 * ...
 * u[n-2] v[n-2]
 * k
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 6
 * 3 0
 * 3 1
 * 3 2
 * 3 4
 * 5 4
 * 2
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 3 4
 * </pre>
 *
 * <p>Approach: track the degree of every node and keep a queue of the current leaves. Remove
 * them layer by layer, decrementing the degree of their neighbours. A neighbour whose degree
 * drops to 1 becomes a leaf of the next layer. Stop as soon as at most {@code k} nodes are
 * left; the current layer is the answer.
 *
 * <p>Complexity: Time O(n), Space O(n).
 */
public class MinimumHeightTrees {

    /**
     * Returns the leaf labels of the tree after stripping leaf layers until at most
     * {@code k} nodes remain.
     *
     * @param n     the number of nodes
     * @param edges the {@code n-1} undirected edges
     * @param k     the number of nodes to keep
     * @return the surviving leaf labels, in ascending order
     */
    public static List<Integer> findMinHeightTrees(int n, int[][] edges, int k) {
        if (n <= 0) {
            return new ArrayList<>();
        }
        List<List<Integer>> adjacency = new ArrayList<>(n);
        for (int i = 0; i < n; i++) {
            adjacency.add(new ArrayList<>());
        }
        int[] degree = new int[n];
        for (int[] edge : edges) {
            adjacency.get(edge[0]).add(edge[1]);
            adjacency.get(edge[1]).add(edge[0]);
            degree[edge[0]]++;
            degree[edge[1]]++;
        }

        List<Integer> leaves = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            if (degree[i] <= 1) {
                leaves.add(i);
            }
        }

        int remaining = n;
        while (remaining > k && !leaves.isEmpty()) {
            remaining -= leaves.size();
            List<Integer> nextLeaves = new ArrayList<>();
            for (int leaf : leaves) {
                for (int neighbour : adjacency.get(leaf)) {
                    if (--degree[neighbour] == 1) {
                        nextLeaves.add(neighbour);
                    }
                }
            }
            leaves = nextLeaves;
        }

        List<Integer> answer = new ArrayList<>(leaves);
        answer.sort(Integer::compareTo);
        return answer;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[][] edges = new int[Math.max(0, n - 1)][2];
        for (int i = 0; i < edges.length; i++) {
            edges[i][0] = fs.nextInt();
            edges[i][1] = fs.nextInt();
        }
        int k = fs.nextInt();

        List<Integer> answer = findMinHeightTrees(n, edges, k);
        StringBuilder out = new StringBuilder();
        for (int i = 0; i < answer.size(); i++) {
            if (i > 0) {
                out.append(' ');
            }
            out.append(answer.get(i));
        }
        System.out.println(out);
    }
}
