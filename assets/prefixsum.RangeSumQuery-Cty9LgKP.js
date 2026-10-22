var e=`prefixsum.RangeSumQuery`,t=`package com.dsa.prefixsum;

import com.dsa.utils.FastScanner;

/**
 * Problem: Range Sum Query — Immutable
 * LeetCode: 303 | Difficulty: Easy | Frequency: 3/5
 * Pattern: Prefix sums, O(1) range queries
 *
 * <p>Problem:
 * Given an immutable integer array {@code nums}, answer {@code q} range-sum queries.
 * A query {@code (left, right)} asks for the sum of {@code nums[left..right]} with both
 * ends inclusive.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * nums[0] nums[1] ... nums[n-1]
 * q
 * left right
 * left right
 * ...
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 8
 * -2 0 3 -5 2 -1 5 3
 * 3
 * 0 2
 * 2 5
 * 1 4
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 1
 * -1
 * 0
 * </pre>
 *
 * <p>Approach: build a prefix-sum table where {@code prefix[i]} is the sum of the first
 * {@code i} elements. The sum of a range is then
 * {@code prefix[right + 1] - prefix[left]}: subtract everything before the range from
 * everything up to the end of the range.
 *
 * <p>Complexity: Preprocessing O(n), each query O(1), Space O(n).
 */
public class RangeSumQuery {

    /**
     * Builds the prefix-sum table for the given array.
     *
     * @param nums the input array
     * @return a table of length {@code nums.length + 1}
     */
    public static int[] buildPrefix(int[] nums) {
        int[] prefix = new int[nums.length + 1];
        for (int i = 0; i < nums.length; i++) {
            prefix[i + 1] = prefix[i] + nums[i];
        }
        return prefix;
    }

    /**
     * Returns the sum of {@code nums[left..right]} (both ends inclusive).
     *
     * @param prefix the table produced by {@link #buildPrefix(int[])}
     * @param left   inclusive start index
     * @param right  inclusive end index
     * @return the range sum
     */
    public static int rangeSum(int[] prefix, int left, int right) {
        return prefix[right + 1] - prefix[left];
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] nums = fs.nextIntArray(n);
        int q = fs.nextInt();

        int[] prefix = buildPrefix(nums);
        StringBuilder out = new StringBuilder();
        for (int i = 0; i < q; i++) {
            int left = fs.nextInt();
            int right = fs.nextInt();
            if (i > 0) {
                out.append('\\n');
            }
            out.append(rangeSum(prefix, left, right));
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
 * Problem: Range Sum Query — Immutable
 * LeetCode: 303 | Difficulty: Easy | Frequency: 3/5
 * Pattern: Prefix sums, O(1) range queries
 *
 * <p>Problem:
 * Given an immutable integer array {@code nums}, answer {@code q} range-sum queries.
 * A query {@code (left, right)} asks for the sum of {@code nums[left..right]} with both
 * ends inclusive.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * nums[0] nums[1] ... nums[n-1]
 * q
 * left right
 * left right
 * ...
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 8
 * -2 0 3 -5 2 -1 5 3
 * 3
 * 0 2
 * 2 5
 * 1 4
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 1
 * -1
 * 0
 * </pre>
 *
 * <p>Approach: build a prefix-sum table where {@code prefix[i]} is the sum of the first
 * {@code i} elements. The sum of a range is then
 * {@code prefix[right + 1] - prefix[left]}: subtract everything before the range from
 * everything up to the end of the range.
 *
 * <p>Complexity: Preprocessing O(n), each query O(1), Space O(n).
 */
public class Main {

    /**
     * Builds the prefix-sum table for the given array.
     *
     * @param nums the input array
     * @return a table of length {@code nums.length + 1}
     */
    public static int[] buildPrefix(int[] nums) {
        int[] prefix = new int[nums.length + 1];
        for (int i = 0; i < nums.length; i++) {
            prefix[i + 1] = prefix[i] + nums[i];
        }
        return prefix;
    }

    /**
     * Returns the sum of {@code nums[left..right]} (both ends inclusive).
     *
     * @param prefix the table produced by {@link #buildPrefix(int[])}
     * @param left   inclusive start index
     * @param right  inclusive end index
     * @return the range sum
     */
    public static int rangeSum(int[] prefix, int left, int right) {
        return prefix[right + 1] - prefix[left];
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] nums = fs.nextIntArray(n);
        int q = fs.nextInt();

        int[] prefix = buildPrefix(nums);
        StringBuilder out = new StringBuilder();
        for (int i = 0; i < q; i++) {
            int left = fs.nextInt();
            int right = fs.nextInt();
            if (i > 0) {
                out.append('\\n');
            }
            out.append(rangeSum(prefix, left, right));
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
# Range Sum Query — Immutable — LeetCode 303

| | |
|---|---|
| **Difficulty** | Easy |
| **Pattern** | Prefix sums · O(1) range queries |
| **Interview heat** | ★★★☆☆ |
| **Asked at** | Amazon, Google, Meta, Uber, Apple |

## Problem Statement

You are given an immutable integer array \`nums\`. Answer \`q\` **range-sum** queries.

A query \`(left, right)\` asks for the sum of \`nums[left..right]\` — **both ends
inclusive**. Print one answer per query, in the order the queries were given.

## Input Format

\`\`\`
n
nums[0] nums[1] ... nums[n-1]
q
left right
left right
...
\`\`\`

- \`n\` — length of the array (1 ≤ n ≤ 10⁴)
- \`nums\` — n space-separated integers
- \`q\` — number of queries (1 ≤ q ≤ 10⁴)
- then \`q\` lines, each with an inclusive \`left\` and \`right\` index (\`0 <= left <= right < n\`)

## Sample Input

\`\`\`
8
-2 0 3 -5 2 -1 5 3
3
0 2
2 5
1 4
\`\`\`

## Expected Output

\`\`\`
1
-1
0
\`\`\`

- \`nums[0..2]\` = \`-2 + 0 + 3\` = **1**
- \`nums[2..5]\` = \`3 - 5 + 2 - 1\` = **-1**
- \`nums[1..4]\` = \`0 + 3 - 5 + 2\` = **0**

## Approach — Prefix-Sum Table

The array is **immutable**, so the work can be done once and reused for every query.

Build \`prefix\` of length \`n + 1\` where:

\`\`\`
prefix[0] = 0
prefix[i + 1] = prefix[i] + nums[i]
\`\`\`

\`prefix[i]\` is the sum of the **first \`i\`** elements. Then the sum of an inclusive range
is a single subtraction:

\`\`\`
sum(left..right) = prefix[right + 1] - prefix[left]
\`\`\`

\`prefix[right + 1]\` holds the sum of everything up to and including \`right\`;
\`prefix[left]\` holds the sum of everything before \`left\`. Their difference is exactly
the range.

**The \`+1\` is the classic off-by-one:** storing \`prefix[i] = sum(nums[0..i])\` instead
would need \`prefix[right] - prefix[left - 1]\` and a special case for \`left = 0\`. The
"prefix of length i" convention removes the special case entirely.

## Dry Run

Input: \`nums = [-2, 0, 3, -5, 2, -1, 5, 3]\`, \`n = 8\`

### Step 1 — build the prefix table

| Step | \`i\` | \`nums[i]\` | \`prefix[i]\` before | \`prefix[i + 1]\` | \`prefix\` after |
|---:|---:|---:|---:|---:|---|
| 1 | 0 | −2 | 0 | 0 + (−2) = −2 | \`[0, -2]\` |
| 2 | 1 | 0 | −2 | −2 + 0 = −2 | \`[0, -2, -2]\` |
| 3 | 2 | 3 | −2 | −2 + 3 = 1 | \`[0, -2, -2, 1]\` |
| 4 | 3 | −5 | 1 | 1 + (−5) = −4 | \`[0, -2, -2, 1, -4]\` |
| 5 | 4 | 2 | −4 | −4 + 2 = −2 | \`[0, -2, -2, 1, -4, -2]\` |
| 6 | 5 | −1 | −2 | −2 + (−1) = −3 | \`[0, -2, -2, 1, -4, -2, -3]\` |
| 7 | 6 | 5 | −3 | −3 + 5 = 2 | \`[0, -2, -2, 1, -4, -2, -3, 2]\` |
| 8 | 7 | 3 | 2 | 2 + 3 = 5 | \`[0, -2, -2, 1, -4, -2, -3, 2, 5]\` |

### Step 2 — answer the queries

| Query | \`(left, right)\` | \`prefix[right + 1]\` | \`prefix[left]\` | answer |
|---:|---|---:|---:|---:|
| 1 | (0, 2) | \`prefix[3]\` = 1 | \`prefix[0]\` = 0 | 1 − 0 = **1** |
| 2 | (2, 5) | \`prefix[6]\` = −3 | \`prefix[2]\` = −2 | −3 − (−2) = **-1** |
| 3 | (1, 4) | \`prefix[5]\` = −2 | \`prefix[1]\` = −2 | −2 − (−2) = **0** |

Answers: **1, -1, 0**

## Java Solution

See [\`RangeSumQuery.java\`](./RangeSumQuery.java).

\`\`\`java
public static int[] buildPrefix(int[] nums) {
    int[] prefix = new int[nums.length + 1];
    for (int i = 0; i < nums.length; i++) {
        prefix[i + 1] = prefix[i] + nums[i];
    }
    return prefix;
}

public static int rangeSum(int[] prefix, int left, int right) {
    return prefix[right + 1] - prefix[left];
}
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Preprocessing** | O(n) | One pass to build the table |
| **Per query** | O(1) | One subtraction |
| **Total** | O(n + q) | Build once, answer many |
| **Space** | O(n) | The prefix table |

## Interview Notes

**Follow-ups to raise yourself:**
- *"What if the array can change?"* → you must rebuild the table on every update:
  O(n) per update. The point of prefix sums is that they trade update cost for query
  cost.
- *"What if you need the minimum or maximum of a range?"* → the same trick does not work;
  use a sparse table, a segment tree, or a monotonic stack.
- *"How would you answer range *product* queries?"* → the same prefix idea with
  multiplication, but division breaks with zeros — see
  [Product of Array Except Self](ProductExceptSelf.md).
- *"What if the queries arrive online and the array is huge?"* → the same approach; the
  table is O(n) memory and the queries are O(1).
- *"How does this help with 2D ranges?"* → see
  [2D Prefix Sum](TwoDimensionalPrefixSum.md).

**Common mistakes:**
- ❌ Off-by-one — using \`prefix[right] - prefix[left]\` with the "inclusive" convention.
  Either change the convention consistently or add the \`+1\`.
- ❌ Forgetting \`prefix[0] = 0\` — the table must start with a zero so that ranges
  starting at index 0 work.
- ❌ Treating the right index as **exclusive** in the input while the documentation says
  inclusive.
- ❌ Rebuilding the prefix table inside the query loop — O(n·q) instead of O(n + q).

**How to narrate:**
> "The array is immutable, so I pay the O(n) cost once. I build a prefix table where
> prefix[i] is the sum of the first i elements, and then every inclusive range query is
> a single subtraction: prefix[right + 1] - prefix[left]. The \`+1\` shift is what lets me
> avoid a special case for left = 0. Total time is O(n + q) and the table is O(n) space."

## Related Problems

- [2D Prefix Sum](TwoDimensionalPrefixSum.md) — the same idea in two dimensions
- [Running Sum of 1d Array](RunningSum.md) — the prefix table itself
- [Subarray Sum Equals K](SubarraySumEqualsK.md) — prefix sums in a hash map
`,i=[`buildPrefix`,`rangeSum`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};