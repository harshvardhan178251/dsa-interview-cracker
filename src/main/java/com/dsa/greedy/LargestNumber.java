package com.dsa.greedy;

import com.dsa.utils.FastScanner;

import java.util.Arrays;

/**
 * Problem: Largest Number
 * LeetCode: 179 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Greedy, Custom comparator
 *
 * <p>Problem:
 * Given an array of non-negative integers, arrange them so that they form the largest
 * possible number and return that number as a string.
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
 * 10 2 9 3
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 93210
 * </pre>
 *
 * <p>Approach: for two candidate strings {@code a} and {@code b}, {@code a} must come
 * first exactly when {@code a + b} is larger than {@code b + a}. The comparator
 * therefore puts {@code a} in front when {@code b + a} is smaller than {@code a + b}.
 * Sorting with that comparator yields the maximum concatenation. Numbers that compare
 * equal under {@code a + b == b + a} (such as {@code "3"} and {@code "33"}) are
 * interchangeable.
 *
 * <p>Complexity: Time O(n log n * L), Space O(n * L) where L is the number of digits.
 */
public class LargestNumber {

    /**
     * Returns the largest number that can be formed from the given values.
     *
     * @param nums non-negative integers
     * @return the largest number as a string
     */
    public static String largestNumber(int[] nums) {
        if (nums == null || nums.length == 0) {
            return "";
        }
        String[] parts = new String[nums.length];
        for (int i = 0; i < nums.length; i++) {
            parts[i] = String.valueOf(nums[i]);
        }
        Arrays.sort(parts, (a, b) -> (b + a).compareTo(a + b));
        if (parts[0].equals("0")) {
            return "0";   // every number is zero
        }
        StringBuilder sb = new StringBuilder();
        for (String part : parts) {
            sb.append(part);
        }
        return sb.toString();
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] nums = fs.nextIntArray(n);

        System.out.println(largestNumber(nums));
    }
}
