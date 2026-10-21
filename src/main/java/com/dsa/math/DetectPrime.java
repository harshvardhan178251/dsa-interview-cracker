package com.dsa.math;

import com.dsa.utils.FastScanner;

/**
 * Problem: Is a Number Prime
 * LeetCode: none | Difficulty: Medium | Frequency: 3/5
 * Pattern: Number theory, Trial division
 *
 * <p>Problem:
 * Decide whether a given integer is a prime number.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 97
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * true
 * </pre>
 *
 * <p>Approach: a composite number always has a divisor of at most its square root, so
 * it is enough to try the divisors up to {@code sqrt(n)}. The candidates are the odd
 * numbers only, and the loop stops as soon as {@code d * d > n}.
 *
 * <p>Complexity: Time O(sqrt(n)), Space O(1).
 */
public class DetectPrime {

    /**
     * Returns whether {@code n} is prime.
     *
     * @param n the number to test
     * @return {@code true} when {@code n} is a prime number
     */
    public static boolean isPrime(int n) {
        if (n < 2) {
            return false;
        }
        if (n % 2 == 0) {
            return n == 2;
        }
        for (int d = 3; (long) d * d <= n; d += 2) {
            if (n % d == 0) {
                return false;
            }
        }
        return true;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();

        System.out.println(isPrime(n) ? "true" : "false");
    }
}
