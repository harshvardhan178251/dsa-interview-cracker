var e=`graphs.CheapestFlightsWithinKStops`,t=`package com.dsa.graphs;

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
            int[] next = dist.clone(); // paths using at most \`round\` edges
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
`,n=`import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

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
public class Main {

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
            int[] next = dist.clone(); // paths using at most \`round\` edges
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

// ---------- inlined com.dsa.utils.FastScanner ----------
/**
 * Allocation-light scanner for contest-style stdin input.
 *
 * <p>Every problem in this repository reads its input through this class so the
 * expected stdin format stays consistent across the whole set.
 *
 * <p>Typical usage:
 * <pre>{@code
 * FastScanner fs = new FastScanner(System.in);
 * int n = fs.nextInt();
 * int[] nums = fs.nextIntArray(n);
 * }</pre>
 */
class FastScanner {

    private final BufferedReader reader;
    private final char[] buffer = new char[1 << 16];
    private int ptr = 0;
    private int len = 0;

    public FastScanner(InputStream in) {
        this.reader = new BufferedReader(new InputStreamReader(in, StandardCharsets.UTF_8), 1 << 16);
    }

    /** Returns the next raw character, or -1 at end of input. */
    private int read() throws IOException {
        if (ptr >= len) {
            len = reader.read(buffer);
            ptr = 0;
            if (len <= 0) {
                return -1;
            }
        }
        return buffer[ptr++];
    }

    private void skipWhitespace() throws IOException {
        int c;
        while ((c = read()) != -1) {
            if (!Character.isWhitespace(c)) {
                ptr--; // step back onto the first meaningful character
                return;
            }
        }
    }

    /** True when at least one more non-whitespace character exists. */
    public boolean hasNext() throws IOException {
        skipWhitespace();
        return ptr < len;
    }

    /** Reads the next whitespace-delimited token as a string. */
    public String next() throws IOException {
        skipWhitespace();
        StringBuilder sb = new StringBuilder();
        int c;
        while ((c = read()) != -1 && !Character.isWhitespace(c)) {
            sb.append((char) c);
        }
        return sb.toString();
    }

    public int nextInt() throws IOException {
        skipWhitespace();
        int c = read();
        while (c != -1 && c != '-' && (c < '0' || c > '9')) {
            c = read();
        }
        int sign = 1;
        if (c == '-') {
            sign = -1;
            c = read();
        }
        int value = 0;
        while (c >= '0' && c <= '9') {
            value = value * 10 + (c - '0');
            c = read();
        }
        return sign * value;
    }

    public long nextLong() throws IOException {
        skipWhitespace();
        int c = read();
        while (c != -1 && c != '-' && (c < '0' || c > '9')) {
            c = read();
        }
        int sign = 1;
        if (c == '-') {
            sign = -1;
            c = read();
        }
        long value = 0;
        while (c >= '0' && c <= '9') {
            value = value * 10 + (c - '0');
            c = read();
        }
        return sign * value;
    }

    public double nextDouble() throws IOException {
        return Double.parseDouble(next());
    }

    public char nextChar() throws IOException {
        skipWhitespace();
        int c = read();
        return c == -1 ? '\\0' : (char) c;
    }

    /** Reads exactly {@code n} integers. */
    public int[] nextIntArray(int n) throws IOException {
        int[] out = new int[n];
        for (int i = 0; i < n; i++) {
            out[i] = nextInt();
        }
        return out;
    }

    /** Reads exactly {@code n} longs. */
    public long[] nextLongArray(int n) throws IOException {
        long[] out = new long[n];
        for (int i = 0; i < n; i++) {
            out[i] = nextLong();
        }
        return out;
    }

    /** Reads exactly {@code n} whitespace-delimited strings. */
    public String[] nextStringArray(int n) throws IOException {
        String[] out = new String[n];
        for (int i = 0; i < n; i++) {
            out[i] = next();
        }
        return out;
    }
}
`,r='\n# Cheapest Flights Within K Stops — LeetCode 787\n\n| | |\n|---|---|\n| **Difficulty** | Medium |\n| **Pattern** | Bellman-Ford · Hop budget |\n| **Interview heat** | ★★★★☆ |\n| **Asked at** | Amazon, Google, Meta, Uber, Airbnb |\n\n## Problem Statement\n\nA directed, weighted graph of flights is given. Find the cheapest price from `src` to `dst` using\n**at most `k` intermediate stops** — that is, a path with at most `k + 1` edges. Return `-1`\nwhen no such path exists.\n\n## Input Format\n\nThe program reads a directed, weighted graph given as an **edge list**:\n\n```\nn m\nu1 v1 w1\nu2 v2 w2\n...\num vm wm\nsrc dst k\n```\n\n- `n` — number of cities, numbered `0 … n-1`\n- `m` — number of directed flights\n- `m` lines, each with three integers `u v w`: the flight `u → v` with price `w ≥ 0`\n- `src`, `dst` — origin and destination\n- `k` — maximum number of intermediate stops (`0 ≤ k ≤ n-1`)\n\n## Sample Input\n\n```\n4 5\n0 1 100\n1 2 100\n0 2 300\n2 3 100\n1 3 200\n0 3 1\n```\n\n## Expected Output\n\n```\n300\n```\n\nWith one stop allowed the cheapest routes are `0 → 1 → 3` (100 + 200 = **300**) and\n`0 → 2 → 3` (300 + 100 = 400). The direct route `0 → 1 → 2 → 3` would be cheaper (300) but it\nuses **two** stops, which is not allowed.\n\n## Approach — Bellman-Ford with a round limit\n\nBellman-Ford relaxes all edges `n - 1` times, and after round `r` the distances describe the\ncheapest paths using **at most `r` edges**. We only want at most `k + 1` edges, so we simply stop\nafter `k + 1` rounds.\n\nThe one subtlety is **not to update in place**. If we relax the edges directly into `dist`\nduring a round, a single round could chain several relaxations and produce a path longer than the\nround allows. So each round writes into a **copy**:\n\n```\nnext = dist.clone()          // paths using at most `round` edges\nfor each edge (u, v, w):\n    next[v] = min(next[v], dist[u] + w)\ndist = next\n```\n\nAfter the last round `dist[dst]` is the cheapest price with at most `k` stops.\n\n**Why not Dijkstra?** Dijkstra does not limit the number of edges, and the "k stops" constraint\nis exactly the kind of thing that maps onto Bellman-Ford\'s rounds.\n\n## Dry Run\n\nEdges: `0→1 (100)`, `1→2 (100)`, `0→2 (300)`, `2→3 (100)`, `1→3 (200)`; `src=0`, `dst=3`, `k=1`\n→ 2 rounds.\n\n**Round 0** (paths with at most 1 edge) — `dist = [0, ∞, ∞, ∞]`, `next` starts as a copy:\n\n| Edge | `dist[u] + w` | `next[v]` before | `next[v]` after |\n|---|---|---:|---:|\n| `0→1 (100)` | 0 + 100 = 100 | ∞ | **100** |\n| `1→2 (100)` | 100 + 100 = 200 | ∞ | **200** |\n| `0→2 (300)` | 0 + 300 = 300 | 200 | 300 (no change) |\n| `2→3 (100)` | 200 + 100 = 300 | ∞ | **300** |\n| `1→3 (200)` | 100 + 200 = 300 | 300 | 300 (no change) |\n\n`dist` after round 0 = `[0, 100, 200, 300]`\n\n**Round 1** (paths with at most 2 edges) — `next` starts as a copy of `dist`:\n\n| Edge | `dist[u] + w` | `next[v]` before | `next[v]` after |\n|---|---|---:|---:|\n| `0→1 (100)` | 100 | 100 | 100 |\n| `1→2 (100)` | 200 | 200 | 200 |\n| `0→2 (300)` | 300 | 200 | 200 |\n| `2→3 (100)` | 300 | 300 | 300 |\n| `1→3 (200)` | 300 | 300 | 300 |\n\n`dist` after round 1 = `[0, 100, 200, 300]` → `dist[3] = ` **`300`**.\n\n## Java Solution\n\nSee [`CheapestFlightsWithinKStops.java`](./CheapestFlightsWithinKStops.java).\n\n```java\npublic static int findCheapestPrice(int n, int[][] flights, int src, int dst, int k) {\n    for (int round = 0; round <= k; round++) {\n        int[] next = dist.clone(); // paths using at most `round` edges\n        for (int[] flight : flights) {\n            if (dist[flight[0]] == Integer.MAX_VALUE) {\n                continue;\n            }\n            if (dist[flight[0]] + flight[2] < next[flight[1]]) {\n                next[flight[1]] = dist[flight[0]] + flight[2];\n            }\n        }\n        dist = next;\n    }\n    return dist[dst] == Integer.MAX_VALUE ? -1 : dist[dst];\n}\n```\n\n## Complexity\n\n| | Value | Why |\n|---|---|---|\n| **Time** | O((k + 1) · m) | `k + 1` rounds, each relaxing every edge once |\n| **Space** | O(n + m) | The distance array plus the copy, and the input edges |\n\n## Interview Notes\n\n**Follow-ups to raise yourself:**\n- *"What if `k` is very large?"* → then the hop limit stops mattering and plain Dijkstra is\n  O(m log n) instead of O(k·m); use `k = n - 1` as the cut-off.\n- *"What if the prices can be negative?"* → Bellman-Ford still works, but you must also detect\n  negative cycles (see [Bellman-Ford](../advancedgraphs/BellmanFord.java)).\n- *"How would you return the cheapest itinerary, not just the price?"* → keep a parent array per\n  round and walk it back.\n- *"What if there are many queries with different `k`?"* → the rounds can be shared: run the\n  rounds once and snapshot the distance array after each round.\n\n**Common mistakes:**\n- ❌ Relaxing **in place** inside a round → one round can chain many edges and the hop limit is\n  silently violated. Use a copy.\n- ❌ Running only `k` rounds instead of `k + 1` → `k` stops means `k + 1` edges.\n- ❌ Forgetting the `Integer.MAX_VALUE` guard → integer overflow turns unreachable nodes into\n  huge (or negative) distances.\n\n**How to narrate:**\n> "This is Bellman-Ford with a budget. Bellman-Ford\'s round r gives the cheapest paths using\n> at most r edges, and \'k stops\' means at most k+1 edges, so I just stop after k+1 rounds. The\n> important detail is that each round writes into a copy of the distance array — otherwise a\n> single round could chain several relaxations and use more edges than the round allows."\n\n## Related Problems\n\n- [Bellman-Ford](../advancedgraphs/BellmanFord.java) — the full algorithm\n- [Network Delay Time](./NetworkDelayTime.java) — Dijkstra without a hop budget\n- [Course Schedule II](./CourseScheduleII.java) — bounded relaxations, unweighted\n- [Dijkstra\'s Shortest Path](../advancedgraphs/DijkstraShortestPath.java)\n',i=[`findCheapestPrice`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};