package com.dsa.arrays;

import com.dsa.utils.FastScanner;

import java.util.HashMap;
import java.util.Map;

/**
 * Problem: Contains Duplicate II
 * LeetCode: 219 | Difficulty: Medium | Frequency: 3/5
 * Pattern: Hashing, Sliding distance window
 *
 * <p>Problem:
 * Given an integer array {@code nums} and an integer {@code k}, return {@code true} if
 * there exist two <em>distinct</em> indices {@code i} and {@code j} such that
 * {@code nums[i] == nums[j]} and {@code |i - j| <= k}. Otherwise return {@code false}.
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
 * 1 2 3 1 3
 * 3
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * true
 * </pre>
 *
 * <p>Approach: walk the array and remember, for every value, the index where it was last
 * seen. If the current value was already seen at distance at most {@code k}, we have a
 * duplicate. Only the <em>latest</em> occurrence matters: if the closest previous
 * occurrence is too far away, every older one is farther away too.
 *
 * <p>Complexity: Time O(n), Space O(n).
 */
public class ContainsDuplicateII {

    /**
     * Tells whether some duplicate pair lies within distance {@code k}.
     *
     * @param nums the input array
     * @param k    the maximum allowed index distance
     * @return {@code true} when a qualifying duplicate exists
     */
    public static boolean containsNearbyDuplicate(int[] nums, int k) {
        Map<Integer, Integer> lastSeen = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            Integer previous = lastSeen.get(nums[i]);
            if (previous != null && i - previous <= k) {
                return true;
            }
            lastSeen.put(nums[i], i);
        }
        return false;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] nums = fs.nextIntArray(n);
        int k = fs.nextInt();

        System.out.println(containsNearbyDuplicate(nums, k));
    }
}
