var e=`dynamicprogramming.PartitionEqualSubsetSum`,t=`package com.dsa.dynamicprogramming;

import com.dsa.utils.FastScanner;

/**
 * Problem: Partition Equal Subset Sum
 * LeetCode: 416 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Subset-sum DP, 0/1 knapsack
 *
 * <p>Problem: Decide whether a multiset of numbers can be split into two subsets with the same sum.
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
 * 1 5 11 5
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 1
 * </pre>
 *
 * <p>Approach: Look for a subset whose sum is exactly half of the total -- that is a 0/1 subset-sum DP.
 *
 * <p>Complexity: Time O(n x S), Space O(S).
 */
public class PartitionEqualSubsetSum {

    /**
     * Decides whether {@code nums} can be split into two subsets of equal sum.
     *
     * <p>The total must be even; then the question is whether some subset sums to exactly half of it.
     * That is the classic 0/1 subset-sum problem, solved with a one-dimensional table that is updated
     * from high to low so that every element is used at most once.
     *
     * @param nums the values to partition
     * @return {@code true} when an equal-sum partition exists
     */
    public static boolean canPartition(int[] nums) {
        if (nums.length == 0) {
            return false; // there is nothing to partition
        }
        int total = 0;
        for (int value : nums) {
            total += value;
        }
        if ((total & 1) != 0) {
            return false; // an odd total can never be split in half
        }
        int target = total / 2;

        boolean[] reachable = new boolean[target + 1];
        reachable[0] = true;

        for (int value : nums) {
            for (int sum = target; sum >= value; sum--) {
                reachable[sum] = reachable[sum] || reachable[sum - value];
            }
        }
        return reachable[target];
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] nums = fs.nextIntArray(n);

        System.out.println(canPartition(nums) ? 1 : 0);
    }
}
`,n=`import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

/**
 * Problem: Partition Equal Subset Sum
 * LeetCode: 416 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Subset-sum DP, 0/1 knapsack
 *
 * <p>Problem: Decide whether a multiset of numbers can be split into two subsets with the same sum.
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
 * 1 5 11 5
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 1
 * </pre>
 *
 * <p>Approach: Look for a subset whose sum is exactly half of the total -- that is a 0/1 subset-sum DP.
 *
 * <p>Complexity: Time O(n x S), Space O(S).
 */
public class Main {

    /**
     * Decides whether {@code nums} can be split into two subsets of equal sum.
     *
     * <p>The total must be even; then the question is whether some subset sums to exactly half of it.
     * That is the classic 0/1 subset-sum problem, solved with a one-dimensional table that is updated
     * from high to low so that every element is used at most once.
     *
     * @param nums the values to partition
     * @return {@code true} when an equal-sum partition exists
     */
    public static boolean canPartition(int[] nums) {
        if (nums.length == 0) {
            return false; // there is nothing to partition
        }
        int total = 0;
        for (int value : nums) {
            total += value;
        }
        if ((total & 1) != 0) {
            return false; // an odd total can never be split in half
        }
        int target = total / 2;

        boolean[] reachable = new boolean[target + 1];
        reachable[0] = true;

        for (int value : nums) {
            for (int sum = target; sum >= value; sum--) {
                reachable[sum] = reachable[sum] || reachable[sum - value];
            }
        }
        return reachable[target];
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] nums = fs.nextIntArray(n);

        System.out.println(canPartition(nums) ? 1 : 0);
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
# Partition Equal Subset Sum — LeetCode 416

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Subset-sum DP · 0/1 knapsack |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Microsoft |

## Problem Statement

Given a non-empty array \`nums\` of positive integers, return \`true\` if it is possible to split the array into two subsets such that the two subsets have the **same sum**.

The two subsets must together use every element exactly once.

## Input Format

The program reads from standard input:

\`\`\`
n
nums[0] nums[1] ... nums[n-1]
\`\`\`

- \`n\` — number of values (1 ≤ n ≤ 100)
- \`nums\` — n space-separated non-negative integers

## Sample Input

\`\`\`
4
1 5 11 5
\`\`\`

## Expected Output

\`\`\`
1
\`\`\`

Total = 22, half = 11. The subset \`{11}\` already sums to 11, so the split exists → **1**.

## Approach

The reduction is the whole trick:

> A partition into two equal halves exists **iff** some subset sums to exactly \`total / 2\`.

1. Compute \`total\`. If it is odd the answer is immediately \`false\`.
2. Let \`target = total / 2\`.
3. Subset-sum DP: \`reachable[s]\` = "some subset of the values processed so far sums to \`s\`".
   \`reachable[0] = true\` (the empty subset).
4. For every value \`v\`, update **downwards**:
   \`reachable[s] |= reachable[s - v]\` for \`s = target … v\`.
5. The answer is \`reachable[target]\`.

**Why downwards?** Each value may be used at most once. Iterating upwards would let the same value be used again inside one pass (that is the *unbounded* variant, and it gives the wrong answer here).

## Dry Run

Input: \`nums = [1, 5, 11, 5]\`, \`total = 22\`, \`target = 11\`.

| value | sums updated (downwards) | reachable sums ≤ 11 after the step |
|---:|---|---|
| 1 | 11 … 1 | \`{0, 1}\` |
| 5 | 11 … 5 | \`{0, 1, 5, 6}\` |
| 11 | 11 | \`{0, 1, 5, 6, 11}\` |
| 5 | 11 … 5 | \`{0, 1, 5, 6, 10, 11}\` |

\`reachable[11] = true\` → answer **true** (subset \`{11}\`, the rest sums to \`1 + 5 + 5 = 11\`).

**The last value in detail** (value \`5\`, target \`11\`) — the loop runs downwards, so \`reachable[5]\` still holds the *old* value when it is read:

| sum | old \`reachable[sum]\` | \`reachable[sum-5]\` (old) | new \`reachable[sum]\` |
|---:|---:|---:|---:|
| 11 | false | \`reachable[6]\` = true | **true** |
| 10 | false | \`reachable[5]\` = true | **true** |
| 6 | true | \`reachable[1]\` = true | true |
| 5 | true | \`reachable[0]\` = true | true |

**Odd total.** \`nums = [1, 2, 5]\` has total 8 → target 4 → \`reachable[4]\` is false → answer \`false\`. \`nums = [1, 2]\` has total 3 (odd) → immediately \`false\`.

## Java Solution

See [\`PartitionEqualSubsetSum.java\`](./PartitionEqualSubsetSum.java).

\`\`\`java
    public static boolean canPartition(int[] nums) {
        if (nums.length == 0) {
            return false; // there is nothing to partition
        }
        int total = 0;
        for (int value : nums) {
            total += value;
        }
        if ((total & 1) != 0) {
            return false;
        }
        int target = total / 2;

        boolean[] reachable = new boolean[target + 1];
        reachable[0] = true;

        for (int value : nums) {
            for (int sum = target; sum >= value; sum--) {
                reachable[sum] = reachable[sum] || reachable[sum - value];
            }
        }
        return reachable[target];
    }
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n · S) | \`n\` values, each scanning at most \`target\` sums |
| **Space** | O(S) | the \`reachable\` array holds \`target + 1\` booleans |

**Time \`O(n · S)\`** where \`S = total / 2\`. If \`S\` is huge (values up to \`10⁴\` and \`n\` up to 100, \`S\` can reach \`5 · 10⁵\`) the table is still fine; beyond that people switch to a bitset or a meet-in-the-middle search.

## Interview Notes

**Follow-ups to raise yourself:**

- "What if I need the two subsets themselves?"* → keep a \`parent[s]\` array remembering which value created each reachable sum.
- "Why downwards?"* → so that each value is used at most once; upwards would be the unbounded variant.
- "How does this relate to Target Sum?"* → Target Sum is the same subset-sum machinery with a sign trick; see [Target Sum](./TargetSum.java).
- "Can it be \`O(n · S / 64)\`?"* → yes, pack the reachable flags into a \`long[]\` bitset.

**Common mistakes:**

- ❌ Iterating the sums upwards — that allows a value to be used twice and returns wrong answers.
- ❌ Forgetting the odd-total early exit (harmless, but you then scan the table for nothing).
- ❌ Using \`reachable[sum - value]\` after you have already overwritten it in this pass.

**How to narrate:**

> "An equal partition exists exactly when some subset sums to half of the total. So I run a 0/1 subset-sum DP: \`reachable[s]\` is true when a subset sums to \`s\`. I update the sums **downwards** so that each value is used at most once, and I answer with \`reachable[total/2]\`. An odd total can never be split, so that case returns immediately."

## Related Problems

- [Target Sum — LeetCode 494](./TargetSum.java) — the same subset-sum DP, counting assignments
- [Coin Change II — LeetCode 518](./CoinChangeII.java) — the unbounded cousin
`,i=[`canPartition`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};