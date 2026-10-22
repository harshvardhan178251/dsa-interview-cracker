var e=`arrays.MaxSubarray`,t=`package com.dsa.arrays;

import com.dsa.utils.FastScanner;

/**
 * Problem: Maximum Subarray
 * LeetCode: 53 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Dynamic programming, Kadane's algorithm
 *
 * <p>Problem:
 * Given an integer array {@code nums}, find the contiguous non-empty subarray with the
 * largest sum and return that sum.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * nums[0] nums[1] ... nums[n-1]
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 7
 * -2 1 -3 4 -1 2 1
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 6
 * </pre>
 *
 * <p>Approach: Kadane's algorithm. {@code current} is the best sum of a subarray that ends
 * at the current position; at every index we either extend the previous subarray or start
 * a fresh one at this element, whichever is larger. {@code best} remembers the global
 * maximum seen so far.
 *
 * <p>Complexity: Time O(n), Space O(1).
 */
public class MaxSubarray {

    /**
     * Returns the largest sum obtainable from a contiguous subarray.
     *
     * @param nums the input array
     * @return the maximum subarray sum, or 0 for an empty array
     */
    public static int maxSubarraySum(int[] nums) {
        if (nums.length == 0) {
            return 0;
        }
        int best = nums[0];
        int current = nums[0];
        for (int i = 1; i < nums.length; i++) {
            current = Math.max(nums[i], current + nums[i]);
            best = Math.max(best, current);
        }
        return best;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] nums = fs.nextIntArray(n);

        System.out.println(maxSubarraySum(nums));
    }
}
`,n=`import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

/**
 * Problem: Maximum Subarray
 * LeetCode: 53 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Dynamic programming, Kadane's algorithm
 *
 * <p>Problem:
 * Given an integer array {@code nums}, find the contiguous non-empty subarray with the
 * largest sum and return that sum.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * nums[0] nums[1] ... nums[n-1]
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 7
 * -2 1 -3 4 -1 2 1
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 6
 * </pre>
 *
 * <p>Approach: Kadane's algorithm. {@code current} is the best sum of a subarray that ends
 * at the current position; at every index we either extend the previous subarray or start
 * a fresh one at this element, whichever is larger. {@code best} remembers the global
 * maximum seen so far.
 *
 * <p>Complexity: Time O(n), Space O(1).
 */
public class Main {

    /**
     * Returns the largest sum obtainable from a contiguous subarray.
     *
     * @param nums the input array
     * @return the maximum subarray sum, or 0 for an empty array
     */
    public static int maxSubarraySum(int[] nums) {
        if (nums.length == 0) {
            return 0;
        }
        int best = nums[0];
        int current = nums[0];
        for (int i = 1; i < nums.length; i++) {
            current = Math.max(nums[i], current + nums[i]);
            best = Math.max(best, current);
        }
        return best;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] nums = fs.nextIntArray(n);

        System.out.println(maxSubarraySum(nums));
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
# Maximum Subarray — LeetCode 53

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Dynamic programming · Kadane's algorithm |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Uber, Microsoft, Adobe |

## Problem Statement

Given an integer array \`nums\`, find the contiguous **non-empty** subarray with the largest
sum and return that sum.

## Input Format

\`\`\`
n
nums[0] nums[1] ... nums[n-1]
\`\`\`

- \`n\` — length of the array (1 ≤ n ≤ 10⁵)
- \`nums\` — n space-separated integers

## Sample Input

\`\`\`
7
-2 1 -3 4 -1 2 1
\`\`\`

## Expected Output

\`\`\`
6
\`\`\`

The subarray \`[4, -1, 2, 1]\` sums to \`6\`.

## Approach — Kadane's Algorithm

A brute-force solution enumerates every subarray: **O(n³)** with a naive sum, **O(n²)**
with prefix sums. Kadane reduces it to **O(n)**.

Define:

- \`current\` — the largest sum of a subarray that **ends at** the current index
- \`best\` — the largest sum seen anywhere so far

At index \`i\` a subarray ending at \`i\` is either:

1. \`nums[i]\` alone (start fresh), or
2. the best subarray ending at \`i-1\`, extended by \`nums[i]\`

So:

\`\`\`
current = max(nums[i], current + nums[i])
best    = max(best, current)
\`\`\`

**Why this is enough:** the recurrence only ever needs the *previous* value of \`current\`,
so a single scalar replaces a whole DP table. That is what turns O(n) time into O(n) time
with O(1) space instead of O(n) space.

**The all-negative case** is handled automatically: \`current\` is seeded with \`nums[0]\`,
not with \`0\`, so a negative array returns its largest (least negative) element rather
than \`0\`.

## Dry Run

Input: \`nums = [-2, 1, -3, 4, -1, 2, 1]\`

| Step | i | \`nums[i]\` | \`current\` before | \`current + nums[i]\` | \`current\` after | \`best\` after | note |
|---:|---:|---:|---:|---:|---:|---:|---|
| 1 | 0 | −2 | — (seed) | — | −2 | −2 | seed with \`nums[0]\`, not 0 |
| 2 | 1 | 1 | −2 | −1 | max(1, −1) = 1 | 1 | restart beats extending |
| 3 | 2 | −3 | 1 | −2 | max(−3, −2) = −2 | 1 | keep the best so far |
| 4 | 3 | 4 | −2 | 2 | max(4, 2) = 4 | 4 | extending beats restarting |
| 5 | 4 | −1 | 4 | 3 | max(−1, 3) = 3 | 4 | |
| 6 | 5 | 2 | 3 | 5 | max(2, 5) = 5 | 5 | |
| 7 | 6 | 1 | 5 | 6 | max(1, 6) = 6 | 6 | best = 6 ✔ |

Answer: **6**

## Java Solution

See [\`MaxSubarray.java\`](./MaxSubarray.java).

\`\`\`java
public static int maxSubarraySum(int[] nums) {
    if (nums.length == 0) {
        return 0;
    }
    int best = nums[0];
    int current = nums[0];
    for (int i = 1; i < nums.length; i++) {
        current = Math.max(nums[i], current + nums[i]);
        best = Math.max(best, current);
    }
    return best;
}
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n) | One pass, constant work per element |
| **Space** | O(1) | Two scalars replace the DP table |

## Interview Notes

**Follow-ups to raise yourself:**
- *"Return the indices of the subarray too."* → also track the start index and reset it
  whenever \`current\` restarts.
- *"What if the array is empty?"* → return \`0\` (the problem guarantees non-empty, but
  interview code should be defensive).
- *"What if the array is circular?"* → see
  [Maximum Circular Subarray](MaxCircularSubarray.md).
- *"How would you solve it if you had to return the subarray itself?"* → same algorithm,
  but keep a \`bestStart\` / \`bestLength\` pair.
- *"Is there a divide-and-conquer solution?"* → yes, the classic O(n log n) divide and
  conquer that returns the crossing subarray; Kadane is strictly better here.

**Common mistakes:**
- ❌ Seeding \`current\` and \`best\` with \`0\` — the all-negative array then wrongly returns
  \`0\` instead of the largest element.
- ❌ Using \`current = current + nums[i]\` without the \`max\` against \`nums[i]\` — that keeps
  a stale negative prefix and loses the "restart here" option.
- ❌ Returning \`current\` instead of \`best\` — \`current\` is the best sum *ending at the
  last index*, which is not the same thing.

**How to narrate:**
> "For each index I ask: what's the best subarray that ends here? It's either the single
> current element or the best subarray ending at the previous index plus this element.
> That recurrence only depends on the previous value, so I can keep it in one variable
> instead of a DP table. I track the global best in a second variable and return it."

## Related Problems

- [Maximum Circular Subarray](MaxCircularSubarray.md) — the circular variant
- [Maximum Width Ramp](MaximumWidthRamp.md) — a monotonic-stack scan with the same spirit
- [Best Time to Buy and Sell Stock II](BestTimeToBuyAndSellStockII.md) — sum of positive rises
- [Contiguous Array](../../../../../../docs/topics/12-prefixsum.md) — prefix sums with a hash map
`,i=[`maxSubarraySum`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};