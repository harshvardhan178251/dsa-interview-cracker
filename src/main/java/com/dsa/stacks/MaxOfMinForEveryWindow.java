package com.dsa.stacks;

import com.dsa.utils.FastScanner;

import java.util.ArrayDeque;
import java.util.Deque;

/**
 * Problem: Max of Min for Every Window
 * Difficulty: Hard | Frequency: 3/5
 * Pattern: Monotonic stack, Suffix maximum
 *
 * <p>Problem:
 * Given an array and a window size {@code k}, find the **maximum among the minimums** of all
 * the windows of size {@code k}: for every window take its smallest element, and report the
 * largest of those minimums.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * values[0] values[1] ... values[n-1]
 * k
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 5
 * 4 2 6 1 5
 * 3
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 2
 * </pre>
 *
 * <p>Approach: for every element find the widest window in which it is the minimum, then
 * propagate the answers from the longest window down to the shortest one.
 *
 * <p>Complexity: Time O(n), Space O(n).
 */
public class MaxOfMinForEveryWindow {

    /**
     * Returns the maximum among the minimums of all windows of size {@code k}.
     *
     * @param values the input array
     * @param k      the window size
     * @return the answer, or {@code 0} when the window size is invalid
     */
    public static int maxOfMins(int[] values, int k) {
        int n = values.length;
        if (n == 0 || k <= 0 || k > n) {
            return 0;
        }

        int[] left = new int[n];    // index of the previous strictly smaller element
        int[] right = new int[n];   // index of the next smaller-or-equal element
        Deque<Integer> stack = new ArrayDeque<>();

        for (int i = 0; i < n; i++) {
            while (!stack.isEmpty() && values[stack.peek()] >= values[i]) {
                stack.pop();
            }
            left[i] = stack.isEmpty() ? -1 : stack.peek();
            stack.push(i);
        }
        stack.clear();
        for (int i = n - 1; i >= 0; i--) {
            while (!stack.isEmpty() && values[stack.peek()] > values[i]) {
                stack.pop();
            }
            right[i] = stack.isEmpty() ? n : stack.peek();
            stack.push(i);
        }

        // maxOfMin[len] = the largest element that is the minimum of a window of size len
        int[] maxOfMin = new int[n + 1];
        for (int i = 0; i < n; i++) {
            int length = right[i] - left[i] - 1;
            maxOfMin[length] = Math.max(maxOfMin[length], values[i]);
        }
        // a window of size len also contains windows of every smaller size
        for (int length = n - 1; length >= 1; length--) {
            maxOfMin[length] = Math.max(maxOfMin[length], maxOfMin[length + 1]);
        }
        return maxOfMin[k];
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] values = fs.nextIntArray(n);
        int k = fs.nextInt();

        System.out.println(maxOfMins(values, k));
    }
}
