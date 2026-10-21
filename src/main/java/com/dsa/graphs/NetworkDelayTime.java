package com.dsa.graphs;

import com.dsa.utils.FastScanner;

import java.util.ArrayList;
import java.util.List;
import java.util.PriorityQueue;

/**
 * Problem: Network Delay Time
 * LeetCode: 743 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Dijkstra, shortest path
 *
 * <p>Problem: A weighted, directed network is given. Every edge {@code (u, v, w)} means a message
 * travels from {@code u} to {@code v} in {@code w} milliseconds. Starting from a source node,
 * return the time it takes for the message to reach <em>every</em> node, i.e. the largest
 * shortest-path distance. Return {@code -1} if some node can never be reached.
 *
 * <p>Input format (stdin) — a directed, weighted graph given as an edge list:
 * <pre>
 * n m
 * u1 v1 w1
 * ...
 * um vm wm
 * source
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 4 4
 * 0 1 3
 * 1 2 4
 * 0 3 2
 * 3 2 1
 * 0
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 3
 * </pre>
 *
 * <p>Approach: Dijkstra with a min-heap. All edge weights are non-negative, so the first time we
 * settle a vertex its distance is final.
 *
 * <p>Complexity: Time O(m log n), Space O(n + m).
 */
public class NetworkDelayTime {

    /**
     * Largest shortest-path distance from {@code source}, or {@code -1} when some node is
     * unreachable.
     *
     * @param n      number of nodes {@code 0..n-1}
     * @param times  directed edges {@code {u, v, weight}}
     * @param source the starting node
     * @return the network delay in milliseconds, {@code -1} if not all nodes are reachable
     */
    public static int networkDelayTime(int n, int[][] times, int source) {
        List<List<int[]>> adj = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            adj.add(new ArrayList<>());
        }
        for (int[] edge : times) {
            adj.get(edge[0]).add(new int[]{edge[1], edge[2]});
        }

        int[] dist = new int[n];
        for (int i = 0; i < n; i++) {
            dist[i] = Integer.MAX_VALUE;
        }
        dist[source] = 0;

        // entries are {distance, node}
        PriorityQueue<int[]> heap = new PriorityQueue<>((a, b) -> Integer.compare(a[0], b[0]));
        heap.add(new int[]{0, source});

        while (!heap.isEmpty()) {
            int[] top = heap.poll();
            int currentDist = top[0];
            int u = top[1];
            if (currentDist > dist[u]) {
                continue; // stale heap entry
            }
            for (int[] edge : adj.get(u)) {
                int v = edge[0];
                int newDist = currentDist + edge[1];
                if (newDist < dist[v]) {
                    dist[v] = newDist;
                    heap.add(new int[]{newDist, v});
                }
            }
        }

        int answer = 0;
        for (int d : dist) {
            if (d == Integer.MAX_VALUE) {
                return -1;
            }
            answer = Math.max(answer, d);
        }
        return answer;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int m = fs.nextInt();

        int[][] times = new int[m][3];
        for (int i = 0; i < m; i++) {
            times[i][0] = fs.nextInt();
            times[i][1] = fs.nextInt();
            times[i][2] = fs.nextInt();
        }
        int source = fs.nextInt();

        System.out.println(networkDelayTime(n, times, source));
    }
}
