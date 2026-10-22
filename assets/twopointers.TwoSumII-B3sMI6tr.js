var e=`twopointers.TwoSumII`,t=`package com.dsa.twopointers;

import com.dsa.utils.FastScanner;

/**
 * Problem: Two Sum II - Input Array Is Sorted
 * LeetCode: 167 | Difficulty: Easy | Frequency: 4/5
 * Pattern: Two pointers, Sorted array
 *
 * <p>Problem:
 * Given a 1-indexed sorted array {@code nums} and an integer {@code target}, return the
 * 1-based indices of the two numbers that add up to {@code target}. Exactly one
 * solution exists and the same element may not be used twice.
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
 * 1 2
 * </pre>
 *
 * <p>Approach: two pointers, one at each end. The sum of the two ends tells us which
 * pointer has to move: if the sum is too small, the left pointer moves right; if it is
 * too large, the right pointer moves left. Because the array is sorted, moving the
 * wrong pointer cannot produce the target.
 *
 * <p>Complexity: Time O(n), Space O(1).
 */
public class TwoSumII {

    /**
     * Returns the 1-based indices of the two numbers that add up to {@code target}.
     *
     * @param nums   a sorted array
     * @param target the required sum
     * @return {@code {i, j}} with 1-based indices, or {@code {-1, -1}} when no pair exists
     */
    public static int[] twoSumII(int[] nums, int target) {
        if (nums == null || nums.length < 2) {
            return new int[]{-1, -1};
        }

        int left = 0;
        int right = nums.length - 1;
        while (left < right) {
            int sum = nums[left] + nums[right];
            if (sum == target) {
                return new int[]{left + 1, right + 1};
            }
            if (sum < target) {
                left++;
            } else {
                right--;
            }
        }
        return new int[]{-1, -1};
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] nums = fs.nextIntArray(n);
        int target = fs.nextInt();

        int[] answer = twoSumII(nums, target);
        System.out.println(answer[0] + " " + answer[1]);
    }
}
`,n=`import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

/**
 * Problem: Two Sum II - Input Array Is Sorted
 * LeetCode: 167 | Difficulty: Easy | Frequency: 4/5
 * Pattern: Two pointers, Sorted array
 *
 * <p>Problem:
 * Given a 1-indexed sorted array {@code nums} and an integer {@code target}, return the
 * 1-based indices of the two numbers that add up to {@code target}. Exactly one
 * solution exists and the same element may not be used twice.
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
 * 1 2
 * </pre>
 *
 * <p>Approach: two pointers, one at each end. The sum of the two ends tells us which
 * pointer has to move: if the sum is too small, the left pointer moves right; if it is
 * too large, the right pointer moves left. Because the array is sorted, moving the
 * wrong pointer cannot produce the target.
 *
 * <p>Complexity: Time O(n), Space O(1).
 */
public class Main {

    /**
     * Returns the 1-based indices of the two numbers that add up to {@code target}.
     *
     * @param nums   a sorted array
     * @param target the required sum
     * @return {@code {i, j}} with 1-based indices, or {@code {-1, -1}} when no pair exists
     */
    public static int[] twoSumII(int[] nums, int target) {
        if (nums == null || nums.length < 2) {
            return new int[]{-1, -1};
        }

        int left = 0;
        int right = nums.length - 1;
        while (left < right) {
            int sum = nums[left] + nums[right];
            if (sum == target) {
                return new int[]{left + 1, right + 1};
            }
            if (sum < target) {
                left++;
            } else {
                right--;
            }
        }
        return new int[]{-1, -1};
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] nums = fs.nextIntArray(n);
        int target = fs.nextInt();

        int[] answer = twoSumII(nums, target);
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
# Two Sum II - Input Array Is Sorted — LeetCode 167

| | |
|---|---|
| **Difficulty** | Easy |
| **Pattern** | Two Pointers · Sorted array |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Meta, Google, Microsoft, Uber, Bloomberg |

## Problem Statement

Given a **1-indexed sorted** array \`nums\` and an integer \`target\`, return the 1-based
indices of the two numbers that add up to \`target\`.

- Exactly one solution exists.
- The same element may not be used twice.
- The indices are **1-based** (\`i < j\`).

## Input Format

The program reads from standard input:

\`\`\`
n
nums[0] nums[1] ... nums[n-1]
target
\`\`\`

- \`n\` — length of the array (2 ≤ n ≤ 10⁴)
- \`nums\` — n space-separated integers in **ascending** order
- \`target\` — the required sum

## Sample Input

\`\`\`
4
2 7 11 15
9
\`\`\`

## Expected Output

\`\`\`
1 2
\`\`\`

\`nums[0] + nums[1] = 2 + 7 = 9\`, so the 1-based indices \`1\` and \`2\` are returned.

## Approach — Two pointers from both ends

This is [Two Sum](../arrays/TwoSum.java) with the sortedness
turned into a much cheaper algorithm: no hash map, no extra space.

Place one pointer at the **left** end and one at the **right** end and look at the sum
of the two values:

- sum **too small** → the left value has to grow: \`left++\`.
- sum **too large** → the right value has to shrink: \`right--\`.
- sum **equal** → done.

**Why the moves are safe:** the sum of the two ends is the *largest* possible sum that
uses \`nums[left]\` together with any element to its right — no smaller element to the
right could make the sum larger. So if that sum is still too small, \`nums[left]\` can
never be part of a solution and the left pointer may move on. The argument for the
right pointer is symmetric.

## Dry Run

Input: \`nums = [2, 7, 11, 15]\`, \`target = 9\`

| Step | left | right | \`nums[left]\` | \`nums[right]\` | sum | action |
|---:|---:|---:|---:|---:|---:|---|
| 1 | 0 | 3 | 2 | 15 | 17 | too large → \`right--\` |
| 2 | 0 | 2 | 2 | 11 | 13 | too large → \`right--\` |
| 3 | 0 | 1 | 2 | 7 | **9** | equal → return \`{1, 2}\` (1-based) |

Only three steps — no element is examined twice, and the scan never revisits a
discarded pair.

## Java Solution

See [\`TwoSumII.java\`](./TwoSumII.java).

\`\`\`java
int left = 0;
int right = nums.length - 1;
while (left < right) {
    int sum = nums[left] + nums[right];
    if (sum == target) {
        return new int[]{left + 1, right + 1};
    }
    if (sum < target) {
        left++;
    } else {
        right--;
    }
}
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n) | every step moves one pointer inwards |
| **Space** | O(1) | no extra data structure at all |

**Optimal?** Yes — every element has to be looked at, and this uses no extra memory,
unlike the hash-map solution.

## Interview Notes

**Follow-ups to raise yourself:**
- *"What if the array is not sorted?"* → use a hash map: O(n) time, O(n) space.
- *"What if there are multiple solutions?"* → return all of them, or count them; the
  two-pointer version finds one.
- *"What if the values are huge and could overflow an int?"* → compare with a \`long\`
  difference instead of summing.
- *"Can you do it with a fixed target and many queries?"* → two pointers per query is
  already optimal; for many queries, sort and binary search.

**Common mistakes:**
- ❌ Returning **0-based** indices → the problem asks for 1-based ones.
- ❌ Allowing \`left == right\` → the same element would be used twice.
- ❌ Moving the **wrong** pointer when the sum is too small → the scan stalls and misses
  the answer.
- ❌ Forgetting the array must be sorted → the whole reasoning collapses.

**How to narrate:**
> "The array is sorted, so I can use two pointers instead of a hash map. I start at both
> ends and look at the sum. If it's too small, the left value is too small to pair with
> anything that is left — I move it inwards; if it's too large, the right value is too
> large to pair with anything that is right, so I move that one. When the pointers meet
> there is no solution. That's O(n) time and O(1) space."

## Related Problems

- [Two Sum](../arrays/TwoSum.md) — the unsorted version
- [3Sum](ThreeSum.md) — the same idea, extended to triples
- [3Sum Closest](ThreeSumClosest.md) — the running-best variant
- [Squares of a Sorted Array](SquaresOfSortedArray.md) — two pointers filling from the back
`,i=[`twoSumII`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};