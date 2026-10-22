var e=`stacks.LargestRectangleInHistogram`,t=`package com.dsa.stacks;

import com.dsa.utils.FastScanner;

import java.util.ArrayDeque;
import java.util.Deque;

/**
 * Problem: Largest Rectangle in Histogram
 * LeetCode: 84 | Difficulty: Hard | Frequency: 4/5
 * Pattern: Monotonic stack, Sentinel
 *
 * <p>Problem:
 * Given an array of bar heights, find the area of the largest rectangle that can be formed
 * from a contiguous run of bars.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * heights[0] heights[1] ... heights[n-1]
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 5
 * 2 1 5 6 2
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 10
 * </pre>
 *
 * <p>Approach: a monotonic increasing stack of indices. When a shorter bar arrives, the
 * taller bars on the stack can no longer grow, so their rectangles are finalised.
 *
 * <p>Complexity: Time O(n), Space O(n).
 */
public class LargestRectangleInHistogram {

    /**
     * Returns the area of the largest rectangle that fits in the histogram.
     *
     * @param heights the bar heights
     * @return the largest area
     */
    public static int largestRectangle(int[] heights) {
        int n = heights.length;
        int best = 0;
        Deque<Integer> stack = new ArrayDeque<>();   // indices, heights increasing bottom to top

        for (int i = 0; i <= n; i++) {
            int height = (i == n) ? 0 : heights[i];   // a zero-height sentinel flushes the stack
            while (!stack.isEmpty() && heights[stack.peek()] >= height) {
                int h = heights[stack.pop()];
                int left = stack.isEmpty() ? -1 : stack.peek();
                int width = i - left - 1;
                best = Math.max(best, h * width);
            }
            if (i < n) {
                stack.push(i);
            }
        }
        return best;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] heights = fs.nextIntArray(n);

        System.out.println(largestRectangle(heights));
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
 * Problem: Largest Rectangle in Histogram
 * LeetCode: 84 | Difficulty: Hard | Frequency: 4/5
 * Pattern: Monotonic stack, Sentinel
 *
 * <p>Problem:
 * Given an array of bar heights, find the area of the largest rectangle that can be formed
 * from a contiguous run of bars.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * heights[0] heights[1] ... heights[n-1]
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 5
 * 2 1 5 6 2
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 10
 * </pre>
 *
 * <p>Approach: a monotonic increasing stack of indices. When a shorter bar arrives, the
 * taller bars on the stack can no longer grow, so their rectangles are finalised.
 *
 * <p>Complexity: Time O(n), Space O(n).
 */
public class Main {

    /**
     * Returns the area of the largest rectangle that fits in the histogram.
     *
     * @param heights the bar heights
     * @return the largest area
     */
    public static int largestRectangle(int[] heights) {
        int n = heights.length;
        int best = 0;
        Deque<Integer> stack = new ArrayDeque<>();   // indices, heights increasing bottom to top

        for (int i = 0; i <= n; i++) {
            int height = (i == n) ? 0 : heights[i];   // a zero-height sentinel flushes the stack
            while (!stack.isEmpty() && heights[stack.peek()] >= height) {
                int h = heights[stack.pop()];
                int left = stack.isEmpty() ? -1 : stack.peek();
                int width = i - left - 1;
                best = Math.max(best, h * width);
            }
            if (i < n) {
                stack.push(i);
            }
        }
        return best;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] heights = fs.nextIntArray(n);

        System.out.println(largestRectangle(heights));
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
`,r='\n# Largest Rectangle in Histogram — LeetCode 84\n\n| | |\n|---|---|\n| **Difficulty** | Hard |\n| **Pattern** | Monotonic stack · Sentinel |\n| **Interview heat** | ★★★★☆ |\n| **Asked at** | Amazon, Google, Meta, Microsoft, Uber, Bloomberg |\n\n## Problem Statement\n\nGiven an array of bar heights, find the area of the **largest rectangle** that can be formed\nfrom a contiguous run of bars.\n\n- `[2, 1, 5, 6, 2]` → `10` (the bars of height 5 and 6 next to each other: 5 × 2).\n- `[2, 4]` → `4`.\n- The rectangle must stand on the ground: its height is limited by the **shortest** bar it\n  covers.\n\n## Input Format\n\nThe program reads from standard input:\n\n```\nn\nheights[0] heights[1] ... heights[n-1]\n```\n\n- `n` — the number of bars (1 ≤ n ≤ 10⁵)\n- `heights` — n space-separated integers (0 ≤ h ≤ 10⁴)\n\n## Sample Input\n\n```\n5\n2 1 5 6 2\n```\n\n## Expected Output\n\n```\n10\n```\n\n## Approach — Monotonic Increasing Stack\n\nThink of every bar as the **shortest** bar of some rectangle. If bar `i` is the shortest bar\nof a rectangle, that rectangle can extend left and right as far as the neighbouring bars are\nat least as tall as `heights[i]`. The question is how far.\n\nThe stack answers exactly that. It holds indices with **increasing** heights (bottom to top).\nWhen the current bar `i` is **shorter** than the bar on top of the stack, that bar can no\nlonger grow to the right — and the new bar blocks it from the left. So the rectangle is\nfinal:\n\n- `h` = the height of the popped bar,\n- `left` = the index now on top of the stack (the nearest bar shorter than `h`), or `-1`,\n- `width` = `i - left - 1`,\n- area = `h * width`.\n\n**The sentinel:** the loop runs one extra step with a virtual bar of height `0`. It pops\nevery remaining bar, so the ones at the end of the array are finalised too. Without it, the\ntallest bar at the far right would never be evaluated.\n\n**Why the stack is increasing:** the bars on the stack are exactly the ones that could still\nextend to the right. A bar shorter than the current one ends that possibility, so it is\npopped and its area is computed.\n\n## Dry Run\n\nInput: `[2, 1, 5, 6, 2]`, stack shown as **heights (bottom → top)**\n\n| Step | i | height | stack before | popped (index, h) | `left` | width | area | best |\n|---:|---:|---:|---|---|---:|---:|---:|---:|\n| 1 | 0 | `2` | `[]` | — | — | — | — | 0 |\n| 2 | 1 | `1` | `[2]` | `0` (2 ≥ 1) | `-1` | `1 - (-1) - 1 = 1` | `2 × 1 = 2` | 2 |\n| 3 | 2 | `5` | `[1]` | — | — | — | — | 2 |\n| 4 | 3 | `6` | `[1, 5]` | — | — | — | — | 2 |\n| 5 | 4 | `2` | `[1, 5, 6]` | `3` (6 ≥ 2) | `2` | `4 - 2 - 1 = 1` | `6 × 1 = 6` | 6 |\n| 6 | 4 | `2` | `[1, 5]` | `2` (5 ≥ 2) | `1` | `4 - 1 - 1 = 2` | `5 × 2 = 10` | **10** |\n| 7 | 4 | `2` | `[1]` | — (1 < 2) | — | — | — | 10 |\n| 8 | 5 (sentinel) | `0` | `[1, 2]` | `4` (2 ≥ 0) | `1` | `5 - 1 - 1 = 3` | `2 × 3 = 6` | 10 |\n| 9 | 5 | `0` | `[1]` | `1` (1 ≥ 0) | `-1` | `5 - (-1) - 1 = 5` | `1 × 5 = 5` | 10 |\n\nThe best area is `10` ✓ — the bars `5` and `6` side by side.\n\n## Java Solution\n\nSee [`LargestRectangleInHistogram.java`](./LargestRectangleInHistogram.java).\n\n```java\npublic static int largestRectangle(int[] heights) {\n    int n = heights.length;\n    int best = 0;\n    Deque<Integer> stack = new ArrayDeque<>();\n\n    for (int i = 0; i <= n; i++) {\n        int height = (i == n) ? 0 : heights[i];\n        while (!stack.isEmpty() && heights[stack.peek()] >= height) {\n            int h = heights[stack.pop()];\n            int left = stack.isEmpty() ? -1 : stack.peek();\n            int width = i - left - 1;\n            best = Math.max(best, h * width);\n        }\n        if (i < n) {\n            stack.push(i);\n        }\n    }\n    return best;\n}\n```\n\n## Complexity\n\n| | Value | Why |\n|---|---|---|\n| **Time** | O(n) | Each index is pushed once and popped at most once |\n| **Space** | O(n) | The stack |\n\n## Interview Notes\n\n**Follow-ups to raise yourself:**\n- *"Return the rectangle itself, not just the area."* → keep the index and the width of the\n  best rectangle.\n- *"The histogram is a circle."* → double the array and run the same algorithm.\n- *"Rotated array variant."* → find the minimum with a binary search, then rotate the\n  histogram and solve the two parts.\n- *"What if the bars have widths?"* → the width computation becomes the sum of widths.\n\n**Common mistakes:**\n- ❌ Forgetting the **sentinel** step → the bars at the right end never get their area\n  computed.\n- ❌ Computing the width as `i - left` → off by one; it is `i - left - 1` because both\n  `left` and `i` are excluded.\n- ❌ Using `>` instead of `>=` → equal heights pile up on the stack and the width of the\n  earlier equal bar is computed too small.\n- ❌ Forgetting the `left` neighbour when the stack becomes empty → use `-1`.\n\n**How to narrate:**\n> "Every bar is the shortest bar of some maximal rectangle, so I only have to find how far\n> that rectangle can extend. I keep a stack of indices with increasing heights. When a\n> shorter bar arrives, the bar on top can no longer grow, so I pop it, take the new top as\n> the left boundary, and compute `height * (i - left - 1)`. I finish with a virtual bar of\n> height 0 to flush the stack. Each index is pushed and popped once, so it is O(n)."\n\n## Related Problems\n\n- [Next Greater Element](NextGreaterElement.md) — the same stack family\n- [Daily Temperatures](DailyTemperatures.md) — the same idea, a different answer\n- [Trapping Rain Water](TrappingRainWater.md) — the other "extremes" problem\n',i=[`largestRectangle`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};