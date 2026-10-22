var e=`hashing.FindAllDuplicatesInArray`,t=`package com.dsa.hashing;

import com.dsa.utils.FastScanner;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashSet;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

/**
 * Problem: Find All Duplicates in an Array
 * LeetCode: 442 | Difficulty: Medium | Frequency: 3/5
 * Pattern: Hashing, Frequency counting
 *
 * <p>Problem: Given an array of integers where every value is between {@code 1} and
 * {@code n} ({@code n} is the length of the array), return all the values that
 * appear **more than once**, in ascending order.
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
 * 4 2 4 1 2
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 2 4
 * </pre>
 *
 * <p>Approach: a set remembers the values that were seen. A value that is already in
 * the set is a duplicate and is collected in a second set; the result is sorted
 * before it is printed.
 *
 * <p>Complexity: Time O(n log n) because of the final sort, Space O(n).
 */
public class FindAllDuplicatesInArray {

    /**
     * Returns every value that occurs more than once, in ascending order.
     *
     * @param nums the array to scan (values are between 1 and nums.length)
     * @return the duplicated values, ascending
     */
    public static List<Integer> findAllDuplicates(int[] nums) {
        Set<Integer> seen = new HashSet<>();
        Set<Integer> duplicates = new LinkedHashSet<>();

        for (int num : nums) {
            if (!seen.add(num)) {
                duplicates.add(num); // already present -> this is the second occurrence
            }
        }

        List<Integer> result = new ArrayList<>(duplicates);
        Collections.sort(result);
        return result;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] nums = fs.nextIntArray(n);

        List<Integer> duplicates = findAllDuplicates(nums);

        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < duplicates.size(); i++) {
            if (i > 0) {
                sb.append(' ');
            }
            sb.append(duplicates.get(i));
        }
        System.out.println(sb);
    }
}
`,n=`import java.util.ArrayList;
import java.util.Collections;
import java.util.HashSet;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

/**
 * Problem: Find All Duplicates in an Array
 * LeetCode: 442 | Difficulty: Medium | Frequency: 3/5
 * Pattern: Hashing, Frequency counting
 *
 * <p>Problem: Given an array of integers where every value is between {@code 1} and
 * {@code n} ({@code n} is the length of the array), return all the values that
 * appear **more than once**, in ascending order.
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
 * 4 2 4 1 2
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 2 4
 * </pre>
 *
 * <p>Approach: a set remembers the values that were seen. A value that is already in
 * the set is a duplicate and is collected in a second set; the result is sorted
 * before it is printed.
 *
 * <p>Complexity: Time O(n log n) because of the final sort, Space O(n).
 */
public class Main {

    /**
     * Returns every value that occurs more than once, in ascending order.
     *
     * @param nums the array to scan (values are between 1 and nums.length)
     * @return the duplicated values, ascending
     */
    public static List<Integer> findAllDuplicates(int[] nums) {
        Set<Integer> seen = new HashSet<>();
        Set<Integer> duplicates = new LinkedHashSet<>();

        for (int num : nums) {
            if (!seen.add(num)) {
                duplicates.add(num); // already present -> this is the second occurrence
            }
        }

        List<Integer> result = new ArrayList<>(duplicates);
        Collections.sort(result);
        return result;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] nums = fs.nextIntArray(n);

        List<Integer> duplicates = findAllDuplicates(nums);

        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < duplicates.size(); i++) {
            if (i > 0) {
                sb.append(' ');
            }
            sb.append(duplicates.get(i));
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
# Find All Duplicates in an Array — LeetCode 442

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Hashing · Frequency counting |
| **Interview heat** | ★★★☆☆ |
| **Asked at** | Amazon, Meta, Google, Uber |

## Problem Statement

Given an array \`nums\` where every value is between \`1\` and \`n\` (\`n\` is the length of
the array), return all the values that occur **more than once**.

- Every duplicated value is reported **once**, no matter how often it appears.
- The result is sorted in ascending order.
- The result is printed as space-separated integers on one line.

## Input Format

The program reads from standard input:

\`\`\`
n
nums[0] nums[1] ... nums[n-1]
\`\`\`

- \`n\` — the length of the array (1 ≤ n ≤ 10⁵).
- \`nums\` — n space-separated integers, each between \`1\` and \`n\`.

## Sample Input

\`\`\`
5
4 2 4 1 2
\`\`\`

## Expected Output

\`\`\`
2 4
\`\`\`

\`4\` appears at indices 0 and 2, \`2\` appears at indices 1 and 4; \`1\` appears once.

## Approach — A set of seen values and a set of duplicates

Two sets do the work:

- \`seen\` — every value that has been visited so far.
- \`duplicates\` — every value that was found a **second** time.

For each value: if adding it to \`seen\` fails, the value was already there, so it is
a duplicate. A \`LinkedHashSet\` keeps the duplicates in the order they were found, and
the result is sorted before printing.

**Why a second set?** The \`seen\` set still holds the duplicates, so it cannot be
printed directly — and a plain \`HashSet\` would not give a deterministic order.

## Dry Run

Input: \`nums = [4, 2, 4, 1, 2]\`

| Step | value | \`seen.add(value)\` | \`seen\` after | \`duplicates\` after |
|---:|---:|---|---|---|
| 1 | 4 | ✔ (new) | \`{4}\` | \`{}\` |
| 2 | 2 | ✔ (new) | \`{4, 2}\` | \`{}\` |
| 3 | 4 | ✘ (already there) | \`{4, 2}\` | \`{4}\` |
| 4 | 1 | ✔ (new) | \`{4, 2, 1}\` | \`{4}\` |
| 5 | 2 | ✘ (already there) | \`{4, 2, 1}\` | \`{4, 2}\` |

### Sort the duplicates

| step | duplicates before | duplicates after |
|---:|---|---|
| 1 | \`{4, 2}\` | \`[2, 4]\` |

Final answer: **\`2 4\`**

### A value that appears three times — \`[2, 2, 2]\`

| Step | value | \`seen.add(value)\` | \`seen\` after | \`duplicates\` after |
|---:|---:|---|---|---|
| 1 | 2 | ✔ | \`{2}\` | \`{}\` |
| 2 | 2 | ✘ | \`{2}\` | \`{2}\` |
| 3 | 2 | ✘ | \`{2}\` | \`{2}\` |

The third occurrence is **not** added again — a set never stores the same value
twice — so \`2\` is reported exactly once.

## Java Solution

See [\`FindAllDuplicatesInArray.java\`](./FindAllDuplicatesInArray.java).

\`\`\`java
public static List<Integer> findAllDuplicates(int[] nums) {
    Set<Integer> seen = new HashSet<>();
    Set<Integer> duplicates = new LinkedHashSet<>();
    for (int num : nums) {
        if (!seen.add(num)) {
            duplicates.add(num);
        }
    }
    List<Integer> result = new ArrayList<>(duplicates);
    Collections.sort(result);
    return result;
}
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n log n) | O(n) for the sets, plus the sort of the (at most n) duplicates |
| **Space** | O(n) | The two sets |

**The in-place alternative:** because every value is between \`1\` and \`n\`, the array
itself can be used as the counter — for each value \`v\`, negate \`nums[v - 1]\`. A
negative entry means "already seen". That gives O(n) time and O(1) extra space, at
the price of destroying the input.

## Interview Notes

**Follow-ups to raise yourself:**
- *"Can you do it in O(1) space?"* → yes, use the array as the counter (values are in
  \`1..n\`).
- *"What if the values are not bounded?"* → use a hash map of counts instead of a set.
- *"What if you only need to know **whether** there is a duplicate?"* → a single set
  and an early return — see [Contains Duplicate](../../../../../../docs/topics/09-hashing.md).
- *"How would you find the duplicates in a huge array that does not fit in memory?"* →
  external sorting, or a Bloom filter.

**Common mistakes:**
- ❌ Adding the value to \`duplicates\` **without** checking \`seen\` → every value would
  be reported.
- ❌ Printing the \`seen\` set → it contains every value, not only the duplicates.
- ❌ Reporting a value twice when it occurs three times → the duplicate set solves
  this.
- ❌ Forgetting the **sort** → the output order would depend on the hash set.

**How to narrate:**
> "I keep a set of the values I have seen and a second set for the values I meet a
> second time. Adding to a set tells me in O(1) whether the value was already there,
> so a failed add means a duplicate. The duplicate set holds every value at most
> once, and I sort it before printing. O(n log n) with the sort, O(n) space. If the
> values are in 1..n I could also use the array itself as the counter for O(1) extra
> space."

## Related Problems

- [Contains Duplicate](../../../../../../docs/topics/09-hashing.md) — the same set trick, without the list
- [Intersection of Two Arrays](../../../../../../docs/topics/09-hashing.md) — set based intersection
- [Longest Consecutive Sequence](../../../../../../docs/topics/09-hashing.md) — a set used to find runs
`,i=[`findAllDuplicates`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};