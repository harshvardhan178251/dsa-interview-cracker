package com.dsa.backtracking;

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
            out.append('\n');
        }
        System.out.print(out);
    }
}
