var e=`intervals.InsertInterval`,t=`package com.dsa.intervals;

import com.dsa.utils.FastScanner;
import com.dsa.utils.Interval;

import java.util.ArrayList;
import java.util.List;

/**
 * Problem: Insert Interval
 * LeetCode: 57 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Sorting, Three-way sweep
 *
 * <p>Problem:
 * Given a list of non-overlapping, sorted intervals and one new interval, insert the new
 * interval and merge it with every interval it overlaps. Intervals are half-open,
 * {@code [start, end)}.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * start[0] end[0]
 * start[1] end[1]
 * ...
 * start[n-1] end[n-1]
 * newStart newEnd
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 3
 * 1 3
 * 6 9
 * 12 15
 * 4 5
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 1 3
 * 4 5
 * 6 9
 * 12 15
 * </pre>
 *
 * <p>Approach: the list is already sorted, so the new interval splits it into three
 * parts — intervals that end before the new one starts, the intervals the new one
 * overlaps (which all merge into it), and the intervals that start after it. Only the
 * middle part has to be scanned to find the new end.
 *
 * <p>Complexity: Time O(n), Space O(n).
 */
public class InsertInterval {

    /**
     * Inserts {@code newInterval} into the sorted list and merges the overlaps.
     *
     * @param intervals   sorted, non-overlapping intervals
     * @param newInterval the interval to insert
     * @return the merged list
     */
    public static List<Interval> insert(List<Interval> intervals, Interval newInterval) {
        List<Interval> result = new ArrayList<>();
        if (intervals == null || intervals.isEmpty()) {
            if (newInterval != null) {
                result.add(new Interval(newInterval.start, newInterval.end));
            }
            return result;
        }
        if (newInterval == null) {
            result.addAll(intervals);
            return result;
        }

        int i = 0;
        int n = intervals.size();
        while (i < n && intervals.get(i).end <= newInterval.start) {
            result.add(new Interval(intervals.get(i).start, intervals.get(i).end));
            i++;
        }
        int start = newInterval.start;
        int end = newInterval.end;
        while (i < n && intervals.get(i).start < end) {
            start = Math.min(start, intervals.get(i).start);
            end = Math.max(end, intervals.get(i).end);
            i++;
        }
        result.add(new Interval(start, end));
        while (i < n) {
            result.add(new Interval(intervals.get(i).start, intervals.get(i).end));
            i++;
        }
        return result;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        List<Interval> intervals = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            int start = fs.nextInt();
            int end = fs.nextInt();
            intervals.add(new Interval(start, end));
        }
        int newStart = fs.nextInt();
        int newEnd = fs.nextInt();

        for (Interval interval : insert(intervals, new Interval(newStart, newEnd))) {
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
 * Problem: Insert Interval
 * LeetCode: 57 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Sorting, Three-way sweep
 *
 * <p>Problem:
 * Given a list of non-overlapping, sorted intervals and one new interval, insert the new
 * interval and merge it with every interval it overlaps. Intervals are half-open,
 * {@code [start, end)}.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * start[0] end[0]
 * start[1] end[1]
 * ...
 * start[n-1] end[n-1]
 * newStart newEnd
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 3
 * 1 3
 * 6 9
 * 12 15
 * 4 5
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 1 3
 * 4 5
 * 6 9
 * 12 15
 * </pre>
 *
 * <p>Approach: the list is already sorted, so the new interval splits it into three
 * parts — intervals that end before the new one starts, the intervals the new one
 * overlaps (which all merge into it), and the intervals that start after it. Only the
 * middle part has to be scanned to find the new end.
 *
 * <p>Complexity: Time O(n), Space O(n).
 */
public class Main {

    /**
     * Inserts {@code newInterval} into the sorted list and merges the overlaps.
     *
     * @param intervals   sorted, non-overlapping intervals
     * @param newInterval the interval to insert
     * @return the merged list
     */
    public static List<Interval> insert(List<Interval> intervals, Interval newInterval) {
        List<Interval> result = new ArrayList<>();
        if (intervals == null || intervals.isEmpty()) {
            if (newInterval != null) {
                result.add(new Interval(newInterval.start, newInterval.end));
            }
            return result;
        }
        if (newInterval == null) {
            result.addAll(intervals);
            return result;
        }

        int i = 0;
        int n = intervals.size();
        while (i < n && intervals.get(i).end <= newInterval.start) {
            result.add(new Interval(intervals.get(i).start, intervals.get(i).end));
            i++;
        }
        int start = newInterval.start;
        int end = newInterval.end;
        while (i < n && intervals.get(i).start < end) {
            start = Math.min(start, intervals.get(i).start);
            end = Math.max(end, intervals.get(i).end);
            i++;
        }
        result.add(new Interval(start, end));
        while (i < n) {
            result.add(new Interval(intervals.get(i).start, intervals.get(i).end));
            i++;
        }
        return result;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        List<Interval> intervals = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            int start = fs.nextInt();
            int end = fs.nextInt();
            intervals.add(new Interval(start, end));
        }
        int newStart = fs.nextInt();
        int newEnd = fs.nextInt();

        for (Interval interval : insert(intervals, new Interval(newStart, newEnd))) {
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
# Insert Interval — LeetCode 57

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Sorting · Three-way sweep |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Uber |

## Problem Statement

Given a list of **sorted, non-overlapping** intervals and one new interval, insert the
new interval and merge it with every interval it overlaps.

> **Convention.** Intervals are half-open, \`[start, end)\`. Touching intervals
> (\`a.end == b.start\`) do **not** overlap and stay separate.

## Input Format

The program reads from standard input:

\`\`\`
n
start[0] end[0]
start[1] end[1]
...
start[n-1] end[n-1]
newStart newEnd
\`\`\`

- \`n\` — number of existing intervals (0 ≤ n ≤ 10⁴)
- \`start\` / \`end\` — endpoints of the existing intervals, sorted and non-overlapping
- \`newStart newEnd\` — the interval to insert

## Sample Input

\`\`\`
3
1 3
6 9
12 15
4 5
\`\`\`

## Expected Output

\`\`\`
1 3
4 5
6 9
12 15
\`\`\`

The new interval \`[4, 5)\` touches nothing — it fits between \`[1, 3)\` and \`[6, 9)\`.

## Approach — three phases, one pass

Because the list is already sorted, the new interval splits it into three parts:

1. **Before** — every interval that ends at or before the new interval starts. Copy
   them unchanged.
2. **Overlapping** — every interval that starts before the new interval ends. Merge
   them all into the new interval, growing its start leftwards and its end
   rightwards.
3. **After** — everything that starts at or after the merged interval ends. Copy it
   unchanged.

Only the middle part has to be scanned, and it is scanned only once.

**Exchange argument (why the three phases are exhaustive and safe):** the intervals
are sorted and disjoint, so their end times are increasing as well. Therefore the
intervals that end before the new one starts form a prefix of the list, the intervals
that start after the new one ends form a suffix, and everything in between overlaps
the new interval. Copying the prefix is mandatory (they can never be affected), and
merging the middle part is mandatory (each of those intervals overlaps the new one,
so they must end up in one merged interval). The suffix is copied unchanged because it
starts after the merged interval ends and can therefore not overlap it. No interval
is ever dropped or duplicated.

## Dry Run

Input: \`[(1,3), (6,9), (12,15)]\`, new interval \`(4,5)\`

| Step | interval | phase test | action | result so far | new interval |
|---:|---|---|---|---|---|
| 1 | \`(1,3)\` | \`end <= new.start\` → \`3 <= 4\` ✓ → **before** | copy | \`[(1,3)]\` | \`(4,5)\` |
| 2 | \`(6,9)\` | \`start < end\` → \`6 < 5\`? no → the overlap block is empty | stop scanning | \`[(1,3)]\` | \`(4,5)\` |
| 3 | — | — | insert the (unmerged) new interval | \`[(1,3), (4,5)]\` | \`(4,5)\` |
| 4 | \`(6,9)\` | **after** — starts at or after the merged end | copy | \`[(1,3), (4,5), (6,9)]\` | \`(4,5)\` |
| 5 | \`(12,15)\` | **after** | copy | \`[(1,3), (4,5), (6,9), (12,15)]\` | \`(4,5)\` |

Result: \`1 3\`, \`4 5\`, \`6 9\`, \`12 15\` ✓

### Trace with a real merge — \`[(1,3), (6,9), (12,15)]\`, new interval \`(2,8)\`

| Step | interval | phase test | action | result so far | new interval |
|---:|---|---|---|---|---|
| 1 | \`(1,3)\` | \`3 <= 2\`? no → **overlapping** (\`1 < 8\`) | \`start = min(2,1) = 1\`, \`end = max(8,3) = 8\` | \`[]\` | \`(1,8)\` |
| 2 | \`(6,9)\` | \`6 < 8\` → **overlapping** | \`start = min(1,6) = 1\`, \`end = max(8,9) = 9\` | \`[]\` | \`(1,9)\` |
| 3 | \`(12,15)\` | \`12 < 9\`? no → **after** | stop scanning | \`[]\` | \`(1,9)\` |
| 4 | — | — | insert the merged interval | \`[(1,9)]\` | \`(1,9)\` |
| 5 | \`(12,15)\` | **after** | copy | \`[(1,9), (12,15)]\` | \`(1,9)\` |

Result: \`1 9\`, \`12 15\` ✓

## Java Solution

See [\`InsertInterval.java\`](./InsertInterval.java).

\`\`\`java
public static List<Interval> insert(List<Interval> intervals, Interval newInterval) {
    List<Interval> result = new ArrayList<>();
    int i = 0;
    int n = intervals.size();

    // 1. intervals that end before the new one starts
    while (i < n && intervals.get(i).end <= newInterval.start) {
        result.add(new Interval(intervals.get(i).start, intervals.get(i).end));
        i++;
    }
    // 2. the intervals that overlap the new one
    int start = newInterval.start;
    int end = newInterval.end;
    while (i < n && intervals.get(i).start < end) {
        start = Math.min(start, intervals.get(i).start);
        end = Math.max(end, intervals.get(i).end);
        i++;
    }
    result.add(new Interval(start, end));
    // 3. everything that starts after the merged interval
    while (i < n) {
        result.add(new Interval(intervals.get(i).start, intervals.get(i).end));
        i++;
    }
    return result;
}
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n) | a single pass over the list, no sorting needed |
| **Space** | O(n) | the result list |

## Interview Notes

**Follow-ups to raise yourself:**
- *"What if the list is not sorted?"* → sort it first, then the same three phases work.
- *"What if you have to insert several intervals?"* → sort all of them together and
  merge in one sweep.
- *"Can you do it in place?"* → yes for the array form: write the "before" intervals
  back in place, then the merged one, then the "after" ones.

**Common mistakes:**
- ❌ Using \`<\` instead of \`<=\` in the "before" test — with half-open intervals an
  interval that ends exactly when the new one starts does **not** overlap and must be
  copied separately.
- ❌ Forgetting that the merged interval can grow to the **right** and swallow further
  intervals — the loop condition uses the growing \`end\`.
- ❌ Not copying the intervals into new \`Interval\` objects — the input list may be
  reused by the caller.

**How to narrate:**
> "The list is sorted, so I don't have to sort anything: the new interval splits the
> list into a prefix that ends before it, the block it overlaps, and a suffix that
> starts after it. I copy the prefix, merge the overlapping block into the new
> interval, and copy the suffix — one linear pass."

## Related Problems

- [Merge Intervals](./MergeIntervals.md) — the general sweep
- [Non-overlapping Intervals](./NonOverlappingIntervals.md) — greedy selection by end time
`,i=[`insert`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};