package com.dsa.dynamicprogramming;

import com.dsa.utils.FastScanner;

/**
 * Problem: Jump Game II
 * LeetCode: 45 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Greedy + DP, Jump game
 *
 * <p>Problem: Given an array where each element is the maximum jump length at that position, return the minimum number of jumps needed to reach the last index.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * nums[0] nums[1] ... nums[n-1]
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 5
 * 2 3 1 1 4
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 2
 * </pre>
 *
 * <p>Approach: Sweep the array and remember the furthest index reachable with the jumps taken so far.
 *
 * <p>Complexity: Time O(n), Space O(1).
 */
public class MinimumJumpSteps {

    /**
     * Returns the minimum number of jumps needed to reach the last index of {@code nums}.
     *
     * <p>{@code currentEnd} is the last index that the jumps counted so far can reach;
     * {@code farthest} is the furthest index reachable with one more jump. Whenever the scan reaches
     * {@code currentEnd} a new jump is needed, so the counter grows and the window slides.
     *
     * @param nums maximum jump length at each position
     * @return the minimum number of jumps
     */
    public static int jump(int[] nums) {
        int jumps = 0;
        int currentEnd = 0; // the boundary the jumps taken so far can reach
        int farthest = 0;   // the boundary one more jump could reach

        for (int i = 0; i < nums.length - 1; i++) {
            farthest = Math.max(farthest, i + nums[i]);
            if (i == currentEnd) {
                jumps++;              // we ran out of the current window
                currentEnd = farthest; // the next window is one jump further
            }
        }
        return jumps;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] nums = fs.nextIntArray(n);

        System.out.println(jump(nums));
    }
}
