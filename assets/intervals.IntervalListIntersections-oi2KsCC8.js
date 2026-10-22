var e=`intervals.IntervalListIntersections`,t=`package com.dsa.intervals;

import com.dsa.utils.FastScanner;
import com.dsa.utils.Interval;

import java.util.ArrayList;
import java.util.List;

/**
 * Problem: Interval List Intersections
 * LeetCode: 986 | Difficulty: Medium | Frequency: 3/5
 * Pattern: Two pointers, Sorted sweep
 *
 * <p>Problem:
 * Given two lists of sorted, disjoint intervals, return the intersections of the two
 * lists. Intervals are half-open, {@code [start, end)}, so touching intervals have an
 * empty intersection.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * start[0] end[0]
 * ...
 * start[n-1] end[n-1]
 * m
 * start[0] end[0]
 * ...
 * start[m-1] end[m-1]
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 3
 * 0 2
 * 5 10
 * 13 23
 * 3
 * 1 5
 * 8 12
 * 15 24
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 1 2
 * 8 10
 * 15 23
 * </pre>
 *
 * <p>Approach: two pointers. The next candidate intersection always starts at the
 * larger of the two start values and ends at the smaller of the two end values. If that
 * range is not empty it is an intersection; then the interval that ends first can
 * never overlap anything later in the other list, so advance that pointer.
 *
 * <p>Complexity: Time O(n + m), Space O(n + m).
 */
public class IntervalListIntersections {

    /**
     * Returns every intersection between the two lists.
     *
     * @param first  sorted, disjoint intervals
     * @param second sorted, disjoint intervals
     * @return the intersections, ordered by start time
     */
    public static List<Interval> intersect(List<Interval> first, List<Interval> second) {
        List<Interval> result = new ArrayList<>();
        if (first == null || second == null) {
            return result;
        }
        int i = 0;
        int j = 0;
        while (i < first.size() && j < second.size()) {
            Interval a = first.get(i);
            Interval b = second.get(j);

            int start = Math.max(a.start, b.start);
            int end = Math.min(a.end, b.end);
            if (start < end) {
                result.add(new Interval(start, end));
            }

            if (a.end < b.end) {
                i++;
            } else {
                j++;
            }
        }
        return result;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        List<Interval> first = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            int start = fs.nextInt();
            int end = fs.nextInt();
            first.add(new Interval(start, end));
        }
        int m = fs.nextInt();
        List<Interval> second = new ArrayList<>();
        for (int i = 0; i < m; i++) {
            int start = fs.nextInt();
            int end = fs.nextInt();
            second.add(new Interval(start, end));
        }

        for (Interval interval : intersect(first, second)) {
            System.out.println(interval.start + " " + interval.end);
        }
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
 * Problem: Interval List Intersections
 * LeetCode: 986 | Difficulty: Medium | Frequency: 3/5
 * Pattern: Two pointers, Sorted sweep
 *
 * <p>Problem:
 * Given two lists of sorted, disjoint intervals, return the intersections of the two
 * lists. Intervals are half-open, {@code [start, end)}, so touching intervals have an
 * empty intersection.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * start[0] end[0]
 * ...
 * start[n-1] end[n-1]
 * m
 * start[0] end[0]
 * ...
 * start[m-1] end[m-1]
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 3
 * 0 2
 * 5 10
 * 13 23
 * 3
 * 1 5
 * 8 12
 * 15 24
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 1 2
 * 8 10
 * 15 23
 * </pre>
 *
 * <p>Approach: two pointers. The next candidate intersection always starts at the
 * larger of the two start values and ends at the smaller of the two end values. If that
 * range is not empty it is an intersection; then the interval that ends first can
 * never overlap anything later in the other list, so advance that pointer.
 *
 * <p>Complexity: Time O(n + m), Space O(n + m).
 */
public class Main {

    /**
     * Returns every intersection between the two lists.
     *
     * @param first  sorted, disjoint intervals
     * @param second sorted, disjoint intervals
     * @return the intersections, ordered by start time
     */
    public static List<Interval> intersect(List<Interval> first, List<Interval> second) {
        List<Interval> result = new ArrayList<>();
        if (first == null || second == null) {
            return result;
        }
        int i = 0;
        int j = 0;
        while (i < first.size() && j < second.size()) {
            Interval a = first.get(i);
            Interval b = second.get(j);

            int start = Math.max(a.start, b.start);
            int end = Math.min(a.end, b.end);
            if (start < end) {
                result.add(new Interval(start, end));
            }

            if (a.end < b.end) {
                i++;
            } else {
                j++;
            }
        }
        return result;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        List<Interval> first = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            int start = fs.nextInt();
            int end = fs.nextInt();
            first.add(new Interval(start, end));
        }
        int m = fs.nextInt();
        List<Interval> second = new ArrayList<>();
        for (int i = 0; i < m; i++) {
            int start = fs.nextInt();
            int end = fs.nextInt();
            second.add(new Interval(start, end));
        }

        for (Interval interval : intersect(first, second)) {
            System.out.println(interval.start + " " + interval.end);
        }
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
# Interval List Intersections — LeetCode 986

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Two pointers · Sorted sweep |
| **Interview heat** | ★★★☆☆ |
| **Asked at** | Amazon, Google, Meta |

## Problem Statement

Given two lists of sorted, mutually disjoint intervals, return the **intersections**
of the two lists — every interval that appears in both.

> **Convention.** Intervals are half-open, \`[start, end)\`. Two intervals that only
> touch (\`a.end == b.start\`) have an **empty** intersection and are not reported.

## Input Format

The program reads from standard input:

\`\`\`
n
start[0] end[0]
...
start[n-1] end[n-1]
m
start[0] end[0]
...
start[m-1] end[m-1]
\`\`\`

- \`n\` — number of intervals in the first list
- \`m\` — number of intervals in the second list
- the two lists are sorted and internally disjoint

## Sample Input

\`\`\`
3
0 2
5 10
13 23
3
1 5
8 12
15 24
\`\`\`

## Expected Output

\`\`\`
1 2
8 10
15 23
\`\`\`

## Approach — two pointers

Because both lists are sorted, the next candidate intersection always starts at the
**larger** start value and ends at the **smaller** end value:

\`\`\`
start = max(a.start, b.start)
end   = min(a.end,   b.end)
\`\`\`

If \`start < end\` the intersection is non-empty and is reported.

Then advance the pointer of the interval that **ends first**: that interval can never
overlap anything later in the other list, because all later intervals start even
further right.

**Exchange argument (why advancing the earlier-ending interval is safe):** suppose
\`a.end <= b.end\`. The current intersection is completely determined by \`a\` and \`b\`.
Any interval of the second list that comes after \`b\` starts at or after \`b.end\`
(sorting) and therefore at or after \`a.end\`, so it cannot overlap \`a\` at all — \`a\` is
finished for good and can be dropped. Symmetrically when \`b.end <= a.end\`. Dropping the
earlier-ending interval therefore never removes a possible intersection, and the
scan produces every intersection exactly once.

## Dry Run

Input: first \`[(0,2), (5,10), (13,23)]\`, second \`[(1,5), (8,12), (15,24)]\`

| Step | i | j | \`a\` | \`b\` | \`start = max\` | \`end = min\` | non-empty? | result | advance |
|---:|---:|---:|---|---|---:|---:|---|---|---|
| 1 | 0 | 0 | \`(0,2)\` | \`(1,5)\` | 1 | 2 | \`1 < 2\` ✓ | \`[1,2]\` | \`a.end=2 <= b.end=5\` → i++ |
| 2 | 1 | 0 | \`(5,10)\` | \`(1,5)\` | 5 | 5 | \`5 < 5\`? no | — | \`b.end=5 <= a.end=10\` → j++ |
| 3 | 1 | 1 | \`(5,10)\` | \`(8,12)\` | 8 | 10 | \`8 < 10\` ✓ | \`[8,10]\` | \`a.end=10 <= b.end=12\` → i++ |
| 4 | 2 | 1 | \`(13,23)\` | \`(8,12)\` | 13 | 12 | \`13 < 12\`? no | — | \`b.end=12 <= a.end=23\` → j++ |
| 5 | 2 | 2 | \`(13,23)\` | \`(15,24)\` | 15 | 23 | \`15 < 23\` ✓ | \`[15,23]\` | \`a.end=23 <= b.end=24\` → i++ |
| 6 | 3 | 2 | — | — | — | — | — | — | \`i == 3\` → stop |

Result: \`[1,2]\`, \`[8,10]\`, \`[15,23]\` ✓

## Java Solution

See [\`IntervalListIntersections.java\`](./IntervalListIntersections.java).

\`\`\`java
public static List<Interval> intersect(List<Interval> first, List<Interval> second) {
    List<Interval> result = new ArrayList<>();
    int i = 0;
    int j = 0;
    while (i < first.size() && j < second.size()) {
        Interval a = first.get(i);
        Interval b = second.get(j);

        int start = Math.max(a.start, b.start);
        int end = Math.min(a.end, b.end);
        if (start < end) {
            result.add(new Interval(start, end));
        }

        if (a.end < b.end) {
            i++;
        } else {
            j++;
        }
    }
    return result;
}
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n + m) | every pointer only moves forward |
| **Space** | O(n + m) | the result list (O(1) auxiliary space) |

## Interview Notes

**Follow-ups to raise yourself:**
- *"What if the lists are not sorted?"* → sort both, then the same two-pointer sweep.
- *"What if the intervals are closed (\`[start, end]\`)"* → the intersection test becomes
  \`start <= end\` and the touching case produces a zero-length interval — LeetCode's
  own example does exactly that.
- *"What if you only need the total length of the intersections?"* → sum
  \`end - start\` instead of storing the intervals.

**Common mistakes:**
- ❌ Using \`start <= end\` — with half-open intervals that reports the empty
  intersection of two touching intervals.
- ❌ Advancing both pointers — one intersection can involve one interval from each
  list only, so exactly one pointer moves per step.
- ❌ Assuming the two lists have the same length.

**How to narrate:**
> "Both lists are sorted, so I walk them with two pointers. The intersection of the
> current pair starts at the larger start and ends at the smaller end. Then I advance
> the pointer of the interval that ends first, because everything after it in the
> other list starts too late to overlap it — that way I never miss an intersection."

## Related Problems

- [Merge Intervals](./MergeIntervals.md) — the other classic interval sweep
- [Insert Interval](./InsertInterval.md) — a specialised two-pointer merge
`,i=[`intersect`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};