var e=`backtracking.CombinationSum`,t=`package com.dsa.backtracking;

import com.dsa.utils.FastScanner;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * Problem: Combination Sum
 * LeetCode: 39 | Difficulty: Medium | Frequency: 5/5
 * Pattern: Backtracking, DFS with a path
 *
 * <p>Problem: Find every combination of candidates that sums to a target; the same candidate may be used an unlimited number of times.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * candidates[0] candidates[1] ... candidates[n-1]
 * target
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 4
 * 2 3 6 7
 * 7
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 2 2 3
 * 7
 * </pre>
 *
 * <p>Approach: Pick a candidate, subtract it from the remaining target and recurse -- from the **same** index, because a candidate may be reused.
 *
 * <p>Complexity: Time O(n^(target / min)), Space O(target / min).
 */
public class CombinationSum {

    /**
     * Returns every combination of {@code candidates} that sums to {@code target}.
     *
     * <p>A candidate may be used any number of times, so the recursion continues at the same index.
     * The candidates are sorted, which lets the loop stop as soon as a candidate is too large.
     *
     * @param candidates the values to pick from
     * @param target     the wanted sum
     * @return every combination, sorted lexicographically
     */
    public static List<List<Integer>> combinationSum(int[] candidates, int target) {
        int[] sorted = candidates.clone();
        Arrays.sort(sorted);

        List<List<Integer>> result = new ArrayList<>();
        generate(sorted, target, 0, new ArrayList<>(), result);
        result.sort((a, b) -> compareLists(a, b));
        return result;
    }

    /**
     * Depth-first search over the candidates.
     *
     * @param candidates the sorted candidates
     * @param remaining  the sum that is still missing
     * @param start      the first candidate that may still be picked
     * @param path       the combination built so far
     * @param result     the collected combinations
     */
    private static void generate(int[] candidates, int remaining, int start,
                                 List<Integer> path, List<List<Integer>> result) {
        if (remaining == 0) {
            result.add(new ArrayList<>(path)); // the target is reached
            return;
        }
        for (int i = start; i < candidates.length; i++) {
            if (candidates[i] > remaining) {
                break; // sorted input: no later candidate can fit either
            }
            path.add(candidates[i]);                                        // choose
            generate(candidates, remaining - candidates[i], i, path, result); // reuse allowed
            path.remove(path.size() - 1);                                   // backtrack
        }
    }
    /**
     * Compares two lists element by element (lexicographic order).
     *
     * @param a the first list
     * @param b the second list
     * @param <T> the element type
     * @return a negative number, zero, or a positive number
     */
    private static <T extends Comparable<? super T>> int compareLists(List<T> a, List<T> b) {
        int limit = Math.min(a.size(), b.size());
        for (int i = 0; i < limit; i++) {
            int diff = a.get(i).compareTo(b.get(i));
            if (diff != 0) {
                return diff;
            }
        }
        return Integer.compare(a.size(), b.size());
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] candidates = fs.nextIntArray(n);
        int target = fs.nextInt();

        StringBuilder out = new StringBuilder();
        for (List<Integer> combination : combinationSum(candidates, target)) {
            for (int i = 0; i < combination.size(); i++) {
                if (i > 0) {
                    out.append(' ');
                }
                out.append(combination.get(i));
            }
            out.append('\\n');
        }
        System.out.print(out);
    }
}
`,n=`import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

/**
 * Problem: Combination Sum
 * LeetCode: 39 | Difficulty: Medium | Frequency: 5/5
 * Pattern: Backtracking, DFS with a path
 *
 * <p>Problem: Find every combination of candidates that sums to a target; the same candidate may be used an unlimited number of times.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * candidates[0] candidates[1] ... candidates[n-1]
 * target
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 4
 * 2 3 6 7
 * 7
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 2 2 3
 * 7
 * </pre>
 *
 * <p>Approach: Pick a candidate, subtract it from the remaining target and recurse -- from the **same** index, because a candidate may be reused.
 *
 * <p>Complexity: Time O(n^(target / min)), Space O(target / min).
 */
public class Main {

    /**
     * Returns every combination of {@code candidates} that sums to {@code target}.
     *
     * <p>A candidate may be used any number of times, so the recursion continues at the same index.
     * The candidates are sorted, which lets the loop stop as soon as a candidate is too large.
     *
     * @param candidates the values to pick from
     * @param target     the wanted sum
     * @return every combination, sorted lexicographically
     */
    public static List<List<Integer>> combinationSum(int[] candidates, int target) {
        int[] sorted = candidates.clone();
        Arrays.sort(sorted);

        List<List<Integer>> result = new ArrayList<>();
        generate(sorted, target, 0, new ArrayList<>(), result);
        result.sort((a, b) -> compareLists(a, b));
        return result;
    }

    /**
     * Depth-first search over the candidates.
     *
     * @param candidates the sorted candidates
     * @param remaining  the sum that is still missing
     * @param start      the first candidate that may still be picked
     * @param path       the combination built so far
     * @param result     the collected combinations
     */
    private static void generate(int[] candidates, int remaining, int start,
                                 List<Integer> path, List<List<Integer>> result) {
        if (remaining == 0) {
            result.add(new ArrayList<>(path)); // the target is reached
            return;
        }
        for (int i = start; i < candidates.length; i++) {
            if (candidates[i] > remaining) {
                break; // sorted input: no later candidate can fit either
            }
            path.add(candidates[i]);                                        // choose
            generate(candidates, remaining - candidates[i], i, path, result); // reuse allowed
            path.remove(path.size() - 1);                                   // backtrack
        }
    }
    /**
     * Compares two lists element by element (lexicographic order).
     *
     * @param a the first list
     * @param b the second list
     * @param <T> the element type
     * @return a negative number, zero, or a positive number
     */
    private static <T extends Comparable<? super T>> int compareLists(List<T> a, List<T> b) {
        int limit = Math.min(a.size(), b.size());
        for (int i = 0; i < limit; i++) {
            int diff = a.get(i).compareTo(b.get(i));
            if (diff != 0) {
                return diff;
            }
        }
        return Integer.compare(a.size(), b.size());
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] candidates = fs.nextIntArray(n);
        int target = fs.nextInt();

        StringBuilder out = new StringBuilder();
        for (List<Integer> combination : combinationSum(candidates, target)) {
            for (int i = 0; i < combination.size(); i++) {
                if (i > 0) {
                    out.append(' ');
                }
                out.append(combination.get(i));
            }
            out.append('\\n');
        }
        System.out.print(out);
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
# Combination Sum — LeetCode 39

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Backtracking · DFS with a path |
| **Interview heat** | ★★★★★ |
| **Asked at** | Amazon, Google, Meta, Uber |

## Problem Statement

Given an array of **distinct** positive integers \`candidates\` and a target \`target\`, return all possible combinations where the candidate numbers sum to \`target\`.

- The **same candidate may be chosen an unlimited number of times**.
- The order of the candidates does not matter.

## Input Format

The program reads from standard input:

\`\`\`
n
candidates[0] candidates[1] ... candidates[n-1]
target
\`\`\`

- \`n\` — number of candidates (1 ≤ n ≤ 30)
- \`candidates\` — n space-separated distinct positive integers
- \`target\` — the target sum (1 ≤ target ≤ 1000)

## Sample Input

\`\`\`
4
2 3 6 7
7
\`\`\`

## Expected Output

\`\`\`
2 2 3
7
\`\`\`

The two combinations are \`2 + 2 + 3\` and \`7\`. The candidates inside a combination are ascending and the combinations themselves are sorted.

## Approach

The backtracking skeleton of [Subsets](./Subsets.java) with a target and a "remaining sum" instead of a length:

1. If \`remaining == 0\` the current path is a solution — record it.
2. Otherwise try every candidate from \`start\` onwards that is not larger than \`remaining\`.
3. Pick it, subtract its value and recurse **with the same \`start\` index** — that is what allows    a candidate to be used again.
4. Backtrack: remove the candidate again.

**Two optimisations.**

- Sorting the candidates lets the loop \`break\` as soon as a candidate is too large — no later   candidate can fit either.
- Keeping the candidates in ascending order means every combination is generated exactly once   (no duplicates), and the printed result is already sorted inside each combination.

## Dry Run

Input: \`candidates = [2, 3, 6, 7]\`, \`target = 7\`.

| path | remaining | try | new path | new remaining | result |
|---|---:|---|---|---:|---|
| \`[]\` | 7 | 2 | \`[2]\` | 5 | — |
| \`[2]\` | 5 | 2 | \`[2, 2]\` | 3 | — |
| \`[2, 2]\` | 3 | 2 | \`[2, 2, 2]\` | 1 | — |
| \`[2, 2, 2]\` | 1 | 2 > 1 → **break** | — | — | — |
| \`[2, 2]\` | 3 | 3 | \`[2, 2, 3]\` | 0 | **\`[2, 2, 3]\`** |
| \`[2, 2]\` | 3 | 6 > 3 → **break** | — | — | — |
| \`[2]\` | 5 | 3 | \`[2, 3]\` | 2 | — |
| \`[2, 3]\` | 2 | 3 > 2 → **break** | — | — | — |
| \`[2]\` | 5 | 6 > 5 → **break** | — | — | — |
| \`[]\` | 7 | 3 | \`[3]\` | 4 | — |
| \`[3]\` | 4 | 3 | \`[3, 3]\` | 1 | — |
| \`[3, 3]\` | 1 | 3 > 1 → **break** | — | — | — |
| \`[3]\` | 4 | 6 > 4 → **break** | — | — | — |
| \`[]\` | 7 | 6 | \`[6]\` | 1 | — |
| \`[6]\` | 1 | 6 > 1 → **break** | — | — | — |
| \`[]\` | 7 | 7 | \`[7]\` | 0 | **\`[7]\`** |

**Why \`[2, 3, 2]\` never appears.** The recursion always continues at the index of the element it just picked, so the candidates inside a combination are non-decreasing — \`2, 3, 2\` would need the index to go backwards.

**The two recorded combinations** are \`[2, 2, 3]\` and \`[7]\`; sorted lexicographically they are printed in exactly that order.

## Java Solution

See [\`CombinationSum.java\`](./CombinationSum.java).

\`\`\`java
    public static List<List<Integer>> combinationSum(int[] candidates, int target) {
        int[] sorted = candidates.clone();
        Arrays.sort(sorted);

        List<List<Integer>> result = new ArrayList<>();
        generate(sorted, target, 0, new ArrayList<>(), result);
        result.sort((a, b) -> compareLists(a, b));
        return result;
    }
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n^(target / min)) | the recursion tree has \`O(n^(target / min))\` nodes in the worst case |
| **Space** | O(target / min) | the path holds at most \`target / min\` candidates |

**Space \`O(target / min)\`** for the recursion, plus the output. The pruning (\`break\` as soon as a candidate is too large) is what keeps the tree small in practice.

## Interview Notes

**Follow-ups to raise yourself:**

- "What if every candidate may be used only once?"* → recurse with \`i + 1\` instead of \`i\` — that is [Combination Sum II](./CombinationSumII.java).
- "What if the input contains duplicates?"* → sort and skip equal candidates at the same level.
- "How many combinations are there?"* → a counting DP over the remaining sums is \`O(n · target)\`.
- "Can you return the combinations in a different order?"* → yes, the order of the result list is not part of the contract; the printing sorts them for a stable output.

**Common mistakes:**

- ❌ Recursing with \`i + 1\` — that forbids reusing a candidate and silently loses solutions.
- ❌ Not checking \`remaining == 0\` before adding to the path — you would record paths that still miss the target.
- ❌ Forgetting the backtrack, so the next sibling branch starts with a polluted path.

**How to narrate:**

> "I keep the remaining sum instead of a count. At every step I try a candidate that is not larger than the remaining sum, subtract it and recurse **at the same index** — that is what lets a candidate be used again. Because the candidates are sorted I can break out of the loop as soon as one is too large, and the candidates inside every combination come out ascending, so no combination is generated twice."

## Related Problems

- [Combination Sum II — LeetCode 40](./CombinationSumII.java) — no repetition, duplicates allowed
- [Subsets — LeetCode 78](./Subsets.java) — the same skeleton without a target
`,i=[`combinationSum`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};