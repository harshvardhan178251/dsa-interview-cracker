var e=`binarysearch.BinarySearch`,t=`package com.dsa.binarysearch;

import com.dsa.utils.FastScanner;

/**
 * Problem: Binary Search
 * LeetCode: 704 | Difficulty: Easy | Frequency: 4/5
 * Pattern: Binary search on a sorted index range
 *
 * <p>Problem:
 * Given an array of integers {@code nums} sorted in ascending order with all values
 * distinct, and a {@code target} value, return the index of {@code target}. If the target is
 * not present in {@code nums}, return {@code -1}.
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
 * 6
 * -1 0 3 5 9 12
 * 9
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 4
 * </pre>
 *
 * <p>Approach: keep the still-viable index range {@code [left, right]}. Look at the middle
 * element; if it equals the target we are done, otherwise throw away the half that cannot
 * contain the target. The range halves every iteration, so the search takes O(log n) steps.
 *
 * <p>Complexity: Time O(log n), Space O(1).
 */
public class BinarySearch {

    /**
     * Returns the index of {@code target} in the sorted array {@code nums}.
     *
     * @param nums   ascending, distinct values
     * @param target the value to look for
     * @return the index of the target, or {@code -1} when it is absent
     */
    public static int search(int[] nums, int target) {
        int left = 0;
        int right = nums.length - 1;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] == target) {
                return mid;
            } else if (nums[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        return -1;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] nums = fs.nextIntArray(n);
        int target = fs.nextInt();

        System.out.println(search(nums, target));
    }
}
`,n=`import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

/**
 * Problem: Binary Search
 * LeetCode: 704 | Difficulty: Easy | Frequency: 4/5
 * Pattern: Binary search on a sorted index range
 *
 * <p>Problem:
 * Given an array of integers {@code nums} sorted in ascending order with all values
 * distinct, and a {@code target} value, return the index of {@code target}. If the target is
 * not present in {@code nums}, return {@code -1}.
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
 * 6
 * -1 0 3 5 9 12
 * 9
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 4
 * </pre>
 *
 * <p>Approach: keep the still-viable index range {@code [left, right]}. Look at the middle
 * element; if it equals the target we are done, otherwise throw away the half that cannot
 * contain the target. The range halves every iteration, so the search takes O(log n) steps.
 *
 * <p>Complexity: Time O(log n), Space O(1).
 */
public class Main {

    /**
     * Returns the index of {@code target} in the sorted array {@code nums}.
     *
     * @param nums   ascending, distinct values
     * @param target the value to look for
     * @return the index of the target, or {@code -1} when it is absent
     */
    public static int search(int[] nums, int target) {
        int left = 0;
        int right = nums.length - 1;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] == target) {
                return mid;
            } else if (nums[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        return -1;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] nums = fs.nextIntArray(n);
        int target = fs.nextInt();

        System.out.println(search(nums, target));
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
# Binary Search — LeetCode 704

| | |
|---|---|
| **Difficulty** | Easy |
| **Pattern** | Binary search · Divide and conquer |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Microsoft, Meta, Uber |

## Problem Statement

Given an array of integers \`nums\` sorted in **ascending order** (all values distinct) and an
integer \`target\`, return the **index** of \`target\`.

- If \`target\` is not present in \`nums\`, return \`-1\`.
- You may not use the \`Arrays.binarySearch\` helper — write the search yourself.

## Input Format

The program reads from standard input:

\`\`\`
n
nums[0] nums[1] ... nums[n-1]
target
\`\`\`

- \`n\` — length of the array (1 ≤ n ≤ 10⁴)
- \`nums\` — n space-separated integers, sorted ascending
- \`target\` — the value to locate

## Sample Input

\`\`\`
6
-1 0 3 5 9 12
9
\`\`\`

## Expected Output

\`\`\`
4
\`\`\`

\`nums[4] == 9\`, so the index \`4\` is returned.

## Approach — Half the search space, every step

A linear scan is O(n). Because the array is sorted we can throw away **half** of the
remaining candidates with every comparison, which gives O(log n).

Maintain the inclusive range \`[left, right]\` of indices that could still hold the target.
On each iteration:

1. Compute \`mid = left + (right - left) / 2\`.
2. If \`nums[mid] == target\` → return \`mid\`.
3. If \`nums[mid] < target\` → everything up to and including \`mid\` is too small, so
   \`left = mid + 1\`.
4. Otherwise everything from \`mid\` onwards is too big, so \`right = mid - 1\`.

The loop ends when \`left > right\`: the range is empty, so the target is absent and we
return \`-1\`.

**Why \`left + (right - left) / 2\` and not \`(left + right) / 2\`?** The second form overflows
when \`left\` and \`right\` are both near \`Integer.MAX_VALUE\`. The safe form has the same
meaning and never overflows.

**Loop condition.** \`left <= right\` (not \`left < right\`) — the range must be allowed to hold
exactly one element, otherwise a single-element array could never be searched.

## Dry Run

Input: \`nums = [-1, 0, 3, 5, 9, 12]\`, \`target = 9\`

| Step | left | right | mid | \`nums[mid]\` | comparison | range after | result |
|---:|---:|---:|---:|---:|---|---|---|
| 1 | 0 | 5 | 2 | 3 | 3 < 9 | \`[3, 5]\` | keep going |
| 2 | 3 | 5 | 4 | 9 | 9 == 9 | \`[3, 5]\` | **return 4** |

The range shrank from 6 candidates to 3 to a single hit — two probes for a 6-element array.

### Trace with a miss — \`nums = [-1, 0, 3, 5, 9, 12]\`, \`target = 4\`

| Step | left | right | mid | \`nums[mid]\` | comparison | range after |
|---:|---:|---:|---:|---:|---|---|
| 1 | 0 | 5 | 2 | 3 | 3 < 4 | \`[3, 5]\` |
| 2 | 3 | 5 | 4 | 9 | 9 > 4 | \`[3, 3]\` |
| 3 | 3 | 3 | 3 | 5 | 5 > 4 | \`[3, 2]\` |

Now \`left > right\` → the range is empty → return **-1**.

## Java Solution

See [\`BinarySearch.java\`](./BinarySearch.java).

\`\`\`java
public static int search(int[] nums, int target) {
    int left = 0;
    int right = nums.length - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (nums[mid] == target) {
            return mid;
        } else if (nums[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return -1;
}
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(log n) | The candidate range halves every iteration |
| **Space** | O(1) | Only three index variables |

**Optimal?** Yes. Any comparison-based search of a sorted array needs Ω(log n) probes.

## Interview Notes

**Follow-ups to raise yourself:**
- *"What if the array is not sorted?"* → binary search is invalid; sort first (O(n log n)) or
  fall back to a hash map / linear scan.
- *"What if the array contains duplicates and you want the first occurrence?"* → use a
  lower-bound search, see [Find First and Last Position](./FindFirstAndLastPosition.java).
- *"What if you get to choose the probe order?"* → interpolation search does better on
  uniformly distributed data, but degrades to O(n) on skewed data.
- *"How would you search a huge file that does not fit in memory?"* → binary search on the
  file offsets, seeking to the middle of the byte range and re-reading.

**Common mistakes:**
- ❌ Writing \`(left + right) / 2\` → overflow risk on large indices.
- ❌ Using \`left < right\` → the last candidate is never inspected, so a one-element array
  fails.
- ❌ Off-by-one on the updates (\`left = mid\` instead of \`left = mid + 1\`) → infinite loop or
  a wrong answer.
- ❌ Returning the **value** instead of the **index** → the question asks for the index.

**How to narrate:**
> "The array is sorted, so instead of scanning I can halve the candidate range each step.
> I'll keep \`[left, right]\` as the still-viable window, probe the middle, and move the bound
> that the comparison rules out. The window empties out in O(log n) probes, and if it empties
> without a hit the answer is -1."

## Related Problems

- [Search Insert Position](./SearchInsertPosition.java) — the lower-bound variant
- [Find First and Last Position](./FindFirstAndLastPosition.java) — lower and upper bounds
- [Search in Rotated Sorted Array](./SearchInRotatedSortedArray.java) — binary search on a rotated array
- [Two Sum](../arrays/TwoSum.java) — the hashing alternative
`,i=[`search`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};