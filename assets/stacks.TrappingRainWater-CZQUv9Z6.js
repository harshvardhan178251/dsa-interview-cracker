var e=`stacks.TrappingRainWater`,t=`package com.dsa.stacks;

import com.dsa.utils.FastScanner;

/**
 * Problem: Trapping Rain Water
 * LeetCode: 42 | Difficulty: Hard | Frequency: 5/5
 * Pattern: Two pointers, Running maxima
 *
 * <p>Problem:
 * Given the height of each bar, compute how much rain water is trapped between the bars.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * heights[0] heights[1] ... heights[n-1]
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 6
 * 4 2 0 3 2 5
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 9
 * </pre>
 *
 * <p>Approach: two pointers walking inwards, each remembering the tallest bar it has seen.
 *
 * <p>Complexity: Time O(n), Space O(1).
 */
public class TrappingRainWater {

    /**
     * Returns the total amount of trapped water.
     *
     * @param height the bar heights
     * @return the units of water trapped
     */
    public static int trap(int[] height) {
        if (height == null || height.length < 3) {
            return 0;
        }
        int left = 0;
        int right = height.length - 1;
        int leftMax = 0;
        int rightMax = 0;
        int water = 0;

        while (left < right) {
            if (height[left] < height[right]) {
                leftMax = Math.max(leftMax, height[left]);
                water += leftMax - height[left];
                left++;
            } else {
                rightMax = Math.max(rightMax, height[right]);
                water += rightMax - height[right];
                right--;
            }
        }
        return water;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] height = fs.nextIntArray(n);

        System.out.println(trap(height));
    }
}
`,n=`import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

/**
 * Problem: Trapping Rain Water
 * LeetCode: 42 | Difficulty: Hard | Frequency: 5/5
 * Pattern: Two pointers, Running maxima
 *
 * <p>Problem:
 * Given the height of each bar, compute how much rain water is trapped between the bars.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * heights[0] heights[1] ... heights[n-1]
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 6
 * 4 2 0 3 2 5
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 9
 * </pre>
 *
 * <p>Approach: two pointers walking inwards, each remembering the tallest bar it has seen.
 *
 * <p>Complexity: Time O(n), Space O(1).
 */
public class Main {

    /**
     * Returns the total amount of trapped water.
     *
     * @param height the bar heights
     * @return the units of water trapped
     */
    public static int trap(int[] height) {
        if (height == null || height.length < 3) {
            return 0;
        }
        int left = 0;
        int right = height.length - 1;
        int leftMax = 0;
        int rightMax = 0;
        int water = 0;

        while (left < right) {
            if (height[left] < height[right]) {
                leftMax = Math.max(leftMax, height[left]);
                water += leftMax - height[left];
                left++;
            } else {
                rightMax = Math.max(rightMax, height[right]);
                water += rightMax - height[right];
                right--;
            }
        }
        return water;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] height = fs.nextIntArray(n);

        System.out.println(trap(height));
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
`,r='\n# Trapping Rain Water — LeetCode 42\n\n| | |\n|---|---|\n| **Difficulty** | Hard |\n| **Pattern** | Two pointers · Running maxima |\n| **Interview heat** | ★★★★★ |\n| **Asked at** | Amazon, Google, Meta, Microsoft, Uber, Bloomberg, Adobe |\n\n## Problem Statement\n\nGiven the height of each bar, compute how much rain water is **trapped** between the bars.\n\n- `[4, 2, 0, 3, 2, 5]` → `9`\n- the water above a bar is limited by the shorter of the two walls around it:\n  `water[i] = min(maxLeft, maxRight) - height[i]`.\n\n## Input Format\n\nThe program reads from standard input:\n\n```\nn\nheights[0] heights[1] ... heights[n-1]\n```\n\n- `n` — the number of bars (1 ≤ n ≤ 2 × 10⁴)\n- `heights` — n space-separated integers (0 ≤ h ≤ 10⁵)\n\n## Sample Input\n\n```\n6\n4 2 0 3 2 5\n```\n\n## Expected Output\n\n```\n9\n```\n\nThe water above each bar is `0, 2, 4, 1, 2, 0` — nine units in total. ✓\n\n## Approach — Two Pointers and Running Maxima\n\nThe formula `water[i] = min(maxLeft, maxRight) - height[i]` needs the maximum on **both**\nsides of every bar. Precomputing both arrays is easy but costs O(n) space.\n\nThe two-pointer version avoids the arrays. The key observation:\n\n> If `height[left] < height[right]`, the water above `left` is decided by the **left** side\n> alone. Whatever wall is on the right, there is a bar at `right` that is at least as tall\n> as `height[left]`, and the tallest bar seen so far on the left (`leftMax`) is at least as\n> tall as `height[left]` too — so the level that matters is `leftMax`.\n\nSo we move the pointer at the **shorter** side, and we only ever need one running maximum\nper side.\n\n**Why this is correct:** the shorter side can never be the bottleneck — the other side\nalready has a wall that is at least as high, so the shorter side\'s own maximum is the\nlimiting factor.\n\n## Dry Run\n\nInput: `[4, 2, 0, 3, 2, 5]`, `left = 0`, `right = 5`\n\n| Step | `height[left]` | `height[right]` | branch | `leftMax` | `rightMax` | water added | `water` |\n|---:|---:|---:|---|---:|---:|---:|---:|\n| 1 | `4` | `5` | left (`4 < 5`) | `max(0,4) = 4` | `0` | `4 - 4 = 0` | 0 |\n| 2 | `2` | `5` | left (`2 < 5`) | `max(4,2) = 4` | `0` | `4 - 2 = 2` | 2 |\n| 3 | `0` | `5` | left (`0 < 5`) | `max(4,0) = 4` | `0` | `4 - 0 = 4` | 6 |\n| 4 | `3` | `5` | left (`3 < 5`) | `max(4,3) = 4` | `0` | `4 - 3 = 1` | 7 |\n| 5 | `2` | `5` | left (`2 < 5`) | `max(4,2) = 4` | `0` | `4 - 2 = 2` | 9 |\n| 6 | `5` | `5` | `left == right` → loop ends (`left = 5`, `right = 5`) | `4` | `0` | — | 9 |\n\nTotal water = `9` ✓ — the water above the bars is `0, 2, 4, 1, 2, 0`.\n\n### The other branch — `[5, 1, 2, 1, 4]`\n\n| Step | `height[left]` | `height[right]` | branch | `leftMax` | `rightMax` | water added | `water` |\n|---:|---:|---:|---|---:|---:|---:|---:|\n| 1 | `5` | `4` | right (`5 ≥ 4`) | `0` | `max(0,4) = 4` | `4 - 4 = 0` | 0 |\n| 2 | `5` | `1` | right (`5 ≥ 1`) | `0` | `max(4,1) = 4` | `4 - 1 = 3` | 3 |\n| 3 | `5` | `2` | right (`5 ≥ 2`) | `0` | `max(4,2) = 4` | `4 - 2 = 2` | 5 |\n| 4 | `5` | `1` | right (`5 ≥ 1`) | `0` | `max(4,1) = 4` | `4 - 1 = 3` | 8 |\n| 5 | `5` | `5` | loop ends | `0` | `4` | — | 8 |\n\nTotal = `8` ✓ (the classic example for this array).\n\n## Java Solution\n\nSee [`TrappingRainWater.java`](./TrappingRainWater.java).\n\n```java\npublic static int trap(int[] height) {\n    if (height == null || height.length < 3) {\n        return 0;\n    }\n    int left = 0;\n    int right = height.length - 1;\n    int leftMax = 0;\n    int rightMax = 0;\n    int water = 0;\n\n    while (left < right) {\n        if (height[left] < height[right]) {\n            leftMax = Math.max(leftMax, height[left]);\n            water += leftMax - height[left];\n            left++;\n        } else {\n            rightMax = Math.max(rightMax, height[right]);\n            water += rightMax - height[right];\n            right--;\n        }\n    }\n    return water;\n}\n```\n\n## Complexity\n\n| | Value | Why |\n|---|---|---|\n| **Time** | O(n) | Each bar is processed once |\n| **Space** | O(1) | Two pointers and two running maxima |\n\n## Interview Notes\n\n**Follow-ups to raise yourself:**\n- *"Do it with a stack instead of two pointers."* → keep the decreasing bars on a stack;\n  when a taller bar arrives, pop and compute the trapped water — O(n) space, O(n) time.\n- *"Precompute the left and right maxima."* → the textbook O(n) space version.\n- *"What if the bars have different widths?"* → the area formulas change to use widths.\n- *"Compute the largest square instead of the largest rectangle."* → the same idea with\n  `min(width, height)`.\n\n**Common mistakes:**\n- ❌ Using `height[left] <= height[right]` and updating the **wrong** maximum → off-by-one\n  errors; the comparison must match the update.\n- ❌ Forgetting to update the running maximum **before** subtracting → the first bar of each\n  side would contribute a negative amount.\n- ❌ Looping with `left <= right` → the last bar would be counted twice.\n\n**How to narrate:**\n> "The water above a bar is `min(maxLeft, maxRight) - height`. Instead of precomputing both\n> maxima I use two pointers and compare the two end bars. If the left bar is shorter, the\n> right side already has a wall at least that tall, so the left side\'s own running maximum\n> is the limiting factor — I add `leftMax - height[left]` and move the left pointer. The\n> other case is symmetric. Each bar is visited once, so it is O(n) time and O(1) space."\n\n## Related Problems\n\n- [Container With Most Water](../../../../../../docs/topics/10-twopointers.md) — the same two-pointer family\n- [Largest Rectangle in Histogram](LargestRectangleInHistogram.md) — the stack variant\n- [Next Greater Element II](NextGreaterElementII.md) — running maxima, another style\n',i=[`trap`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};