var e=`greedy.MinimumNumberOfRefuelingStops`,t=`package com.dsa.greedy;

import com.dsa.utils.FastScanner;

import java.util.Arrays;
import java.util.PriorityQueue;

/**
 * Problem: Minimum Number of Refueling Stops
 * LeetCode: 871 | Difficulty: Medium | Frequency: 3/5
 * Pattern: Greedy, Max-heap simulation
 *
 * <p>Problem:
 * A car has to travel {@code target} miles east. It starts with {@code startFuel} litres
 * in an unlimited tank and burns one litre per mile. Station {@code i} sits
 * {@code distance[i]} miles from the start and offers {@code fuel[i]} litres. Refuelling
 * at a station takes the whole offer and counts as one stop. Return the minimum number
 * of stops, or {@code -1} when the target cannot be reached.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * distance[0] fuel[0]
 * distance[1] fuel[1]
 * ...
 * distance[n-1] fuel[n-1]
 * target
 * startFuel
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 4
 * 10 60
 * 20 30
 * 30 30
 * 60 40
 * 100
 * 10
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 2
 * </pre>
 *
 * <p>Approach: drive as far as the fuel collected so far allows and remember every
 * station that has been passed in a max-heap. When the tank runs dry, refuel at the
 * passed station with the most fuel — that single choice reaches at least as far as
 * any other single choice would.
 *
 * <p>Complexity: Time O(n log n), Space O(n).
 */
public class MinimumNumberOfRefuelingStops {

    /**
     * Returns the minimum number of refuelling stops needed to reach {@code target}.
     *
     * @param target    distance of the destination
     * @param startFuel fuel in the tank when the car starts
     * @param stations  station distances and fuel amounts
     * @return the minimum number of stops, or {@code -1} when the target is unreachable
     */
    public static int minRefuelStops(int target, int startFuel, int[][] stations) {
        if (target <= 0) {
            return 0;
        }
        if (stations == null || stations.length == 0) {
            return startFuel >= target ? 0 : -1;
        }
        int[][] sorted = stations.clone();
        Arrays.sort(sorted, (a, b) -> Integer.compare(a[0], b[0]));

        PriorityQueue<Integer> fuel = new PriorityQueue<>((a, b) -> b - a);   // max-heap
        int stops = 0;
        int previous = 0;      // last position the car stood at
        int tank = startFuel;
        for (int i = 0; i <= sorted.length; i++) {
            int position = (i < sorted.length) ? sorted[i][0] : target;
            tank -= position - previous;
            while (tank < 0 && !fuel.isEmpty()) {
                tank += fuel.poll();   // refuel at the best station passed so far
                stops++;
            }
            if (tank < 0) {
                return -1;      // not enough fuel to even reach this checkpoint
            }
            if (i < sorted.length) {
                fuel.offer(sorted[i][1]);
                previous = sorted[i][0];
            }
        }
        return stops;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[][] stations = new int[n][2];
        for (int i = 0; i < n; i++) {
            stations[i][0] = fs.nextInt();
            stations[i][1] = fs.nextInt();
        }
        int target = fs.nextInt();
        int startFuel = fs.nextInt();

        System.out.println(minRefuelStops(target, startFuel, stations));
    }
}
`,n=`import java.util.Arrays;
import java.util.PriorityQueue;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

/**
 * Problem: Minimum Number of Refueling Stops
 * LeetCode: 871 | Difficulty: Medium | Frequency: 3/5
 * Pattern: Greedy, Max-heap simulation
 *
 * <p>Problem:
 * A car has to travel {@code target} miles east. It starts with {@code startFuel} litres
 * in an unlimited tank and burns one litre per mile. Station {@code i} sits
 * {@code distance[i]} miles from the start and offers {@code fuel[i]} litres. Refuelling
 * at a station takes the whole offer and counts as one stop. Return the minimum number
 * of stops, or {@code -1} when the target cannot be reached.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * distance[0] fuel[0]
 * distance[1] fuel[1]
 * ...
 * distance[n-1] fuel[n-1]
 * target
 * startFuel
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 4
 * 10 60
 * 20 30
 * 30 30
 * 60 40
 * 100
 * 10
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 2
 * </pre>
 *
 * <p>Approach: drive as far as the fuel collected so far allows and remember every
 * station that has been passed in a max-heap. When the tank runs dry, refuel at the
 * passed station with the most fuel — that single choice reaches at least as far as
 * any other single choice would.
 *
 * <p>Complexity: Time O(n log n), Space O(n).
 */
public class Main {

    /**
     * Returns the minimum number of refuelling stops needed to reach {@code target}.
     *
     * @param target    distance of the destination
     * @param startFuel fuel in the tank when the car starts
     * @param stations  station distances and fuel amounts
     * @return the minimum number of stops, or {@code -1} when the target is unreachable
     */
    public static int minRefuelStops(int target, int startFuel, int[][] stations) {
        if (target <= 0) {
            return 0;
        }
        if (stations == null || stations.length == 0) {
            return startFuel >= target ? 0 : -1;
        }
        int[][] sorted = stations.clone();
        Arrays.sort(sorted, (a, b) -> Integer.compare(a[0], b[0]));

        PriorityQueue<Integer> fuel = new PriorityQueue<>((a, b) -> b - a);   // max-heap
        int stops = 0;
        int previous = 0;      // last position the car stood at
        int tank = startFuel;
        for (int i = 0; i <= sorted.length; i++) {
            int position = (i < sorted.length) ? sorted[i][0] : target;
            tank -= position - previous;
            while (tank < 0 && !fuel.isEmpty()) {
                tank += fuel.poll();   // refuel at the best station passed so far
                stops++;
            }
            if (tank < 0) {
                return -1;      // not enough fuel to even reach this checkpoint
            }
            if (i < sorted.length) {
                fuel.offer(sorted[i][1]);
                previous = sorted[i][0];
            }
        }
        return stops;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[][] stations = new int[n][2];
        for (int i = 0; i < n; i++) {
            stations[i][0] = fs.nextInt();
            stations[i][1] = fs.nextInt();
        }
        int target = fs.nextInt();
        int startFuel = fs.nextInt();

        System.out.println(minRefuelStops(target, startFuel, stations));
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
# Minimum Number of Refueling Stops — LeetCode 871

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Greedy · Max-heap simulation |
| **Interview heat** | ★★★☆☆ |
| **Asked at** | Amazon, Google, Meta, Uber |

## Problem Statement

A car has to travel \`target\` miles east. It starts with \`startFuel\` litres in an
unlimited tank and burns exactly one litre per mile. Station \`i\` sits \`distance[i]\`
miles from the start and offers \`fuel[i]\` litres.

- Refuelling at a station takes the **whole** offer and counts as one stop.
- The car may refuel at a station it reaches with exactly \`0\` litres left.
- Reaching the target with \`0\` litres left counts as success.

Return the **minimum** number of stops, or \`-1\` when the target is unreachable.

## Input Format

The program reads from standard input:

\`\`\`
n
distance[0] fuel[0]
distance[1] fuel[1]
...
distance[n-1] fuel[n-1]
target
startFuel
\`\`\`

- \`n\` — number of stations (0 ≤ n ≤ 10⁴)
- \`distance\` — distance of each station from the start (given as \`distance fuel\` pairs, in ascending distance)
- \`fuel\` — litres offered by each station
- \`target\` — distance of the destination
- \`startFuel\` — litres in the tank at the start

## Sample Input

\`\`\`
4
10 60
20 30
30 30
60 40
100
10
\`\`\`

## Expected Output

\`\`\`
2
\`\`\`

Stop at the station at mile 10 (60 litres) and at the station at mile 60 (40 litres);
the car then covers the remaining 40 miles.

## Approach — retroactively refuel at the best station passed

Drive east and remember every station you passed in a **max-heap** of fuel amounts.
When the tank would go negative:

- pop the station with the **most** fuel, add it to the tank and count one stop;
- repeat while the tank is still negative.

If the heap runs dry and the tank is still negative, the target is unreachable.

The trick is that the decision is made *retroactively*: the algorithm does not have to
decide at the station whether it will be useful later.

**Exchange argument (why the greedy choice is safe):** suppose the car runs dry and we
must pick one of the stations already passed. Every such station is *behind* the car,
so stopping at it later is physically possible — the choice only decides *when* the
fuel is collected. Let \`f\` be the largest fuel amount among the passed stations.
Compare it with any other candidate \`f' ≤ f\`: choosing \`f\` gives at least as much fuel
for the same one stop, so the car can reach at least as far. Since the tank is
unlimited, extra fuel is never wasted. Therefore picking the largest offer dominates
every other single choice, and repeating this argument gives the minimum number of
stops.

## Dry Run

Input: \`target = 100\`, \`startFuel = 10\`, stations \`[(10,60), (20,30), (30,30), (60,40)]\`

| Step | Checkpoint | Distance driven | \`tank\` after driving | max-heap before | Action | \`tank\` after | stops |
|---:|---|---:|---:|---|---|---:|---:|
| 1 | mile 10 | 10 | \`10 - 10 = 0\` | \`{}\` | tank ≥ 0, push \`60\` | 0 | 0 |
| 2 | mile 20 | 10 | \`0 - 10 = -10\` | \`{60}\` | pop \`60\` → \`-10 + 60 = 50\` | 50 | 1 |
| 3 | mile 30 | 10 | \`50 - 10 = 40\` | \`{30}\` | tank ≥ 0, push \`30\` | 40 | 1 |
| 4 | mile 60 | 30 | \`40 - 30 = 10\` | \`{30, 30}\` | tank ≥ 0, push \`40\` | 10 | 1 |
| 5 | mile 100 (target) | 40 | \`10 - 40 = -30\` | \`{40, 30, 30}\` | pop \`40\` → \`-30 + 40 = 10\` | 10 | 2 |

The tank is non-negative from mile 100 onwards → **2** stops.

### Trace where it is impossible — \`target = 100\`, \`startFuel = 1\`, stations \`[(10, 100)]\`

| Step | Checkpoint | \`tank\` after driving | max-heap | Action | Result |
|---:|---|---:|---|---|---|
| 1 | mile 10 | \`1 - 10 = -9\` | \`{}\` | heap is empty, tank still negative | **-1** |

## Java Solution

See [\`MinimumNumberOfRefuelingStops.java\`](./MinimumNumberOfRefuelingStops.java).

\`\`\`java
public static int minRefuelStops(int target, int startFuel, int[][] stations) {
    int[][] sorted = stations.clone();
    Arrays.sort(sorted, (a, b) -> Integer.compare(a[0], b[0]));

    PriorityQueue<Integer> fuel = new PriorityQueue<>((a, b) -> b - a);   // max-heap
    int stops = 0;
    int previous = 0;
    int tank = startFuel;
    for (int i = 0; i <= sorted.length; i++) {
        int position = (i < sorted.length) ? sorted[i][0] : target;
        tank -= position - previous;
        while (tank < 0 && !fuel.isEmpty()) {
            tank += fuel.poll();
            stops++;
        }
        if (tank < 0) {
            return -1;
        }
        if (i < sorted.length) {
            fuel.offer(sorted[i][1]);
            previous = sorted[i][0];
        }
    }
    return stops;
}
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n log n) | every station is pushed once and popped at most once |
| **Space** | O(n) | the heap can hold every station |

## Interview Notes

**Follow-ups to raise yourself:**
- *"What if a station only lets you take part of its fuel?"* → the heap becomes a
  different structure (you may need to split an offer across several stops).
- *"What if the tank has a capacity limit?"* → extra fuel can be wasted; the greedy
  argument has to be redone and a DP over \`(station, fuel)\` is the safe answer.
- *"Can you print the stations you stopped at?"* → remember the pair
  \`(distance, fuel)\` in the heap instead of only the fuel amount.

**Common mistakes:**
- ❌ Using a **min**-heap for the fuel — that picks the *smallest* offer and gives a
  worse answer. In Java use \`(a, b) -> b - a\`.
- ❌ Refuelling eagerly at every station — that is not minimal; only refuel when the
  tank would otherwise go negative.
- ❌ Forgetting to treat the target as a checkpoint — you must check that the last
  stretch to the destination is covered too.
- ❌ Adding a station's fuel to the heap **before** checking that the station is
  reachable — you cannot use fuel you never reached.

**How to narrate:**
> "I drive east and keep every station I pass in a max-heap. I only refuel when the
> tank would go negative, and then I retroactively take the station with the most
> fuel. That is optimal because all the candidate stations are already behind me and
> the tank is unlimited, so the biggest offer always gets me at least as far for the
> same single stop."

## Related Problems

- [Maximum Units on a Truck](./MaximumUnitsOnATruck.md) — greedy over a heap of values
- [Coin Change with Greedy](./GreedyCoinChange.md) — the other classic "largest first" greedy
`,i=[`minRefuelStops`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};