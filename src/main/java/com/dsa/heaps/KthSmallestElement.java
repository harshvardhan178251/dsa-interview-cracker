package com.dsa.heaps;

import com.dsa.utils.FastScanner;
import com.dsa.utils.MaxHeap;

/**
 * Problem: Kth Smallest Element in a Sorted Matrix
 * LeetCode: 378 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Bounded heap, Top-K selection
 *
 * <p>Problem:
 * Given an {@code n x n} matrix where every row is sorted in non-decreasing order, return
 * the kth smallest element of the whole matrix (counting duplicates separately).
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * row0[0] row0[1] ... row0[n-1]
 * row1[0] row1[1] ... row1[n-1]
 * ...
 * k
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 3
 * 1 5 9
 * 10 11 13
 * 12 13 15
 * 8
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 13
 * </pre>
 *
 * <p>Approach: keep a max-heap of at most {@code k} elements holding the k smallest values
 * seen so far. When the heap overflows, its largest element is discarded. At the end the
 * heap's maximum is the kth smallest value.
 *
 * <p>Complexity: Time O(n² log k), Space O(k).
 */
public class KthSmallestElement {

    /**
     * Returns the kth smallest element of a row-sorted matrix.
     *
     * @param matrix the input matrix (may be ragged)
     * @param k      the rank, 1-based, counting duplicates separately
     * @return the kth smallest value, or {@code -1} when {@code k} is out of range
     */
    public static int findKthSmallest(int[][] matrix, int k) {
        if (matrix == null || k <= 0) {
            return -1;
        }

        // The heap keeps the k smallest values: its maximum is the largest of them,
        // so it is exactly the element to throw away when the heap overflows.
        MaxHeap<Integer> topK = new MaxHeap<>();
        int total = 0;
        for (int[] row : matrix) {
            for (int value : row) {
                total++;
                topK.add(value);
                if (topK.size() > k) {
                    topK.poll();
                }
            }
        }
        if (total < k) {
            return -1;
        }
        return topK.peek();
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();

        int[][] matrix = new int[n][];
        for (int i = 0; i < n; i++) {
            matrix[i] = fs.nextIntArray(n);
        }
        int k = fs.nextInt();

        System.out.println(findKthSmallest(matrix, k));
    }
}
