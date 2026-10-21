package com.dsa.prefixsum;

import com.dsa.utils.FastScanner;

import java.util.HashMap;
import java.util.Map;

/**
 * Problem: Pairs With a Target Sum
 * LeetCode: 1674 | Difficulty: Medium | Frequency: 2/5
 * Pattern: Hashing, Complement counting
 *
 * <p>Problem:
 * Given an integer array {@code nums} and an integer {@code target}, return the number of
 * index pairs {@code (i, j)} with {@code i < j} and {@code nums[i] + nums[j] == target}.
 * Pairs are counted by position, so duplicate values create multiple pairs.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * nums[0] nums[1] ... nums[n-1]
 * target
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 4
 * 1 2 3 4
 * 5
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 2
 * </pre>
 *
 * <p>Approach: walk the array once and keep a frequency map of the values already seen.
 * For each value {@code v}, every earlier occurrence of {@code target - v} forms one new
 * pair, so we add that frequency to the answer. The value is only inserted into the map
 * <em>after</em> the lookup, which guarantees {@code i < j} and prevents pairing an
 * element with itself.
 *
 * <p>Complexity: Time O(n), Space O(n).
 */
public class PairsWithTargetSum {

    /**
     * Counts the index pairs whose values add up to {@code target}.
     *
     * @param nums   the input array
     * @param target the required sum
     * @return the number of pairs
     */
    public static int countPairs(int[] nums, int target) {
        Map<Integer, Integer> frequency = new HashMap<>();
        int pairs = 0;
        for (int value : nums) {
            Integer seen = frequency.get(target - value);
            if (seen != null) {
                pairs += seen;
            }
            frequency.merge(value, 1, Integer::sum);
        }
        return pairs;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] nums = fs.nextIntArray(n);
        int target = fs.nextInt();

        System.out.println(countPairs(nums, target));
    }
}
