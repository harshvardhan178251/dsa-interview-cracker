var e=`binarysearch.FindFirstAndLastPosition`,t=`package com.dsa.binarysearch;

import com.dsa.utils.FastScanner;

/**
 * Problem: Find First and Last Position of Element in Sorted Array
 * LeetCode: 34 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Lower-bound / upper-bound binary search
 *
 * <p>Problem:
 * Given a sorted array and a {@code target} value, return the starting and the ending index
 * of the target within that array. If the target is not present return {@code {-1, -1}}.
 * The array is sorted in non-decreasing order.
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
 * 5 7 7 8 8 10
 * 8
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 3 4
 * </pre>
 *
 * <p>Approach: the first occurrence is the <em>lower bound</em> of the target and the last
 * occurrence is the <em>upper bound</em> minus one. Two binary searches, each of which
 * converges on a boundary rather than on an element, give the whole answer.
 *
 * <p>Complexity: Time O(log n), Space O(1).
 */
public class FindFirstAndLastPosition {

    /**
     * Returns the first and last index of {@code target} in the sorted array {@code nums}.
     *
     * @param nums   ascending (non-decreasing) values
     * @param target the value to look for
     * @return {@code {first, last}}, or {@code {-1, -1}} when the target is absent
     */
    public static int[] searchRange(int[] nums, int target) {
        int first = lowerBound(nums, target);
        if (first == nums.length || nums[first] != target) {
            return new int[]{-1, -1};
        }
        int last = upperBound(nums, target) - 1;
        return new int[]{first, last};
    }

    /** First index whose value is {@code >= target} (may be {@code nums.length}). */
    private static int lowerBound(int[] nums, int target) {
        int left = 0;
        int right = nums.length;
        while (left < right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] < target) {
                left = mid + 1;
            } else {
                right = mid;
            }
        }
        return left;
    }

    /** First index whose value is {@code > target} (may be {@code nums.length}). */
    private static int upperBound(int[] nums, int target) {
        int left = 0;
        int right = nums.length;
        while (left < right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] <= target) {
                left = mid + 1;
            } else {
                right = mid;
            }
        }
        return left;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] nums = fs.nextIntArray(n);
        int target = fs.nextInt();

        int[] answer = searchRange(nums, target);
        System.out.println(answer[0] + " " + answer[1]);
    }
}
`,n=`import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

/**
 * Problem: Find First and Last Position of Element in Sorted Array
 * LeetCode: 34 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Lower-bound / upper-bound binary search
 *
 * <p>Problem:
 * Given a sorted array and a {@code target} value, return the starting and the ending index
 * of the target within that array. If the target is not present return {@code {-1, -1}}.
 * The array is sorted in non-decreasing order.
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
 * 5 7 7 8 8 10
 * 8
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 3 4
 * </pre>
 *
 * <p>Approach: the first occurrence is the <em>lower bound</em> of the target and the last
 * occurrence is the <em>upper bound</em> minus one. Two binary searches, each of which
 * converges on a boundary rather than on an element, give the whole answer.
 *
 * <p>Complexity: Time O(log n), Space O(1).
 */
public class Main {

    /**
     * Returns the first and last index of {@code target} in the sorted array {@code nums}.
     *
     * @param nums   ascending (non-decreasing) values
     * @param target the value to look for
     * @return {@code {first, last}}, or {@code {-1, -1}} when the target is absent
     */
    public static int[] searchRange(int[] nums, int target) {
        int first = lowerBound(nums, target);
        if (first == nums.length || nums[first] != target) {
            return new int[]{-1, -1};
        }
        int last = upperBound(nums, target) - 1;
        return new int[]{first, last};
    }

    /** First index whose value is {@code >= target} (may be {@code nums.length}). */
    private static int lowerBound(int[] nums, int target) {
        int left = 0;
        int right = nums.length;
        while (left < right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] < target) {
                left = mid + 1;
            } else {
                right = mid;
            }
        }
        return left;
    }

    /** First index whose value is {@code > target} (may be {@code nums.length}). */
    private static int upperBound(int[] nums, int target) {
        int left = 0;
        int right = nums.length;
        while (left < right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] <= target) {
                left = mid + 1;
            } else {
                right = mid;
            }
        }
        return left;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] nums = fs.nextIntArray(n);
        int target = fs.nextInt();

        int[] answer = searchRange(nums, target);
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
# Find First and Last Position of Element in Sorted Array — LeetCode 34

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Binary search · Lower bound · Upper bound |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Microsoft, Uber |

## Problem Statement

Given an array of integers \`nums\` sorted in **non-decreasing** order and a \`target\` value,
return the **starting** and **ending** index of \`target\` in that array.

- If \`target\` is not present, return \`[-1, -1]\`.
- The array may contain duplicates.
- The target occupies the whole range \`[first, last]\`; both ends are inclusive.

## Input Format

The program reads from standard input:

\`\`\`
n
nums[0] nums[1] ... nums[n-1]
target
\`\`\`

- \`n\` — length of the array (0 ≤ n ≤ 10⁵)
- \`nums\` — n space-separated integers, sorted non-decreasing
- \`target\` — the value to look for

## Sample Input

\`\`\`
6
5 7 7 8 8 10
8
\`\`\`

## Expected Output

\`\`\`
3 4
\`\`\`

\`8\` occupies indices \`3\` and \`4\`.

## Approach — Two boundary searches

The run of equal values is described by two boundaries:

| Boundary | Definition | Answer |
|---|---|---|
| **lower bound** | first index \`i\` with \`nums[i] >= target\` | \`first\` |
| **upper bound** | first index \`i\` with \`nums[i] > target\` | \`last + 1\` |

So: \`first = lowerBound(target)\`, \`last = upperBound(target) - 1\`. If the element at
\`lowerBound\` is not the target, the target is absent and we return \`[-1, -1]\`.

Both helpers share the same half-open skeleton; only the comparison differs:

\`\`\`java
lowerBound: if (nums[mid] < target) left = mid + 1; else right = mid;
upperBound: if (nums[mid] <= target) left = mid + 1; else right = mid;
\`\`\`

**Why \`upperBound\` instead of \`lowerBound(target + 1)\`?** Because \`target + 1\` overflows
when the target is \`Integer.MAX_VALUE\`. A dedicated upper-bound helper avoids the trap
entirely.

**Why the half-open range \`[0, n)\`?** The boundary may legitimately be \`n\` (the target is
larger than every element, or the target's run ends at the last index), and \`n\` must be a
reachable answer for both helpers.

## Dry Run

Input: \`nums = [5, 7, 7, 8, 8, 10]\`, \`target = 8\`

**Pass 1 — lowerBound(8)**

| Step | left | right | mid | \`nums[mid]\` | \`nums[mid] < 8\`? | range after |
|---:|---:|---:|---:|---:|---|---|
| 1 | 0 | 6 | 3 | 8 | no | \`[0, 3)\` |
| 2 | 0 | 3 | 1 | 7 | yes | \`[2, 3)\` |
| 3 | 2 | 3 | 2 | 7 | yes | \`[3, 3)\` |

\`left == right == 3\` → **lower bound = 3**. Check \`nums[3] == 8\` ✓ → the target exists.

**Pass 2 — upperBound(8)**

| Step | left | right | mid | \`nums[mid]\` | \`nums[mid] <= 8\`? | range after |
|---:|---:|---:|---:|---:|---|---|
| 1 | 0 | 6 | 3 | 8 | yes | \`[4, 6)\` |
| 2 | 4 | 6 | 5 | 10 | no | \`[4, 5)\` |
| 3 | 4 | 5 | 4 | 8 | yes | \`[5, 5)\` |

\`left == right == 5\` → **upper bound = 5** → \`last = 5 - 1 = 4\`.

Answer: **3 4**.

### Trace with an absent target — \`nums = [5, 7, 7, 8, 8, 10]\`, \`target = 6\`

| Step | left | right | mid | \`nums[mid]\` | \`nums[mid] < 6\`? | range after |
|---:|---:|---:|---:|---:|---|---|
| 1 | 0 | 6 | 3 | 8 | no | \`[0, 3)\` |
| 2 | 0 | 3 | 1 | 7 | no | \`[0, 1)\` |
| 3 | 0 | 1 | 0 | 5 | yes | \`[1, 1)\` |

\`lowerBound = 1\`, but \`nums[1] == 7 != 6\` → the target is absent → **-1 -1**.

## Java Solution

See [\`FindFirstAndLastPosition.java\`](./FindFirstAndLastPosition.java).

\`\`\`java
public static int[] searchRange(int[] nums, int target) {
    int first = lowerBound(nums, target);
    if (first == nums.length || nums[first] != target) {
        return new int[]{-1, -1};
    }
    int last = upperBound(nums, target) - 1;
    return new int[]{first, last};
}
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(log n) | Two independent binary searches, each O(log n) |
| **Space** | O(1) | Only a few index variables |

**Optimal?** Yes — you need Ω(log n) probes to locate a boundary.

## Interview Notes

**Follow-ups to raise yourself:**
- *"Can you do it in one pass?"* → yes: run a normal binary search for the target, then
  expand left and right linearly from the hit. That is O(log n + k) where \`k\` is the run
  length — worse when the run is long.
- *"Return all indices of the target."* → collect them while expanding, or use a third
  binary search to find the run.
- *"What if the array is not sorted?"* → binary search is invalid; use a hash map of
  value → list of indices.
- *"How does this relate to a database index?"* → a B+ tree stores sorted keys with
  duplicate keys chained; \`lowerBound\`/\`upperBound\` are exactly the range-scan primitives.

**Common mistakes:**
- ❌ Using \`target + 1\` for the upper bound → overflow at \`Integer.MAX_VALUE\`.
- ❌ Returning \`[-1, -1]\` when the array is empty but forgetting the \`first == nums.length\`
  check → an \`ArrayIndexOutOfBoundsException\`.
- ❌ Forgetting the \`-1\` on the upper bound → the last index would point one past the run.
- ❌ Assuming the array is strictly increasing → the whole point of the problem is
  duplicates.

**How to narrate:**
> "A run of equal values is defined by two boundaries. The first occurrence is the lower
> bound of the target and the last occurrence is the upper bound minus one. Both are the same
> half-open binary search with a single different comparison, so I'll write them as two small
> helpers and run them back to back — O(log n) overall."

## Related Problems

- [Search Insert Position](./SearchInsertPosition.java) — the lower bound on its own
- [Binary Search](./BinarySearch.java) — the exact-match version
- [Search in Rotated Sorted Array](./SearchInRotatedSortedArray.java) — binary search on a rotated array
`,i=[`searchRange`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};