var e=`twopointers.ContainerWithMostWater`,t=`package com.dsa.twopointers;

import com.dsa.utils.FastScanner;

/**
 * Problem: Container With Most Water
 * LeetCode: 11 | Difficulty: Medium | Frequency: 5/5
 * Pattern: Two pointers, Greedy
 *
 * <p>Problem:
 * Given {@code n} non-negative integers where each value is the height of a vertical
 * line, find two lines that together hold the most water.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * height[0] height[1] ... height[n-1]
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 9
 * 1 8 6 2 5 4 8 3 7
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 49
 * </pre>
 *
 * <p>Approach: start with one pointer at each end and always move the **shorter** of the
 * two lines. The width shrinks by one on every step, so keeping the shorter line could
 * only lose area - the taller one can stay, and moving the shorter one may find a
 * better partner.
 *
 * <p>Complexity: Time O(n), Space O(1).
 */
public class ContainerWithMostWater {

    /**
     * Returns the largest amount of water two lines can hold.
     *
     * @param height the line heights
     * @return the maximum area
     */
    public static int maxArea(int[] height) {
        if (height == null || height.length < 2) {
            return 0;
        }

        int left = 0;
        int right = height.length - 1;
        int best = 0;
        while (left < right) {
            int area = (right - left) * Math.min(height[left], height[right]);
            best = Math.max(best, area);
            if (height[left] < height[right]) {
                left++;
            } else {
                right--;
            }
        }
        return best;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] height = fs.nextIntArray(n);

        System.out.println(maxArea(height));
    }
}
`,n=`import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

/**
 * Problem: Container With Most Water
 * LeetCode: 11 | Difficulty: Medium | Frequency: 5/5
 * Pattern: Two pointers, Greedy
 *
 * <p>Problem:
 * Given {@code n} non-negative integers where each value is the height of a vertical
 * line, find two lines that together hold the most water.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * height[0] height[1] ... height[n-1]
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 9
 * 1 8 6 2 5 4 8 3 7
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 49
 * </pre>
 *
 * <p>Approach: start with one pointer at each end and always move the **shorter** of the
 * two lines. The width shrinks by one on every step, so keeping the shorter line could
 * only lose area - the taller one can stay, and moving the shorter one may find a
 * better partner.
 *
 * <p>Complexity: Time O(n), Space O(1).
 */
public class Main {

    /**
     * Returns the largest amount of water two lines can hold.
     *
     * @param height the line heights
     * @return the maximum area
     */
    public static int maxArea(int[] height) {
        if (height == null || height.length < 2) {
            return 0;
        }

        int left = 0;
        int right = height.length - 1;
        int best = 0;
        while (left < right) {
            int area = (right - left) * Math.min(height[left], height[right]);
            best = Math.max(best, area);
            if (height[left] < height[right]) {
                left++;
            } else {
                right--;
            }
        }
        return best;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] height = fs.nextIntArray(n);

        System.out.println(maxArea(height));
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
# Container With Most Water — LeetCode 11

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Two Pointers · Greedy |
| **Interview heat** | ★★★★★ |
| **Asked at** | Amazon, Meta, Google, Microsoft, Uber, Bloomberg |

## Problem Statement

Given \`n\` non-negative integers, where each value is the height of a vertical line drawn
at position \`i\`, find two lines that together with the x-axis hold the most **water**.

The area between two lines \`i\` and \`j\` is

\`\`\`
area = (j - i) × min(height[i], height[j])
\`\`\`

For \`[1, 8, 6, 2, 5, 4, 8, 3, 7]\` the best pair is \`8\` (index 1) and \`7\` (index 8):
width \`8 - 1 = 7\`, height \`min(8, 7) = 7\` → area \`49\`.

## Input Format

The program reads from standard input:

\`\`\`
n
height[0] height[1] ... height[n-1]
\`\`\`

- \`n\` — the number of lines (2 ≤ n ≤ 10⁵)
- \`height\` — n space-separated non-negative integers (0 ≤ height[i] ≤ 10⁴)

## Sample Input

\`\`\`
9
1 8 6 2 5 4 8 3 7
\`\`\`

## Expected Output

\`\`\`
49
\`\`\`

## Approach — Always move the shorter line

Start with one pointer at each end and repeatedly:

1. compute the area,
2. remember the best,
3. move the **shorter** of the two lines inwards.

**Why moving the shorter line is correct (and the taller one is a waste):** suppose
\`height[left] < height[right]\`. The current area is
\`(right - left) × height[left]\`. If we keep \`height[left]\` and move \`right\` inwards, the
width can only get **smaller** and the height stays \`height[left]\` at best — so the area
can only get worse. The only way to improve is to let \`height[left]\` go and look for a
taller partner. The argument for \`height[right]\` is symmetric.

Note the subtlety: it is not that the shorter line is "bad" — it is that the shorter
line is the **bottleneck** of the current area, so it is the one worth replacing.

## Dry Run

Input: \`height = [1, 8, 6, 2, 5, 4, 8, 3, 7]\`

| Step | left | right | width | min height | area | move | best so far |
|---:|---:|---:|---:|---:|---:|---|---:|
| 1 | 0 (1) | 8 (7) | 8 | 1 | 8 | left (1 < 7) | 8 |
| 2 | 1 (8) | 8 (7) | 7 | 7 | **49** | right (8 ≮ 7) | 49 |
| 3 | 1 (8) | 7 (3) | 6 | 3 | 18 | right (3 < 8) | 49 |
| 4 | 1 (8) | 6 (8) | 5 | 8 | 40 | right (8 = 8) | 49 |
| 5 | 1 (8) | 5 (4) | 4 | 4 | 16 | right (4 < 8) | 49 |
| 6 | 1 (8) | 4 (5) | 3 | 5 | 15 | right (5 < 8) | 49 |
| 7 | 1 (8) | 3 (2) | 2 | 2 | 4 | right (2 < 8) | 49 |
| 8 | 1 (8) | 2 (6) | 1 | 6 | 6 | right (6 < 8) | 49 |

The pointers meet and the maximum area found is \`49\` ✓ (step 4 shows that even a large
area of \`40\` cannot beat the \`49\` found in step 2).

## Java Solution

See [\`ContainerWithMostWater.java\`](./ContainerWithMostWater.java).

\`\`\`java
int left = 0;
int right = height.length - 1;
int best = 0;
while (left < right) {
    int area = (right - left) * Math.min(height[left], height[right]);
    best = Math.max(best, area);
    if (height[left] < height[right]) {
        left++;
    } else {
        right--;
    }
}
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n) | every step moves one pointer inwards |
| **Space** | O(1) | no extra storage |

## Interview Notes

**Follow-ups to raise yourself:**
- *"What if you need the two indices, not just the area?"* → keep them when the area
  improves.
- *"What if the lines can be tilted?"* → that is a different problem (the container with
  the most water when tilting is allowed) and the two-pointer greedy no longer works.
- *"What if you have to return the top k areas?"* → the greedy still finds the maximum,
  but the top k needs a different (heap-based) approach.
- *"Can you do it with a sliding window?"* → no; the window can only shrink, which is
  exactly what the greedy does.

**Common mistakes:**
- ❌ Moving the **taller** line → the area can only get worse; the answer becomes wrong.
- ❌ Computing the area with \`max\` instead of \`min\` → the area is limited by the
  **shorter** line.
- ❌ Forgetting the \`left < right\` condition → the same line is used twice.
- ❌ Initialising \`best\` to \`Integer.MIN_VALUE\` and forgetting to update it on the first
  iteration.

**How to narrate:**
> "I put one pointer at each end and compute the area with the smaller height. Then I
> move the shorter line inwards. The reason is that the shorter line is the bottleneck:
> if I keep it and move the other pointer, the width only shrinks and the height cannot
> grow, so the area can never improve. Replacing the bottleneck is the only move worth
> trying. O(n) time, O(1) space."

## Related Problems

- [Two Sum II - Input Array Is Sorted](TwoSumII.md) — the same pointer pattern
- [3Sum Closest](ThreeSumClosest.md) — two pointers with a running best
- [Squares of a Sorted Array](SquaresOfSortedArray.md) — two pointers from both ends
- [Trapping Rain Water](../stacks/TrappingRainWater.md) — the same shape, a different objective
`,i=[`maxArea`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};