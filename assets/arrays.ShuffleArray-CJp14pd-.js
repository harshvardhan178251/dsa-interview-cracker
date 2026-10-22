var e=`arrays.ShuffleArray`,t=`package com.dsa.arrays;

import com.dsa.utils.FastScanner;

import java.util.Random;

/**
 * Problem: Shuffle Array
 * LeetCode: 384 | Difficulty: Medium | Frequency: 3/5
 * Pattern: Fisher-Yates, Uniform random permutation
 *
 * <p>Problem:
 * Given an integer array {@code nums}, return the array shuffled with a uniform random
 * permutation. The Fisher-Yates (Durstenfeld) algorithm performs the shuffle in a single
 * pass by repeatedly picking a random index from the not-yet-shuffled suffix and swapping
 * it with the current position.
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
 * 4
 * 1 2 3 4
 * 3
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 3 2 4 1
 * </pre>
 *
 * <p>Approach: the generator is seeded with a fixed constant so that the program output is
 * reproducible — the repository requires deterministic output for the judge. The
 * algorithm itself is the standard unbiased Fisher-Yates shuffle: pick
 * {@code j} uniformly from {@code [i, n-1]} and swap {@code nums[i]} with {@code nums[j]}.
 *
 * <p>Complexity: Time O(n) (O(k) swaps), Space O(n) for the copy.
 */
public class ShuffleArray {

    /** Fixed seed keeps the shuffle reproducible for the judge. */
    private static final long SEED = 42L;

    /**
     * Shuffles the array with a Fisher-Yates pass of {@code k} swaps.
     *
     * @param nums the input array (not modified)
     * @param k    how many random swaps to perform
     * @return the shuffled array
     */
    public static int[] shuffle(int[] nums, int k) {
        int[] shuffled = nums.clone();
        Random random = new Random(SEED);
        for (int i = 0; i < k && i < shuffled.length; i++) {
            int j = i + random.nextInt(shuffled.length - i);
            int temp = shuffled[i];
            shuffled[i] = shuffled[j];
            shuffled[j] = temp;
        }
        return shuffled;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] nums = fs.nextIntArray(n);
        int k = fs.nextInt();

        int[] shuffled = shuffle(nums, k);
        StringBuilder out = new StringBuilder();
        for (int i = 0; i < shuffled.length; i++) {
            if (i > 0) {
                out.append(' ');
            }
            out.append(shuffled[i]);
        }
        System.out.println(out);
    }
}
`,n=`import java.util.Random;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

/**
 * Problem: Shuffle Array
 * LeetCode: 384 | Difficulty: Medium | Frequency: 3/5
 * Pattern: Fisher-Yates, Uniform random permutation
 *
 * <p>Problem:
 * Given an integer array {@code nums}, return the array shuffled with a uniform random
 * permutation. The Fisher-Yates (Durstenfeld) algorithm performs the shuffle in a single
 * pass by repeatedly picking a random index from the not-yet-shuffled suffix and swapping
 * it with the current position.
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
 * 4
 * 1 2 3 4
 * 3
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 3 2 4 1
 * </pre>
 *
 * <p>Approach: the generator is seeded with a fixed constant so that the program output is
 * reproducible — the repository requires deterministic output for the judge. The
 * algorithm itself is the standard unbiased Fisher-Yates shuffle: pick
 * {@code j} uniformly from {@code [i, n-1]} and swap {@code nums[i]} with {@code nums[j]}.
 *
 * <p>Complexity: Time O(n) (O(k) swaps), Space O(n) for the copy.
 */
public class Main {

    /** Fixed seed keeps the shuffle reproducible for the judge. */
    private static final long SEED = 42L;

    /**
     * Shuffles the array with a Fisher-Yates pass of {@code k} swaps.
     *
     * @param nums the input array (not modified)
     * @param k    how many random swaps to perform
     * @return the shuffled array
     */
    public static int[] shuffle(int[] nums, int k) {
        int[] shuffled = nums.clone();
        Random random = new Random(SEED);
        for (int i = 0; i < k && i < shuffled.length; i++) {
            int j = i + random.nextInt(shuffled.length - i);
            int temp = shuffled[i];
            shuffled[i] = shuffled[j];
            shuffled[j] = temp;
        }
        return shuffled;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] nums = fs.nextIntArray(n);
        int k = fs.nextInt();

        int[] shuffled = shuffle(nums, k);
        StringBuilder out = new StringBuilder();
        for (int i = 0; i < shuffled.length; i++) {
            if (i > 0) {
                out.append(' ');
            }
            out.append(shuffled[i]);
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
`,r=`
# Shuffle Array — LeetCode 384

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Fisher-Yates · Uniform random permutation |
| **Interview heat** | ★★★☆☆ |
| **Asked at** | Amazon, Google, Meta, Uber, Microsoft |

## Problem Statement

Given an integer array \`nums\`, return the array **shuffled** — every permutation of the
input should be equally likely.

The classic solution is the **Fisher-Yates (Durstenfeld) shuffle**: repeatedly pick a
random index from the *not yet shuffled* suffix and swap it with the current position.

The program here performs \`k\` random swaps, starting from the front of the array.

> The random generator is seeded with a fixed constant so that the printed result is
> **reproducible** — the judge in this repository compares stdout byte for byte.

## Input Format

\`\`\`
n
nums[0] nums[1] ... nums[n-1]
k
\`\`\`

- \`n\` — length of the array (1 ≤ n ≤ 10⁵)
- \`nums\` — n space-separated integers
- \`k\` — how many random swaps to perform (k ≤ n)

## Sample Input

\`\`\`
4
1 2 3 4
3
\`\`\`

## Expected Output

\`\`\`
3 2 4 1
\`\`\`

With the fixed seed (42) the generator produces the index sequence \`2, 1, 3\` for the
three swaps, which is what the dry run below shows.

## Approach — Fisher-Yates (one pass, O(n))

For \`i\` from \`0\` to \`n-2\`:

1. Pick \`j\` **uniformly at random** from the range \`[i, n-1]\` (the un-shuffled suffix).
2. Swap \`nums[i]\` and \`nums[j]\`.

**Why the suffix and not the whole array?** Picking \`j\` from the whole array would let
already-placed elements be re-selected, which biases the permutation. Restricting \`j\`
to \`[i, n-1]\` is what makes every permutation equally likely.

**Why is it uniform?** Each of the \`n!\` permutations corresponds to exactly one sequence
of choices, and each choice is equally likely, so each permutation has probability
\`1/n!\`.

## Dry Run

Input: \`nums = [1, 2, 3, 4]\`, \`k = 3\`, \`n = 4\`. The generator is seeded with 42, so the
draws are \`nextInt(4) = 2\`, \`nextInt(3) = 0\`, \`nextInt(2) = 1\`.

| Step | i | draw | \`j = i + draw\` | array before | swap | array after |
|---:|---:|---:|---:|---|---|---|
| 1 | 0 | 2 | 2 | \`[1, 2, 3, 4]\` | swap(0, 2) | \`[3, 2, 1, 4]\` |
| 2 | 1 | 0 | 1 | \`[3, 2, 1, 4]\` | swap(1, 1) (self-swap) | \`[3, 2, 1, 4]\` |
| 3 | 2 | 1 | 3 | \`[3, 2, 1, 4]\` | swap(2, 3) | \`[3, 2, 4, 1]\` |

Answer: **3 2 4 1**

## Java Solution

See [\`ShuffleArray.java\`](./ShuffleArray.java).

\`\`\`java
public static int[] shuffle(int[] nums, int k) {
    int[] shuffled = nums.clone();
    Random random = new Random(SEED);          // fixed seed keeps the output reproducible
    for (int i = 0; i < k && i < shuffled.length; i++) {
        int j = i + random.nextInt(shuffled.length - i);
        int temp = shuffled[i];
        shuffled[i] = shuffled[j];
        shuffled[j] = temp;
    }
    return shuffled;
}
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n + k) | Cloning is O(n); each swap is O(1) |
| **Space** | O(n) | The shuffled copy; O(1) extra if you shuffle in place |

## Interview Notes

**Follow-ups to raise yourself:**
- *"How do you make it uniform?"* → pick \`j\` uniformly from the **unprocessed suffix**
  \`[i, n-1]\`; picking from the whole array is the classic bias bug.
- *"How do you do it in place?"* → don't clone; swap directly in \`nums\`.
- *"How do you undo a shuffle?"* → record every \`(i, j)\` pair and replay the swaps in
  reverse.
- *"Why not \`Collections.shuffle\`?"* → it uses its own seed control and may not be
  available; the algorithm is the point of the question.
- *"How do you pick a uniform integer in \`[0, m)\`?"* → \`random.nextInt(m)\` — note that
  \`nextInt(m) % m\` is **not** uniform when \`m\` does not divide \`2⁴⁸\`.

**Common mistakes:**
- ❌ Choosing \`j\` from \`[0, n-1]\` instead of \`[i, n-1]\` — the permutation is biased.
- ❌ Using \`nextInt(n) % m\` for the range — modulo bias.
- ❌ Forgetting the \`i +\` offset: \`nextInt(n - i)\` returns a value in \`[0, n-i)\`, so the
  absolute index is \`i + that\`.
- ❌ Using \`Math.random()\` in a program whose output must be reproducible — use a seeded
  \`java.util.Random\`.

**How to narrate:**
> "This is the Fisher-Yates shuffle. For position i I pick a random index j uniformly
> from the suffix [i, n-1] and swap. Restricting j to the suffix is what makes every
> permutation equally likely — picking from the whole array would bias the result. I
> use a seeded Random so the output is reproducible for the judge, and I clone the
> input so the caller's array is untouched."

## Related Problems

- [Rotate Array](RotateArray.md) — deterministic permutation by rotation
- [Shuffle the Array](../../../../../../docs/topics/12-prefixsum.md) — interleaving two halves
- [Contains Duplicate II](ContainsDuplicateII.md) — hash-map index bookkeeping
`,i=[`shuffle`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};