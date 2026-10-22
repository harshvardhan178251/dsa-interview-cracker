var e=`stacks.MaxOfMinForEveryWindow`,t=`package com.dsa.stacks;

import com.dsa.utils.FastScanner;

import java.util.ArrayDeque;
import java.util.Deque;

/**
 * Problem: Max of Min for Every Window
 * Difficulty: Hard | Frequency: 3/5
 * Pattern: Monotonic stack, Suffix maximum
 *
 * <p>Problem:
 * Given an array and a window size {@code k}, find the **maximum among the minimums** of all
 * the windows of size {@code k}: for every window take its smallest element, and report the
 * largest of those minimums.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * values[0] values[1] ... values[n-1]
 * k
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 5
 * 4 2 6 1 5
 * 3
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 2
 * </pre>
 *
 * <p>Approach: for every element find the widest window in which it is the minimum, then
 * propagate the answers from the longest window down to the shortest one.
 *
 * <p>Complexity: Time O(n), Space O(n).
 */
public class MaxOfMinForEveryWindow {

    /**
     * Returns the maximum among the minimums of all windows of size {@code k}.
     *
     * @param values the input array
     * @param k      the window size
     * @return the answer, or {@code 0} when the window size is invalid
     */
    public static int maxOfMins(int[] values, int k) {
        int n = values.length;
        if (n == 0 || k <= 0 || k > n) {
            return 0;
        }

        int[] left = new int[n];    // index of the previous strictly smaller element
        int[] right = new int[n];   // index of the next smaller-or-equal element
        Deque<Integer> stack = new ArrayDeque<>();

        for (int i = 0; i < n; i++) {
            while (!stack.isEmpty() && values[stack.peek()] >= values[i]) {
                stack.pop();
            }
            left[i] = stack.isEmpty() ? -1 : stack.peek();
            stack.push(i);
        }
        stack.clear();
        for (int i = n - 1; i >= 0; i--) {
            while (!stack.isEmpty() && values[stack.peek()] > values[i]) {
                stack.pop();
            }
            right[i] = stack.isEmpty() ? n : stack.peek();
            stack.push(i);
        }

        // maxOfMin[len] = the largest element that is the minimum of a window of size len
        int[] maxOfMin = new int[n + 1];
        for (int i = 0; i < n; i++) {
            int length = right[i] - left[i] - 1;
            maxOfMin[length] = Math.max(maxOfMin[length], values[i]);
        }
        // a window of size len also contains windows of every smaller size
        for (int length = n - 1; length >= 1; length--) {
            maxOfMin[length] = Math.max(maxOfMin[length], maxOfMin[length + 1]);
        }
        return maxOfMin[k];
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] values = fs.nextIntArray(n);
        int k = fs.nextInt();

        System.out.println(maxOfMins(values, k));
    }
}
`,n=`import java.util.ArrayDeque;
import java.util.Deque;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

/**
 * Problem: Max of Min for Every Window
 * Difficulty: Hard | Frequency: 3/5
 * Pattern: Monotonic stack, Suffix maximum
 *
 * <p>Problem:
 * Given an array and a window size {@code k}, find the **maximum among the minimums** of all
 * the windows of size {@code k}: for every window take its smallest element, and report the
 * largest of those minimums.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * values[0] values[1] ... values[n-1]
 * k
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 5
 * 4 2 6 1 5
 * 3
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 2
 * </pre>
 *
 * <p>Approach: for every element find the widest window in which it is the minimum, then
 * propagate the answers from the longest window down to the shortest one.
 *
 * <p>Complexity: Time O(n), Space O(n).
 */
public class Main {

    /**
     * Returns the maximum among the minimums of all windows of size {@code k}.
     *
     * @param values the input array
     * @param k      the window size
     * @return the answer, or {@code 0} when the window size is invalid
     */
    public static int maxOfMins(int[] values, int k) {
        int n = values.length;
        if (n == 0 || k <= 0 || k > n) {
            return 0;
        }

        int[] left = new int[n];    // index of the previous strictly smaller element
        int[] right = new int[n];   // index of the next smaller-or-equal element
        Deque<Integer> stack = new ArrayDeque<>();

        for (int i = 0; i < n; i++) {
            while (!stack.isEmpty() && values[stack.peek()] >= values[i]) {
                stack.pop();
            }
            left[i] = stack.isEmpty() ? -1 : stack.peek();
            stack.push(i);
        }
        stack.clear();
        for (int i = n - 1; i >= 0; i--) {
            while (!stack.isEmpty() && values[stack.peek()] > values[i]) {
                stack.pop();
            }
            right[i] = stack.isEmpty() ? n : stack.peek();
            stack.push(i);
        }

        // maxOfMin[len] = the largest element that is the minimum of a window of size len
        int[] maxOfMin = new int[n + 1];
        for (int i = 0; i < n; i++) {
            int length = right[i] - left[i] - 1;
            maxOfMin[length] = Math.max(maxOfMin[length], values[i]);
        }
        // a window of size len also contains windows of every smaller size
        for (int length = n - 1; length >= 1; length--) {
            maxOfMin[length] = Math.max(maxOfMin[length], maxOfMin[length + 1]);
        }
        return maxOfMin[k];
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] values = fs.nextIntArray(n);
        int k = fs.nextInt();

        System.out.println(maxOfMins(values, k));
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
`,r='\n# Max of Min for Every Window\n\n| | |\n|---|---|\n| **Difficulty** | Hard |\n| **Pattern** | Monotonic stack · Suffix maximum |\n| **Interview heat** | ★★★☆☆ |\n| **Asked at** | Amazon, Google, Meta, Microsoft |\n\n## Problem Statement\n\nGiven an array and a window size `k`, consider every window of `k` consecutive elements.\nFor each window take its **smallest** element (its minimum). The answer is the **largest**\namong those minimums.\n\n- `[4, 2, 6, 1, 5]` with `k = 3` → the windows are `[4,2,6]` (min 2), `[2,6,1]` (min 1) and\n  `[6,1,5]` (min 1) → the answer is **2**.\n\n## Input Format\n\nThe program reads from standard input:\n\n```\nn\nvalues[0] values[1] ... values[n-1]\nk\n```\n\n- `n` — the number of elements (1 ≤ n ≤ 10⁵)\n- `values` — n space-separated integers (0 ≤ v ≤ 10⁹)\n- `k` — the window size (1 ≤ k ≤ n)\n\n## Sample Input\n\n```\n5\n4 2 6 1 5\n3\n```\n\n## Expected Output\n\n```\n2\n```\n\n## Approach — Widest Window per Element, Then a Suffix Maximum\n\nThe brute force is O(n · k): one sliding-window minimum per window. This solution is O(n).\n\n**Step 1 — how wide can a window be around an element?**\n\nFor each index `i` compute:\n\n- `left[i]` — the index of the closest element to the left that is **strictly smaller** than\n  `values[i]` (`-1` if there is none),\n- `right[i]` — the index of the closest element to the right that is **smaller than or equal\n  to** `values[i]` (`n` if there is none).\n\nThe asymmetric comparison (`<` on the left, `<=` on the right) is what makes the boundaries\nunambiguous when the array contains equal values.\n\nThen\n\n```\nlength[i] = right[i] - left[i] - 1\n```\n\nis the size of the **widest** window in which `values[i]` is the minimum. Inside that window\nevery element is at least `values[i]`, and the window is bounded exactly by the two\nboundaries.\n\n**Step 2 — bucket the answers by length.**\n\n`maxOfMin[length[i]] = max(maxOfMin[length[i]], values[i])` — for now `maxOfMin[L]` is the\nlargest element that is the minimum of a window of size exactly `L`.\n\n**Step 3 — propagate downwards.**\n\nA window of size `L` contains windows of every smaller size, and the minimum of the small\nwindow is never smaller than the minimum of the big one. So the answer for size `L` is at\nleast the answer for size `L + 1`:\n\n```\nfor (L = n-1 down to 1) maxOfMin[L] = max(maxOfMin[L], maxOfMin[L+1])\n```\n\nAfter this pass, `maxOfMin[k]` is the maximum among the minimums of all windows of size `k`.\n\n**Why the two monotonic-stack passes:** `left[i]` and `right[i]` are the classic\n"previous smaller" / "next smaller" queries, and one monotonic stack answers all of them in\nO(n) — the stack keeps the candidate boundaries with strictly decreasing values.\n\n## Dry Run\n\nInput: `values = [4, 2, 6, 1, 5]`, `k = 3`\n\n**Step 1 — the boundaries**\n\n| i | `values[i]` | `left[i]` (previous strictly smaller) | `right[i]` (next smaller-or-equal) | `length[i]` |\n|---:|---:|---:|---:|---:|\n| 0 | `4` | `-1` | `1` (the `2`) | `1 - (-1) - 1 = 1` |\n| 1 | `2` | `-1` | `3` (the `1`) | `3 - (-1) - 1 = 3` |\n| 2 | `6` | `1` (the `2`) | `3` (the `1`) | `3 - 1 - 1 = 1` |\n| 3 | `1` | `-1` | `5` (end) | `5 - (-1) - 1 = 5` |\n| 4 | `5` | `3` (the `1`) | `5` (end) | `5 - 3 - 1 = 1` |\n\n**Step 2 — bucket by length**\n\n| i | `values[i]` | `length[i]` | `maxOfMin[length]` after |\n|---:|---:|---:|---|\n| 0 | `4` | 1 | `maxOfMin[1] = 4` |\n| 1 | `2` | 3 | `maxOfMin[3] = 2` |\n| 2 | `6` | 1 | `maxOfMin[1] = max(4, 6) = 6` |\n| 3 | `1` | 5 | `maxOfMin[5] = 1` |\n| 4 | `5` | 1 | `maxOfMin[1] = max(6, 5) = 6` |\n\n`maxOfMin = [_, 6, 0, 2, 0, 1]`\n\n**Step 3 — the suffix maximum**\n\n| length | `maxOfMin[length]` before | `maxOfMin[length + 1]` | after |\n|---:|---:|---:|---:|\n| 5 | `1` | `0` | `1` |\n| 4 | `0` | `1` | `1` |\n| 3 | `2` | `1` | `2` |\n| 2 | `0` | `2` | `2` |\n| 1 | `6` | `2` | `6` |\n\nThe answer for `k = 3` is `maxOfMin[3] = 2` ✓ — the same value the brute force finds\n(`max(2, 1, 1)`).\n\n## Java Solution\n\nSee [`MaxOfMinForEveryWindow.java`](./MaxOfMinForEveryWindow.java).\n\n```java\npublic static int maxOfMins(int[] values, int k) {\n    int n = values.length;\n    if (n == 0 || k <= 0 || k > n) {\n        return 0;\n    }\n\n    int[] left = new int[n];\n    int[] right = new int[n];\n    Deque<Integer> stack = new ArrayDeque<>();\n\n    for (int i = 0; i < n; i++) {\n        while (!stack.isEmpty() && values[stack.peek()] >= values[i]) {\n            stack.pop();\n        }\n        left[i] = stack.isEmpty() ? -1 : stack.peek();\n        stack.push(i);\n    }\n    stack.clear();\n    for (int i = n - 1; i >= 0; i--) {\n        while (!stack.isEmpty() && values[stack.peek()] > values[i]) {\n            stack.pop();\n        }\n        right[i] = stack.isEmpty() ? n : stack.peek();\n        stack.push(i);\n    }\n\n    int[] maxOfMin = new int[n + 1];\n    for (int i = 0; i < n; i++) {\n        int length = right[i] - left[i] - 1;\n        maxOfMin[length] = Math.max(maxOfMin[length], values[i]);\n    }\n    for (int length = n - 1; length >= 1; length--) {\n        maxOfMin[length] = Math.max(maxOfMin[length], maxOfMin[length + 1]);\n    }\n    return maxOfMin[k];\n}\n```\n\n## Complexity\n\n| | Value | Why |\n|---|---|---|\n| **Time** | O(n) | Two monotonic stack passes, one bucketing pass, one suffix pass |\n| **Space** | O(n) | The boundary arrays and the bucket array |\n\n## Interview Notes\n\n**Follow-ups to raise yourself:**\n- *"Give the answer for every window instead of one number."* → keep a deque of the window\n  minimums and a second deque of their maxima.\n- *"Give the maximum minimum for every window **size**."* → the algorithm already computes\n  it: return the whole `maxOfMin` array.\n- *"What if the array is circular?"* → duplicate the array and handle the wrap-around\n  windows separately.\n- *"What about the minimum among the maximums?"* → symmetric: use the previous/next\n  **greater** boundaries.\n\n**Common mistakes:**\n- ❌ Using the same comparison on both sides (`>=` on the left **and** on the right) → equal\n  elements give the wrong window lengths and the answer can be too small.\n- ❌ Forgetting the **suffix maximum** pass → `maxOfMin[k]` is then only correct when some\n  element happens to have exactly that maximal length.\n- ❌ Assuming `maxOfMin[k]` is the answer *before* the suffix pass → shorter windows are\n  missed.\n\n**How to narrate:**\n> "For every element I find the widest window in which it is the minimum: the previous\n> strictly smaller element on the left and the next smaller-or-equal element on the right\n> are its boundaries, and I get both with two monotonic stack passes. The distance between\n> the boundaries is the window length, so I bucket each element into `maxOfMin[length]`.\n> Then a single suffix pass propagates the answers downwards, because a window of size L\n> contains windows of every smaller size. The answer for size k is `maxOfMin[k]`. O(n) time."\n\n## Related Problems\n\n- [Largest Rectangle in Histogram](LargestRectangleInHistogram.md) — the same boundary computation\n- [Sliding Window Maximum](../../../../../../docs/topics/11-slidingwindow.md) — the related per-window variant\n- [Next Greater Element](NextGreaterElement.md) — the same monotonic stack\n',i=[`maxOfMins`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};