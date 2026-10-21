package com.dsa.math;

import com.dsa.utils.FastScanner;

/**
 * Problem: Perfect Number
 * LeetCode: 507 | Difficulty: Easy | Frequency: 3/5
 * Pattern: Number theory, Divisor pairs
 *
 * <p>Problem:
 * A perfect number equals the sum of its proper divisors (all divisors except itself).
 * Decide whether a number is perfect.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 28
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * true
 * </pre>
 *
 * <p>Approach: the divisors come in pairs {@code (d, n / d)}, so it is enough to walk
 * up to the square root and add both members of every pair — the square root is only
 * counted once.
 *
 * <p>Complexity: Time O(sqrt(n)), Space O(1).
 */
public class PerfectNumber {

    /**
     * Returns whether {@code n} is a perfect number.
     *
     * @param n the number to test
     * @return {@code true} when the proper divisors of {@code n} add up to {@code n}
     */
    public static boolean isPerfect(int n) {
        if (n <= 1) {
            return false;
        }
        int sum = 1;   // 1 is a proper divisor of every number above 1
        for (int d = 2; (long) d * d <= n; d++) {
            if (n % d == 0) {
                sum += d;
                int other = n / d;
                if (other != d) {
                    sum += other;
                }
            }
        }
        return sum == n;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();

        System.out.println(isPerfect(n) ? "true" : "false");
    }
}
