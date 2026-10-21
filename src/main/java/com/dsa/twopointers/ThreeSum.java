package com.dsa.twopointers;

import com.dsa.utils.FastScanner;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * Problem: 3Sum
 * LeetCode: 15 | Difficulty: Medium | Frequency: 5/5
 * Pattern: Two pointers, Sorting, Duplicate skipping
 *
 * <p>Problem:
 * Given an integer array {@code nums}, return all the **unique** triplets
 * {@code [nums[i], nums[j], nums[k]]} that sum to zero. The solution set must not
 * contain duplicate triplets and the order of the triplets and of the numbers inside
 * them may vary.
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
 * -1 0 1 2 -1 -4
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * -1 -1 2
 * -1 0 1
 * </pre>
 *
 * <p>Approach: sort the array, then fix the first element and look for the other two
 * with two pointers. Duplicates are skipped on all three levels so that every triplet
 * is reported exactly once.
 *
 * <p>Complexity: Time O(n²), Space O(n) for the sort.
 */
public class ThreeSum {

    /**
     * Returns all unique triplets that sum to zero.
     *
     * @param nums the input array
     * @return the triplets, each in ascending order
     */
    public static List<int[]> threeSum(int[] nums) {
        List<int[]> answer = new ArrayList<>();
        if (nums == null || nums.length < 3) {
            return answer;
        }

        int[] sorted = nums.clone();
        Arrays.sort(sorted);

        for (int i = 0; i < sorted.length - 2; i++) {
            // Skip duplicate first elements.
            if (i > 0 && sorted[i] == sorted[i - 1]) {
                continue;
            }
            int left = i + 1;
            int right = sorted.length - 1;
            while (left < right) {
                int sum = sorted[i] + sorted[left] + sorted[right];
                if (sum < 0) {
                    left++;
                } else if (sum > 0) {
                    right--;
                } else {
                    answer.add(new int[]{sorted[i], sorted[left], sorted[right]});
                    // Skip duplicates on both ends.
                    while (left < right && sorted[left] == sorted[left + 1]) {
                        left++;
                    }
                    while (left < right && sorted[right] == sorted[right - 1]) {
                        right--;
                    }
                    left++;
                    right--;
                }
            }
        }
        return answer;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] nums = fs.nextIntArray(n);

        for (int[] triplet : threeSum(nums)) {
            System.out.println(triplet[0] + " " + triplet[1] + " " + triplet[2]);
        }
    }
}
