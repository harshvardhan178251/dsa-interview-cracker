package com.dsa.hashing;

import com.dsa.utils.FastScanner;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.TreeSet;

/**
 * Problem: Intersection of Two Arrays
 * LeetCode: 349 | Difficulty: Easy | Frequency: 3/5
 * Pattern: Hashing, Set intersection
 *
 * <p>Problem: Given two arrays, return the values that appear in **both** of them.
 * Every value is reported once and the result is sorted in ascending order.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * nums1[0] ... nums1[n-1]
 * m
 * nums2[0] ... nums2[m-1]
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 3
 * 4 9 5
 * 5
 * 9 4 9 8 4
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 4 9
 * </pre>
 *
 * <p>Approach: put the values of the first array into a hash set, then collect the
 * values of the second array that are in the set. A tree set keeps the result
 * duplicate-free and sorted.
 *
 * <p>Complexity: Time O(n + m log m), Space O(n).
 */
public class IntersectionOfTwoArrays {

    /**
     * Returns the distinct values that occur in both arrays, in ascending order.
     *
     * @param nums1 the first array
     * @param nums2 the second array
     * @return the intersection, ascending
     */
    public static List<Integer> intersection(int[] nums1, int[] nums2) {
        Set<Integer> values = new HashSet<>();
        for (int num : nums1) {
            values.add(num);
        }

        Set<Integer> common = new TreeSet<>(); // sorted and duplicate-free
        for (int num : nums2) {
            if (values.contains(num)) {
                common.add(num);
            }
        }
        return new ArrayList<>(common);
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] nums1 = fs.nextIntArray(n);
        int m = fs.nextInt();
        int[] nums2 = fs.nextIntArray(m);

        List<Integer> common = intersection(nums1, nums2);

        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < common.size(); i++) {
            if (i > 0) {
                sb.append(' ');
            }
            sb.append(common.get(i));
        }
        System.out.println(sb);
    }
}
