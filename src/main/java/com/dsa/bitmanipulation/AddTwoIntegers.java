package com.dsa.bitmanipulation;

import com.dsa.utils.FastScanner;

/**
 * Problem: Sum of Two Integers
 * LeetCode: 371 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Bit tricks, Addition without the + operator
 *
 * <p>Problem:
 * Given two integers {@code a} and {@code b}, return their sum **without using the
 * {@code +} or {@code -} operators**.
 *
 * <p>Input format (stdin):
 * <pre>
 * a
 * b
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 2
 * 3
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 5
 * </pre>
 *
 * <p>Approach: bitwise addition without a carry is {@code a ^ b}; the carry bits are
 * {@code (a & b) << 1}. Add the carry back in and repeat until the carry is zero. Because
 * the carry only ever moves left, the loop runs at most 32 times.
 *
 * <p>Complexity: Time O(32) = O(1), Space O(1).
 */
public class AddTwoIntegers {

    /**
     * Returns {@code a + b} using only bitwise operators.
     *
     * @param a the first addend
     * @param b the second addend
     * @return the sum
     */
    public static int add(int a, int b) {
        while (b != 0) {
            int carry = (a & b) << 1; // the places where both addends have a 1
            a = a ^ b;                // the sum bits, without the carry
            b = carry;                // fold the carry back in
        }
        return a;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int a = fs.nextInt();
        int b = fs.nextInt();

        System.out.println(add(a, b));
    }
}
