var e=`backtracking.PermutationsII`,t=`package com.dsa.backtracking;

import com.dsa.utils.FastScanner;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * Problem: Permutations II
 * LeetCode: 47 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Backtracking, Duplicate pruning
 *
 * <p>Problem: Return every distinct permutation of an array that may contain duplicate values.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * nums[0] nums[1] ... nums[n-1]
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 3
 * 1 1 2
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 1 1 2
 * 1 2 1
 * 2 1 1
 * </pre>
 *
 * <p>Approach: Sort the input and skip a duplicate value when the previous equal value has not been used yet.
 *
 * <p>Complexity: Time O(n x n!), Space O(n).
 */
public class PermutationsII {

    /**
     * Returns every distinct permutation of {@code nums}.
     *
     * <p>Equal values are treated as one candidate per level: a duplicate is only tried when the
     * previous equal value has already been used in the current permutation. That keeps the number of
     * permutations at {@code n! / (f1! x f2! x ...)}.
     *
     * @param nums the input values (may repeat)
     * @return every distinct permutation, sorted lexicographically
     */
    public static List<List<Integer>> permutationsUnique(int[] nums) {
        int[] sorted = nums.clone();
        Arrays.sort(sorted);

        List<List<Integer>> result = new ArrayList<>();
        generate(sorted, new boolean[sorted.length], new ArrayList<>(), result);
        result.sort((a, b) -> compareLists(a, b));
        return result;
    }

    /**
     * Depth-first search over the unused values.
     *
     * @param nums   the sorted input values
     * @param used   which values are already in the path
     * @param path   the permutation built so far
     * @param result the collected permutations
     */
    private static void generate(int[] nums, boolean[] used, List<Integer> path, List<List<Integer>> result) {
        if (path.size() == nums.length) {
            result.add(new ArrayList<>(path));
            return;
        }
        for (int i = 0; i < nums.length; i++) {
            if (used[i]) {
                continue;
            }
            if (i > 0 && nums[i] == nums[i - 1] && !used[i - 1]) {
                continue; // the previous equal value was not used, so skip this one
            }
            used[i] = true;                     // choose
            path.add(nums[i]);
            generate(nums, used, path, result); // explore
            path.remove(path.size() - 1);        // backtrack
            used[i] = false;                    // give the value back
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
        int[] nums = fs.nextIntArray(n);

        StringBuilder out = new StringBuilder();
        for (List<Integer> permutation : permutationsUnique(nums)) {
            for (int i = 0; i < permutation.size(); i++) {
                if (i > 0) {
                    out.append(' ');
                }
                out.append(permutation.get(i));
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
 * Problem: Permutations II
 * LeetCode: 47 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Backtracking, Duplicate pruning
 *
 * <p>Problem: Return every distinct permutation of an array that may contain duplicate values.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * nums[0] nums[1] ... nums[n-1]
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 3
 * 1 1 2
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 1 1 2
 * 1 2 1
 * 2 1 1
 * </pre>
 *
 * <p>Approach: Sort the input and skip a duplicate value when the previous equal value has not been used yet.
 *
 * <p>Complexity: Time O(n x n!), Space O(n).
 */
public class Main {

    /**
     * Returns every distinct permutation of {@code nums}.
     *
     * <p>Equal values are treated as one candidate per level: a duplicate is only tried when the
     * previous equal value has already been used in the current permutation. That keeps the number of
     * permutations at {@code n! / (f1! x f2! x ...)}.
     *
     * @param nums the input values (may repeat)
     * @return every distinct permutation, sorted lexicographically
     */
    public static List<List<Integer>> permutationsUnique(int[] nums) {
        int[] sorted = nums.clone();
        Arrays.sort(sorted);

        List<List<Integer>> result = new ArrayList<>();
        generate(sorted, new boolean[sorted.length], new ArrayList<>(), result);
        result.sort((a, b) -> compareLists(a, b));
        return result;
    }

    /**
     * Depth-first search over the unused values.
     *
     * @param nums   the sorted input values
     * @param used   which values are already in the path
     * @param path   the permutation built so far
     * @param result the collected permutations
     */
    private static void generate(int[] nums, boolean[] used, List<Integer> path, List<List<Integer>> result) {
        if (path.size() == nums.length) {
            result.add(new ArrayList<>(path));
            return;
        }
        for (int i = 0; i < nums.length; i++) {
            if (used[i]) {
                continue;
            }
            if (i > 0 && nums[i] == nums[i - 1] && !used[i - 1]) {
                continue; // the previous equal value was not used, so skip this one
            }
            used[i] = true;                     // choose
            path.add(nums[i]);
            generate(nums, used, path, result); // explore
            path.remove(path.size() - 1);        // backtrack
            used[i] = false;                    // give the value back
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
        int[] nums = fs.nextIntArray(n);

        StringBuilder out = new StringBuilder();
        for (List<Integer> permutation : permutationsUnique(nums)) {
            for (int i = 0; i < permutation.size(); i++) {
                if (i > 0) {
                    out.append(' ');
                }
                out.append(permutation.get(i));
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
`,r='\n# Permutations II — LeetCode 47\n\n| | |\n|---|---|\n| **Difficulty** | Medium |\n| **Pattern** | Backtracking · Duplicate pruning |\n| **Interview heat** | ★★★★☆ |\n| **Asked at** | Amazon, Google, Meta |\n\n## Problem Statement\n\nGiven a collection of numbers that might contain duplicates, return **all possible unique permutations**.\n\nThe same permutation may not be returned twice.\n\n## Input Format\n\nThe program reads from standard input:\n\n```\nn\nnums[0] nums[1] ... nums[n-1]\n```\n\n- `n` — number of elements (1 ≤ n ≤ 8)\n- `nums` — n space-separated integers (may repeat)\n\n## Sample Input\n\n```\n3\n1 1 2\n```\n\n## Expected Output\n\n```\n1 1 2\n1 2 1\n2 1 1\n```\n\nThe three distinct permutations of `[1, 1, 2]`. Identical permutations are printed only once.\n\n## Approach\n\nThe [Permutations](./Permutations.java) skeleton with one extra rule that removes the duplicates:\n\n> Skip `nums[i]` when `nums[i] == nums[i-1]` **and `nums[i-1]` has not been used yet**.\n\n**Why that rule works.** The equal values are sorted next to each other. If the earlier one has not been picked yet, then picking the later one would create the same permutation in a different order of choosing — so the later one is skipped. As soon as the earlier one *has* been used, the later one becomes available again, which is exactly what is needed for `1, 1, 2` to produce both `1 1 2` and `1 2 1`.\n\nThe number of results is `n! / (f₁! · f₂! · …)` where `fᵢ` are the frequencies of the values — for `[1, 1, 2]` that is `6 / 2 = 3`.\n\n## Dry Run\n\nInput: `nums = [1, 1, 2]` (already sorted). `used` is shown as a set of indices.\n\n| path | used | try | new path | backtrack to |\n|---|---|---|---|---|\n| `[]` | `{}` | `1` (index 0) | `[1]` | `[]` |\n| `[1]` | `{0}` | `1` (index 1) | `[1, 1]` | `[1]` |\n| `[1, 1]` | `{0,1}` | `2` (index 2) | `[1, 1, 2]` → **record** | `[1, 1]` |\n| `[1]` | `{0}` | `1` (index 1) | `[1, 1]` | `[1]` |\n| `[1, 1]` | `{0,1}` | `2` (index 2) | `[1, 1, 2]` → **record** | `[1, 1]` |\n| `[1]` | `{0}` | `2` (index 2) | `[1, 2]` | `[1]` |\n| `[1, 2]` | `{0,2}` | `1` (index 1) | `[1, 2, 1]` → **record** | `[1, 2]` |\n| `[]` | `{}` | `1` (index 1) | **skipped** — index 0 is equal and unused | — |\n| `[]` | `{}` | `2` (index 2) | `[2]` | `[]` |\n| `[2]` | `{2}` | `1` (index 0) | `[2, 1]` | `[2]` |\n| `[2, 1]` | `{0,2}` | `1` (index 1) | `[2, 1, 1]` → **record** | `[2, 1]` |\n\nThree permutations were recorded — the duplicate `1, 1, 2` never appears twice.\n\n**Reading the skip.** At the root the values are `[1(0), 1(1), 2(2)]`. The first `1` (index 0) is tried; the second `1` (index 1) is skipped because `nums[1] == nums[0]` and index 0 is not used yet. Inside the branch that already used index 0, index 1 becomes available again — that is how `1 1 2` and `1 2 1` are both produced.\n\n**The three results** are `1 1 2`, `1 2 1` and `2 1 1` — exactly `3! / 2! = 3` permutations.\n\n## Java Solution\n\nSee [`PermutationsII.java`](./PermutationsII.java).\n\n```java\n    public static List<List<Integer>> permutationsUnique(int[] nums) {\n        int[] sorted = nums.clone();\n        Arrays.sort(sorted);\n\n        List<List<Integer>> result = new ArrayList<>();\n        generate(sorted, new boolean[sorted.length], new ArrayList<>(), result);\n        result.sort((a, b) -> compareLists(a, b));\n        return result;\n    }\n```\n\n## Complexity\n\n| | Value | Why |\n|---|---|---|\n| **Time** | O(n · n!) | the recursion tree is pruned to `n! / (f₁! · f₂! · …)` leaves, each copied in `O(n)` |\n| **Space** | O(n) | the recursion stack, the path and the used array are `O(n)` |\n\n**Space `O(n)`** apart from the output.\n\n## Interview Notes\n\n**Follow-ups to raise yourself:**\n\n- "Why does the rule use `!used[i-1]` instead of `used[i-1]`?"* → the earlier copy must be used **before** the later one may be picked, otherwise `1 1 2` and `1 2 1` would both come from the same branch.\n- "What if the duplicates are not adjacent?"* → sort first; the rule only works on neighbours.\n- "How many permutations are there?"* → `n! / (f₁! · f₂! · …)`.\n- "Can you do it with a multiset instead of a used array?"* → yes, with a map of value → count.\n\n**Common mistakes:**\n\n- ❌ Using `used[i-1]` instead of `!used[i-1]` in the duplicate rule — that loses permutations.\n- ❌ Not sorting the input — the rule only works when equal values are neighbours.\n- ❌ Sorting the elements inside each permutation — that destroys the answer.\n\n**How to narrate:**\n\n> "This is the permutation skeleton with one extra rule. I sort the input first so equal values are neighbours, and then I skip a duplicate when the previous equal value has not been used yet. That way the copies are always taken in index order, so the same permutation cannot be built twice, while `1 1 2` still produces both `1 1 2` and `1 2 1`."\n\n## Related Problems\n\n- [Permutations — LeetCode 46](./Permutations.java) — the version without duplicates\n- [Combination Sum II — LeetCode 40](./CombinationSumII.java) — the same duplicate rule\n',i=[`permutationsUnique`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};