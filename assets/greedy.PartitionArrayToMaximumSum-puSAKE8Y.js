var e=`greedy.PartitionArrayToMaximumSum`,t=`package com.dsa.greedy;

import com.dsa.utils.FastScanner;

import java.util.PriorityQueue;

/**
 * Problem: Partition Array Into Maximum Subarrays
 * LeetCode: 813 | Difficulty: Medium | Frequency: 3/5
 * Pattern: Greedy, Keep the k largest
 *
 * <p>Problem:
 * Split {@code nums} into exactly {@code k} non-empty contiguous subarrays. The value of
 * a partition is the sum of the maximum element of every subarray. Return the largest
 * possible value.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * nums[0] nums[1] ... nums[n-1]
 * k
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 5
 * 1 2 3 4 5
 * 2
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 9
 * </pre>
 *
 * <p>Approach: the value of a partition is the sum of the maxima of its {@code k} parts,
 * so it can never exceed the sum of the {@code k} largest elements of the array — and
 * that bound is always reachable. A min-heap of size {@code k} keeps the {@code k}
 * largest values seen so far, so the running sum is the answer.
 *
 * <p>Complexity: Time O(n log k), Space O(k).
 */
public class PartitionArrayToMaximumSum {

    /**
     * Returns the largest possible sum of the maxima of the {@code k} parts.
     *
     * @param nums the array to split
     * @param k    number of contiguous parts, {@code 1 <= k <= nums.length}
     * @return the maximum sum of the part maxima
     */
    public static int maxSumToLength(int[] nums, int k) {
        if (nums == null || nums.length == 0 || k <= 0) {
            return 0;
        }
        if (k >= nums.length) {
            int all = 0;
            for (int x : nums) {
                all += x;
            }
            return all;
        }
        PriorityQueue<Integer> largest = new PriorityQueue<>();   // min-heap of the k biggest
        int sum = 0;
        for (int x : nums) {
            largest.add(x);
            sum += x;
            if (largest.size() > k) {
                sum -= largest.poll();
            }
        }
        return sum;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] nums = fs.nextIntArray(n);
        int k = fs.nextInt();

        System.out.println(maxSumToLength(nums, k));
    }
}
`,n=`import java.util.PriorityQueue;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

/**
 * Problem: Partition Array Into Maximum Subarrays
 * LeetCode: 813 | Difficulty: Medium | Frequency: 3/5
 * Pattern: Greedy, Keep the k largest
 *
 * <p>Problem:
 * Split {@code nums} into exactly {@code k} non-empty contiguous subarrays. The value of
 * a partition is the sum of the maximum element of every subarray. Return the largest
 * possible value.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * nums[0] nums[1] ... nums[n-1]
 * k
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 5
 * 1 2 3 4 5
 * 2
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 9
 * </pre>
 *
 * <p>Approach: the value of a partition is the sum of the maxima of its {@code k} parts,
 * so it can never exceed the sum of the {@code k} largest elements of the array — and
 * that bound is always reachable. A min-heap of size {@code k} keeps the {@code k}
 * largest values seen so far, so the running sum is the answer.
 *
 * <p>Complexity: Time O(n log k), Space O(k).
 */
public class Main {

    /**
     * Returns the largest possible sum of the maxima of the {@code k} parts.
     *
     * @param nums the array to split
     * @param k    number of contiguous parts, {@code 1 <= k <= nums.length}
     * @return the maximum sum of the part maxima
     */
    public static int maxSumToLength(int[] nums, int k) {
        if (nums == null || nums.length == 0 || k <= 0) {
            return 0;
        }
        if (k >= nums.length) {
            int all = 0;
            for (int x : nums) {
                all += x;
            }
            return all;
        }
        PriorityQueue<Integer> largest = new PriorityQueue<>();   // min-heap of the k biggest
        int sum = 0;
        for (int x : nums) {
            largest.add(x);
            sum += x;
            if (largest.size() > k) {
                sum -= largest.poll();
            }
        }
        return sum;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] nums = fs.nextIntArray(n);
        int k = fs.nextInt();

        System.out.println(maxSumToLength(nums, k));
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
# Partition Array Into Maximum Subarrays — LeetCode 813

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Greedy · Keep the k largest |
| **Interview heat** | ★★★☆☆ |
| **Asked at** | Amazon, Google, Meta |

## Problem Statement

Split \`nums\` into **exactly \`k\`** non-empty contiguous subarrays. The value of a
partition is the sum of the **maximum element of every subarray**. Return the largest
possible value.

\`\`\`
nums = [1, 2, 3, 4, 5], k = 2
[1, 2, 3, 4] | [5]   ->  4 + 5 = 9      <- best
[1, 2, 3]    | [4, 5] ->  3 + 5 = 8
\`\`\`

## Input Format

The program reads from standard input:

\`\`\`
n
nums[0] nums[1] ... nums[n-1]
k
\`\`\`

- \`n\` — length of the array (1 ≤ n ≤ 10⁴)
- \`nums\` — n space-separated integers
- \`k\` — number of parts (1 ≤ k ≤ n)

## Sample Input

\`\`\`
5
1 2 3 4 5
2
\`\`\`

## Expected Output

\`\`\`
9
\`\`\`

\`[1, 2, 3, 4] | [5]\` gives \`4 + 5 = 9\`.

## Approach — the answer is the sum of the k largest elements

**Upper bound.** Each of the \`k\` parts contributes exactly one maximum, so the value of
any partition is the sum of \`k\` elements of the array — never more than the sum of the
\`k\` largest elements.

**The bound is reachable.** Take the \`k\` largest elements at indices
\`i₁ < i₂ < … < i_k\` and cut the array right before each of them. The \`j\`-th part then
runs from \`i_{j-1}+1\` to \`i_j\`:

- Every element between \`i_{j-1}+1\` and \`i_j\` is **at most** \`nums[i_j]\`. Otherwise a
  strictly larger element would be one of the \`k\` largest and would sit between two
  selected indices — contradicting that \`i_{j-1}\` and \`i_j\` are consecutive.
- The last part runs from \`i_{k-1}+1\` to the end and its maximum is \`nums[i_k]\` for the
  same reason.

So \`nums[i_j]\` really is the maximum of its part, and the partition reaches the upper
bound: **the answer is the sum of the \`k\` largest elements.**

To compute it, keep a min-heap of size \`k\` while scanning the array: push every
value, and if the heap grows beyond \`k\` remove its smallest element. The running sum
is then the sum of the \`k\` largest values seen so far.

**Exchange argument (why keeping the k largest is safe):** whenever the heap already
holds \`k\` values and a new value \`x\` arrives, either \`x\` is smaller than the smallest
kept value (then it can never be one of the \`k\` largest — drop it) or it is larger
(replacing the smallest kept value increases the sum and keeps exactly the \`k\` largest
values). Every decision only ever discards a value that provably cannot be part of the
\`k\` largest, so the final sum is the maximum possible.

## Dry Run

Input: \`nums = [1, 2, 3, 4, 5]\`, \`k = 2\`

| Step | value | heap after push | heap (min first) | running sum | dropped |
|---:|---:|---|---|---:|---|
| 1 | 1 | \`[1]\` | \`{1}\` | 1 | — |
| 2 | 2 | \`[1, 2]\` | \`{1, 2}\` | 3 | — |
| 3 | 3 | \`[1, 2, 3]\` → pop 1 | \`{2, 3}\` | 5 | 1 |
| 4 | 4 | \`[2, 3, 4]\` → pop 2 | \`{3, 4}\` | 7 | 2 |
| 5 | 5 | \`[3, 4, 5]\` → pop 3 | \`{4, 5}\` | 9 | 3 |

Final sum = **9**, i.e. the two largest values \`5\` and \`4\`.

## Java Solution

See [\`PartitionArrayToMaximumSum.java\`](./PartitionArrayToMaximumSum.java).

\`\`\`java
public static int maxSumToLength(int[] nums, int k) {
    if (nums.length == 0 || k <= 0) {
        return 0;
    }
    if (k >= nums.length) {
        int all = 0;
        for (int x : nums) {
            all += x;
        }
        return all;
    }
    PriorityQueue<Integer> largest = new PriorityQueue<>();   // min-heap of the k biggest
    int sum = 0;
    for (int x : nums) {
        largest.add(x);
        sum += x;
        if (largest.size() > k) {
            sum -= largest.poll();
        }
    }
    return sum;
}
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n log k) | one heap push (and at most one pop) per element |
| **Space** | O(k) | the heap never holds more than \`k + 1\` values |

## Interview Notes

**Follow-ups to raise yourself:**
- *"What if the parts do not have to be contiguous?"* → the answer is simply the sum of
  the \`k\` largest values and the heap is overkill; sort instead.
- *"What if each part contributes its **minimum** instead of its maximum?"* → the same
  argument with the \`k\` smallest values.
- *"What if the value of a part is the sum of its elements?"* → every partition has the
  same value, so the answer is just the total sum.

**Common mistakes:**
- ❌ Assuming the parts may be empty — the statement demands exactly \`k\` **non-empty**
  parts; with \`k == n\` every part is a single element.
- ❌ Forgetting the \`k >= n\` shortcut — the heap would still work, but the special case
  documents the intent.
- ❌ Returning the sum of the \`k\` largest *without* the reachability argument — the
  interviewer's first question is "can those values really be maxima of their parts?".

**How to narrate:**
> "The value of a partition is the sum of \`k\` elements, so it can never beat the sum
> of the \`k\` largest elements. That bound is reachable: cut the array right before
> each of the \`k\` largest values — everything between two cuts is smaller than the
> value that opens the next cut, otherwise that value would also be among the \`k\`
> largest. So the answer is the sum of the \`k\` largest elements, and a min-heap of
> size \`k\` computes it in one pass."

## Related Problems

- [Hand of Straights](./HandOfStraights.md) — the same "keep the best values" heap idea
- [Maximum Units on a Truck](./MaximumUnitsOnATruck.md) — greedy on sorted values
`,i=[`maxSumToLength`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};