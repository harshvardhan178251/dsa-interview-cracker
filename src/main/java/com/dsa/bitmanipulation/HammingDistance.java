package com.dsa.bitmanipulation;

import com.dsa.utils.FastScanner;

/**
 * Problem: Hamming Distance
 * LeetCode: 461 | Difficulty: Easy | Frequency: 4/5
 * Pattern: Bit tricks, XOR
 *
 * <p>Problem:
 * Given two integers {@code x} and {@code y}, return the **Hamming distance** — the number
 * of positions at which the corresponding bits of the two numbers differ.
 *
 * <p>Input format (stdin):
 * <pre>
 * x
 * y
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 1
 * 4
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 2
 * </pre>
 *
 * <p>Approach: XOR the two numbers — every differing bit becomes a {@code 1}. Then count the
 * set bits of the XOR with Kernighan's trick.
 *
 * <p>Complexity: Time O(32) = O(1), Space O(1).
 */
public class HammingDistance {

    /**
     * Returns the number of differing bits between {@code x} and {@code y}.
     *
     * @param x the first value
     * @param y the second value
     * @return the Hamming distance
     */
    public static int hammingDistance(int x, int y) {
        int differing = x ^ y;
        int count = 0;
        while (differing != 0) {
            differing &= differing - 1; // clear the lowest set bit
            count++;
        }
        return count;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int x = fs.nextInt();
        int y = fs.nextInt();

        System.out.println(hammingDistance(x, y));
    }
}
