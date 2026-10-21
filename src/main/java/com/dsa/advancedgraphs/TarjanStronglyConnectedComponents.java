package com.dsa.advancedgraphs;

import com.dsa.utils.FastScanner;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

/**
 * Problem: Tarjan's Strongly Connected Components
 * LeetCode: null | Difficulty: Hard | Frequency: 4/5
 * Pattern: Tarjan, low-link values, DFS stack
 *
 * <p>Problem: Given a directed graph, split it into strongly connected components — maximal sets
 * of vertices where every vertex can reach every other one.
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
 * 4 4
 * 0 1
 * 1 2
 * 2 0
 * 2 3
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 2
 * 0 1 2
 * 3
 * </pre>
 *
 * <p>Output: the number of components on the first line, then one line per component holding
 * its vertices in ascending order; the components themselves are listed by their smallest
 * vertex.
 *
 * <p>Approach: Tarjan's algorithm runs a single DFS and keeps two values per vertex: the index
 * when it was discovered and the smallest index reachable from its subtree through tree edges
 * and at most one back edge. When {@code low[v] == index[v]} the vertex is the root of a
 * strongly connected component and we pop the component stack down to it.
 *
 * <p>Complexity: Time O(n + m), Space O(n + m).
 */
public class TarjanStronglyConnectedComponents {

    /** Mutable DFS state, kept in one place so the recursive helper stays readable. */
    private static final class Tarjan {
        final List<List<Integer>> adj;
        final int[] index;
        final int[] low;
        final boolean[] onStack;
        final List<Integer> stack = new ArrayList<>();
        final List<List<Integer>> components = new ArrayList<>();
        int counter = 0;

        Tarjan(List<List<Integer>> adj) {
            this.adj = adj;
            this.index = new int[adj.size()];
            this.low = new int[adj.size()];
            this.onStack = new boolean[adj.size()];
            Arrays.fill(index, -1);
            Arrays.fill(low, -1);
        }

        void visit(int v) {
            index[v] = low[v] = counter++;
            stack.add(v);
            onStack[v] = true;

            for (int w : adj.get(v)) {
                if (index[w] == -1) {
                    visit(w);
                    low[v] = Math.min(low[v], low[w]);
                } else if (onStack[w]) {
                    low[v] = Math.min(low[v], index[w]);
                }
            }

            if (low[v] == index[v]) {
                List<Integer> component = new ArrayList<>();
                while (true) {
                    int w = stack.remove(stack.size() - 1);
                    onStack[w] = false;
                    component.add(w);
                    if (w == v) {
                        break;
                    }
                }
                components.add(component);
            }
        }
    }

    /**
     * Splits a directed graph into its strongly connected components.
     *
     * @param n     number of vertices {@code 0..n-1}
     * @param edges directed edges {@code {u, v}}
     * @return one list per component, each list sorted ascending; the components are ordered by
     *         their smallest vertex
     */
    public static List<List<Integer>> stronglyConnectedComponents(int n, int[][] edges) {
        List<List<Integer>> adj = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            adj.add(new ArrayList<>());
        }
        for (int[] edge : edges) {
            adj.get(edge[0]).add(edge[1]);
        }

        Tarjan state = new Tarjan(adj);
        for (int v = 0; v < n; v++) {
            if (state.index[v] == -1) {
                state.visit(v);
            }
        }

        List<List<Integer>> result = new ArrayList<>();
        for (List<Integer> component : state.components) {
            Collections.sort(component);
            result.add(component);
        }
        result.sort((a, b) -> Integer.compare(a.get(0), b.get(0)));
        return result;
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

        List<List<Integer>> components = stronglyConnectedComponents(n, edges);
        System.out.println(components.size());
        for (List<Integer> component : components) {
            StringBuilder line = new StringBuilder();
            for (int i = 0; i < component.size(); i++) {
                if (i > 0) {
                    line.append(' ');
                }
                line.append(component.get(i));
            }
            System.out.println(line);
        }
    }
}
