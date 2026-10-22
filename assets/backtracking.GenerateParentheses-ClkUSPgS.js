var e=`backtracking.GenerateParentheses`,t=`package com.dsa.backtracking;

import com.dsa.utils.FastScanner;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

/**
 * Problem: Generate Parentheses
 * LeetCode: 22 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Backtracking, Pruning
 *
 * <p>Problem: Generate all combinations of \`n\` pairs of parentheses that are well formed.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 3
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * ((()))
 * (()())
 * (())()
 * ()(())
 * ()()()
 * </pre>
 *
 * <p>Approach: Add \`(\` while there are pairs left and \`)\` only while there is an unmatched \`(\` -- that keeps every prefix valid.
 *
 * <p>Complexity: Time O(4^n / sqrtn), Space O(n).
 */
public class GenerateParentheses {

    /**
     * Generates all well-formed combinations of {@code n} parenthesis pairs.
     *
     * <p>A {@code (} may be added while there are pairs left, and a {@code )} only while there is an
     * unmatched {@code (}. That rule keeps every prefix of the current path valid, so no invalid branch
     * is ever explored.
     *
     * @param n the number of pairs
     * @return every valid combination, sorted lexicographically
     */
    public static List<String> generateParenthesis(int n) {
        List<String> result = new ArrayList<>();
        build(new StringBuilder(), 0, 0, n, result);
        result.sort(Comparator.naturalOrder());
        return result;
    }

    /**
     * Depth-first search that keeps the path a valid prefix.
     *
     * @param path  the brackets chosen so far
     * @param open  how many opening brackets are in the path
     * @param close how many closing brackets are in the path
     * @param n     the number of pairs that are needed
     * @param result the collected combinations
     */
    private static void build(StringBuilder path, int open, int close, int n, List<String> result) {
        if (path.length() == 2 * n) {
            result.add(path.toString()); // every pair is used
            return;
        }
        if (open < n) {
            path.append('(');              // choose an opening bracket
            build(path, open + 1, close, n, result);
            path.deleteCharAt(path.length() - 1); // backtrack
        }
        if (close < open) {
            path.append(')');              // choose a closing bracket
            build(path, open, close + 1, n, result);
            path.deleteCharAt(path.length() - 1); // backtrack
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

        StringBuilder out = new StringBuilder();
        for (String combination : generateParenthesis(n)) {
            out.append(combination).append('\\n');
        }
        System.out.print(out);
    }
}
`,n=`import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

/**
 * Problem: Generate Parentheses
 * LeetCode: 22 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Backtracking, Pruning
 *
 * <p>Problem: Generate all combinations of \`n\` pairs of parentheses that are well formed.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 3
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * ((()))
 * (()())
 * (())()
 * ()(())
 * ()()()
 * </pre>
 *
 * <p>Approach: Add \`(\` while there are pairs left and \`)\` only while there is an unmatched \`(\` -- that keeps every prefix valid.
 *
 * <p>Complexity: Time O(4^n / sqrtn), Space O(n).
 */
public class Main {

    /**
     * Generates all well-formed combinations of {@code n} parenthesis pairs.
     *
     * <p>A {@code (} may be added while there are pairs left, and a {@code )} only while there is an
     * unmatched {@code (}. That rule keeps every prefix of the current path valid, so no invalid branch
     * is ever explored.
     *
     * @param n the number of pairs
     * @return every valid combination, sorted lexicographically
     */
    public static List<String> generateParenthesis(int n) {
        List<String> result = new ArrayList<>();
        build(new StringBuilder(), 0, 0, n, result);
        result.sort(Comparator.naturalOrder());
        return result;
    }

    /**
     * Depth-first search that keeps the path a valid prefix.
     *
     * @param path  the brackets chosen so far
     * @param open  how many opening brackets are in the path
     * @param close how many closing brackets are in the path
     * @param n     the number of pairs that are needed
     * @param result the collected combinations
     */
    private static void build(StringBuilder path, int open, int close, int n, List<String> result) {
        if (path.length() == 2 * n) {
            result.add(path.toString()); // every pair is used
            return;
        }
        if (open < n) {
            path.append('(');              // choose an opening bracket
            build(path, open + 1, close, n, result);
            path.deleteCharAt(path.length() - 1); // backtrack
        }
        if (close < open) {
            path.append(')');              // choose a closing bracket
            build(path, open, close + 1, n, result);
            path.deleteCharAt(path.length() - 1); // backtrack
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

        StringBuilder out = new StringBuilder();
        for (String combination : generateParenthesis(n)) {
            out.append(combination).append('\\n');
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
`,r='\n# Generate Parentheses — LeetCode 22\n\n| | |\n|---|---|\n| **Difficulty** | Medium |\n| **Pattern** | Backtracking · Pruning |\n| **Interview heat** | ★★★★☆ |\n| **Asked at** | Amazon, Google, Meta, Adobe |\n\n## Problem Statement\n\nGiven `n` pairs of parentheses, generate **all** combinations of well-formed parentheses.\n\nFor example, with `n = 3` the five valid combinations are `((()))`, `(()())`, `(())()`, `()(())` and `()()()`.\n\n## Input Format\n\nThe program reads from standard input:\n\n```\nn\n```\n\n- `n` — the number of parenthesis pairs (1 ≤ n ≤ 8)\n\n## Sample Input\n\n```\n3\n```\n\n## Expected Output\n\n```\n((()))\n(()())\n(())()\n()(())\n()()()\n```\n\nThe five valid combinations of three pairs, one per line, sorted lexicographically.\n\n## Approach\n\nThe backtracking skeleton with **pruning built into the choice**:\n\n1. Track `open` (opening brackets used) and `close` (closing brackets used).\n2. Add `(` when `open < n` — there is still a pair that has to be opened.\n3. Add `)` when `close < open` — a closing bracket is only legal when there is an unmatched    opening bracket in front of it.\n4. When the path has `2n` characters it is a valid combination — record it.\n5. Backtrack: delete the character that was just added.\n\n**The pruning is the whole point.** Without the `close < open` rule the search would also produce strings like `)(` — invalid prefixes that can never be repaired. With it, every path in the search tree is a valid prefix, so nothing invalid is ever explored.\n\nThe number of results is the Catalan number `C(n)`: `C(3) = 5`, `C(4) = 14`.\n\n## Dry Run\n\nInput: `n = 3`. The path is built left to right; `(` may be added while `open < 3`, `)` only while `close < open`.\n\n| path | open | close | try | new path | result |\n|---|---:|---:|---|---|---|\n| `""` | 0 | 0 | `(` | `"("` | — |\n| `"("` | 1 | 0 | `(` | `"(("` | — |\n| `"(("` | 2 | 0 | `(` | `"((("` | — |\n| `"((("` | 3 | 0 | `)` | `"((()"` | — |\n| `"((()"` | 3 | 1 | `)` | `"((())"` | — |\n| `"((())"` | 3 | 2 | `)` | `"((()))"` | **`((()))`** |\n| `"((())"` | 3 | 2 | — (`open == n`) | — | — |\n| `"((()"` | 3 | 1 | — | — | — |\n| `"((("` | 3 | 0 | — | — | — |\n| `"(("` | 2 | 0 | `)` | `"(()"` | — |\n| `"(()"` | 2 | 1 | `(` | `"(()("` | — |\n| `"(()("` | 3 | 1 | `)` | `"(()()"` | — |\n| `"(()()"` | 3 | 2 | `)` | `"(()())"` | **`(()())`** |\n| `"(()"` | 2 | 1 | `)` | `"(()"` → wait, `(()` + `)` = `(())` | **`(())()`** |\n| … | | | | | |\n| `"("` | 1 | 0 | `)` | `"()"` | — |\n| `"()"` | 1 | 1 | `(` | `"()("` | — |\n| `"()("` | 2 | 1 | `(` | `"()(("` | — |\n| `"()(("` | 3 | 1 | `)` | `"()(()"` | — |\n| `"()(()"` | 3 | 2 | `)` | `"()(())"` | **`()(())`** |\n| `"()("` | 2 | 1 | `)` | `"()()"` | — |\n| `"()()"` | 2 | 2 | `(` | `"()()("` | — |\n| `"()()("` | 3 | 2 | `)` | `"()()()"` | **`()()()`** |\n\nFive combinations were recorded.\n\n**The pruning in action.** From `"((("` the only legal move is `)` — `open == n`, so no more `(` is allowed, and `close < open` allows exactly one `)`.\n\n**The five results** — `((()))`, `(()())`, `(())()`, `()(())`, `()()()` — are the Catalan number `C(3) = 5`. For `n = 4` there are `14`, for `n = 5` there are `42`.\n\n**Why the result is sorted.** The DFS explores `(` before `)`, so the results already come out in lexicographic order — the explicit sort only makes that independent of the implementation.\n\n## Java Solution\n\nSee [`GenerateParentheses.java`](./GenerateParentheses.java).\n\n```java\n    public static List<String> generateParenthesis(int n) {\n        List<String> result = new ArrayList<>();\n        build(new StringBuilder(), 0, 0, n, result);\n        result.sort((a, b) -> compareLists(a, b));\n        return result;\n    }\n```\n\n## Complexity\n\n| | Value | Why |\n|---|---|---|\n| **Time** | O(4ⁿ / √n) | the number of results is the Catalan number `C(n) ≈ 4ⁿ / (n√π)` |\n| **Space** | O(n) | the path and the recursion stack hold `2n` characters |\n\n**Space `O(n)`** apart from the output, which holds `C(n)` strings of `2n` characters.\n\n## Interview Notes\n\n**Follow-ups to raise yourself:**\n\n- "How many results are there?"* → the Catalan number `C(n)` — see [Catalan Number](../dynamicprogramming/CatalanNumber.java).\n- "Can you generate only the `k`-th combination?"* → the unranking algorithm: build the string left to right and count how many valid completions start with each candidate.\n- "What is the difference to a plain Catalan DP?"* → the DP counts them, the backtracking lists them.\n- "How do you check a string in `O(n)`?"* → keep a counter of the balance — it must never go negative and must end at zero.\n\n**Common mistakes:**\n\n- ❌ Allowing `)` when `close == open` — that produces invalid brackets such as `)(`.\n- ❌ Forgetting to delete the character after the recursive call — the path keeps growing.\n- ❌ Stopping at `open == n` instead of `path.length() == 2 * n` — the closing brackets are still missing.\n\n**How to narrate:**\n\n> "I keep two counters, `open` and `close`. I can always add an opening bracket while `open` is below `n`, and I can add a closing bracket only while `close < open`, because a closing bracket needs an unmatched opening bracket in front of it. That rule prunes the invalid branches before they are explored, and when the path has `2n` characters it is a valid combination."\n\n## Related Problems\n\n- [Catalan Number — LeetCode 96](../dynamicprogramming/CatalanNumber.java) — counts the same objects\n- [Palindrome Partitioning — LeetCode 131](./PalindromePartitioning.java) — the same skeleton over a string\n',i=[`generateParenthesis`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};