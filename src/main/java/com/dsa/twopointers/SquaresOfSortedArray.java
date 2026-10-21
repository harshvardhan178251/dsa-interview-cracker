package com.dsa.twopointers;

import com.dsa.utils.FastScanner;

/**
 * Problem: Squares of a Sorted Array
 * LeetCode: 977 | Difficulty: Easy | Frequency: 4/5
 * Pattern: Two pointers, Sorted array
 *
 * <p>Problem:
 * Given an integer array {@code nums} sorted in non-decreasing order, return an array of
 * the **squares** of the numbers, also in non-decreasing order.
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
 * -4 -1 0 3 10
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 0 1 9 16 100
 * </pre>
 *
 * <p>Approach: the biggest square always comes from one of the two ends - the most
 * negative number or the largest number. Two pointers walk inwards from both ends and
 * fill the result **from the back**, which keeps the result sorted without sorting it.
 *
 * <p>Complexity: Time O(n), Space O(n) for the result.
 */
public class SquaresOfSortedArray {

    /**
     * Returns the squares of {@code nums} in non-decreasing order.
     *
     * @param nums a sorted input array
     * @return the sorted squares
     */
    public static int[] sortedSquares(int[] nums) {
        if (nums == null || nums.length == 0) {
            return new int[0];
        }

        int n = nums.length;
        int[] result = new int[n];
        int left = 0;
        int right = n - 1;
        int write = n - 1;

        while (left <= right) {
            int leftSquare = nums[left] * nums[left];
            int rightSquare = nums[right] * nums[right];
            if (leftSquare > rightSquare) {
                result[write--] = leftSquare;
                left++;
            } else {
                result[write--] = rightSquare;
                right--;
            }
        }
        return result;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] nums = fs.nextIntArray(n);

        int[] answer = sortedSquares(nums);
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < answer.length; i++) {
            if (i > 0) {
                sb.append(' ');
            }
            sb.append(answer[i]);
        }
        System.out.println(sb);
    }
}
