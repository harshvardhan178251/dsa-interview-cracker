var e=`hashing.IntersectionOfTwoArrays`,t=`package com.dsa.hashing;

import com.dsa.utils.FastScanner;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.TreeSet;

/**
 * Problem: Intersection of Two Arrays
 * LeetCode: 349 | Difficulty: Easy | Frequency: 3/5
 * Pattern: Hashing, Set intersection
 *
 * <p>Problem: Given two arrays, return the values that appear in **both** of them.
 * Every value is reported once and the result is sorted in ascending order.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * nums1[0] ... nums1[n-1]
 * m
 * nums2[0] ... nums2[m-1]
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 3
 * 4 9 5
 * 5
 * 9 4 9 8 4
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 4 9
 * </pre>
 *
 * <p>Approach: put the values of the first array into a hash set, then collect the
 * values of the second array that are in the set. A tree set keeps the result
 * duplicate-free and sorted.
 *
 * <p>Complexity: Time O(n + m log m), Space O(n).
 */
public class IntersectionOfTwoArrays {

    /**
     * Returns the distinct values that occur in both arrays, in ascending order.
     *
     * @param nums1 the first array
     * @param nums2 the second array
     * @return the intersection, ascending
     */
    public static List<Integer> intersection(int[] nums1, int[] nums2) {
        Set<Integer> values = new HashSet<>();
        for (int num : nums1) {
            values.add(num);
        }

        Set<Integer> common = new TreeSet<>(); // sorted and duplicate-free
        for (int num : nums2) {
            if (values.contains(num)) {
                common.add(num);
            }
        }
        return new ArrayList<>(common);
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] nums1 = fs.nextIntArray(n);
        int m = fs.nextInt();
        int[] nums2 = fs.nextIntArray(m);

        List<Integer> common = intersection(nums1, nums2);

        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < common.size(); i++) {
            if (i > 0) {
                sb.append(' ');
            }
            sb.append(common.get(i));
        }
        System.out.println(sb);
    }
}
`,n=`import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.TreeSet;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

/**
 * Problem: Intersection of Two Arrays
 * LeetCode: 349 | Difficulty: Easy | Frequency: 3/5
 * Pattern: Hashing, Set intersection
 *
 * <p>Problem: Given two arrays, return the values that appear in **both** of them.
 * Every value is reported once and the result is sorted in ascending order.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * nums1[0] ... nums1[n-1]
 * m
 * nums2[0] ... nums2[m-1]
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 3
 * 4 9 5
 * 5
 * 9 4 9 8 4
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 4 9
 * </pre>
 *
 * <p>Approach: put the values of the first array into a hash set, then collect the
 * values of the second array that are in the set. A tree set keeps the result
 * duplicate-free and sorted.
 *
 * <p>Complexity: Time O(n + m log m), Space O(n).
 */
public class Main {

    /**
     * Returns the distinct values that occur in both arrays, in ascending order.
     *
     * @param nums1 the first array
     * @param nums2 the second array
     * @return the intersection, ascending
     */
    public static List<Integer> intersection(int[] nums1, int[] nums2) {
        Set<Integer> values = new HashSet<>();
        for (int num : nums1) {
            values.add(num);
        }

        Set<Integer> common = new TreeSet<>(); // sorted and duplicate-free
        for (int num : nums2) {
            if (values.contains(num)) {
                common.add(num);
            }
        }
        return new ArrayList<>(common);
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] nums1 = fs.nextIntArray(n);
        int m = fs.nextInt();
        int[] nums2 = fs.nextIntArray(m);

        List<Integer> common = intersection(nums1, nums2);

        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < common.size(); i++) {
            if (i > 0) {
                sb.append(' ');
            }
            sb.append(common.get(i));
        }
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
# Intersection of Two Arrays — LeetCode 349

| | |
|---|---|
| **Difficulty** | Easy |
| **Pattern** | Hashing · Set intersection |
| **Interview heat** | ★★★☆☆ |
| **Asked at** | Amazon, Meta, Google, Uber |

## Problem Statement

Given two arrays, return the values that appear in **both** of them.

- Every value is reported **once**, even when it appears several times.
- The result is sorted in ascending order.
- The result is printed as space-separated integers on one line.

## Input Format

The program reads from standard input:

\`\`\`
n
nums1[0] nums1[1] ... nums1[n-1]
m
nums2[0] nums2[1] ... nums2[m-1]
\`\`\`

- \`n\` — the length of the first array (1 ≤ n ≤ 10⁵).
- \`nums1\` — n space-separated integers.
- \`m\` — the length of the second array (1 ≤ m ≤ 10⁵).
- \`nums2\` — m space-separated integers.

## Sample Input

\`\`\`
3
4 9 5
5
9 4 9 8 4
\`\`\`

## Expected Output

\`\`\`
4 9
\`\`\`

\`4\` and \`9\` are in both arrays; \`5\` and \`8\` are not.

## Approach — Hash the small side, scan the other

1. Put the values of the first array into a hash set — a lookup is now O(1).
2. Walk the second array and keep every value that is in the set.
3. The result set is a \`TreeSet\`, so it is duplicate-free **and** sorted.

**Why a set and not a nested loop:** checking every pair is O(n · m). Hashing the
first array makes each lookup O(1), so the whole thing is O(n + m).

**Why a \`TreeSet\` for the result:** a \`HashSet\` would be O(n + m) but the output
order would be undefined. A \`TreeSet\` keeps the values sorted at the cost of
O(log k) per insertion — still linear overall for the usual case.

## Dry Run

Input: \`nums1 = [4, 9, 5]\`, \`nums2 = [9, 4, 9, 8, 4]\`

### Phase 1 — hash the first array

| Step | value | \`values\` after |
|---:|---:|---|
| 1 | 4 | \`{4}\` |
| 2 | 9 | \`{4, 9}\` |
| 3 | 5 | \`{4, 9, 5}\` |

### Phase 2 — scan the second array

| Step | value | in \`values\`? | \`common\` after |
|---:|---:|---|---|
| 1 | 9 | ✔ | \`{9}\` |
| 2 | 4 | ✔ | \`{9, 4}\` |
| 3 | 9 | ✔ | \`{9, 4}\` — already there, the set keeps it unique |
| 4 | 8 | ✘ | \`{9, 4}\` |
| 5 | 4 | ✔ | \`{9, 4}\` |

### Phase 3 — the tree set keeps the values sorted

| order | value |
|---:|---|
| 1 | 4 |
| 2 | 9 |

Final answer: **\`4 9\`**

### An empty intersection — \`nums1 = [1, 2]\`, \`nums2 = [3, 4]\`

| value in \`nums2\` | in \`values\`? | \`common\` after |
|---|---|---|
| 3 | ✘ | \`{}\` |
| 4 | ✘ | \`{}\` |

Final answer: **an empty line** — the program prints nothing between the groups.

## Java Solution

See [\`IntersectionOfTwoArrays.java\`](./IntersectionOfTwoArrays.java).

\`\`\`java
public static List<Integer> intersection(int[] nums1, int[] nums2) {
    Set<Integer> values = new HashSet<>();
    for (int num : nums1) {
        values.add(num);
    }
    Set<Integer> common = new TreeSet<>();
    for (int num : nums2) {
        if (values.contains(num)) {
            common.add(num);
        }
    }
    return new ArrayList<>(common);
}
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n + m log m) | n inserts into a hash set, m lookups and up to m inserts into a tree set |
| **Space** | O(n + m) | Both sets |

With a plain \`HashSet\` for the result the time is O(n + m) — the extra log comes
from keeping the output sorted.

## Interview Notes

**Follow-ups to raise yourself:**
- *"What if the result should keep the duplicates of the second array?"* → use a list
  and append every match instead of a set.
- *"What if the arrays are sorted?"* → two pointers, O(n + m) time and O(1) space.
- *"What if the input is a stream?"* → keep a hash set of the first stream and probe
  it with the second.
- *"How does this relate to LeetCode 350 (intersection with duplicates)?"* → count the
  occurrences with a map instead of a set.

**Common mistakes:**
- ❌ Returning duplicates → a set is needed, or the output has to be deduplicated.
- ❌ Forgetting that a value may appear several times in **both** arrays → it is
  still reported once.
- ❌ Relying on the \`HashSet\` iteration order for the output → not deterministic.
- ❌ Hashing the **larger** array → always hash the smaller one when you can choose.

**How to narrate:**
> "I hash the first array into a set so every lookup during the scan of the second
> array is O(1). The matches go into a tree set, which keeps them unique and sorted,
> so the output is deterministic. That's O(n + m) time; with a plain hash set it
> would be O(n + m) but the order would be undefined."

## Related Problems

- [Find All Duplicates in an Array](../../../../../../docs/topics/09-hashing.md) — set membership for duplicates
- [Contains Duplicate](../../../../../../docs/topics/09-hashing.md) — the simplest set check
- [Two Sum](../../../../../../docs/topics/01-arrays.md) — a hash map used to find a complement
`,i=[`intersection`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};