package com.dsa.arrays;

import com.dsa.utils.FastScanner;

import java.util.ArrayDeque;
import java.util.Deque;

/**
 * Problem: Maximum Width Ramp
 * LeetCode: 962 | Difficulty: Hard | Frequency: 2/5
 * Pattern: Monotonic stack, Two pointers
 *
 * <p>Problem:
 * Given an array {@code nums}, find the maximum {@code j - i} such that
 * {@code i <= j} and {@code nums[i] <= nums[j]}. If there is no such pair with
 * {@code i < j}, return 0.
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
 * 3 1 3 4 2
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 3
 * </pre>
 *
 * <p>Approach: build a decreasing stack of candidate left indices — only "prefix minima"
 * can be the left end of an optimal ramp, because a larger value to the left is always
 * dominated by a smaller one. Then scan {@code j} from right to left and pop every
 * candidate whose value is at most {@code nums[j]}; the rightmost such {@code j} gives
 * the widest ramp for that candidate.
 *
 * <p>Complexity: Time O(n), Space O(n).
 */
public class MaximumWidthRamp {

    /**
     * Returns the maximum width of a ramp.
     *
     * @param nums the input array
     * @return the largest {@code j - i} with {@code nums[i] <= nums[j]}, or 0
     */
    public static int maxWidthRamp(int[] nums) {
        int n = nums.length;
        if (n == 0) {
            return 0;
        }

        // decreasing stack of prefix-minimum indices
        Deque<Integer> candidates = new ArrayDeque<>();
        for (int i = 0; i < n; i++) {
            if (candidates.isEmpty() || nums[i] < nums[candidates.peek()]) {
                candidates.push(i);
            }
        }

        int best = 0;
        for (int j = n - 1; j >= 0; j--) {
            while (!candidates.isEmpty() && nums[candidates.peek()] <= nums[j]) {
                best = Math.max(best, j - candidates.pop());
            }
        }
        return best;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] nums = fs.nextIntArray(n);

        System.out.println(maxWidthRamp(nums));
    }
}
