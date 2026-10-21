package com.dsa.dynamicprogramming;

import com.dsa.utils.FastScanner;

/**
 * Problem: Number of Partitions
 * LeetCode: n/a | Difficulty: Medium | Frequency: 3/5
 * Pattern: Counting DP, Unbounded knapsack
 *
 * <p>Problem: Count the ways to write `n` as a sum of positive integers where the order of the parts does not matter and every part size may be used any number of times.
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
 * 7
 * </pre>
 *
 * <p>Approach: Let the part size run from 1 to n and let the table count the ways to reach every sum using the part sizes seen so far.
 *
 * <p>Complexity: Time O(n^2), Space O(n).
 */
public class NumberOfPartitions {

    /**
     * Counts the unordered partitions of {@code n} into positive integers.
     *
     * <p>Each part size may be used any number of times, but the order of the parts must not create a
     * new partition. Processing the part sizes one by one guarantees that every partition is generated
     * exactly once.
     *
     * @param n the number to partition
     * @return the number of partitions of {@code n}
     */
    public static long countPartitions(int n) {
        long[] dp = new long[n + 1];
        dp[0] = 1; // one way to make 0: the empty partition

        for (int part = 1; part <= n; part++) {
            for (int sum = part; sum <= n; sum++) {
                dp[sum] += dp[sum - part];
            }
        }
        return dp[n];
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();

        System.out.println(countPartitions(n));
    }
}
