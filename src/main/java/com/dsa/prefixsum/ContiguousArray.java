package com.dsa.prefixsum;

import com.dsa.utils.FastScanner;

import java.util.HashMap;
import java.util.Map;

/**
 * Problem: Contiguous Array
 * LeetCode: 525 | Difficulty: Medium | Frequency: 3/5
 * Pattern: Prefix sum with a hash map, Balance counting
 *
 * <p>Problem:
 * Given a binary array {@code nums}, return the length of the longest contiguous
 * subarray that contains an equal number of 0s and 1s.
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
 * 0 1 0 1 0 0
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 4
 * </pre>
 *
 * <p>Approach: treat every 0 as {@code -1} and every 1 as {@code +1}. A subarray has
 * equal numbers of zeros and ones exactly when its transformed sum is 0, which happens
 * when two prefix sums are equal. Remember the <em>first</em> index at which each prefix
 * sum occurred: the widest subarray for a given sum starts at that first index.
 *
 * <p>Complexity: Time O(n), Space O(n).
 */
public class ContiguousArray {

    /**
     * Returns the length of the longest subarray with an equal number of zeros and ones.
     *
     * @param nums the binary input array
     * @return the length of the longest balanced subarray
     */
    public static int findMaxLength(int[] nums) {
        Map<Integer, Integer> firstIndex = new HashMap<>();
        firstIndex.put(0, -1); // the empty prefix, so a subarray starting at 0 is found
        int balance = 0;
        int best = 0;
        for (int i = 0; i < nums.length; i++) {
            balance += (nums[i] == 1 ? 1 : -1);
            Integer first = firstIndex.get(balance);
            if (first == null) {
                firstIndex.put(balance, i);
            } else {
                best = Math.max(best, i - first);
            }
        }
        return best;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] nums = fs.nextIntArray(n);

        System.out.println(findMaxLength(nums));
    }
}
