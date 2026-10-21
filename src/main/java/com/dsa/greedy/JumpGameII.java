package com.dsa.greedy;

import com.dsa.utils.FastScanner;

/**
 * Problem: Jump Game II
 * LeetCode: 45 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Greedy, BFS by layers
 *
 * <p>Problem:
 * You are given an array {@code nums} where {@code nums[i]} is the maximum jump length
 * from index {@code i}. Return the **minimum** number of jumps needed to reach the last
 * index from index 0.
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
 * <p>Approach: think of the array as a graph where every index {@code i} connects to
 * {@code i+1 .. i+nums[i]}. A BFS over that graph visits the indices in increasing
 * number of jumps. The sweep below performs that BFS without a queue: {@code currentEnd}
 * is the boundary of the layer of indices reachable with the jumps counted so far and
 * {@code farthest} is the boundary of the next layer.
 *
 * <p>Complexity: Time O(n), Space O(1).
 */
public class JumpGameII {

    /**
     * Returns the minimum number of jumps needed to reach the last index.
     *
     * @param nums jump lengths, {@code nums[i]} is the maximum jump length from index i
     * @return the minimum number of jumps, {@code 0} when the last index is index 0
     */
    public static int minJumps(int[] nums) {
        if (nums == null || nums.length <= 1) {
            return 0;
        }
        int jumps = 0;
        int currentEnd = 0;   // last index reachable with {@code jumps} jumps
        int farthest = 0;     // last index reachable with {@code jumps + 1} jumps
        for (int i = 0; i < nums.length - 1; i++) {
            farthest = Math.max(farthest, i + nums[i]);
            if (i == currentEnd) {
                jumps++;
                currentEnd = farthest;
                if (currentEnd >= nums.length - 1) {
                    break;
                }
            }
        }
        return jumps;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] nums = fs.nextIntArray(n);

        System.out.println(minJumps(nums));
    }
}
