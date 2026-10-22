var e=`binarysearch.SearchInRotatedSortedArray`,t=`package com.dsa.binarysearch;

import com.dsa.utils.FastScanner;

/**
 * Problem: Search in Rotated Sorted Array
 * LeetCode: 33 | Difficulty: Medium | Frequency: 5/5
 * Pattern: Binary search on a rotated sorted array
 *
 * <p>Problem:
 * An array sorted in ascending order is rotated at an unknown pivot, for example
 * {@code [0,1,2,4,5,6,7]} becomes {@code [4,5,6,7,0,1,2]}. Given the rotated array and a
 * {@code target}, return the index of the target, or {@code -1} when it is absent. All values
 * are distinct.
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
 * 7
 * 4 5 6 7 0 1 2
 * 0
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 4
 * </pre>
 *
 * <p>Approach: a rotated array still contains one sorted half. Compare {@code nums[mid]} with
 * {@code nums[left]}: if {@code nums[left] <= nums[mid]} the left half is sorted, otherwise the
 * right half is sorted. Check whether the target falls inside the sorted half's value range;
 * if it does, keep that half, otherwise keep the other one.
 *
 * <p>Complexity: Time O(log n), Space O(1).
 */
public class SearchInRotatedSortedArray {

    /**
     * Returns the index of {@code target} inside the rotated sorted array {@code nums}.
     *
     * @param nums   rotated ascending array with distinct values
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
            }
            if (nums[left] <= nums[mid]) {
                // The left half [left, mid] is sorted.
                if (nums[left] <= target && target < nums[mid]) {
                    right = mid - 1;
                } else {
                    left = mid + 1;
                }
            } else {
                // The right half [mid, right] is sorted.
                if (nums[mid] < target && target <= nums[right]) {
                    left = mid + 1;
                } else {
                    right = mid - 1;
                }
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
 * Problem: Search in Rotated Sorted Array
 * LeetCode: 33 | Difficulty: Medium | Frequency: 5/5
 * Pattern: Binary search on a rotated sorted array
 *
 * <p>Problem:
 * An array sorted in ascending order is rotated at an unknown pivot, for example
 * {@code [0,1,2,4,5,6,7]} becomes {@code [4,5,6,7,0,1,2]}. Given the rotated array and a
 * {@code target}, return the index of the target, or {@code -1} when it is absent. All values
 * are distinct.
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
 * 7
 * 4 5 6 7 0 1 2
 * 0
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 4
 * </pre>
 *
 * <p>Approach: a rotated array still contains one sorted half. Compare {@code nums[mid]} with
 * {@code nums[left]}: if {@code nums[left] <= nums[mid]} the left half is sorted, otherwise the
 * right half is sorted. Check whether the target falls inside the sorted half's value range;
 * if it does, keep that half, otherwise keep the other one.
 *
 * <p>Complexity: Time O(log n), Space O(1).
 */
public class Main {

    /**
     * Returns the index of {@code target} inside the rotated sorted array {@code nums}.
     *
     * @param nums   rotated ascending array with distinct values
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
            }
            if (nums[left] <= nums[mid]) {
                // The left half [left, mid] is sorted.
                if (nums[left] <= target && target < nums[mid]) {
                    right = mid - 1;
                } else {
                    left = mid + 1;
                }
            } else {
                // The right half [mid, right] is sorted.
                if (nums[mid] < target && target <= nums[right]) {
                    left = mid + 1;
                } else {
                    right = mid - 1;
                }
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
# Search in Rotated Sorted Array — LeetCode 33

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Binary search · Rotated array |
| **Interview heat** | ★★★★★ |
| **Asked at** | Amazon, Google, Meta, Microsoft, Uber, Bloomberg |

## Problem Statement

An array sorted in ascending order with **distinct** values is rotated at an unknown pivot.
For example \`[0,1,2,4,5,6,7]\` may become \`[4,5,6,7,0,1,2]\`.

Given the rotated array \`nums\` and a \`target\`, return the **index** of \`target\`, or \`-1\`
if it is not present.

You must achieve **O(log n)** time.

## Input Format

The program reads from standard input:

\`\`\`
n
nums[0] nums[1] ... nums[n-1]
target
\`\`\`

- \`n\` — length of the array (1 ≤ n ≤ 10⁵)
- \`nums\` — n space-separated integers: a rotated ascending array with distinct values
- \`target\` — the value to locate

## Sample Input

\`\`\`
7
4 5 6 7 0 1 2
0
\`\`\`

## Expected Output

\`\`\`
4
\`\`\`

\`nums[4] == 0\`, so the index \`4\` is returned.

## Approach — Find the sorted half, then use its value range

The array is no longer globally sorted, but it is made of **two sorted runs**. At any
midpoint, **at least one** of the halves \`[left, mid]\` / \`[mid, right]\` is sorted.

Which one? Compare \`nums[left]\` with \`nums[mid]\`:

- \`nums[left] <= nums[mid]\` → the **left** half is sorted.
- otherwise → the **right** half is sorted.

Once we know a half is sorted, its values span a contiguous range, so we can check in O(1)
whether the target is inside it:

- **Left half sorted** (\`nums[left] <= nums[mid]\`): the target is in this half iff
  \`nums[left] <= target && target < nums[mid]\`. Otherwise it is in the right half.
- **Right half sorted** (\`nums[mid] > nums[right]\` case): the target is in this half iff
  \`nums[mid] < target && target <= nums[right]\`.

Whichever half does **not** contain the target is discarded, so the range still halves every
iteration → O(log n).

**Note on the comparisons.** The inequalities are asymmetric on purpose: the left-half test
uses \`target < nums[mid]\` while the right-half test uses \`nums[mid] < target\`. Using \`<=\`
on both sides would make a target equal to the boundary value ambiguous.

## Dry Run

Input: \`nums = [4, 5, 6, 7, 0, 1, 2]\`, \`target = 0\`

| Step | left | right | mid | \`nums[mid]\` | sorted half | target inside it? | range after |
|---:|---:|---:|---:|---:|---|---|---|
| 1 | 0 | 6 | 3 | 7 | left: \`nums[0]=4 <= 7\` | no — \`0 < 4\` | \`[4, 6]\` |
| 2 | 4 | 6 | 5 | 1 | left: \`nums[4]=0 <= 1\` | **yes** — \`0 <= 0 < 1\` | \`[4, 4]\` |
| 3 | 4 | 4 | 4 | 0 | \`nums[4] == target\` | — | **return 4** |

Three probes for a 7-element array.

### Trace with a miss — \`nums = [4,5,6,7,0,1,2]\`, \`target = 3\`

| Step | left | right | mid | \`nums[mid]\` | sorted half | target inside it? | range after |
|---:|---:|---:|---:|---:|---|---|---|
| 1 | 0 | 6 | 3 | 7 | left (\`4 <= 7\`) | no — \`3 < 4\` | \`[4, 6]\` |
| 2 | 4 | 6 | 5 | 1 | left (\`0 <= 1\`) | no — \`3 > 1\` | \`[6, 6]\` |
| 3 | 6 | 6 | 6 | 2 | right (\`nums[6]=2\`, \`2 > 1\`) | no — \`3 > 2\` | \`[6, 5]\` |

\`left > right\` → the range is empty → return **-1**.

## Java Solution

See [\`SearchInRotatedSortedArray.java\`](./SearchInRotatedSortedArray.java).

\`\`\`java
public static int search(int[] nums, int target) {
    int left = 0;
    int right = nums.length - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (nums[mid] == target) {
            return mid;
        }
        if (nums[left] <= nums[mid]) {
            // The left half [left, mid] is sorted.
            if (nums[left] <= target && target < nums[mid]) {
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        } else {
            // The right half [mid, right] is sorted.
            if (nums[mid] < target && target <= nums[right]) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
    }
    return -1;
}
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(log n) | One half of the range is discarded per iteration |
| **Space** | O(1) | Only three index variables |

**Optimal?** Yes — Ω(log n) probes are needed in the worst case.

## Interview Notes

**Follow-ups to raise yourself:**
- *"What if duplicates are allowed?"* → see
  [Search in Rotated Sorted Array II](./SearchInRotatedSortedArrayII.java);
  the worst case degrades to O(n).
- *"First find the pivot, then binary search the right half."* → a perfectly good
  alternative, and often easier to explain: O(log n) + O(log n) = O(log n).
- *"What if the array is rotated but you do not know by how much?"* → irrelevant; the
  algorithm never needs to know the rotation amount.
- *"Can you solve it in O(1) space with a different algorithm?"* → yes, the "binary search on
  the sorted half" method is already O(1) space.

**Common mistakes:**
- ❌ Assuming one half is *always* sorted (only **at least one** is) → wrong branch, wrong
  answer.
- ❌ Using \`<=\` on both sides of the range test → the target equal to \`nums[mid]\`'s
  neighbour is misclassified and can be skipped.
- ❌ Comparing \`nums[left]\` with \`nums[right]\` to decide which half is sorted → that tells
  you whether the array is rotated at all, not which half around \`mid\` is sorted.
- ❌ Forgetting that the array may not be rotated at all → the algorithm handles it, but only
  if you do not special-case it incorrectly.

**How to narrate:**
> "A rotated array has two sorted runs, so at any midpoint one of the halves is sorted. I
> detect which one by comparing the left end with the middle, then use that sorted half's
> value range to decide whether the target lives there. The other half is discarded, so the
> range halves each step and the whole search stays O(log n)."

## Related Problems

- [Search in Rotated Sorted Array II](./SearchInRotatedSortedArrayII.java) — the duplicate-heavy version
- [Find Minimum in Rotated Sorted Array](./FindMinimumInRotatedSortedArray.java) — the same shape, a different question
- [Search a 2D Matrix](./Search2DMatrix.java) — binary search over a flattened matrix
`,i=[`search`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};