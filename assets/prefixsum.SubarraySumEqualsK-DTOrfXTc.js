var e=`prefixsum.SubarraySumEqualsK`,t=`package com.dsa.prefixsum;

import com.dsa.utils.FastScanner;

import java.util.HashMap;
import java.util.Map;

/**
 * Problem: Subarray Sum Equals K
 * LeetCode: 560 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Prefix sums with a hash map
 *
 * <p>Problem:
 * Given an integer array {@code nums} and an integer {@code k}, return the total number of
 * continuous subarrays whose sum equals {@code k}.
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
 * 5
 * 1 2 3 4 5
 * 3
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 2
 * </pre>
 *
 * <p>Approach: if the running prefix sum at position {@code i} is {@code s}, then every
 * earlier prefix sum equal to {@code s - k} closes exactly one subarray that sums to
 * {@code k}. A map from prefix sum to how many times it occurred gives the number of
 * such endings; the map is seeded with {@code 0 -> 1} so that subarrays starting at
 * index 0 are counted too.
 *
 * <p>Complexity: Time O(n), Space O(n).
 */
public class SubarraySumEqualsK {

    /**
     * Counts the subarrays whose sum equals {@code k}.
     *
     * @param nums the input array
     * @param k    the required sum
     * @return the number of matching subarrays
     */
    public static int subarraySum(int[] nums, int k) {
        Map<Integer, Integer> seen = new HashMap<>();
        seen.put(0, 1); // the empty prefix
        int sum = 0;
        int count = 0;
        for (int value : nums) {
            sum += value;
            Integer matches = seen.get(sum - k);
            if (matches != null) {
                count += matches;
            }
            seen.merge(sum, 1, Integer::sum);
        }
        return count;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] nums = fs.nextIntArray(n);
        int k = fs.nextInt();

        System.out.println(subarraySum(nums, k));
    }
}
`,n=`import java.util.HashMap;
import java.util.Map;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

/**
 * Problem: Subarray Sum Equals K
 * LeetCode: 560 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Prefix sums with a hash map
 *
 * <p>Problem:
 * Given an integer array {@code nums} and an integer {@code k}, return the total number of
 * continuous subarrays whose sum equals {@code k}.
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
 * 5
 * 1 2 3 4 5
 * 3
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 2
 * </pre>
 *
 * <p>Approach: if the running prefix sum at position {@code i} is {@code s}, then every
 * earlier prefix sum equal to {@code s - k} closes exactly one subarray that sums to
 * {@code k}. A map from prefix sum to how many times it occurred gives the number of
 * such endings; the map is seeded with {@code 0 -> 1} so that subarrays starting at
 * index 0 are counted too.
 *
 * <p>Complexity: Time O(n), Space O(n).
 */
public class Main {

    /**
     * Counts the subarrays whose sum equals {@code k}.
     *
     * @param nums the input array
     * @param k    the required sum
     * @return the number of matching subarrays
     */
    public static int subarraySum(int[] nums, int k) {
        Map<Integer, Integer> seen = new HashMap<>();
        seen.put(0, 1); // the empty prefix
        int sum = 0;
        int count = 0;
        for (int value : nums) {
            sum += value;
            Integer matches = seen.get(sum - k);
            if (matches != null) {
                count += matches;
            }
            seen.merge(sum, 1, Integer::sum);
        }
        return count;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] nums = fs.nextIntArray(n);
        int k = fs.nextInt();

        System.out.println(subarraySum(nums, k));
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
# Subarray Sum Equals K — LeetCode 560

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Prefix sums with a hash map |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Uber, Adobe |

## Problem Statement

Given an integer array \`nums\` and an integer \`k\`, return the total number of
**continuous subarrays** whose sum equals \`k\`.

Subarrays are counted by position, so \`nums = [1, 1, 1]\`, \`k = 2\` has **two** answers
(\`[1,1]\` at indices 0–1 and 1–2).

## Input Format

\`\`\`
n
nums[0] nums[1] ... nums[n-1]
k
\`\`\`

- \`n\` — length of the array (1 ≤ n ≤ 2 × 10⁴)
- \`nums\` — n space-separated integers
- \`k\` — the required subarray sum

## Sample Input

\`\`\`
5
1 2 3 4 5
3
\`\`\`

## Expected Output

\`\`\`
2
\`\`\`

The matching subarrays are \`[1, 2]\` (indices 0–1) and \`[3]\` (index 2).

## Approach — Prefix Sums in a Hash Map

Let \`prefix[i]\` be the sum of \`nums[0..i]\`. A subarray \`nums[l..r]\` has sum

\`\`\`
prefix[r] − prefix[l−1]
\`\`\`

So the subarray sums to \`k\` exactly when

\`\`\`
prefix[l−1] = prefix[r] − k
\`\`\`

That is: **for every running prefix sum \`s\`, count how many times the prefix sum
\`s − k\` has already occurred.** A hash map from prefix sum → occurrence count answers
that in O(1).

**Why a count and not a set?** The same prefix sum can occur several times (e.g. in
\`[1, -1, 1, -1]\`), and each occurrence starts a different subarray.

**The seed \`0 → 1\` is essential.** It represents the empty prefix *before* the array
starts, so a subarray that begins at index 0 is counted.

## Dry Run

Input: \`nums = [1, 2, 3, 4, 5]\`, \`k = 3\`

| Step | \`i\` | \`nums[i]\` | \`sum\` before | \`sum\` after | \`sum - k\` | \`seen[sum - k]\` | \`count\` before | \`count\` after | \`seen\` after |
|---:|---:|---:|---:|---:|---:|---:|---:|---:|---|
| 1 | 0 | 1 | 0 | 1 | −2 | absent | 0 | 0 | \`{0: 1, 1: 1}\` |
| 2 | 1 | 2 | 1 | 3 | 0 | **1** | 0 | **1** | \`{0: 1, 1: 1, 3: 1}\` |
| 3 | 2 | 3 | 3 | 6 | 3 | **1** | 1 | **2** | \`{0: 1, 1: 1, 3: 1, 6: 1}\` |
| 4 | 3 | 4 | 6 | 10 | 7 | absent | 2 | 2 | \`{0: 1, 1: 1, 3: 1, 6: 1, 10: 1}\` |
| 5 | 4 | 5 | 10 | 15 | 12 | absent | 2 | 2 | \`{0: 1, 1: 1, 3: 1, 6: 1, 10: 1, 15: 1}\` |

Answer: **2** ✓

### Why the seed matters — \`nums = [3]\`, \`k = 3\`

| \`i\` | \`nums[i]\` | \`sum\` after | \`sum - k\` | \`seen[sum - k]\` | \`count\` after |
|---:|---:|---:|---:|---:|---:|
| 0 | 3 | 3 | 0 | **1** (the seed) | **1** |

Without the seed \`0 → 1\` the answer would be 0 instead of 1.

## Java Solution

See [\`SubarraySumEqualsK.java\`](./SubarraySumEqualsK.java).

\`\`\`java
public static int subarraySum(int[] nums, int k) {
    Map<Integer, Integer> seen = new HashMap<>();
    seen.put(0, 1);                 // the empty prefix
    int sum = 0;
    int count = 0;
    for (int value : nums) {
        sum += value;
        Integer matches = seen.get(sum - k);
        if (matches != null) {
            count += matches;
        }
        seen.merge(sum, 1, Integer::sum);
    }
    return count;
}
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n) | One pass, one map lookup and one update per element |
| **Space** | O(n) | The map holds at most n + 1 distinct prefix sums |

## Interview Notes

**Follow-ups to raise yourself:**
- *"What if the array contains only positive numbers?"* → a sliding window works, O(n)
  time and O(1) space, because the sum only grows.
- *"What if the array contains negative numbers?"* → the sliding window breaks (the sum
  is not monotonic), and the prefix-sum + hash map is the right answer.
- *"What if you had to return the subarrays themselves?"* → keep a map from prefix sum to
  the **list** of indices, not just the count.
- *"What if \`k\` was 0?"* → the same code works; you then count zero-sum subarrays.
- *"How does this compare with a prefix-sum array plus a nested loop?"* → the array
  version is O(n²); the map version is O(n).

**Common mistakes:**
- ❌ Not seeding \`seen.put(0, 1)\` — every subarray that starts at index 0 is missed.
- ❌ Looking up \`sum + k\` instead of \`sum - k\` — sign error, the classic bug.
- ❌ Storing a boolean instead of a **count** — repeated prefix sums are missed.
- ❌ Inserting \`sum\` into the map **before** the lookup — with \`k = 0\` the empty subarray
  would be counted.

**How to narrate:**
> "A subarray sums to k exactly when the prefix sum before it is the running prefix sum
> minus k. So I keep a map from prefix sum to how many times it has occurred, and at
> each element I add the count of \`sum - k\` to the answer. I seed the map with 0 → 1 for
> the empty prefix so that subarrays starting at index 0 are counted. One pass, O(n)
> time, and it works with negative numbers, unlike a sliding window."

## Related Problems

- [Contiguous Array](ContiguousArray.md) — the same machinery with a balance instead of a sum
- [Pairs With a Target Sum](PairsWithTargetSum.md) — complement counting
- [Range Sum Query — Immutable](RangeSumQuery.md) — the prefix-sum table
- [Two Sum](../arrays/TwoSum.md) — the original complement trick
`,i=[`subarraySum`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};