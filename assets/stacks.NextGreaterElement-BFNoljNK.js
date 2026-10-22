var e=`stacks.NextGreaterElement`,t=`package com.dsa.stacks;

import com.dsa.utils.FastScanner;

import java.util.ArrayDeque;
import java.util.Arrays;
import java.util.Deque;

/**
 * Problem: Next Greater Element
 * LeetCode: 496 | Difficulty: Easy | Frequency: 4/5
 * Pattern: Monotonic stack
 *
 * <p>Problem:
 * Given an array of integers, for every element find the first element to its right that is
 * **strictly greater**. If there is none, the answer is {@code -1}.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * values[0] values[1] ... values[n-1]
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 4
 * 1 2 1 4
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 2 4 4 -1
 * </pre>
 *
 * <p>Approach: a monotonic decreasing stack of indices. When the current value is greater
 * than the value on top of the stack, that top element's answer is found.
 *
 * <p>Complexity: Time O(n), Space O(n).
 */
public class NextGreaterElement {

    /**
     * Returns the first strictly greater element to the right of every element.
     *
     * @param nums the input array
     * @return the answers, {@code -1} where there is no greater element
     */
    public static int[] nextGreaterElements(int[] nums) {
        int[] result = new int[nums.length];
        Arrays.fill(result, -1);
        Deque<Integer> stack = new ArrayDeque<>();   // indices, values in decreasing order

        for (int i = 0; i < nums.length; i++) {
            while (!stack.isEmpty() && nums[stack.peek()] < nums[i]) {
                result[stack.pop()] = nums[i];
            }
            stack.push(i);
        }
        return result;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] nums = fs.nextIntArray(n);

        int[] answer = nextGreaterElements(nums);

        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < answer.length; i++) {
            if (i > 0) {
                sb.append(' ');
            }
            sb.append(answer[i]);
        }
        System.out.println(sb);
    }
}
`,n=`import java.util.ArrayDeque;
import java.util.Arrays;
import java.util.Deque;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

/**
 * Problem: Next Greater Element
 * LeetCode: 496 | Difficulty: Easy | Frequency: 4/5
 * Pattern: Monotonic stack
 *
 * <p>Problem:
 * Given an array of integers, for every element find the first element to its right that is
 * **strictly greater**. If there is none, the answer is {@code -1}.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * values[0] values[1] ... values[n-1]
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 4
 * 1 2 1 4
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 2 4 4 -1
 * </pre>
 *
 * <p>Approach: a monotonic decreasing stack of indices. When the current value is greater
 * than the value on top of the stack, that top element's answer is found.
 *
 * <p>Complexity: Time O(n), Space O(n).
 */
public class Main {

    /**
     * Returns the first strictly greater element to the right of every element.
     *
     * @param nums the input array
     * @return the answers, {@code -1} where there is no greater element
     */
    public static int[] nextGreaterElements(int[] nums) {
        int[] result = new int[nums.length];
        Arrays.fill(result, -1);
        Deque<Integer> stack = new ArrayDeque<>();   // indices, values in decreasing order

        for (int i = 0; i < nums.length; i++) {
            while (!stack.isEmpty() && nums[stack.peek()] < nums[i]) {
                result[stack.pop()] = nums[i];
            }
            stack.push(i);
        }
        return result;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] nums = fs.nextIntArray(n);

        int[] answer = nextGreaterElements(nums);

        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < answer.length; i++) {
            if (i > 0) {
                sb.append(' ');
            }
            sb.append(answer[i]);
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
# Next Greater Element — LeetCode 496

| | |
|---|---|
| **Difficulty** | Easy |
| **Pattern** | Monotonic stack |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Microsoft, Uber, Bloomberg |

## Problem Statement

Given an array of integers, for every element return the **first** element to its right that
is strictly greater than it, or \`-1\` if no such element exists.

- \`[1, 2, 1, 4]\` → \`[2, 4, 4, -1]\`
  - the first \`1\` is followed by the \`2\`,
  - the \`2\` is followed by the \`4\`,
  - the second \`1\` is also followed by the \`4\`,
  - the \`4\` has nothing greater after it.
- \`[5, 4, 3, 2, 1]\` → \`[-1, -1, -1, -1, -1]\`

## Input Format

The program reads from standard input:

\`\`\`
n
values[0] values[1] ... values[n-1]
\`\`\`

- \`n\` — the length of the array (1 ≤ n ≤ 10⁴)
- \`values\` — n space-separated integers

## Sample Input

\`\`\`
4
1 2 1 4
\`\`\`

## Expected Output

\`\`\`
2 4 4 -1
\`\`\`

## Approach — Monotonic Decreasing Stack

The brute force is O(n²): for every element, scan to the right until you find a bigger one.
The stack version does it in O(n) by **deferring** the questions.

Keep a stack of **indices** whose answers are still unknown. The values on the stack are in
**decreasing** order from bottom to top — that is the invariant.

For each new value \`nums[i]\`:

1. While the stack is not empty and \`nums[stack.top()] < nums[i]\`, the current value is the
   first greater element for the index on top → pop it and write the answer.
2. Push \`i\`.

The loop repeats because one value can be the answer for **several** waiting elements.

**Why the stack stays decreasing:** if \`nums[i]\` is greater than the top, the top is
finished. But if a smaller value sits below a bigger one on the stack, the bigger one would
already have been popped when it was pushed. So the stack is always sorted, and the
comparison at the top is enough.

**Why each index is pushed and popped at most once:** the total work is O(n), not O(n²).

## Dry Run

Input: \`[1, 2, 1, 4]\`, stack shown as **values (top → bottom)**

| Step | i | \`nums[i]\` | stack before | popped (index, value) | stack after | answers so far |
|---:|---:|---:|---|---|---|---|
| 1 | 0 | \`1\` | \`[]\` | — | \`[1]\` | \`[-1]\` |
| 2 | 1 | \`2\` | \`[1]\` | \`0\` (1 < 2) | \`[2]\` | \`[2, -1]\` |
| 3 | 2 | \`1\` | \`[2]\` | — (2 ≥ 1) | \`[2, 1]\` | \`[2, -1, -1]\` |
| 4 | 3 | \`4\` | \`[2, 1]\` | \`2\` (1 < 4), then \`1\` (2 < 4) | \`[4]\` | \`[2, 4, 4, -1]\` |

The stack ends with the one element that never found a greater neighbour. ✓

## Java Solution

See [\`NextGreaterElement.java\`](./NextGreaterElement.java).

\`\`\`java
public static int[] nextGreaterElements(int[] nums) {
    int[] result = new int[nums.length];
    Arrays.fill(result, -1);
    Deque<Integer> stack = new ArrayDeque<>();

    for (int i = 0; i < nums.length; i++) {
        while (!stack.isEmpty() && nums[stack.peek()] < nums[i]) {
            result[stack.pop()] = nums[i];
        }
        stack.push(i);
    }
    return result;
}
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n) | Every index is pushed once and popped at most once |
| **Space** | O(n) | The stack can hold the whole array (strictly decreasing input) |

## Interview Notes

**Follow-ups to raise yourself:**
- *"The array is circular."* → traverse it twice — see
  [Next Greater Element II](NextGreaterElementII.md).
- *"Find the number of days until a warmer day."* → the same stack, but the answer is the
  **distance** instead of the value — see
  [Daily Temperatures](DailyTemperatures.md).
- *"Find the next greater element in an array of strings."* → the same algorithm with a
  custom comparison.
- *"Find the next smaller element."* → flip the comparison.

**Common mistakes:**
- ❌ Using \`<=\` instead of \`<\` → equal elements are treated as "greater", which is wrong for
  a *strictly* greater requirement.
- ❌ Storing the **values** instead of the **indices** in the stack → you cannot compute the
  distance for the "days" variant, and you lose the position of the answer.
- ❌ Popping only **one** element per step → one value can be the answer for many elements;
  the \`while\` loop is essential.

**How to narrate:**
> "Brute force is O(n²). Instead I keep a stack of indices whose answer is still unknown,
> with the values decreasing from bottom to top. For each new value I pop every index whose
> value is smaller — the current value is the first greater element for all of them — and
> then push the new index. Each index is pushed and popped at most once, so it is O(n)."

## Related Problems

- [Next Greater Element II](NextGreaterElementII.md) — the circular version
- [Daily Temperatures](DailyTemperatures.md) — the distance instead of the value
- [Largest Rectangle in Histogram](LargestRectangleInHistogram.md) — the same idea, used differently
`,i=[`nextGreaterElements`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};