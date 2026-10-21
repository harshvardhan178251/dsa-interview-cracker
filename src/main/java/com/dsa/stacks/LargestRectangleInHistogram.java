package com.dsa.stacks;

import com.dsa.utils.FastScanner;

import java.util.ArrayDeque;
import java.util.Deque;

/**
 * Problem: Largest Rectangle in Histogram
 * LeetCode: 84 | Difficulty: Hard | Frequency: 4/5
 * Pattern: Monotonic stack, Sentinel
 *
 * <p>Problem:
 * Given an array of bar heights, find the area of the largest rectangle that can be formed
 * from a contiguous run of bars.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * heights[0] heights[1] ... heights[n-1]
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 5
 * 2 1 5 6 2
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 10
 * </pre>
 *
 * <p>Approach: a monotonic increasing stack of indices. When a shorter bar arrives, the
 * taller bars on the stack can no longer grow, so their rectangles are finalised.
 *
 * <p>Complexity: Time O(n), Space O(n).
 */
public class LargestRectangleInHistogram {

    /**
     * Returns the area of the largest rectangle that fits in the histogram.
     *
     * @param heights the bar heights
     * @return the largest area
     */
    public static int largestRectangle(int[] heights) {
        int n = heights.length;
        int best = 0;
        Deque<Integer> stack = new ArrayDeque<>();   // indices, heights increasing bottom to top

        for (int i = 0; i <= n; i++) {
            int height = (i == n) ? 0 : heights[i];   // a zero-height sentinel flushes the stack
            while (!stack.isEmpty() && heights[stack.peek()] >= height) {
                int h = heights[stack.pop()];
                int left = stack.isEmpty() ? -1 : stack.peek();
                int width = i - left - 1;
                best = Math.max(best, h * width);
            }
            if (i < n) {
                stack.push(i);
            }
        }
        return best;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] heights = fs.nextIntArray(n);

        System.out.println(largestRectangle(heights));
    }
}
