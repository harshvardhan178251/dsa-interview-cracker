package com.dsa.heaps;

import com.dsa.utils.FastScanner;
import com.dsa.utils.MaxHeap;
import com.dsa.utils.MinHeap;

/**
 * Problem: Find Kth Largest and Kth Smallest
 * LeetCode: null | Difficulty: Medium | Frequency: 3/5
 * Pattern: Bounded heap, Twin top-K selection
 *
 * <p>Problem:
 * Given an integer array {@code nums} and an integer {@code k}, report both the kth
 * largest and the kth smallest element (duplicates count separately).
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
 * 7
 * 9 4 7 1 8 3 6
 * 3
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 7
 * 4
 * </pre>
 *
 * <p>Approach: two bounded heaps are filled in the same pass. A min-heap of size k keeps
 * the k largest values (its minimum is the kth largest); a max-heap of size k keeps the
 * k smallest values (its maximum is the kth smallest). Each overflow discards exactly
 * the element that cannot belong to the answer.
 *
 * <p>Complexity: Time O(n log k), Space O(k).
 */
public class FindKthLargestAndSmallest {

    /**
     * Returns the kth largest and the kth smallest element of {@code nums}.
     *
     * @param nums the input array
     * @param k    the rank, 1-based, counting duplicates separately
     * @return {@code {kthLargest, kthSmallest}}, or {@code {-1, -1}} when {@code k} is
     *         out of range
     */
    public static int[] findKthLargestAndSmallest(int[] nums, int k) {
        if (nums == null || nums.length == 0 || k <= 0 || k > nums.length) {
            return new int[]{-1, -1};
        }

        MinHeap<Integer> largest = new MinHeap<>();
        MaxHeap<Integer> smallest = new MaxHeap<>();

        for (int value : nums) {
            largest.add(value);
            if (largest.size() > k) {
                largest.poll();
            }
            smallest.add(value);
            if (smallest.size() > k) {
                smallest.poll();
            }
        }
        return new int[]{largest.peek(), smallest.peek()};
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] nums = fs.nextIntArray(n);
        int k = fs.nextInt();

        int[] answer = findKthLargestAndSmallest(nums, k);
        System.out.println(answer[0]);
        System.out.println(answer[1]);
    }
}
