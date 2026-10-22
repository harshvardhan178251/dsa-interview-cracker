var e=`arrays.RotateArray`,t=`package com.dsa.arrays;

import com.dsa.utils.FastScanner;

/**
 * Problem: Rotate Array
 * LeetCode: 189 | Difficulty: Medium | Frequency: 3/5
 * Pattern: Modulo indexing, Cyclic shift
 *
 * <p>Problem:
 * Given an integer array {@code nums} and an integer {@code k}, rotate the array to the
 * right by {@code k} steps. The rotation is cyclic: elements that fall off the right end
 * reappear at the left end.
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
 * 4 5 1 2 3
 * </pre>
 *
 * <p>Approach: normalise {@code k} with {@code ((k % n) + n) % n} so that a huge or
 * negative shift still works. Then place every element at index {@code (i + k) % n} of a
 * fresh array — the destination is exactly the position it occupies after the rotation.
 *
 * <p>Complexity: Time O(n), Space O(n).
 */
public class RotateArray {

    /**
     * Rotates the array to the right by {@code k} positions.
     *
     * @param nums input array (not modified)
     * @param k    number of steps to rotate right
     * @return a new array holding the rotated values
     */
    public static int[] rotate(int[] nums, int k) {
        int n = nums.length;
        if (n == 0) {
            return new int[0];
        }
        int shift = ((k % n) + n) % n;
        int[] rotated = new int[n];
        for (int i = 0; i < n; i++) {
            rotated[(i + shift) % n] = nums[i];
        }
        return rotated;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] nums = fs.nextIntArray(n);
        int k = fs.nextInt();

        int[] rotated = rotate(nums, k);
        StringBuilder out = new StringBuilder();
        for (int i = 0; i < rotated.length; i++) {
            if (i > 0) {
                out.append(' ');
            }
            out.append(rotated[i]);
        }
        System.out.println(out);
    }
}
`,n=`import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

/**
 * Problem: Rotate Array
 * LeetCode: 189 | Difficulty: Medium | Frequency: 3/5
 * Pattern: Modulo indexing, Cyclic shift
 *
 * <p>Problem:
 * Given an integer array {@code nums} and an integer {@code k}, rotate the array to the
 * right by {@code k} steps. The rotation is cyclic: elements that fall off the right end
 * reappear at the left end.
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
 * 4 5 1 2 3
 * </pre>
 *
 * <p>Approach: normalise {@code k} with {@code ((k % n) + n) % n} so that a huge or
 * negative shift still works. Then place every element at index {@code (i + k) % n} of a
 * fresh array — the destination is exactly the position it occupies after the rotation.
 *
 * <p>Complexity: Time O(n), Space O(n).
 */
public class Main {

    /**
     * Rotates the array to the right by {@code k} positions.
     *
     * @param nums input array (not modified)
     * @param k    number of steps to rotate right
     * @return a new array holding the rotated values
     */
    public static int[] rotate(int[] nums, int k) {
        int n = nums.length;
        if (n == 0) {
            return new int[0];
        }
        int shift = ((k % n) + n) % n;
        int[] rotated = new int[n];
        for (int i = 0; i < n; i++) {
            rotated[(i + shift) % n] = nums[i];
        }
        return rotated;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] nums = fs.nextIntArray(n);
        int k = fs.nextInt();

        int[] rotated = rotate(nums, k);
        StringBuilder out = new StringBuilder();
        for (int i = 0; i < rotated.length; i++) {
            if (i > 0) {
                out.append(' ');
            }
            out.append(rotated[i]);
        }
        System.out.println(out);
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
`,r='\n# Rotate Array — LeetCode 189\n\n| | |\n|---|---|\n| **Difficulty** | Medium |\n| **Pattern** | Modulo indexing · Cyclic shift |\n| **Interview heat** | ★★★☆☆ |\n| **Asked at** | Amazon, Google, Meta, Uber, Adobe |\n\n## Problem Statement\n\nGiven an integer array `nums` and an integer `k`, rotate the array to the **right** by `k`\nsteps. The rotation is cyclic — elements that fall off the right end reappear at the\nleft end.\n\n## Input Format\n\n```\nn\nnums[0] nums[1] ... nums[n-1]\nk\n```\n\n- `n` — length of the array (1 ≤ n ≤ 10⁴)\n- `nums` — n space-separated integers\n- `k` — number of steps to rotate right (may be negative or larger than `n`)\n\n## Sample Input\n\n```\n5\n1 2 3 4 5\n2\n```\n\n## Expected Output\n\n```\n4 5 1 2 3\n```\n\n## Approach — One Pass with Modulo Indexing\n\nRotating right by `k` means the element at index `i` ends up at index\n`(i + k) mod n`. That single fact gives an O(n) solution with one pass and no\nintermediate arrays beyond the result.\n\nSteps:\n\n1. **Normalise `k`.** `shift = ((k % n) + n) % n`. This handles `k > n` (wrap around),\n   `k < 0` (rotate left instead) and avoids a negative modulo in Java, where\n   `-1 % 5 == -1`.\n2. For every `i`, write `nums[i]` into `rotated[(i + shift) % n]`.\n\n**Why it works:** the mapping `i → (i + shift) mod n` is a bijection on `{0..n-1}` — every\nindex is hit exactly once — so no element is lost or duplicated.\n\n**In-place variant (the classic three-reversal):** reverse the whole array, reverse the\nfirst `k` elements, reverse the remaining `n - k`. It is O(1) extra space, but it\nmutates the input, which is why the version here allocates a fresh array.\n\n## Dry Run\n\nInput: `nums = [1, 2, 3, 4, 5]`, `k = 2`, `n = 5`\n\nNormalisation: `shift = ((2 % 5) + 5) % 5 = 2`\n\n| Step | i | `nums[i]` | destination `(i + 2) % 5` | `rotated` before | `rotated` after |\n|---:|---:|---:|---:|---|---|\n| 1 | 0 | 1 | 2 | `[0, 0, 0, 0, 0]` | `[0, 0, 1, 0, 0]` |\n| 2 | 1 | 2 | 3 | `[0, 0, 1, 0, 0]` | `[0, 0, 1, 2, 0]` |\n| 3 | 2 | 3 | 4 | `[0, 0, 1, 2, 0]` | `[0, 0, 1, 2, 3]` |\n| 4 | 3 | 4 | 0 | `[0, 0, 1, 2, 3]` | `[4, 0, 1, 2, 3]` |\n| 5 | 4 | 5 | 1 | `[4, 0, 1, 2, 3]` | `[4, 5, 1, 2, 3]` |\n\nAnswer: **4 5 1 2 3**\n\n### Normalising a large or negative `k`\n\n| `k` | `k % n` | `((k % n) + n) % n` | meaning |\n|---:|---:|---:|---|\n| 2 | 2 | 2 | rotate right by 2 |\n| 7 | 2 | 2 | 7 mod 5 = 2 |\n| −1 | −1 | 4 | rotate left by 1 = right by 4 |\n| 0 | 0 | 0 | no rotation |\n\n## Java Solution\n\nSee [`RotateArray.java`](./RotateArray.java).\n\n```java\npublic static int[] rotate(int[] nums, int k) {\n    int n = nums.length;\n    if (n == 0) {\n        return new int[0];\n    }\n    int shift = ((k % n) + n) % n;\n    int[] rotated = new int[n];\n    for (int i = 0; i < n; i++) {\n        rotated[(i + shift) % n] = nums[i];\n    }\n    return rotated;\n}\n```\n\n## Complexity\n\n| | Value | Why |\n|---|---|---|\n| **Time** | O(n) | Every element is moved once |\n| **Space** | O(n) | A fresh result array (O(1) with the three-reversal variant) |\n\n## Interview Notes\n\n**Follow-ups to raise yourself:**\n- *"Can you do it in O(1) extra space?"* → yes, the three-reversal trick: reverse all,\n  reverse the first `k`, reverse the rest.\n- *"What if `k` is huge, like 10⁹?"* → normalise it with `k % n` first; the modulo\n  normalisation above handles it in O(1).\n- *"What if `k` can be negative?"* → the double-modulo makes negative `k` work directly.\n- *"Rotate left instead of right?"* → change the destination to `(i - shift + n) % n`.\n- *"What if you cannot allocate a second array?"* → the reversal approach, or a\n  cycle-rotation using the gcd of `n` and `k`.\n\n**Common mistakes:**\n- ❌ Using `k % n` alone — in Java a negative `k` produces a **negative** shift and the\n  destination index goes negative.\n- ❌ Forgetting that the rotation is to the **right** — element `i` moves to\n  `(i + k) % n`, not `(i - k) % n`.\n- ❌ Off-by-one in the reversal variant: the last reversal covers `n - k` elements, not\n  `k`.\n\n**How to narrate:**\n> "A right rotation by `k` maps index `i` to `(i + k) mod n`. I normalise `k` first so\n> that huge and negative shifts both collapse into `[0, n-1]`, then I do a single pass\n> writing each element to its destination. That\'s O(n) time. If the interviewer wants\n> O(1) extra space, I switch to the three-reversal approach."\n\n## Related Problems\n\n- [Rotate Image](RotateImage.md) — the 2D version of the same idea\n- [Shuffle Array](ShuffleArray.md) — Fisher-Yates, the other way to permute an array\n- [Spiral Matrix](SpiralMatrix.md) — boundary-shifting matrix traversal\n',i=[`rotate`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};