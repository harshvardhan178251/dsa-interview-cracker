package com.dsa.heaps;

import com.dsa.utils.FastScanner;
import com.dsa.utils.MinHeap;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Problem: Top K Frequent Elements
 * LeetCode: 347 | Difficulty: Medium | Frequency: 5/5
 * Pattern: Frequency counting, Bounded heap
 *
 * <p>Problem:
 * Given an integer array {@code nums} and an integer {@code k}, return the k most
 * frequent elements. The answer is printed in decreasing frequency; elements with the
 * same frequency are printed in increasing value order.
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
 * 1 1 1 2 2 3
 * 2
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 1 2
 * </pre>
 *
 * <p>Approach: count the occurrences of every value, then push the distinct values into a
 * min-heap ordered by frequency. When the heap holds more than k elements its top — the
 * least frequent of the candidates — is discarded. At the end the heap holds the k most
 * frequent values.
 *
 * <p>Complexity: Time O(n log k), Space O(n) for the frequency map plus O(k) for the heap.
 */
public class TopKFrequentElements {

    /**
     * Returns the k most frequent elements of {@code nums}.
     *
     * @param nums the input array
     * @param k    how many elements to report
     * @return the elements ordered by decreasing frequency, ties by increasing value
     */
    public static int[] topKFrequentElements(int[] nums, int k) {
        if (nums == null || nums.length == 0 || k <= 0) {
            return new int[0];
        }

        Map<Integer, Integer> frequency = new HashMap<>();
        for (int value : nums) {
            frequency.merge(value, 1, Integer::sum);
        }

        // The heap's top is the *least* frequent candidate, so it is the one to drop.
        // Ties are broken by value: the larger value is dropped first, which keeps the
        // smaller values among equally frequent ones.
        MinHeap<int[]> heap = new MinHeap<int[]>((a, b) -> {
            if (a[1] != b[1]) {
                return Integer.compare(a[1], b[1]);
            }
            return Integer.compare(b[0], a[0]);
        });

        // Distinct values are inserted in increasing order so the trace is reproducible.
        List<Integer> values = new ArrayList<>(frequency.keySet());
        values.sort(Integer::compare);
        for (int value : values) {
            heap.add(new int[]{value, frequency.get(value)});
            if (heap.size() > k) {
                heap.poll();
            }
        }

        List<int[]> kept = heap.asList();
        kept.sort((a, b) -> {
            if (a[1] != b[1]) {
                return Integer.compare(b[1], a[1]);
            }
            return Integer.compare(a[0], b[0]);
        });

        int[] answer = new int[kept.size()];
        for (int i = 0; i < kept.size(); i++) {
            answer[i] = kept.get(i)[0];
        }
        return answer;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] nums = fs.nextIntArray(n);
        int k = fs.nextInt();

        int[] answer = topKFrequentElements(nums, k);
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
