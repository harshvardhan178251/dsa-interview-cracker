var e=`backtracking.Subsets`,t=`package com.dsa.backtracking;

import com.dsa.utils.FastScanner;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * Problem: Subsets
 * LeetCode: 78 | Difficulty: Medium | Frequency: 5/5
 * Pattern: Backtracking, DFS with a path
 *
 * <p>Problem: Return every possible subset of a set of distinct integers -- each element is either taken or left out.
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
 * 1
 * 1 2
 * 1 2 3
 * 1 3
 * 2
 * 2 3
 * 3
 * </pre>
 *
 * <p>Approach: A depth-first search that adds the current path to the answer and then tries every element that may still be added.
 *
 * <p>Complexity: Time O(n x 2^n), Space O(n).
 */
public class Subsets {

    /**
     * Returns every subset of {@code nums}.
     *
     * <p>The elements of each subset are ascending, so the order of the input does not matter. The
     * result list is sorted lexicographically, which makes the output stable.
     *
     * @param nums the input values (distinct)
     * @return every subset, including the empty one
     */
    public static List<List<Integer>> subsets(int[] nums) {
        int[] sorted = nums.clone();
        Arrays.sort(sorted);

        List<List<Integer>> result = new ArrayList<>();
        generate(sorted, 0, new ArrayList<>(), result);
        result.sort((a, b) -> compareLists(a, b));
        return result;
    }

    /**
     * Depth-first search over the remaining candidates.
     *
     * @param nums   the sorted input values
     * @param start  the first index that may still be picked
     * @param path   the subset built so far
     * @param result the collected subsets
     */
    private static void generate(int[] nums, int start, List<Integer> path, List<List<Integer>> result) {
        result.add(new ArrayList<>(path)); // the current path is a subset of its own

        for (int i = start; i < nums.length; i++) {
            path.add(nums[i]);                       // choose nums[i]
            generate(nums, i + 1, path, result);     // explore
            path.remove(path.size() - 1);            // backtrack -- undo the choice
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
        for (List<Integer> subset : subsets(nums)) {
            if (subset.isEmpty()) {
                continue; // the empty subset would print an empty line
            }
            for (int i = 0; i < subset.size(); i++) {
                if (i > 0) {
                    out.append(' ');
                }
                out.append(subset.get(i));
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
 * Problem: Main
 * LeetCode: 78 | Difficulty: Medium | Frequency: 5/5
 * Pattern: Backtracking, DFS with a path
 *
 * <p>Problem: Return every possible subset of a set of distinct integers -- each element is either taken or left out.
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
 * 1
 * 1 2
 * 1 2 3
 * 1 3
 * 2
 * 2 3
 * 3
 * </pre>
 *
 * <p>Approach: A depth-first search that adds the current path to the answer and then tries every element that may still be added.
 *
 * <p>Complexity: Time O(n x 2^n), Space O(n).
 */
public class Main {

    /**
     * Returns every subset of {@code nums}.
     *
     * <p>The elements of each subset are ascending, so the order of the input does not matter. The
     * result list is sorted lexicographically, which makes the output stable.
     *
     * @param nums the input values (distinct)
     * @return every subset, including the empty one
     */
    public static List<List<Integer>> subsets(int[] nums) {
        int[] sorted = nums.clone();
        Arrays.sort(sorted);

        List<List<Integer>> result = new ArrayList<>();
        generate(sorted, 0, new ArrayList<>(), result);
        result.sort((a, b) -> compareLists(a, b));
        return result;
    }

    /**
     * Depth-first search over the remaining candidates.
     *
     * @param nums   the sorted input values
     * @param start  the first index that may still be picked
     * @param path   the subset built so far
     * @param result the collected subsets
     */
    private static void generate(int[] nums, int start, List<Integer> path, List<List<Integer>> result) {
        result.add(new ArrayList<>(path)); // the current path is a subset of its own

        for (int i = start; i < nums.length; i++) {
            path.add(nums[i]);                       // choose nums[i]
            generate(nums, i + 1, path, result);     // explore
            path.remove(path.size() - 1);            // backtrack -- undo the choice
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
        for (List<Integer> subset : subsets(nums)) {
            if (subset.isEmpty()) {
                continue; // the empty subset would print an empty line
            }
            for (int i = 0; i < subset.size(); i++) {
                if (i > 0) {
                    out.append(' ');
                }
                out.append(subset.get(i));
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
`,r='\n# Subsets — LeetCode 78\n\n| | |\n|---|---|\n| **Difficulty** | Medium |\n| **Pattern** | Backtracking · DFS with a path |\n| **Interview heat** | ★★★★★ |\n| **Asked at** | Amazon, Google, Meta, Microsoft, Uber |\n\n## Problem Statement\n\nGiven an integer array `nums` of **distinct** integers, return all possible **subsets**.\n\nThe solution must not contain duplicate subsets.\n\n## Input Format\n\nThe program reads from standard input:\n\n```\nn\nnums[0] nums[1] ... nums[n-1]\n```\n\n- `n` — number of elements (0 ≤ n ≤ 20)\n- `nums` — n space-separated distinct integers\n\n## Sample Input\n\n```\n3\n1 2 3\n```\n\n## Expected Output\n\n```\n1\n1 2\n1 2 3\n1 3\n2\n2 3\n3\n```\n\nThe eight subsets are printed one per line; the elements inside a subset are ascending and the lines are sorted. The **empty subset is not printed** — it would be an empty line.\n\n## Approach\n\nThe backtracking skeleton is the same in every "generate all X" problem:\n\n1. **Record** the current state (here: the current path is a subset).\n2. **Choose** — pick one of the elements that may still be used.\n3. **Explore** — recurse with the element added.\n4. **Backtrack** — remove the element again so the next sibling branch starts from the same state.\n\nThe `start` index is what makes each subset appear exactly once: after picking `nums[i]` the recursion may only use `nums[i+1 …]`, so the elements keep their relative order and no subset is generated twice.\n\nThe input is sorted first, which means the elements inside every subset come out ascending — and that is also the order the output is printed in.\n\n## Dry Run\n\nInput: `nums = [1, 2, 3]`. The table shows the path, the element that is tried and what happens after the recursive call returns.\n\n| depth | path | try | recurse into | backtrack to |\n|---:|---|---|---|---|\n| 0 | `[]` | `1` | `[1]` | `[]` |\n| 1 | `[1]` | `2` | `[1, 2]` | `[1]` |\n| 2 | `[1, 2]` | `3` | `[1, 2, 3]` | `[1, 2]` |\n| 2 | `[1, 2]` | — (no more elements) | — | `[1]` |\n| 1 | `[1]` | `3` | `[1, 3]` | `[1]` |\n| 1 | `[1]` | — (no more elements) | — | `[]` |\n| 0 | `[]` | `2` | `[2]` | `[]` |\n| 1 | `[2]` | `3` | `[2, 3]` | `[2]` |\n| 1 | `[2]` | — (no more elements) | — | `[]` |\n| 0 | `[]` | `3` | `[3]` | `[]` |\n| 1 | `[3]` | — (no more elements) | — | `[]` |\n\nEvery node of the tree is one subset — that is the trick of this problem: **the recursion tree *is* the answer**.\n\n**The subsets that were recorded** (in the order the DFS found them): `[]`, `[1]`, `[1, 2]`, `[1, 2, 3]`, `[1, 3]`, `[2]`, `[2, 3]`, `[3]`. Sorted lexicographically (and without the empty subset) they are exactly the seven printed lines.\n\n**Why the `start` index matters.** Without it the DFS would also produce `[2, 1]` — the same set in a different order — and the answer would have 16 entries instead of 8.\n\n## Java Solution\n\nSee [`Subsets.java`](./Subsets.java).\n\n```java\n    public static List<List<Integer>> subsets(int[] nums) {\n        int[] sorted = nums.clone();\n        Arrays.sort(sorted);\n\n        List<List<Integer>> result = new ArrayList<>();\n        generate(sorted, 0, new ArrayList<>(), result);\n        result.sort((a, b) -> compareLists(a, b));\n        return result;\n    }\n```\n\n## Complexity\n\n| | Value | Why |\n|---|---|---|\n| **Time** | O(n · 2ⁿ) | the recursion tree has `2ⁿ` nodes and every node copies a path of up to `n` values |\n| **Space** | O(n) | the recursion stack is `n` deep, the path holds `n` values |\n\n**Space `O(n)`** apart from the output itself, which holds `2ⁿ` subsets (each up to `n` long) — that is the real cost of this problem.\n\n## Interview Notes\n\n**Follow-ups to raise yourself:**\n\n- "What if the input has duplicates?"* → sort first and skip equal elements at the same level (the trick used by [Combination Sum II](./CombinationSumII.java)).\n- "How many subsets are there?"* → `2ⁿ` — the answer is the size of the recursion tree.\n- "What if only subsets of exactly `k` elements are wanted?"* → add a size check: `path.size() == k`.\n- "Print them without the empty subset."* → skip `path.isEmpty()` when recording.\n\n**Common mistakes:**\n\n- ❌ Forgetting to remove the element after the recursive call — the backtrack is what keeps the siblings correct.\n- ❌ Using `i + 1` as the next `start` when you want combinations *with* repetition (`Combination Sum` needs `i` instead).\n- ❌ Not sorting the input, so the printed subsets are not in ascending order.\n\n**How to narrate:**\n\n> "The recursion tree of this problem *is* the answer: every node is one subset. I keep the current path, record it, then try every element that comes after the last one I picked — the `start` index is what stops the same set from being generated in two different orders. After each recursive call I remove the element again, which is the backtrack."\n\n## Related Problems\n\n- [Combination Sum — LeetCode 39](./CombinationSum.java) — the same skeleton with a target\n- [Permutations — LeetCode 46](./Permutations.java) — the same skeleton with a fixed length\n',i=[`subsets`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};