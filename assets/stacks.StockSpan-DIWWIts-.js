var e=`stacks.StockSpan`,t=`package com.dsa.stacks;

import com.dsa.utils.FastScanner;

import java.util.ArrayDeque;
import java.util.Deque;

/**
 * Problem: Stock Span
 * Difficulty: Medium | Frequency: 3/5
 * Pattern: Monotonic stack
 *
 * <p>Problem:
 * For every day, compute the **stock span**: the number of consecutive days (ending on that
 * day) whose price is **less than or equal to** the price of that day.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * prices[0] prices[1] ... prices[n-1]
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 6
 * 100 80 60 70 60 75
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 1 1 1 2 1 4
 * </pre>
 *
 * <p>Approach: a monotonic decreasing stack of indices. The previous index whose price is
 * strictly greater than today's is the left boundary of the span.
 *
 * <p>Complexity: Time O(n), Space O(n).
 */
public class StockSpan {

    /**
     * Computes the stock span of every day.
     *
     * @param prices the daily prices
     * @return the span of every day
     */
    public static int[] spans(int[] prices) {
        int n = prices.length;
        int[] span = new int[n];
        Deque<Integer> stack = new ArrayDeque<>();   // indices, prices decreasing bottom to top

        for (int i = 0; i < n; i++) {
            while (!stack.isEmpty() && prices[stack.peek()] <= prices[i]) {
                stack.pop();                        // these days are part of today's span
            }
            span[i] = stack.isEmpty() ? i + 1 : i - stack.peek();
            stack.push(i);
        }
        return span;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] prices = fs.nextIntArray(n);

        int[] span = spans(prices);

        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < span.length; i++) {
            if (i > 0) {
                sb.append(' ');
            }
            sb.append(span[i]);
        }
        System.out.println(sb);
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
 * Problem: Stock Span
 * Difficulty: Medium | Frequency: 3/5
 * Pattern: Monotonic stack
 *
 * <p>Problem:
 * For every day, compute the **stock span**: the number of consecutive days (ending on that
 * day) whose price is **less than or equal to** the price of that day.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * prices[0] prices[1] ... prices[n-1]
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 6
 * 100 80 60 70 60 75
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 1 1 1 2 1 4
 * </pre>
 *
 * <p>Approach: a monotonic decreasing stack of indices. The previous index whose price is
 * strictly greater than today's is the left boundary of the span.
 *
 * <p>Complexity: Time O(n), Space O(n).
 */
public class Main {

    /**
     * Computes the stock span of every day.
     *
     * @param prices the daily prices
     * @return the span of every day
     */
    public static int[] spans(int[] prices) {
        int n = prices.length;
        int[] span = new int[n];
        Deque<Integer> stack = new ArrayDeque<>();   // indices, prices decreasing bottom to top

        for (int i = 0; i < n; i++) {
            while (!stack.isEmpty() && prices[stack.peek()] <= prices[i]) {
                stack.pop();                        // these days are part of today's span
            }
            span[i] = stack.isEmpty() ? i + 1 : i - stack.peek();
            stack.push(i);
        }
        return span;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] prices = fs.nextIntArray(n);

        int[] span = spans(prices);

        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < span.length; i++) {
            if (i > 0) {
                sb.append(' ');
            }
            sb.append(span[i]);
        }
        System.out.println(sb);
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
# Stock Span

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Monotonic stack |
| **Interview heat** | ★★★☆☆ |
| **Asked at** | Amazon, Google, Meta, Microsoft, Uber |

## Problem Statement

The **stock span** of a day is the number of consecutive days (ending on that day) whose price
is less than or equal to the price of that day.

For the prices \`[100, 80, 60, 70, 60, 75]\`:

| Day | Price | Span | Why |
|---:|---:|---:|---|
| 0 | 100 | 1 | yesterday is not part of the range |
| 1 | 80 | 1 | 100 > 80 |
| 2 | 60 | 1 | 80 > 60 |
| 3 | 70 | 2 | 60 ≤ 70, but 80 > 70 |
| 4 | 60 | 1 | 70 > 60 |
| 5 | 75 | 4 | 60, 70, 60 are all ≤ 75, but 80 > 75 |

## Input Format

The program reads from standard input:

\`\`\`
n
prices[0] prices[1] ... prices[n-1]
\`\`\`

- \`n\` — the number of days (1 ≤ n ≤ 10⁵)
- \`prices\` — n space-separated integers (0 ≤ p ≤ 10⁶)

## Sample Input

\`\`\`
6
100 80 60 70 60 75
\`\`\`

## Expected Output

\`\`\`
1 1 1 2 1 4
\`\`\`

## Approach — Monotonic Decreasing Stack

The span of day \`i\` is \`i - j\`, where \`j\` is the index of the closest previous day whose
price is **strictly greater** than today's (or \`-1\` if there is none, which gives the span
\`i + 1\`).

Scanning backwards to find \`j\` is O(n²) in the worst case. The stack does it in O(n):

- The stack holds the indices of the previous days, with their prices **decreasing** from
  bottom to top.
- While the price on top of the stack is **less than or equal** to today's price, that day
  cannot be the left boundary — it is part of today's span — so it is popped.
- What remains on top is the closest previous day with a strictly greater price.
- Today's index is then pushed.

**Why the prices stay decreasing:** whenever a day is popped, the day that pops it has a
greater price, so the stack keeps only the "record" days that could still be a boundary.

## Dry Run

Input: \`[100, 80, 60, 70, 60, 75]\`, stack shown as **prices (bottom → top)**

| Step | i | price | stack before | popped | stack top after | span | stack after |
|---:|---:|---:|---|---|---|---:|---|
| 1 | 0 | \`100\` | \`[]\` | — | — (empty → span = \`i + 1\`) | \`0 + 1 = 1\` | \`[100]\` |
| 2 | 1 | \`80\` | \`[100]\` | — (100 > 80) | \`100\` (index 0) | \`1 - 0 = 1\` | \`[80, 100]\` |
| 3 | 2 | \`60\` | \`[80, 100]\` | — (80 > 60) | \`80\` (index 1) | \`2 - 1 = 1\` | \`[60, 80, 100]\` |
| 4 | 3 | \`70\` | \`[60, 80, 100]\` | \`60\` (60 ≤ 70) | \`80\` (index 1) | \`3 - 1 = 2\` | \`[70, 80, 100]\` |
| 5 | 4 | \`60\` | \`[70, 80, 100]\` | — (70 > 60) | \`70\` (index 3) | \`4 - 3 = 1\` | \`[60, 70, 80, 100]\` |
| 6 | 5 | \`75\` | \`[60, 70, 80, 100]\` | \`60\` (60 ≤ 75), \`70\` (70 ≤ 75) | \`80\` (index 1) | \`5 - 1 = 4\` | \`[75, 80, 100]\` |

The spans are \`1 1 1 2 1 4\` ✓

Note step 6: the \`80\` survives because it is **strictly** greater than \`75\` — it is the real
left boundary of the span.

## Java Solution

See [\`StockSpan.java\`](./StockSpan.java).

\`\`\`java
public static int[] spans(int[] prices) {
    int n = prices.length;
    int[] span = new int[n];
    Deque<Integer> stack = new ArrayDeque<>();

    for (int i = 0; i < n; i++) {
        while (!stack.isEmpty() && prices[stack.peek()] <= prices[i]) {
            stack.pop();                        // these days are part of today's span
        }
        span[i] = stack.isEmpty() ? i + 1 : i - stack.peek();
        stack.push(i);
    }
    return span;
}
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n) | Every index is pushed once and popped at most once |
| **Space** | O(n) | The stack |

## Interview Notes

**Follow-ups to raise yourself:**
- *"What if the comparison were strictly \`<\`?"* → change the pop condition; the spans then
  count only the strictly smaller days.
- *"Compute the span of the next greater day instead."* → the same stack, mirrored.
- *"What is the maximum span over the whole array?"* → take the maximum of the spans.
- *"Do it with a sliding window."* → the problem is defined by a run of days, so a window
  over the prices is the natural alternative — but the stack version is O(n) and single
  pass.

**Common mistakes:**
- ❌ Popping with \`<\` instead of \`<=\` → the day with the **equal** price would be treated as
  a boundary and the span would be too small.
- ❌ Forgetting the \`stack.isEmpty()\` case → \`NullPointerException\` on the first day.
- ❌ Storing the prices instead of the indices → the distance cannot be computed.

**How to narrate:**
> "The span of day i is the distance to the closest previous day with a strictly greater
> price. I keep a stack of indices whose prices decrease from bottom to top. While the top
> price is less than or equal to today's, that day is inside today's span so I pop it. The
> remaining top is the boundary, and the span is the index distance. Each index is pushed
> and popped once, so it is O(n)."

## Related Problems

- [Next Greater Element](NextGreaterElement.md) — the same stack, a different answer
- [Daily Temperatures](DailyTemperatures.md) — the distance variant
- [Largest Rectangle in Histogram](LargestRectangleInHistogram.md) — the same stack again
`,i=[`spans`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};