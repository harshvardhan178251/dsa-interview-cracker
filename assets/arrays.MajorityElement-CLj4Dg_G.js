var e=`arrays.MajorityElement`,t=`package com.dsa.arrays;

import com.dsa.utils.FastScanner;

/**
 * Problem: Majority Element
 * LeetCode: 169 | Difficulty: Easy | Frequency: 4/5
 * Pattern: Boyer-Moore voting, Majority guarantee
 *
 * <p>Problem:
 * Given an array {@code nums} of size {@code n}, return the <em>majority element} — the
 * element that appears more than {@code n / 2} times. The problem guarantees that such
 * an element always exists.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * nums[0] nums[1] ... nums[n-1]
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 7
 * 2 2 1 1 1 2 2
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 2
 * </pre>
 *
 * <p>Approach: Boyer-Moore voting. Keep a candidate and a counter. A different value
 * cancels the candidate out, so the surplus of the true majority can never be erased —
 * whatever survives the whole scan is the majority. Because the existence of a majority
 * is guaranteed, no verification pass is needed.
 *
 * <p>Complexity: Time O(n), Space O(1).
 */
public class MajorityElement {

    /**
     * Returns the element appearing in more than half of the array.
     *
     * @param nums the input array (guaranteed to have a majority element)
     * @return the majority element
     */
    public static int majorityElement(int[] nums) {
        int candidate = 0;
        int count = 0;
        for (int value : nums) {
            if (count == 0) {
                candidate = value;
                count = 1;
            } else if (value == candidate) {
                count++;
            } else {
                count--;
            }
        }
        return candidate;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] nums = fs.nextIntArray(n);

        System.out.println(majorityElement(nums));
    }
}
`,n=`import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

/**
 * Problem: Majority Element
 * LeetCode: 169 | Difficulty: Easy | Frequency: 4/5
 * Pattern: Boyer-Moore voting, Majority guarantee
 *
 * <p>Problem:
 * Given an array {@code nums} of size {@code n}, return the <em>majority element} — the
 * element that appears more than {@code n / 2} times. The problem guarantees that such
 * an element always exists.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * nums[0] nums[1] ... nums[n-1]
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 7
 * 2 2 1 1 1 2 2
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 2
 * </pre>
 *
 * <p>Approach: Boyer-Moore voting. Keep a candidate and a counter. A different value
 * cancels the candidate out, so the surplus of the true majority can never be erased —
 * whatever survives the whole scan is the majority. Because the existence of a majority
 * is guaranteed, no verification pass is needed.
 *
 * <p>Complexity: Time O(n), Space O(1).
 */
public class Main {

    /**
     * Returns the element appearing in more than half of the array.
     *
     * @param nums the input array (guaranteed to have a majority element)
     * @return the majority element
     */
    public static int majorityElement(int[] nums) {
        int candidate = 0;
        int count = 0;
        for (int value : nums) {
            if (count == 0) {
                candidate = value;
                count = 1;
            } else if (value == candidate) {
                count++;
            } else {
                count--;
            }
        }
        return candidate;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] nums = fs.nextIntArray(n);

        System.out.println(majorityElement(nums));
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
# Majority Element — LeetCode 169

| | |
|---|---|
| **Difficulty** | Easy |
| **Pattern** | Boyer-Moore voting · Majority guarantee |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Uber, Microsoft |

## Problem Statement

Given an array \`nums\` of size \`n\`, return the **majority element** — the element that
appears **more than \`n / 2\` times**.

The problem guarantees that such an element always exists, so the answer is unique.

## Input Format

\`\`\`
n
nums[0] nums[1] ... nums[n-1]
\`\`\`

- \`n\` — length of the array (1 ≤ n ≤ 5 × 10⁴)
- \`nums\` — n space-separated integers

## Sample Input

\`\`\`
7
2 2 1 1 1 2 2
\`\`\`

## Expected Output

\`\`\`
2
\`\`\`

\`2\` appears 4 times; \`4 > 7 / 2 = 3.5\`.

## Approach — Boyer-Moore Majority Vote

A hash map with frequencies is the obvious O(n) solution, but it uses O(n) space. Because
the majority appears **more than half** the time, we can find it in **O(1) space**.

Think of the array as a battle: whenever two *different* values meet, they cancel out.
The majority has more units than all the others combined, so it can never be fully
cancelled — whatever survives is the majority.

Algorithm:

\`\`\`
candidate = ?, count = 0
for each value:
    if count == 0:  candidate = value; count = 1
    else if value == candidate: count++
    else: count--
\`\`\`

**Why the guarantee matters:** if no majority is guaranteed, this algorithm only produces
a *candidate*. You would need a second pass to verify that the candidate really occurs
more than \`n / 2\` times. Here the guarantee lets us skip that pass.

## Dry Run

Input: \`nums = [2, 2, 1, 1, 1, 2, 2]\`

| Step | i | \`value\` | \`count\` before | action | \`candidate\` after | \`count\` after | running array |
|---:|---:|---:|---:|---|---:|---:|---|
| 1 | 0 | 2 | 0 | \`count == 0\` → new candidate | 2 | 1 | \`2\` |
| 2 | 1 | 2 | 1 | matches candidate → \`count++\` | 2 | 2 | \`2 2\` |
| 3 | 2 | 1 | 2 | differs → cancel → \`count--\` | 2 | 1 | \`2 2\` (the 1 is cancelled) |
| 4 | 3 | 1 | 1 | differs → cancel → \`count--\` | 2 | 0 | \`2 2\` (both 1s cancelled) |
| 5 | 4 | 1 | 0 | \`count == 0\` → new candidate | **1** | 1 | \`1\` |
| 6 | 5 | 2 | 1 | differs → cancel → \`count--\` | 1 | 0 | \`2\` (the leftover 2 wins) |
| 7 | 6 | 2 | 0 | \`count == 0\` → new candidate | **2** | 1 | \`2\` |

Survivor: **2** — and indeed \`2\` occurs 4 times out of 7 (> 3.5) ✓

## Java Solution

See [\`MajorityElement.java\`](./MajorityElement.java).

\`\`\`java
public static int majorityElement(int[] nums) {
    int candidate = 0;
    int count = 0;
    for (int value : nums) {
        if (count == 0) {
            candidate = value;
            count = 1;
        } else if (value == candidate) {
            count++;
        } else {
            count--;
        }
    }
    return candidate;
}
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n) | One pass |
| **Space** | O(1) | Two scalars |

## Interview Notes

**Follow-ups to raise yourself:**
- *"What if the majority is not guaranteed?"* → add a verification pass that recounts the
  candidate; return -1 if it does not exceed \`n / 2\`.
- *"What if there can be more than one majority?"* → impossible for \`> n/2\`, but for
  \`> n/3\` you need two candidates — see
  [Majority Element II](MajorityElementII.md).
- *"What if the array is a stream and you cannot revisit it?"* → Boyer-Moore works
  online; only the verification pass needs a second pass.
- *"What if the values are not integers?"* → the algorithm only needs \`equals\`, so it
  works for any comparable type.
- *"Can you do it in O(n) with a sort?"* → yes: sort and take the middle element (a
  majority occupies the median position), but that is O(n log n) and O(n) space.

**Common mistakes:**
- ❌ Forgetting the \`count == 0\` branch and always comparing to a stale candidate — the
  classic bug is writing \`else if (value == candidate) count++; else count--;\` without
  ever resetting the candidate.
- ❌ Using \`count > 0\` instead of \`count == 0\` for the reset — the candidate must be
  re-seeded exactly when the count drops to zero.
- ❌ Assuming the algorithm works without the majority guarantee (it only nominates a
  candidate).
- ❌ Returning the most frequent value from a map and calling it "Boyer-Moore" — that is
  the O(n) space solution, a different one.

**How to narrate:**
> "Because the majority appears more than half the time, I can cancel out pairs of
> different values and the majority will always survive. I keep a candidate and a
> counter: when the counter hits zero I pick the current value as the new candidate,
> when the value matches I increment, otherwise I decrement. Since LeetCode guarantees a
> majority exists, I don't need a verification pass. It's O(n) time and O(1) space."

## Related Problems

- [Majority Element II](MajorityElementII.md) — the same idea with two candidates
- [Contains Duplicate II](ContainsDuplicateII.md) — hash-map bookkeeping
- [Maximum Subarray](MaxSubarray.md) — the other classic single-pass scan
`,i=[`majorityElement`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};