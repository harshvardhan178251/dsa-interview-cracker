var e=`greedy.SchedulingMaximumProfit`,t=`package com.dsa.greedy;

import com.dsa.utils.FastScanner;
import com.dsa.utils.Interval;

import java.util.Arrays;

/**
 * Problem: Maximum Profit Scheduling Jobs
 * LeetCode: none (classic weighted interval scheduling) | Difficulty: Medium | Frequency: 3/5
 * Pattern: Greedy sorting, weighted interval scheduling
 *
 * <p>Problem:
 * Every job {@code i} occupies the half-open time span {@code [start[i], end[i])} and pays
 * {@code profit[i]}. A machine can run one job at a time. Return the largest total
 * profit obtainable.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * start[0] end[0] profit[0]
 * start[1] end[1] profit[1]
 * ...
 * start[n-1] end[n-1] profit[n-1]
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 4
 * 1 3 50
 * 2 5 20
 * 3 6 60
 * 4 7 30
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 110
 * </pre>
 *
 * <p>Approach: sort the jobs by finishing time. Process them in that order and keep
 * {@code dp[i]}, the best profit obtainable from the first {@code i} sorted jobs. For
 * the {@code i}-th job either skip it ({@code dp[i-1]}) or take it — in which case
 * every earlier job that finishes at or before its start has to be dropped, which is
 * exactly the prefix {@code dp[compatible]}.
 *
 * <p>Complexity: Time O(n log n), Space O(n).
 */
public class SchedulingMaximumProfit {

    /**
     * Returns the maximum total profit of a non-overlapping set of jobs.
     *
     * @param jobs    time span of every job, half-open {@code [start, end)}
     * @param profits profit of every job, parallel to {@code jobs}
     * @return the maximum total profit
     */
    public static int maxProfit(Interval[] jobs, int[] profits) {
        if (jobs == null || profits == null || jobs.length == 0) {
            return 0;
        }
        int n = jobs.length;
        Integer[] order = new Integer[n];
        for (int i = 0; i < n; i++) {
            order[i] = i;
        }
        Arrays.sort(order, (a, b) -> {
            int byEnd = Integer.compare(jobs[a].end, jobs[b].end);
            return byEnd != 0 ? byEnd : Integer.compare(jobs[a].start, jobs[b].start);
        });

        int[] ends = new int[n];
        for (int i = 0; i < n; i++) {
            ends[i] = jobs[order[i]].end;
        }

        int[] dp = new int[n + 1];
        for (int i = 1; i <= n; i++) {
            Interval job = jobs[order[i - 1]];
            int profit = profits[order[i - 1]];

            // how many of the earlier jobs finish at or before this job starts
            int lo = 0;
            int hi = i - 2;
            int compatible = 0;
            while (lo <= hi) {
                int mid = (lo + hi) / 2;
                if (ends[mid] <= job.start) {
                    compatible = mid + 1;
                    lo = mid + 1;
                } else {
                    hi = mid - 1;
                }
            }
            dp[i] = Math.max(dp[i - 1], profit + dp[compatible]);
        }
        return dp[n];
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        Interval[] jobs = new Interval[n];
        int[] profits = new int[n];
        for (int i = 0; i < n; i++) {
            int start = fs.nextInt();
            int end = fs.nextInt();
            jobs[i] = new Interval(start, end);
            profits[i] = fs.nextInt();
        }

        System.out.println(maxProfit(jobs, profits));
    }
}
`,n=`import java.util.Arrays;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

/**
 * Problem: Maximum Profit Scheduling Jobs
 * LeetCode: none (classic weighted interval scheduling) | Difficulty: Medium | Frequency: 3/5
 * Pattern: Greedy sorting, weighted interval scheduling
 *
 * <p>Problem:
 * Every job {@code i} occupies the half-open time span {@code [start[i], end[i])} and pays
 * {@code profit[i]}. A machine can run one job at a time. Return the largest total
 * profit obtainable.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * start[0] end[0] profit[0]
 * start[1] end[1] profit[1]
 * ...
 * start[n-1] end[n-1] profit[n-1]
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 4
 * 1 3 50
 * 2 5 20
 * 3 6 60
 * 4 7 30
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 110
 * </pre>
 *
 * <p>Approach: sort the jobs by finishing time. Process them in that order and keep
 * {@code dp[i]}, the best profit obtainable from the first {@code i} sorted jobs. For
 * the {@code i}-th job either skip it ({@code dp[i-1]}) or take it — in which case
 * every earlier job that finishes at or before its start has to be dropped, which is
 * exactly the prefix {@code dp[compatible]}.
 *
 * <p>Complexity: Time O(n log n), Space O(n).
 */
public class Main {

    /**
     * Returns the maximum total profit of a non-overlapping set of jobs.
     *
     * @param jobs    time span of every job, half-open {@code [start, end)}
     * @param profits profit of every job, parallel to {@code jobs}
     * @return the maximum total profit
     */
    public static int maxProfit(Interval[] jobs, int[] profits) {
        if (jobs == null || profits == null || jobs.length == 0) {
            return 0;
        }
        int n = jobs.length;
        Integer[] order = new Integer[n];
        for (int i = 0; i < n; i++) {
            order[i] = i;
        }
        Arrays.sort(order, (a, b) -> {
            int byEnd = Integer.compare(jobs[a].end, jobs[b].end);
            return byEnd != 0 ? byEnd : Integer.compare(jobs[a].start, jobs[b].start);
        });

        int[] ends = new int[n];
        for (int i = 0; i < n; i++) {
            ends[i] = jobs[order[i]].end;
        }

        int[] dp = new int[n + 1];
        for (int i = 1; i <= n; i++) {
            Interval job = jobs[order[i - 1]];
            int profit = profits[order[i - 1]];

            // how many of the earlier jobs finish at or before this job starts
            int lo = 0;
            int hi = i - 2;
            int compatible = 0;
            while (lo <= hi) {
                int mid = (lo + hi) / 2;
                if (ends[mid] <= job.start) {
                    compatible = mid + 1;
                    lo = mid + 1;
                } else {
                    hi = mid - 1;
                }
            }
            dp[i] = Math.max(dp[i - 1], profit + dp[compatible]);
        }
        return dp[n];
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        Interval[] jobs = new Interval[n];
        int[] profits = new int[n];
        for (int i = 0; i < n; i++) {
            int start = fs.nextInt();
            int end = fs.nextInt();
            jobs[i] = new Interval(start, end);
            profits[i] = fs.nextInt();
        }

        System.out.println(maxProfit(jobs, profits));
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
# Maximum Profit Scheduling Jobs

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Greedy sorting · Weighted interval scheduling |
| **Interview heat** | ★★★☆☆ |
| **Asked at** | Amazon, Google, Meta, Uber |

## Problem Statement

Every job \`i\` occupies the half-open time span \`[start[i], end[i])\` and pays
\`profit[i]\`. One machine can run at most one job at a time. Return the **largest total
profit** that can be earned.

- A job that ends at \`t\` and a job that starts at \`t\` do **not** conflict.
- Jobs are given in any order.

## Input Format

The program reads from standard input:

\`\`\`
n
start[0] end[0] profit[0]
start[1] end[1] profit[1]
...
start[n-1] end[n-1] profit[n-1]
\`\`\`

- \`n\` — number of jobs (1 ≤ n ≤ 10⁴)
- \`start\` — start of each job
- \`end\` — end of each job (\`start < end\`)
- \`profit\` — profit of each job

## Sample Input

\`\`\`
4
1 3 50
2 5 20
3 6 60
4 7 30
\`\`\`

## Expected Output

\`\`\`
110
\`\`\`

Take the job \`[1, 3)\` (profit 50) and then the job \`[3, 6)\` (profit 60): \`50 + 60 = 110\`.

## Approach — sort by finishing time, then DP

The greedy part is the **ordering**: sort the jobs by their finishing time. The
selection part is a DP, because a higher profit job may block two cheaper jobs.

Let \`dp[i]\` be the best profit obtainable from the first \`i\` jobs in that order. For
the \`i\`-th job there are exactly two options:

- **skip it** → \`dp[i - 1]\`;
- **take it** → \`profit[i] + dp[c]\`, where \`c\` is the number of earlier jobs that finish
  at or before \`start[i]\`. Those jobs are exactly the first \`c\` jobs of the sorted
  list, so \`dp[c]\` is a prefix entry.

\`dp[i] = max(dp[i - 1], profit[i] + dp[c])\`.

**Why sorting by finishing time is the right greedy choice:** every job that can
follow a job \`X\` must start after \`X\` ends, so it must end later than \`X\` ends.
Sorting by end time therefore puts all possible successors of a job *after* it, which
makes the "compatible prefix" \`c\` a simple prefix of the sorted list. Sorting by start
time or by profit would not have this property.

**Exchange argument (why taking a job is safe once it is chosen):** if we take job \`i\`,
every job that overlaps it is unusable anyway, so the only decision that matters is
which set of *compatible* jobs to add — and that is exactly the smaller problem
\`dp[c]\` that the DP already solves optimally. The DP never discards an option: for
every job it explicitly evaluates both "skip" and "take", so the maximum is never
below the optimum.

## Dry Run

Input: jobs \`(1,3,50)\`, \`(2,5,20)\`, \`(3,6,60)\`, \`(4,7,30)\`

Sorted by finishing time: \`(1,3,50)\`, \`(2,5,20)\`, \`(3,6,60)\`, \`(4,7,30)\`

| Step | job | \`dp[i-1]\` | compatible count \`c\` | \`profit + dp[c]\` | \`dp[i]\` | choice |
|---:|---|---:|---:|---:|---:|---|
| 1 | \`(1,3,50)\` | \`dp[0] = 0\` | 0 (nothing ends ≤ 1) | \`50 + dp[0] = 50\` | \`max(0, 50) = 50\` | take |
| 2 | \`(2,5,20)\` | \`dp[1] = 50\` | 0 (no job ends ≤ 2) | \`20 + dp[0] = 20\` | \`max(50, 20) = 50\` | skip |
| 3 | \`(3,6,60)\` | \`dp[2] = 50\` | 1 (job 1 ends at 3 ≤ 3) | \`60 + dp[1] = 110\` | \`max(50, 110) = 110\` | take |
| 4 | \`(4,7,30)\` | \`dp[3] = 110\` | 1 (job 1 ends at 3 ≤ 4) | \`30 + dp[1] = 80\` | \`max(110, 80) = 110\` | skip |

\`dp[4] = 110\` ✓ — jobs \`(1,3,50)\` and \`(3,6,60)\`.

## Java Solution

See [\`SchedulingMaximumProfit.java\`](./SchedulingMaximumProfit.java).

\`\`\`java
public static int maxProfit(Interval[] jobs, int[] profits) {
    Integer[] order = new Integer[jobs.length];
    for (int i = 0; i < jobs.length; i++) {
        order[i] = i;
    }
    Arrays.sort(order, (a, b) -> {
        int byEnd = Integer.compare(jobs[a].end, jobs[b].end);
        return byEnd != 0 ? byEnd : Integer.compare(jobs[a].start, jobs[b].start);
    });

    int[] ends = new int[n];
    for (int i = 0; i < n; i++) {
        ends[i] = jobs[order[i]].end;
    }

    int[] dp = new int[n + 1];
    for (int i = 1; i <= n; i++) {
        Interval job = jobs[order[i - 1]];
        int profit = profits[order[i - 1]];

        int lo = 0, hi = i - 2, compatible = 0;
        while (lo <= hi) {
            int mid = (lo + hi) / 2;
            if (ends[mid] <= job.start) {
                compatible = mid + 1;
                lo = mid + 1;
            } else {
                hi = mid - 1;
            }
        }
        dp[i] = Math.max(dp[i - 1], profit + dp[compatible]);
    }
    return dp[n];
}
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n log n) | the sort plus one binary search per job |
| **Space** | O(n) | the sorted index array, the \`ends\` array and the \`dp\` table |

## Interview Notes

**Follow-ups to raise yourself:**
- *"What if there are \`m\` machines instead of one?"* → a different DP (one dimension
  per machine) or a greedy sweep with a heap of machine end times.
- *"What if every job has the same profit?"* → the answer is the classic activity
  selection greedy: sort by end time and always take the next compatible job.
- *"Can you recover the chosen jobs?"* → remember the decision in \`dp[i]\` and walk
  backwards.

**Common mistakes:**
- ❌ Sorting by profit instead of by finishing time — a very profitable job can block
  two better ones.
- ❌ Using \`end < start\` instead of \`end <= start\` when testing compatibility — with
  half-open intervals a job may start exactly when the previous one ends.
- ❌ Forgetting that the DP index \`c\` counts *jobs*, not time units.

**How to narrate:**
> "I sort the jobs by finishing time — that way all jobs that can follow a given job
> come after it, and the compatible set is a prefix of the sorted list. Then it's the
> classic weighted interval scheduling DP: for each job either skip it or take it plus
> the best profit of the jobs that finish before it starts. Both branches are
> evaluated, so the DP always keeps the better of the two."

## Related Problems

- [Non-overlapping Intervals](../intervals/NonOverlappingIntervals.md) — the unweighted version of this DP
- [Meeting Rooms III](../intervals/MeetingRoomsIII.md) — the same interval sweep with several rooms
`,i=[`maxProfit`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};