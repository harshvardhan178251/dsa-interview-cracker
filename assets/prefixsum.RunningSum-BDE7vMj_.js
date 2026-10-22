var e=`prefixsum.RunningSum`,t=`package com.dsa.prefixsum;

import com.dsa.utils.FastScanner;

/**
 * Problem: Running Sum of 1d Array
 * LeetCode: 1480 | Difficulty: Easy | Frequency: 2/5
 * Pattern: Running sum, In-place accumulation
 *
 * <p>Problem:
 * Given an array {@code nums}, return an array where {@code result[i]} is the sum of
 * {@code nums[0..i]} — the running (prefix) sum of the original array.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * nums[0] nums[1] ... nums[n-1]
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 4
 * 1 2 3 4
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 1 3 6 10
 * </pre>
 *
 * <p>Approach: one pass with an accumulator. The accumulator holds the sum of everything
 * seen so far; each slot of the result receives the accumulator after the current value
 * has been added.
 *
 * <p>Complexity: Time O(n), Space O(n) for the result.
 */
public class RunningSum {

    /**
     * Returns the running sums of the array.
     *
     * @param nums the input array
     * @return an array where element {@code i} is the sum of {@code nums[0..i]}
     */
    public static int[] runningSum(int[] nums) {
        int[] result = new int[nums.length];
        int accumulator = 0;
        for (int i = 0; i < nums.length; i++) {
            accumulator += nums[i];
            result[i] = accumulator;
        }
        return result;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] nums = fs.nextIntArray(n);

        int[] result = runningSum(nums);
        StringBuilder out = new StringBuilder();
        for (int i = 0; i < result.length; i++) {
            if (i > 0) {
                out.append(' ');
            }
            out.append(result[i]);
        }
        System.out.println(out);
    }
}
`,n=`import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

/**
 * Problem: Running Sum of 1d Array
 * LeetCode: 1480 | Difficulty: Easy | Frequency: 2/5
 * Pattern: Running sum, In-place accumulation
 *
 * <p>Problem:
 * Given an array {@code nums}, return an array where {@code result[i]} is the sum of
 * {@code nums[0..i]} — the running (prefix) sum of the original array.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * nums[0] nums[1] ... nums[n-1]
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 4
 * 1 2 3 4
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 1 3 6 10
 * </pre>
 *
 * <p>Approach: one pass with an accumulator. The accumulator holds the sum of everything
 * seen so far; each slot of the result receives the accumulator after the current value
 * has been added.
 *
 * <p>Complexity: Time O(n), Space O(n) for the result.
 */
public class Main {

    /**
     * Returns the running sums of the array.
     *
     * @param nums the input array
     * @return an array where element {@code i} is the sum of {@code nums[0..i]}
     */
    public static int[] runningSum(int[] nums) {
        int[] result = new int[nums.length];
        int accumulator = 0;
        for (int i = 0; i < nums.length; i++) {
            accumulator += nums[i];
            result[i] = accumulator;
        }
        return result;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] nums = fs.nextIntArray(n);

        int[] result = runningSum(nums);
        StringBuilder out = new StringBuilder();
        for (int i = 0; i < result.length; i++) {
            if (i > 0) {
                out.append(' ');
            }
            out.append(result[i]);
        }
        System.out.println(out);
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
# Running Sum of 1d Array — LeetCode 1480

| | |
|---|---|
| **Difficulty** | Easy |
| **Pattern** | Running sum · In-place accumulation |
| **Interview heat** | ★★☆☆☆ |
| **Asked at** | Amazon, Google, Meta, Uber |

## Problem Statement

Given an array \`nums\`, return an array \`result\` where \`result[i]\` is the **running
(prefix) sum** of the original array up to and including index \`i\`:

\`\`\`
result[i] = nums[0] + nums[1] + ... + nums[i]
\`\`\`

## Input Format

\`\`\`
n
nums[0] nums[1] ... nums[n-1]
\`\`\`

- \`n\` — length of the array (1 ≤ n ≤ 10⁴)
- \`nums\` — n space-separated integers

## Sample Input

\`\`\`
4
1 2 3 4
\`\`\`

## Expected Output

\`\`\`
1 3 6 10
\`\`\`

## Approach — One Pass with an Accumulator

Keep a running total. At each index:

1. Add \`nums[i]\` to the accumulator.
2. Store the accumulator in \`result[i]\`.

The accumulator always holds the sum of the elements seen so far, so after the update it
*is* \`result[i]\`.

**The invariant to state out loud:** after processing index \`i\`, \`accumulator\` equals the
sum of \`nums[0..i]\`. That single sentence is the whole proof.

**In-place variant:** if the caller allows the input to be modified, write the
accumulator back into \`nums[i]\` — but you must read the *old* value first, so the order
\`accumulator += nums[i]; nums[i] = accumulator;\` matters.

## Dry Run

Input: \`nums = [1, 2, 3, 4]\`, \`accumulator = 0\`

| Step | \`i\` | \`nums[i]\` | \`accumulator\` before | \`accumulator\` after (= \`result[i]\`) | \`result\` after |
|---:|---:|---:|---:|---:|---|
| 1 | 0 | 1 | 0 | 0 + 1 = 1 | \`[1]\` |
| 2 | 1 | 2 | 1 | 1 + 2 = 3 | \`[1, 3]\` |
| 3 | 2 | 3 | 3 | 3 + 3 = 6 | \`[1, 3, 6]\` |
| 4 | 3 | 4 | 6 | 6 + 4 = 10 | \`[1, 3, 6, 10]\` |

Answer: **1 3 6 10**

## Java Solution

See [\`RunningSum.java\`](./RunningSum.java).

\`\`\`java
public static int[] runningSum(int[] nums) {
    int[] result = new int[nums.length];
    int accumulator = 0;
    for (int i = 0; i < nums.length; i++) {
        accumulator += nums[i];
        result[i] = accumulator;
    }
    return result;
}
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n) | One pass, constant work per element |
| **Space** | O(n) | The result array (O(1) extra if written in place) |

## Interview Notes

**Follow-ups to raise yourself:**
- *"Do it in place."* → write the accumulator back into \`nums\` (see the note above about
  reading the old value first).
- *"How do you get the sum of a range from this?"* → \`runningSum[right] -
  runningSum[left - 1]\` — this is the prefix-sum table, and it is the same thing.
- *"What if the array is streamed and you only need the last running sum?"* → you only
  need the accumulator, O(1) memory.
- *"What if you need the running **product**?"* → same loop with \`*=\`; watch out for
  zeros.
- *"How does this relate to Kadane's algorithm?"* → Kadane keeps a running sum of a
  *window* that can restart; here the window always starts at 0.

**Common mistakes:**
- ❌ Storing the accumulator **before** adding \`nums[i]\` — the result is then shifted by
  one position.
- ❌ Forgetting to allocate a separate result array and accidentally returning a mutated
  input when the caller expected the original.
- ❌ Off-by-one in the loop (\`i < nums.length\` vs \`i <= nums.length\`).
- ❌ Re-deriving the sum from scratch for every element — that is O(n²).

**How to narrate:**
> "It's a single pass with an accumulator: I add the current value to the running total
> and store the total. The invariant is that after index i the accumulator equals the
> sum of elements 0 through i, so the stored value is exactly the running sum. O(n)
> time, and the result array is the only extra space."

## Related Problems

- [Range Sum Query — Immutable](RangeSumQuery.md) — queries built on this table
- [2D Prefix Sum](TwoDimensionalPrefixSum.md) — the two-dimensional version
- [Pivot Index](PivotIndex.md) — uses a running sum as the pivot test
`,i=[`runningSum`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};