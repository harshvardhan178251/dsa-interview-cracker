package com.dsa.queues;

import com.dsa.utils.FastScanner;

import java.util.ArrayDeque;
import java.util.Deque;

/**
 * Problem: Sliding Window Maximum
 * LeetCode: 239 | Difficulty: Hard | Frequency: 5/5
 * Pattern: Monotonic deque
 *
 * <p>Problem:
 * Given an array {@code nums} and a window size {@code k}, return the maximum value of
 * every window of length {@code k}.
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
 * 8
 * 1 3 -1 -3 5 3 6 7
 * 3
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 3 3 5 5 6 7
 * </pre>
 *
 * <p>Approach: a monotonic deque holds the indices of the elements that may still become
 * a window maximum, in decreasing value order. The front always points at the maximum of
 * the current window. Expired indices are dropped from the front and smaller values are
 * dropped from the back — a value that is smaller than a later value can never be the
 * maximum of any window that contains the later value.
 *
 * <p>Complexity: Time O(n) — every index is pushed once and popped at most once,
 * Space O(k).
 */
public class SlidingWindowMaximum {

    /**
     * Returns the maximum of every window of length {@code k}.
     *
     * @param nums the input array
     * @param k    the window size
     * @return one maximum per window, in order
     */
    public static int[] maxSlidingWindow(int[] nums, int k) {
        if (nums == null || nums.length == 0 || k <= 0) {
            return new int[0];
        }
        if (k > nums.length) {
            k = nums.length;
        }

        Deque<Integer> window = new ArrayDeque<>();
        int[] answer = new int[nums.length - k + 1];

        for (int i = 0; i < nums.length; i++) {
            // 1. drop indices that left the window
            while (!window.isEmpty() && window.peekFirst() <= i - k) {
                window.pollFirst();
            }
            // 2. drop values that are dominated by the current one
            while (!window.isEmpty() && nums[window.peekLast()] <= nums[i]) {
                window.pollLast();
            }
            // 3. admit the current index
            window.addLast(i);
            // 4. the front is the maximum once the window is full
            if (i >= k - 1) {
                answer[i - k + 1] = nums[window.peekFirst()];
            }
        }
        return answer;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] nums = fs.nextIntArray(n);
        int k = fs.nextInt();

        int[] answer = maxSlidingWindow(nums, k);
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
