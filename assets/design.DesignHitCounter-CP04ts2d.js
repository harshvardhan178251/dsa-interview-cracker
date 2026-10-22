var e=`design.DesignHitCounter`,t=`package com.dsa.design;

import com.dsa.utils.FastScanner;

import java.util.ArrayDeque;
import java.util.Deque;

/**
 * Problem: Design Hit Counter
 * LeetCode: 362 | Difficulty: Medium | Frequency: 3/5
 * Pattern: Design, Sliding window over a hit log
 *
 * <p>Problem:
 * Design a hit counter for a simple page counter. Every call to {@code hit} registers a
 * hit at the given timestamp and returns the number of hits in the last 5 minutes
 * (300 seconds), including the current one. Timestamps arrive in non-decreasing order.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * t1
 * t2
 * ...
 * tn
 * </pre>
 * The program prints one line per hit: the number of hits in the last 300 seconds.
 *
 * <p>Sample input:
 * <pre>
 * 5
 * 1
 * 2
 * 3
 * 300
 * 301
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 1
 * 2
 * 3
 * 4
 * 4
 * </pre>
 *
 * <p>Approach: a deque of timestamps. On every hit, drop the timestamps that fell out of
 * the 300 second window, then append the new one. The size of the deque is the answer.
 *
 * <p>Complexity: Time O(1) amortised per hit, Space O(hits inside the window).
 */
public class DesignHitCounter {

    /** Length of the counting window in seconds. */
    public static final int WINDOW_SECONDS = 300;

    private final Deque<Integer> hits = new ArrayDeque<>();

    /** Registers a hit at {@code timestamp} and returns the hits in the last 5 minutes. */
    public int hit(int timestamp) {
        while (!hits.isEmpty() && hits.peekFirst() <= timestamp - WINDOW_SECONDS) {
            hits.pollFirst();
        }
        hits.addLast(timestamp);
        return hits.size();
    }

    /** Number of hits currently inside the window. */
    public int size() {
        return hits.size();
    }

    /** Human readable snapshot of the live window. */
    public String state() {
        return hits.toString();
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();

        DesignHitCounter counter = new DesignHitCounter();
        StringBuilder out = new StringBuilder();
        for (int i = 0; i < n; i++) {
            int timestamp = fs.nextInt();
            out.append(counter.hit(timestamp)).append('\\n');
        }
        System.out.print(out);
    }
}
`,n=`import java.util.ArrayDeque;
import java.util.Deque;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

/**
 * Problem: Design Hit Counter
 * LeetCode: 362 | Difficulty: Medium | Frequency: 3/5
 * Pattern: Design, Sliding window over a hit log
 *
 * <p>Problem:
 * Design a hit counter for a simple page counter. Every call to {@code hit} registers a
 * hit at the given timestamp and returns the number of hits in the last 5 minutes
 * (300 seconds), including the current one. Timestamps arrive in non-decreasing order.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * t1
 * t2
 * ...
 * tn
 * </pre>
 * The program prints one line per hit: the number of hits in the last 300 seconds.
 *
 * <p>Sample input:
 * <pre>
 * 5
 * 1
 * 2
 * 3
 * 300
 * 301
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 1
 * 2
 * 3
 * 4
 * 4
 * </pre>
 *
 * <p>Approach: a deque of timestamps. On every hit, drop the timestamps that fell out of
 * the 300 second window, then append the new one. The size of the deque is the answer.
 *
 * <p>Complexity: Time O(1) amortised per hit, Space O(hits inside the window).
 */
public class Main {

    /** Length of the counting window in seconds. */
    public static final int WINDOW_SECONDS = 300;

    private final Deque<Integer> hits = new ArrayDeque<>();

    /** Registers a hit at {@code timestamp} and returns the hits in the last 5 minutes. */
    public int hit(int timestamp) {
        while (!hits.isEmpty() && hits.peekFirst() <= timestamp - WINDOW_SECONDS) {
            hits.pollFirst();
        }
        hits.addLast(timestamp);
        return hits.size();
    }

    /** Number of hits currently inside the window. */
    public int size() {
        return hits.size();
    }

    /** Human readable snapshot of the live window. */
    public String state() {
        return hits.toString();
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();

        Main counter = new Main();
        StringBuilder out = new StringBuilder();
        for (int i = 0; i < n; i++) {
            int timestamp = fs.nextInt();
            out.append(counter.hit(timestamp)).append('\\n');
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
# Design Hit Counter — LeetCode 362

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Design · Sliding window · Bucketing |
| **Interview heat** | ★★★☆☆ |
| **Asked at** | Amazon, Google, Meta, Uber, Pinterest |

## Problem Statement

Design a hit counter for a simple page counter.

- \`hit(timestamp)\` registers a hit at the given timestamp and returns the number of hits
  in the **last 5 minutes** (300 seconds), including the current one.
- The timestamps arrive in non-decreasing order.

## Input Format

\`\`\`
n
t1
t2
...
tn
\`\`\`

- \`n\` — number of hits.
- \`t1..tn\` — the timestamps, non-decreasing.

The program prints one line per hit: the number of hits inside the 300 second window.

## Sample Input

\`\`\`
5
1
2
3
300
301
\`\`\`

## Expected Output

\`\`\`
1
2
3
4
4
\`\`\`

At \`t = 301\` the hit from \`t = 1\` is exactly 300 seconds old and has left the window,
so the counter is back to the same size as at \`t = 300\`.

## Approach — a deque of the live timestamps

The window of a hit at time \`t\` is the half open interval \`(t - 300, t]\`. A hit at
timestamp \`s\` therefore expires as soon as a hit arrives at \`t + 300\` or later, i.e.
when \`s <= t - 300\`.

Keep a deque of the timestamps that are still inside the window:

1. Pop from the front while \`front <= timestamp - 300\`.
2. Push the new timestamp at the back.
3. The size of the deque is the answer.

The window is bounded by the number of hits that can happen in 300 seconds, so the space
is bounded too.

**The bucketing variant.** LeetCode also accepts an O(1)-space version: keep one counter
per second in a ring buffer of 300 slots and sum them on every query. Same answers, but
the ring buffer costs a fixed 300 integers — a good follow-up to mention.

## Dry Run

\`WINDOW = 300\`. The deque column shows the live hits, oldest first.

| Step | Hit \`t\` | Evicted (\`<= t - 300\`) | Deque before | Deque after | Size (answer) | Output |
|---:|---:|---|---|---|---:|---|
| 1 | 1 | — | \`[]\` | \`[1]\` | 1 | \`1\` |
| 2 | 2 | — (\`<= -298\`) | \`[1]\` | \`[1, 2]\` | 2 | \`2\` |
| 3 | 3 | — (\`<= -297\`) | \`[1, 2]\` | \`[1, 2, 3]\` | 3 | \`3\` |
| 4 | 300 | — (\`<= 0\`) | \`[1, 2, 3]\` | \`[1, 2, 3, 300]\` | 4 | \`4\` |
| 5 | 301 | \`1\` (\`<= 1\`) | \`[1, 2, 3, 300]\` | \`[2, 3, 300, 301]\` | 4 | \`4\` |

Step 5 is the boundary case: the hit at \`t = 1\` is exactly 300 seconds old, so it is
counted for \`t = 301\`? No — it is **not**: the window is \`(301 - 300, 301] = (1, 301]\`,
and \`1\` is not inside it. The counter therefore stays at 4 because the new hit replaced
the expired one.

## Java Solution

See [\`DesignHitCounter.java\`](./DesignHitCounter.java).

\`\`\`java
public int hit(int timestamp) {
    while (!hits.isEmpty() && hits.peekFirst() <= timestamp - WINDOW_SECONDS) {
        hits.pollFirst();
    }
    hits.addLast(timestamp);
    return hits.size();
}
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(1) amortised per hit | every timestamp is pushed once and popped once |
| **Space** | O(hits in the window) | at most one entry per hit inside 300 seconds |

## Interview Notes

**Follow-ups to raise yourself:**
- *"Can you make the space O(1)?"* → a ring buffer of 300 one-second buckets; on a hit
  reset the bucket of the current second and sum the buffer on a query.
- *"What if the timestamps are not sorted?"* → sort them first (the window is then not
  online) or use a priority queue.
- *"How would you shard this across machines?"* → per-second counters in Redis with a
  300 second TTL, summed on read.
- *"What if you also need the hit count of the last 7 days?"* → a coarser bucket size
  (one minute per bucket) plus the fine-grained one.

**Common mistakes:**
- ❌ Using \`<\` instead of \`<=\` when evicting → a hit exactly 300 seconds old would still
  be counted.
- ❌ Counting the hits of the current second twice.
- ❌ Assuming the window is \`[t - 300, t]\` (closed on the left) — then the answer at
  \`t = 301\` would be 5, not 4.

**How to narrate:**
> "The window is the last 300 seconds, so I'll keep a deque of the timestamps that are
> still inside it. On every hit I drop the timestamps that are 300 seconds or more old,
> add the new one, and return the size of the deque. Every timestamp is inserted once and
> removed once, so the whole thing is linear in the number of hits."

## Related Problems

- [Rate Limiter](./RateLimiter.md) — the same sliding window with a capacity limit
- [MovingAverage — LeetCode 346](./MovingAverage.md) — the sliding window over values
- [Design HashMap — LeetCode 706](./DesignHashMap.md) — another "design a structure" warm-up
`,i=[`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};