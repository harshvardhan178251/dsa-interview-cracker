var e=`dynamicprogramming.MinimumJumpSteps`,t=`package com.dsa.dynamicprogramming;

import com.dsa.utils.FastScanner;

/**
 * Problem: Jump Game II
 * LeetCode: 45 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Greedy + DP, Jump game
 *
 * <p>Problem: Given an array where each element is the maximum jump length at that position, return the minimum number of jumps needed to reach the last index.
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
 * 2 3 1 1 4
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 2
 * </pre>
 *
 * <p>Approach: Sweep the array and remember the furthest index reachable with the jumps taken so far.
 *
 * <p>Complexity: Time O(n), Space O(1).
 */
public class MinimumJumpSteps {

    /**
     * Returns the minimum number of jumps needed to reach the last index of {@code nums}.
     *
     * <p>{@code currentEnd} is the last index that the jumps counted so far can reach;
     * {@code farthest} is the furthest index reachable with one more jump. Whenever the scan reaches
     * {@code currentEnd} a new jump is needed, so the counter grows and the window slides.
     *
     * @param nums maximum jump length at each position
     * @return the minimum number of jumps
     */
    public static int jump(int[] nums) {
        int jumps = 0;
        int currentEnd = 0; // the boundary the jumps taken so far can reach
        int farthest = 0;   // the boundary one more jump could reach

        for (int i = 0; i < nums.length - 1; i++) {
            farthest = Math.max(farthest, i + nums[i]);
            if (i == currentEnd) {
                jumps++;              // we ran out of the current window
                currentEnd = farthest; // the next window is one jump further
            }
        }
        return jumps;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] nums = fs.nextIntArray(n);

        System.out.println(jump(nums));
    }
}
`,n=`import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

/**
 * Problem: Jump Game II
 * LeetCode: 45 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Greedy + DP, Jump game
 *
 * <p>Problem: Given an array where each element is the maximum jump length at that position, return the minimum number of jumps needed to reach the last index.
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
 * 2 3 1 1 4
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 2
 * </pre>
 *
 * <p>Approach: Sweep the array and remember the furthest index reachable with the jumps taken so far.
 *
 * <p>Complexity: Time O(n), Space O(1).
 */
public class Main {

    /**
     * Returns the minimum number of jumps needed to reach the last index of {@code nums}.
     *
     * <p>{@code currentEnd} is the last index that the jumps counted so far can reach;
     * {@code farthest} is the furthest index reachable with one more jump. Whenever the scan reaches
     * {@code currentEnd} a new jump is needed, so the counter grows and the window slides.
     *
     * @param nums maximum jump length at each position
     * @return the minimum number of jumps
     */
    public static int jump(int[] nums) {
        int jumps = 0;
        int currentEnd = 0; // the boundary the jumps taken so far can reach
        int farthest = 0;   // the boundary one more jump could reach

        for (int i = 0; i < nums.length - 1; i++) {
            farthest = Math.max(farthest, i + nums[i]);
            if (i == currentEnd) {
                jumps++;              // we ran out of the current window
                currentEnd = farthest; // the next window is one jump further
            }
        }
        return jumps;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] nums = fs.nextIntArray(n);

        System.out.println(jump(nums));
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
# Jump Game II — LeetCode 45

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Greedy + DP · Jump game |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Uber |

## Problem Statement

You are given an integer array \`nums\`. From index \`i\` you may jump to any index \`j\` with \`i < j ≤ i + nums[i]\`. Return the **minimum** number of jumps needed to reach the last index of the array.

The last index is always reachable (the answer may be \`0\` when the array has one element).

## Input Format

The program reads from standard input:

\`\`\`
n
nums[0] nums[1] ... nums[n-1]
\`\`\`

- \`n\` — length of the array (1 ≤ n ≤ 10⁴)
- \`nums\` — n space-separated non-negative integers

## Sample Input

\`\`\`
5
2 3 1 1 4
\`\`\`

## Expected Output

\`\`\`
2
\`\`\`

Jump from index 0 to index 1, then from index 1 to index 4 → **2** jumps.

## Approach

The BFS-over-jump-layers view makes the greedy solution obvious:

> Think of the array as a graph. All positions reachable with one jump form **layer 1**, positions reachable with two jumps form **layer 2**, and so on. The answer is the number of layers.

We never build the layers — we just track their boundaries:

- \`currentEnd\` — the last index reachable with the jumps counted so far.
- \`farthest\` — the last index reachable with one more jump.
- While scanning, \`farthest = max(farthest, i + nums[i])\`.
- As soon as the scan reaches \`currentEnd\`, the current layer is exhausted: one more jump is   needed, and the next layer ends at \`farthest\`.

The equivalent DP form is \`dp[i] = 1 + min(dp[j])\` over all \`j\` with \`j < i ≤ j + nums[j]\`, which is \`O(n²)\`; the greedy version is \`O(n)\` and just as short.

## Dry Run

Input: \`nums = [2, 3, 1, 1, 4]\`. The loop stops at \`n - 2\` — the last index needs no jump.

| \`i\` | \`nums[i]\` | \`farthest = max(farthest, i + nums[i])\` | \`i == currentEnd\`? | \`jumps\` | \`currentEnd\` |
|---:|---:|---:|---|---:|---:|
| 0 | 2 | max(0, 0 + 2) = 2 | yes | 1 | 2 |
| 1 | 3 | max(2, 1 + 3) = 4 | no | 1 | 2 |
| 2 | 1 | max(4, 2 + 1) = 4 | yes | 2 | 4 |
| 3 | 1 | max(4, 3 + 1) = 4 | no | 2 | 4 |

The scan ends at \`i = 3\` (the last index is \`4\`) → answer **2**.

**The layers.** One jump reaches indices 1 and 2 (\`currentEnd = 2\`). Two jumps reach up to index 4 (\`currentEnd = 4\`) — and index 4 is the last index, so two jumps are enough.

**The DP version for comparison.** \`dp[i]\` = minimum jumps to reach \`i\`:

| \`i\` | \`nums[i]\` | predecessors \`j\` with \`j + nums[j] ≥ i\` | \`dp[i]\` |
|---:|---:|---|---:|
| 0 | 2 | — | 0 |
| 1 | 3 | 0 | 1 |
| 2 | 1 | 0, 1 | 1 |
| 3 | 1 | 1, 2 | 2 |
| 4 | 4 | 1, 2, 3 | 2 |

Same answer, \`O(n²)\` time.

## Java Solution

See [\`MinimumJumpSteps.java\`](./MinimumJumpSteps.java).

\`\`\`java
    public static int jump(int[] nums) {
        int jumps = 0;
        int currentEnd = 0;
        int farthest = 0;

        for (int i = 0; i < nums.length - 1; i++) {
            farthest = Math.max(farthest, i + nums[i]);
            if (i == currentEnd) {
                jumps++;
                currentEnd = farthest;
            }
        }
        return jumps;
    }
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n) | one pass over the array |
| **Space** | O(1) | three integers |

**Space \`O(1)\`.** The DP version needs \`O(n)\` space for the \`dp\` array.

## Interview Notes

**Follow-ups to raise yourself:**

- "What if some index is unreachable?"* → return \`-1\` (the greedy window would stall; the DP marks the cell as unreachable).
- "Can you give me the actual jumps?"* → during the greedy scan, record the index that produced each \`farthest\` value.
- "What is the difference to Jump Game I?"* → that one only asks whether the last index is reachable — a simpler greedy (\`farthest >= i\` check).
- "Can you do it with DP instead?"* → yes, \`dp[i] = 1 + min(dp[j])\`, \`O(n²)\`.

**Common mistakes:**

- ❌ Looping to \`nums.length\` instead of \`nums.length - 1\` — the last index needs no jump, and the extra iteration can add a jump.
- ❌ Using \`i + nums[i]\` without \`Math.max\` — a later position may reach less far than an earlier one.
- ❌ Incrementing \`jumps\` on every index instead of only when the window boundary is reached.

**How to narrate:**

> "I think of the jumps as BFS layers. \`currentEnd\` is the end of the layer I can reach with the jumps I have counted, and \`farthest\` is the end of the next layer. While scanning I keep the farthest index reachable with one more jump; the moment the scan reaches \`currentEnd\` I have to count one more jump and slide the window to \`farthest\`. That is \`O(n)\` time and \`O(1)\` space."

## Related Problems

- [House Robber — LeetCode 198](./HouseRobber.java) — the take-or-skip DP
- [Unique Paths — LeetCode 62](./UniquePaths.java) — the grid DP
`,i=[`jump`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};