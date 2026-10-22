var e=`design.MovingAverage`,t=`package com.dsa.design;

import com.dsa.utils.FastScanner;

import java.util.ArrayDeque;
import java.util.Deque;
import java.util.Locale;

/**
 * Problem: Moving Average
 * LeetCode: 346 | Difficulty: Easy | Frequency: 3/5
 * Pattern: Design, Running sum with a bounded window
 *
 * <p>Problem:
 * Keep a sliding window of the last {@code k} values and report the average of the
 * window after every new value. While fewer than {@code k} values have been seen, the
 * average is taken over everything seen so far.
 *
 * <p>Input format (stdin):
 * <pre>
 * k
 * n
 * v1
 * v2
 * ...
 * vn
 * </pre>
 * The program prints one line per value: the moving average formatted with two decimals.
 *
 * <p>Sample input:
 * <pre>
 * 3
 * 4
 * 1
 * 2
 * 3
 * 4
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 1.00
 * 1.50
 * 2.00
 * 3.00
 * </pre>
 *
 * <p>Approach: keep the window in a deque together with its sum. Adding a value only
 * touches the sum; once the window grows past {@code k} the oldest value is removed from
 * both. The average is {@code sum / size}.
 *
 * <p>Complexity: Time O(1) per value, Space O(k).
 */
public class MovingAverage {

    private final int k;
    private final Deque<Integer> window = new ArrayDeque<>();
    private long sum;

    public MovingAverage(int k) {
        this.k = Math.max(1, k);
    }

    /** Adds {@code value} to the window and returns the new average. */
    public double next(int value) {
        window.addLast(value);
        sum += value;
        if (window.size() > k) {
            sum -= window.pollFirst();
        }
        return (double) sum / window.size();
    }

    /** Number of values currently inside the window. */
    public int size() {
        return window.size();
    }

    /** Formats an average the same way on every machine and locale. */
    public static String format(double average) {
        return String.format(Locale.ROOT, "%.2f", average);
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int k = fs.nextInt();
        int n = fs.nextInt();

        MovingAverage average = new MovingAverage(k);
        StringBuilder out = new StringBuilder();
        for (int i = 0; i < n; i++) {
            out.append(format(average.next(fs.nextInt()))).append('\\n');
        }
        System.out.print(out);
    }
}
`,n=`import java.util.ArrayDeque;
import java.util.Deque;
import java.util.Locale;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

/**
 * Problem: Moving Average
 * LeetCode: 346 | Difficulty: Easy | Frequency: 3/5
 * Pattern: Design, Running sum with a bounded window
 *
 * <p>Problem:
 * Keep a sliding window of the last {@code k} values and report the average of the
 * window after every new value. While fewer than {@code k} values have been seen, the
 * average is taken over everything seen so far.
 *
 * <p>Input format (stdin):
 * <pre>
 * k
 * n
 * v1
 * v2
 * ...
 * vn
 * </pre>
 * The program prints one line per value: the moving average formatted with two decimals.
 *
 * <p>Sample input:
 * <pre>
 * 3
 * 4
 * 1
 * 2
 * 3
 * 4
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 1.00
 * 1.50
 * 2.00
 * 3.00
 * </pre>
 *
 * <p>Approach: keep the window in a deque together with its sum. Adding a value only
 * touches the sum; once the window grows past {@code k} the oldest value is removed from
 * both. The average is {@code sum / size}.
 *
 * <p>Complexity: Time O(1) per value, Space O(k).
 */
public class Main {

    private final int k;
    private final Deque<Integer> window = new ArrayDeque<>();
    private long sum;

    public Main(int k) {
        this.k = Math.max(1, k);
    }

    /** Adds {@code value} to the window and returns the new average. */
    public double next(int value) {
        window.addLast(value);
        sum += value;
        if (window.size() > k) {
            sum -= window.pollFirst();
        }
        return (double) sum / window.size();
    }

    /** Number of values currently inside the window. */
    public int size() {
        return window.size();
    }

    /** Formats an average the same way on every machine and locale. */
    public static String format(double average) {
        return String.format(Locale.ROOT, "%.2f", average);
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int k = fs.nextInt();
        int n = fs.nextInt();

        Main average = new Main(k);
        StringBuilder out = new StringBuilder();
        for (int i = 0; i < n; i++) {
            out.append(format(average.next(fs.nextInt()))).append('\\n');
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
# Moving Average — LeetCode 346

| | |
|---|---|
| **Difficulty** | Easy |
| **Pattern** | Design · Sliding window · Running sum |
| **Interview heat** | ★★★☆☆ |
| **Asked at** | Amazon, Google, Meta, Uber, LinkedIn |

## Problem Statement

Keep a sliding window of the last \`k\` values and report the average of the window after
every new value.

- While fewer than \`k\` values have been seen, the average is taken over everything seen
  so far.
- Once the window is full, the oldest value leaves the window when a new one arrives.

## Input Format

\`\`\`
k
n
v1
v2
...
vn
\`\`\`

- \`k\` — the window size.
- \`n\` — the number of values.
- \`v1..vn\` — the values.

The program prints one line per value: the moving average, formatted with two decimals.

## Sample Input

\`\`\`
3
4
1
2
3
4
\`\`\`

## Expected Output

\`\`\`
1.00
1.50
2.00
3.00
\`\`\`

After the fourth value the window is \`[2, 3, 4]\` — the value \`1\` fell out.

## Approach — a deque plus the running sum

Two pieces of state:

- the **deque** of the values currently inside the window,
- the **sum** of those values.

Adding a value touches the sum (\`sum += value\`); removing the oldest value touches it
again (\`sum -= oldest\`). The average is \`sum / size\` — a division, not a subtraction of
two averages, so there is no accumulation of rounding error.

Both operations are O(1) because a deque supports push-back, pop-front and peek-front in
constant time.

**Why not a circular array?** It also works, but a \`Deque\` is shorter to write and
handles the "window not full yet" case without extra logic.

## Dry Run

\`k = 3\`. The deque is shown oldest → newest.

| Step | Value | Deque before | Action | Sum before | Sum after | Deque after | Window size | Average | Output |
|---:|---:|---|---|---:|---:|---|---:|---|---|
| 1 | 1 | \`[]\` | push 1 (size 1 ≤ k) | 0 | 1 | \`[1]\` | 1 | \`1 / 1 = 1.00\` | \`1.00\` |
| 2 | 2 | \`[1]\` | push 2 (size 2 ≤ k) | 1 | 3 | \`[1, 2]\` | 2 | \`3 / 2 = 1.50\` | \`1.50\` |
| 3 | 3 | \`[1, 2]\` | push 3 (size 3 ≤ k) | 3 | 6 | \`[1, 2, 3]\` | 3 | \`6 / 3 = 2.00\` | \`2.00\` |
| 4 | 4 | \`[1, 2, 3]\` | push 4 → size 4 > k → pop 1 and subtract it | 6 | 10 → 9 | \`[2, 3, 4]\` | 3 | \`9 / 3 = 3.00\` | \`3.00\` |

Step 4 is the only interesting one: the value that leaves the window is always the
**front** of the deque, and its contribution is subtracted from the sum in the same
step.

## Java Solution

See [\`MovingAverage.java\`](./MovingAverage.java).

\`\`\`java
public double next(int value) {
    window.addLast(value);
    sum += value;
    if (window.size() > k) {
        sum -= window.pollFirst();      // the oldest value leaves the window
    }
    return (double) sum / window.size();
}
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(1) per value | one push, at most one pop |
| **Space** | O(k) | the window holds at most k values |

## Interview Notes

**Follow-ups to raise yourself:**
- *"What if the values arrive out of order?"* → the window becomes ambiguous; sort first
  or use a different structure.
- *"How would you get the median of the window?"* → two heaps with lazy deletion, or a
  balanced BST; the running sum is not enough.
- *"How would you do it with a stream of millions of values?"* → the same deque, but with
  a primitive \`long[]\` ring buffer instead of boxed objects.
- *"What if \`k\` changes?"* → keep the values in a deque and resize the window on the
  fly.

**Common mistakes:**
- ❌ Computing the average as \`previousAverage + (new - old) / k\` → rounding errors
  accumulate.
- ❌ Popping from the wrong end of the deque.
- ❌ Dividing by \`k\` instead of by the current window size when fewer than \`k\` values
  have arrived.
- ❌ Formatting with the default locale → \`1,50\` instead of \`1.50\`.

**How to narrate:**
> "I'll keep the window in a deque together with its running sum. Adding a value only
> touches the sum; when the window grows past k the oldest value is removed from both.
> The average is the sum divided by the current size — no subtraction of averages, so no
> floating point drift."

## Related Problems

- [Design HitCounter — LeetCode 362](./DesignHitCounter.md) — the same window over timestamps
- [Rate Limiter](./RateLimiter.md) — the same window with a capacity limit
- [Design Underground System — LeetCode 373](./DesignUndergroundSystem.md) — running averages
  per key
`,i=[`format`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};