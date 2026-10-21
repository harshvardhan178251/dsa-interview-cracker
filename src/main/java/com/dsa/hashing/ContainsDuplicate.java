package com.dsa.hashing;

import com.dsa.utils.FastScanner;

import java.util.HashSet;
import java.util.Set;

/**
 * Problem: Contains Duplicate
 * LeetCode: 217 | Difficulty: Easy | Frequency: 4/5
 * Pattern: Hashing, Set membership
 *
 * <p>Problem: Given an array of integers, decide whether any value appears at least
 * twice.
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
 * 1 2 3 1
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * true
 * </pre>
 *
 * <p>Approach: walk the array and add every value to a hash set. The call
 * {@code set.add(value)} returns {@code false} when the value was already there —
 * that is the duplicate.
 *
 * <p>Complexity: Time O(n), Space O(n).
 */
public class ContainsDuplicate {

    /**
     * Returns {@code true} when {@code nums} contains the same value twice.
     *
     * @param nums the array to scan
     * @return {@code true} when a duplicate exists
     */
    public static boolean containsDuplicate(int[] nums) {
        Set<Integer> seen = new HashSet<>();
        for (int num : nums) {
            if (!seen.add(num)) {
                return true; // the value was already in the set
            }
        }
        return false;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] nums = fs.nextIntArray(n);

        System.out.println(containsDuplicate(nums));
    }
}
