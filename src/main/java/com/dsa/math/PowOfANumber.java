package com.dsa.math;

import com.dsa.utils.FastScanner;

/**
 * Problem: Pow(x, n)
 * LeetCode: 50 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Divide and conquer, Fast exponentiation
 *
 * <p>Problem:
 * Compute {@code x} raised to the power {@code n} without using the {@code Math.pow}
 * helper. A negative exponent means {@code 1 / x^|n|}.
 *
 * <p>Input format (stdin):
 * <pre>
 * x
 * n
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 2.5
 * 3
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 15.625
 * </pre>
 *
 * <p>Approach: binary exponentiation. Every round squares the base and halves the
 * exponent, so the number of rounds is {@code O(log |n|)} instead of {@code O(n)}.
 * A negative exponent is turned into a positive one by inverting the base.
 *
 * <p>Complexity: Time O(log |n|), Space O(1).
 */
public class PowOfANumber {

    /**
     * Computes {@code x} to the power of {@code n}.
     *
     * @param x the base
     * @param n the exponent
     * @return the value of {@code x^n}
     */
    public static double pow(double x, int n) {
        long exponent = n;
        if (exponent < 0) {
            x = 1.0 / x;
            exponent = -exponent;
        }
        double result = 1.0;
        double base = x;
        while (exponent > 0) {
            if ((exponent & 1L) == 1L) {
                result *= base;
            }
            base *= base;
            exponent >>= 1;
        }
        return result;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        double x = fs.nextDouble();
        int n = fs.nextInt();

        double result = pow(x, n);
        if (Double.isFinite(result) && result == Math.rint(result)
                && Math.abs(result) < 9.007199254740992E15) {
            System.out.println((long) result);   // print whole numbers without a decimal point
        } else {
            System.out.println(result);
        }
    }
}
