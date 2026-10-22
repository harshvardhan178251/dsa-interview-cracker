var e=`binarysearch.SearchInRotatedSortedArrayII`,t=`package com.dsa.binarysearch;

import com.dsa.utils.FastScanner;

/**
 * Problem: Search in Rotated Sorted Array II
 * LeetCode: 81 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Binary search on a rotated array with duplicates
 *
 * <p>Problem:
 * An ascending array of integers may contain duplicates and is rotated at an unknown pivot.
 * Given the rotated array and a {@code target}, return {@code true} if the target is present.
 * This version is a decision problem, so the answer is a boolean rather than an index.
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
 * 2 5 6 0 0 1 2
 * 0
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * true
 * </pre>
 *
 * <p>Approach: identical to the distinct-value version, except for the case
 * {@code nums[left] == nums[mid] == nums[right]}. There we cannot tell which half is sorted,
 * so we shrink the range by one on both sides — this is the only step that can degrade the
 * running time to O(n), and it happens at most once per such ambiguity.
 *
 * <p>Complexity: Time O(log n) in the average case, O(n) in the worst case (all elements equal).
 * Space O(1).
 */
public class SearchInRotatedSortedArrayII {

    /**
     * Returns {@code true} when {@code target} occurs in the rotated sorted array {@code nums}.
     *
     * @param nums   rotated ascending array, duplicates allowed
     * @param target the value to look for
     * @return whether the target is present
     */
    public static boolean search(int[] nums, int target) {
        int left = 0;
        int right = nums.length - 1;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] == target) {
                return true;
            }
            if (nums[left] == nums[mid] && nums[mid] == nums[right]) {
                // Ambiguous: shrink both ends.
                left++;
                right--;
            } else if (nums[left] <= nums[mid]) {
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
        return false;
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
 * Problem: Search in Rotated Sorted Array II
 * LeetCode: 81 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Binary search on a rotated array with duplicates
 *
 * <p>Problem:
 * An ascending array of integers may contain duplicates and is rotated at an unknown pivot.
 * Given the rotated array and a {@code target}, return {@code true} if the target is present.
 * This version is a decision problem, so the answer is a boolean rather than an index.
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
 * 2 5 6 0 0 1 2
 * 0
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * true
 * </pre>
 *
 * <p>Approach: identical to the distinct-value version, except for the case
 * {@code nums[left] == nums[mid] == nums[right]}. There we cannot tell which half is sorted,
 * so we shrink the range by one on both sides — this is the only step that can degrade the
 * running time to O(n), and it happens at most once per such ambiguity.
 *
 * <p>Complexity: Time O(log n) in the average case, O(n) in the worst case (all elements equal).
 * Space O(1).
 */
public class Main {

    /**
     * Returns {@code true} when {@code target} occurs in the rotated sorted array {@code nums}.
     *
     * @param nums   rotated ascending array, duplicates allowed
     * @param target the value to look for
     * @return whether the target is present
     */
    public static boolean search(int[] nums, int target) {
        int left = 0;
        int right = nums.length - 1;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] == target) {
                return true;
            }
            if (nums[left] == nums[mid] && nums[mid] == nums[right]) {
                // Ambiguous: shrink both ends.
                left++;
                right--;
            } else if (nums[left] <= nums[mid]) {
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
        return false;
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
# Search in Rotated Sorted Array II — LeetCode 81

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Binary search · Rotated array · Duplicates |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Microsoft, Uber |

## Problem Statement

An ascending array of integers may contain **duplicates** and is rotated at an unknown pivot.
Given the rotated array \`nums\` and a \`target\`, return \`true\` if \`target\` is present.

This is the *decision* version of the problem — the answer is a boolean, not an index.

## Input Format

The program reads from standard input:

\`\`\`
n
nums[0] nums[1] ... nums[n-1]
target
\`\`\`

- \`n\` — length of the array (1 ≤ n ≤ 10⁵)
- \`nums\` — n space-separated integers: a rotated ascending array, duplicates allowed
- \`target\` — the value to look for

## Sample Input

\`\`\`
5
1 0 1 1 1
0
\`\`\`

## Expected Output

\`\`\`
true
\`\`\`

\`0\` is present at index \`1\`.

## Approach — The same search, with one escape hatch

The distinct-value algorithm works unchanged until we hit the ambiguity
\`nums[left] == nums[mid] == nums[right]\`. In that situation we cannot tell which half is
sorted, so we **shrink both ends by one** and try again:

\`\`\`java
if (nums[left] == nums[mid] && nums[mid] == nums[right]) {
    left++;
    right--;
}
\`\`\`

Losing one element on each side is safe: \`nums[left] == nums[mid] != target\` (we already
checked for equality with the target), so the discarded element cannot be the answer.

**Why the worst case is O(n).** If every element is equal, every iteration hits the
ambiguity branch and removes only two elements. But note that the ambiguity branch only
fires when \`nums[left] == nums[mid] == nums[right]\` — a *uniform* neighbourhood. As soon as
the values differ the algorithm is back to O(log n) behaviour. The classic pathological
input is an array of all-equal values.

## Dry Run

Input: \`nums = [1, 0, 1, 1, 1]\`, \`target = 0\`

| Step | left | right | mid | \`nums[mid]\` | branch taken | range after |
|---:|---:|---:|---:|---:|---|---|
| 1 | 0 | 4 | 2 | 1 | \`nums[0]==nums[2]==nums[4]==1\` → ambiguous | \`[1, 3]\` |
| 2 | 1 | 3 | 2 | 1 | left half sorted (\`nums[1]=0 <= 1\`); \`0 <= 0 < 1\` → target inside | \`[1, 1]\` |
| 3 | 1 | 1 | 1 | 0 | \`nums[mid] == target\` | **return true** |

### Trace with a miss — \`nums = [2, 5, 6, 0, 0, 1, 2]\`, \`target = 7\`

| Step | left | right | mid | \`nums[mid]\` | branch taken | range after |
|---:|---:|---:|---:|---:|---|---|
| 1 | 0 | 6 | 3 | 0 | right half sorted; \`0 < 7\` but \`7 > nums[6]=2\` → not there | \`[0, 2]\` |
| 2 | 0 | 2 | 1 | 5 | left half sorted (\`2 <= 5\`); \`7 > 5\` → not there | \`[2, 2]\` |
| 3 | 2 | 2 | 2 | 6 | \`nums[2]==nums[2]==nums[2]\` → ambiguous | \`[3, 1]\` |

\`left > right\` → the range is empty → return **false**.

## Java Solution

See [\`SearchInRotatedSortedArrayII.java\`](./SearchInRotatedSortedArrayII.java).

\`\`\`java
public static boolean search(int[] nums, int target) {
    int left = 0;
    int right = nums.length - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (nums[mid] == target) {
            return true;
        }
        if (nums[left] == nums[mid] && nums[mid] == nums[right]) {
            // Ambiguous: shrink both ends.
            left++;
            right--;
        } else if (nums[left] <= nums[mid]) {
            if (nums[left] <= target && target < nums[mid]) {
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        } else {
            if (nums[mid] < target && target <= nums[right]) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
    }
    return false;
}
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(log n) average, **O(n) worst case** | The ambiguous branch removes only two elements per step |
| **Space** | O(1) | Only three index variables |

**Optimal?** No — the duplicates make it impossible in general. A linear scan is O(n) and
always correct; the binary search is a fast path that degenerates gracefully.

## Interview Notes

**Follow-ups to raise yourself:**
- *"Why can't you always get O(log n) here?"* → because equal elements hide the rotation
  point. Proving that Ω(n) probes are needed for the all-equal array is a nice discussion.
- *"Return the index instead of a boolean."* → any matching index is acceptable; be explicit
  that the answer may differ between runs.
- *"What if the array were rotated *and* sorted descending?"* → mirror the comparison.
- *"How would you detect the rotation point first?"* → find the index where
  \`nums[i] > nums[i+1]\`; with duplicates that pivot is not unique, which is exactly why this
  problem is harder.

**Common mistakes:**
- ❌ Forgetting the ambiguity branch → the "which half is sorted?" test gives a wrong answer
  on arrays like \`[1,0,1,1,1]\`.
- ❌ Shrinking only one end in the ambiguous case → you can discard the target.
- ❌ Claiming O(log n) time in the interview → it is O(n) in the worst case; say so.
- ❌ Comparing \`nums[mid]\` with the target *before* the ambiguity check → the order matters,
  the equality check must come first.

**How to narrate:**
> "This is the same rotated binary search, but duplicates can make the 'which half is sorted'
> question undecidable. When the left, middle and right values are all equal I know the
> target isn't the middle value, so I can safely shrink both ends by one. Everything else
> follows the standard rotated search, and I should mention that the worst case is linear."

## Related Problems

- [Search in Rotated Sorted Array](./SearchInRotatedSortedArray.java) — the distinct-value version
- [Find Minimum in Rotated Sorted Array](./FindMinimumInRotatedSortedArray.java) — the same shape, a different question
- [Binary Search](./BinarySearch.java) — the plain version
`,i=[`search`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};