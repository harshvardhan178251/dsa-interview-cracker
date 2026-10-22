var e=`design.DesignUndergroundSystem`,t=`package com.dsa.design;

import com.dsa.utils.FastScanner;

import java.util.HashMap;
import java.util.Locale;
import java.util.Map;
import java.util.TreeMap;

/**
 * Problem: Design Underground System
 * LeetCode: 373 | Difficulty: Medium | Frequency: 3/5
 * Pattern: Design, Aggregation with a sorted map
 *
 * <p>Problem:
 * Track the average travel time between every pair of stations. Each customer checks in
 * at a start station and checks out at an end station; the trip duration is known.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * start end t
 * start end t
 * ...
 * </pre>
 * Every line is one completed trip: the start station, the end station and the duration.
 * The program prints one line per station pair, sorted by start station then end
 * station, formatted as {@code start end average}.
 *
 * <p>Sample input:
 * <pre>
 * 3
 * 1 2 4
 * 1 3 8
 * 1 2 6
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 1 2 5.00
 * 1 3 8.00
 * </pre>
 *
 * <p>Approach: a nested {@link TreeMap} keyed by start station and then end station keeps
 * the pairs sorted for output; each cell stores the running total time and the number of
 * trips. The average is the quotient of the two.
 *
 * <p>Complexity: Time O(log p) per trip for p station pairs, Space O(p).
 */
public class DesignUndergroundSystem {

    /** Running total time and trip count of one station pair. */
    private static final class Stats {
        long total;
        long count;

        Stats(long total, long count) {
            this.total = total;
            this.count = count;
        }
    }

    private final TreeMap<Integer, TreeMap<Integer, Stats>> stats = new TreeMap<>();

    /** Records a completed trip and returns the new average for that station pair. */
    public double recordTrip(int startStation, int endStation, int travelTime) {
        Stats cell = stats
                .computeIfAbsent(startStation, k -> new TreeMap<>())
                .computeIfAbsent(endStation, k -> new Stats(0, 0));
        cell.total += travelTime;
        cell.count++;
        return average(startStation, endStation);
    }

    /** The average travel time between two stations, or {@code 0} when nothing was recorded. */
    public double average(int startStation, int endStation) {
        TreeMap<Integer, Stats> inner = stats.get(startStation);
        if (inner == null) {
            return 0.0;
        }
        Stats cell = inner.get(endStation);
        if (cell == null || cell.count == 0) {
            return 0.0;
        }
        return (double) cell.total / cell.count;
    }

    /** Number of distinct station pairs seen so far. */
    public int pairCount() {
        int pairs = 0;
        for (Map.Entry<Integer, TreeMap<Integer, Stats>> outer : stats.entrySet()) {
            pairs += outer.getValue().size();
        }
        return pairs;
    }

    /** Formats an average the same way on every machine and locale. */
    public static String format(double average) {
        return String.format(Locale.ROOT, "%.2f", average);
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();

        DesignUndergroundSystem system = new DesignUndergroundSystem();
        for (int i = 0; i < n; i++) {
            int start = fs.nextInt();
            int end = fs.nextInt();
            int travelTime = fs.nextInt();
            system.recordTrip(start, end, travelTime);
        }

        StringBuilder out = new StringBuilder();
        for (Map.Entry<Integer, TreeMap<Integer, Stats>> outer : system.stats.entrySet()) {
            for (Map.Entry<Integer, Stats> inner : outer.getValue().entrySet()) {
                out.append(outer.getKey())
                        .append(' ')
                        .append(inner.getKey())
                        .append(' ')
                        .append(format((double) inner.getValue().total / inner.getValue().count))
                        .append('\\n');
            }
        }
        System.out.print(out);
    }
}
`,n=`import java.util.HashMap;
import java.util.Locale;
import java.util.Map;
import java.util.TreeMap;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

/**
 * Problem: Design Underground System
 * LeetCode: 373 | Difficulty: Medium | Frequency: 3/5
 * Pattern: Design, Aggregation with a sorted map
 *
 * <p>Problem:
 * Track the average travel time between every pair of stations. Each customer checks in
 * at a start station and checks out at an end station; the trip duration is known.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * start end t
 * start end t
 * ...
 * </pre>
 * Every line is one completed trip: the start station, the end station and the duration.
 * The program prints one line per station pair, sorted by start station then end
 * station, formatted as {@code start end average}.
 *
 * <p>Sample input:
 * <pre>
 * 3
 * 1 2 4
 * 1 3 8
 * 1 2 6
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 1 2 5.00
 * 1 3 8.00
 * </pre>
 *
 * <p>Approach: a nested {@link TreeMap} keyed by start station and then end station keeps
 * the pairs sorted for output; each cell stores the running total time and the number of
 * trips. The average is the quotient of the two.
 *
 * <p>Complexity: Time O(log p) per trip for p station pairs, Space O(p).
 */
public class Main {

    /** Running total time and trip count of one station pair. */
    private static final class Stats {
        long total;
        long count;

        Stats(long total, long count) {
            this.total = total;
            this.count = count;
        }
    }

    private final TreeMap<Integer, TreeMap<Integer, Stats>> stats = new TreeMap<>();

    /** Records a completed trip and returns the new average for that station pair. */
    public double recordTrip(int startStation, int endStation, int travelTime) {
        Stats cell = stats
                .computeIfAbsent(startStation, k -> new TreeMap<>())
                .computeIfAbsent(endStation, k -> new Stats(0, 0));
        cell.total += travelTime;
        cell.count++;
        return average(startStation, endStation);
    }

    /** The average travel time between two stations, or {@code 0} when nothing was recorded. */
    public double average(int startStation, int endStation) {
        TreeMap<Integer, Stats> inner = stats.get(startStation);
        if (inner == null) {
            return 0.0;
        }
        Stats cell = inner.get(endStation);
        if (cell == null || cell.count == 0) {
            return 0.0;
        }
        return (double) cell.total / cell.count;
    }

    /** Number of distinct station pairs seen so far. */
    public int pairCount() {
        int pairs = 0;
        for (Map.Entry<Integer, TreeMap<Integer, Stats>> outer : stats.entrySet()) {
            pairs += outer.getValue().size();
        }
        return pairs;
    }

    /** Formats an average the same way on every machine and locale. */
    public static String format(double average) {
        return String.format(Locale.ROOT, "%.2f", average);
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();

        Main system = new Main();
        for (int i = 0; i < n; i++) {
            int start = fs.nextInt();
            int end = fs.nextInt();
            int travelTime = fs.nextInt();
            system.recordTrip(start, end, travelTime);
        }

        StringBuilder out = new StringBuilder();
        for (Map.Entry<Integer, TreeMap<Integer, Stats>> outer : system.stats.entrySet()) {
            for (Map.Entry<Integer, Stats> inner : outer.getValue().entrySet()) {
                out.append(outer.getKey())
                        .append(' ')
                        .append(inner.getKey())
                        .append(' ')
                        .append(format((double) inner.getValue().total / inner.getValue().count))
                        .append('\\n');
            }
        }
        System.out.print(out);
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
`,r=`
# Design Underground System — LeetCode 373

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Design · Aggregation · Sorted map |
| **Interview heat** | ★★★☆☆ |
| **Asked at** | Amazon, Google, Meta, Uber, Lyft |

## Problem Statement

Track the average travel time between every pair of stations of an underground system.

- A customer checks in at a start station and checks out at an end station; the trip
  duration is known.
- \`getAverageTravelTime(start, end)\` returns the mean duration of all the trips between
  that pair, or \`0\` when no such trip was recorded.

The pairs have to be reported in a stable order (by start station, then end station).

## Input Format

\`\`\`
n
start end t
start end t
...
\`\`\`

- \`n\` — the number of completed trips.
- \`start end t\` — the start station, the end station and the duration of the trip.

The program prints one line per station pair, sorted by start station and then end
station: \`start end average\` with the average formatted to two decimals.

## Sample Input

\`\`\`
3
1 2 4
1 3 8
1 2 6
\`\`\`

## Expected Output

\`\`\`
1 2 5.00
1 3 8.00
\`\`\`

Station pair \`1 → 2\` was used twice, with durations \`4\` and \`6\`, so the average is
\`(4 + 6) / 2 = 5.00\`. Pair \`1 → 3\` was used once, with duration \`8\`.

## Approach — a nested sorted map of running totals

Only two numbers are needed per station pair: the **sum** of the durations and the
**number** of trips. The average is derived on demand.

\`\`\`
stats:  startStation → (endStation → {total, count})
\`\`\`

A \`TreeMap\` is used instead of a \`HashMap\` so that iterating over it yields the pairs in
sorted order — the output does not depend on the hash order of the keys.

| Operation | Cost |
|---|---|
| record a trip | O(log p) — two tree lookups plus a constant update |
| read an average | O(log p) |
| print all pairs | O(p) — the trees are already sorted |

**Why not store the average directly?** Updating an average in place needs the old
average and the count, and floating point rounding accumulates. Keeping the exact
integer total and the count is exact and division happens only when the answer is
printed.

## Dry Run

Input: \`n = 3\`, trips \`(1,2,4)\`, \`(1,3,8)\`, \`(1,2,6)\`.

| Step | Trip | \`stats\` before | Cell touched | Action | \`stats\` after | Average of the cell |
|---:|---|---|---|---|---|---|
| 1 | \`1 2 4\` | \`{}\` | \`1 → 2\` | total \`0+4 = 4\`, count \`0+1 = 1\` | \`{1 → {2 → {4, 1}}}\` | \`4 / 1 = 4.00\` |
| 2 | \`1 3 8\` | \`{1 → {2 → {4, 1}}}\` | \`1 → 3\` | total \`0+8 = 8\`, count \`0+1 = 1\` | \`{1 → {2 → {4, 1}, 3 → {8, 1}}}\` | \`8 / 1 = 8.00\` |
| 3 | \`1 2 6\` | \`{1 → {2 → {4, 1}, 3 → {8, 1}}}\` | \`1 → 2\` | total \`4+6 = 10\`, count \`1+1 = 2\` | \`{1 → {2 → {10, 2}, 3 → {8, 1}}}\` | \`10 / 2 = 5.00\` |

The final walk over the sorted maps visits \`1 → 2\` before \`1 → 3\`:

| Order | Pair | \`total\` | \`count\` | Average |
|---:|---|---:|---:|---|
| 1 | \`1 2\` | 10 | 2 | \`10 / 2 = 5.00\` |
| 2 | \`1 3\` | 8 | 1 | \`8 / 1 = 8.00\` |

## Java Solution

See [\`DesignUndergroundSystem.java\`](./DesignUndergroundSystem.java).

\`\`\`java
public double recordTrip(int startStation, int endStation, int travelTime) {
    Stats cell = stats
            .computeIfAbsent(startStation, k -> new TreeMap<>())
            .computeIfAbsent(endStation, k -> new Stats(0, 0));
    cell.total += travelTime;
    cell.count++;
    return average(startStation, endStation);
}

public double average(int startStation, int endStation) {
    TreeMap<Integer, Stats> inner = stats.get(startStation);
    if (inner == null) {
        return 0.0;
    }
    Stats cell = inner.get(endStation);
    if (cell == null || cell.count == 0) {
        return 0.0;
    }
    return (double) cell.total / cell.count;
}
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(log p) per trip, O(p) for the report | p = number of station pairs; tree lookups |
| **Space** | O(p) | one cell per station pair |

## Interview Notes

**Follow-ups to raise yourself:**
- *"What if the station names are strings?"* → the map stays the same, only the key type
  changes; the sorted output then follows the lexicographic order.
- *"How would you find the busiest route?"* → keep the count next to the sum and sort by
  it, or maintain a separate heap of the top-k routes.
- *"How would you scale this to 100 million trips?"* → shard by route hash, pre-aggregate
  per minute, and merge the partial aggregates.
- *"How would you report a median instead of an average?"* → keep a sketch (t-digest) or
  a per-route histogram of quantised durations.

**Common mistakes:**
- ❌ Updating the average in place instead of keeping the exact total and the count.
- ❌ Using a \`HashMap\` and then sorting by hash order — the output must be sorted.
- ❌ Forgetting the \`count == 0\` guard → division by zero.
- ❌ Formatting the average with the default locale → \`1,50\` instead of \`1.50\` on a
  German machine. Always use \`Locale.ROOT\`.

**How to narrate:**
> "For every route I only need two numbers: the total travel time and the number of
> trips. The average is the quotient, computed when it is asked for, so no rounding
> accumulates. I'll use a nested TreeMap so that the report comes out sorted by start and
> end station without an extra sort."

## Related Problems

- [MovingAverage — LeetCode 346](./MovingAverage.md) — a running average over a window
- [Design HitCounter — LeetCode 362](./DesignHitCounter.md) — counting inside a window
- [Design HashMap — LeetCode 706](./DesignHashMap.md) — the map underneath
`,i=[`format`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};