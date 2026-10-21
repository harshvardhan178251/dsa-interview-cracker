package com.dsa.graphs;

import com.dsa.utils.FastScanner;

import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.List;
import java.util.PriorityQueue;

/**
 * Problem: Course Schedule II
 * LeetCode: 210 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Topological sort, Kahn's algorithm with a min-heap
 *
 * <p>Problem: There are {@code n} courses labelled {@code 0..n-1}. Each course is a directed
 * edge {@code u -> v} meaning "course u must be taken before course v". Return <em>any</em>
 * ordering of the courses that respects every prerequisite.
 *
 * <p>Input format (stdin) — a directed graph given as an edge list:
 * <pre>
 * n m
 * u1 v1
 * u2 v2
 * ...
 * um vm
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 4 4
 * 1 0
 * 2 0
 * 3 1
 * 3 2
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 3 1 2 0
 * </pre>
 *
 * <p>Approach: Kahn's algorithm again, but the ready set is a {@link PriorityQueue} instead of a
 * FIFO queue. Whenever several courses are simultaneously available we always take the one with
 * the smallest label, which makes the output deterministic (and matches the lexicographically
 * smallest valid ordering).
 *
 * <p>Complexity: Time O(m + n log n), Space O(n + m).
 */
public class CourseScheduleII {

    /**
     * Returns a valid ordering of the courses.
     *
     * @param n     number of courses (vertices {@code 0..n-1})
     * @param edges prerequisite pairs {@code {u, v}} meaning "u before v"
     * @return the ordering, or an empty array when the graph has a cycle
     */
    public static int[] findOrder(int n, int[][] edges) {
        List<List<Integer>> adj = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            adj.add(new ArrayList<>());
        }
        int[] inDegree = new int[n];
        for (int[] edge : edges) {
            adj.get(edge[0]).add(edge[1]);
            inDegree[edge[1]]++;
        }

        PriorityQueue<Integer> ready = new PriorityQueue<>();
        for (int v = 0; v < n; v++) {
            if (inDegree[v] == 0) {
                ready.add(v);
            }
        }

        int[] order = new int[n];
        int taken = 0;
        while (!ready.isEmpty()) {
            int u = ready.poll();
            order[taken++] = u;
            for (int v : adj.get(u)) {
                if (--inDegree[v] == 0) {
                    ready.add(v);
                }
            }
        }
        // taken < n means a cycle blocked at least one course.
        return taken == n ? order : new int[0];
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

        int[] order = findOrder(n, edges);
        if (order.length == 0) {
            System.out.println(-1);
            return;
        }
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < order.length; i++) {
            if (i > 0) {
                sb.append(' ');
            }
            sb.append(order[i]);
        }
        System.out.println(sb);
    }
}
