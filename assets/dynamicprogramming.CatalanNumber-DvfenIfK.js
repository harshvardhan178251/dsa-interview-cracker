var e=`dynamicprogramming.CatalanNumber`,t=`package com.dsa.dynamicprogramming;

import com.dsa.utils.FastScanner;

/**
 * Problem: Catalan Number
 * LeetCode: 96 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Counting DP, Combinatorics
 *
 * <p>Problem: Compute the \`n\`-th Catalan number -- the number of structurally different binary search trees with \`n\` nodes.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 5
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 42
 * </pre>
 *
 * <p>Approach: Split the tree at its root: the left and the right subtrees are independent, so the counts multiply and the sizes add up.
 *
 * <p>Complexity: Time O(n^2), Space O(n).
 */
public class CatalanNumber {

    /**
     * Returns the {@code n}-th Catalan number.
     *
     * <p>{@code dp[n]} counts the binary search trees with {@code n} nodes. Choosing the root splits
     * the remaining nodes into a left and a right subtree, so
     * {@code dp[n] = sum(dp[i] * dp[n-1-i])} over all splits.
     *
     * @param n the index
     * @return the {@code n}-th Catalan number
     */
    public static long catalan(int n) {
        long[] dp = new long[n + 1];
        dp[0] = 1; // exactly one empty tree

        for (int nodes = 1; nodes <= n; nodes++) {
            for (int left = 0; left < nodes; left++) {
                dp[nodes] += dp[left] * dp[nodes - 1 - left];
            }
        }
        return dp[n];
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();

        System.out.println(catalan(n));
    }
}
`,n=`import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

/**
 * Problem: Catalan Number
 * LeetCode: 96 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Counting DP, Combinatorics
 *
 * <p>Problem: Compute the \`n\`-th Catalan number -- the number of structurally different binary search trees with \`n\` nodes.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 5
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 42
 * </pre>
 *
 * <p>Approach: Split the tree at its root: the left and the right subtrees are independent, so the counts multiply and the sizes add up.
 *
 * <p>Complexity: Time O(n^2), Space O(n).
 */
public class Main {

    /**
     * Returns the {@code n}-th Catalan number.
     *
     * <p>{@code dp[n]} counts the binary search trees with {@code n} nodes. Choosing the root splits
     * the remaining nodes into a left and a right subtree, so
     * {@code dp[n] = sum(dp[i] * dp[n-1-i])} over all splits.
     *
     * @param n the index
     * @return the {@code n}-th Catalan number
     */
    public static long catalan(int n) {
        long[] dp = new long[n + 1];
        dp[0] = 1; // exactly one empty tree

        for (int nodes = 1; nodes <= n; nodes++) {
            for (int left = 0; left < nodes; left++) {
                dp[nodes] += dp[left] * dp[nodes - 1 - left];
            }
        }
        return dp[n];
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();

        System.out.println(catalan(n));
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
`,r='\n# Catalan Number — LeetCode 96\n\n| | |\n|---|---|\n| **Difficulty** | Medium |\n| **Pattern** | Counting DP · Combinatorics |\n| **Interview heat** | ★★★★☆ |\n| **Asked at** | Amazon, Google, Meta, Microsoft |\n\n## Problem Statement\n\nThe Catalan numbers count a family of combinatorial objects — most famously the number of structurally different **binary search trees** with `n` nodes.\n\nCompute `C(n)`, where `C(0) = 1` and\n\n`C(n) = sum over i = 0 … n-1 of ( C(i) × C(n-1-i) )`.\n\n## Input Format\n\nThe program reads from standard input:\n\n```\nn\n```\n\n- `n` — the index of the Catalan number (0 ≤ n ≤ 19)\n\n## Sample Input\n\n```\n5\n```\n\n## Expected Output\n\n```\n42\n```\n\nThe Catalan numbers are `1, 1, 2, 5, 14, 42, 132, …` → `C(5) = 42`.\n\n## Approach\n\n**The combinatorial view (used here).** A binary search tree with `n` nodes has a root; the nodes smaller than the root go left, the larger ones go right. If the left subtree has `i` nodes the right one has `n - 1 - i`, and the two subtrees can be chosen independently:\n\n`C(n) = Σ C(i) · C(n-1-i)`\n\n`C(0) = 1` — there is exactly one empty tree.\n\n**The closed form.** `C(n) = (2n)! / ((n+1)! · n!) = C(2n, n) / (n+1)`. It is `O(n)` with exact integer arithmetic, but it overflows quickly and it hides the structure — the DP is what interviewers want.\n\nCatalan numbers also count: parenthesisations of `n+1` factors, valid bracket sequences of length `2n`, triangulations of a convex polygon with `n+2` vertices, and the number of ways to build a binary search tree from a sorted array.\n\n## Dry Run\n\nInput: `n = 5`.\n\n| nodes | splits `i` | computation | `dp[nodes]` |\n|---:|---|---|---:|\n| 0 | — | base case | **1** |\n| 1 | 0 | `C(0)·C(0) = 1·1` | **1** |\n| 2 | 0, 1 | `1·1 + 1·1 = 2` | **2** |\n| 3 | 0, 1, 2 | `1·2 + 1·1 + 2·1 = 5` | **5** |\n| 4 | 0, 1, 2, 3 | `1·5 + 1·2 + 2·1 + 5·1 = 14` | **14** |\n| 5 | 0, 1, 2, 3, 4 | `1·14 + 1·5 + 2·2 + 5·1 + 14·1 = 42` | **42** |\n\nFull table: `dp = [1, 1, 2, 5, 14, 42]` → answer **42**.\n\n**The symmetry.** `C(n) = Σ C(i)·C(n-1-i)` is symmetric in `i` and `n-1-i`, so the sum can be halved with one middle term — a constant-factor trick worth mentioning.\n\n**The closed form check.** `C(5) = C(10, 5) / 6 = 252 / 6 = 42` ✓\n\n**Overflow.** `C(20) = 6 564 120 420`, which no longer fits in an `int` — that is why the method returns a `long`.\n\n## Java Solution\n\nSee [`CatalanNumber.java`](./CatalanNumber.java).\n\n```java\n    public static long catalan(int n) {\n        long[] dp = new long[n + 1];\n        dp[0] = 1;\n\n        for (int nodes = 1; nodes <= n; nodes++) {\n            for (int left = 0; left < nodes; left++) {\n                dp[nodes] += dp[left] * dp[nodes - 1 - left];\n            }\n        }\n        return dp[n];\n    }\n```\n\n## Complexity\n\n| | Value | Why |\n|---|---|---|\n| **Time** | O(n²) | `n` sizes, each trying `n` splits |\n| **Space** | O(n) | the `dp` array holds `n + 1` entries |\n\n**Space `O(n)`.** The closed form `C(2n, n) / (n + 1)` is `O(n)` time and `O(1)` space with exact arithmetic.\n\n## Interview Notes\n\n**Follow-ups to raise yourself:**\n\n- "Give me the closed form."* → `C(2n, n) / (n + 1)`, computed with a running product to avoid overflow.\n- "What else do Catalan numbers count?"* → parenthesisations, bracket sequences, polygon triangulations, the "number of ways to build a BST from a sorted array" (LeetCode 96).\n- "Can you compute it in `O(n)` time?"* → yes, with the closed form.\n- "How would you count the BSTs directly?"* → by inserting the keys in the given order and multiplying the number of valid slots at each step.\n\n**Common mistakes:**\n\n- ❌ Using `int` — `C(20)` already overflows a 32-bit integer.\n- ❌ Setting `dp[0] = 0` — the empty tree is one valid structure.\n- ❌ Iterating the splits over `1 … n` instead of `0 … n-1` (the left subtree may be empty).\n\n**How to narrate:**\n\n> "A binary search tree with `n` nodes is determined by its root: the left subtree gets `i` nodes and the right one `n-1-i`, and the two can be chosen independently, so the counts multiply. That gives the Catalan recurrence `C(n) = sum C(i)·C(n-1-i)` with `C(0) = 1`, computed in `O(n²)` time. I return a `long` because `C(20)` overflows an `int`."\n\n## Related Problems\n\n- [Unique Paths — LeetCode 62](./UniquePaths.java) — binomial coefficients\n- [Longest Increasing Subsequence — LeetCode 300](./LongestIncreasingSubsequence.java) — another classic DP\n',i=[`catalan`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};