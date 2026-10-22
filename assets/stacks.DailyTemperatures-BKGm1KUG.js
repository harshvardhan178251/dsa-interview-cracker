var e=`stacks.DailyTemperatures`,t=`package com.dsa.stacks;

import com.dsa.utils.FastScanner;

import java.util.ArrayDeque;
import java.util.Deque;

/**
 * Problem: Daily Temperatures
 * LeetCode: 739 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Monotonic stack
 *
 * <p>Problem:
 * Given the daily temperatures, for every day return the number of days you have to wait
 * until a **warmer** day. If no warmer day comes, the answer is {@code 0}.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * temps[0] temps[1] ... temps[n-1]
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 6
 * 73 74 75 71 69 76
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 1 1 3 2 1 0
 * </pre>
 *
 * <p>Approach: a monotonic decreasing stack of indices; when a warmer day arrives, the
 * waiting time of every waiting day is the index distance.
 *
 * <p>Complexity: Time O(n), Space O(n).
 */
public class DailyTemperatures {

    /**
     * Returns the number of days to wait for a warmer day.
     *
     * @param temps the daily temperatures
     * @return the waiting times, {@code 0} where no warmer day follows
     */
    public static int[] daysToWait(int[] temps) {
        int[] answer = new int[temps.length];
        Deque<Integer> stack = new ArrayDeque<>();   // indices, temperatures decreasing

        for (int i = 0; i < temps.length; i++) {
            while (!stack.isEmpty() && temps[stack.peek()] < temps[i]) {
                int waiting = stack.pop();
                answer[waiting] = i - waiting;      // the distance in days
            }
            stack.push(i);
        }
        return answer;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] temps = fs.nextIntArray(n);

        int[] answer = daysToWait(temps);

        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < answer.length; i++) {
            if (i > 0) {
                sb.append(' ');
            }
            sb.append(answer[i]);
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
 * Problem: Daily Temperatures
 * LeetCode: 739 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Monotonic stack
 *
 * <p>Problem:
 * Given the daily temperatures, for every day return the number of days you have to wait
 * until a **warmer** day. If no warmer day comes, the answer is {@code 0}.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * temps[0] temps[1] ... temps[n-1]
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 6
 * 73 74 75 71 69 76
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 1 1 3 2 1 0
 * </pre>
 *
 * <p>Approach: a monotonic decreasing stack of indices; when a warmer day arrives, the
 * waiting time of every waiting day is the index distance.
 *
 * <p>Complexity: Time O(n), Space O(n).
 */
public class Main {

    /**
     * Returns the number of days to wait for a warmer day.
     *
     * @param temps the daily temperatures
     * @return the waiting times, {@code 0} where no warmer day follows
     */
    public static int[] daysToWait(int[] temps) {
        int[] answer = new int[temps.length];
        Deque<Integer> stack = new ArrayDeque<>();   // indices, temperatures decreasing

        for (int i = 0; i < temps.length; i++) {
            while (!stack.isEmpty() && temps[stack.peek()] < temps[i]) {
                int waiting = stack.pop();
                answer[waiting] = i - waiting;      // the distance in days
            }
            stack.push(i);
        }
        return answer;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] temps = fs.nextIntArray(n);

        int[] answer = daysToWait(temps);

        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < answer.length; i++) {
            if (i > 0) {
                sb.append(' ');
            }
            sb.append(answer[i]);
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
# Daily Temperatures — LeetCode 739

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Monotonic stack |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Microsoft, Uber, Bloomberg |

## Problem Statement

Given the daily temperatures, for every day return how many days you have to **wait** until
a warmer day arrives. If no warmer day follows, the answer is \`0\`.

- \`[73, 74, 75, 71, 69, 76]\` → \`[1, 1, 3, 2, 1, 0]\`
  - day 0 (73 °C) waits 1 day for the 74 °C,
  - day 2 (75 °C) waits 3 days for the 76 °C,
  - day 5 (76 °C) never gets warmer → \`0\`.

## Input Format

The program reads from standard input:

\`\`\`
n
temps[0] temps[1] ... temps[n-1]
\`\`\`

- \`n\` — the number of days (1 ≤ n ≤ 10⁵)
- \`temps\` — n space-separated temperatures (30 ≤ t ≤ 100)

## Sample Input

\`\`\`
6
73 74 75 71 69 76
\`\`\`

## Expected Output

\`\`\`
1 1 3 2 1 0
\`\`\`

## Approach — The Monotonic Stack, Answering With a Distance

This is [Next Greater Element](NextGreaterElement.md) with a different
answer: instead of the greater *value*, we want the *distance* in days to it.

Keep a stack of **indices** whose answer is still unknown, with the temperatures decreasing
from bottom to top.

For each day \`i\`:

1. While the stack is not empty and \`temps[stack.top()] < temps[i]\`, day \`i\` is the first
   warmer day for the index on top → pop it and store \`i - poppedIndex\`.
2. Push \`i\`.

The days that are left on the stack never saw a warmer day, so their answer stays \`0\`.

**Why the stack is decreasing:** if a warmer day arrives, it answers *every* colder day
that is still waiting — and those are exactly the ones on top of the stack.

## Dry Run

Input: \`[73, 74, 75, 71, 69, 76]\`, stack shown as **temperatures (top → bottom)**

| Step | i | \`temps[i]\` | stack before | popped (index, temp) | answer written | stack after | answers so far |
|---:|---:|---:|---|---|---|---|---|
| 1 | 0 | \`73\` | \`[]\` | — | — | \`[73]\` | \`[0, 0, 0, 0, 0, 0]\` |
| 2 | 1 | \`74\` | \`[73]\` | \`0\` (73 < 74) | \`answer[0] = 1 - 0 = 1\` | \`[74]\` | \`[1, 0, 0, 0, 0, 0]\` |
| 3 | 2 | \`75\` | \`[74]\` | \`1\` (74 < 75) | \`answer[1] = 2 - 1 = 1\` | \`[75]\` | \`[1, 1, 0, 0, 0, 0]\` |
| 4 | 3 | \`71\` | \`[75]\` | — (75 ≥ 71) | — | \`[71, 75]\` | \`[1, 1, 0, 0, 0, 0]\` |
| 5 | 4 | \`69\` | \`[71, 75]\` | — (71 ≥ 69) | — | \`[69, 71, 75]\` | unchanged |
| 6 | 5 | \`76\` | \`[69, 71, 75]\` | \`4\` (69 < 76) → \`answer[4] = 5 - 4 = 1\`; \`3\` (71 < 76) → \`answer[3] = 5 - 3 = 2\`; \`2\` (75 < 76) → \`answer[2] = 5 - 2 = 3\` | \`[76]\` | \`[1, 1, 3, 2, 1, 0]\` |

The answer is \`1 1 3 2 1 0\` ✓ — one warmer day answered three waiting days at once.

## Java Solution

See [\`DailyTemperatures.java\`](./DailyTemperatures.java).

\`\`\`java
public static int[] daysToWait(int[] temps) {
    int[] answer = new int[temps.length];
    Deque<Integer> stack = new ArrayDeque<>();

    for (int i = 0; i < temps.length; i++) {
        while (!stack.isEmpty() && temps[stack.peek()] < temps[i]) {
            int waiting = stack.pop();
            answer[waiting] = i - waiting;
        }
        stack.push(i);
    }
    return answer;
}
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n) | Every index is pushed once and popped at most once |
| **Space** | O(n) | The stack |

## Interview Notes

**Follow-ups to raise yourself:**
- *"What if we also wanted the temperature of that warmer day?"* → store the value as well,
  or remember it in a parallel array.
- *"The temperatures are on a circle."* → traverse the array twice, like
  [Next Greater Element II](NextGreaterElementII.md).
- *"Give me the days whose answer is 0."* → they are exactly the indices left on the stack.
- *"What if we want the number of days until it is colder?"* → flip the comparison.

**Common mistakes:**
- ❌ Using \`<=\` → equal temperatures would count as warmer.
- ❌ Storing the **temperature** on the stack instead of the **index** → the distance
  \`i - index\` cannot be computed.
- ❌ Popping only one element per step → one warm day can answer many waiting days.

**How to narrate:**
> "This is the next-greater-element pattern, but the answer is the distance instead of the
> value. I keep a monotonic decreasing stack of day indices. When a warmer day arrives I
> pop every colder day that was waiting and record \`i - poppedIndex\` days for it. Every index
> is pushed and popped at most once, so it is O(n)."

## Related Problems

- [Next Greater Element](NextGreaterElement.md) — the value variant
- [Next Greater Element II](NextGreaterElementII.md) — the circular variant
- [Largest Rectangle in Histogram](LargestRectangleInHistogram.md) — the same stack, different question
`,i=[`daysToWait`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};