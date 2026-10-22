var e=`backtracking.CombinationSumII`,t=`package com.dsa.backtracking;

import com.dsa.utils.FastScanner;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * Problem: Combination Sum II
 * LeetCode: 40 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Backtracking, Duplicate pruning
 *
 * <p>Problem: Find every combination of candidates that sums to a target; each candidate may be used only once and the input may contain duplicates.
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
 * 7
 * 10 1 2 7 6 1 5
 * 8
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 1 1 6
 * 1 2 5
 * 1 7
 * 2 6
 * </pre>
 *
 * <p>Approach: Backtracking with two rules: recurse at \`i + 1\` (each candidate once) and skip equal candidates at the same level.
 *
 * <p>Complexity: Time O(n x 2^n), Space O(n).
 */
public class CombinationSumII {

    /**
     * Returns every combination of {@code candidates} that sums to {@code target}.
     *
     * <p>Each candidate may be used at most once. Because the input may contain duplicates, equal
     * candidates are skipped inside the same recursion level -- otherwise the same combination would be
     * produced several times.
     *
     * @param candidates the values to pick from
     * @param target     the wanted sum
     * @return every distinct combination, sorted lexicographically
     */
    public static List<List<Integer>> combinationSum2(int[] candidates, int target) {
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
            result.add(new ArrayList<>(path));
            return;
        }
        for (int i = start; i < candidates.length; i++) {
            if (i > start && candidates[i] == candidates[i - 1]) {
                continue; // the same value was already tried at this level
            }
            if (candidates[i] > remaining) {
                break; // sorted input: no later candidate can fit either
            }
            path.add(candidates[i]);                                            // choose
            generate(candidates, remaining - candidates[i], i + 1, path, result); // used once
            path.remove(path.size() - 1);                                       // backtrack
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
        for (List<Integer> combination : combinationSum2(candidates, target)) {
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
 * Problem: Combination Sum II
 * LeetCode: 40 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Backtracking, Duplicate pruning
 *
 * <p>Problem: Find every combination of candidates that sums to a target; each candidate may be used only once and the input may contain duplicates.
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
 * 7
 * 10 1 2 7 6 1 5
 * 8
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 1 1 6
 * 1 2 5
 * 1 7
 * 2 6
 * </pre>
 *
 * <p>Approach: Backtracking with two rules: recurse at \`i + 1\` (each candidate once) and skip equal candidates at the same level.
 *
 * <p>Complexity: Time O(n x 2^n), Space O(n).
 */
public class Main {

    /**
     * Returns every combination of {@code candidates} that sums to {@code target}.
     *
     * <p>Each candidate may be used at most once. Because the input may contain duplicates, equal
     * candidates are skipped inside the same recursion level -- otherwise the same combination would be
     * produced several times.
     *
     * @param candidates the values to pick from
     * @param target     the wanted sum
     * @return every distinct combination, sorted lexicographically
     */
    public static List<List<Integer>> combinationSum2(int[] candidates, int target) {
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
            result.add(new ArrayList<>(path));
            return;
        }
        for (int i = start; i < candidates.length; i++) {
            if (i > start && candidates[i] == candidates[i - 1]) {
                continue; // the same value was already tried at this level
            }
            if (candidates[i] > remaining) {
                break; // sorted input: no later candidate can fit either
            }
            path.add(candidates[i]);                                            // choose
            generate(candidates, remaining - candidates[i], i + 1, path, result); // used once
            path.remove(path.size() - 1);                                       // backtrack
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
        for (List<Integer> combination : combinationSum2(candidates, target)) {
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
`,r='\n# Combination Sum II — LeetCode 40\n\n| | |\n|---|---|\n| **Difficulty** | Medium |\n| **Pattern** | Backtracking · Duplicate pruning |\n| **Interview heat** | ★★★★☆ |\n| **Asked at** | Amazon, Google, Meta |\n\n## Problem Statement\n\nGiven a list of positive integers `candidates` (which **may contain duplicates**) and a target `target`, return all possible combinations where the candidate numbers sum to `target`.\n\n- Each candidate may be used **at most once** in a combination.\n- The solution set must not contain duplicate combinations.\n\n## Input Format\n\nThe program reads from standard input:\n\n```\nn\ncandidates[0] candidates[1] ... candidates[n-1]\ntarget\n```\n\n- `n` — number of candidates (1 ≤ n ≤ 30)\n- `candidates` — n space-separated positive integers (may repeat)\n- `target` — the target sum (1 ≤ target ≤ 30)\n\n## Sample Input\n\n```\n7\n10 1 2 7 6 1 5\n8\n```\n\n## Expected Output\n\n```\n1 1 6\n1 2 5\n1 7\n2 6\n```\n\nThe four combinations are `1+1+6`, `1+2+5`, `1+7` and `2+6`. The two `1`s are two different candidates, so `1+1+6` is allowed.\n\n## Approach\n\nThe same backtracking skeleton as [Combination Sum](./CombinationSum.java) with two changes:\n\n1. **Recurse at `i + 1`** — the candidate that was just picked is used up.\n2. **Skip equal candidates inside one level** — `if (i > start && candidates[i] == candidates[i-1]) continue;`. The first occurrence of a value is always tried; the later ones are skipped. That way `[1, 1, 6]` is produced once and not twice.\n\n**Why the duplicate check uses `i > start`** (and not `i > 0`): the check must only skip duplicates *within the same level*. Two equal values at different levels are two different candidates, and `1 + 1 + 6` is a legal combination.\n\nSorting first is what makes the rule possible — equal values become neighbours.\n\n## Dry Run\n\nInput: `candidates = [10, 1, 2, 7, 6, 1, 5]`, `target = 8`. Sorted: `[1, 1, 2, 5, 6, 7, 10]`.\n\n| path | remaining | try | new path | result |\n|---|---:|---|---|---|\n| `[]` | 8 | 1 | `[1]` | — |\n| `[1]` | 7 | 1 (the second `1`) | `[1, 1]` | — |\n| `[1, 1]` | 6 | 2 | `[1, 1, 2]` | — (2 > 4 later, no completion) |\n| `[1, 1]` | 6 | 5 | `[1, 1, 5]` | — (no completion) |\n| `[1, 1]` | 6 | 6 | `[1, 1, 6]` | **`[1, 1, 6]`** |\n| `[1]` | 7 | 2 | `[1, 2]` | — |\n| `[1, 2]` | 5 | 5 | `[1, 2, 5]` | **`[1, 2, 5]`** |\n| `[1]` | 7 | 5 | `[1, 5]` | — |\n| `[1]` | 7 | 6 | `[1, 6]` | — |\n| `[1]` | 7 | 7 | `[1, 7]` | **`[1, 7]`** |\n| `[]` | 8 | 2 | `[2]` | — |\n| `[2]` | 6 | 5 | `[2, 5]` | — |\n| `[2]` | 6 | 6 | `[2, 6]` | **`[2, 6]`** |\n| `[]` | 8 | 5 | `[5]` | — |\n| `[]` | 8 | 6 | `[6]` | — |\n| `[]` | 8 | 7 | `[7]` | — |\n| `[]` | 8 | 10 | 10 > 8 → **break** | — |\n\n**The second `1` at the top level is skipped** — the rule `i > start && candidates[i] == candidates[i-1]` fires for `i = 1` at the root, so the branch that starts with the second `1` never runs. The `1` that *is* used inside `[1, 1, 6]` is at a deeper level, where the rule does not apply.\n\n**The four recorded combinations** — `[1, 1, 6]`, `[1, 2, 5]`, `[1, 7]`, `[2, 6]` — are already in the printed order.\n\n## Java Solution\n\nSee [`CombinationSumII.java`](./CombinationSumII.java).\n\n```java\n    public static List<List<Integer>> combinationSum2(int[] candidates, int target) {\n        int[] sorted = candidates.clone();\n        Arrays.sort(sorted);\n\n        List<List<Integer>> result = new ArrayList<>();\n        generate(sorted, target, 0, new ArrayList<>(), result);\n        result.sort((a, b) -> compareLists(a, b));\n        return result;\n    }\n```\n\n## Complexity\n\n| | Value | Why |\n|---|---|---|\n| **Time** | O(n · 2ⁿ) | at most `2ⁿ` subsets are explored, each in `O(n)` |\n| **Space** | O(n) | the recursion stack and the path hold at most `n` values |\n\n**Space `O(n)`** apart from the output. The duplicate pruning usually cuts the tree by a factor of the number of repeated values.\n\n## Interview Notes\n\n**Follow-ups to raise yourself:**\n\n- "What if a candidate may be used at most `k` times?"* → add a counter to the recursion state.\n- "How do I avoid the duplicates?"* → sort and skip equal values at the same level (the rule above).\n- "What is the difference to Combination Sum?"* → there the recursion continues at the same index (repetition allowed), here at `i + 1`.\n- "Can you count the combinations instead of listing them?"* → a DP over the remaining sums.\n\n**Common mistakes:**\n\n- ❌ Skipping duplicates with `i > 0` instead of `i > start` — that removes the legal combination `[1, 1, 6]`.\n- ❌ Recursing at `i` instead of `i + 1` — that would use a candidate twice.\n- ❌ Not sorting the candidates first — the duplicate rule only works on neighbours.\n\n**How to narrate:**\n\n> "This is Combination Sum with two changes: I recurse at `i + 1` because a candidate may be used only once, and I sort the input so that equal values are neighbours. Inside one recursion level I skip a candidate when it equals the previous one — the check is `i > start`, not `i > 0`, so two equal values at different levels can still both be used."\n\n## Related Problems\n\n- [Combination Sum — LeetCode 39](./CombinationSum.java) — repetition allowed\n- [Subsets — LeetCode 78](./Subsets.java) — the same duplicate-pruning rule\n',i=[`combinationSum2`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};