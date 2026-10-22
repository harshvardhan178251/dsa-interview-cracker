var e=`arrays.MaxCircularSubarray`,t=`package com.dsa.arrays;

import com.dsa.utils.FastScanner;

/**
 * Problem: Maximum Circular Subarray
 * LeetCode: 134 | Difficulty: Medium | Frequency: 2/5
 * Pattern: Kadane's algorithm, Complement trick
 *
 * <p>Problem:
 * Given a circular array of integers {@code nums}, find the maximum sum of a non-empty
 * contiguous subarray of the circular array. A circular array means that the last element
 * is adjacent to the first element.
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
 * 5 -3 5 -2 3
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 11
 * </pre>
 *
 * <p>Approach: the best circular subarray is either (a) an ordinary subarray, or (b) a
 * suffix followed by a prefix of the array, which is the complement of an ordinary
 * subarray. So the answer is {@code max(maxSubarray, total - minSubarray)}. The
 * {@code total - minSubarray} case is only valid when the array is not all negative.
 *
 * <p>Complexity: Time O(n), Space O(1).
 */
public class MaxCircularSubarray {

    /**
     * Returns the largest sum of any non-empty contiguous subarray of the circular array.
     *
     * @param nums the circular input array
     * @return the maximum circular subarray sum, or 0 for an empty array
     */
    public static int maxCircularSubarraySum(int[] nums) {
        if (nums.length == 0) {
            return 0;
        }
        int total = 0;
        int maxSum = nums[0];
        int minSum = nums[0];
        int currentMax = 0;
        int currentMin = 0;
        for (int value : nums) {
            total += value;
            currentMax = Math.max(value, currentMax + value);
            maxSum = Math.max(maxSum, currentMax);
            currentMin = Math.min(value, currentMin + value);
            minSum = Math.min(minSum, currentMin);
        }
        if (maxSum < 0) {
            return maxSum; // every element is negative: the best answer is the largest one
        }
        return Math.max(maxSum, total - minSum);
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] nums = fs.nextIntArray(n);

        System.out.println(maxCircularSubarraySum(nums));
    }
}
`,n=`import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

/**
 * Problem: Maximum Circular Subarray
 * LeetCode: 134 | Difficulty: Medium | Frequency: 2/5
 * Pattern: Kadane's algorithm, Complement trick
 *
 * <p>Problem:
 * Given a circular array of integers {@code nums}, find the maximum sum of a non-empty
 * contiguous subarray of the circular array. A circular array means that the last element
 * is adjacent to the first element.
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
 * 5 -3 5 -2 3
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 11
 * </pre>
 *
 * <p>Approach: the best circular subarray is either (a) an ordinary subarray, or (b) a
 * suffix followed by a prefix of the array, which is the complement of an ordinary
 * subarray. So the answer is {@code max(maxSubarray, total - minSubarray)}. The
 * {@code total - minSubarray} case is only valid when the array is not all negative.
 *
 * <p>Complexity: Time O(n), Space O(1).
 */
public class Main {

    /**
     * Returns the largest sum of any non-empty contiguous subarray of the circular array.
     *
     * @param nums the circular input array
     * @return the maximum circular subarray sum, or 0 for an empty array
     */
    public static int maxCircularSubarraySum(int[] nums) {
        if (nums.length == 0) {
            return 0;
        }
        int total = 0;
        int maxSum = nums[0];
        int minSum = nums[0];
        int currentMax = 0;
        int currentMin = 0;
        for (int value : nums) {
            total += value;
            currentMax = Math.max(value, currentMax + value);
            maxSum = Math.max(maxSum, currentMax);
            currentMin = Math.min(value, currentMin + value);
            minSum = Math.min(minSum, currentMin);
        }
        if (maxSum < 0) {
            return maxSum; // every element is negative: the best answer is the largest one
        }
        return Math.max(maxSum, total - minSum);
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] nums = fs.nextIntArray(n);

        System.out.println(maxCircularSubarraySum(nums));
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
# Maximum Circular Subarray — LeetCode 134

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Kadane's algorithm · Complement trick |
| **Interview heat** | ★★☆☆☆ |
| **Asked at** | Amazon, Google, Meta, Uber |

## Problem Statement

Given a **circular** array \`nums\` — the element after the last one is the first one —
find the maximum sum of a non-empty contiguous subarray of the circular array.

A circular subarray may wrap around: the last two elements followed by the first one.

## Input Format

\`\`\`
n
nums[0] nums[1] ... nums[n-1]
\`\`\`

- \`n\` — length of the array (1 ≤ n ≤ 10⁵)
- \`nums\` — n space-separated integers

## Sample Input

\`\`\`
5
5 -3 5 -2 3
\`\`\`

## Expected Output

\`\`\`
11
\`\`\`

The winning subarray wraps around the end of the array: starting at index 2 it reads
\`5, -2, 3\` and then continues at index 0 with \`5\` → \`5 - 2 + 3 + 5 = 11\`.

## Approach — Kadane plus its Complement

Every circular subarray falls into one of two families:

1. **Does not wrap.** Then it is an ordinary subarray → covered by \`maxSubarray\`.
2. **Wraps.** Then it is a *suffix* of the array followed by a *prefix*. The elements it
   skips form an ordinary (contiguous) subarray in the middle. So a wrapping subarray's
   sum is \`total − (sum of the skipped middle subarray)\`.

To maximise a wrapping sum we must **minimise** the skipped middle sum. That is exactly
the *minimum* subarray sum — the same Kadane recurrence with \`min\` instead of \`max\`.

Therefore:

\`\`\`
answer = max(maxSubarraySum, total - minSubarraySum)
\`\`\`

**The one special case:** if every element is negative, \`total - minSubarraySum\` would be
\`0\` (skip everything), which is not a valid non-empty answer. Guard with
\`if (maxSum < 0) return maxSum;\` — the answer is then the largest single element.

## Dry Run

Input: \`nums = [5, -3, 5, -2, 3]\`

First pass — running maximum and running minimum together:

| Step | i | \`value\` | \`total\` | \`currentMax\` → | \`maxSum\` | \`currentMin\` → | \`minSum\` |
|---:|---:|---:|---:|---:|---:|---:|---:|
| 1 | 0 | 5 | 5 | max(5, 0+5) = 5 | 5 | min(5, 0+5) = 5 | 5 |
| 2 | 1 | −3 | 2 | max(−3, 5−3) = 2 | 5 | min(−3, 5−3) = −3 | −3 |
| 3 | 2 | 5 | 7 | max(5, 2+5) = 7 | 7 | min(5, −3+5) = 2 | −3 |
| 4 | 3 | −2 | 5 | max(−2, 7−2) = 5 | 7 | min(−2, 2−2) = −2 | −3 |
| 5 | 4 | 3 | 8 | max(3, 5+3) = 8 | 8 | min(3, −2+3) = 1 | −3 |

Now the two candidates:

| Candidate | Value | Meaning |
|---|---:|---|
| \`maxSum\` | 8 | best ordinary (non-wrapping) subarray |
| \`total - minSum\` = 8 − (−3) | 11 | skip the middle \`[-3]\`, keep indices \`2,3,4\` then wrap to index \`0\` |
| **answer** | **11** | \`max(8, 11)\` |

The winning subarray wraps: indices \`2, 3, 4, 0\` → \`5, -2, 3, 5\` = **11** ✓
(the complement of the minimum subarray \`[-3]\` at index 1).

## Java Solution

See [\`MaxCircularSubarray.java\`](./MaxCircularSubarray.java).

\`\`\`java
public static int maxCircularSubarraySum(int[] nums) {
    if (nums.length == 0) {
        return 0;
    }
    int total = 0;
    int maxSum = nums[0];
    int minSum = nums[0];
    int currentMax = 0;
    int currentMin = 0;
    for (int value : nums) {
        total += value;
        currentMax = Math.max(value, currentMax + value);
        maxSum = Math.max(maxSum, currentMax);
        currentMin = Math.min(value, currentMin + value);
        minSum = Math.min(minSum, currentMin);
    }
    if (maxSum < 0) {
        return maxSum; // all elements are negative
    }
    return Math.max(maxSum, total - minSum);
}
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n) | One pass computes max, min and total together |
| **Space** | O(1) | Four scalars |

## Interview Notes

**Follow-ups to raise yourself:**
- *"What if the array were circular in both directions?"* → the same complement trick
  applies, but the skipped region can be a middle block; the bound is still
  \`max(maxSubarray, total - minSubarray)\`.
- *"Can you reuse a \`maxSubarray\` helper?"* → yes: call it twice, once on the array and
  once on the negated array (min of \`x\` = −max of \`−x\`).
- *"How would you return the actual subarray?"* → track the start index in both the max
  and min passes and rebuild the wrapped interval.
- *"What if the array contains only zeros?"* → \`maxSum = 0\`, \`minSum = 0\` → answer \`0\`.

**Common mistakes:**
- ❌ Forgetting the **all-negative guard** — the formula returns \`0\` for \`[-3, -1, -2]\`
  but the correct answer is \`-1\`.
- ❌ Computing the min subarray with a *separate* pass and mixing up the running
  variables — one pass with both accumulators is simpler and less error-prone.
- ❌ Forgetting that \`total - minSum\` may pick an *empty* complement; the \`maxSum < 0\`
  check is exactly the guard for that.

**How to narrate:**
> "A circular subarray either doesn't wrap, in which case plain Kadane covers it, or it
> wraps, in which case it's the whole array minus some middle subarray. So I run the
> same recurrence twice — once for the max and once for the min — and take the better of
> \`maxSum\` and \`total - minSum\`. I also guard the all-negative case, because skipping
> everything would give an empty subarray."

## Related Problems

- [Maximum Subarray](MaxSubarray.md) — the non-circular base case
- [Maximum Gap](MaxGap.md) — bucket sort on the same array family
- [Product of Array Except Self](../../../../../../docs/topics/12-prefixsum.md) — prefix/suffix products instead of sums
`,i=[`maxCircularSubarraySum`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};