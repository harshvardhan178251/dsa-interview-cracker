package com.dsa.advancedgraphs;

import com.dsa.utils.FastScanner;
import com.dsa.utils.UnionFind;

import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Deque;
import java.util.List;

/**
 * Problem: Eulerian Path
 * LeetCode: null | Difficulty: Hard | Frequency: 4/5
 * Pattern: Eulerian path, Hierholzer's algorithm, degree conditions
 *
 * <p>Problem: Given a directed graph, find a walk that uses every edge exactly once and prints
 * the visited vertices. Such a walk exists when
 * <ul>
 *   <li>all vertices with an edge are in one connected component (ignoring directions), and</li>
 *   <li>either every vertex has in-degree equal to out-degree (an Eulerian <em>circuit</em>),
 *       or exactly one vertex has out-degree = in-degree + 1 (the start), exactly one has
 *       in-degree = out-degree + 1 (the end) and the rest are balanced.</li>
 * </ul>
 * Return {@code -1} when no such walk exists.
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
 * 4 3
 * 0 1
 * 1 2
 * 2 3
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 0 1 2 3
 * </pre>
 *
 * <p>Approach: check the degree conditions and the connectivity with a {@link UnionFind}, then
 * run Hierholzer's algorithm: walk greedily, but push the vertex onto a stack and only write it
 * to the answer when it has no outgoing edge left. Reversing that list gives the Eulerian path.
 *
 * <p>Complexity: Time O(n + m), Space O(n + m).
 */
public class EulerianPath {

    /**
     * Finds an Eulerian path.
     *
     * @param n     number of vertices {@code 0..n-1}
     * @param edges directed edges {@code {u, v}}
     * @return the vertex sequence of the Eulerian path, or an empty array when none exists
     */
    public static int[] eulerianPath(int n, int[][] edges) {
        List<List<Integer>> adj = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            adj.add(new ArrayList<>());
        }
        int[] inDegree = new int[n];
        int[] outDegree = new int[n];
        for (int[] edge : edges) {
            adj.get(edge[0]).add(edge[1]);
            outDegree[edge[0]]++;
            inDegree[edge[1]]++;
        }

        int start = -1;
        int end = -1;
        for (int v = 0; v < n; v++) {
            int diff = outDegree[v] - inDegree[v];
            if (diff == 1) {
                if (start != -1) {
                    return new int[0]; // more than one start: impossible
                }
                start = v;
            } else if (diff == -1) {
                if (end != -1) {
                    return new int[0]; // more than one end: impossible
                }
                end = v;
            } else if (diff != 0) {
                return new int[0]; // |diff| > 1: impossible
            }
        }
        if ((start == -1) != (end == -1)) {
            return new int[0]; // a path needs both a start and an end
        }
        if (start == -1) {
            // Eulerian circuit: start at the smallest vertex with an outgoing edge.
            for (int v = 0; v < n; v++) {
                if (outDegree[v] > 0) {
                    start = v;
                    break;
                }
            }
        }
        if (start == -1) {
            return new int[0]; // no edges at all
        }

        // All vertices that carry an edge have to be in the same (undirected) component.
        UnionFind uf = new UnionFind(n);
        for (int[] edge : edges) {
            uf.union(edge[0], edge[1]);
        }
        int component = -1;
        for (int v = 0; v < n; v++) {
            if (outDegree[v] == 0 && inDegree[v] == 0) {
                continue;
            }
            int root = uf.find(v);
            if (component == -1) {
                component = root;
            } else if (component != root) {
                return new int[0]; // the graph is split
            }
        }

        // Hierholzer's algorithm.
        Deque<Integer> stack = new ArrayDeque<>();
        List<Integer> reversed = new ArrayList<>();
        stack.push(start);
        while (!stack.isEmpty()) {
            int v = stack.peek();
            if (adj.get(v).isEmpty()) {
                reversed.add(stack.pop());
            } else {
                stack.push(adj.get(v).remove(adj.get(v).size() - 1));
            }
        }
        Collections.reverse(reversed);

        if (reversed.size() != edges.length + 1) {
            return new int[0]; // some edges could not be used
        }
        int[] path = new int[reversed.size()];
        for (int i = 0; i < reversed.size(); i++) {
            path[i] = reversed.get(i);
        }
        return path;
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

        int[] path = eulerianPath(n, edges);
        if (path.length == 0) {
            System.out.println(-1);
            return;
        }
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < path.length; i++) {
            if (i > 0) {
                sb.append(' ');
            }
            sb.append(path[i]);
        }
        System.out.println(sb);
    }
}
