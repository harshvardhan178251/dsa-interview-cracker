var e=`queues.SlidingWindowMaximum`,t=`package com.dsa.queues;

import com.dsa.utils.FastScanner;

import java.util.ArrayDeque;
import java.util.Deque;

/**
 * Problem: Sliding Window Maximum
 * LeetCode: 239 | Difficulty: Hard | Frequency: 5/5
 * Pattern: Monotonic deque
 *
 * <p>Problem:
 * Given an array {@code nums} and a window size {@code k}, return the maximum value of
 * every window of length {@code k}.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * nums[0] nums[1] ... nums[n-1]
 * k
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 8
 * 1 3 -1 -3 5 3 6 7
 * 3
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 3 3 5 5 6 7
 * </pre>
 *
 * <p>Approach: a monotonic deque holds the indices of the elements that may still become
 * a window maximum, in decreasing value order. The front always points at the maximum of
 * the current window. Expired indices are dropped from the front and smaller values are
 * dropped from the back — a value that is smaller than a later value can never be the
 * maximum of any window that contains the later value.
 *
 * <p>Complexity: Time O(n) — every index is pushed once and popped at most once,
 * Space O(k).
 */
public class SlidingWindowMaximum {

    /**
     * Returns the maximum of every window of length {@code k}.
     *
     * @param nums the input array
     * @param k    the window size
     * @return one maximum per window, in order
     */
    public static int[] maxSlidingWindow(int[] nums, int k) {
        if (nums == null || nums.length == 0 || k <= 0) {
            return new int[0];
        }
        if (k > nums.length) {
            k = nums.length;
        }

        Deque<Integer> window = new ArrayDeque<>();
        int[] answer = new int[nums.length - k + 1];

        for (int i = 0; i < nums.length; i++) {
            // 1. drop indices that left the window
            while (!window.isEmpty() && window.peekFirst() <= i - k) {
                window.pollFirst();
            }
            // 2. drop values that are dominated by the current one
            while (!window.isEmpty() && nums[window.peekLast()] <= nums[i]) {
                window.pollLast();
            }
            // 3. admit the current index
            window.addLast(i);
            // 4. the front is the maximum once the window is full
            if (i >= k - 1) {
                answer[i - k + 1] = nums[window.peekFirst()];
            }
        }
        return answer;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] nums = fs.nextIntArray(n);
        int k = fs.nextInt();

        int[] answer = maxSlidingWindow(nums, k);
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
 * Problem: Sliding Window Maximum
 * LeetCode: 239 | Difficulty: Hard | Frequency: 5/5
 * Pattern: Monotonic deque
 *
 * <p>Problem:
 * Given an array {@code nums} and a window size {@code k}, return the maximum value of
 * every window of length {@code k}.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * nums[0] nums[1] ... nums[n-1]
 * k
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 8
 * 1 3 -1 -3 5 3 6 7
 * 3
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 3 3 5 5 6 7
 * </pre>
 *
 * <p>Approach: a monotonic deque holds the indices of the elements that may still become
 * a window maximum, in decreasing value order. The front always points at the maximum of
 * the current window. Expired indices are dropped from the front and smaller values are
 * dropped from the back — a value that is smaller than a later value can never be the
 * maximum of any window that contains the later value.
 *
 * <p>Complexity: Time O(n) — every index is pushed once and popped at most once,
 * Space O(k).
 */
public class Main {

    /**
     * Returns the maximum of every window of length {@code k}.
     *
     * @param nums the input array
     * @param k    the window size
     * @return one maximum per window, in order
     */
    public static int[] maxSlidingWindow(int[] nums, int k) {
        if (nums == null || nums.length == 0 || k <= 0) {
            return new int[0];
        }
        if (k > nums.length) {
            k = nums.length;
        }

        Deque<Integer> window = new ArrayDeque<>();
        int[] answer = new int[nums.length - k + 1];

        for (int i = 0; i < nums.length; i++) {
            // 1. drop indices that left the window
            while (!window.isEmpty() && window.peekFirst() <= i - k) {
                window.pollFirst();
            }
            // 2. drop values that are dominated by the current one
            while (!window.isEmpty() && nums[window.peekLast()] <= nums[i]) {
                window.pollLast();
            }
            // 3. admit the current index
            window.addLast(i);
            // 4. the front is the maximum once the window is full
            if (i >= k - 1) {
                answer[i - k + 1] = nums[window.peekFirst()];
            }
        }
        return answer;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] nums = fs.nextIntArray(n);
        int k = fs.nextInt();

        int[] answer = maxSlidingWindow(nums, k);
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
# Sliding Window Maximum — LeetCode 239

| | |
|---|---|
| **Difficulty** | Hard |
| **Pattern** | Monotonic deque · Sliding window · Two pointers |
| **Interview heat** | ★★★★★ |
| **Asked at** | Amazon, Meta, Google, Microsoft, Uber, Bloomberg |

## Problem Statement

Given an integer array \`nums\` and an integer \`k\`, return the **maximum value of every
contiguous subarray of length \`k\`**.

For \`nums = [1, 3, -1, -3, 5, 3, 6, 7]\` and \`k = 3\` the windows are

| Window | Values | Maximum |
|---|---|---|
| \`nums[0..2]\` | \`[1, 3, -1]\` | 3 |
| \`nums[1..3]\` | \`[3, -1, -3]\` | 3 |
| \`nums[2..4]\` | \`[-1, -3, 5]\` | 5 |
| \`nums[3..5]\` | \`[-3, 5, 3]\` | 5 |
| \`nums[4..6]\` | \`[5, 3, 6]\` | 6 |
| \`nums[5..7]\` | \`[3, 6, 7]\` | 7 |

so the answer is \`[3, 3, 5, 5, 6, 7]\`.

## Input Format

The program reads from standard input:

\`\`\`
n
nums[0] nums[1] ... nums[n-1]
k
\`\`\`

- \`n\` — length of the array (1 ≤ n ≤ 10⁵)
- \`nums\` — n space-separated integers
- \`k\` — the window size (1 ≤ k ≤ n)

## Sample Input

\`\`\`
8
1 3 -1 -3 5 3 6 7
3
\`\`\`

## Expected Output

\`\`\`
3 3 5 5 6 7
\`\`\`

## Approach — Monotonic deque

A brute-force solution recomputes the maximum of every window: O(n·k). A **heap** gives
O(n log k) but still pays a logarithmic factor. The optimal O(n) solution keeps a
**deque of indices** with two properties:

1. **Indices increase** from front to back (they enter in order and leave in order).
2. **Values decrease** from front to back — the front always holds the largest candidate.

For each new element \`nums[i]\`:

1. **Expire** indices that left the window: while \`deque.peekFirst() <= i - k\`, drop the
   front.
2. **Dominate** smaller values: while \`nums[deque.peekLast()] <= nums[i]\`, drop the
   back. Those elements can never be a maximum again — \`nums[i]\` is at least as large
   and leaves the window later.
3. **Admit** \`i\`.
4. Once the window is full (\`i >= k - 1\`), the front holds the maximum: \`nums[deque.peekFirst()]\`.

**Why dropping smaller values is safe:** suppose \`nums[j] <= nums[i]\` with \`j < i\`. Any
future window that contains \`j\` and ends at or after \`i\` also contains \`i\` (because
windows are contiguous and \`j < i\`), so \`nums[j]\` can never be the maximum of such a
window. Dropping it loses nothing.

## Dry Run

Input: \`nums = [1, 3, -1, -3, 5, 3, 6, 7]\`, \`k = 3\`

The deque holds **indices**; the values column shows what those indices point at.

| Step | i | \`nums[i]\` | Expired (front) | Dominated (back) | Deque (indices) | Values | Window max |
|---:|---:|---:|---|---|---|---|---|
| 1 | 0 | 1 | — | — | \`[0]\` | \`[1]\` | — (window not full) |
| 2 | 1 | 3 | — | \`0\` (1 ≤ 3) | \`[1]\` | \`[3]\` | — |
| 3 | 2 | -1 | — | — | \`[1, 2]\` | \`[3, -1]\` | **3** |
| 4 | 3 | -3 | — | — | \`[1, 2, 3]\` | \`[3, -1, -3]\` | **3** |
| 5 | 4 | 5 | \`1\` (1 ≤ 4−3) | \`3\`, \`2\` (both ≤ 5) | \`[4]\` | \`[5]\` | **5** |
| 6 | 5 | 3 | — | — | \`[4, 5]\` | \`[5, 3]\` | **5** |
| 7 | 6 | 6 | — | \`5\`, \`4\` (both ≤ 6) | \`[6]\` | \`[6]\` | **6** |
| 8 | 7 | 7 | — | \`6\` (6 ≤ 7) | \`[7]\` | \`[7]\` | **7** |

Step 5 shows the two rules working together: index 1 left the window, and the three
smaller candidates behind it were dominated by the new value \`5\`. The deque never holds
more than \`k\` indices, and each index is inserted once and removed at most once — that
is where the O(n) comes from.

## Java Solution

See [\`SlidingWindowMaximum.java\`](./SlidingWindowMaximum.java).

\`\`\`java
Deque<Integer> window = new ArrayDeque<>();
for (int i = 0; i < nums.length; i++) {
    while (!window.isEmpty() && window.peekFirst() <= i - k) {
        window.pollFirst();
    }
    while (!window.isEmpty() && nums[window.peekLast()] <= nums[i]) {
        window.pollLast();
    }
    window.addLast(i);
    if (i >= k - 1) {
        answer[i - k + 1] = nums[window.peekFirst()];
    }
}
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n) | every index is pushed once and popped at most once |
| **Space** | O(k) | the deque never holds more than \`k\` indices |

**Optimal?** Yes — every element has to be looked at, so Ω(n) is a lower bound and this
solution matches it.

## Interview Notes

**Follow-ups to raise yourself:**
- *"What if \`k\` changes between windows?"* → a heap of \`(value, index)\` with lazy
  deletion: O(n log n) overall, and it answers "current maximum" on demand.
- *"Can you do it without a deque?"* → yes, with two stacks and a transfer (the
  "sliding window maximum using two stacks" trick), O(n) amortised, but harder to read.
- *"What about the sliding window **minimum**?"* → identical, with the comparison
  flipped.
- *"How would you answer range-maximum queries on a static array?"* → a sparse table
  (O(n log n) build, O(1) query) or a segment tree (O(n) build, O(log n) query).

**Common mistakes:**
- ❌ Using \`<=\` instead of \`<\` in the domination loop → equal values are dropped, which
  is *fine* here, but the same habit in a **strictly increasing** variant silently
  breaks the tie-breaking.
- ❌ Forgetting to remove **expired** indices → the deque keeps growing and the front
  may point outside the current window, so the reported maximum belongs to the wrong
  window.
- ❌ Reporting the maximum **before** the window is full (\`i >= k - 1\`) → you emit
  \`k - 1\` extra answers for windows that do not exist.
- ❌ Storing **values** in the deque instead of **indices** → you can no longer tell
  which elements have expired.

**How to narrate:**
> "A heap would give O(n log k), but I can do better with a monotonic deque. I keep
> indices in decreasing value order. When a new value arrives I drop everything smaller
> from the back — it can never be a maximum again, because the new value is at least as
> large and stays in the window longer. I also drop expired indices from the front.
> The front is then always the maximum, and since each index goes in and comes out at
> most once, the whole pass is O(n)."

## Related Problems

- [Minimum Window Substring](../slidingwindow/MinimumWindowSubstring.md) — the same deque, mirrored comparison
- [Design a Min Queue](MinQueue.md) — running minimum in a queue
- [Task Scheduler](../heaps/TaskScheduler.md) — a priority queue with a cooldown
- [K Closest Elements](../heaps/KClosestElements.md) — a window sorted by distance
`,i=[`maxSlidingWindow`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};