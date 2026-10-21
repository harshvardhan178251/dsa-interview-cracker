package com.dsa.hashing;

import com.dsa.utils.FastScanner;

import java.util.HashSet;
import java.util.Set;

/**
 * Problem: Longest Consecutive Sequence
 * LeetCode: 128 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Hashing, Run detection
 *
 * <p>Problem: Given an unsorted array of integers, return the length of the longest
 * sequence of consecutive integers it contains.
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
 * 100 4 200 1 3 2
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 4
 * </pre>
 *
 * <p>Approach: put the values into a hash set and only start counting a run at a
 * value whose predecessor is missing — otherwise the same run would be counted again
 * and again.
 *
 * <p>Complexity: Time O(n) on average, Space O(n).
 */
public class LongestConsecutiveSequence {

    /**
     * Returns the length of the longest consecutive sequence in {@code nums}.
     *
     * @param nums the input values
     * @return the length of the longest run of consecutive integers (0 for an empty array)
     */
    public static int longestConsecutiveSequence(int[] nums) {
        Set<Integer> values = new HashSet<>();
        for (int num : nums) {
            values.add(num);
        }

        int best = 0;
        for (int num : values) {
            if (values.contains(num - 1)) {
                continue; // not the beginning of a run — it was already counted
            }
            int length = 1;
            while (values.contains(num + length)) {
                length++;
            }
            best = Math.max(best, length);
        }
        return best;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] nums = fs.nextIntArray(n);

        System.out.println(longestConsecutiveSequence(nums));
    }
}
