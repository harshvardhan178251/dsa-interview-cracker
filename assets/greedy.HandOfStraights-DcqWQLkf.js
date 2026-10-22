var e=`greedy.HandOfStraights`,t=`package com.dsa.greedy;

import com.dsa.utils.FastScanner;

import java.util.ArrayList;
import java.util.Map;
import java.util.TreeMap;

/**
 * Problem: Hand of Straights
 * LeetCode: 846 | Difficulty: Medium | Frequency: 3/5
 * Pattern: Greedy, Frequency counting
 *
 * <p>Problem:
 * You are given an integer array {@code cards} and an integer {@code k}. Each card
 * carries a value. Decide whether the cards can be split into groups of exactly
 * {@code k} cards such that every group holds {@code k} consecutive values
 * ({@code x, x+1, ..., x+k-1}).
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * cards[0] cards[1] ... cards[n-1]
 * k
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 7
 * 1 2 3 6 2 3 4
 * 3
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * true
 * </pre>
 *
 * <p>Approach: count how many cards carry each value. Walk the values in ascending
 * order. If value {@code v} still has {@code c} unused cards then every one of those
 * cards must open a group, and each of those groups also needs one card of every value
 * {@code v+1 .. v+k-1}. Take the {@code c} cards of each of those values or fail.
 *
 * <p>Complexity: Time O(n log n), Space O(n).
 */
public class HandOfStraights {

    /**
     * Returns whether the cards can be arranged into groups of {@code k} consecutive values.
     *
     * @param cards card values
     * @param k     size of every group
     * @return {@code true} when such a grouping exists
     */
    public static boolean isStraightHand(int[] cards, int k) {
        if (k <= 1) {
            return true;
        }
        if (cards == null || cards.length == 0) {
            return true;
        }
        if (cards.length % k != 0) {
            return false;
        }
        Map<Integer, Integer> count = new TreeMap<>();
        for (int card : cards) {
            count.merge(card, 1, Integer::sum);
        }
        for (Map.Entry<Integer, Integer> entry : new ArrayList<>(count.entrySet())) {
            int value = entry.getKey();
            int groups = entry.getValue();
            if (groups <= 0) {
                continue;
            }
            for (int offset = 1; offset < k; offset++) {
                Integer available = count.get(value + offset);
                if (available == null || available < groups) {
                    return false;
                }
                count.put(value + offset, available - groups);
            }
        }
        return true;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] cards = fs.nextIntArray(n);
        int k = fs.nextInt();

        System.out.println(isStraightHand(cards, k) ? "true" : "false");
    }
}
`,n=`import java.util.ArrayList;
import java.util.Map;
import java.util.TreeMap;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

/**
 * Problem: Hand of Straights
 * LeetCode: 846 | Difficulty: Medium | Frequency: 3/5
 * Pattern: Greedy, Frequency counting
 *
 * <p>Problem:
 * You are given an integer array {@code cards} and an integer {@code k}. Each card
 * carries a value. Decide whether the cards can be split into groups of exactly
 * {@code k} cards such that every group holds {@code k} consecutive values
 * ({@code x, x+1, ..., x+k-1}).
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * cards[0] cards[1] ... cards[n-1]
 * k
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 7
 * 1 2 3 6 2 3 4
 * 3
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * true
 * </pre>
 *
 * <p>Approach: count how many cards carry each value. Walk the values in ascending
 * order. If value {@code v} still has {@code c} unused cards then every one of those
 * cards must open a group, and each of those groups also needs one card of every value
 * {@code v+1 .. v+k-1}. Take the {@code c} cards of each of those values or fail.
 *
 * <p>Complexity: Time O(n log n), Space O(n).
 */
public class Main {

    /**
     * Returns whether the cards can be arranged into groups of {@code k} consecutive values.
     *
     * @param cards card values
     * @param k     size of every group
     * @return {@code true} when such a grouping exists
     */
    public static boolean isStraightHand(int[] cards, int k) {
        if (k <= 1) {
            return true;
        }
        if (cards == null || cards.length == 0) {
            return true;
        }
        if (cards.length % k != 0) {
            return false;
        }
        Map<Integer, Integer> count = new TreeMap<>();
        for (int card : cards) {
            count.merge(card, 1, Integer::sum);
        }
        for (Map.Entry<Integer, Integer> entry : new ArrayList<>(count.entrySet())) {
            int value = entry.getKey();
            int groups = entry.getValue();
            if (groups <= 0) {
                continue;
            }
            for (int offset = 1; offset < k; offset++) {
                Integer available = count.get(value + offset);
                if (available == null || available < groups) {
                    return false;
                }
                count.put(value + offset, available - groups);
            }
        }
        return true;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] cards = fs.nextIntArray(n);
        int k = fs.nextInt();

        System.out.println(isStraightHand(cards, k) ? "true" : "false");
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
# Hand of Straights — LeetCode 846

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Greedy · Frequency counting |
| **Interview heat** | ★★★☆☆ |
| **Asked at** | Amazon, Google, Meta, Uber |

## Problem Statement

A collection of cards carries one number each. Every card must be used exactly once,
the cards must be split into groups of **exactly \`k\`** cards, and the numbers inside a
group must be consecutive (\`x, x+1, …, x+k-1\`).

Decide whether such a grouping exists.

## Input Format

The program reads from standard input:

\`\`\`
n
cards[0] cards[1] ... cards[n-1]
k
\`\`\`

- \`n\` — number of cards (1 ≤ n ≤ 10⁵)
- \`cards\` — n space-separated card values
- \`k\` — size of every group (1 ≤ k ≤ n)

## Sample Input

\`\`\`
9
1 2 3 6 2 3 4 7 8
3
\`\`\`

## Expected Output

\`\`\`
true
\`\`\`

The groups are \`[1, 2, 3]\`, \`[2, 3, 4]\` and \`[6, 7, 8]\`.

## Approach — count, then peel off groups

Count how many cards carry each value. Then walk the values in **ascending** order:

- If value \`v\` still has \`c\` unused cards, then \`c\` groups must start at \`v\` — no
  smaller value is left to build them.
- Each of those groups also needs one card of \`v+1, v+2, …, v+k-1\`. Take one card of
  each; if any of them is missing or exhausted, the answer is \`false\`.

**Exchange argument (why the greedy choice is safe):** let \`v\` be the smallest value
that still has unused cards. In any valid grouping, the card with value \`v\` cannot be
placed in a group that contains a smaller value — there is none left — so it must be
the **first** card of its group, and its group is exactly \`v, v+1, …, v+k-1\`. If there
are \`c\` such cards, there must be \`c\` copies of every following value as well. The
greedy step therefore *forces* the grouping: there is no alternative arrangement of
the remaining cards that could work. If the forced step fails, no solution exists; if
it succeeds, the problem shrinks to the values above \`v+k-1\`.

## Dry Run

Input: \`cards = [1, 2, 3, 6, 2, 3, 4, 7, 8]\`, \`k = 3\`

Counts: \`{1: 1, 2: 2, 3: 2, 4: 1, 6: 1, 7: 1, 8: 1}\` (9 cards, \`9 % 3 == 0\` ✓)

| Step | value \`v\` | unused \`c\` | needed values | available before | take | available after | group formed |
|---:|---:|---:|---|---|---|---|---|
| 1 | 1 | 1 | 2, 3 | \`2: 2\`, \`3: 2\` | 1 each | \`2: 1\`, \`3: 1\` | \`[1, 2, 3]\` |
| 2 | 2 | 1 | 3, 4 | \`3: 1\`, \`4: 1\` | 1 each | \`3: 0\`, \`4: 0\` | \`[2, 3, 4]\` |
| 3 | 3 | 0 | — | — | — | \`3: 0\` | — (already used) |
| 4 | 4 | 0 | — | — | — | \`4: 0\` | — |
| 5 | 6 | 1 | 7, 8 | \`7: 1\`, \`8: 1\` | 1 each | \`7: 0\`, \`8: 0\` | \`[6, 7, 8]\` |
| 6 | 7 | 0 | — | — | — | \`7: 0\` | — |
| 7 | 8 | 0 | — | — | — | \`8: 0\` | — |

Every card was placed → **true**.

### Trace that fails — \`cards = [1, 2, 3, 4, 6, 7]\`, \`k = 3\`

\`6 % 3 == 0\`, so the divisibility check passes. Counts: \`{1:1, 2:1, 3:1, 4:1, 6:1, 7:1}\`

| Step | value \`v\` | unused \`c\` | needed values | available | result |
|---:|---:|---:|---|---|---|
| 1 | 1 | 1 | 2, 3 | \`2: 1\`, \`3: 1\` | take → \`[1, 2, 3]\` |
| 2 | 2 | 0 | — | — | already used |
| 3 | 3 | 0 | — | — | already used |
| 4 | 4 | 1 | 5, 6 | \`5\` **missing**, \`6: 1\` | **value 5 missing → false** |

The card \`4\` has to open a group (no smaller card is left), and that group needs a \`5\`
— which does not exist, so no grouping is possible.

## Java Solution

See [\`HandOfStraights.java\`](./HandOfStraights.java).

\`\`\`java
public static boolean isStraightHand(int[] cards, int k) {
    if (k <= 1) {
        return true;
    }
    if (cards.length % k != 0) {
        return false;
    }
    Map<Integer, Integer> count = new TreeMap<>();
    for (int card : cards) {
        count.merge(card, 1, Integer::sum);
    }
    for (Map.Entry<Integer, Integer> entry : new ArrayList<>(count.entrySet())) {
        int value = entry.getKey();
        int groups = entry.getValue();
        if (groups <= 0) {
            continue;
        }
        for (int offset = 1; offset < k; offset++) {
            Integer available = count.get(value + offset);
            if (available == null || available < groups) {
                return false;
            }
            count.put(value + offset, available - groups);
        }
    }
    return true;
}
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n log n) | the map keeps the values sorted; every card is consumed once |
| **Space** | O(n) | one counter per distinct value |

## Interview Notes

**Follow-ups to raise yourself:**
- *"What if the card values are limited to 1..13?"* → replace the map with an array of
  14 counters and the whole thing becomes O(n).
- *"What if groups may have **at most** \`k\` cards?"* → the divisibility check disappears
  and the algorithm still works (the leftovers simply form smaller groups).
- *"Return the groups themselves."* → keep the value that opened each group and print
  the \`k\` consecutive numbers.

**Common mistakes:**
- ❌ Forgetting the \`cards.length % k != 0\` early exit — it is not an optimisation, it
  is a correctness requirement when every card must be used.
- ❌ Iterating over the cards in arbitrary order — the values must be processed in
  ascending order, otherwise a group can steal a card that a smaller value needed.
- ❌ Mutating the map while iterating over it — copy the entries first (or iterate over
  the sorted keys).

**How to narrate:**
> "I count the cards per value, then walk the values from small to large. The smallest
> value that still has cards can only start a group, because there is nothing smaller
> left to put in front of it. So that many groups are forced, and each of them needs
> the next k-1 values. If those are not available the answer is no — and if they are,
> the choice was forced anyway, so the greedy step cannot be wrong."

## Related Problems

- [Coin Change with Greedy](./GreedyCoinChange.md) — greedy over a sorted value set
- [Partition Array Into Maximum Subarrays](./PartitionArrayToMaximumSum.md) — keeping the k best values
`,i=[`isStraightHand`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};