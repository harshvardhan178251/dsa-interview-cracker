package com.dsa.bitmanipulation;

import com.dsa.utils.FastScanner;

/**
 * Problem: Number of 1 Bits
 * LeetCode: 191 | Difficulty: Easy | Frequency: 4/5
 * Pattern: Bit tricks, Kernighan's algorithm
 *
 * <p>Problem:
 * Given an unsigned integer {@code n}, return the number of set bits (the number of {@code 1}
 * bits in its binary representation).
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 11
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 3
 * </pre>
 *
 * <p>Approach: Brian Kernighan's trick. The expression {@code n & (n - 1)} clears the lowest
 * set bit of {@code n}. Repeating it until {@code n} becomes zero counts the set bits — and
 * it runs once per set bit, not once per bit position.
 *
 * <p>Complexity: Time O(number of set bits), Space O(1).
 */
public class CountSetBits {

    /**
     * Returns the number of set bits in {@code n}.
     *
     * @param n the value to inspect
     * @return the population count
     */
    public static int countSetBits(int n) {
        int count = 0;
        while (n != 0) {
            n &= (n - 1); // clear the lowest set bit
            count++;
        }
        return count;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();

        System.out.println(countSetBits(n));
    }
}
