package com.dsa.math;

import com.dsa.utils.FastScanner;

/**
 * Problem: Ugly Number
 * LeetCode: 313 | Difficulty: Medium | Frequency: 3/5
 * Pattern: Dynamic programming, Three pointers
 *
 * <p>Problem:
 * An ugly number is a positive integer whose only prime factors are 2, 3 and 5. The
 * sequence starts {@code 1, 2, 3, 4, 5, 6, 8, 9, 10, 12, ...}. Return the n-th ugly
 * number (1-indexed).
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 10
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 12
 * </pre>
 *
 * <p>Approach: every ugly number is {@code 2 * u}, {@code 3 * u} or {@code 5 * u} for
 * an earlier ugly number {@code u}. Three pointers walk through the sequence and the
 * smallest of the three candidates is the next ugly number; every pointer that
 * produced it is moved forward so that no duplicate is emitted.
 *
 * <p>Complexity: Time O(n), Space O(n).
 */
public class UglyNumber {

    /**
     * Returns the n-th ugly number.
     *
     * @param n the 1-based index, {@code n >= 1}
     * @return the n-th ugly number, {@code 0} when {@code n < 1}
     */
    public static int nthUglyNumber(int n) {
        if (n <= 0) {
            return 0;
        }
        long[] ugly = new long[n];
        ugly[0] = 1;
        int i2 = 0;
        int i3 = 0;
        int i5 = 0;
        for (int i = 1; i < n; i++) {
            long next = Math.min(ugly[i2] * 2, Math.min(ugly[i3] * 3, ugly[i5] * 5));
            ugly[i] = next;
            if (next == ugly[i2] * 2) {
                i2++;
            }
            if (next == ugly[i3] * 3) {
                i3++;
            }
            if (next == ugly[i5] * 5) {
                i5++;
            }
        }
        return (int) ugly[n - 1];
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();

        System.out.println(nthUglyNumber(n));
    }
}
