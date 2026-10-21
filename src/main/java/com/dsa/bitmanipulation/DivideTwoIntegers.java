package com.dsa.bitmanipulation;

import com.dsa.utils.FastScanner;

/**
 * Problem: Divide Two Integers
 * LeetCode: 29 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Bit tricks, Shifts
 *
 * <p>Problem:
 * Given two integers {@code dividend} and {@code divisor}, compute their integer quotient
 * **truncated toward zero** — the result must not round toward negative infinity. Division by
 * zero is not allowed, and the quotient must fit into a 32-bit signed integer.
 *
 * <p>Input format (stdin):
 * <pre>
 * dividend
 * divisor
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 10
 * 3
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 3
 * </pre>
 *
 * <p>Approach: work with absolute values in {@code long} arithmetic and shift-subtract. For
 * the current dividend, find the largest power of two of the divisor that still fits, subtract
 * it and add the matching power of two to the quotient. Repeat until the remainder is smaller
 * than the divisor, then restore the sign.
 *
 * <p>Complexity: Time O(32), Space O(1).
 */
public class DivideTwoIntegers {

    /**
     * Returns {@code dividend / divisor}, truncated toward zero.
     *
     * @param dividend the number being divided
     * @param divisor  the divisor (never zero)
     * @return the truncated quotient
     */
    public static int divide(int dividend, int divisor) {
        // The only case whose mathematical result overflows a 32-bit signed integer.
        if (dividend == Integer.MIN_VALUE && divisor == -1) {
            return Integer.MIN_VALUE;
        }
        boolean negative = (dividend < 0) ^ (divisor < 0);
        long a = Math.abs((long) dividend);
        long b = Math.abs((long) divisor);

        long quotient = 0;
        while (a >= b) {
            long chunk = b;
            long multiple = 1;
            // Find the biggest 2^k * b that still fits into the remainder.
            while (a >= (chunk << 1)) {
                chunk <<= 1;
                multiple <<= 1;
            }
            a -= chunk;
            quotient += multiple;
        }
        return (int) (negative ? -quotient : quotient);
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int dividend = fs.nextInt();
        int divisor = fs.nextInt();

        System.out.println(divide(dividend, divisor));
    }
}
