package com.dsa.heaps;

import com.dsa.utils.FastScanner;
import com.dsa.utils.MaxHeap;

/**
 * Problem: K Closest Elements
 * LeetCode: 658 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Bounded heap, Distance ranking
 *
 * <p>Problem:
 * Given a sorted integer array {@code nums} and an integer {@code k}, return the k
 * elements of {@code nums} that are closest to {@code x}. The result is printed in
 * increasing order. When several elements are equally close, the smaller ones are kept.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * nums[0] nums[1] ... nums[n-1]
 * k
 * x
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 7
 * 1 2 4 8 9 15 16
 * 4
 * 10
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 4 8 9 15
 * </pre>
 *
 * <p>Approach: keep a max-heap of at most {@code k} elements ordered by distance to
 * {@code x}. When the heap overflows, its top — the farthest candidate — is discarded.
 * At the end the heap holds the k closest elements, which are printed in increasing order.
 *
 * <p>Complexity: Time O(n log k), Space O(k).
 */
public class KClosestElements {

    /**
     * Returns the k elements of {@code nums} closest to {@code x}.
     *
     * @param nums a sorted input array
     * @param k    how many elements to return
     * @param x    the target value
     * @return the closest elements in increasing order
     */
    public static int[] kClosestElements(int[] nums, int k, int x) {
        if (nums == null || nums.length == 0 || k <= 0) {
            return new int[0];
        }

        // The heap is ordered by distance, so its top is the farthest candidate — the one
        // to throw away when the heap overflows. Ties keep the smaller value.
        MaxHeap<int[]> heap = new MaxHeap<int[]>((a, b) -> {
            int da = Math.abs(a[0] - x);
            int db = Math.abs(b[0] - x);
            if (da != db) {
                return Integer.compare(da, db);
            }
            return Integer.compare(a[0], b[0]);
        });

        for (int value : nums) {
            heap.add(new int[]{value});
            if (heap.size() > k) {
                heap.poll();
            }
        }

        int[] answer = new int[heap.size()];
        int i = 0;
        for (int[] entry : heap.asList()) {
            answer[i++] = entry[0];
        }
        java.util.Arrays.sort(answer);
        return answer;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] nums = fs.nextIntArray(n);
        int k = fs.nextInt();
        int x = fs.nextInt();

        int[] answer = kClosestElements(nums, k, x);
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < answer.length; i++) {
            if (i > 0) {
                sb.append(' ');
            }
            sb.append(answer[i]);
        }
        System.out.println(sb);
    }
}
