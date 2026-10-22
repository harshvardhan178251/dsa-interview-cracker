var e=`stacks.NextGreaterElementII`,t=`package com.dsa.stacks;

import com.dsa.utils.FastScanner;

import java.util.ArrayDeque;
import java.util.Arrays;
import java.util.Deque;

/**
 * Problem: Next Greater Element II
 * LeetCode: 503 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Monotonic stack, Circular array
 *
 * <p>Problem:
 * Given a **circular** array of integers, for every element find the first greater element
 * to its right, wrapping around at the end of the array. If there is none, the answer is
 * {@code -1}.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * values[0] values[1] ... values[n-1]
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 5
 * 1 2 3 4 3
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 2 3 4 -1 4
 * </pre>
 *
 * <p>Approach: run the monotonic stack algorithm over the array **twice**; only the first
 * pass pushes indices.
 *
 * <p>Complexity: Time O(n), Space O(n).
 */
public class NextGreaterElementII {

    /**
     * Returns the first strictly greater element to the right of every element, wrapping
     * around the end of the array.
     *
     * @param nums the circular array
     * @return the answers, {@code -1} where there is no greater element
     */
    public static int[] nextGreaterCircular(int[] nums) {
        int n = nums.length;
        int[] result = new int[n];
        Arrays.fill(result, -1);
        Deque<Integer> stack = new ArrayDeque<>();

        for (int i = 0; i < 2 * n; i++) {
            int value = nums[i % n];
            while (!stack.isEmpty() && nums[stack.peek() % n] < value) {
                result[stack.pop() % n] = value;
            }
            if (i < n) {
                stack.push(i);          // only the first pass adds new candidates
            }
        }
        return result;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] nums = fs.nextIntArray(n);

        int[] answer = nextGreaterCircular(nums);

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
 * Problem: Next Greater Element II
 * LeetCode: 503 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Monotonic stack, Circular array
 *
 * <p>Problem:
 * Given a **circular** array of integers, for every element find the first greater element
 * to its right, wrapping around at the end of the array. If there is none, the answer is
 * {@code -1}.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * values[0] values[1] ... values[n-1]
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 5
 * 1 2 3 4 3
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 2 3 4 -1 4
 * </pre>
 *
 * <p>Approach: run the monotonic stack algorithm over the array **twice**; only the first
 * pass pushes indices.
 *
 * <p>Complexity: Time O(n), Space O(n).
 */
public class Main {

    /**
     * Returns the first strictly greater element to the right of every element, wrapping
     * around the end of the array.
     *
     * @param nums the circular array
     * @return the answers, {@code -1} where there is no greater element
     */
    public static int[] nextGreaterCircular(int[] nums) {
        int n = nums.length;
        int[] result = new int[n];
        Arrays.fill(result, -1);
        Deque<Integer> stack = new ArrayDeque<>();

        for (int i = 0; i < 2 * n; i++) {
            int value = nums[i % n];
            while (!stack.isEmpty() && nums[stack.peek() % n] < value) {
                result[stack.pop() % n] = value;
            }
            if (i < n) {
                stack.push(i);          // only the first pass adds new candidates
            }
        }
        return result;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] nums = fs.nextIntArray(n);

        int[] answer = nextGreaterCircular(nums);

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
`,r='\n# Next Greater Element II — LeetCode 503\n\n| | |\n|---|---|\n| **Difficulty** | Medium |\n| **Pattern** | Monotonic stack · Circular array |\n| **Interview heat** | ★★★★☆ |\n| **Asked at** | Amazon, Google, Meta, Microsoft, Uber, Bloomberg |\n\n## Problem Statement\n\nGiven a **circular** array of integers, for every element return the first element to its\nright that is strictly greater, **wrapping around** at the end of the array.\n\n- `[1, 2, 3, 4, 3]` → `[2, 3, 4, -1, 4]`\n  - the last `3` looks forward past the end and finds the `1`, the `2`, the `3` and finally\n    the `4` — the `4` is the first one that is greater.\n  - the `4` never finds a greater element, so it answers `-1`.\n\n## Input Format\n\nThe program reads from standard input:\n\n```\nn\nvalues[0] values[1] ... values[n-1]\n```\n\n- `n` — the length of the array (1 ≤ n ≤ 10⁴)\n- `values` — n space-separated integers\n\n## Sample Input\n\n```\n5\n1 2 3 4 3\n```\n\n## Expected Output\n\n```\n2 3 4 -1 4\n```\n\n## Approach — Run the Monotonic Stack Over the Array Twice\n\nThe circular array is just the linear array repeated. An element\'s first greater element is\nat most one full lap away, so:\n\n- traverse the array **twice**, reading `nums[i % n]`,\n- run the ordinary monotonic stack algorithm,\n- but only **push** indices during the **first** pass — otherwise every index would be\n  pushed twice and could be answered twice.\n\nThe stack holds indices into the *virtual* doubled array; `stack.peek() % n` gives the\nvalue at that position and `stack.pop() % n` the position in the original array.\n\n**Alternative:** double the array explicitly (`nums[i] = nums[i % n]`) and run the linear\nalgorithm on it. Same idea, one extra array of size 2n. The modulo version avoids the copy.\n\n## Dry Run\n\nInput: `[1, 2, 3, 4, 3]`, `n = 5`, stack shown as **values (top → bottom)**\n\n| Step | i | `nums[i % 5]` | stack before (values, top → bottom) | popped (index, value) | stack after | answers so far |\n|---:|---:|---:|---|---|---|---|\n| 1 | 0 | `1` | `[]` | — | `[1]` | `[-1, -1, -1, -1, -1]` |\n| 2 | 1 | `2` | `[1]` | `0` (1 < 2) | `[2]` | `[2, -1, -1, -1, -1]` |\n| 3 | 2 | `3` | `[2]` | `1` (2 < 3) | `[3]` | `[2, 3, -1, -1, -1]` |\n| 4 | 3 | `4` | `[3]` | `2` (3 < 4) | `[4]` | `[2, 3, 4, -1, -1]` |\n| 5 | 4 | `3` | `[4]` | — (4 ≥ 3) | `[3, 4]` | `[2, 3, 4, -1, -1]` |\n| 6 | 5 | `1` | `[3, 4]` | — (3 ≥ 1) | `[3, 4]` | unchanged (second pass) |\n| 7 | 6 | `2` | `[3, 4]` | — (3 ≥ 2) | `[3, 4]` | unchanged |\n| 8 | 7 | `3` | `[3, 4]` | — (3 ≥ 3) | `[3, 4]` | unchanged |\n| 9 | 8 | `4` | `[3, 4]` | `4` (3 < 4) | `[4]` | `[2, 3, 4, -1, 4]` |\n| 10 | 9 | `3` | `[4]` | — (4 ≥ 3) | `[4]` | unchanged |\n\nIndex `4` (the last `3`) was answered in step 9 by the `4` that wrapped around ✓, and index\n`3` (the `4`) never found a greater element, so it stays `-1` ✓. The final answer is\n`2 3 4 -1 4`.\n\n## Java Solution\n\nSee [`NextGreaterElementII.java`](./NextGreaterElementII.java).\n\n```java\npublic static int[] nextGreaterCircular(int[] nums) {\n    int n = nums.length;\n    int[] result = new int[n];\n    Arrays.fill(result, -1);\n    Deque<Integer> stack = new ArrayDeque<>();\n\n    for (int i = 0; i < 2 * n; i++) {\n        int value = nums[i % n];\n        while (!stack.isEmpty() && nums[stack.peek() % n] < value) {\n            result[stack.pop() % n] = value;\n        }\n        if (i < n) {\n            stack.push(i);          // only the first pass adds new candidates\n        }\n    }\n    return result;\n}\n```\n\n## Complexity\n\n| | Value | Why |\n|---|---|---|\n| **Time** | O(n) | Two passes over n elements, each index pushed and popped at most once |\n| **Space** | O(n) | The stack |\n\n## Interview Notes\n\n**Follow-ups to raise yourself:**\n- *"The array is not circular but you may look at the next `k` positions."* → same trick\n  with a bounded window.\n- *"Return the index instead of the value."* → store the index of the current element in\n  the answer.\n- *"What if the array is circular and we want the next **smaller** element?"* → flip the\n  comparison.\n- *"Multiple circular arrays / a sliding window on a circle."* → the same doubled-array\n  trick generalises.\n\n**Common mistakes:**\n- ❌ Pushing indices in **both** passes → the same index is answered twice and the stack\n  grows needlessly.\n- ❌ Traversing only `n` elements → the elements near the end never see the wrapped-around\n  values.\n- ❌ Forgetting the `% n` when reading the value of a stacked index → `ArrayIndexOutOfBounds`\n  in the second pass.\n\n**How to narrate:**\n> "A circular array is the array repeated, and an element only has to look one lap ahead, so\n> I traverse it twice with `i % n` and run the same monotonic stack algorithm. The only\n> detail is that I only push new indices during the first pass — otherwise every index\n> would be a candidate twice. Each index is pushed and popped at most once, so the whole\n> thing is O(n)."\n\n## Related Problems\n\n- [Next Greater Element](NextGreaterElement.md) — the linear version\n- [Daily Temperatures](DailyTemperatures.md) — the distance variant\n- [Trapping Rain Water](TrappingRainWater.md) — two-pointer extremes\n',i=[`nextGreaterCircular`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};