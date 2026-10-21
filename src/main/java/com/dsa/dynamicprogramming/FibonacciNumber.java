package com.dsa.dynamicprogramming;

import com.dsa.utils.FastScanner;

/**
 * Problem: Fibonacci Number
 * LeetCode: 509 | Difficulty: Easy | Frequency: 3/5
 * Pattern: Bottom-up DP, Iterative recurrence
 *
 * <p>Problem: Compute the {@code n}-th Fibonacci number, where {@code F(0) = 0}, {@code F(1) = 1} and {@code F(n) = F(n-1) + F(n-2)}.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 6
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 8
 * </pre>
 *
 * <p>Approach: Keep two variables holding `F(i-1)` and `F(i-2)` and shift them forward until the index is reached.
 *
 * <p>Complexity: Time O(n), Space O(1).
 */
public class FibonacciNumber {

    /**
     * Returns the {@code n}-th Fibonacci number.
     *
     * <p>{@code F(0) = 0}, {@code F(1) = 1} and {@code F(i) = F(i-1) + F(i-2)}. Only the last two
     * values are needed to produce the next one, so the table collapses into two variables.
     *
     * @param n index of the wanted Fibonacci number
     * @return {@code F(n)}
     */
    public static int fib(int n) {
        int prev2 = 0; // F(0)
        int prev1 = 1; // F(1)
        for (int i = 2; i <= n; i++) {
            int current = prev1 + prev2;
            prev2 = prev1;
            prev1 = current;
        }
        return n == 0 ? prev2 : prev1;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();

        System.out.println(fib(n));
    }
}
