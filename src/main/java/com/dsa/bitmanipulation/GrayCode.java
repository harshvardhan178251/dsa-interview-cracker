package com.dsa.bitmanipulation;

import com.dsa.utils.FastScanner;

/**
 * Problem: Gray Code
 * LeetCode: 89 | Difficulty: Medium | Frequency: 3/5
 * Pattern: Bit tricks, XOR
 *
 * <p>Problem:
 * An {@code n}-bit Gray code is a sequence of {@code 2^n} integers that
 *
 * <ul>
 *   <li>contains every integer from {@code 0} to {@code 2^n - 1} exactly once, and</li>
 *   <li>has the property that consecutive entries differ in exactly one bit.</li>
 * </ul>
 *
 * <p>Given the bit width {@code n}, return the Gray code sequence of length {@code 2^n}.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 2
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 0 1 3 2
 * </pre>
 *
 * <p>Approach: the binary-reflected Gray code of {@code i} is {@code i ^ (i >> 1)}. XOR-ing
 * a number with its own right shift is what makes two consecutive entries differ in exactly
 * one bit.
 *
 * <p>Complexity: Time O(2^n), Space O(2^n).
 */
public class GrayCode {

    /**
     * Returns the {@code n}-bit Gray code sequence.
     *
     * @param n the bit width; the sequence has {@code 2^n} entries
     * @return the Gray code sequence
     */
    public static int[] grayCode(int n) {
        int size = 1 << n; // 2^n entries
        int[] result = new int[size];
        for (int i = 0; i < size; i++) {
            result[i] = i ^ (i >> 1);
        }
        return result;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();

        int[] answer = grayCode(n);
        StringBuilder out = new StringBuilder();
        for (int i = 0; i < answer.length; i++) {
            if (i > 0) {
                out.append(' ');
            }
            out.append(answer[i]);
        }
        System.out.println(out);
    }
}
