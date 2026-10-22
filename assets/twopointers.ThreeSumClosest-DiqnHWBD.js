var e=`twopointers.ThreeSumClosest`,t=`package com.dsa.twopointers;

import com.dsa.utils.FastScanner;

import java.util.Arrays;

/**
 * Problem: 3Sum Closest
 * LeetCode: 16 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Two pointers, Sorting, Running best
 *
 * <p>Problem:
 * Given an integer array {@code nums} of length {@code n} and an integer {@code target},
 * find the integer in {@code nums} such that the sum of three elements is closest to
 * {@code target}. Every input has exactly one answer.
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
 * -1 2 1 -4
 * 1
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 2
 * </pre>
 *
 * <p>Approach: sort the array, fix the first element and use two pointers for the other
 * two. Because the array is sorted, moving a pointer can only make the sum go up or
 * down, so the closest sum is always found by walking the pointers towards it.
 *
 * <p>Complexity: Time O(n²), Space O(n) for the sort.
 */
public class ThreeSumClosest {

    /**
     * Returns the sum of the three elements closest to {@code target}.
     *
     * @param nums   the input array (at least three elements)
     * @param target the wanted sum
     * @return the closest sum
     */
    public static int threeSumClosest(int[] nums, int target) {
        if (nums == null || nums.length < 3) {
            return Integer.MIN_VALUE;
        }

        int[] sorted = nums.clone();
        Arrays.sort(sorted);

        int best = sorted[0] + sorted[1] + sorted[2];
        for (int i = 0; i < sorted.length - 2; i++) {
            int left = i + 1;
            int right = sorted.length - 1;
            while (left < right) {
                int sum = sorted[i] + sorted[left] + sorted[right];
                if (Math.abs(sum - target) < Math.abs(best - target)) {
                    best = sum;
                }
                if (sum == target) {
                    return sum;
                }
                if (sum < target) {
                    left++;
                } else {
                    right--;
                }
            }
        }
        return best;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] nums = fs.nextIntArray(n);
        int target = fs.nextInt();

        System.out.println(threeSumClosest(nums, target));
    }
}
`,n=`import java.util.Arrays;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

/**
 * Problem: 3Sum Closest
 * LeetCode: 16 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Two pointers, Sorting, Running best
 *
 * <p>Problem:
 * Given an integer array {@code nums} of length {@code n} and an integer {@code target},
 * find the integer in {@code nums} such that the sum of three elements is closest to
 * {@code target}. Every input has exactly one answer.
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
 * -1 2 1 -4
 * 1
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 2
 * </pre>
 *
 * <p>Approach: sort the array, fix the first element and use two pointers for the other
 * two. Because the array is sorted, moving a pointer can only make the sum go up or
 * down, so the closest sum is always found by walking the pointers towards it.
 *
 * <p>Complexity: Time O(n²), Space O(n) for the sort.
 */
public class Main {

    /**
     * Returns the sum of the three elements closest to {@code target}.
     *
     * @param nums   the input array (at least three elements)
     * @param target the wanted sum
     * @return the closest sum
     */
    public static int threeSumClosest(int[] nums, int target) {
        if (nums == null || nums.length < 3) {
            return Integer.MIN_VALUE;
        }

        int[] sorted = nums.clone();
        Arrays.sort(sorted);

        int best = sorted[0] + sorted[1] + sorted[2];
        for (int i = 0; i < sorted.length - 2; i++) {
            int left = i + 1;
            int right = sorted.length - 1;
            while (left < right) {
                int sum = sorted[i] + sorted[left] + sorted[right];
                if (Math.abs(sum - target) < Math.abs(best - target)) {
                    best = sum;
                }
                if (sum == target) {
                    return sum;
                }
                if (sum < target) {
                    left++;
                } else {
                    right--;
                }
            }
        }
        return best;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] nums = fs.nextIntArray(n);
        int target = fs.nextInt();

        System.out.println(threeSumClosest(nums, target));
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
# 3Sum Closest — LeetCode 16

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Two Pointers · Sorting · Running best |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Meta, Google, Microsoft, Uber |

## Problem Statement

Given an integer array \`nums\` of length \`n\` and an integer \`target\`, find the integer in
\`nums\` such that the sum of **three** elements is closest to \`target\`.

- Every input has exactly one answer.
- The three elements must be **distinct indices** (\`i < j < k\`).
- The answer is the **sum**, not the triplet.

For \`nums = [-1, 2, 1, -4]\` and \`target = 1\` the possible sums are
\`-1 + 2 + 1 = 2\` and \`-1 + 2 + (-4) = -3\` and \`-1 + 1 + (-4) = -4\` and
\`2 + 1 + (-4) = -1\` — the closest to \`1\` is \`2\`.

## Input Format

The program reads from standard input:

\`\`\`
n
nums[0] nums[1] ... nums[n-1]
target
\`\`\`

- \`n\` — length of the array (3 ≤ n ≤ 1000)
- \`nums\` — n space-separated integers (-10⁴ ≤ nums[i] ≤ 10⁴)
- \`target\` — the wanted sum (-10⁴ ≤ target ≤ 10⁴)

## Sample Input

\`\`\`
4
-1 2 1 -4
1
\`\`\`

## Expected Output

\`\`\`
2
\`\`\`

## Approach — Sort, then two pointers with a running best

The machinery is the same as [3Sum](ThreeSum.md): sort the array, fix the
first element, scan the rest with two pointers. The difference is the **goal** — instead
of looking for an exact hit, every sum that is visited is compared with the best one so
far.

\`\`\`
sum = nums[i] + nums[left] + nums[right]
if |sum - target| < |best - target|:
    best = sum
if sum < target: left++      // we need a bigger sum
else:            right--     // we need a smaller sum
\`\`\`

**Why the pointer movement is still right:** for a fixed \`i\`, the sums produced by
moving \`left\` up are increasing and the sums produced by moving \`right\` down are
decreasing. So the scan walks monotonically towards the target and the closest sum is
encountered on the way — no candidate is skipped by the movement rules.

## Dry Run

Input: \`nums = [-1, 2, 1, -4]\`, \`target = 1\` → sorted: \`[-4, -1, 1, 2]\`

| Step | \`i\` | left | right | sum | distance to \`1\` | best | action |
|---:|---:|---:|---:|---:|---:|---:|---|
| 0 | — | — | — | — | — | \`-4 + -1 + 1 = -4\` | initial best |
| 1 | 0 | 1 | 3 | -4 + -1 + 2 = -3 | 4 | -3 | sum < target → \`left++\` |
| 2 | 0 | 2 | 3 | -4 + 1 + 2 = -1 | 2 | -1 | sum < target → \`left++\` → \`left == right\`, stop |
| 3 | 1 | 2 | 3 | -1 + 1 + 2 = **2** | 1 | **2** | sum > target → \`right--\` → stop |

The best sum is \`2\`, at distance \`1\` from the target ✓

## Java Solution

See [\`ThreeSumClosest.java\`](./ThreeSumClosest.java).

\`\`\`java
int best = sorted[0] + sorted[1] + sorted[2];
for (int i = 0; i < sorted.length - 2; i++) {
    int left = i + 1;
    int right = sorted.length - 1;
    while (left < right) {
        int sum = sorted[i] + sorted[left] + sorted[right];
        if (Math.abs(sum - target) < Math.abs(best - target)) {
            best = sum;
        }
        if (sum == target) {
            return sum;
        }
        if (sum < target) {
            left++;
        } else {
            right--;
        }
    }
}
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n²) | n outer steps, each with a linear two-pointer scan |
| **Space** | O(n) for the sort | the scan itself uses O(1) extra space |

## Interview Notes

**Follow-ups to raise yourself:**
- *"What if several sums are equally close?"* → return any of them; the problem
  guarantees a unique answer.
- *"How would you return the triplet instead of the sum?"* → keep the indices of the
  best sum alongside it.
- *"What if the array is huge?"* → the same algorithm, but the sort dominates.
- *"Can you avoid sorting?"* → not efficiently; sorting is what makes the monotonic
  pointer movement valid.

**Common mistakes:**
- ❌ Comparing the sums instead of their **distances** to the target → \`sum < best\` is
  meaningless when the target is not zero.
- ❌ Forgetting to update the best **before** moving the pointers → the final sum of
  every scan is missed.
- ❌ Returning the closest **element** instead of the sum.
- ❌ Using the same element twice (\`left\` may start at \`i\`, not \`i\`).

**How to narrate:**
> "This is 3Sum with a running best instead of an exact match. I sort the array, fix
> the first element and walk two pointers through the rest. Every sum I produce I
> compare with the best by distance to the target, and then I move the left pointer when
> the sum is too small and the right one when it is too large — because the sorted array
> makes the sums monotone in each direction, no candidate is skipped. O(n²) time."

## Related Problems

- [3Sum](ThreeSum.md) — the exact-match version
- [Two Sum II - Input Array Is Sorted](TwoSumII.md) — the two-pointer scan
- [3Sum with Smaller Target](../../../../../../docs/topics/10-twopointers.md) — the counting variant
- [Container With Most Water](ContainerWithMostWater.md) — two pointers with a greedy move
`,i=[`threeSumClosest`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};