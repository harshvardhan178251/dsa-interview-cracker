package com.dsa.arrays;

import com.dsa.utils.FastScanner;

import java.util.Arrays;

/**
 * Problem: Maximum Gap
 * LeetCode: 164 | Difficulty: Hard | Frequency: 2/5
 * Pattern: Bucket sort, Pigeonhole bound
 *
 * <p>Problem:
 * Given an unsorted integer array {@code nums}, return the largest gap between two
 * consecutive elements <em>after the array is sorted</em>. The gap is measured as the
 * difference between the two values.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * nums[0] nums[1] ... nums[n-1]
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 6
 * 3 6 9 1 12 5
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 3
 * </pre>
 *
 * <p>Approach: sorting gives O(n log n). The linear bucket approach uses a pigeonhole
 * argument: the average gap is {@code (max - min) / (n - 1)}, so the answer is at least
 * that large, and therefore the two ends of the largest gap cannot sit in the same
 * bucket. Bucketing the values with a bucket width of that average keeps at most n
 * buckets, and the answer is the largest distance between the maximum of one bucket and
 * the minimum of the next non-empty bucket.
 *
 * <p>Complexity: Time O(n), Space O(n).
 */
public class MaxGap {

    /**
     * Returns the largest gap between consecutive values of the sorted array.
     *
     * @param nums the unsorted input array
     * @return the maximum gap
     */
    public static int maxGap(int[] nums) {
        int n = nums.length;
        if (n < 2) {
            return 0;
        }
        int min = Integer.MAX_VALUE;
        int max = Integer.MIN_VALUE;
        for (int value : nums) {
            min = Math.min(min, value);
            max = Math.max(max, value);
        }
        if (min == max) {
            return 0;
        }

        // bucket width = ceil((max - min) / (n - 1)) so that there are at most n buckets
        int bucketSize = (max - min + n - 2) / (n - 1);
        if (bucketSize < 1) {
            bucketSize = 1;
        }
        int bucketCount = (max - min) / bucketSize + 1;

        int[] bucketMin = new int[bucketCount];
        int[] bucketMax = new int[bucketCount];
        Arrays.fill(bucketMin, Integer.MAX_VALUE);
        Arrays.fill(bucketMax, Integer.MIN_VALUE);

        for (int value : nums) {
            int index = (value - min) / bucketSize;
            bucketMin[index] = Math.min(bucketMin[index], value);
            bucketMax[index] = Math.max(bucketMax[index], value);
        }

        int maxGap = 0;
        int previousMax = Integer.MIN_VALUE;
        for (int i = 0; i < bucketCount; i++) {
            if (bucketMin[i] == Integer.MAX_VALUE) {
                continue; // empty bucket
            }
            if (previousMax != Integer.MIN_VALUE) {
                maxGap = Math.max(maxGap, bucketMin[i] - previousMax);
            }
            previousMax = bucketMax[i];
        }
        return maxGap;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] nums = fs.nextIntArray(n);

        System.out.println(maxGap(nums));
    }
}
