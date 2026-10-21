package com.dsa.hashing;

import com.dsa.utils.FastScanner;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashSet;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

/**
 * Problem: Find All Duplicates in an Array
 * LeetCode: 442 | Difficulty: Medium | Frequency: 3/5
 * Pattern: Hashing, Frequency counting
 *
 * <p>Problem: Given an array of integers where every value is between {@code 1} and
 * {@code n} ({@code n} is the length of the array), return all the values that
 * appear **more than once**, in ascending order.
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
 * 4 2 4 1 2
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 2 4
 * </pre>
 *
 * <p>Approach: a set remembers the values that were seen. A value that is already in
 * the set is a duplicate and is collected in a second set; the result is sorted
 * before it is printed.
 *
 * <p>Complexity: Time O(n log n) because of the final sort, Space O(n).
 */
public class FindAllDuplicatesInArray {

    /**
     * Returns every value that occurs more than once, in ascending order.
     *
     * @param nums the array to scan (values are between 1 and nums.length)
     * @return the duplicated values, ascending
     */
    public static List<Integer> findAllDuplicates(int[] nums) {
        Set<Integer> seen = new HashSet<>();
        Set<Integer> duplicates = new LinkedHashSet<>();

        for (int num : nums) {
            if (!seen.add(num)) {
                duplicates.add(num); // already present -> this is the second occurrence
            }
        }

        List<Integer> result = new ArrayList<>(duplicates);
        Collections.sort(result);
        return result;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] nums = fs.nextIntArray(n);

        List<Integer> duplicates = findAllDuplicates(nums);

        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < duplicates.size(); i++) {
            if (i > 0) {
                sb.append(' ');
            }
            sb.append(duplicates.get(i));
        }
        System.out.println(sb);
    }
}
