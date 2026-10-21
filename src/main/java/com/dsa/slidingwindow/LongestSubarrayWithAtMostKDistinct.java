package com.dsa.slidingwindow;

import com.dsa.utils.FastScanner;

import java.util.HashMap;
import java.util.Map;

/**
 * Problem: Longest Subarray with At Most K Distinct
 * LeetCode: 340 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Sliding window, Frequency counting
 *
 * <p>Problem:
 * Given an array {@code nums} and an integer {@code k}, return the length of the longest
 * **contiguous** subarray in which at most {@code k} distinct values occur.
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
 * 2 1 2 2 3
 * 2
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 4
 * </pre>
 *
 * <p>Approach: slide a window, keep a map of the value frequencies inside it, and move the
 * left edge forward until the window holds at most {@code k} distinct values.
 *
 * <p>Complexity: Time O(n), Space O(k).
 */
public class LongestSubarrayWithAtMostKDistinct {

    /**
     * Returns the length of the longest subarray with at most {@code k} distinct values.
     *
     * @param nums the input array
     * @param k    the maximum number of distinct values allowed
     * @return the length of the longest valid subarray
     */
    public static int longestSubarray(int[] nums, int k) {
        Map<Integer, Integer> count = new HashMap<>();
        int left = 0;
        int best = 0;
        for (int right = 0; right < nums.length; right++) {
            count.merge(nums[right], 1, Integer::sum);
            while (count.size() > k) {
                int outgoing = nums[left];
                int remaining = count.merge(outgoing, -1, Integer::sum);
                if (remaining == 0) {
                    count.remove(outgoing);
                }
                left++;
            }
            best = Math.max(best, right - left + 1);
        }
        return best;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] nums = fs.nextIntArray(n);
        int k = fs.nextInt();

        System.out.println(longestSubarray(nums, k));
    }
}
