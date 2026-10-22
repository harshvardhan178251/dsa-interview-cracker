var e=`twopointers.RemoveDuplicatesFromSortedArrayII`,t=`package com.dsa.twopointers;

import com.dsa.utils.FastScanner;

/**
 * Problem: Remove Duplicates from Sorted Array II
 * LeetCode: 80 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Two pointers, In-place compaction, Run detection
 *
 * <p>Problem:
 * Given a sorted array {@code nums}, remove the duplicates <b>in place</b> so that each
 * element appears **at most twice**. Return the number of elements kept, which occupy
 * the first {@code k} positions of {@code nums}.
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
 * 1 1 1 2 2 3
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 5
 * 1 1 2 2 3
 * </pre>
 * The first line is the number of elements kept, the second line holds them.
 *
 * <p>Approach: the array is a sequence of runs of equal values. Walk the runs and copy
 * a run over to the output only when it is short enough (at most two elements).
 *
 * <p>Complexity: Time O(n), Space O(1).
 */
public class RemoveDuplicatesFromSortedArrayII {

    /**
     * Removes the duplicates in place, keeping at most two copies of every value.
     *
     * @param nums a sorted array
     * @return the number of elements kept, stored in {@code nums[0 .. k-1]}
     */
    public static int removeDuplicates(int[] nums) {
        if (nums == null || nums.length == 0) {
            return 0;
        }

        int write = 0;
        int read = 0;
        while (read < nums.length) {
            int runEnd = read;
            while (runEnd < nums.length && nums[runEnd] == nums[read]) {
                runEnd++;
            }
            // Keep at most two copies of the value.
            int copies = Math.min(runEnd - read, 2);
            for (int i = 0; i < copies; i++) {
                nums[write++] = nums[read];
            }
            read = runEnd;
        }
        return write;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] nums = fs.nextIntArray(n);

        int k = removeDuplicates(nums);

        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < k; i++) {
            if (i > 0) {
                sb.append(' ');
            }
            sb.append(nums[i]);
        }
        System.out.println(k);
        System.out.println(sb);
    }
}
`,n=`import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

/**
 * Problem: Remove Duplicates from Sorted Array II
 * LeetCode: 80 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Two pointers, In-place compaction, Run detection
 *
 * <p>Problem:
 * Given a sorted array {@code nums}, remove the duplicates <b>in place</b> so that each
 * element appears **at most twice**. Return the number of elements kept, which occupy
 * the first {@code k} positions of {@code nums}.
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
 * 1 1 1 2 2 3
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 5
 * 1 1 2 2 3
 * </pre>
 * The first line is the number of elements kept, the second line holds them.
 *
 * <p>Approach: the array is a sequence of runs of equal values. Walk the runs and copy
 * a run over to the output only when it is short enough (at most two elements).
 *
 * <p>Complexity: Time O(n), Space O(1).
 */
public class Main {

    /**
     * Removes the duplicates in place, keeping at most two copies of every value.
     *
     * @param nums a sorted array
     * @return the number of elements kept, stored in {@code nums[0 .. k-1]}
     */
    public static int removeDuplicates(int[] nums) {
        if (nums == null || nums.length == 0) {
            return 0;
        }

        int write = 0;
        int read = 0;
        while (read < nums.length) {
            int runEnd = read;
            while (runEnd < nums.length && nums[runEnd] == nums[read]) {
                runEnd++;
            }
            // Keep at most two copies of the value.
            int copies = Math.min(runEnd - read, 2);
            for (int i = 0; i < copies; i++) {
                nums[write++] = nums[read];
            }
            read = runEnd;
        }
        return write;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] nums = fs.nextIntArray(n);

        int k = removeDuplicates(nums);

        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < k; i++) {
            if (i > 0) {
                sb.append(' ');
            }
            sb.append(nums[i]);
        }
        System.out.println(k);
        System.out.println(sb);
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
# Remove Duplicates from Sorted Array II — LeetCode 80

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Two Pointers · In-place compaction · Run detection |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Meta, Google, Microsoft, Uber |

## Problem Statement

Given a **sorted** array \`nums\`, remove the duplicates **in place** so that each element
appears **at most twice**. Return the number of elements kept — they occupy the first
\`k\` positions of \`nums\`.

- \`nums = [1, 1, 1, 2, 2, 3]\` → \`[1, 1, 2, 2, 3]\`, \`k = 5\`.
- \`nums = [0, 0, 1, 1, 1, 2, 2, 3]\` → \`[0, 0, 1, 1, 2, 2, 3]\`, \`k = 7\`.

## Input Format

The program reads from standard input:

\`\`\`
n
nums[0] nums[1] ... nums[n-1]
\`\`\`

- \`n\` — length of the array (1 ≤ n ≤ 3 × 10⁴)
- \`nums\` — n space-separated integers in **ascending** order

The program prints the number of elements kept on the first line and the kept elements
on the second line.

## Sample Input

\`\`\`
6
1 1 1 2 2 3
\`\`\`

## Expected Output

\`\`\`
5
1 1 2 2 3
\`\`\`

## Approach — Walk the runs, copy at most two

Because the array is sorted, it is a sequence of **runs** of equal values
(\`1 1 1 | 2 2 | 3\`). The rule "at most twice" is a rule about runs, so the algorithm
works run by run:

1. find the end of the current run,
2. copy **at most two** of its elements to the output area,
3. continue with the next run.

Two pointers are enough: \`read\` walks the runs, \`write\` marks where the next kept
element goes.

**The alternative (and more famous) formulation** compares against the element two
positions back (\`nums[write - 2]\`): a value may be copied as long as it differs from the
value that was written two slots earlier. Both are O(n) and O(1); the run-based version
is easier to explain.

## Dry Run

Input: \`nums = [1, 1, 1, 2, 2, 3]\`

| Step | run | value | run length | copies kept | write | array | decision |
|---:|---|---|---:|---:|---:|---|---|
| 1 | \`[0, 3)\` | 1 | 3 | 2 | 2 | \`[1, 1, 1, 2, 2, 3]\` | a run of 3 → keep only 2 |
| 2 | \`[3, 5)\` | 2 | 2 | 2 | 4 | \`[1, 1, 2, 2, 2, 3]\` | a run of 2 → keep both |
| 3 | \`[5, 6)\` | 3 | 1 | 1 | 5 | \`[1, 1, 2, 2, 3, 3]\` | a run of 1 → keep it |

\`k = 5\` and \`nums[0..4] = [1, 1, 2, 2, 3]\` ✓

## Java Solution

See [\`RemoveDuplicatesFromSortedArrayII.java\`](./RemoveDuplicatesFromSortedArrayII.java).

\`\`\`java
int write = 0;
int read = 0;
while (read < nums.length) {
    int runEnd = read;
    while (runEnd < nums.length && nums[runEnd] == nums[read]) {
        runEnd++;
    }
    int copies = Math.min(runEnd - read, 2);
    for (int i = 0; i < copies; i++) {
        nums[write++] = nums[read];
    }
    read = runEnd;
}
return write;
\`\`\`

The equivalent "two positions back" variant, often seen in interviews:

\`\`\`java
int write = 0;
for (int read = 0; read < nums.length; read++) {
    if (write < 2 || nums[read] != nums[write - 2]) {
        nums[write++] = nums[read];
    }
}
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n) | every element is read once and written at most once |
| **Space** | O(1) | the result is written into the input array |

## Interview Notes

**Follow-ups to raise yourself:**
- *"What if at most k copies may stay?"* → generalise the run version: keep
  \`min(runLength, k)\` copies.
- *"What if the array is not sorted?"* → count the occurrences with a hash map, then
  write each value as often as it may appear.
- *"Which version do you prefer?"* → the "two positions back" one-liner is shorter, the
  run-based one is easier to reason about and to extend to \`k\` copies.
- *"Why is the in-place requirement interesting?"* → it forces the O(1) space solution;
  with a hash map you would use O(n) space.

**Common mistakes:**
- ❌ Keeping **one** copy per run instead of two → the "at most twice" rule is broken.
- ❌ Comparing with \`nums[write - 1]\` instead of \`nums[write - 2]\` → the second copy is
  rejected.
- ❌ Reading the run while writing into it → the run detection can be corrupted; the run
  version copies from \`nums[read]\` after the run is measured, which is safe.

**How to narrate:**
> "The array is sorted, so it is a sequence of runs. I walk the runs, and for each run
> I copy at most two of its elements to the output area. Two pointers, one pass, O(1)
> extra space. The same idea can be written as a one-liner: copy a value unless it
> equals the value written two positions back."

## Related Problems

- [Remove Duplicates from Sorted Array](RemoveDuplicatesFromSortedArray.md) — keep one copy
- [Move Zeroes](MoveZeroes.md) — the same compaction
- [String Compression](../strings/StringCompression.md) — run-length encoding
- [Two Sum II - Input Array Is Sorted](TwoSumII.md) — two pointers, a different goal
`,i=[`removeDuplicates`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};