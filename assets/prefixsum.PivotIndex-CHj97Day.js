var e=`prefixsum.PivotIndex`,t=`package com.dsa.prefixsum;

import com.dsa.utils.FastScanner;

/**
 * Problem: Pivot Index
 * LeetCode: 724 | Difficulty: Easy | Frequency: 3/5
 * Pattern: Prefix sums, Running balance
 *
 * <p>Problem:
 * Given an integer array {@code nums}, return the index of the pivot element, where the
 * pivot is the element for which the sum of all elements strictly to its left equals the
 * sum of all elements strictly to its right. If no such element exists, return -1. If
 * several pivots exist, return the leftmost one.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * nums[0] nums[1] ... nums[n-1]
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 5
 * 1 2 3 1 2
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 2
 * </pre>
 *
 * <p>Approach: compute the total once, then walk the array keeping the sum of the
 * elements already passed. At index {@code i} the left sum is {@code left} and the right
 * sum is {@code total - left - nums[i]}; the two are equal exactly at a pivot.
 *
 * <p>Complexity: Time O(n), Space O(1).
 */
public class PivotIndex {

    /**
     * Returns the index of the leftmost pivot element.
     *
     * @param nums the input array
     * @return the pivot index, or -1 when there is none
     */
    public static int pivotIndex(int[] nums) {
        int total = 0;
        for (int value : nums) {
            total += value;
        }
        int left = 0;
        for (int i = 0; i < nums.length; i++) {
            if (left == total - left - nums[i]) {
                return i;
            }
            left += nums[i];
        }
        return -1;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] nums = fs.nextIntArray(n);

        System.out.println(pivotIndex(nums));
    }
}
`,n=`import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

/**
 * Problem: Pivot Index
 * LeetCode: 724 | Difficulty: Easy | Frequency: 3/5
 * Pattern: Prefix sums, Running balance
 *
 * <p>Problem:
 * Given an integer array {@code nums}, return the index of the pivot element, where the
 * pivot is the element for which the sum of all elements strictly to its left equals the
 * sum of all elements strictly to its right. If no such element exists, return -1. If
 * several pivots exist, return the leftmost one.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * nums[0] nums[1] ... nums[n-1]
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 5
 * 1 2 3 1 2
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 2
 * </pre>
 *
 * <p>Approach: compute the total once, then walk the array keeping the sum of the
 * elements already passed. At index {@code i} the left sum is {@code left} and the right
 * sum is {@code total - left - nums[i]}; the two are equal exactly at a pivot.
 *
 * <p>Complexity: Time O(n), Space O(1).
 */
public class Main {

    /**
     * Returns the index of the leftmost pivot element.
     *
     * @param nums the input array
     * @return the pivot index, or -1 when there is none
     */
    public static int pivotIndex(int[] nums) {
        int total = 0;
        for (int value : nums) {
            total += value;
        }
        int left = 0;
        for (int i = 0; i < nums.length; i++) {
            if (left == total - left - nums[i]) {
                return i;
            }
            left += nums[i];
        }
        return -1;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] nums = fs.nextIntArray(n);

        System.out.println(pivotIndex(nums));
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
# Pivot Index — LeetCode 724

| | |
|---|---|
| **Difficulty** | Easy |
| **Pattern** | Prefix sums · Running balance |
| **Interview heat** | ★★★☆☆ |
| **Asked at** | Amazon, Meta, Uber |

## Problem Statement

Given an integer array \`nums\`, return the **index of the pivot element** — the element
for which the sum of all elements **strictly to its left** equals the sum of all
elements **strictly to its right**.

- If there is no such element, return \`-1\`.
- If several pivots exist, return the **leftmost** one.

## Input Format

\`\`\`
n
nums[0] nums[1] ... nums[n-1]
\`\`\`

- \`n\` — length of the array (1 ≤ n ≤ 10⁴)
- \`nums\` — n space-separated integers

## Sample Input

\`\`\`
5
1 2 3 1 2
\`\`\`

## Expected Output

\`\`\`
2
\`\`\`

At index 2 the left sum is \`1 + 2 = 3\` and the right sum is \`1 + 2 = 3\`.

## Approach — Total Sum + Running Left Sum

Two facts give the whole solution:

1. \`total\` = sum of the entire array — one O(n) pass.
2. While scanning index \`i\` with \`left\` = sum of \`nums[0..i-1]\`, the sum of
   \`nums[i+1..n-1]\` is \`total - left - nums[i]\`.

So index \`i\` is a pivot exactly when

\`\`\`
left == total - left - nums[i]
\`\`\`

**Why the leftmost pivot is returned:** the loop returns as soon as the condition holds,
and it visits indices in increasing order.

**Why the empty sides count as 0:** at index 0 the left sum is 0, and at index \`n - 1\`
the right sum is 0 — the formula handles both without a special case. For a single
element array, \`left = 0\` and \`total - left - nums[0] = 0\`, so index 0 is a pivot.

## Dry Run

Input: \`nums = [1, 2, 3, 1, 2]\`, \`total = 9\`

| Step | \`i\` | \`nums[i]\` | \`left\` before | right = \`total - left - nums[i]\` | pivot? | \`left\` after |
|---:|---:|---:|---:|---:|---|---:|
| 1 | 0 | 1 | 0 | 9 − 0 − 1 = 8 | 0 ≠ 8 → no | 1 |
| 2 | 1 | 2 | 1 | 9 − 1 − 2 = 6 | 1 ≠ 6 → no | 3 |
| 3 | 2 | 3 | 3 | 9 − 3 − 3 = 3 | 3 == 3 → **yes** | 6 |

Answer: **2** ✓ (the loop stops here)

## Java Solution

See [\`PivotIndex.java\`](./PivotIndex.java).

\`\`\`java
public static int pivotIndex(int[] nums) {
    int total = 0;
    for (int value : nums) {
        total += value;
    }
    int left = 0;
    for (int i = 0; i < nums.length; i++) {
        if (left == total - left - nums[i]) {
            return i;
        }
        left += nums[i];
    }
    return -1;
}
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n) | Two passes |
| **Space** | O(1) | Two accumulators |

## Interview Notes

**Follow-ups to raise yourself:**
- *"What if the array is not modified but arrives as a stream?"* → you cannot know the
  total up front, so you need the array twice or a different technique.
- *"Find **all** pivots instead of the leftmost."* → remove the early \`return\` and
  collect all matching indices.
- *"What if the pivot had to satisfy a different condition, e.g. \`left > right\`?"* → the
  same running-sum scan works; just change the comparison.
- *"How does this relate to the prefix-sum table?"* → \`left\` is exactly \`prefix[i]\`, so
  the condition could be written with a precomputed table instead of a running scalar.
- *"What if the array can contain negative numbers?"* → no problem at all — the running
  sum handles negatives; only the "return the leftmost" tie-break needs care.

**Common mistakes:**
- ❌ Forgetting to subtract \`nums[i]\` from the right sum — \`total - left\` includes the
  pivot itself.
- ❌ Updating \`left\` **before** the comparison — then \`left\` would include \`nums[i]\`.
- ❌ Returning the *value* of the pivot instead of its **index**.
- ❌ Returning the rightmost pivot because the loop does not break — the early \`return\`
  is what gives the leftmost one.

**How to narrate:**
> "First I compute the total sum. Then I scan with a running left sum: at each index the
> right sum is total minus left minus the current element, so a pivot is where left
> equals that. I return the first match, which is the leftmost pivot, and -1 if there
> is none. Two passes, O(1) extra space."

## Related Problems

- [Running Sum of 1d Array](RunningSum.md) — the running accumulator
- [Subarray Sum Equals K](SubarraySumEqualsK.md) — prefix sums in a hash map
- [Range Sum Query — Immutable](RangeSumQuery.md) — prefix-sum table queries
`,i=[`pivotIndex`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};