package com.dsa.heaps;

import com.dsa.utils.FastScanner;
import com.dsa.utils.MinHeap;

/**
 * Problem: Kth Largest Element in an Array
 * LeetCode: 215 | Difficulty: Medium | Frequency: 5/5
 * Pattern: Bounded heap, Top-K selection
 *
 * <p>Problem:
 * Given an integer array {@code nums} and an integer {@code k}, return the kth largest
 * element — the element at position k in the array sorted in descending order. Duplicates
 * count separately; it is <em>not</em> the kth distinct element.
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
 * 6
 * 3 2 1 5 6 4
 * 2
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 5
 * </pre>
 *
 * <p>Approach: keep a min-heap of at most {@code k} elements holding the k largest values
 * seen so far. When the heap grows beyond k, its smallest element is discarded — that
 * element can never be in the final k. At the end the heap's minimum is the kth largest
 * value.
 *
 * <p>Complexity: Time O(n log k), Space O(k).
 */
public class KthLargestElement {

    /**
     * Returns the kth largest element of {@code nums}.
     *
     * @param nums the input array
     * @param k    the rank, 1-based, counting duplicates separately
     * @return the kth largest value, or {@code -1} when {@code k} is out of range
     */
    public static int findKthLargest(int[] nums, int k) {
        if (nums == null || nums.length == 0 || k <= 0 || k > nums.length) {
            return -1;
        }

        // The heap keeps the k largest values: its minimum is the smallest of them,
        // so it is exactly the element to throw away when the heap overflows.
        MinHeap<Integer> topK = new MinHeap<>();
        for (int value : nums) {
            topK.add(value);
            if (topK.size() > k) {
                topK.poll();
            }
        }
        return topK.peek();
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] nums = fs.nextIntArray(n);
        int k = fs.nextInt();

        System.out.println(findKthLargest(nums, k));
    }
}
