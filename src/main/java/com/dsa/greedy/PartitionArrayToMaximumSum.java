package com.dsa.greedy;

import com.dsa.utils.FastScanner;

import java.util.PriorityQueue;

/**
 * Problem: Partition Array Into Maximum Subarrays
 * LeetCode: 813 | Difficulty: Medium | Frequency: 3/5
 * Pattern: Greedy, Keep the k largest
 *
 * <p>Problem:
 * Split {@code nums} into exactly {@code k} non-empty contiguous subarrays. The value of
 * a partition is the sum of the maximum element of every subarray. Return the largest
 * possible value.
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
 * 2
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 9
 * </pre>
 *
 * <p>Approach: the value of a partition is the sum of the maxima of its {@code k} parts,
 * so it can never exceed the sum of the {@code k} largest elements of the array — and
 * that bound is always reachable. A min-heap of size {@code k} keeps the {@code k}
 * largest values seen so far, so the running sum is the answer.
 *
 * <p>Complexity: Time O(n log k), Space O(k).
 */
public class PartitionArrayToMaximumSum {

    /**
     * Returns the largest possible sum of the maxima of the {@code k} parts.
     *
     * @param nums the array to split
     * @param k    number of contiguous parts, {@code 1 <= k <= nums.length}
     * @return the maximum sum of the part maxima
     */
    public static int maxSumToLength(int[] nums, int k) {
        if (nums == null || nums.length == 0 || k <= 0) {
            return 0;
        }
        if (k >= nums.length) {
            int all = 0;
            for (int x : nums) {
                all += x;
            }
            return all;
        }
        PriorityQueue<Integer> largest = new PriorityQueue<>();   // min-heap of the k biggest
        int sum = 0;
        for (int x : nums) {
            largest.add(x);
            sum += x;
            if (largest.size() > k) {
                sum -= largest.poll();
            }
        }
        return sum;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] nums = fs.nextIntArray(n);
        int k = fs.nextInt();

        System.out.println(maxSumToLength(nums, k));
    }
}
