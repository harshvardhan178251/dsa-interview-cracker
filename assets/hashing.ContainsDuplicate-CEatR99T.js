var e=`hashing.ContainsDuplicate`,t=`package com.dsa.hashing;

import com.dsa.utils.FastScanner;

import java.util.HashSet;
import java.util.Set;

/**
 * Problem: Contains Duplicate
 * LeetCode: 217 | Difficulty: Easy | Frequency: 4/5
 * Pattern: Hashing, Set membership
 *
 * <p>Problem: Given an array of integers, decide whether any value appears at least
 * twice.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * nums[0] nums[1] ... nums[n-1]
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 4
 * 1 2 3 1
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * true
 * </pre>
 *
 * <p>Approach: walk the array and add every value to a hash set. The call
 * {@code set.add(value)} returns {@code false} when the value was already there —
 * that is the duplicate.
 *
 * <p>Complexity: Time O(n), Space O(n).
 */
public class ContainsDuplicate {

    /**
     * Returns {@code true} when {@code nums} contains the same value twice.
     *
     * @param nums the array to scan
     * @return {@code true} when a duplicate exists
     */
    public static boolean containsDuplicate(int[] nums) {
        Set<Integer> seen = new HashSet<>();
        for (int num : nums) {
            if (!seen.add(num)) {
                return true; // the value was already in the set
            }
        }
        return false;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] nums = fs.nextIntArray(n);

        System.out.println(containsDuplicate(nums));
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
 * Problem: Contains Duplicate
 * LeetCode: 217 | Difficulty: Easy | Frequency: 4/5
 * Pattern: Hashing, Set membership
 *
 * <p>Problem: Given an array of integers, decide whether any value appears at least
 * twice.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * nums[0] nums[1] ... nums[n-1]
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 4
 * 1 2 3 1
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * true
 * </pre>
 *
 * <p>Approach: walk the array and add every value to a hash set. The call
 * {@code set.add(value)} returns {@code false} when the value was already there —
 * that is the duplicate.
 *
 * <p>Complexity: Time O(n), Space O(n).
 */
public class Main {

    /**
     * Returns {@code true} when {@code nums} contains the same value twice.
     *
     * @param nums the array to scan
     * @return {@code true} when a duplicate exists
     */
    public static boolean containsDuplicate(int[] nums) {
        Set<Integer> seen = new HashSet<>();
        for (int num : nums) {
            if (!seen.add(num)) {
                return true; // the value was already in the set
            }
        }
        return false;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] nums = fs.nextIntArray(n);

        System.out.println(containsDuplicate(nums));
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
# Contains Duplicate — LeetCode 217

| | |
|---|---|
| **Difficulty** | Easy |
| **Pattern** | Hashing · Set membership |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Meta, Google, Uber, Adobe |

## Problem Statement

Given an array of integers, decide whether it contains the same value twice.

- Return \`true\` when a value appears at least twice, \`false\` otherwise.
- The array does **not** have to be sorted.

## Input Format

The program reads from standard input:

\`\`\`
n
nums[0] nums[1] ... nums[n-1]
\`\`\`

- \`n\` — the length of the array (1 ≤ n ≤ 10⁵).
- \`nums\` — n space-separated integers.

## Sample Input

\`\`\`
4
1 2 3 1
\`\`\`

## Expected Output

\`\`\`
true
\`\`\`

\`1\` appears at index 0 and index 3.

## Approach — Let the set answer the question

Walk the array and add every value to a hash set. Java's \`Set.add\` returns

- \`true\` when the value was **not** in the set yet,
- \`false\` when the value was **already** there.

A \`false\` return is exactly the answer to the question, so the algorithm can stop
immediately.

**Why not sort and compare neighbours?** That also works in O(n log n) time and O(1)
space, but the hash set is O(n) time — and the question is really a "have I seen this
before?" question, which is what a set is for.

**Why not \`Arrays.sort\` + a loop?** Sorting mutates the input. The set version does
not touch the array at all.

## Dry Run

Input: \`nums = [1, 2, 3, 1]\`

| Step | value | \`seen.add(value)\` | \`seen\` after | result |
|---:|---:|---|---|---|
| 1 | 1 | ✔ (new) | \`{1}\` | continue |
| 2 | 2 | ✔ (new) | \`{1, 2}\` | continue |
| 3 | 3 | ✔ (new) | \`{1, 2, 3}\` | continue |
| 4 | 1 | ✘ (**already there**) | \`{1, 2, 3}\` | **return true** |

Final answer: **true**

### A rejection — \`nums = [1, 2, 3, 4]\`

| Step | value | \`seen.add(value)\` | \`seen\` after | result |
|---:|---:|---|---|---|
| 1 | 1 | ✔ | \`{1}\` | continue |
| 2 | 2 | ✔ | \`{1, 2}\` | continue |
| 3 | 3 | ✔ | \`{1, 2, 3}\` | continue |
| 4 | 4 | ✔ | \`{1, 2, 3, 4}\` | continue |

The loop ends without a failed add → **return false**

### The empty and single-element cases

| input | steps | result |
|---|---|---|
| \`[]\` | the loop never runs | false |
| \`[7]\` | one successful add | false |

## Java Solution

See [\`ContainsDuplicate.java\`](./ContainsDuplicate.java).

\`\`\`java
public static boolean containsDuplicate(int[] nums) {
    Set<Integer> seen = new HashSet<>();
    for (int num : nums) {
        if (!seen.add(num)) {
            return true;
        }
    }
    return false;
}
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n) | One hash-set operation per element, O(1) on average |
| **Space** | O(n) | The set holds the distinct values |

## Interview Notes

**Follow-ups to raise yourself:**
- *"Can you do it in O(1) space?"* → yes: sort the array (O(n log n)) and compare
  neighbours, or use the fact that the values are in \`1..n\` and mark them in a
  boolean array.
- *"What if the array is sorted?"* → just compare \`nums[i]\` with \`nums[i + 1]\`.
- *"What if the values are large — up to 10¹⁸?"* → a \`HashSet<Long>\` still works;
  a counting array does not.
- *"How would you count the duplicates instead of just detecting them?"* → see
  [Find All Duplicates in an Array](../../../../../../docs/topics/09-hashing.md).

**Common mistakes:**
- ❌ Checking \`seen.contains(num)\` **and then** adding it → two lookups per element;
  \`add\` already tells you the answer.
- ❌ Forgetting to **return** \`false\` at the end → the method would not compile.
- ❌ Using a \`List\` instead of a \`Set\` → the lookup becomes O(n) and the whole
  algorithm O(n²).
- ❌ Returning \`true\` when the set is **not empty** → every non-empty array would be
  reported as containing a duplicate.

**How to narrate:**
> "I walk the array and add every value to a hash set. \`Set.add\` returns false when
> the value was already there, so a failed add means I have found a duplicate and I
> can return true immediately. O(n) time, O(n) space, and the input array is never
> modified."

## Related Problems

- [Find All Duplicates in an Array](../../../../../../docs/topics/09-hashing.md) — the same trick, but collecting them
- [Longest Consecutive Sequence](../../../../../../docs/topics/09-hashing.md) — a set used to find runs
- [Intersection of Two Arrays](../../../../../../docs/topics/09-hashing.md) — set intersection
`,i=[`containsDuplicate`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};