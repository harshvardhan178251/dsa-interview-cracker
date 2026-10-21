package com.dsa.sorting;

import com.dsa.utils.FastScanner;

/**
 * Problem: Counting Sort
 * LeetCode: null | Difficulty: Medium | Frequency: 3/5
 * Pattern: Non-comparison sort, Frequency counting
 *
 * <p>Problem: Sort an array of integers in ascending order with counting sort and
 * return the sorted array. Counting sort does not compare elements — it counts how
 * often each value occurs and then writes the values out in order.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * nums[0] nums[1] ... nums[n-1]
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 7
 * 4 2 2 8 3 3 1
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 1 2 2 3 3 4 8
 * </pre>
 *
 * <p>Approach: count the occurrences of every value into a frequency array indexed by
 * {@code value - min}, then walk the frequency array from left to right and write
 * each value as often as it was counted.
 *
 * <p>Complexity: Time O(n + k) where k is the range of the values, Space O(k).
 */
public class CountingSort {

    /**
     * Sorts {@code nums} in ascending order.
     *
     * @param nums the array to sort
     * @return a new, sorted array
     */
    public static int[] countingSort(int[] nums) {
        if (nums.length == 0) {
            return nums;
        }

        int min = nums[0];
        int max = nums[0];
        for (int num : nums) {
            min = Math.min(min, num);
            max = Math.max(max, num);
        }

        int[] counts = new int[max - min + 1];
        for (int num : nums) {
            counts[num - min]++;
        }

        int[] result = new int[nums.length];
        int index = 0;
        for (int bucket = 0; bucket < counts.length; bucket++) {
            while (counts[bucket] > 0) {
                result[index++] = bucket + min;
                counts[bucket]--;
            }
        }
        return result;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] nums = fs.nextIntArray(n);

        int[] sorted = countingSort(nums);

        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < sorted.length; i++) {
            if (i > 0) {
                sb.append(' ');
            }
            sb.append(sorted[i]);
        }
        System.out.println(sb);
    }
}
