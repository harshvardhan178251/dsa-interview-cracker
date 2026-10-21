package com.dsa.math;

import com.dsa.utils.FastScanner;

/**
 * Problem: Reverse Integer
 * LeetCode: 7 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Digit manipulation, Overflow check
 *
 * <p>Problem:
 * Reverse the digits of a signed 32-bit integer. When the reversed value does not fit
 * into a signed 32-bit integer, {@code 0} is returned.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * -123
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * -321
 * </pre>
 *
 * <p>Approach: pull the last digit off with {@code % 10} and append it to the result
 * with {@code result * 10 + digit}. The overflow is detected before it happens by
 * comparing the candidate result with the bounds of the 32-bit range.
 *
 * <p>Complexity: Time O(log n), Space O(1).
 */
public class ReverseInteger {

    /**
     * Reverses the digits of {@code x}.
     *
     * @param x the number to reverse
     * @return the reversed number, or {@code 0} when it does not fit into an int
     */
    public static int reverse(int x) {
        long result = 0;
        long value = x;
        while (value != 0) {
            result = result * 10 + value % 10;
            value /= 10;
        }
        if (result > Integer.MAX_VALUE || result < Integer.MIN_VALUE) {
            return 0;
        }
        return (int) result;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();

        System.out.println(reverse(n));
    }
}
