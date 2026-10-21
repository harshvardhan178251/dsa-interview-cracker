package com.dsa.math;

import com.dsa.utils.FastScanner;

/**
 * Problem: Count Primes
 * LeetCode: 204 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Number theory, Sieve of Eratosthenes
 *
 * <p>Problem:
 * Count the prime numbers that are smaller than or equal to {@code n}.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 20
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 8
 * </pre>
 *
 * <p>Approach: the sieve marks every multiple of a prime as composite. Starting from
 * {@code p * p} is safe because the smaller multiples have already been crossed out by
 * a smaller prime.
 *
 * <p>Complexity: Time O(n log log n), Space O(n).
 */
public class SieveOfEratosthenes {

    /**
     * Counts the primes that are smaller than or equal to {@code n}.
     *
     * @param n the upper bound
     * @return the number of primes {@code <= n}
     */
    public static int countPrimes(int n) {
        if (n < 2) {
            return 0;
        }
        boolean[] composite = new boolean[n + 1];
        int count = 0;
        for (int i = 2; i <= n; i++) {
            if (composite[i]) {
                continue;
            }
            count++;
            for (int multiple = i * i; multiple <= n; multiple += i) {
                composite[multiple] = true;
            }
        }
        return count;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();

        System.out.println(countPrimes(n));
    }
}
