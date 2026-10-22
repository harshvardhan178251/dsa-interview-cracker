var e=`arrays.MinimumAbsoluteDifference`,t=`package com.dsa.arrays;

import com.dsa.utils.FastScanner;

import java.util.Arrays;

/**
 * Problem: Minimum Absolute Difference
 * LeetCode: 1200 | Difficulty: Medium | Frequency: 2/5
 * Pattern: Sorting, Adjacent pair scan
 *
 * <p>Problem:
 * Given an integer array {@code nums}, return the smallest absolute difference between
 * any two <em>distinct</em> elements of the array. (LeetCode 1200 asks for the values
 * themselves; this variant returns the difference.)
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
 * 4 2 1 3 5
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 1
 * </pre>
 *
 * <p>Approach: after sorting, the closest pair must be adjacent — if two values were
 * the closest but not adjacent, the values between them would be even closer. So one
 * sort plus a single linear scan over the sorted array gives the answer.
 *
 * <p>Complexity: Time O(n log n), Space O(n) for the sorted copy.
 */
public class MinimumAbsoluteDifference {

    /**
     * Returns the smallest absolute difference between two distinct elements.
     *
     * @param nums the input array (at least two elements)
     * @return the smallest absolute difference, or 0 when fewer than two elements exist
     */
    public static int minimumAbsoluteDifference(int[] nums) {
        if (nums.length < 2) {
            return 0;
        }
        int[] sorted = nums.clone();
        Arrays.sort(sorted);
        int best = Integer.MAX_VALUE;
        for (int i = 1; i < sorted.length; i++) {
            best = Math.min(best, sorted[i] - sorted[i - 1]);
        }
        return best;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] nums = fs.nextIntArray(n);

        System.out.println(minimumAbsoluteDifference(nums));
    }
}
`,n=`import java.util.Arrays;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

/**
 * Problem: Minimum Absolute Difference
 * LeetCode: 1200 | Difficulty: Medium | Frequency: 2/5
 * Pattern: Sorting, Adjacent pair scan
 *
 * <p>Problem:
 * Given an integer array {@code nums}, return the smallest absolute difference between
 * any two <em>distinct</em> elements of the array. (LeetCode 1200 asks for the values
 * themselves; this variant returns the difference.)
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
 * 4 2 1 3 5
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 1
 * </pre>
 *
 * <p>Approach: after sorting, the closest pair must be adjacent — if two values were
 * the closest but not adjacent, the values between them would be even closer. So one
 * sort plus a single linear scan over the sorted array gives the answer.
 *
 * <p>Complexity: Time O(n log n), Space O(n) for the sorted copy.
 */
public class Main {

    /**
     * Returns the smallest absolute difference between two distinct elements.
     *
     * @param nums the input array (at least two elements)
     * @return the smallest absolute difference, or 0 when fewer than two elements exist
     */
    public static int minimumAbsoluteDifference(int[] nums) {
        if (nums.length < 2) {
            return 0;
        }
        int[] sorted = nums.clone();
        Arrays.sort(sorted);
        int best = Integer.MAX_VALUE;
        for (int i = 1; i < sorted.length; i++) {
            best = Math.min(best, sorted[i] - sorted[i - 1]);
        }
        return best;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] nums = fs.nextIntArray(n);

        System.out.println(minimumAbsoluteDifference(nums));
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
# Minimum Absolute Difference — LeetCode 1200

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Sorting · Adjacent pair scan |
| **Interview heat** | ★★☆☆☆ |
| **Asked at** | Amazon, Google, Meta |

## Problem Statement

Given an integer array \`nums\`, return the **smallest absolute difference** between any
two **distinct** elements of the array.

LeetCode 1200 asks for the two *values*; this variant returns the **difference** itself.

## Input Format

\`\`\`
n
nums[0] nums[1] ... nums[n-1]
\`\`\`

- \`n\` — length of the array (2 ≤ n ≤ 10⁵)
- \`nums\` — n space-separated integers

## Sample Input

\`\`\`
5
4 2 1 3 5
\`\`\`

## Expected Output

\`\`\`
1
\`\`\`

\`1\` and \`2\` differ by \`1\`.

## Approach — Sort, then Look at the Neighbours

**Key insight:** once the array is sorted, the closest pair is always **adjacent**.

*Proof.* Suppose \`sorted[i]\` and \`sorted[j]\` (with \`i < j\`) form the closest pair but are
not adjacent. Then \`j > i + 1\`, and \`sorted[i+1]\` lies between them, so
\`sorted[i+1] - sorted[i] < sorted[j] - sorted[i]\` — a strictly smaller difference, a
contradiction.

So the algorithm is:

1. Sort the values.
2. Scan adjacent pairs and keep the smallest difference.

**Time:** the sort dominates → O(n log n). **Space:** O(n) for the sorted copy (a
\`sort\` in place would be O(1) extra space but mutates the input).

**Lower bound:** finding the minimum absolute difference is equivalent to checking
whether two equal values exist when the threshold is 0, so it is at least as hard as the
duplicate-detection problem, which is O(n) with hashing. O(n log n) via sorting is the
practical answer; the bucket technique from
[Maximum Gap](MaxGap.md) gives O(n) but only bounds the gap — it cannot compute the
minimum exactly.

## Dry Run

Input: \`nums = [4, 2, 1, 3, 5]\`

### Step 1 — sort

| Step | array before | array after |
|---:|---|---|
| 1 | \`[4, 2, 1, 3, 5]\` | \`[1, 2, 3, 4, 5]\` |

### Step 2 — scan adjacent pairs

| Step | \`i\` | \`sorted[i-1]\` | \`sorted[i]\` | difference | \`best\` before | \`best\` after |
|---:|---:|---:|---:|---:|---:|---:|
| 1 | 1 | 1 | 2 | 1 | ∞ | 1 |
| 2 | 2 | 2 | 3 | 1 | 1 | 1 |
| 3 | 3 | 3 | 4 | 1 | 1 | 1 |
| 4 | 4 | 4 | 5 | 1 | 1 | 1 |

Answer: **1**

## Java Solution

See [\`MinimumAbsoluteDifference.java\`](./MinimumAbsoluteDifference.java).

\`\`\`java
public static int minimumAbsoluteDifference(int[] nums) {
    if (nums.length < 2) {
        return 0;
    }
    int[] sorted = nums.clone();
    Arrays.sort(sorted);
    int best = Integer.MAX_VALUE;
    for (int i = 1; i < sorted.length; i++) {
        best = Math.min(best, sorted[i] - sorted[i - 1]);
    }
    return best;
}
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n log n) | The sort dominates; the scan is O(n) |
| **Space** | O(n) | A sorted copy of the input |

## Interview Notes

**Follow-ups to raise yourself:**
- *"Return the two values, not the difference."* → remember the indices of the best pair
  while scanning.
- *"Can you do it in O(n)?"* → with a hash set: bucket the values by their range and
  check only the neighbouring buckets (this is how you find the minimum difference in
  O(n) with bounded integers).
- *"What if the array is already sorted?"* → skip the sort entirely, O(n).
- *"What if the array is huge and cannot be copied?"* → sort in place with
  \`Arrays.sort(nums)\` and accept the mutation.
- *"How does this relate to the duplicate-detection problem?"* → the minimum difference
  is 0 exactly when a duplicate exists, so this problem is at least as hard as finding
  duplicates.

**Common mistakes:**
- ❌ Comparing every pair instead of only adjacent ones after sorting — O(n²) and, more
  importantly, it hides the insight.
- ❌ Forgetting to **sort a copy** and accidentally returning a result on unsorted data.
- ❌ Initialising \`best\` to \`0\` instead of \`Integer.MAX_VALUE\` — the answer would always
  be 0.
- ❌ Using \`Math.abs\` on the difference of *unsorted* neighbours — after sorting the
  difference is already non-negative.

**How to narrate:**
> "After sorting, the closest pair must be adjacent — otherwise the value in between
> would be even closer. So I sort and then scan the neighbouring pairs, keeping the
> smallest difference. That's O(n log n) time and O(n) space for the sorted copy, and I
> never mutate the caller's array."

## Related Problems

- [Maximum Gap](MaxGap.md) — the largest adjacent gap, in linear time
- [Find Minimum and Maximum Element](FindMinimumAndMaximumElement.md) — the O(n) scan
- [Missing Number](MissingNumber.md) — a closed-form scan
`,i=[`minimumAbsoluteDifference`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};