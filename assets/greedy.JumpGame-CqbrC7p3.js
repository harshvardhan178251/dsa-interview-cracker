var e=`greedy.JumpGame`,t=`package com.dsa.greedy;

import com.dsa.utils.FastScanner;

/**
 * Problem: Jump Game
 * LeetCode: 55 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Greedy, Reach tracking
 *
 * <p>Problem:
 * You are given an integer array {@code nums}. From index {@code i} you may jump to any
 * index {@code j} with {@code i < j <= i + nums[i]}. Decide whether the last index
 * {@code nums.length - 1} can be reached starting from index 0.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * nums[0] nums[1] ... nums[n-1]
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 4
 * 2 3 1 1
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * true
 * </pre>
 *
 * <p>Approach: sweep left to right keeping {@code reach}, the furthest index that is
 * known to be reachable. When the sweep reaches an index {@code i > reach} that index is
 * unreachable — and so is everything after it — so the answer is {@code false}.
 * Otherwise extend {@code reach} to {@code max(reach, i + nums[i])}.
 *
 * <p>Complexity: Time O(n), Space O(1).
 */
public class JumpGame {

    /**
     * Returns whether the last index of {@code nums} is reachable from index 0.
     *
     * @param nums jump lengths, {@code nums[i]} is the maximum jump length from index i
     * @return {@code true} when the last index can be reached
     */
    public static boolean canJump(int[] nums) {
        if (nums == null || nums.length == 0) {
            return false;
        }
        int reach = 0;
        for (int i = 0; i < nums.length; i++) {
            if (i > reach) {
                return false;
            }
            reach = Math.max(reach, i + nums[i]);
            if (reach >= nums.length - 1) {
                return true;
            }
        }
        return reach >= nums.length - 1;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] nums = fs.nextIntArray(n);

        System.out.println(canJump(nums) ? "true" : "false");
    }
}
`,n=`import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

/**
 * Problem: Jump Game
 * LeetCode: 55 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Greedy, Reach tracking
 *
 * <p>Problem:
 * You are given an integer array {@code nums}. From index {@code i} you may jump to any
 * index {@code j} with {@code i < j <= i + nums[i]}. Decide whether the last index
 * {@code nums.length - 1} can be reached starting from index 0.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * nums[0] nums[1] ... nums[n-1]
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 4
 * 2 3 1 1
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * true
 * </pre>
 *
 * <p>Approach: sweep left to right keeping {@code reach}, the furthest index that is
 * known to be reachable. When the sweep reaches an index {@code i > reach} that index is
 * unreachable — and so is everything after it — so the answer is {@code false}.
 * Otherwise extend {@code reach} to {@code max(reach, i + nums[i])}.
 *
 * <p>Complexity: Time O(n), Space O(1).
 */
public class Main {

    /**
     * Returns whether the last index of {@code nums} is reachable from index 0.
     *
     * @param nums jump lengths, {@code nums[i]} is the maximum jump length from index i
     * @return {@code true} when the last index can be reached
     */
    public static boolean canJump(int[] nums) {
        if (nums == null || nums.length == 0) {
            return false;
        }
        int reach = 0;
        for (int i = 0; i < nums.length; i++) {
            if (i > reach) {
                return false;
            }
            reach = Math.max(reach, i + nums[i]);
            if (reach >= nums.length - 1) {
                return true;
            }
        }
        return reach >= nums.length - 1;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] nums = fs.nextIntArray(n);

        System.out.println(canJump(nums) ? "true" : "false");
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
`,r='\n# Jump Game — LeetCode 55\n\n| | |\n|---|---|\n| **Difficulty** | Medium |\n| **Pattern** | Greedy · Reach tracking |\n| **Interview heat** | ★★★★☆ |\n| **Asked at** | Amazon, Google, Meta, Uber, Bloomberg |\n\n## Problem Statement\n\nYou are given an integer array `nums`. From index `i` you may jump to **any** index `j`\nwith `i < j <= i + nums[i]`. Decide whether the last index `nums.length - 1` can be\nreached starting from index `0`.\n\n- `nums[i]` is the **maximum** jump length from index `i` — you may jump less.\n- If `nums.length == 1` you are already there.\n\n## Input Format\n\nThe program reads from standard input:\n\n```\nn\nnums[0] nums[1] ... nums[n-1]\n```\n\n- `n` — length of the array (1 ≤ n ≤ 10⁴)\n- `nums` — n space-separated non-negative integers\n\n## Sample Input\n\n```\n4\n2 3 1 1\n```\n\n## Expected Output\n\n```\ntrue\n```\n\nIndex 0 → index 2 (jump of 2) → index 3 (jump of 1) reaches the last index.\n\n## Approach — greedy reach\n\nInstead of asking *"can I jump from here?"* ask *"how far can I reach from here?"*. Keep a\nsingle number `reach`: the furthest index that is known to be reachable.\n\n1. Start with `reach = 0` — index 0 is reachable.\n2. Walk `i` from left to right.\n   * If `i > reach`, index `i` is **not** reachable. Every later index is even further\n     away, so the answer is `false`.\n   * Otherwise extend the frontier: `reach = max(reach, i + nums[i])`.\n3. As soon as `reach >= n - 1` the last index is reachable → `true`.\n\n**Why is one pass enough?** `reach` is only ever raised by an index that we have\nalready proven reachable, so it is always a true statement about the reachable set.\nAnd because every jump goes **forward**, the set of reachable indices is a prefix\n`[0 .. reach]`: if index `i` is reachable then so is every index before it. The first\nindex that is not in that prefix is the first place the walk gets stuck.\n\n**Exchange argument (why the greedy choice is safe):** when we stand on a reachable\nindex `i`, taking the *largest* possible jump (`i + nums[i]`) can never hurt. Any plan\nthat jumps to a smaller index `j < i + nums[i]` can be extended by replacing that jump\nwith `i → i + nums[i]`: from `i + nums[i]` every index that was reachable from `j` and\ngreater than `i + nums[i]` is still reachable (a jump of length `nums[i]` reaches at\nleast as far as a jump of length `nums[j] - i` did), while the indices between `j` and\n`i + nums[i]` are simply skipped. Skipping indices never removes a possibility, because\na reachable index `p` can only be used as a *launch pad* for jumps that go further\nright — and `i + nums[i]` is at least as far right as `j`.\n\n## Dry Run\n\nInput: `nums = [2, 3, 1, 1]`, `n = 4`\n\n| Step | i | nums[i] | `reach` before | `i > reach`? | `reach` after | Reachable set |\n|---:|---:|---:|---:|---|---|---|\n| 1 | 0 | 2 | 0 | no (0 ≤ 0) | `max(0, 0+2) = 2` | `[0, 1, 2]` |\n| 2 | 1 | 3 | 2 | no (1 ≤ 2) | `max(2, 1+3) = 4` | `[0 .. 4]` |\n| 3 | — | — | 4 | — | — | `reach = 4 ≥ n-1 = 3` → **true** |\n\nThe scan stops at step 2 because the frontier already covers the last index.\n\n### Trace where it fails — `nums = [3, 2, 1, 0, 4]`, `n = 5`\n\n| Step | i | nums[i] | `reach` before | `i > reach`? | `reach` after | Note |\n|---:|---:|---:|---:|---|---|---|\n| 1 | 0 | 3 | 0 | no | `max(0, 0+3) = 3` | reachable `[0..3]` |\n| 2 | 1 | 2 | 3 | no | `max(3, 1+2) = 3` | reachable `[0..3]` |\n| 3 | 2 | 1 | 3 | no | `max(3, 2+1) = 3` | reachable `[0..3]` |\n| 4 | 3 | 0 | 3 | no | `max(3, 3+0) = 3` | reachable `[0..3]` |\n| 5 | 4 | 4 | 3 | **yes** (4 > 3) | — | index 4 unreachable → **false** |\n\n## Java Solution\n\nSee [`JumpGame.java`](./JumpGame.java).\n\n```java\npublic static boolean canJump(int[] nums) {\n    if (nums == null || nums.length == 0) {\n        return false;\n    }\n    int reach = 0;\n    for (int i = 0; i < nums.length; i++) {\n        if (i > reach) {\n            return false;\n        }\n        reach = Math.max(reach, i + nums[i]);\n        if (reach >= nums.length - 1) {\n            return true;\n        }\n    }\n    return reach >= nums.length - 1;\n}\n```\n\n## Complexity\n\n| | Value | Why |\n|---|---|---|\n| **Time** | O(n) | one left-to-right pass, O(1) work per element |\n| **Space** | O(1) | only `i` and `reach` are stored |\n\n**Optimal?** Yes — the input has to be read, so Ω(n) is a lower bound.\n\n## Interview Notes\n\n**Follow-ups to raise yourself:**\n- *"What is the minimum number of jumps?"* → [Jump Game II](./JumpGameII.md) — the same\n  reach idea, but counting BFS layers.\n- *"What if the jumps can go backwards too?"* → [Jump Game III](./JumpGameIII.md), where\n  the reach set is no longer a prefix and you need a BFS.\n- *"Can you solve it in O(1) space?"* → you already are; mention that the greedy pass\n  never needs the array after the last read.\n\n**Common mistakes:**\n- ❌ Checking `nums[i] >= n - 1 - i` only for the last element — you must know that\n  every intermediate launch pad is reachable too.\n- ❌ Returning `true` as soon as `i + nums[i] >= n - 1` **without** having proved that\n  `i` itself is reachable.\n- ❌ Using `i + nums[i] > reach` instead of `Math.max(...)` — `reach` must never shrink.\n\n**How to narrate:**\n> "I\'ll keep a single number `reach` — the furthest index I can get to. I scan left to\n> right; if the current index is already beyond `reach` I\'m stuck and the answer is no.\n> Otherwise I extend `reach` with the jump from here. The key insight is that every\n> jump goes forward, so the reachable set is always a prefix — one pass is enough."\n\n## Related Problems\n\n- [Jump Game II](./JumpGameII.md) — the minimum number of jumps\n- [Jump Game III](./JumpGameIII.md) — jumps in both directions\n- [Gas Station](./GasStation.md) — the same "restart when the tank goes negative" idea\n',i=[`canJump`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};