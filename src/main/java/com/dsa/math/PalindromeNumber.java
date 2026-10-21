package com.dsa.math;

import com.dsa.utils.FastScanner;

/**
 * Problem: Palindrome Number
 * LeetCode: 9 | Difficulty: Easy | Frequency: 4/5
 * Pattern: Digit manipulation, Half reversal
 *
 * <p>Problem:
 * Decide whether a non-negative integer reads the same forwards and backwards.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 121
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * true
 * </pre>
 *
 * <p>Approach: reverse the digits one by one and stop as soon as the reversed prefix
 * catches up with the remaining suffix — at that point the two halves can be compared
 * directly. For an odd number of digits the middle digit belongs to neither half, so
 * the reversed half is divided by ten before the comparison.
 *
 * <p>Complexity: Time O(log n), Space O(1).
 */
public class PalindromeNumber {

    /**
     * Returns whether {@code n} is a palindrome.
     *
     * @param n the number to test
     * @return {@code true} when the digits read the same in both directions
     */
    public static boolean isPalindrome(int n) {
        if (n < 0 || (n % 10 == 0 && n != 0)) {
            return false;   // a negative number has a leading '-', a trailing zero has no partner
        }
        int reverted = 0;
        int remaining = n;
        while (remaining > reverted) {
            reverted = reverted * 10 + remaining % 10;
            remaining /= 10;
        }
        return remaining == reverted || remaining == reverted / 10;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();

        System.out.println(isPalindrome(n) ? "true" : "false");
    }
}
