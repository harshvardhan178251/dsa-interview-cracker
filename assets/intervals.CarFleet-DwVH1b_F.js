var e=`intervals.CarFleet`,t=`package com.dsa.intervals;

import com.dsa.utils.FastScanner;

import java.util.Arrays;

/**
 * Problem: Car Fleet
 * LeetCode: 1491 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Greedy, Fleet time from the back
 *
 * <p>Problem:
 * {@code n} cars drive towards a target at position {@code target}. Car {@code i} starts
 * at {@code position[i]} and drives at {@code speed[i]}. A car that catches up with the
 * car in front of it joins its fleet and can never go faster than that fleet. Return
 * the number of fleets that reach the target.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * position[0] speed[0]
 * position[1] speed[1]
 * ...
 * position[n-1] speed[n-1]
 * target
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 4
 * 0 4
 * 2 2
 * 4 1
 * 6 3
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 3
 * </pre>
 *
 * <p>Approach: process the cars from the one closest to the target backwards. The
 * arrival time of a car is {@code (target - position) / speed}. If a car would arrive
 * later than the fleet in front of it, it catches up and joins that fleet; if it would
 * arrive earlier it forms a new fleet that the cars behind have to catch.
 *
 * <p>Complexity: Time O(n log n), Space O(n).
 */
public class CarFleet {

    /**
     * Returns the number of fleets that reach the target.
     *
     * @param target    position of the target
     * @param positions start position of every car
     * @param speeds    speed of every car
     * @return the number of fleets
     */
    public static int carFleet(int target, int[] positions, int[] speeds) {
        if (positions == null || speeds == null || positions.length == 0
                || positions.length != speeds.length) {
            return 0;
        }
        int n = positions.length;
        Integer[] order = new Integer[n];
        for (int i = 0; i < n; i++) {
            order[i] = i;
        }
        // closest to the target first
        Arrays.sort(order, (a, b) -> Integer.compare(positions[b], positions[a]));

        int fleets = 0;
        double fleetTime = 0;   // arrival time of the fleet directly ahead
        for (int i : order) {
            double time = (double) (target - positions[i]) / speeds[i];
            if (time > fleetTime) {
                fleets++;            // this car is slower, it starts a new fleet
                fleetTime = time;
            }
            // otherwise it catches up with the fleet ahead and joins it
        }
        return fleets;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] positions = new int[n];
        int[] speeds = new int[n];
        for (int i = 0; i < n; i++) {
            positions[i] = fs.nextInt();
            speeds[i] = fs.nextInt();
        }
        int target = fs.nextInt();

        System.out.println(carFleet(target, positions, speeds));
    }
}
`,n=`import java.util.Arrays;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

/**
 * Problem: Car Fleet
 * LeetCode: 1491 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Greedy, Fleet time from the back
 *
 * <p>Problem:
 * {@code n} cars drive towards a target at position {@code target}. Car {@code i} starts
 * at {@code position[i]} and drives at {@code speed[i]}. A car that catches up with the
 * car in front of it joins its fleet and can never go faster than that fleet. Return
 * the number of fleets that reach the target.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * position[0] speed[0]
 * position[1] speed[1]
 * ...
 * position[n-1] speed[n-1]
 * target
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 4
 * 0 4
 * 2 2
 * 4 1
 * 6 3
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 3
 * </pre>
 *
 * <p>Approach: process the cars from the one closest to the target backwards. The
 * arrival time of a car is {@code (target - position) / speed}. If a car would arrive
 * later than the fleet in front of it, it catches up and joins that fleet; if it would
 * arrive earlier it forms a new fleet that the cars behind have to catch.
 *
 * <p>Complexity: Time O(n log n), Space O(n).
 */
public class Main {

    /**
     * Returns the number of fleets that reach the target.
     *
     * @param target    position of the target
     * @param positions start position of every car
     * @param speeds    speed of every car
     * @return the number of fleets
     */
    public static int carFleet(int target, int[] positions, int[] speeds) {
        if (positions == null || speeds == null || positions.length == 0
                || positions.length != speeds.length) {
            return 0;
        }
        int n = positions.length;
        Integer[] order = new Integer[n];
        for (int i = 0; i < n; i++) {
            order[i] = i;
        }
        // closest to the target first
        Arrays.sort(order, (a, b) -> Integer.compare(positions[b], positions[a]));

        int fleets = 0;
        double fleetTime = 0;   // arrival time of the fleet directly ahead
        for (int i : order) {
            double time = (double) (target - positions[i]) / speeds[i];
            if (time > fleetTime) {
                fleets++;            // this car is slower, it starts a new fleet
                fleetTime = time;
            }
            // otherwise it catches up with the fleet ahead and joins it
        }
        return fleets;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] positions = new int[n];
        int[] speeds = new int[n];
        for (int i = 0; i < n; i++) {
            positions[i] = fs.nextInt();
            speeds[i] = fs.nextInt();
        }
        int target = fs.nextInt();

        System.out.println(carFleet(target, positions, speeds));
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
# Car Fleet — LeetCode 1491

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Greedy · Fleet time from the back |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Uber, Bloomberg |

## Problem Statement

\`n\` cars drive towards a target at position \`target\`. Car \`i\` starts at \`position[i]\`
and drives at \`speed[i]\`. A car that catches up with the car in front of it joins its
fleet and can never go faster than that fleet. Return the number of fleets that reach
the target.

- The cars are given in **descending** order of position (the car closest to the
  target first); the solution sorts them anyway.
- Reaching the target exactly counts as arriving.

## Input Format

The program reads from standard input:

\`\`\`
n
position[0] speed[0]
position[1] speed[1]
...
position[n-1] speed[n-1]
target
\`\`\`

- \`n\` — number of cars (1 ≤ n ≤ 10⁵)
- \`position\` — start position of each car
- \`speed\` — speed of each car (positive)
- \`target\` — the position of the destination

## Sample Input

\`\`\`
5
10 2
8 4
0 1
3 1
0 1
12
\`\`\`

## Expected Output

\`\`\`
3
\`\`\`

- **Fleet 1** — the car at position \`10\` (speed 2) arrives at time \`1\`; the car at
  position \`8\` (speed 4) would arrive at time \`1\` as well, so it catches up and joins
  that fleet.
- **Fleet 2** — the car at position \`3\` (speed 1) arrives at time \`9\`.
- **Fleet 3** — the two cars at position \`0\` (speed 1) arrive at time \`12\`.

## Approach — process the cars from the front backwards

Sort the cars by position **descending** (closest to the target first) and walk
through them. Keep \`fleetTime\`, the arrival time of the fleet directly ahead.

For a car with arrival time \`t = (target - position) / speed\`:

- if \`t > fleetTime\`, the car is slower than the fleet ahead: it catches up and
  joins that fleet → no new fleet;
- if \`t <= fleetTime\`, the car would arrive **before** the fleet ahead, so it slows
  down and becomes the leader of a **new fleet** → \`fleets++\` and
  \`fleetTime = t\`.

**Exchange argument (why the greedy choice is safe):** the fleet ahead of a car is
already decided — its members cannot go faster than the slowest car in it. A car
whose own arrival time is **later** than the fleet's time catches up before the
target and therefore joins it; this is forced, because it cannot overtake. A car
whose own arrival time is **earlier** would arrive before the fleet ahead, so it
must become a new fleet leader — and it *is* the leader of a new fleet, because it
arrives first among all the cars behind it (the cars behind it are even further
away, so they can only arrive later if they do not catch it). Both branches are
forced by the physics of the situation, so the greedy classification of every car is
correct and the number of fleets is exact.

## Dry Run

Input: cars \`(10,2)\`, \`(8,4)\`, \`(0,1)\`, \`(3,1)\`, \`(0,1)\`, \`target = 12\`

Sorted by position descending: \`(10,2)\`, \`(8,4)\`, \`(3,1)\`, \`(0,1)\`, \`(0,1)\`

| Step | car | arrival time \`(12-pos)/speed\` | \`fleetTime\` before | \`t > fleetTime\`? | action | fleets | \`fleetTime\` after |
|---:|---|---:|---:|---|---|---:|---:|
| 1 | \`(10,2)\` | \`(12-10)/2 = 1.000\` | 0 | yes | new fleet | 1 | 1.000 |
| 2 | \`(8,4)\` | \`(12-8)/4 = 1.000\` | 1.000 | no (\`1.0 > 1.0\` is false) | joins fleet 1 | 1 | 1.000 |
| 3 | \`(3,1)\` | \`(12-3)/1 = 9.000\` | 1.000 | yes | new fleet | 2 | 9.000 |
| 4 | \`(0,1)\` | \`(12-0)/1 = 12.000\` | 9.000 | yes | new fleet | 3 | 12.000 |
| 5 | \`(0,1)\` | \`(12-0)/1 = 12.000\` | 12.000 | no | joins fleet 3 | 3 | 12.000 |

Answer: **3** fleets.

## Java Solution

See [\`CarFleet.java\`](./CarFleet.java).

\`\`\`java
public static int carFleet(int target, int[] positions, int[] speeds) {
    Integer[] order = new Integer[positions.length];
    for (int i = 0; i < positions.length; i++) {
        order[i] = i;
    }
    Arrays.sort(order, (a, b) -> Integer.compare(positions[b], positions[a]));

    int fleets = 0;
    double fleetTime = 0;
    for (int i : order) {
        double time = (double) (target - positions[i]) / speeds[i];
        if (time > fleetTime) {
            fleets++;
            fleetTime = time;
        }
    }
    return fleets;
}
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n log n) | one sort plus a linear scan |
| **Space** | O(n) | the index array that carries the sort order |

## Interview Notes

**Follow-ups to raise yourself:**
- *"Return the fleets themselves."* → group the cars by the fleet leader they join.
- *"What if the cars can change lanes?"* → the model changes completely; then it is a
  traffic simulation problem.
- *"What if the target is at position 0?"* → every car is already there; the answer is
  the number of cars.

**Common mistakes:**
- ❌ Comparing the cars in the wrong direction — you must start with the car **closest
  to the target**, otherwise you do not know the fleet's arrival time yet.
- ❌ Using \`>=\` instead of \`>\` — a car that arrives at exactly the same time as the
  fleet ahead joins it, it does not start a new fleet.
- ❌ Comparing the times as integers — use \`double\`, otherwise \`1/3\` rounds to \`0\` and
  the fleet boundaries come out wrong.

**How to narrate:**
> "I sort the cars by position, closest to the target first, and keep the arrival time
> of the fleet directly ahead. A car that would arrive later catches up and joins that
> fleet; a car that would arrive earlier becomes the leader of a new fleet. Both
> outcomes are forced by the physics, so the count of new leaders is the number of
> fleets."

## Related Problems

- [Meeting Rooms II](./MeetingRoomsII.md) — grouping by overlapping time spans
- [Meeting Rooms III](./MeetingRoomsIII.md) — another "group by time" sweep
`,i=[`carFleet`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};