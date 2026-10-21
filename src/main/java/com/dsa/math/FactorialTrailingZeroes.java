package com.dsa.math;

import com.dsa.utils.FastScanner;

/**
 * Problem: Factorial Trailing Zeroes
 * LeetCode: 172 | Difficulty: Easy | Frequency: 3/5
 * Pattern: Number theory, Counting factors
 *
 * <p>Problem:
 * How many trailing zeroes does {@code n!} have? A trailing zero comes from a factor
 * of 10, and every 10 needs one 2 and one 5 — a factorial always has more 2s than 5s,
 * so only the 5s matter.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 25
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 6
 * </pre>
 *
 * <p>Approach: the number of factors of 5 in {@code n!} is
 * {@code n/5 + n/25 + n/125 + ...}. Dividing by 5 repeatedly and adding the quotients
 * counts every factor of 5 exactly once.
 *
 * <p>Complexity: Time O(log n), Space O(1).
 */
public class FactorialTrailingZeroes {

    /**
     * Returns the number of trailing zeroes of {@code n!}.
     *
     * @param n the factorial argument, {@code n >= 0}
     * @return the number of trailing zeroes
     */
    public static int trailingZeroes(int n) {
        int zeroes = 0;
        while (n > 0) {
            n /= 5;
            zeroes += n;
        }
        return zeroes;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();

        System.out.println(trailingZeroes(n));
    }
}
