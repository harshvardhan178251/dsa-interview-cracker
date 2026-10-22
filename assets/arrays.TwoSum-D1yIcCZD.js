var e=`arrays.TwoSum`,t=`package com.dsa.arrays;

import com.dsa.utils.FastScanner;

import java.util.HashMap;
import java.util.Map;

/**
 * Problem: Two Sum
 * LeetCode: 1 | Difficulty: Easy | Frequency: 5/5
 * Pattern: Hashing, One-pass lookup
 *
 * <p>Problem:
 * Given an array of integers {@code nums} and an integer {@code target}, return the indices of
 * the two numbers such that they add up to {@code target}. Each input has exactly one answer,
 * and the same element may not be used twice. Return {@code {-1, -1}} when no pair exists.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * nums[0] nums[1] ... nums[n-1]
 * target
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 4
 * 2 7 11 15
 * 9
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 0 1
 * </pre>
 *
 * <p>Approach: walk the array once, keeping a map of values already seen. For each element
 * look up {@code target - nums[i]}; if it is present we have found the pair. The map holds the
 * value seen most recently, so with duplicate values the answer uses the latest occurrence.
 *
 * <p>Complexity: Time O(n), Space O(n).
 */
public class TwoSum {

    /**
     * Returns the indices of the two numbers adding up to {@code target}.
     *
     * @param nums   input array
     * @param target the required sum
     * @return {@code {i, j}} with {@code i < j}, or {@code {-1, -1}} when no pair exists
     */
    public static int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> seen = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            Integer j = seen.get(complement);
            if (j != null) {
                return new int[]{j, i};
            }
            seen.put(nums[i], i);
        }
        return new int[]{-1, -1};
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] nums = fs.nextIntArray(n);
        int target = fs.nextInt();

        int[] answer = twoSum(nums, target);
        System.out.println(answer[0] + " " + answer[1]);
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
 * Problem: Two Sum
 * LeetCode: 1 | Difficulty: Easy | Frequency: 5/5
 * Pattern: Hashing, One-pass lookup
 *
 * <p>Problem:
 * Given an array of integers {@code nums} and an integer {@code target}, return the indices of
 * the two numbers such that they add up to {@code target}. Each input has exactly one answer,
 * and the same element may not be used twice. Return {@code {-1, -1}} when no pair exists.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * nums[0] nums[1] ... nums[n-1]
 * target
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 4
 * 2 7 11 15
 * 9
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 0 1
 * </pre>
 *
 * <p>Approach: walk the array once, keeping a map of values already seen. For each element
 * look up {@code target - nums[i]}; if it is present we have found the pair. The map holds the
 * value seen most recently, so with duplicate values the answer uses the latest occurrence.
 *
 * <p>Complexity: Time O(n), Space O(n).
 */
public class Main {

    /**
     * Returns the indices of the two numbers adding up to {@code target}.
     *
     * @param nums   input array
     * @param target the required sum
     * @return {@code {i, j}} with {@code i < j}, or {@code {-1, -1}} when no pair exists
     */
    public static int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> seen = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            Integer j = seen.get(complement);
            if (j != null) {
                return new int[]{j, i};
            }
            seen.put(nums[i], i);
        }
        return new int[]{-1, -1};
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] nums = fs.nextIntArray(n);
        int target = fs.nextInt();

        int[] answer = twoSum(nums, target);
        System.out.println(answer[0] + " " + answer[1]);
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
# Two Sum — LeetCode 1

| | |
|---|---|
| **Difficulty** | Easy |
| **Pattern** | Hashing · One-pass lookup |
| **Interview heat** | ★★★★★ |
| **Asked at** | Amazon, Google, Meta, Uber, Bloomberg, Adobe |

## Problem Statement

Given an array of integers \`nums\` and an integer \`target\`, return the **indices** of the two
numbers such that they add up to \`target\`.

- Each input has **exactly one** solution.
- The same element may **not** be used twice.
- The answer may be returned in any order.

## Input Format

The program reads from standard input:

\`\`\`
n
nums[0] nums[1] ... nums[n-1]
target
\`\`\`

- \`n\` — length of the array (1 ≤ n ≤ 10⁴)
- \`nums\` — n space-separated integers
- \`target\` — the required sum

## Sample Input

\`\`\`
4
2 7 11 15
9
\`\`\`

## Expected Output

\`\`\`
0 1
\`\`\`

\`nums[0] + nums[1] = 2 + 7 = 9\`, so the indices \`0\` and \`1\` are returned.

## Approach — One-pass Hash Map

Brute force checks every pair and costs **O(n²)**. The trick is to stop searching for a pair
and start searching for its *complement*.

For each element \`nums[i]\`, the partner we need is \`target - nums[i]\`. So:

1. Keep a hash map \`seen\` mapping **value → index**.
2. For each \`i\`, compute \`complement = target - nums[i]\`.
3. If \`seen\` already contains \`complement\`, we have found the pair → return \`{seen[complement], i}\`.
4. Otherwise record \`seen[nums[i]] = i\` and move on.

**Why one pass is enough:** when we are at index \`i\`, every earlier element is already in the
map. If a valid pair exists ending at \`i\`, its partner must be among those earlier elements,
so we will find it.

**Duplicate handling:** we always overwrite \`seen[nums[i]] = i\`. That means the map keeps the
*latest* index for a value, so \`[3, 3]\` with \`target = 6\` correctly returns \`{0, 1}\` rather
than \`{1, 1}\` — the lookup happens before the insert, so the element is never paired with itself.

## Dry Run

Input: \`nums = [2, 7, 11, 15]\`, \`target = 9\`

| Step | i | nums[i] | complement = target − nums[i] | \`seen\` before | found? | \`seen\` after | result |
|---:|---:|---:|---:|---|---|---|---|
| 1 | 0 | 2 | 7 | \`{}\` | no — 7 absent | \`{2: 0}\` | — |
| 2 | 1 | 7 | 2 | \`{2: 0}\` | **yes** — 2 at index 0 | \`{2: 0}\` | **return {0, 1}** |

The loop stops at step 2. \`nums[0] + nums[1] = 2 + 7 = 9\` ✓

### Trace with a duplicate — \`nums = [3, 3]\`, \`target = 6\`

| Step | i | nums[i] | complement | \`seen\` before | found? | \`seen\` after |
|---:|---:|---:|---:|---|---|---|
| 1 | 0 | 3 | 3 | \`{}\` | no — lookup precedes insert | \`{3: 0}\` |
| 2 | 1 | 3 | 3 | \`{3: 0}\` | **yes** — 3 at index 0 | \`{3: 1}\` |

Returns \`{0, 1}\` — the same element is never used twice because the insert happens *after*
the lookup.

## Java Solution

See [\`TwoSum.java\`](./TwoSum.java).

\`\`\`java
public static int[] twoSum(int[] nums, int target) {
    Map<Integer, Integer> seen = new HashMap<>();
    for (int i = 0; i < nums.length; i++) {
        int complement = target - nums[i];
        Integer j = seen.get(complement);
        if (j != null) {
            return new int[]{j, i};
        }
        seen.put(nums[i], i);
    }
    return new int[]{-1, -1};
}
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n) | One pass; each map operation is O(1) on average |
| **Space** | O(n) | The map holds up to n entries |

**Optimal?** Yes for the hash-map approach. A strictly O(1)-space variant exists only if the
array is sorted — see [Two Sum II](../twopointers/TwoSumII.java)
for the O(1) extra space trade-off.

## Interview Notes

**Follow-ups to raise yourself:**
- *"Can you do it without extra space?"* → sort the array and use two pointers; you must then
  map sorted indices back to original indices.
- *"What if there are multiple answers?"* → return all pairs; use a map of value → list of indices.
- *"What if the values are huge or you cannot store the whole map?"* → sort and two-pointer.

**Common mistakes:**
- ❌ Inserting into the map **before** the lookup → allows using the same element twice.
- ❌ Returning the **values** instead of the **indices** → the question asks for indices.
- ❌ Forgetting to handle the no-solution case → the problem guarantees one, but interview code
  should still return a sentinel.

**How to narrate:**
> "A brute-force solution is O(n²). Instead of looking for a pair, I'll look for each
> element's complement. I'll keep a hash map of values I've already passed. That gives me
> O(n) time in a single pass, and it naturally handles duplicates because I look up before
> I insert."

## Related Problems

- [Two Sum II - Input Array Is Sorted](../twopointers/TwoSumII.md) - O(1) extra space
- [3Sum](../twopointers/ThreeSum.md) - the same idea, extended to triples
- [Subarray Sum Equals K](../prefixsum/SubarraySumEqualsK.md) - the same hash-map pattern
- [Group Anagrams](../hashing/GroupAnagrams.md) - grouping by a canonical key
`,i=[`twoSum`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};