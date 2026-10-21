package com.dsa.math;

import com.dsa.utils.FastScanner;

/**
 * Problem: GCD and LCM
 * LeetCode: none | Difficulty: Easy | Frequency: 4/5
 * Pattern: Euclidean algorithm
 *
 * <p>Problem:
 * Given two positive integers, return their greatest common divisor and their least
 * common multiple.
 *
 * <p>Input format (stdin):
 * <pre>
 * a
 * b
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 12
 * 18
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 6 36
 * </pre>
 *
 * <p>Approach: the Euclidean algorithm replaces the pair {@code (a, b)} by
 * {@code (b, a % b)} until {@code b} becomes zero — the last non-zero value is the GCD.
 * The LCM follows from the identity {@code a * b = gcd * lcm}.
 *
 * <p>Complexity: Time O(log min(a, b)), Space O(1).
 */
public class GcdAndLcm {

    /**
     * Returns the greatest common divisor of {@code a} and {@code b}.
     *
     * @param a first number
     * @param b second number
     * @return the greatest common divisor
     */
    public static long gcd(long a, long b) {
        a = Math.abs(a);
        b = Math.abs(b);
        while (b != 0) {
            long remainder = a % b;
            a = b;
            b = remainder;
        }
        return a;
    }

    /**
     * Returns the least common multiple of {@code a} and {@code b}.
     *
     * @param a first number
     * @param b second number
     * @return the least common multiple
     */
    public static long lcm(long a, long b) {
        if (a == 0 || b == 0) {
            return 0;
        }
        long divisor = gcd(a, b);
        return Math.abs(a / divisor) * Math.abs(b);
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        long a = fs.nextLong();
        long b = fs.nextLong();

        System.out.println(gcd(a, b) + " " + lcm(a, b));
    }
}
