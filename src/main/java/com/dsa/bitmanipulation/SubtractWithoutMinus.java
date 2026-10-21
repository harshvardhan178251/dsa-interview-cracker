package com.dsa.bitmanipulation;

import com.dsa.utils.FastScanner;

/**
 * Problem: Subtract Two Integers without Minus
 * LeetCode: null | Difficulty: Medium | Frequency: 3/5
 * Pattern: Bit tricks, Borrow propagation
 *
 * <p>Problem:
 * Given two integers {@code a} and {@code b}, return {@code a - b} **without using the
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
 * 5
 * 3
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 2
 * </pre>
 *
 * <p>Approach: mirror the borrow of binary subtraction. {@code (~a & b)} marks the bit
 * positions where a borrow has to be produced (a has a 0 where b has a 1); shifting it left
 * moves the borrow to the next bit. {@code a ^ b} writes the difference bits. Repeating
 * until the borrow is zero finishes the subtraction.
 *
 * <p>Complexity: Time O(32) = O(1), Space O(1).
 */
public class SubtractWithoutMinus {

    /**
     * Returns {@code a - b} using only bitwise operators.
     *
     * @param a the minuend
     * @param b the subtrahend
     * @return the difference
     */
    public static int subtract(int a, int b) {
        while (b != 0) {
            int borrow = (~a & b) << 1; // positions that must borrow from the next bit
            a = a ^ b;                 // the difference bits
            b = borrow;                // propagate the borrow
        }
        return a;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int a = fs.nextInt();
        int b = fs.nextInt();

        System.out.println(subtract(a, b));
    }
}
