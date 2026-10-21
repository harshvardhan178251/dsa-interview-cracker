package com.dsa.graphs;

import com.dsa.utils.FastScanner;

import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.List;

/**
 * Problem: Course Schedule
 * LeetCode: 207 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Topological sort, Kahn's algorithm (cycle detection)
 *
 * <p>Problem: There are {@code n} courses labelled {@code 0..n-1}. Each course is a directed
 * edge {@code u -> v} meaning "course u must be taken before course v". Decide whether it is
 * possible to finish every course, i.e. whether the dependency graph is acyclic.
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
 * 0 1
 * 1 2
 * 2 3
 * 3 1
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * false
 * </pre>
 *
 * <p>Approach: Kahn's algorithm. Count the in-degree of every vertex, push the vertices with
 * in-degree 0 into a queue and repeatedly remove one. Removing a vertex lowers the in-degree of
 * its neighbours, which may unlock more vertices. If we manage to remove all {@code n} vertices
 * the graph had no cycle; otherwise the vertices left in the queue are exactly the ones on (or
 * reachable from) a cycle.
 *
 * <p>Complexity: Time O(n + m), Space O(n + m).
 */
public class CourseSchedule {

    /**
     * Decides whether all courses can be completed.
     *
     * @param n     number of courses (vertices {@code 0..n-1})
     * @param edges prerequisite pairs {@code {u, v}} meaning "u before v"
     * @return {@code true} when the graph is acyclic
     */
    public static boolean canFinish(int n, int[][] edges) {
        List<List<Integer>> adj = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            adj.add(new ArrayList<>());
        }
        int[] inDegree = new int[n];
        for (int[] edge : edges) {
            adj.get(edge[0]).add(edge[1]);
            inDegree[edge[1]]++;
        }

        Deque<Integer> queue = new ArrayDeque<>();
        for (int v = 0; v < n; v++) {
            if (inDegree[v] == 0) {
                queue.add(v);
            }
        }

        int removed = 0;
        while (!queue.isEmpty()) {
            int u = queue.poll();
            removed++;
            for (int v : adj.get(u)) {
                if (--inDegree[v] == 0) {
                    queue.add(v);
                }
            }
        }
        return removed == n;
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

        System.out.println(canFinish(n, edges));
    }
}
