package com.dsa.arrays;

import com.dsa.utils.FastScanner;

import java.util.HashMap;
import java.util.Map;

/**
 * Problem: Two Sum
 * LeetCode: 1 | Difficulty: Easy | Frequency: 5/5
 * Pattern: Hashing, One-pass lookup
 *
 * <p>Problem:
 * Given an array of integers {@code nums} and an integer {@code target}, return the indices of
 * the two numbers such that they add up to {@code target}. Each input has exactly one answer,
 * and the same element may not be used twice. Return {@code {-1, -1}} when no pair exists.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * nums[0] nums[1] ... nums[n-1]
 * target
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 4
 * 2 7 11 15
 * 9
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 0 1
 * </pre>
 *
 * <p>Approach: walk the array once, keeping a map of values already seen. For each element
 * look up {@code target - nums[i]}; if it is present we have found the pair. The map holds the
 * value seen most recently, so with duplicate values the answer uses the latest occurrence.
 *
 * <p>Complexity: Time O(n), Space O(n).
 */
public class TwoSum {

    /**
     * Returns the indices of the two numbers adding up to {@code target}.
     *
     * @param nums   input array
     * @param target the required sum
     * @return {@code {i, j}} with {@code i < j}, or {@code {-1, -1}} when no pair exists
     */
    public static int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> seen = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            Integer j = seen.get(complement);
            if (j != null) {
                return new int[]{j, i};
            }
            seen.put(nums[i], i);
        }
        return new int[]{-1, -1};
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] nums = fs.nextIntArray(n);
        int target = fs.nextInt();

        int[] answer = twoSum(nums, target);
        System.out.println(answer[0] + " " + answer[1]);
    }
}
