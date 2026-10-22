var e=`dynamicprogramming.StoneGameII`,t=`package com.dsa.dynamicprogramming;

import com.dsa.utils.FastScanner;

/**
 * Problem: Stone Game II
 * LeetCode: 1140 | Difficulty: Medium | Frequency: 3/5
 * Pattern: Game DP, Bottom-up DP
 *
 * <p>Problem: Alice and Bob take piles from the front of a row. A player may take between 1 and \`2M\` piles, where \`M\` starts at 1 and becomes \`max(M, taken)\`. Return the number of stones Alice can force.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * piles[0] piles[1] ... piles[n-1]
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 5
 * 2 7 9 4 4
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 10
 * </pre>
 *
 * <p>Approach: Track the best score of the player whose turn it is; after a move the opponent plays the same sub-game, so the score is "remaining stones minus the opponent's best".
 *
 * <p>Complexity: Time O(n^3), Space O(n^2).
 */
public class StoneGameII {

    /**
     * Returns the number of stones Alice can guarantee when both players play optimally.
     *
     * <p>On every turn the current player may take between {@code 1} and {@code 2 * M} piles from the
     * front; afterwards {@code M} becomes {@code max(M, taken)} for the opponent. Because the total
     * number of stones is fixed, maximising my score is the same as minimising the opponent's, so
     * {@code dp[i][m]} = "the best score of the player to move" and the recurrence is a subtraction.
     *
     * @param piles the stones in each pile
     * @return the number of stones Alice gets when she moves first
     */
    public static int stoneGameII(int[] piles) {
        int n = piles.length;
        int[] suffix = new int[n + 1];
        for (int i = n - 1; i >= 0; i--) {
            suffix[i] = suffix[i + 1] + piles[i];
        }

        int[][] dp = new int[n][n + 1];
        for (int i = n - 1; i >= 0; i--) {
            for (int m = 1; m <= n; m++) {
                if (2 * m >= n - i) {
                    dp[i][m] = suffix[i]; // take every remaining pile
                    continue;
                }
                int best = 0;
                for (int taken = 1; taken <= 2 * m; taken++) {
                    int score = suffix[i] - dp[i + taken][Math.max(m, taken)];
                    best = Math.max(best, score);
                }
                dp[i][m] = best;
            }
        }
        return dp[0][1];
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] piles = fs.nextIntArray(n);

        System.out.println(stoneGameII(piles));
    }
}
`,n=`import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

/**
 * Problem: Stone Game II
 * LeetCode: 1140 | Difficulty: Medium | Frequency: 3/5
 * Pattern: Game DP, Bottom-up DP
 *
 * <p>Problem: Alice and Bob take piles from the front of a row. A player may take between 1 and \`2M\` piles, where \`M\` starts at 1 and becomes \`max(M, taken)\`. Return the number of stones Alice can force.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * piles[0] piles[1] ... piles[n-1]
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 5
 * 2 7 9 4 4
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 10
 * </pre>
 *
 * <p>Approach: Track the best score of the player whose turn it is; after a move the opponent plays the same sub-game, so the score is "remaining stones minus the opponent's best".
 *
 * <p>Complexity: Time O(n^3), Space O(n^2).
 */
public class Main {

    /**
     * Returns the number of stones Alice can guarantee when both players play optimally.
     *
     * <p>On every turn the current player may take between {@code 1} and {@code 2 * M} piles from the
     * front; afterwards {@code M} becomes {@code max(M, taken)} for the opponent. Because the total
     * number of stones is fixed, maximising my score is the same as minimising the opponent's, so
     * {@code dp[i][m]} = "the best score of the player to move" and the recurrence is a subtraction.
     *
     * @param piles the stones in each pile
     * @return the number of stones Alice gets when she moves first
     */
    public static int stoneGameII(int[] piles) {
        int n = piles.length;
        int[] suffix = new int[n + 1];
        for (int i = n - 1; i >= 0; i--) {
            suffix[i] = suffix[i + 1] + piles[i];
        }

        int[][] dp = new int[n][n + 1];
        for (int i = n - 1; i >= 0; i--) {
            for (int m = 1; m <= n; m++) {
                if (2 * m >= n - i) {
                    dp[i][m] = suffix[i]; // take every remaining pile
                    continue;
                }
                int best = 0;
                for (int taken = 1; taken <= 2 * m; taken++) {
                    int score = suffix[i] - dp[i + taken][Math.max(m, taken)];
                    best = Math.max(best, score);
                }
                dp[i][m] = best;
            }
        }
        return dp[0][1];
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] piles = fs.nextIntArray(n);

        System.out.println(stoneGameII(piles));
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
`,r='\n# Stone Game II — LeetCode 1140\n\n| | |\n|---|---|\n| **Difficulty** | Medium |\n| **Pattern** | Game DP · Bottom-up DP |\n| **Interview heat** | ★★★☆☆ |\n| **Asked at** | Amazon, Google, Meta, Uber |\n\n## Problem Statement\n\nAlice and Bob play a game with a row of piles of stones. The rules:\n\n- The piles are taken from the **front** of the row.\n- A player may take any number of piles between `1` and `2M`.\n- After a player takes `X` piles, `M` becomes `max(M, X)` for the next player.\n- `M` starts at `1`.\n\nAlice moves first. Both play optimally. Return the **maximum number of stones Alice can get**.\n\n> Note: this is LeetCode **1140** (Stone Game II). LeetCode 877 is the simpler *Stone Game*, where the players take from either end and you only decide whether Alice wins.\n\n## Input Format\n\nThe program reads from standard input:\n\n```\nn\npiles[0] piles[1] ... piles[n-1]\n```\n\n- `n` — number of piles (1 ≤ n ≤ 100)\n- `piles` — n space-separated positive integers\n\n## Sample Input\n\n```\n5\n2 7 9 4 4\n```\n\n## Expected Output\n\n```\n10\n```\n\nAlice takes one pile (`2`), Bob then plays optimally on `[7, 9, 4, 4]` and takes 15 stones, so Alice ends with `26 − 16 = 10`. Taking two piles first would only give her 9.\n\n## Approach\n\nThis is a **zero-sum game**, and that is what makes the DP clean: the total number of stones is fixed, so "I get more" and "the opponent gets less" are the same thing.\n\n1. `suffix[i]` = the stones in piles `i … n-1` (prefix sums read backwards).\n2. `dp[i][m]` = the best score of the **player whose turn it is**, when the remaining piles are    `i … n-1` and the current `M` is `m`.\n3. Base case: if `2m ≥ n - i` the player takes everything → `dp[i][m] = suffix[i]`.\n4. Otherwise try every legal move `taken ∈ [1, 2m]`. After the move the opponent plays the    sub-game `(i + taken, max(m, taken))` and gets `dp[i + taken][max(m, taken)]` stones.    Everything else is mine:\n   `dp[i][m] = max over taken of ( suffix[i] − dp[i + taken][max(m, taken)] )`.\n5. Alice starts at `(0, 1)`, so the answer is `dp[0][1]`.\n\nThe same recurrence written with a memoised recursive function is the more common interview answer; the table version makes the state space visible.\n\n## Dry Run\n\nInput: `piles = [2, 7, 9, 4, 4]`, `suffix = [26, 24, 17, 8, 4, 0]`.\n\n**The table** (`dp[i][m]` = best score of the player to move):\n\n| | `m = 1` | `m = 2` | `m = 3` | `m = 4` |\n|---|---:|---:|---:|---:|\n| `i = 4` | 4 | 4 | 4 | 4 |\n| `i = 3` | 8 | 8 | 8 | 8 |\n| `i = 2` | 13 | 17 | 17 | 17 |\n| `i = 1` | 16 | 24 | 24 | 24 |\n| `i = 0` | **10** | 22 | 26 | 26 |\n\nThe answer is `dp[0][1] = 10`.\n\n**The two branches Alice has at the start** (`i = 0`, `m = 1`, so she may take 1 or 2 piles):\n\n| Alice takes | stones now | opponent plays | opponent gets | Alice gets |\n|---:|---:|---|---|---:|\n| 1 | 2 | `dp[1][1]` = 16 | 16 | `26 − 16` = **10** |\n| 2 | 9 | `dp[2][2]` = 17 | 17 | `26 − 17` = 9 |\n\nAlice takes **one** pile — taking more would give the opponent a bigger `M`.\n\n**How `dp[1][1] = 16` is built:** `suffix[1] = 24`, and Bob may take 1 or 2 piles:\n\n| Bob takes | opponent (Alice) plays | Alice gets from there | Bob gets |\n|---:|---|---:|---:|\n| 1 | `dp[2][1]` = 13 | 13 | `24 − 13` = 11 |\n| 2 | `dp[3][2]` = 8 | 8 | `24 − 8` = 16 |\n\nBob takes two piles, so Alice ends up with `26 − 16 = 10` stones.\n\n## Java Solution\n\nSee [`StoneGameII.java`](./StoneGameII.java).\n\n```java\n    public static int stoneGameII(int[] piles) {\n        int n = piles.length;\n        int[] suffix = new int[n + 1];\n        for (int i = n - 1; i >= 0; i--) {\n            suffix[i] = suffix[i + 1] + piles[i];\n        }\n\n        int[][] dp = new int[n][n + 1];\n        for (int i = n - 1; i >= 0; i--) {\n            for (int m = 1; m <= n; m++) {\n                if (2 * m >= n - i) {\n                    dp[i][m] = suffix[i];\n                    continue;\n                }\n                int best = 0;\n                for (int taken = 1; taken <= 2 * m; taken++) {\n                    int score = suffix[i] - dp[i + taken][Math.max(m, taken)];\n                    best = Math.max(best, score);\n                }\n                dp[i][m] = best;\n            }\n        }\n        return dp[0][1];\n    }\n```\n\n## Complexity\n\n| | Value | Why |\n|---|---|---|\n| **Time** | O(n³) | `n²` states, each trying up to `2n` moves |\n| **Space** | O(n²) | the `n × (n + 1)` table |\n\n**Space `O(n²)`.** A memoised recursion (`HashMap` or a 2-D array) gives the same bound; the suffix array adds `O(n)`.\n\n## Interview Notes\n\n**Follow-ups to raise yourself:**\n\n- "What is the difference to Stone Game (877)?"* → there the players take from **either end** and you only decide whether Alice wins (the answer is always `true` for an even number of piles).\n- "What if the players may take from either end?"* → the state needs two indices (`dp[l][r][m]`) instead of one.\n- "Why is the recurrence a subtraction?"* → the game is zero-sum: the stones I do not get are exactly the stones the opponent does.\n- "Can you play it as a minimax search?"* → yes, but the number of states is exponential without memoisation.\n\n**Common mistakes:**\n\n- ❌ Using `m` (the number just taken) instead of `max(m, taken)` for the next player.\n- ❌ Forgetting that `M` starts at `1`, not `2` — Alice may take one or two piles on the first turn.\n- ❌ Maximising `taken` directly instead of "remaining stones minus the opponent\'s best".\n- ❌ Using `prefix[i]` instead of `suffix[i]` in the subtraction.\n\n**How to narrate:**\n\n> "The game is zero-sum, so I only need to know the best score of the player whose turn it is. `dp[i][m]` is that score with the remaining piles starting at `i` and the current `M` equal to `m`. If `2m` covers all the remaining piles I take them all; otherwise I try every legal number of piles and subtract the opponent\'s answer for the resulting position, because everything that is not theirs is mine. The answer is `dp[0][1]` because Alice starts with `M = 1`."\n\n## Related Problems\n\n- [House Robber II — LeetCode 213](./HouseRobberII.java) — another "two cases" reduction\n- [Target Sum — LeetCode 494](./TargetSum.java) — counting DP\n',i=[`stoneGameII`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};