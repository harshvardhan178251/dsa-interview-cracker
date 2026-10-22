var e=`twopointers.ThreeSum`,t=`package com.dsa.twopointers;

import com.dsa.utils.FastScanner;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * Problem: 3Sum
 * LeetCode: 15 | Difficulty: Medium | Frequency: 5/5
 * Pattern: Two pointers, Sorting, Duplicate skipping
 *
 * <p>Problem:
 * Given an integer array {@code nums}, return all the **unique** triplets
 * {@code [nums[i], nums[j], nums[k]]} that sum to zero. The solution set must not
 * contain duplicate triplets and the order of the triplets and of the numbers inside
 * them may vary.
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
 * -1 0 1 2 -1 -4
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * -1 -1 2
 * -1 0 1
 * </pre>
 *
 * <p>Approach: sort the array, then fix the first element and look for the other two
 * with two pointers. Duplicates are skipped on all three levels so that every triplet
 * is reported exactly once.
 *
 * <p>Complexity: Time O(n²), Space O(n) for the sort.
 */
public class ThreeSum {

    /**
     * Returns all unique triplets that sum to zero.
     *
     * @param nums the input array
     * @return the triplets, each in ascending order
     */
    public static List<int[]> threeSum(int[] nums) {
        List<int[]> answer = new ArrayList<>();
        if (nums == null || nums.length < 3) {
            return answer;
        }

        int[] sorted = nums.clone();
        Arrays.sort(sorted);

        for (int i = 0; i < sorted.length - 2; i++) {
            // Skip duplicate first elements.
            if (i > 0 && sorted[i] == sorted[i - 1]) {
                continue;
            }
            int left = i + 1;
            int right = sorted.length - 1;
            while (left < right) {
                int sum = sorted[i] + sorted[left] + sorted[right];
                if (sum < 0) {
                    left++;
                } else if (sum > 0) {
                    right--;
                } else {
                    answer.add(new int[]{sorted[i], sorted[left], sorted[right]});
                    // Skip duplicates on both ends.
                    while (left < right && sorted[left] == sorted[left + 1]) {
                        left++;
                    }
                    while (left < right && sorted[right] == sorted[right - 1]) {
                        right--;
                    }
                    left++;
                    right--;
                }
            }
        }
        return answer;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] nums = fs.nextIntArray(n);

        for (int[] triplet : threeSum(nums)) {
            System.out.println(triplet[0] + " " + triplet[1] + " " + triplet[2]);
        }
    }
}
`,n=`import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

/**
 * Problem: 3Sum
 * LeetCode: 15 | Difficulty: Medium | Frequency: 5/5
 * Pattern: Two pointers, Sorting, Duplicate skipping
 *
 * <p>Problem:
 * Given an integer array {@code nums}, return all the **unique** triplets
 * {@code [nums[i], nums[j], nums[k]]} that sum to zero. The solution set must not
 * contain duplicate triplets and the order of the triplets and of the numbers inside
 * them may vary.
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
 * -1 0 1 2 -1 -4
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * -1 -1 2
 * -1 0 1
 * </pre>
 *
 * <p>Approach: sort the array, then fix the first element and look for the other two
 * with two pointers. Duplicates are skipped on all three levels so that every triplet
 * is reported exactly once.
 *
 * <p>Complexity: Time O(n²), Space O(n) for the sort.
 */
public class Main {

    /**
     * Returns all unique triplets that sum to zero.
     *
     * @param nums the input array
     * @return the triplets, each in ascending order
     */
    public static List<int[]> threeSum(int[] nums) {
        List<int[]> answer = new ArrayList<>();
        if (nums == null || nums.length < 3) {
            return answer;
        }

        int[] sorted = nums.clone();
        Arrays.sort(sorted);

        for (int i = 0; i < sorted.length - 2; i++) {
            // Skip duplicate first elements.
            if (i > 0 && sorted[i] == sorted[i - 1]) {
                continue;
            }
            int left = i + 1;
            int right = sorted.length - 1;
            while (left < right) {
                int sum = sorted[i] + sorted[left] + sorted[right];
                if (sum < 0) {
                    left++;
                } else if (sum > 0) {
                    right--;
                } else {
                    answer.add(new int[]{sorted[i], sorted[left], sorted[right]});
                    // Skip duplicates on both ends.
                    while (left < right && sorted[left] == sorted[left + 1]) {
                        left++;
                    }
                    while (left < right && sorted[right] == sorted[right - 1]) {
                        right--;
                    }
                    left++;
                    right--;
                }
            }
        }
        return answer;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] nums = fs.nextIntArray(n);

        for (int[] triplet : threeSum(nums)) {
            System.out.println(triplet[0] + " " + triplet[1] + " " + triplet[2]);
        }
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
# 3Sum — LeetCode 15

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Two Pointers · Sorting · Duplicate skipping |
| **Interview heat** | ★★★★★ |
| **Asked at** | Amazon, Meta, Google, Microsoft, Uber, Bloomberg, Apple |

## Problem Statement

Given an integer array \`nums\`, return **all unique triplets** \`[nums[i], nums[j],
nums[k]]\` that sum to zero.

- The solution set must not contain duplicate triplets.
- The order of the triplets and of the numbers inside them does not matter.
- The array may contain negative numbers, zero and duplicates.

For \`nums = [-1, 0, 1, 2, -1, -4]\` the answer is \`[-1, -1, 2]\` and \`[-1, 0, 1]\`.

## Input Format

The program reads from standard input:

\`\`\`
n
nums[0] nums[1] ... nums[n-1]
\`\`\`

- \`n\` — length of the array (1 ≤ n ≤ 3000)
- \`nums\` — n space-separated integers (-10⁴ ≤ nums[i] ≤ 10⁴)

The program prints **one triplet per line**, the three numbers separated by spaces. If
there is no triplet, nothing is printed.

## Sample Input

\`\`\`
6
-1 0 1 2 -1 -4
\`\`\`

## Expected Output

\`\`\`
-1 -1 2
-1 0 1
\`\`\`

## Approach — Sort once, then two pointers per first element

Sorting does three jobs at once:

1. the array is now ordered, so the two-pointer scan works;
2. duplicates are **adjacent**, so they can be skipped in O(1);
3. a triplet can be skipped entirely when its first element repeats.

The algorithm:

1. Sort the array.
2. For every index \`i\` (skipping equal neighbours), fix \`nums[i]\` as the first element.
3. Use \`left = i + 1\` and \`right = n - 1\` to look for the other two:
   - sum < 0 → \`left++\` (the pair must grow),
   - sum > 0 → \`right--\` (the pair must shrink),
   - sum == 0 → record the triplet and skip both duplicates.
4. Move both pointers inwards after a hit.

**The duplicate skipping is the whole difficulty of this problem.** Without it the
answer explodes: \`[-1, -1, 0, 1]\` would produce the same triplet over and over.

## Dry Run

Input: \`nums = [-1, 0, 1, 2, -1, -4]\` → sorted: \`[-4, -1, -1, 0, 1, 2]\`

| Step | \`i\` | \`nums[i]\` | left | right | sum | action |
|---:|---:|---:|---:|---:|---:|---|
| 1 | 0 | -4 | 1 | 5 | -4 + (-1) + 2 = -3 | too small → \`left++\` |
| 2 | 0 | -4 | 2 | 5 | -4 + (-1) + 2 = -3 | too small → \`left++\` |
| 3 | 0 | -4 | 3 | 5 | -4 + 0 + 2 = -2 | too small → \`left++\` |
| 4 | 0 | -4 | 4 | 5 | -4 + 1 + 2 = -1 | too small → \`left++\` → \`left == right\`, stop |
| 5 | 1 | -1 | 2 | 5 | -1 + (-1) + 2 = **0** | **hit** → record \`(-1, -1, 2)\` |
| 6 | 1 | -1 | 3 | 4 | -1 + 0 + 1 = **0** | **hit** → record \`(-1, 0, 1)\` |
| 7 | 2 | -1 | — | — | — | \`nums[2] == nums[1]\` → **skip** the whole outer loop |
| 8 | 3 | 0 | 4 | 5 | 0 + 1 + 2 = 3 | too large → \`right--\` → stop |

Two unique triplets, and the duplicate outer element at index 2 is skipped, so
\`(-1, -1, 2)\` is not reported twice ✓

## Java Solution

See [\`ThreeSum.java\`](./ThreeSum.java).

\`\`\`java
for (int i = 0; i < sorted.length - 2; i++) {
    if (i > 0 && sorted[i] == sorted[i - 1]) {
        continue;
    }
    int left = i + 1;
    int right = sorted.length - 1;
    while (left < right) {
        int sum = sorted[i] + sorted[left] + sorted[right];
        if (sum < 0) {
            left++;
        } else if (sum > 0) {
            right--;
        } else {
            answer.add(new int[]{sorted[i], sorted[left], sorted[right]});
            while (left < right && sorted[left] == sorted[left + 1]) {
                left++;
            }
            while (left < right && sorted[right] == sorted[right - 1]) {
                right--;
            }
            left++;
            right--;
        }
    }
}
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n²) | n outer steps, each with a linear two-pointer scan |
| **Space** | O(n) for the sort, O(1) extra beyond the result | the two-pointer scan itself is in place |

## Interview Notes

**Follow-ups to raise yourself:**
- *"What about 4Sum?"* → nest the same idea: fix two elements and two-pointer the rest,
  O(n³).
- *"How do you avoid the duplicates?"* → sort, then skip equal neighbours on all three
  levels.
- *"Can you do it without sorting?"* → no efficient way: the sorting is what makes the
  duplicate handling and the two-pointer scan possible.
- *"What if the numbers are huge and overflow?"* → use a \`long\` for the sum.

**Common mistakes:**
- ❌ Forgetting the **outer** duplicate skip → the same triplet is reported several
  times.
- ❌ Forgetting the **inner** duplicate skips after a hit → duplicates such as
  \`[-1, -1, 0, 1]\` produce repeated triplets.
- ❌ Moving only one pointer after a hit → the scan continues inside the duplicate run.
- ❌ Assuming the input is sorted → the algorithm sorts it first; skipping the sort
  breaks everything.

**How to narrate:**
> "I sort the array first — that makes duplicates adjacent and lets me use two pointers.
> Then I fix the first element and scan the rest with two pointers, moving the left one
> when the sum is too small and the right one when it is too large. The part people
> forget is the duplicate handling: I skip equal first elements, and after every hit I
> skip equal values on both sides, so each triplet is reported exactly once."

## Related Problems

- [Two Sum II - Input Array Is Sorted](TwoSumII.md) — the two-pointer scan
- [3Sum Closest](ThreeSumClosest.md) — the same scan with a running best
- [4Sum](../../../../../../docs/topics/10-twopointers.md) — the nested version
- [Two Sum](../arrays/TwoSum.md) — the hash-map version
`,i=[`threeSum`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};