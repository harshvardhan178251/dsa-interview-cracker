package com.dsa.graphs;

import com.dsa.utils.FastScanner;
import com.dsa.utils.UnionFind;

import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Deque;
import java.util.List;
import java.util.PriorityQueue;

/**
 * Problem: Reconstruct Itinerary
 * LeetCode: 332 | Difficulty: Hard | Frequency: 4/5
 * Pattern: Hierholzer's algorithm, Eulerian path, reverse post-order
 *
 * <p>Problem: Airports are numbered {@code 0..n-1}. Every ticket {@code (u, v)} is a directed
 * flight from {@code u} to {@code v}; a ticket may be used only once. Reconstruct the itinerary
 * that uses every ticket exactly once. When several flights leave the same airport, take the one
 * with the smallest destination first.
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
 * 5 4
 * 1 2
 * 0 1
 * 3 4
 * 2 3
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 0 1 2 3 4
 * </pre>
 *
 * <p>Approach: the itinerary is an Eulerian path — a walk that uses every edge exactly once.
 * Hierholzer's algorithm finds it: walk greedily, but instead of printing a vertex as soon as
 * you reach it, push it onto a stack and only add it to the answer when it has no outgoing
 * flights left. Reversing that list yields the itinerary. Neighbours are kept in a min-heap so
 * the greedy choice is "smallest destination first".
 *
 * <p>Complexity: Time O(m log n), Space O(n + m).
 */
public class ReconstructItinerary {

    /**
     * Reconstructs the itinerary that uses every ticket exactly once.
     *
     * @param n     number of airports {@code 0..n-1}
     * @param edges directed flights {@code {from, to}}
     * @return the itinerary, or an empty array when no itinerary uses every ticket
     */
    public static int[] reconstructItinerary(int n, int[][] edges) {
        List<PriorityQueue<Integer>> adj = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            adj.add(new PriorityQueue<>());
        }
        int[] inDegree = new int[n];
        int[] outDegree = new int[n];
        for (int[] edge : edges) {
            adj.get(edge[0]).add(edge[1]);
            outDegree[edge[0]]++;
            inDegree[edge[1]]++;
        }

        // Degree check: an Eulerian path has either all vertices balanced, or exactly one
        // vertex with one extra outgoing flight (the start) and one with one extra incoming
        // flight (the end). Any other pattern means no itinerary can exist.
        int starts = 0;
        int ends = 0;
        for (int v = 0; v < n; v++) {
            int diff = outDegree[v] - inDegree[v];
            if (diff == 1) {
                starts++;
            } else if (diff == -1) {
                ends++;
            } else if (diff != 0) {
                return new int[0]; // more than one extra outgoing or incoming flight
            }
        }
        if (starts != ends) {
            return new int[0];
        }

        // The start is the airport with one more outgoing than incoming flight.
        int start = -1;
        for (int v = 0; v < n; v++) {
            if (outDegree[v] - inDegree[v] == 1) {
                start = v;
                break;
            }
        }
        if (start == -1) {
            // Eulerian circuit: start at the smallest airport that has a departing flight.
            for (int v = 0; v < n; v++) {
                if (!adj.get(v).isEmpty()) {
                    start = v;
                    break;
                }
            }
        }
        if (start == -1) {
            return new int[0];
        }

        // Every airport that carries a flight has to be in the same (undirected) component.
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
                return new int[0]; // the flights are split over several components
            }
        }

        Deque<Integer> stack = new ArrayDeque<>();
        List<Integer> reversed = new ArrayList<>();
        stack.push(start);
        while (!stack.isEmpty()) {
            int v = stack.peek();
            if (adj.get(v).isEmpty()) {
                reversed.add(stack.pop()); // dead end: flush the vertex into the answer
            } else {
                stack.push(adj.get(v).poll());
            }
        }
        Collections.reverse(reversed);

        if (reversed.size() != edges.length + 1) {
            return new int[0]; // some tickets could not be used
        }
        int[] itinerary = new int[reversed.size()];
        for (int i = 0; i < reversed.size(); i++) {
            itinerary[i] = reversed.get(i);
        }
        return itinerary;
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

        int[] itinerary = reconstructItinerary(n, edges);
        if (itinerary.length == 0) {
            System.out.println(-1);
            return;
        }
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < itinerary.length; i++) {
            if (i > 0) {
                sb.append(' ');
            }
            sb.append(itinerary[i]);
        }
        System.out.println(sb);
    }
}
