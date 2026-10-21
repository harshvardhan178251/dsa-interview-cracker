package com.dsa.greedy;

import com.dsa.utils.FastScanner;

/**
 * Problem: Jump Game
 * LeetCode: 55 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Greedy, Reach tracking
 *
 * <p>Problem:
 * You are given an integer array {@code nums}. From index {@code i} you may jump to any
 * index {@code j} with {@code i < j <= i + nums[i]}. Decide whether the last index
 * {@code nums.length - 1} can be reached starting from index 0.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * nums[0] nums[1] ... nums[n-1]
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 4
 * 2 3 1 1
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * true
 * </pre>
 *
 * <p>Approach: sweep left to right keeping {@code reach}, the furthest index that is
 * known to be reachable. When the sweep reaches an index {@code i > reach} that index is
 * unreachable — and so is everything after it — so the answer is {@code false}.
 * Otherwise extend {@code reach} to {@code max(reach, i + nums[i])}.
 *
 * <p>Complexity: Time O(n), Space O(1).
 */
public class JumpGame {

    /**
     * Returns whether the last index of {@code nums} is reachable from index 0.
     *
     * @param nums jump lengths, {@code nums[i]} is the maximum jump length from index i
     * @return {@code true} when the last index can be reached
     */
    public static boolean canJump(int[] nums) {
        if (nums == null || nums.length == 0) {
            return false;
        }
        int reach = 0;
        for (int i = 0; i < nums.length; i++) {
            if (i > reach) {
                return false;
            }
            reach = Math.max(reach, i + nums[i]);
            if (reach >= nums.length - 1) {
                return true;
            }
        }
        return reach >= nums.length - 1;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] nums = fs.nextIntArray(n);

        System.out.println(canJump(nums) ? "true" : "false");
    }
}
