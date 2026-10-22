var e=`intervals.MeetingRooms`,t=`package com.dsa.intervals;

import com.dsa.utils.FastScanner;
import com.dsa.utils.Interval;

import java.util.ArrayList;
import java.util.List;

/**
 * Problem: Meeting Rooms
 * LeetCode: 862 | Difficulty: Easy | Frequency: 4/5
 * Pattern: Sorting, Overlap detection
 *
 * <p>Problem:
 * Given the time spans of several meetings, decide whether a person could have attended
 * all of them. Intervals are half-open, {@code [start, end)}, so a meeting that ends
 * exactly when the next one begins does not conflict.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * start[0] end[0]
 * start[1] end[1]
 * ...
 * start[n-1] end[n-1]
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 3
 * 0 30
 * 5 10
 * 15 20
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * false
 * </pre>
 *
 * <p>Approach: sort the meetings by start time. In a sorted list two intervals can
 * only overlap when they are neighbours, so one pass over the list is enough.
 *
 * <p>Complexity: Time O(n log n), Space O(n).
 */
public class MeetingRooms {

    /**
     * Returns whether no two meetings overlap.
     *
     * @param meetings the meeting time spans
     * @return {@code true} when all meetings can be attended
     */
    public static boolean canAttendAll(List<Interval> meetings) {
        if (meetings == null || meetings.size() <= 1) {
            return true;
        }
        List<Interval> sorted = new ArrayList<>(meetings);
        sorted.sort(null);   // natural order: start first, then end
        for (int i = 1; i < sorted.size(); i++) {
            if (sorted.get(i).start < sorted.get(i - 1).end) {
                return false;
            }
        }
        return true;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        List<Interval> meetings = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            int start = fs.nextInt();
            int end = fs.nextInt();
            meetings.add(new Interval(start, end));
        }

        System.out.println(canAttendAll(meetings) ? "true" : "false");
    }
}
`,n=`import java.util.ArrayList;
import java.util.List;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

/**
 * Problem: Meeting Rooms
 * LeetCode: 862 | Difficulty: Easy | Frequency: 4/5
 * Pattern: Sorting, Overlap detection
 *
 * <p>Problem:
 * Given the time spans of several meetings, decide whether a person could have attended
 * all of them. Intervals are half-open, {@code [start, end)}, so a meeting that ends
 * exactly when the next one begins does not conflict.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * start[0] end[0]
 * start[1] end[1]
 * ...
 * start[n-1] end[n-1]
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 3
 * 0 30
 * 5 10
 * 15 20
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * false
 * </pre>
 *
 * <p>Approach: sort the meetings by start time. In a sorted list two intervals can
 * only overlap when they are neighbours, so one pass over the list is enough.
 *
 * <p>Complexity: Time O(n log n), Space O(n).
 */
public class Main {

    /**
     * Returns whether no two meetings overlap.
     *
     * @param meetings the meeting time spans
     * @return {@code true} when all meetings can be attended
     */
    public static boolean canAttendAll(List<Interval> meetings) {
        if (meetings == null || meetings.size() <= 1) {
            return true;
        }
        List<Interval> sorted = new ArrayList<>(meetings);
        sorted.sort(null);   // natural order: start first, then end
        for (int i = 1; i < sorted.size(); i++) {
            if (sorted.get(i).start < sorted.get(i - 1).end) {
                return false;
            }
        }
        return true;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        List<Interval> meetings = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            int start = fs.nextInt();
            int end = fs.nextInt();
            meetings.add(new Interval(start, end));
        }

        System.out.println(canAttendAll(meetings) ? "true" : "false");
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

// ---------- inlined com.dsa.utils.Interval ----------
/**
 * Half-open interval {@code [start, end)} used by the interval problems.
 */
class Interval implements Comparable<Interval> {

    public int start;
    public int end;

    public Interval(int start, int end) {
        this.start = start;
        this.end = end;
    }

    public int length() {
        return end - start;
    }

    /** True when the two intervals overlap (touching endpoints do not overlap). */
    public boolean overlaps(Interval other) {
        return start < other.end && other.start < end;
    }

    @Override
    public int compareTo(Interval o) {
        int byStart = Integer.compare(start, o.start);
        return byStart != 0 ? byStart : Integer.compare(end, o.end);
    }

    @Override
    public String toString() {
        return "[" + start + ", " + end + ")";
    }
}
`,r=`
# Meeting Rooms — LeetCode 862

| | |
|---|---|
| **Difficulty** | Easy |
| **Pattern** | Sorting · Overlap detection |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Uber, Airbnb |

## Problem Statement

Given the time spans of several meetings, decide whether a single person could have
attended **all** of them.

> **Convention.** Intervals are half-open, \`[start, end)\`. A meeting that ends exactly
> when the next one begins does **not** conflict.

## Input Format

The program reads from standard input:

\`\`\`
n
start[0] end[0]
start[1] end[1]
...
start[n-1] end[n-1]
\`\`\`

- \`n\` — number of meetings (0 ≤ n ≤ 10⁵)
- \`start\` / \`end\` — the time span of each meeting, one meeting per line

## Sample Input

\`\`\`
3
0 30
5 10
15 20
\`\`\`

## Expected Output

\`\`\`
false
\`\`\`

The meeting \`[0, 30)\` overlaps both other meetings.

## Approach — sort by start, compare neighbours

Sort the meetings by start time. In a sorted list, if any two meetings overlap then
some **pair of neighbours** overlaps as well: the interval that starts first also ends
first among the overlapping ones, so the conflict shows up between two consecutive
meetings.

That reduces the question to a single scan comparing each meeting with the one before
it.

**Exchange argument (why the neighbour test is complete):** suppose meetings \`i\` and
\`j\` (\`i < j\` in sorted order) overlap, i.e. \`start[j] < end[i]\`. Since the meetings
are sorted by start time, every meeting \`k\` with \`i < k <= j\` starts no later than
\`start[j] < end[i]\`, and no meeting ends before it started (the list is valid), so
\`end[k] > start[k] >= start[i]\`. Hence \`k\` overlaps meeting \`i\` as well — and
\`i\` and \`k\` are neighbours. So every conflict is visible between neighbours and the
single scan cannot miss one.

## Dry Run

Input: \`[(0,30), (5,10), (15,20)]\`

After sorting by start: \`[(0,30), (5,10), (15,20)]\`

| Step | i | meeting | previous meeting | overlap test | result |
|---:|---:|---|---|---|---|
| 1 | 1 | \`(5,10)\` | \`(0,30)\` | \`5 < 30\` → **overlap** | **false** |

The scan stops at the first conflict.

### Trace where nothing conflicts — \`[(1,2), (2,3), (3,4)]\`

| Step | i | meeting | previous | overlap test | result |
|---:|---:|---|---|---|---|
| 1 | 1 | \`(2,3)\` | \`(1,2)\` | \`2 < 2\`? no | continue |
| 2 | 2 | \`(3,4)\` | \`(2,3)\` | \`3 < 3\`? no | continue |

No conflict → **true** (the meetings only touch, which is allowed with half-open
intervals).

## Java Solution

See [\`MeetingRooms.java\`](./MeetingRooms.java).

\`\`\`java
public static boolean canAttendAll(List<Interval> meetings) {
    if (meetings == null || meetings.size() <= 1) {
        return true;
    }
    List<Interval> sorted = new ArrayList<>(meetings);
    sorted.sort(null);
    for (int i = 1; i < sorted.size(); i++) {
        if (sorted.get(i).start < sorted.get(i - 1).end) {
            return false;
        }
    }
    return true;
}
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n log n) | the sort dominates |
| **Space** | O(n) | the sorted copy of the list |

## Interview Notes

**Follow-ups to raise yourself:**
- *"What is the minimum number of rooms needed?"* → [Meeting Rooms II](./MeetingRoomsII.md).
- *"Which pair overlaps?"* → return the conflicting pair instead of a boolean.
- *"What if the meetings are given as start/end pairs in an unsorted list?"* → sort
  first; the algorithm is unchanged.

**Common mistakes:**
- ❌ Comparing with \`<=\` instead of \`<\` — with half-open intervals touching meetings
  are compatible.
- ❌ Checking only the first and the last meeting — the conflict can be in the middle.
- ❌ Mutating the caller's list when sorting — copy it first.

**How to narrate:**
> "I sort the meetings by start time. In a sorted list any overlap shows up between
> two neighbouring meetings, because the meeting that starts first also ends first.
> So I scan once and compare each meeting with its predecessor — O(n log n) for the
> sort, O(n) for the scan."

## Related Problems

- [Meeting Rooms II](./MeetingRoomsII.md) — how many rooms are needed
- [Merge Intervals](./MergeIntervals.md) — the same sort, different sweep
- [Non-overlapping Intervals](./NonOverlappingIntervals.md) — how many can be kept
`,i=[`canAttendAll`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};