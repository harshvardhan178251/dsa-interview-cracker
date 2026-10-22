var e=`dynamicprogramming.MaximumProductSubarray`,t=`package com.dsa.dynamicprogramming;

import com.dsa.utils.FastScanner;

/**
 * Problem: Maximum Product Subarray
 * LeetCode: 152 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Bottom-up DP, State compression
 *
 * <p>Problem: Return the largest product of a **contiguous** non-empty subarray of an integer array.
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
 * 2 3 -2 4
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 6
 * </pre>
 *
 * <p>Approach: Keep the maximum **and** the minimum product ending at each position, because a negative number turns the minimum into the maximum.
 *
 * <p>Complexity: Time O(n), Space O(1).
 */
public class MaximumProductSubarray {

    /**
     * Returns the largest product of a contiguous non-empty subarray.
     *
     * <p>A negative number flips the sign, so the smallest product ending at a position can become the
     * largest one after multiplying by the next element. Both extremes are therefore tracked.
     *
     * @param nums the input array
     * @return the maximum product of a contiguous subarray
     */
    public static int maxProduct(int[] nums) {
        int best = nums[0];
        int maxEnding = nums[0]; // largest product of a subarray ending here
        int minEnding = nums[0]; // smallest product of a subarray ending here

        for (int i = 1; i < nums.length; i++) {
            int value = nums[i];
            int candidateMax = Math.max(value, Math.max(maxEnding * value, minEnding * value));
            int candidateMin = Math.min(value, Math.min(maxEnding * value, minEnding * value));
            maxEnding = candidateMax;
            minEnding = candidateMin;
            best = Math.max(best, maxEnding);
        }
        return best;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] nums = fs.nextIntArray(n);

        System.out.println(maxProduct(nums));
    }
}
`,n=`import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

/**
 * Problem: Maximum Product Subarray
 * LeetCode: 152 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Bottom-up DP, State compression
 *
 * <p>Problem: Return the largest product of a **contiguous** non-empty subarray of an integer array.
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
 * 2 3 -2 4
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 6
 * </pre>
 *
 * <p>Approach: Keep the maximum **and** the minimum product ending at each position, because a negative number turns the minimum into the maximum.
 *
 * <p>Complexity: Time O(n), Space O(1).
 */
public class Main {

    /**
     * Returns the largest product of a contiguous non-empty subarray.
     *
     * <p>A negative number flips the sign, so the smallest product ending at a position can become the
     * largest one after multiplying by the next element. Both extremes are therefore tracked.
     *
     * @param nums the input array
     * @return the maximum product of a contiguous subarray
     */
    public static int maxProduct(int[] nums) {
        int best = nums[0];
        int maxEnding = nums[0]; // largest product of a subarray ending here
        int minEnding = nums[0]; // smallest product of a subarray ending here

        for (int i = 1; i < nums.length; i++) {
            int value = nums[i];
            int candidateMax = Math.max(value, Math.max(maxEnding * value, minEnding * value));
            int candidateMin = Math.min(value, Math.min(maxEnding * value, minEnding * value));
            maxEnding = candidateMax;
            minEnding = candidateMin;
            best = Math.max(best, maxEnding);
        }
        return best;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] nums = fs.nextIntArray(n);

        System.out.println(maxProduct(nums));
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
# Maximum Product Subarray — LeetCode 152

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Bottom-up DP · State compression |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Uber |

## Problem Statement

Given an integer array \`nums\`, find the contiguous non-empty subarray with the **largest** product and return that product.

- \`nums[i]\` — the values of the array (they may be negative)

## Input Format

The program reads from standard input:

\`\`\`
n
nums[0] nums[1] ... nums[n-1]
\`\`\`

- \`n\` — length of the array (1 ≤ n ≤ 10⁴)
- \`nums\` — n space-separated integers

## Sample Input

\`\`\`
4
2 3 -2 4
\`\`\`

## Expected Output

\`\`\`
6
\`\`\`

The subarray \`2, 3\` has the product \`6\` — the largest one.

## Approach

The Maximum Subarray sum needs only one state; the product needs **two**:

- \`maxEnding\` — the largest product of a subarray that ends at the current position.
- \`minEnding\` — the smallest product of a subarray that ends at the current position.

Why both? Multiplying a negative product by a negative number turns it into a large positive one. So when the next value is negative, the *minimum* running product can become the new maximum. Concretely, for the next value \`v\` the subarray ending here is one of:

1. just \`v\` (start a new subarray),
2. \`maxEnding × v\` (extend the best one),
3. \`minEnding × v\` (extend the worst one — the one that may flip to the best).

\`newMax = max(v, maxEnding × v, minEnding × v)\` and \`newMin = min(v, maxEnding × v, minEnding × v)\`.
Both new values must be computed **before** overwriting the old ones.

## Dry Run

Input: \`nums = [2, 3, -2, 4]\`.

| \`i\` | \`nums[i]\` | \`maxEnding × v\` | \`minEnding × v\` | new \`maxEnding\` | new \`minEnding\` | \`best\` |
|---:|---:|---:|---:|---:|---:|---:|
| 0 | 2 | — | — | 2 | 2 | 2 |
| 1 | 3 | 2 × 3 = 6 | 2 × 3 = 6 | max(3, 6, 6) = 6 | min(3, 6, 6) = 3 | 6 |
| 2 | −2 | 6 × −2 = −12 | 3 × −2 = −6 | max(−2, −12, −6) = −2 | min(−2, −12, −6) = −12 | 6 |
| 3 | 4 | −2 × 4 = −8 | −12 × 4 = −48 | max(4, −8, −48) = 4 | min(4, −8, −48) = −48 | 6 |

\`best = 6\` → answer **6**.

**Where the sign flip pays off.** In \`nums = [-2, 3, -4]\`:

| \`i\` | \`nums[i]\` | new \`maxEnding\` | new \`minEnding\` |
|---:|---:|---:|---:|
| 0 | −2 | −2 | −2 |
| 1 | 3 | max(3, −6, −6) = 3 | min(3, −6, −6) = −6 |
| 2 | −4 | max(−4, −12, 24) = **24** | min(−4, −12, 24) = −12 |

The minimum \`−6\` times \`−4\` gives the maximum \`24\` — tracking only the maximum would have answered \`3\`.

**Zeros.** A zero resets both running products to \`0\` and the next element starts a fresh subarray, which the "just \`v\`" candidate already covers.

## Java Solution

See [\`MaximumProductSubarray.java\`](./MaximumProductSubarray.java).

\`\`\`java
    public static int maxProduct(int[] nums) {
        int best = nums[0];
        int maxEnding = nums[0];
        int minEnding = nums[0];

        for (int i = 1; i < nums.length; i++) {
            int value = nums[i];
            int candidateMax = Math.max(value, Math.max(maxEnding * value, minEnding * value));
            int candidateMin = Math.min(value, Math.min(maxEnding * value, minEnding * value));
            maxEnding = candidateMax;
            minEnding = candidateMin;
            best = Math.max(best, maxEnding);
        }
        return best;
    }
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n) | one pass over the array |
| **Space** | O(1) | three integers |

**Space \`O(1)\`.** A DP array is not needed — only the previous step is used.

## Interview Notes

**Follow-ups to raise yourself:**

- "What if you had to return the subarray itself?"* → remember the start index of the best run.
- "Why is the brute force \`O(n²)\` wrong here?"* → it is not wrong, but \`O(n)\` is better.
- "What is the difference to Maximum Subarray?"* → that one needs a single state because addition never flips the sign.
- "What if the array contained only positives?"* → then the answer is simply the product of the whole array, and the DP is overkill.

**Common mistakes:**

- ❌ Tracking only the maximum running product — a negative run can turn into the maximum.
- ❌ Updating \`maxEnding\` before computing \`minEnding\`, so the second update uses the new value.
- ❌ Returning \`maxEnding\` at the end instead of the running \`best\` over all positions.
- ❌ Forgetting that the subarray may not be empty (the answer is \`nums[0]\` for a one-element array).

**How to narrate:**

> "Because a negative number flips the sign, the smallest product ending at a position can become the largest one. So I keep both the maximum and the minimum running product, and at each step the new subarray either starts at this element or extends one of the two running products. The answer is the best maximum seen along the way."

## Related Problems

- [House Robber — LeetCode 198](./HouseRobber.java) — one-state take-or-skip DP
- [MinimumJumpSteps — LeetCode 45](./MinimumJumpSteps.java) — another O(n) scan
`,i=[`maxProduct`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};