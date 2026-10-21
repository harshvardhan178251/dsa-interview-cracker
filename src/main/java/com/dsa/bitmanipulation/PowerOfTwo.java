package com.dsa.bitmanipulation;

import com.dsa.utils.FastScanner;

/**
 * Problem: Power of Two
 * LeetCode: 231 | Difficulty: Easy | Frequency: 4/5
 * Pattern: Bit tricks
 *
 * <p>Problem:
 * Given an integer {@code n}, return {@code true} if it is a **power of two**, otherwise
 * return {@code false}.
 *
 * <p>A power of two has exactly one set bit in its binary representation. The trick is that
 * {@code n & (n - 1)} clears the lowest set bit, so for a power of two the result is exactly
 * {@code n - 1}, i.e. the AND is zero.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 16
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * true
 * </pre>
 *
 * <p>Complexity: Time O(1), Space O(1).
 */
public class PowerOfTwo {

    /**
     * Returns whether {@code n} is a power of two.
     *
     * @param n the value to test
     * @return {@code true} when {@code n} is 1, 2, 4, 8, ...
     */
    public static boolean isPowerOfTwo(int n) {
        // n > 0 rules out 0 and the negative numbers, which have no single set bit.
        return n > 0 && (n & (n - 1)) == 0;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();

        System.out.println(isPowerOfTwo(n));
    }
}
