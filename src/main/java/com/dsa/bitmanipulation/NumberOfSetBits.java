package com.dsa.bitmanipulation;

import com.dsa.utils.FastScanner;

/**
 * Problem: Counting Bits
 * LeetCode: 338 | Difficulty: Easy | Frequency: 3/5
 * Pattern: Bit tricks, Dynamic programming
 *
 * <p>Problem:
 * Given a non-negative integer {@code n}, return an array {@code ans} of size {@code n + 1}
 * where {@code ans[i]} is the number of set bits in the binary representation of {@code i}.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 5
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 0 1 1 2 1 2
 * </pre>
 *
 * <p>Approach: {@code i} is either {@code 2k} (which just shifts {@code k} left, so it has
 * the same number of set bits) or {@code 2k + 1} (which adds one set bit to {@code k}).
 * Therefore {@code ans[i] = ans[i >> 1] + (i & 1)} — one pass, O(1) per value.
 *
 * <p>Complexity: Time O(n), Space O(n).
 */
public class NumberOfSetBits {

    /**
     * Returns the number of set bits for every value from {@code 0} to {@code n}.
     *
     * @param n the upper bound (inclusive)
     * @return an array of length {@code n + 1}
     */
    public static int[] countBits(int n) {
        int[] result = new int[n + 1];
        for (int i = 1; i <= n; i++) {
            result[i] = result[i >> 1] + (i & 1);
        }
        return result;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();

        int[] answer = countBits(n);
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
