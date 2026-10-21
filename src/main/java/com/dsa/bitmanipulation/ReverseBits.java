package com.dsa.bitmanipulation;

import com.dsa.utils.FastScanner;

/**
 * Problem: Reverse Bits
 * LeetCode: 190 | Difficulty: Easy | Frequency: 4/5
 * Pattern: Bit tricks, Shifts
 *
 * <p>Problem:
 * Given an unsigned 32-bit integer {@code n}, reverse its binary representation and return
 * the resulting unsigned integer. The leading zeros of the input become the trailing zeros
 * of the output.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 43261596
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 964176192
 * </pre>
 *
 * <p>Approach: walk the 32 bits of {@code n} from the least significant end, appending each
 * bit to the result. Shifting the result left and OR-ing in the current bit builds the
 * reversed number. The result is kept in a {@code long} because a reversed 32-bit value can
 * exceed {@link Integer#MAX_VALUE}.
 *
 * <p>Complexity: Time O(32) = O(1), Space O(1).
 */
public class ReverseBits {

    /**
     * Reverses the 32-bit binary representation of {@code n}.
     *
     * @param n the value to reverse
     * @return the reversed value, as an unsigned 32-bit number
     */
    public static long reverseBits(int n) {
        long result = 0;
        for (int i = 0; i < 32; i++) {
            result = (result << 1) | (n & 1);
            n >>>= 1; // unsigned shift keeps the sign bit out of the way
        }
        return result;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();

        System.out.println(reverseBits(n));
    }
}
