var e=`backtracking.Permutations`,t=`package com.dsa.backtracking;

import com.dsa.utils.FastScanner;
import java.util.ArrayList;
import java.util.List;

/**
 * Problem: Permutations
 * LeetCode: 46 | Difficulty: Medium | Frequency: 5/5
 * Pattern: Backtracking, Used array
 *
 * <p>Problem: Return every possible permutation of an array of distinct integers.
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
 * 1 2 3
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 1 2 3
 * 1 3 2
 * 2 1 3
 * 2 3 1
 * 3 1 2
 * 3 2 1
 * </pre>
 *
 * <p>Approach: At every level pick one of the values that is not used yet, mark it, recurse and unmark it.
 *
 * <p>Complexity: Time O(n x n!), Space O(n).
 */
public class Permutations {

    /**
     * Returns every permutation of {@code nums}.
     *
     * <p>The values inside a permutation keep their original order, so the permutation itself is the
     * answer -- only the list of permutations is sorted, which makes the output stable.
     *
     * @param nums the input values (distinct)
     * @return every permutation, sorted lexicographically
     */
    public static List<List<Integer>> permutations(int[] nums) {
        List<List<Integer>> result = new ArrayList<>();
        generate(nums, new boolean[nums.length], new ArrayList<>(), result);
        result.sort((a, b) -> compareLists(a, b));
        return result;
    }

    /**
     * Depth-first search over the unused values.
     *
     * @param nums   the input values
     * @param used   which values are already in the path
     * @param path   the permutation built so far
     * @param result the collected permutations
     */
    private static void generate(int[] nums, boolean[] used, List<Integer> path, List<List<Integer>> result) {
        if (path.size() == nums.length) {
            result.add(new ArrayList<>(path)); // every value is used
            return;
        }
        for (int i = 0; i < nums.length; i++) {
            if (used[i]) {
                continue; // this value is already in the permutation
            }
            used[i] = true;                  // choose
            path.add(nums[i]);
            generate(nums, used, path, result); // explore
            path.remove(path.size() - 1);      // backtrack
            used[i] = false;                  // give the value back
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
        for (List<Integer> permutation : permutations(nums)) {
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
import java.util.List;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

/**
 * Problem: Main
 * LeetCode: 46 | Difficulty: Medium | Frequency: 5/5
 * Pattern: Backtracking, Used array
 *
 * <p>Problem: Return every possible permutation of an array of distinct integers.
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
 * 1 2 3
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 1 2 3
 * 1 3 2
 * 2 1 3
 * 2 3 1
 * 3 1 2
 * 3 2 1
 * </pre>
 *
 * <p>Approach: At every level pick one of the values that is not used yet, mark it, recurse and unmark it.
 *
 * <p>Complexity: Time O(n x n!), Space O(n).
 */
public class Main {

    /**
     * Returns every permutation of {@code nums}.
     *
     * <p>The values inside a permutation keep their original order, so the permutation itself is the
     * answer -- only the list of permutations is sorted, which makes the output stable.
     *
     * @param nums the input values (distinct)
     * @return every permutation, sorted lexicographically
     */
    public static List<List<Integer>> permutations(int[] nums) {
        List<List<Integer>> result = new ArrayList<>();
        generate(nums, new boolean[nums.length], new ArrayList<>(), result);
        result.sort((a, b) -> compareLists(a, b));
        return result;
    }

    /**
     * Depth-first search over the unused values.
     *
     * @param nums   the input values
     * @param used   which values are already in the path
     * @param path   the permutation built so far
     * @param result the collected permutations
     */
    private static void generate(int[] nums, boolean[] used, List<Integer> path, List<List<Integer>> result) {
        if (path.size() == nums.length) {
            result.add(new ArrayList<>(path)); // every value is used
            return;
        }
        for (int i = 0; i < nums.length; i++) {
            if (used[i]) {
                continue; // this value is already in the permutation
            }
            used[i] = true;                  // choose
            path.add(nums[i]);
            generate(nums, used, path, result); // explore
            path.remove(path.size() - 1);      // backtrack
            used[i] = false;                  // give the value back
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
        for (List<Integer> permutation : permutations(nums)) {
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
`,r='\n# Permutations — LeetCode 46\n\n| | |\n|---|---|\n| **Difficulty** | Medium |\n| **Pattern** | Backtracking · Used array |\n| **Interview heat** | ★★★★★ |\n| **Asked at** | Amazon, Google, Meta, Microsoft, Uber |\n\n## Problem Statement\n\nGiven an array `nums` of **distinct** integers, return all possible **permutations**.\n\nYou can return the answer in any order.\n\n## Input Format\n\nThe program reads from standard input:\n\n```\nn\nnums[0] nums[1] ... nums[n-1]\n```\n\n- `n` — number of elements (1 ≤ n ≤ 6)\n- `nums` — n space-separated distinct integers\n\n## Sample Input\n\n```\n3\n1 2 3\n```\n\n## Expected Output\n\n```\n1 2 3\n1 3 2\n2 1 3\n2 3 1\n3 1 2\n3 2 1\n```\n\nThe six permutations, one per line. The order **inside** a permutation is the permutation itself; the lines are sorted lexicographically.\n\n## Approach\n\nThe backtracking skeleton again, this time with a **used** array:\n\n1. If the path already contains `n` values, record it — that is a permutation.\n2. Otherwise loop over all values and skip the ones that are already used.\n3. Mark the value as used, append it to the path and recurse.\n4. **Backtrack:** remove it from the path and unmark it.\n\n**Why the `used` array instead of removing the element from the list?** Removing and re-inserting an element costs `O(n)` per step; the `used` array is `O(1)` and never loses the original order of the input.\n\n**Why the result is sorted.** The order of the permutations is part of the answer, so the elements inside a permutation are **not** sorted — only the list of permutations is, which gives the program a stable output.\n\n## Dry Run\n\nInput: `nums = [1, 2, 3]`. The table shows the path, the value that is tried and the state after the backtrack.\n\n| path | used | try | new path | backtrack to |\n|---|---|---|---|---|\n| `[]` | `{}` | 1 | `[1]` | `[]` |\n| `[1]` | `{1}` | 2 | `[1, 2]` | `[1]` |\n| `[1, 2]` | `{1,2}` | 3 | `[1, 2, 3]` → **record** | `[1, 2]` |\n| `[1, 2]` | `{1,2}` | — (1 and 2 are used) | — | `[1]` |\n| `[1]` | `{1}` | 3 | `[1, 3]` | `[1]` |\n| `[1, 3]` | `{1,3}` | 2 | `[1, 3, 2]` → **record** | `[1, 3]` |\n| `[1]` | `{1}` | — (nothing left) | — | `[]` |\n| `[]` | `{}` | 2 | `[2]` | `[]` |\n| `[2]` | `{2}` | 1 | `[2, 1]` | `[2]` |\n| `[2, 1]` | `{1,2}` | 3 | `[2, 1, 3]` → **record** | `[2, 1]` |\n| `[2]` | `{2}` | 3 | `[2, 3]` | `[2]` |\n| `[2, 3]` | `{2,3}` | 1 | `[2, 3, 1]` → **record** | `[2, 3]` |\n| `[]` | `{}` | 3 | `[3]` | `[]` |\n| `[3]` | `{3}` | 1 | `[3, 1]` | `[3]` |\n| `[3, 1]` | `{1,3}` | 2 | `[3, 1, 2]` → **record** | `[3, 1]` |\n| `[3]` | `{3}` | 2 | `[3, 2]` | `[3]` |\n| `[3, 2]` | `{2,3}` | 1 | `[3, 2, 1]` → **record** | `[3, 2]` |\n\nSix permutations were recorded.\n\n**The recorded permutations** (DFS order): `123`, `132`, `213`, `231`, `312`, `321`. They are already lexicographically sorted here because the input was ascending — but the result list is sorted explicitly anyway, so the output does not depend on the input order.\n\n**The number of permutations** is `n!`: 6 for `n = 3`, 120 for `n = 5`.\n\n## Java Solution\n\nSee [`Permutations.java`](./Permutations.java).\n\n```java\n    public static List<List<Integer>> permutations(int[] nums) {\n        List<List<Integer>> result = new ArrayList<>();\n        generate(nums, new boolean[nums.length], new ArrayList<>(), result);\n        result.sort((a, b) -> compareLists(a, b));\n        return result;\n    }\n```\n\n## Complexity\n\n| | Value | Why |\n|---|---|---|\n| **Time** | O(n · n!) | there are `n!` permutations, each copied in `O(n)` |\n| **Space** | O(n) | the recursion stack, the path and the used array are `O(n)` |\n\n**Space `O(n)`** apart from the output, which holds `n!` permutations of `n` values — exponential, and that is inherent to the problem.\n\n## Interview Notes\n\n**Follow-ups to raise yourself:**\n\n- "What if the input contains duplicates?"* → see [Permutations II](./PermutationsII.java).\n- "How many permutations are there?"* → `n!` — the size of the recursion tree.\n- "Can you generate the next permutation in `O(n)`?"* → yes, the *next permutation* algorithm (find the pivot, swap, reverse) — `O(n)` per permutation instead of `O(n²)` for backtracking.\n- "What is the difference to subsets?"* → a permutation uses **every** element, a subset may leave elements out.\n\n**Common mistakes:**\n\n- ❌ Forgetting to reset `used[i] = false` — the value would stay unavailable for the other branches.\n- ❌ Sorting the elements **inside** each permutation — that would destroy the answer.\n- ❌ Removing the element from the input list and re-inserting it at the end — the order of the remaining elements changes and the permutations are wrong.\n\n**How to narrate:**\n\n> "At every level I pick a value that is not used yet, mark it, recurse, and then unmark it — that unmarking is the backtrack. A `used` array is better than removing the element from a list because it is `O(1)` and keeps the input order. The order inside a permutation is the answer, so I only sort the list of permutations, never their contents."\n\n## Related Problems\n\n- [Permutations II — LeetCode 47](./PermutationsII.java) — duplicates in the input\n- [Subsets — LeetCode 78](./Subsets.java) — the same skeleton without the used array\n',i=[`permutations`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};