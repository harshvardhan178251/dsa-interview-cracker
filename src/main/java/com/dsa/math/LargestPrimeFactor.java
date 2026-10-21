package com.dsa.math;

import com.dsa.utils.FastScanner;

/**
 * Problem: Largest Prime Factor
 * LeetCode: none | Difficulty: Medium | Frequency: 2/5
 * Pattern: Number theory, Trial division
 *
 * <p>Problem:
 * Return the largest prime factor of a number. When the number has no prime factor
 * (anything below 2) {@code -1} is returned.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 13195
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 29
 * </pre>
 *
 * <p>Approach: divide the number by every prime factor as often as possible and keep
 * the last factor that was removed. When the remaining value is bigger than one it is
 * itself the largest prime factor.
 *
 * <p>Complexity: Time O(sqrt(n)), Space O(1).
 */
public class LargestPrimeFactor {

    /**
     * Returns the largest prime factor of {@code n}.
     *
     * @param n the number to factorise
     * @return the largest prime factor, or {@code -1} when there is none
     */
    public static int largestPrimeFactor(int n) {
        if (n < 2) {
            return -1;
        }
        int largest = -1;
        int remaining = n;
        for (int factor = 2; (long) factor * factor <= remaining; factor++) {
            while (remaining % factor == 0) {
                largest = factor;
                remaining /= factor;
            }
        }
        if (remaining > 1) {
            largest = remaining;   // the leftover is prime and larger than every factor removed
        }
        return largest;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();

        System.out.println(largestPrimeFactor(n));
    }
}
