package com.dsa.heaps;

import com.dsa.utils.FastScanner;
import com.dsa.utils.MaxHeap;

/**
 * Problem: Median of Two Sorted Arrays
 * LeetCode: 4 | Difficulty: Hard | Frequency: 5/5
 * Pattern: K-way merge, Bounded heap, Order statistics
 *
 * <p>Problem:
 * Given two sorted integer arrays {@code nums1} and {@code nums2}, return the median of
 * the combined arrays.
 *
 * <p>Input format (stdin):
 * <pre>
 * m
 * nums1[0] nums1[1] ... nums1[m-1]
 * n
 * nums2[0] nums2[1] ... nums2[n-1]
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 2
 * 1 3
 * 1
 * 2
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 2.0
 * </pre>
 *
 * <p>Approach: the two arrays are merged with two pointers and the merged values are fed
 * into a max-heap that is capped at {@code k = (m + n + 1) / 2}. The heap keeps the k
 * smallest values, so its maximum is the kth smallest value of the union; the first value
 * that overflowed the heap is the (k+1)th smallest. The median is that value alone for
 * an odd total and the average of the two for an even total.
 *
 * <p>Complexity: Time O((m + n) log k), Space O(k).
 */
public class MedianOfTwoSortedArrays {

    /**
     * Returns the median of the two sorted arrays.
     *
     * @param nums1 the first sorted array
     * @param nums2 the second sorted array
     * @return the median of the union
     */
    public static double findMedianSortedArrays(int[] nums1, int[] nums2) {
        int m = nums1 == null ? 0 : nums1.length;
        int n = nums2 == null ? 0 : nums2.length;
        if (m + n == 0) {
            throw new IllegalArgumentException("both arrays are empty");
        }

        int total = m + n;
        int k = (total + 1) / 2;

        // The heap keeps the k smallest values of the merged sequence.
        MaxHeap<Integer> kSmallest = new MaxHeap<>();
        Integer overflow = null;
        int i = 0;
        int j = 0;
        while (i < m || j < n) {
            int value;
            if (j >= n || (i < m && nums1[i] <= nums2[j])) {
                value = nums1[i++];
            } else {
                value = nums2[j++];
            }
            kSmallest.add(value);
            if (kSmallest.size() > k) {
                if (overflow == null) {
                    // The first value that leaves the heap is the (k+1)th smallest.
                    overflow = kSmallest.poll();
                } else {
                    kSmallest.poll();
                }
            }
        }

        int kth = kSmallest.peek();
        if (total % 2 == 1) {
            return kth;
        }
        return (kth + overflow) / 2.0;
    }

    /** Formats a median as {@code X.0} or {@code X.5}. */
    public static String formatMedian(double median) {
        if (median == Math.floor(median) && !Double.isInfinite(median)) {
            return ((long) median) + ".0";
        }
        return String.valueOf(median);
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int m = fs.nextInt();
        int[] nums1 = fs.nextIntArray(m);
        int n = fs.nextInt();
        int[] nums2 = fs.nextIntArray(n);

        System.out.println(formatMedian(findMedianSortedArrays(nums1, nums2)));
    }
}
