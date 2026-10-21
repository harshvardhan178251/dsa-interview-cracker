package com.dsa.prefixsum;

import com.dsa.utils.FastScanner;

/**
 * Problem: Range Sum Query — Immutable
 * LeetCode: 303 | Difficulty: Easy | Frequency: 3/5
 * Pattern: Prefix sums, O(1) range queries
 *
 * <p>Problem:
 * Given an immutable integer array {@code nums}, answer {@code q} range-sum queries.
 * A query {@code (left, right)} asks for the sum of {@code nums[left..right]} with both
 * ends inclusive.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * nums[0] nums[1] ... nums[n-1]
 * q
 * left right
 * left right
 * ...
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 8
 * -2 0 3 -5 2 -1 5 3
 * 3
 * 0 2
 * 2 5
 * 1 4
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 1
 * -1
 * 0
 * </pre>
 *
 * <p>Approach: build a prefix-sum table where {@code prefix[i]} is the sum of the first
 * {@code i} elements. The sum of a range is then
 * {@code prefix[right + 1] - prefix[left]}: subtract everything before the range from
 * everything up to the end of the range.
 *
 * <p>Complexity: Preprocessing O(n), each query O(1), Space O(n).
 */
public class RangeSumQuery {

    /**
     * Builds the prefix-sum table for the given array.
     *
     * @param nums the input array
     * @return a table of length {@code nums.length + 1}
     */
    public static int[] buildPrefix(int[] nums) {
        int[] prefix = new int[nums.length + 1];
        for (int i = 0; i < nums.length; i++) {
            prefix[i + 1] = prefix[i] + nums[i];
        }
        return prefix;
    }

    /**
     * Returns the sum of {@code nums[left..right]} (both ends inclusive).
     *
     * @param prefix the table produced by {@link #buildPrefix(int[])}
     * @param left   inclusive start index
     * @param right  inclusive end index
     * @return the range sum
     */
    public static int rangeSum(int[] prefix, int left, int right) {
        return prefix[right + 1] - prefix[left];
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] nums = fs.nextIntArray(n);
        int q = fs.nextInt();

        int[] prefix = buildPrefix(nums);
        StringBuilder out = new StringBuilder();
        for (int i = 0; i < q; i++) {
            int left = fs.nextInt();
            int right = fs.nextInt();
            if (i > 0) {
                out.append('\n');
            }
            out.append(rangeSum(prefix, left, right));
        }
        System.out.println(out);
    }
}
