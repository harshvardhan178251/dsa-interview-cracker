var e=`dynamicprogramming.NumberOfPartitions`,t=`package com.dsa.dynamicprogramming;

import com.dsa.utils.FastScanner;

/**
 * Problem: Number of Partitions
 * LeetCode: n/a | Difficulty: Medium | Frequency: 3/5
 * Pattern: Counting DP, Unbounded knapsack
 *
 * <p>Problem: Count the ways to write \`n\` as a sum of positive integers where the order of the parts does not matter and every part size may be used any number of times.
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
 * 7
 * </pre>
 *
 * <p>Approach: Let the part size run from 1 to n and let the table count the ways to reach every sum using the part sizes seen so far.
 *
 * <p>Complexity: Time O(n^2), Space O(n).
 */
public class NumberOfPartitions {

    /**
     * Counts the unordered partitions of {@code n} into positive integers.
     *
     * <p>Each part size may be used any number of times, but the order of the parts must not create a
     * new partition. Processing the part sizes one by one guarantees that every partition is generated
     * exactly once.
     *
     * @param n the number to partition
     * @return the number of partitions of {@code n}
     */
    public static long countPartitions(int n) {
        long[] dp = new long[n + 1];
        dp[0] = 1; // one way to make 0: the empty partition

        for (int part = 1; part <= n; part++) {
            for (int sum = part; sum <= n; sum++) {
                dp[sum] += dp[sum - part];
            }
        }
        return dp[n];
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();

        System.out.println(countPartitions(n));
    }
}
`,n=`import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

/**
 * Problem: Number of Partitions
 * LeetCode: n/a | Difficulty: Medium | Frequency: 3/5
 * Pattern: Counting DP, Unbounded knapsack
 *
 * <p>Problem: Count the ways to write \`n\` as a sum of positive integers where the order of the parts does not matter and every part size may be used any number of times.
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
 * 7
 * </pre>
 *
 * <p>Approach: Let the part size run from 1 to n and let the table count the ways to reach every sum using the part sizes seen so far.
 *
 * <p>Complexity: Time O(n^2), Space O(n).
 */
public class Main {

    /**
     * Counts the unordered partitions of {@code n} into positive integers.
     *
     * <p>Each part size may be used any number of times, but the order of the parts must not create a
     * new partition. Processing the part sizes one by one guarantees that every partition is generated
     * exactly once.
     *
     * @param n the number to partition
     * @return the number of partitions of {@code n}
     */
    public static long countPartitions(int n) {
        long[] dp = new long[n + 1];
        dp[0] = 1; // one way to make 0: the empty partition

        for (int part = 1; part <= n; part++) {
            for (int sum = part; sum <= n; sum++) {
                dp[sum] += dp[sum - part];
            }
        }
        return dp[n];
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();

        System.out.println(countPartitions(n));
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
`,r='\n# Number of Partitions\n\n| | |\n|---|---|\n| **Difficulty** | Medium |\n| **Pattern** | Counting DP · Unbounded knapsack |\n| **Interview heat** | ★★★☆☆ |\n| **Asked at** | Amazon, Google, Microsoft |\n\n## Problem Statement\n\nCount the **partitions** of `n`: the ways to write `n` as a sum of positive integers where\n\n- the order of the parts does not matter (`4+1` and `1+4` are the same partition), and\n- a part size may be used as often as you like (`3+1+1` is allowed).\n\nThe single part `n` itself counts as a partition.\n\n## Input Format\n\nThe program reads from standard input:\n\n```\nn\n```\n\n- `n` — the number to partition (1 ≤ n ≤ 200)\n\n## Sample Input\n\n```\n5\n```\n\n## Expected Output\n\n```\n7\n```\n\nThe seven partitions of 5 are `5`, `4+1`, `3+2`, `3+1+1`, `2+2+1`, `2+1+1+1` and `1+1+1+1+1` → **7**.\n\n## Approach\n\nA partition is completely described by **how many times each part size occurs**, so the DP iterates over the part sizes:\n\n1. `dp[sum]` = the number of partitions of `sum` that use only the part sizes processed so far.\n2. `dp[0] = 1` — the empty partition.\n3. For each part size `part` (outer loop) and each sum `≥ part` (inner loop, increasing):\n   `dp[sum] += dp[sum - part]` — every partition of `sum - part` becomes a partition of `sum` by    adding one more `part`.\n4. The answer is `dp[n]`.\n\n**The loop order is the whole point.** Because the part sizes are processed in order, a partition like `3+1+1` is generated exactly once — as `1+1` extended by `3` — and never again in a different order. This is the same "coin in the outer loop" rule as [Coin Change II](./CoinChangeII.java).\n\nThe first values are `p(0) = 1, p(1) = 1, p(2) = 2, p(3) = 3, p(4) = 5, p(5) = 7, …` — the **partition function**, which grows like `e^(π√(2n/3))`.\n\n## Dry Run\n\nInput: `n = 5`. One row per part size.\n\n| part size | sums updated | `dp` after the step |\n|---:|---|---|\n| — | — | `[1, 0, 0, 0, 0, 0]` |\n| 1 | 1 … 5 | `[1, 1, 1, 1, 1, 1]` |\n| 2 | 2 … 5 | `[1, 1, 2, 2, 3, 3]` |\n| 3 | 3 … 5 | `[1, 1, 2, 3, 4, 5]` |\n| 4 | 4 … 5 | `[1, 1, 2, 3, 5, 6]` |\n| 5 | 5 | `[1, 1, 2, 3, 5, 7]` |\n\n`dp[5] = 7` → answer **7**.\n\n**The seven partitions of 5** — one per row of the last column:\n\n| partition | how the DP builds it |\n|---|---|\n| `5` | part size 5 on top of `0` |\n| `4+1` | part size 4 on top of the partition `1` |\n| `3+2` | part size 3 on top of the partition `2` |\n| `3+1+1` | part size 3 on top of `1+1` |\n| `2+2+1` | part size 2 on top of `2+1` |\n| `2+1+1+1` | part size 2 on top of `1+1+1` |\n| `1+1+1+1+1` | part size 1 on top of `1+1+1+1` |\n\n**Why `p(5) = 7` and not 8** — `1+4` and `4+1` are the same partition, and the loop order generates it only once (as `1` extended by `4`).\n\n## Java Solution\n\nSee [`NumberOfPartitions.java`](./NumberOfPartitions.java).\n\n```java\n    public static long countPartitions(int n) {\n        long[] dp = new long[n + 1];\n        dp[0] = 1;\n\n        for (int part = 1; part <= n; part++) {\n            for (int sum = part; sum <= n; sum++) {\n                dp[sum] += dp[sum - part];\n            }\n        }\n        return dp[n];\n    }\n```\n\n## Complexity\n\n| | Value | Why |\n|---|---|---|\n| **Time** | O(n²) | `n` part sizes, each scanning at most `n` sums |\n| **Space** | O(n) | the `dp` array holds `n + 1` entries |\n\n**Space `O(n)`.** A two-dimensional table `dp[part][sum]` is the same computation with `O(n²)` space; the one-dimensional version is its rolled-up form.\n\n## Interview Notes\n\n**Follow-ups to raise yourself:**\n\n- "What if every part must be **distinct**?"* → iterate the sums **downwards** in the inner loop (that is the 0/1 variant).\n- "What if the order matters?"* → that is the composition count, `2^(n-1)` for positive parts.\n- "Can you list the partitions?"* → backtrack through the table.\n- "How fast does the answer grow?"* → like `e^(π√(2n/3))`, so `p(200)` is already astronomically large — hence `long`.\n\n**Common mistakes:**\n\n- ❌ Iterating the sums downwards — that would count partitions with distinct parts only.\n- ❌ Swapping the two loops — the partitions would be counted once per ordering.\n- ❌ Forgetting `dp[0] = 1`, the empty partition.\n\n**How to narrate:**\n\n> "A partition is determined by how often each part size occurs, so I iterate over the part sizes. `dp[sum]` counts the partitions of `sum` that use the part sizes seen so far, and for every part size I add `dp[sum - part]` to `dp[sum]`. Because the part size is the outer loop, every partition is generated in exactly one canonical order — `O(n²)` time, `O(n)` space."\n\n## Related Problems\n\n- [Coin Change II — LeetCode 518](./CoinChangeII.java) — the same recurrence with a coin list\n- [Catalan Number — LeetCode 96](./CatalanNumber.java) — another counting DP\n',i=[`countPartitions`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};