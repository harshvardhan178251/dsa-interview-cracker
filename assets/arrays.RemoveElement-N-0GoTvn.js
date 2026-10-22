var e=`arrays.RemoveElement`,t=`package com.dsa.arrays;

import com.dsa.utils.FastScanner;

/**
 * Problem: Remove Element
 * LeetCode: 27 | Difficulty: Easy | Frequency: 2/5
 * Pattern: Two pointers, In-place compaction
 *
 * <p>Problem:
 * Given an integer array {@code nums} and an integer {@code val}, remove every occurrence
 * of {@code val} from {@code nums} <em>in place</em> and return the number of elements
 * left. The surviving elements must keep their original relative order. The first
 * {@code k} positions of the array hold the survivors, where {@code k} is the returned
 * count.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * nums[0] nums[1] ... nums[n-1]
 * val
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 5
 * 3 2 2 3 4
 * 2
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 3
 * </pre>
 *
 * <p>Approach: two pointers. {@code read} scans the array while {@code write} marks the
 * next free slot; every element that is not equal to {@code val} is copied to
 * {@code nums[write]} and {@code write} advances. The copy is a self-assignment when
 * {@code read == write}, so it is always safe.
 *
 * <p>Complexity: Time O(n), Space O(1).
 */
public class RemoveElement {

    /**
     * Removes every occurrence of {@code val} in place.
     *
     * @param nums array that is compacted in place
     * @param val  the value to strip out
     * @return the number of elements that remain
     */
    public static int removeElement(int[] nums, int val) {
        int write = 0;
        for (int read = 0; read < nums.length; read++) {
            if (nums[read] != val) {
                nums[write] = nums[read];
                write++;
            }
        }
        return write;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] nums = fs.nextIntArray(n);
        int val = fs.nextInt();

        System.out.println(removeElement(nums, val));
    }
}
`,n=`import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

/**
 * Problem: Remove Element
 * LeetCode: 27 | Difficulty: Easy | Frequency: 2/5
 * Pattern: Two pointers, In-place compaction
 *
 * <p>Problem:
 * Given an integer array {@code nums} and an integer {@code val}, remove every occurrence
 * of {@code val} from {@code nums} <em>in place</em> and return the number of elements
 * left. The surviving elements must keep their original relative order. The first
 * {@code k} positions of the array hold the survivors, where {@code k} is the returned
 * count.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * nums[0] nums[1] ... nums[n-1]
 * val
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 5
 * 3 2 2 3 4
 * 2
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 3
 * </pre>
 *
 * <p>Approach: two pointers. {@code read} scans the array while {@code write} marks the
 * next free slot; every element that is not equal to {@code val} is copied to
 * {@code nums[write]} and {@code write} advances. The copy is a self-assignment when
 * {@code read == write}, so it is always safe.
 *
 * <p>Complexity: Time O(n), Space O(1).
 */
public class Main {

    /**
     * Removes every occurrence of {@code val} in place.
     *
     * @param nums array that is compacted in place
     * @param val  the value to strip out
     * @return the number of elements that remain
     */
    public static int removeElement(int[] nums, int val) {
        int write = 0;
        for (int read = 0; read < nums.length; read++) {
            if (nums[read] != val) {
                nums[write] = nums[read];
                write++;
            }
        }
        return write;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] nums = fs.nextIntArray(n);
        int val = fs.nextInt();

        System.out.println(removeElement(nums, val));
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
# Remove Element — LeetCode 27

| | |
|---|---|
| **Difficulty** | Easy |
| **Pattern** | Two pointers · In-place compaction |
| **Interview heat** | ★★☆☆☆ |
| **Asked at** | Amazon, Meta, Uber, Intel |

## Problem Statement

Given an integer array \`nums\` and an integer \`val\`:

- Remove every occurrence of \`val\` from \`nums\` **in place**.
- The surviving elements must keep their **original relative order**.
- Return the number of elements that remain (\`k\`).

After the call, the first \`k\` positions of \`nums\` hold the survivors; the positions from
\`k\` onwards are irrelevant.

## Input Format

\`\`\`
n
nums[0] nums[1] ... nums[n-1]
val
\`\`\`

- \`n\` — length of the array (0 ≤ n ≤ 10⁴)
- \`nums\` — n space-separated integers
- \`val\` — the value to remove

## Sample Input

\`\`\`
5
3 2 2 3 4
2
\`\`\`

## Expected Output

\`\`\`
3
\`\`\`

The survivors are \`[3, 3, 4]\`, so \`k = 3\`.

## Approach — Write Pointer / Read Pointer

Two pointers over the **same** array:

- \`read\` scans every element from left to right.
- \`write\` marks the next free slot for a surviving element.

For each \`read\`:

- If \`nums[read] == val\`, skip it — the element is dropped.
- Otherwise copy it to \`nums[write]\` and advance \`write\`.

\`write\` never runs ahead of \`read\`, so the copy never clobbers an element we have not
read yet. When \`write == read\` the copy is a harmless self-assignment.

**Why the order is preserved:** survivors are copied in exactly the order they are read,
so the relative order of the remaining elements is untouched.

## Dry Run

Input: \`nums = [3, 2, 2, 3, 4]\`, \`val = 2\`, \`write = 0\`

| Step | \`read\` | \`nums[read]\` | equals \`val\`? | action | array after | \`write\` after |
|---:|---:|---:|---|---|---|---:|
| 1 | 0 | 3 | no | \`nums[0] = 3\` (self-copy) | \`[3, 2, 2, 3, 4]\` | 1 |
| 2 | 1 | 2 | **yes** | skip | \`[3, 2, 2, 3, 4]\` | 1 |
| 3 | 2 | 2 | **yes** | skip | \`[3, 2, 2, 3, 4]\` | 1 |
| 4 | 3 | 3 | no | \`nums[1] = 3\` | \`[3, 3, 2, 3, 4]\` | 2 |
| 5 | 4 | 4 | no | \`nums[2] = 4\` | \`[3, 3, 4, 3, 4]\` | 3 |

Returned \`k = 3\`; the first three slots hold \`[3, 3, 4]\` — the original order of the
survivors is preserved ✓

## Java Solution

See [\`RemoveElement.java\`](./RemoveElement.java).

\`\`\`java
public static int removeElement(int[] nums, int val) {
    int write = 0;
    for (int read = 0; read < nums.length; read++) {
        if (nums[read] != val) {
            nums[write] = nums[read];
            write++;
        }
    }
    return write;
}
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n) | A single pass; every element is read once |
| **Space** | O(1) | Two indices, the array is reused |

## Interview Notes

**Follow-ups to raise yourself:**
- *"What if the order of the survivors did not matter?"* → swap the survivor with the
  last element and shrink the array (O(1) too, but destroys the order).
- *"What if you had to remove duplicates as well?"* → use a \`HashSet\` to track what has
  been kept, or sort first.
- *"What if the array were a linked list?"* → use two pointers: one walks ahead, the
  other rewires the previous node's \`next\` to skip the doomed node.
- *"What if \`val\` appears zero times?"* → the algorithm degenerates to a no-op and
  returns \`n\` (every element is copied onto itself).
- *"How would you remove the k-th occurrence?"* → count occurrences in the copy loop
  and skip only that one.

**Common mistakes:**
- ❌ Returning the **array** instead of the count — the problem asks for \`k\`.
- ❌ Advancing \`write\` even when the element is skipped — that leaves holes (zeros or
  stale values) between survivors.
- ❌ Using a separate output array and copying back — that breaks the "in place"
  requirement and wastes O(n) space.
- ❌ **Filtering out the wrong value** — the classic "remove duplicates" variant must
  compare against the *last kept* element, not against \`val\` alone.

**How to narrate:**
> "I use two pointers on the same array. \`read\` walks every element, \`write\` points at
> the next free slot. When I see a value that isn't \`val\`, I copy it to \`write\` and
> advance \`write\`; otherwise I just skip. Because \`write\` never gets ahead of \`read\`,
> it's safe to overwrite in place, and the survivors keep their original order. The
> final value of \`write\` is the number of remaining elements."

## Related Problems

- [Two Sum](TwoSum.md) — the same "in-place + return an answer" contract
- [Contains Duplicate II](ContainsDuplicateII.md) — index bookkeeping with a hash map
- [Remove Duplicates from Sorted Array](../../../../../../docs/topics/12-prefixsum.md) — the sorted-array variant
`,i=[`removeElement`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};