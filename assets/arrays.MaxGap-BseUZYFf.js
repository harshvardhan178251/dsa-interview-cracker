var e=`arrays.MaxGap`,t=`package com.dsa.arrays;

import com.dsa.utils.FastScanner;

import java.util.Arrays;

/**
 * Problem: Maximum Gap
 * LeetCode: 164 | Difficulty: Hard | Frequency: 2/5
 * Pattern: Bucket sort, Pigeonhole bound
 *
 * <p>Problem:
 * Given an unsorted integer array {@code nums}, return the largest gap between two
 * consecutive elements <em>after the array is sorted</em>. The gap is measured as the
 * difference between the two values.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * nums[0] nums[1] ... nums[n-1]
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 6
 * 3 6 9 1 12 5
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 3
 * </pre>
 *
 * <p>Approach: sorting gives O(n log n). The linear bucket approach uses a pigeonhole
 * argument: the average gap is {@code (max - min) / (n - 1)}, so the answer is at least
 * that large, and therefore the two ends of the largest gap cannot sit in the same
 * bucket. Bucketing the values with a bucket width of that average keeps at most n
 * buckets, and the answer is the largest distance between the maximum of one bucket and
 * the minimum of the next non-empty bucket.
 *
 * <p>Complexity: Time O(n), Space O(n).
 */
public class MaxGap {

    /**
     * Returns the largest gap between consecutive values of the sorted array.
     *
     * @param nums the unsorted input array
     * @return the maximum gap
     */
    public static int maxGap(int[] nums) {
        int n = nums.length;
        if (n < 2) {
            return 0;
        }
        int min = Integer.MAX_VALUE;
        int max = Integer.MIN_VALUE;
        for (int value : nums) {
            min = Math.min(min, value);
            max = Math.max(max, value);
        }
        if (min == max) {
            return 0;
        }

        // bucket width = ceil((max - min) / (n - 1)) so that there are at most n buckets
        int bucketSize = (max - min + n - 2) / (n - 1);
        if (bucketSize < 1) {
            bucketSize = 1;
        }
        int bucketCount = (max - min) / bucketSize + 1;

        int[] bucketMin = new int[bucketCount];
        int[] bucketMax = new int[bucketCount];
        Arrays.fill(bucketMin, Integer.MAX_VALUE);
        Arrays.fill(bucketMax, Integer.MIN_VALUE);

        for (int value : nums) {
            int index = (value - min) / bucketSize;
            bucketMin[index] = Math.min(bucketMin[index], value);
            bucketMax[index] = Math.max(bucketMax[index], value);
        }

        int maxGap = 0;
        int previousMax = Integer.MIN_VALUE;
        for (int i = 0; i < bucketCount; i++) {
            if (bucketMin[i] == Integer.MAX_VALUE) {
                continue; // empty bucket
            }
            if (previousMax != Integer.MIN_VALUE) {
                maxGap = Math.max(maxGap, bucketMin[i] - previousMax);
            }
            previousMax = bucketMax[i];
        }
        return maxGap;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] nums = fs.nextIntArray(n);

        System.out.println(maxGap(nums));
    }
}
`,n=`import java.util.Arrays;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

/**
 * Problem: Maximum Gap
 * LeetCode: 164 | Difficulty: Hard | Frequency: 2/5
 * Pattern: Bucket sort, Pigeonhole bound
 *
 * <p>Problem:
 * Given an unsorted integer array {@code nums}, return the largest gap between two
 * consecutive elements <em>after the array is sorted</em>. The gap is measured as the
 * difference between the two values.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * nums[0] nums[1] ... nums[n-1]
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 6
 * 3 6 9 1 12 5
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 3
 * </pre>
 *
 * <p>Approach: sorting gives O(n log n). The linear bucket approach uses a pigeonhole
 * argument: the average gap is {@code (max - min) / (n - 1)}, so the answer is at least
 * that large, and therefore the two ends of the largest gap cannot sit in the same
 * bucket. Bucketing the values with a bucket width of that average keeps at most n
 * buckets, and the answer is the largest distance between the maximum of one bucket and
 * the minimum of the next non-empty bucket.
 *
 * <p>Complexity: Time O(n), Space O(n).
 */
public class Main {

    /**
     * Returns the largest gap between consecutive values of the sorted array.
     *
     * @param nums the unsorted input array
     * @return the maximum gap
     */
    public static int maxGap(int[] nums) {
        int n = nums.length;
        if (n < 2) {
            return 0;
        }
        int min = Integer.MAX_VALUE;
        int max = Integer.MIN_VALUE;
        for (int value : nums) {
            min = Math.min(min, value);
            max = Math.max(max, value);
        }
        if (min == max) {
            return 0;
        }

        // bucket width = ceil((max - min) / (n - 1)) so that there are at most n buckets
        int bucketSize = (max - min + n - 2) / (n - 1);
        if (bucketSize < 1) {
            bucketSize = 1;
        }
        int bucketCount = (max - min) / bucketSize + 1;

        int[] bucketMin = new int[bucketCount];
        int[] bucketMax = new int[bucketCount];
        Arrays.fill(bucketMin, Integer.MAX_VALUE);
        Arrays.fill(bucketMax, Integer.MIN_VALUE);

        for (int value : nums) {
            int index = (value - min) / bucketSize;
            bucketMin[index] = Math.min(bucketMin[index], value);
            bucketMax[index] = Math.max(bucketMax[index], value);
        }

        int maxGap = 0;
        int previousMax = Integer.MIN_VALUE;
        for (int i = 0; i < bucketCount; i++) {
            if (bucketMin[i] == Integer.MAX_VALUE) {
                continue; // empty bucket
            }
            if (previousMax != Integer.MIN_VALUE) {
                maxGap = Math.max(maxGap, bucketMin[i] - previousMax);
            }
            previousMax = bucketMax[i];
        }
        return maxGap;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] nums = fs.nextIntArray(n);

        System.out.println(maxGap(nums));
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
# Maximum Gap — LeetCode 164

| | |
|---|---|
| **Difficulty** | Hard |
| **Pattern** | Bucket sort · Pigeonhole bound |
| **Interview heat** | ★★☆☆☆ |
| **Asked at** | Amazon, Google, Meta, Uber, Twitter |

## Problem Statement

Given an unsorted integer array \`nums\`, return the **largest gap** between two
consecutive elements **after the array is sorted**.

The gap between \`a\` and \`b\` is \`b - a\` (the absolute difference of two adjacent values
in sorted order).

## Input Format

\`\`\`
n
nums[0] nums[1] ... nums[n-1]
\`\`\`

- \`n\` — length of the array (2 ≤ n ≤ 10⁵)
- \`nums\` — n space-separated integers

## Sample Input

\`\`\`
6
3 6 9 1 12 5
\`\`\`

## Expected Output

\`\`\`
3
\`\`\`

Sorted: \`[1, 3, 5, 6, 9, 12]\` → gaps \`2, 2, 1, 3, 3\` → the maximum is **3**.

## Approach — Bucket Sort (O(n))

Sorting gives O(n log n) and is the obvious answer. The interesting part is beating it.

**The pigeonhole argument:**

1. The \`n - 1\` gaps between consecutive sorted elements sum to \`max - min\`. Therefore the
   **average** gap is \`(max - min) / (n - 1)\`, and the maximum gap is **at least** that
   large.
2. Call that average \`w\`. If we place the values into buckets of width \`w\`, the two
   values forming the maximum gap **cannot be in the same bucket** — a bucket's total
   span is strictly less than \`w\` (it is \`w - 1\` for integers), while the maximum gap is
   at least \`w\`.
3. So the answer is found **between** buckets: it is the largest distance between the
   maximum of one bucket and the minimum of the next non-empty bucket.

With \`w = ceil((max - min) / (n - 1))\` the number of buckets is at most \`n\`, so the whole
thing is O(n) time and O(n) space — a linear-time bucket sort.

## Dry Run

Input: \`nums = [3, 6, 9, 1, 12, 5]\`, \`n = 6\`

Setup: \`min = 1\`, \`max = 12\`, \`range = 11\`
\`bucketSize = ceil(11 / 5) = (11 + 6 - 2) / 5 = 3\`, \`bucketCount = 11 / 3 + 1 = 4\`

### Step 1 — distribute the values into buckets

| Step | \`value\` | bucket index \`(value - 1) / 3\` | \`bucketMin\` after | \`bucketMax\` after |
|---:|---:|---:|---|---|
| 1 | 3 | 0 | \`[1, ∞, ∞, ∞]\` | \`[3, -∞, -∞, -∞]\` |
| 2 | 6 | 1 | \`[1, 6, ∞, ∞]\` | \`[3, 6, -∞, -∞]\` |
| 3 | 9 | 2 | \`[1, 6, 9, ∞]\` | \`[3, 6, 9, -∞]\` |
| 4 | 1 | 0 | \`[1, 6, 9, ∞]\` | \`[3, 6, 9, -∞]\` |
| 5 | 12 | 3 | \`[1, 6, 9, 12]\` | \`[3, 6, 9, 12]\` |
| 6 | 5 | 1 | \`[1, 5, 9, 12]\` | \`[3, 6, 9, 12]\` |

### Step 2 — scan the buckets in order

| Bucket | \`bucketMin\` | \`bucketMax\` | empty? | \`previousMax\` | gap = \`min - previousMax\` | \`maxGap\` after |
|---:|---:|---:|---|---:|---:|---:|
| 0 | 1 | 3 | no | — | — | 0 |
| 1 | 5 | 6 | no | 3 | 5 − 3 = **2** | 2 |
| 2 | 9 | 9 | no | 6 | 9 − 6 = **3** | **3** |
| 3 | 12 | 12 | no | 9 | 12 − 9 = **3** | 3 |

Answer: **3** — and indeed the sorted gaps are \`2, 2, 1, 3, 3\`, whose maximum is 3 ✓

## Java Solution

See [\`MaxGap.java\`](./MaxGap.java).

\`\`\`java
public static int maxGap(int[] nums) {
    int n = nums.length;
    if (n < 2) {
        return 0;
    }
    int min = Integer.MAX_VALUE;
    int max = Integer.MIN_VALUE;
    for (int value : nums) {
        min = Math.min(min, value);
        max = Math.max(max, value);
    }
    if (min == max) {
        return 0;
    }

    int bucketSize = (max - min + n - 2) / (n - 1);   // ceil((max - min) / (n - 1))
    if (bucketSize < 1) {
        bucketSize = 1;
    }
    int bucketCount = (max - min) / bucketSize + 1;

    int[] bucketMin = new int[bucketCount];
    int[] bucketMax = new int[bucketCount];
    Arrays.fill(bucketMin, Integer.MAX_VALUE);
    Arrays.fill(bucketMax, Integer.MIN_VALUE);

    for (int value : nums) {
        int index = (value - min) / bucketSize;
        bucketMin[index] = Math.min(bucketMin[index], value);
        bucketMax[index] = Math.max(bucketMax[index], value);
    }

    int maxGap = 0;
    int previousMax = Integer.MIN_VALUE;
    for (int i = 0; i < bucketCount; i++) {
        if (bucketMin[i] == Integer.MAX_VALUE) {
            continue;                                  // empty bucket
        }
        if (previousMax != Integer.MIN_VALUE) {
            maxGap = Math.max(maxGap, bucketMin[i] - previousMax);
        }
        previousMax = bucketMax[i];
    }
    return maxGap;
}
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n) | Two passes plus a scan over at most n buckets |
| **Space** | O(n) | Two bucket arrays of size ≤ n |

**Optimal?** The O(n) bucket sort is the best known comparison-free bound; a comparison
sort can only reach O(n log n) because it must learn the order of the elements.

## Interview Notes

**Follow-ups to raise yourself:**
- *"Can you do it in O(1) space?"* → no, not in general — you need somewhere to record
  the per-bucket extremes. A radix sort is O(n) time with O(n) space as well.
- *"Why is the answer always between two buckets?"* → because a bucket's span is strictly
  smaller than the average gap, and the maximum gap is at least the average gap.
- *"What if the values are floats?"* → the same argument works, but the bucket width and
  the "strictly smaller" reasoning need care with rounding.
- *"What if the array contains duplicates?"* → fine, a bucket may contain equal values;
  the minimum and maximum of a bucket can be equal.
- *"How would you find the *smallest* gap instead?"* → within a bucket the minimum gap
  can be 0; the smallest gap is \`min\` over adjacent values in sorted order, which the
  bucket method can only bound, not compute exactly.

**Common mistakes:**
- ❌ Using \`floor\` instead of \`ceil\` for the bucket size — then a bucket's span can
  reach the average gap and the "different buckets" argument breaks.
- ❌ Forgetting to skip **empty** buckets — the gap between two empty/non-adjacent
  buckets would be meaningless and can be negative.
- ❌ Forgetting the \`min == max\` case (all values equal) — \`bucketSize\` would be 0 and
  the division by \`bucketSize\` would throw an \`ArithmeticException\`.
- ❌ Computing the gap as \`bucketMin[i] - bucketMax[i]\` (within a bucket) instead of
  \`bucketMin[i] - previousMax\` (across buckets).

**How to narrate:**
> "Sorting is O(n log n), but I can do better with a pigeonhole argument. The n-1 gaps
> sum to max - min, so the average gap is (max - min)/(n-1) and the answer is at least
> that big. If I bucket the values with that width, the two ends of the largest gap must
> live in different buckets, so the answer is the biggest distance between the max of
> one bucket and the min of the next. With at most n buckets that's O(n) time."

## Related Problems

- [Minimum Absolute Difference](MinimumAbsoluteDifference.md) — the smallest adjacent gap
- [Find Minimum and Maximum Element](FindMinimumAndMaximumElement.md) — a single-pass scan
- [Maximum Width Ramp](MaximumWidthRamp.md) — monotonic stack, linear time
`,i=[`maxGap`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};