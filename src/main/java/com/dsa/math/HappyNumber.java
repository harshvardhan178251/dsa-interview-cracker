package com.dsa.math;

import com.dsa.utils.FastScanner;

import java.util.HashSet;
import java.util.Set;

/**
 * Problem: Happy Number
 * LeetCode: 202 | Difficulty: Easy | Frequency: 3/5
 * Pattern: Number theory, Cycle detection
 *
 * <p>Problem:
 * A happy number is a number that reaches 1 when the digits are repeatedly replaced by
 * the sum of the squares of its digits. For example 19 gives 82, 68, 100, 1. Decide
 * whether a given number is happy.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 19
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * true
 * </pre>
 *
 * <p>Approach: repeatedly replace the number by the sum of the squares of its digits.
 * The sequence either reaches 1 or runs into a cycle, and a cycle is detected by
 * remembering every number that was already seen.
 *
 * <p>Complexity: Time O(log n) per step, Space O(log n) for the visited set.
 */
public class HappyNumber {

    /**
     * Returns whether {@code n} is a happy number.
     *
     * @param n the number to test
     * @return {@code true} when {@code n} reaches 1
     */
    public static boolean isHappy(int n) {
        Set<Integer> seen = new HashSet<>();
        while (n != 1 && seen.add(n)) {
            n = sumOfSquaredDigits(n);
        }
        return n == 1;
    }

    /**
     * Returns the sum of the squares of the digits of {@code n}.
     *
     * @param n a non-negative number
     * @return the sum of the squared digits
     */
    public static int sumOfSquaredDigits(int n) {
        int sum = 0;
        while (n > 0) {
            int digit = n % 10;
            sum += digit * digit;
            n /= 10;
        }
        return sum;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();

        System.out.println(isHappy(n) ? "true" : "false");
    }
}
