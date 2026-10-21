package com.dsa.prefixsum;

import com.dsa.utils.FastScanner;

import java.util.HashMap;
import java.util.Map;

/**
 * Problem: Subarray Sum Equals K
 * LeetCode: 560 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Prefix sums with a hash map
 *
 * <p>Problem:
 * Given an integer array {@code nums} and an integer {@code k}, return the total number of
 * continuous subarrays whose sum equals {@code k}.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * nums[0] nums[1] ... nums[n-1]
 * k
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 5
 * 1 2 3 4 5
 * 3
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 2
 * </pre>
 *
 * <p>Approach: if the running prefix sum at position {@code i} is {@code s}, then every
 * earlier prefix sum equal to {@code s - k} closes exactly one subarray that sums to
 * {@code k}. A map from prefix sum to how many times it occurred gives the number of
 * such endings; the map is seeded with {@code 0 -> 1} so that subarrays starting at
 * index 0 are counted too.
 *
 * <p>Complexity: Time O(n), Space O(n).
 */
public class SubarraySumEqualsK {

    /**
     * Counts the subarrays whose sum equals {@code k}.
     *
     * @param nums the input array
     * @param k    the required sum
     * @return the number of matching subarrays
     */
    public static int subarraySum(int[] nums, int k) {
        Map<Integer, Integer> seen = new HashMap<>();
        seen.put(0, 1); // the empty prefix
        int sum = 0;
        int count = 0;
        for (int value : nums) {
            sum += value;
            Integer matches = seen.get(sum - k);
            if (matches != null) {
                count += matches;
            }
            seen.merge(sum, 1, Integer::sum);
        }
        return count;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] nums = fs.nextIntArray(n);
        int k = fs.nextInt();

        System.out.println(subarraySum(nums, k));
    }
}
