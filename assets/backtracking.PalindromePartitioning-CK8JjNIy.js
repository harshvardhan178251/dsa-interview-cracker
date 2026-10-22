var e=`backtracking.PalindromePartitioning`,t=`package com.dsa.backtracking;

import com.dsa.utils.FastScanner;
import java.util.ArrayList;
import java.util.List;

/**
 * Problem: Palindrome Partitioning
 * LeetCode: 131 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Backtracking, Pruning
 *
 * <p>Problem: Split a string into every possible list of palindromic parts.
 *
 * <p>Input format (stdin):
 * <pre>
 * s
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * aab
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * a|a|b
 * aa|b
 * </pre>
 *
 * <p>Approach: Try every prefix of the remaining string as the next part, but only when that prefix is a palindrome.
 *
 * <p>Complexity: Time O(2^n x n), Space O(n).
 */
public class PalindromePartitioning {

    /**
     * Splits {@code s} into every list of palindromic parts.
     *
     * <p>The parts of a partition keep the order of the original string, so they are **not** sorted --
     *only the list of partitions is sorted, which gives the program a stable output.
     *
     * @param s the string to split
     * @return every partition, sorted lexicographically
     */
    public static List<List<String>> partition(String s) {
        List<List<String>> result = new ArrayList<>();
        split(s, 0, new ArrayList<>(), result);
        result.sort((a, b) -> compareLists(a, b));
        return result;
    }

    /**
     * Depth-first search over the possible parts.
     *
     * @param s     the string to split
     * @param start the first character that is not used yet
     * @param path  the parts chosen so far
     * @param result the collected partitions
     */
    private static void split(String s, int start, List<String> path, List<List<String>> result) {
        if (start == s.length()) {
            result.add(new ArrayList<>(path)); // the whole string is split
            return;
        }
        for (int end = start; end < s.length(); end++) {
            String part = s.substring(start, end + 1);
            if (!isPalindrome(part)) {
                continue; // a part has to be a palindrome
            }
            path.add(part);                    // choose the part
            split(s, end + 1, path, result);   // explore the rest
            path.remove(path.size() - 1);      // backtrack
        }
    }

    /**
     * Tells whether a string is a palindrome.
     *
     * @param s the string to check
     * @return {@code true} when the string reads the same in both directions
     */
    private static boolean isPalindrome(String s) {
        int left = 0;
        int right = s.length() - 1;
        while (left < right) {
            if (s.charAt(left) != s.charAt(right)) {
                return false;
            }
            left++;
            right--;
        }
        return true;
    }

    /**
     * Compares two lists of parts element by element (lexicographic order).
     *
     * @param a the first list
     * @param b the second list
     * @return a negative number, zero, or a positive number
     */
    private static int compareLists(List<String> a, List<String> b) {
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
        String s = fs.next();

        StringBuilder out = new StringBuilder();
        for (List<String> partition : PalindromePartitioning.partition(s)) {
            for (int i = 0; i < partition.size(); i++) {
                if (i > 0) {
                    out.append('|');
                }
                out.append(partition.get(i));
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
 * Problem: Palindrome Partitioning
 * LeetCode: 131 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Backtracking, Pruning
 *
 * <p>Problem: Split a string into every possible list of palindromic parts.
 *
 * <p>Input format (stdin):
 * <pre>
 * s
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * aab
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * a|a|b
 * aa|b
 * </pre>
 *
 * <p>Approach: Try every prefix of the remaining string as the next part, but only when that prefix is a palindrome.
 *
 * <p>Complexity: Time O(2^n x n), Space O(n).
 */
public class Main {

    /**
     * Splits {@code s} into every list of palindromic parts.
     *
     * <p>The parts of a partition keep the order of the original string, so they are **not** sorted --
     *only the list of partitions is sorted, which gives the program a stable output.
     *
     * @param s the string to split
     * @return every partition, sorted lexicographically
     */
    public static List<List<String>> partition(String s) {
        List<List<String>> result = new ArrayList<>();
        split(s, 0, new ArrayList<>(), result);
        result.sort((a, b) -> compareLists(a, b));
        return result;
    }

    /**
     * Depth-first search over the possible parts.
     *
     * @param s     the string to split
     * @param start the first character that is not used yet
     * @param path  the parts chosen so far
     * @param result the collected partitions
     */
    private static void split(String s, int start, List<String> path, List<List<String>> result) {
        if (start == s.length()) {
            result.add(new ArrayList<>(path)); // the whole string is split
            return;
        }
        for (int end = start; end < s.length(); end++) {
            String part = s.substring(start, end + 1);
            if (!isPalindrome(part)) {
                continue; // a part has to be a palindrome
            }
            path.add(part);                    // choose the part
            split(s, end + 1, path, result);   // explore the rest
            path.remove(path.size() - 1);      // backtrack
        }
    }

    /**
     * Tells whether a string is a palindrome.
     *
     * @param s the string to check
     * @return {@code true} when the string reads the same in both directions
     */
    private static boolean isPalindrome(String s) {
        int left = 0;
        int right = s.length() - 1;
        while (left < right) {
            if (s.charAt(left) != s.charAt(right)) {
                return false;
            }
            left++;
            right--;
        }
        return true;
    }

    /**
     * Compares two lists of parts element by element (lexicographic order).
     *
     * @param a the first list
     * @param b the second list
     * @return a negative number, zero, or a positive number
     */
    private static int compareLists(List<String> a, List<String> b) {
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
        String s = fs.next();

        StringBuilder out = new StringBuilder();
        for (List<String> partition : Main.partition(s)) {
            for (int i = 0; i < partition.size(); i++) {
                if (i > 0) {
                    out.append('|');
                }
                out.append(partition.get(i));
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
# Palindrome Partitioning — LeetCode 131

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Backtracking · Pruning |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Uber |

## Problem Statement

Given a string \`s\`, split it into **all** possible partitions where every part is a palindrome.

Return every such partition. The parts of a partition keep the order of the original string.

## Input Format

The program reads from standard input:

\`\`\`
s
\`\`\`

- \`s\` — the string to split (1 ≤ |s| ≤ 16, lower case letters)

## Sample Input

\`\`\`
aab
\`\`\`

## Expected Output

\`\`\`
a|a|b
aa|b
\`\`\`

The two partitions of \`aab\`: \`["a", "a", "b"]\` and \`["aa", "b"]\`. The parts of a partition keep their original order and are separated by a \`|\`.

## Approach

The backtracking skeleton with a **validity check** in front of every choice:

1. At position \`start\`, try every prefix \`s[start … end]\` as the next part.
2. Only continue when that prefix is a palindrome — otherwise skip it (the pruning).
3. Add the part to the path, recurse from \`end + 1\`, and **remove the part again** (the    backtrack).
4. When \`start\` reaches the end of the string, the path is a complete partition — record it.

**Why the pruning is worth it.** Without the palindrome check the search would produce all \`2^(n-1)\` ways of cutting the string; with it, only the valid partitions survive. For \`n = 16\` that is the difference between 32 768 and 16 valid partitions.

**The palindrome check.** A string is a palindrome when the characters at both ends are equal all the way to the middle — a two-pointer scan, \`O(len)\` time.

## Dry Run

Input: \`s = "aab"\`.

| start | end | part | palindrome? | new path | result |
|---:|---:|---|---|---|---|
| 0 | 0 | \`a\` | yes | \`["a"]\` | — |
| 1 | 1 | \`a\` | yes | \`["a", "a"]\` | — |
| 2 | 2 | \`b\` | yes | \`["a", "a", "b"]\` | **\`["a", "a", "b"]\`** |
| 1 | 2 | \`ab\` | no | — | — |
| 0 | 1 | \`aa\` | yes | \`["aa"]\` | — |
| 2 | 2 | \`b\` | yes | \`["aa", "b"]\` | **\`["aa", "b"]\`** |
| 0 | 2 | \`aab\` | no | — | — |

Two partitions were recorded; sorted lexicographically they are printed in the order above.

**The backtrack.** After \`["a", "a", "b"]\` was recorded, the \`b\` is removed again, and after the branch \`["a", "a"]\` is finished the second \`a\` is removed as well — so the path is \`["a"]\` again when the next part is tried.

**Why the parts are not sorted inside a partition.** \`["a", "a", "b"]\` and \`["b", "a", "a"]\` are different partitions — the parts keep the order of the string. Only the list of partitions is sorted, so the printed output is stable.

**The number of partitions** of \`"aab"\` is two; for \`"aabb"\` it is six.

## Java Solution

See [\`PalindromePartitioning.java\`](./PalindromePartitioning.java).

\`\`\`java
    public static List<List<String>> partition(String s) {
        List<List<String>> result = new ArrayList<>();
        split(s, 0, new ArrayList<>(), result);
        result.sort((a, b) -> compareLists(a, b));
        return result;
    }
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(2^n · n) | in the worst case every cut of the string is tried, which is \`O(2^n)\` |
| **Space** | O(n) | the path holds at most \`n\` parts, the recursion stack is \`n\` deep |

**Space \`O(n)\`** apart from the output. The palindrome check is \`O(n)\` per candidate part, which is why the total time is \`O(2^n · n)\`.

## Interview Notes

**Follow-ups to raise yourself:**

- "What if I only need the **number** of palindromic partitions?"* → a DP over the prefixes (\`dp[i] = sum of dp[j] over the palindromic prefixes s[j..i-1]\`).
- "How do I find the **longest** palindromic partition?"* → the same DP with \`max\` instead of \`sum\`.
- "Can the palindrome check be faster?"* → precompute \`isPalindrome[i][j]\` with the classic interval DP, then the check is \`O(1)\`.
- "What is the difference to a palindrome *substring*?"* → here the string is cut into several palindromes; see [Palindromic Substrings](../dynamicprogramming/PalindromicSubstrings.java).

**Common mistakes:**

- ❌ Sorting the parts inside a partition — that destroys the order of the original string.
- ❌ Forgetting the backtrack, so the parts of the next branch pile up.
- ❌ Checking the palindrome of the whole remaining string instead of the candidate part.
- ❌ Returning the parts of a partition without copying them — the later backtracks would empty them.

**How to narrate:**

> "I try every prefix of the remaining string as the next part and only continue when that prefix is a palindrome — that check is the pruning that keeps the search small. When the whole string is split I record the parts, and after every recursive call I remove the part again. The parts keep their order, so only the list of partitions is sorted."

## Related Problems

- [Sudoku Solver — LeetCode 37](./SudokuSolver.java) — the same skeleton with a validity check
- [Generate Parentheses — LeetCode 22](./GenerateParentheses.java) — the same skeleton with pruning
`,i=[`partition`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};