package com.dsa.slidingwindow;

import com.dsa.utils.FastScanner;

/**
 * Problem: Minimum Number of Flips to Make the Binary String Alternating
 * LeetCode: 188 | Difficulty: Medium | Frequency: 3/5
 * Pattern: Sliding window, Counting
 *
 * <p>Problem:
 * Given a binary string {@code s}, return the **minimum number of characters to flip** so
 * that the string becomes alternating — that is, no two adjacent characters are equal.
 *
 * <p>Rotations are not allowed: the string itself must become alternating. (LeetCode 1888
 * adds a free rotation operation and is a different, harder problem.)
 *
 * <p>Input format (stdin):
 * <pre>
 * s
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 111000
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 2
 * </pre>
 *
 * <p>Approach: an alternating binary string is completely determined by its first character,
 * so there are exactly two candidates: {@code 010101...} and {@code 101010...}. Count the
 * mismatches against each and take the smaller count. Because the two candidates differ at
 * every position, the second count is simply {@code length - firstCount}.
 *
 * <p>Complexity: Time O(n), Space O(1).
 */
public class MinimumNumberOfFlips {

    /**
     * Returns the minimum number of flips needed to make {@code s} alternating.
     *
     * @param s a binary string
     * @return the minimum number of character flips
     */
    public static int minimumFlips(String s) {
        int flipsStartingWithZero = 0;
        for (int i = 0; i < s.length(); i++) {
            char expected = (i % 2 == 0) ? '0' : '1';
            if (s.charAt(i) != expected) {
                flipsStartingWithZero++;
            }
        }
        // The other pattern is the exact complement, so it mismatches everywhere the first one matches.
        int flipsStartingWithOne = s.length() - flipsStartingWithZero;
        return Math.min(flipsStartingWithZero, flipsStartingWithOne);
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        String s = fs.next();

        System.out.println(minimumFlips(s));
    }
}
