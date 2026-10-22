var e=`hashing.LongestConsecutiveSequence`,t=`package com.dsa.hashing;

import com.dsa.utils.FastScanner;

import java.util.HashSet;
import java.util.Set;

/**
 * Problem: Longest Consecutive Sequence
 * LeetCode: 128 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Hashing, Run detection
 *
 * <p>Problem: Given an unsorted array of integers, return the length of the longest
 * sequence of consecutive integers it contains.
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
 * 100 4 200 1 3 2
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 4
 * </pre>
 *
 * <p>Approach: put the values into a hash set and only start counting a run at a
 * value whose predecessor is missing — otherwise the same run would be counted again
 * and again.
 *
 * <p>Complexity: Time O(n) on average, Space O(n).
 */
public class LongestConsecutiveSequence {

    /**
     * Returns the length of the longest consecutive sequence in {@code nums}.
     *
     * @param nums the input values
     * @return the length of the longest run of consecutive integers (0 for an empty array)
     */
    public static int longestConsecutiveSequence(int[] nums) {
        Set<Integer> values = new HashSet<>();
        for (int num : nums) {
            values.add(num);
        }

        int best = 0;
        for (int num : values) {
            if (values.contains(num - 1)) {
                continue; // not the beginning of a run — it was already counted
            }
            int length = 1;
            while (values.contains(num + length)) {
                length++;
            }
            best = Math.max(best, length);
        }
        return best;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] nums = fs.nextIntArray(n);

        System.out.println(longestConsecutiveSequence(nums));
    }
}
`,n=`import java.util.HashSet;
import java.util.Set;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

/**
 * Problem: Longest Consecutive Sequence
 * LeetCode: 128 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Hashing, Run detection
 *
 * <p>Problem: Given an unsorted array of integers, return the length of the longest
 * sequence of consecutive integers it contains.
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
 * 100 4 200 1 3 2
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 4
 * </pre>
 *
 * <p>Approach: put the values into a hash set and only start counting a run at a
 * value whose predecessor is missing — otherwise the same run would be counted again
 * and again.
 *
 * <p>Complexity: Time O(n) on average, Space O(n).
 */
public class Main {

    /**
     * Returns the length of the longest consecutive sequence in {@code nums}.
     *
     * @param nums the input values
     * @return the length of the longest run of consecutive integers (0 for an empty array)
     */
    public static int longestConsecutiveSequence(int[] nums) {
        Set<Integer> values = new HashSet<>();
        for (int num : nums) {
            values.add(num);
        }

        int best = 0;
        for (int num : values) {
            if (values.contains(num - 1)) {
                continue; // not the beginning of a run — it was already counted
            }
            int length = 1;
            while (values.contains(num + length)) {
                length++;
            }
            best = Math.max(best, length);
        }
        return best;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] nums = fs.nextIntArray(n);

        System.out.println(longestConsecutiveSequence(nums));
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
# Longest Consecutive Sequence — LeetCode 128

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Hashing · Run detection |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Meta, Google, Uber, Bloomberg |

## Problem Statement

Given an unsorted array of integers, return the length of the longest sequence of
consecutive integers it contains.

- The sequence does **not** have to be contiguous in the array — only the values have
  to be consecutive.
- \`[100, 4, 200, 1, 3, 2]\` contains \`1, 2, 3, 4\` → the answer is \`4\`.

## Input Format

The program reads from standard input:

\`\`\`
n
nums[0] nums[1] ... nums[n-1]
\`\`\`

- \`n\` — the length of the array (0 ≤ n ≤ 10⁵).
- \`nums\` — n space-separated integers.

## Sample Input

\`\`\`
6
100 4 200 1 3 2
\`\`\`

## Expected Output

\`\`\`
4
\`\`\`

## Approach — Only start counting at the beginning of a run

The naive solution sorts the array and scans it: O(n log n). A hash set gets it down
to O(n) — but only with one extra rule.

**The rule:** a value \`x\` starts a run only when \`x - 1\` is **not** in the set. If
\`x - 1\` is present, then the run containing \`x\` has already been counted when we
started at \`x - 1\`, so counting it again would do the work twice.

Without that rule the algorithm is O(n²) in the worst case: with the array
\`1, 2, 3, …, n\` every value would trigger a full walk to the end.

**Why this is O(n):** every value is walked at most once, and only from the start of
its run.

## Dry Run

Input: \`nums = [100, 4, 200, 1, 3, 2]\`

### Phase 1 — build the set

| Step | value | \`values\` after |
|---:|---:|---|
| 1 | 100 | \`{100}\` |
| 2 | 4 | \`{100, 4}\` |
| 3 | 200 | \`{100, 4, 200}\` |
| 4 | 1 | \`{100, 4, 200, 1}\` |
| 5 | 3 | \`{100, 4, 200, 1, 3}\` |
| 6 | 2 | \`{100, 4, 200, 1, 3, 2}\` |

### Phase 2 — only start at the beginning of a run

| Step | value | \`value - 1\` in the set? | values walked | run length | \`best\` |
|---:|---:|---|---|---:|---:|
| 1 | 1 | 0 → **no** → start | 1, 2, 3, 4 | 4 | 4 |
| 2 | 2 | 1 → yes → skip | — | — | 4 |
| 3 | 3 | 2 → yes → skip | — | — | 4 |
| 4 | 4 | 3 → yes → skip | — | — | 4 |
| 5 | 100 | 99 → no → start | 100 (101 is missing) | 1 | 4 |
| 6 | 200 | 199 → no → start | 200 (201 is missing) | 1 | 4 |

The order in which the set is walked does not matter — every run is counted exactly
once, by its smallest element.

Final answer: **4**

### What happens without the "start of a run" rule

| value | run walked | length |
|---:|---|---:|
| 1 | 1, 2, 3, 4 | 4 |
| 2 | 2, 3, 4 | 3 |
| 3 | 3, 4 | 2 |
| 4 | 4 | 1 |

The same run is walked four times — on \`[1, 2, 3, …, n]\` that is O(n²).

## Java Solution

See [\`LongestConsecutiveSequence.java\`](./LongestConsecutiveSequence.java).

\`\`\`java
public static int longestConsecutiveSequence(int[] nums) {
    Set<Integer> values = new HashSet<>();
    for (int num : nums) {
        values.add(num);
    }
    int best = 0;
    for (int num : values) {
        if (values.contains(num - 1)) {
            continue; // not the start of a run
        }
        int length = 1;
        while (values.contains(num + length)) {
            length++;
        }
        best = Math.max(best, length);
    }
    return best;
}
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n) | Every value is inserted once and walked at most once |
| **Space** | O(n) | The set holds the distinct values |

## Interview Notes

**Follow-ups to raise yourself:**
- *"Return the sequence itself, not just its length."* → remember the start value of
  the best run and rebuild it.
- *"Do it without extra space?"* → sort the array and scan the sorted runs: O(n log n)
  time, O(1) space.
- *"What if the values are huge — up to 10⁹?"* → a hash set still works; a counting
  array does not.
- *"How would you solve the 'longest consecutive sequence in a sorted stream'?"* →
  keep the start and the expected next value of the current run.

**Common mistakes:**
- ❌ Walking **every** value → O(n²) on a sorted array.
- ❌ Checking \`value + 1\` instead of \`value - 1\` to decide whether a run starts →
  every value but the last one starts a "run" and the work is repeated.
- ❌ Forgetting that the array may contain **duplicates** → the set handles them, but
  the answer must count distinct values only.

**How to narrate:**
> "I put the values in a hash set, and then I only start counting a run at a value
> whose predecessor is missing. That way every run is walked exactly once, from its
> smallest element, and the whole thing is O(n) time and O(n) space. The trick is the
> 'x - 1 is not in the set' check — without it the algorithm degrades to O(n²)."

## Related Problems

- [Contains Duplicate](../../../../../../docs/topics/09-hashing.md) — the simplest set membership check
- [Find All Duplicates in an Array](../../../../../../docs/topics/09-hashing.md) — a set used to spot repeats
- [Intersection of Two Arrays](../../../../../../docs/topics/09-hashing.md) — set intersection
`,i=[`longestConsecutiveSequence`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};