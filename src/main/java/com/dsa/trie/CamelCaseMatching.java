package com.dsa.trie;

import com.dsa.utils.FastScanner;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

/**
 * Problem: Camelcase Matching
 * LeetCode: 1253 | Difficulty: Medium | Frequency: 3/5
 * Pattern: Two pointers, Case rules
 *
 * <p>Problem: A query matches a pattern when the pattern can be turned into the query by
 * inserting lowercase English letters at arbitrary positions. Equivalently: the query
 * reduces to the pattern after deleting some lowercase letters. Uppercase letters of the
 * query can never be deleted, so an uppercase letter in the query must be part of the
 * pattern.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * query1
 * ...
 * queryn
 * m
 * pattern1
 * ...
 * patternm
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 3
 * FooBar
 * FootBall
 * FrameBuffer
 * 3
 * FB
 * FBar
 * Buffer
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 0 1
 * 0
 * 0
 * </pre>
 * One line per query: the indices of the patterns it matches, in ascending order. The
 * line is empty when the query matches no pattern.
 *
 * <p>Approach: two pointers, one on the query and one on the pattern. When the two
 * characters are equal the pattern character is consumed. Otherwise the query character
 * has to be an inserted lowercase letter — if it is uppercase the match is impossible
 * and we stop. The match succeeds when the whole pattern has been consumed and every
 * remaining query character is lowercase.
 *
 * <p>Complexity: Time O(sum of the query lengths) per pattern. Space O(1).
 */
public class CamelCaseMatching {

    /**
     * Checks whether a query matches a pattern.
     *
     * @param query   the query word
     * @param pattern the pattern word
     * @return {@code true} when the pattern can be turned into the query by inserting
     *         lowercase letters
     */
    public static boolean matches(String query, String pattern) {
        int i = 0; // index into the query
        int j = 0; // index into the pattern
        while (i < query.length()) {
            if (j < pattern.length() && query.charAt(i) == pattern.charAt(j)) {
                i++;
                j++;
            } else if (Character.isUpperCase(query.charAt(i))) {
                return false; // an uppercase query letter must belong to the pattern
            } else {
                i++; // this lowercase letter was inserted into the pattern
            }
        }
        return j == pattern.length();
    }

    /**
     * Returns the indices of the patterns that a query matches.
     *
     * @param query   the query word
     * @param patterns the candidate patterns
     * @return the matching pattern indices in ascending order
     */
    public static List<Integer> matchingPatterns(String query, List<String> patterns) {
        List<Integer> matches = new ArrayList<>();
        for (int i = 0; i < patterns.size(); i++) {
            if (matches(query, patterns.get(i))) {
                matches.add(i);
            }
        }
        return matches;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);

        int n = fs.nextInt();
        String[] queries = new String[n];
        for (int i = 0; i < n; i++) {
            queries[i] = fs.next();
        }

        int m = fs.nextInt();
        List<String> patterns = new ArrayList<>(m);
        for (int i = 0; i < m; i++) {
            patterns.add(fs.next());
        }

        for (String query : queries) {
            StringBuilder sb = new StringBuilder();
            for (int index : matchingPatterns(query, patterns)) {
                if (sb.length() > 0) {
                    sb.append(' ');
                }
                sb.append(index);
            }
            System.out.println(sb);
        }
    }
}
