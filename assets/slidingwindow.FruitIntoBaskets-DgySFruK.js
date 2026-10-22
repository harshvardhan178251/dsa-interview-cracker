var e=`slidingwindow.FruitIntoBaskets`,t=`package com.dsa.slidingwindow;

import com.dsa.utils.FastScanner;

import java.util.HashMap;
import java.util.Map;

/**
 * Problem: Fruit Into Baskets
 * LeetCode: 904 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Sliding window, Frequency counting
 *
 * <p>Problem:
 * You have two baskets and each can hold a single fruit type. Given an array
 * {@code fruits} where {@code fruits[i]} is the type of the i-th fruit, return the largest
 * number of fruits you can pick with the two baskets, picking them in order and never
 * picking a fruit type that has already been picked.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * fruits[0] fruits[1] ... fruits[n-1]
 * k
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 5
 * 1 2 3 2 2
 * 2
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 4
 * </pre>
 *
 * <p>Approach: the problem is "longest subarray with at most {@code k} distinct values".
 * Slide a window, keep a map of the value frequencies, and shrink the window from the left
 * whenever the window holds more than {@code k} distinct values.
 *
 * <p>Complexity: Time O(n), Space O(k).
 */
public class FruitIntoBaskets {

    /**
     * Returns the largest number of fruits that can be collected with {@code k} baskets.
     *
     * @param fruits the fruit types, in picking order
     * @param k     the number of baskets (distinct types allowed)
     * @return the maximum number of fruits
     */
    public static int maxFruitBaskets(int[] fruits, int k) {
        Map<Integer, Integer> count = new HashMap<>();
        int left = 0;
        int best = 0;
        for (int right = 0; right < fruits.length; right++) {
            count.merge(fruits[right], 1, Integer::sum);
            while (count.size() > k) {
                int outgoing = fruits[left];
                int remaining = count.merge(outgoing, -1, Integer::sum);
                if (remaining == 0) {
                    count.remove(outgoing);
                }
                left++;
            }
            best = Math.max(best, right - left + 1);
        }
        return best;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] fruits = fs.nextIntArray(n);
        int k = fs.nextInt();

        System.out.println(maxFruitBaskets(fruits, k));
    }
}
`,n=`import java.util.HashMap;
import java.util.Map;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

/**
 * Problem: Fruit Into Baskets
 * LeetCode: 904 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Sliding window, Frequency counting
 *
 * <p>Problem:
 * You have two baskets and each can hold a single fruit type. Given an array
 * {@code fruits} where {@code fruits[i]} is the type of the i-th fruit, return the largest
 * number of fruits you can pick with the two baskets, picking them in order and never
 * picking a fruit type that has already been picked.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * fruits[0] fruits[1] ... fruits[n-1]
 * k
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 5
 * 1 2 3 2 2
 * 2
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 4
 * </pre>
 *
 * <p>Approach: the problem is "longest subarray with at most {@code k} distinct values".
 * Slide a window, keep a map of the value frequencies, and shrink the window from the left
 * whenever the window holds more than {@code k} distinct values.
 *
 * <p>Complexity: Time O(n), Space O(k).
 */
public class Main {

    /**
     * Returns the largest number of fruits that can be collected with {@code k} baskets.
     *
     * @param fruits the fruit types, in picking order
     * @param k     the number of baskets (distinct types allowed)
     * @return the maximum number of fruits
     */
    public static int maxFruitBaskets(int[] fruits, int k) {
        Map<Integer, Integer> count = new HashMap<>();
        int left = 0;
        int best = 0;
        for (int right = 0; right < fruits.length; right++) {
            count.merge(fruits[right], 1, Integer::sum);
            while (count.size() > k) {
                int outgoing = fruits[left];
                int remaining = count.merge(outgoing, -1, Integer::sum);
                if (remaining == 0) {
                    count.remove(outgoing);
                }
                left++;
            }
            best = Math.max(best, right - left + 1);
        }
        return best;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] fruits = fs.nextIntArray(n);
        int k = fs.nextInt();

        System.out.println(maxFruitBaskets(fruits, k));
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
# Fruit Into Baskets — LeetCode 904

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Sliding window · Frequency counting · Hashing |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Uber, Adobe |

## Problem Statement

You have two baskets and each can hold a **single fruit type**. Given an array \`fruits\`
where \`fruits[i]\` is the type of the i-th fruit, return the largest number of fruits you
can pick — picking them in order, and never picking a fruit type that has already been
picked.

- This is exactly "longest subarray with at most \`k\` distinct values".
- \`[1,2,3,2,2]\`, two baskets → \`4\` (the subarray \`[2,3,2,2]\`).

## Input Format

The program reads from standard input:

\`\`\`
n
fruits[0] fruits[1] ... fruits[n-1]
k
\`\`\`

- \`n\` — number of fruits (1 ≤ n ≤ 10⁵)
- \`fruits\` — n space-separated integers, the fruit types, in picking order
- \`k\` — the number of baskets (1 ≤ k ≤ n)

## Sample Input

\`\`\`
5
1 2 3 2 2
2
\`\`\`

## Expected Output

\`\`\`
4
\`\`\`

The subarray \`[2, 3, 2, 2]\` contains only two distinct fruit types, so all four fruits fit
into the two baskets.

## Approach — Sliding window over the distinct-value count

Keep a map of the fruit frequencies inside the window \`[left, right]\`.

- Add \`fruits[right]\` to the map.
- While the map holds **more than \`k\` distinct types**, remove \`fruits[left]\` and advance
  \`left\` (deleting the map entry when its count drops to zero).
- The window is now the longest valid one ending at \`right\`; update the answer.

**Why removing from the left is safe.** If the window has \`k + 1\` distinct types, the type
that appears only once at the far left cannot be kept together with all the others — any
window ending at \`right\` and starting at or before that fruit is invalid. So the left edge
*must* move past it.

## Dry Run

Input: \`fruits = [1, 2, 3, 2, 2]\`, \`k = 2\`

| Step | right | fruit | \`window\` (distinct → count) | distinct | \`left\` | valid? | window length | best |
|---:|---:|---:|---|---:|---:|---|---:|---:|
| 1 | 0 | 1 | \`{1:1}\` | 1 | 0 | yes | 1 | 1 |
| 2 | 1 | 2 | \`{1:1, 2:1}\` | 2 | 0 | yes | 2 | 2 |
| 3 | 2 | 3 | \`{1:1, 2:1, 3:1}\` | 3 | 0 | **no** → shrink | — | 2 |
| 3a | 2 | — | remove \`1\` → \`{2:1, 3:1}\` | 2 | 1 | yes | 2 | 2 |
| 4 | 3 | 2 | \`{2:2, 3:1}\` | 2 | 1 | yes | 3 | 3 |
| 5 | 4 | 2 | \`{2:3, 3:1}\` | 2 | 1 | yes | **4** | **4** |

The final window is \`fruits[1..4] = [2, 3, 2, 2]\` — two distinct types, four fruits.

### The window contents at each step

| right | window | contents | distinct | length |
|---:|---|---|---:|---:|
| 0 | \`[1]\` | \`1\` | 1 | 1 |
| 1 | \`[1, 2]\` | \`1, 2\` | 2 | 2 |
| 2 | \`[2, 3]\` | \`2, 3\` | 2 | 2 |
| 3 | \`[2, 3, 2]\` | \`2, 3, 2\` | 2 | 3 |
| 4 | \`[2, 3, 2, 2]\` | \`2, 3, 2, 2\` | 2 | 4 |

## Java Solution

See [\`FruitIntoBaskets.java\`](./FruitIntoBaskets.java).

\`\`\`java
public static int maxFruitBaskets(int[] fruits, int k) {
    Map<Integer, Integer> count = new HashMap<>();
    int left = 0;
    int best = 0;
    for (int right = 0; right < fruits.length; right++) {
        count.merge(fruits[right], 1, Integer::sum);
        while (count.size() > k) {
            int outgoing = fruits[left];
            int remaining = count.merge(outgoing, -1, Integer::sum);
            if (remaining == 0) {
                count.remove(outgoing);
            }
            left++;
        }
        best = Math.max(best, right - left + 1);
    }
    return best;
}
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n) | Each fruit enters and leaves the window once |
| **Space** | O(k) | At most k + 1 map entries while shrinking |

## Interview Notes

**Follow-ups to raise yourself:**
- *"What if there are \`k\` baskets instead of two?"* → the same code with \`k\` baskets; the
  problem is literally "at most \`k\` distinct values".
- *"Return the actual fruits picked."* → record the best \`left\` and \`right\`.
- *"What if the fruit types are characters?"* → the same algorithm with a \`char[]\` counter.
- *"What if the array is a stream and you need the answer online?"* → the algorithm is
  already single-pass; the answer after each prefix is the best seen so far.

**Common mistakes:**
- ❌ Not deleting map entries whose count reaches zero → \`count.size()\` would over-report
  the number of distinct types and the window would shrink too much.
- ❌ Shrinking only once instead of in a loop → one removal may not be enough when several
  new types were added.
- ❌ Confusing "k baskets" with "k fruits" → the limit is on the number of *types*.
- ❌ Returning the number of distinct types instead of the number of fruits.

**How to narrate:**
> "This is the classic 'longest subarray with at most k distinct values' problem. I slide a
> window and keep a map of the fruit counts inside it. When the map holds more than k types
> I move the left edge forward, deleting entries as their counts reach zero. The window is
> then the longest valid one ending at the current right edge, so I track the maximum."

## Related Problems

- [Longest Subarray with At Most K Distinct](./LongestSubarrayWithAtMostKDistinct.java) — the generalised form
- [Longest Substring Without Repeating Characters](./LongestSubstringWithoutRepeatingCharacters.java) — the string version with k = 1
- [Permutation in String](./PermutationInString.java) — fixed-size windows over a string
`,i=[`maxFruitBaskets`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};