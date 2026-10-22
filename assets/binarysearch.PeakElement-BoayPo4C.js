var e=`binarysearch.PeakElement`,t=`package com.dsa.binarysearch;

import com.dsa.utils.FastScanner;

/**
 * Problem: Find Peak Element
 * LeetCode: 162 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Binary search on a local extremum
 *
 * <p>Problem:
 * Given an array where no two adjacent elements are equal, return the index of any peak
 * element — an element that is strictly greater than both of its neighbours. The array is
 * not necessarily sorted.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * nums[0] nums[1] ... nums[n-1]
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 5
 * 1 2 3 1 2
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 2
 * </pre>
 *
 * <p>Approach: compare {@code nums[mid]} with {@code nums[mid + 1]}. If the array climbs
 * towards the right, a peak must exist to the right of {@code mid} (the climb has to end
 * somewhere); if it descends, a peak must exist at or to the left of {@code mid}. Either way
 * one half of the range can be discarded, so the search converges in O(log n) steps.
 *
 * <p>Complexity: Time O(log n), Space O(1).
 */
public class PeakElement {

    /**
     * Returns the index of some peak element of {@code nums}.
     *
     * @param nums array with no two equal neighbours
     * @return the index of a peak
     */
    public static int peakElement(int[] nums) {
        int left = 0;
        int right = nums.length - 1;
        while (left < right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] < nums[mid + 1]) {
                // Climbing: the peak is to the right.
                left = mid + 1;
            } else {
                // Descending: the peak is at mid or to the left.
                right = mid;
            }
        }
        return left;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] nums = fs.nextIntArray(n);

        System.out.println(peakElement(nums));
    }
}
`,n=`import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

/**
 * Problem: Find Peak Element
 * LeetCode: 162 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Binary search on a local extremum
 *
 * <p>Problem:
 * Given an array where no two adjacent elements are equal, return the index of any peak
 * element — an element that is strictly greater than both of its neighbours. The array is
 * not necessarily sorted.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * nums[0] nums[1] ... nums[n-1]
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 5
 * 1 2 3 1 2
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 2
 * </pre>
 *
 * <p>Approach: compare {@code nums[mid]} with {@code nums[mid + 1]}. If the array climbs
 * towards the right, a peak must exist to the right of {@code mid} (the climb has to end
 * somewhere); if it descends, a peak must exist at or to the left of {@code mid}. Either way
 * one half of the range can be discarded, so the search converges in O(log n) steps.
 *
 * <p>Complexity: Time O(log n), Space O(1).
 */
public class Main {

    /**
     * Returns the index of some peak element of {@code nums}.
     *
     * @param nums array with no two equal neighbours
     * @return the index of a peak
     */
    public static int peakElement(int[] nums) {
        int left = 0;
        int right = nums.length - 1;
        while (left < right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] < nums[mid + 1]) {
                // Climbing: the peak is to the right.
                left = mid + 1;
            } else {
                // Descending: the peak is at mid or to the left.
                right = mid;
            }
        }
        return left;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] nums = fs.nextIntArray(n);

        System.out.println(peakElement(nums));
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
# Find Peak Element — LeetCode 162

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Binary search · Divide and conquer |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Uber, ByteDance |

## Problem Statement

Given an array \`nums\` where **no two adjacent elements are equal**, return the index of any
**peak** element — an element that is strictly greater than both of its neighbours.

The array is **not** sorted. The problem guarantees a peak exists (with the endpoints
counting as one-sided neighbours).

## Input Format

The program reads from standard input:

\`\`\`
n
nums[0] nums[1] ... nums[n-1]
\`\`\`

- \`n\` — length of the array (1 ≤ n ≤ 10⁵)
- \`nums\` — n space-separated integers with \`nums[i] != nums[i+1]\`

## Sample Input

\`\`\`
5
1 2 3 1 2
\`\`\`

## Expected Output

\`\`\`
2
\`\`\`

\`nums[2] == 3\` is greater than both \`nums[1] == 2\` and \`nums[3] == 1\`.

## Approach — Binary search on a slope

The array is not sorted, but it is not random either: the comparison between two adjacent
elements tells us which way the slope goes.

Look at \`nums[mid]\` and \`nums[mid + 1]\`:

- **\`nums[mid] < nums[mid + 1]\`** — the array is climbing here. A peak must exist somewhere
  to the **right**: if the array kept climbing all the way to the end, the last element would
  be a peak (its left neighbour is smaller). Either way, a peak lives in \`[mid + 1, right]\`,
  so set \`left = mid + 1\`.
- **\`nums[mid] > nums[mid + 1]\`** — the array is descending here. A peak must exist at \`mid\`
  or to the **left**: if it kept descending to the start, the first element would be a peak.
  So a peak lives in \`[left, mid]\`, set \`right = mid\`.

Each step discards half the range, so we find a peak in O(log n) probes instead of O(n).

**Why \`mid + 1\` is safe.** The loop invariant is \`left < right\`, so \`mid < right\` and
\`mid + 1 <= right\` is always a valid index — we never read out of bounds.

## Dry Run

Input: \`nums = [1, 2, 3, 1, 2]\`

| Step | left | right | mid | \`nums[mid]\` | \`nums[mid+1]\` | slope | peak is in | window after |
|---:|---:|---:|---:|---:|---:|---|---|---|
| 1 | 0 | 4 | 2 | 3 | 1 | descending | \`[0, 2]\` | \`[0, 2]\` |
| 2 | 0 | 2 | 1 | 2 | 3 | climbing | \`[2, 2]\` | \`[2, 2]\` |

\`left == right == 2\` → return **2**.

### The reasoning behind step 1

The array is \`1 2 3 1 2\`. At \`mid = 2\` the value \`3\` is bigger than its right neighbour \`1\`,
so the slope is descending. That means the peak cannot be strictly to the right of index 2
(anything to the right is reached by climbing *down* from 3), so we keep \`[0, 2]\`.

### The candidate windows at every step

| Step | window | its contents | peak inside it? |
|---:|---|---|---|
| 1 | \`[0, 4]\` | \`1 2 3 1 2\` | yes — \`3\` at index 2, and \`2\` at index 4 |
| 2 | \`[0, 2]\` | \`1 2 3\` | yes — \`3\` at index 2 |
| 3 | \`[2, 2]\` | \`3\` | yes — index 2 |

### A longer trace — \`nums = [1, 2, 1, 3, 5, 6, 4]\`

| Step | left | right | mid | \`nums[mid]\` | \`nums[mid+1]\` | slope | window after |
|---:|---:|---:|---:|---:|---:|---|---|
| 1 | 0 | 6 | 3 | 3 | 5 | climbing | \`[4, 6]\` |
| 2 | 4 | 6 | 5 | 6 | 4 | descending | \`[4, 5]\` |
| 3 | 4 | 5 | 4 | 5 | 6 | climbing | \`[5, 5]\` |

\`left == right == 5\` → return **5** — and indeed \`nums[5] = 6 > nums[4] = 5\` and
\`nums[5] = 6 > nums[6] = 4\` ✓

## Java Solution

See [\`PeakElement.java\`](./PeakElement.java).

\`\`\`java
public static int peakElement(int[] nums) {
    int left = 0;
    int right = nums.length - 1;
    while (left < right) {
        int mid = left + (right - left) / 2;
        if (nums[mid] < nums[mid + 1]) {
            // Climbing: the peak is to the right.
            left = mid + 1;
        } else {
            // Descending: the peak is at mid or to the left.
            right = mid;
        }
    }
    return left;
}
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(log n) | The candidate range halves every iteration |
| **Space** | O(1) | Only two index variables |

**Optimal?** Yes — Ω(log n) probes are needed in the worst case.

## Interview Notes

**Follow-ups to raise yourself:**
- *"Find the largest peak, or all peaks."* → the binary search only finds *a* peak; scan
  the whole array for the others (O(n)).
- *"What if adjacent elements can be equal?"* → the slope argument breaks (a flat region
  can hide the peak); with equal neighbours you must scan.
- *"What if the array were sorted descending?"* → the answer is index \`0\`; the algorithm
  handles it (the slope is always descending, so \`right\` shrinks to \`0\`).
- *"How does this relate to finding a maximum in a bitonic array?"* → same slope idea, but
  the answer is unique because the array rises then falls exactly once.

**Common mistakes:**
- ❌ Assuming the array is sorted → the whole point is that it is not.
- ❌ Comparing \`nums[mid]\` with \`nums[mid - 1]\` without adjusting the bounds → the
  invariant breaks and the answer can be wrong.
- ❌ Using \`left <= right\` → then \`mid + 1\` can be out of bounds when \`mid == right\`.
- ❌ Forgetting that \`left < right\` guarantees \`mid + 1 <= right\` → mention this in the
  interview, it is the detail that proves the code is safe.

**How to narrate:**
> "The array isn't sorted but it does have a shape: comparing the middle element with its
> right neighbour tells me the local slope. If the array climbs there, a peak must exist to
> the right; if it descends, a peak must exist at the middle or to the left. So I can throw
> away half the array every step and find a peak in O(log n) probes."

## Related Problems

- [Binary Search](./BinarySearch.java) — the classic sorted search
- [Search in Rotated Sorted Array](./SearchInRotatedSortedArray.java) — binary search without a global sort order
- [Search a 2D Matrix II](./Search2DMatrixII.java) — a staircase over sorted rows and columns
`,i=[`peakElement`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};