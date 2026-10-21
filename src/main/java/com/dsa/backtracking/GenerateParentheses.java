package com.dsa.backtracking;

import com.dsa.utils.FastScanner;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

/**
 * Problem: Generate Parentheses
 * LeetCode: 22 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Backtracking, Pruning
 *
 * <p>Problem: Generate all combinations of `n` pairs of parentheses that are well formed.
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
 * <p>Approach: Add `(` while there are pairs left and `)` only while there is an unmatched `(` -- that keeps every prefix valid.
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
            out.append(combination).append('\n');
        }
        System.out.print(out);
    }
}
