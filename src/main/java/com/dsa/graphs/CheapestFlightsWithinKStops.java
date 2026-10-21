package com.dsa.graphs;

import com.dsa.utils.FastScanner;

/**
 * Problem: Cheapest Flights Within K Stops
 * LeetCode: 787 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Bellman-Ford with a hop budget
 *
 * <p>Problem: A directed, weighted graph of flights is given. Find the cheapest price from
 * {@code src} to {@code dst} using at most {@code k} intermediate stops, i.e. a path with at most
 * {@code k + 1} edges. Return {@code -1} when no such path exists.
 *
 * <p>Input format (stdin) — a directed, weighted graph given as an edge list:
 * <pre>
 * n m
 * u1 v1 w1
 * ...
 * um vm wm
 * src dst k
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 4 5
 * 0 1 100
 * 1 2 100
 * 0 2 300
 * 2 3 100
 * 1 3 200
 * 0 3 1
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 300
 * </pre>
 *
 * <p>Approach: Bellman-Ford restricted to {@code k + 1} relaxation rounds. Round {@code r} may only
 * use paths of at most {@code r} edges, so after {@code k + 1} rounds {@code dist[dst]} is the
 * cheapest path with at most {@code k} stops. Using a separate array for the round's results
 * keeps every round a pure "at most r edges" relaxation.
 *
 * <p>Complexity: Time O((k + 1) * m), Space O(n + m).
 */
public class CheapestFlightsWithinKStops {

    /**
     * Cheapest price from {@code src} to {@code dst} with at most {@code k} stops.
     *
     * @param n       number of cities {@code 0..n-1}
     * @param flights directed edges {@code {from, to, price}}
     * @param src     the origin
     * @param dst     the destination
     * @param k       maximum number of intermediate stops
     * @return the cheapest price, {@code -1} when unreachable
     */
    public static int findCheapestPrice(int n, int[][] flights, int src, int dst, int k) {
        int[] dist = new int[n];
        for (int i = 0; i < n; i++) {
            dist[i] = Integer.MAX_VALUE;
        }
        dist[src] = 0;

        for (int round = 0; round <= k; round++) {
            int[] next = dist.clone(); // paths using at most `round` edges
            for (int[] flight : flights) {
                int from = flight[0];
                int to = flight[1];
                int price = flight[2];
                if (dist[from] == Integer.MAX_VALUE) {
                    continue;
                }
                if (dist[from] + price < next[to]) {
                    next[to] = dist[from] + price;
                }
            }
            dist = next;
        }
        return dist[dst] == Integer.MAX_VALUE ? -1 : dist[dst];
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int m = fs.nextInt();

        int[][] flights = new int[m][3];
        for (int i = 0; i < m; i++) {
            flights[i][0] = fs.nextInt();
            flights[i][1] = fs.nextInt();
            flights[i][2] = fs.nextInt();
        }
        int src = fs.nextInt();
        int dst = fs.nextInt();
        int k = fs.nextInt();

        System.out.println(findCheapestPrice(n, flights, src, dst, k));
    }
}
