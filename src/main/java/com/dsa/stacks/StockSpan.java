package com.dsa.stacks;

import com.dsa.utils.FastScanner;

import java.util.ArrayDeque;
import java.util.Deque;

/**
 * Problem: Stock Span
 * Difficulty: Medium | Frequency: 3/5
 * Pattern: Monotonic stack
 *
 * <p>Problem:
 * For every day, compute the **stock span**: the number of consecutive days (ending on that
 * day) whose price is **less than or equal to** the price of that day.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * prices[0] prices[1] ... prices[n-1]
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 6
 * 100 80 60 70 60 75
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 1 1 1 2 1 4
 * </pre>
 *
 * <p>Approach: a monotonic decreasing stack of indices. The previous index whose price is
 * strictly greater than today's is the left boundary of the span.
 *
 * <p>Complexity: Time O(n), Space O(n).
 */
public class StockSpan {

    /**
     * Computes the stock span of every day.
     *
     * @param prices the daily prices
     * @return the span of every day
     */
    public static int[] spans(int[] prices) {
        int n = prices.length;
        int[] span = new int[n];
        Deque<Integer> stack = new ArrayDeque<>();   // indices, prices decreasing bottom to top

        for (int i = 0; i < n; i++) {
            while (!stack.isEmpty() && prices[stack.peek()] <= prices[i]) {
                stack.pop();                        // these days are part of today's span
            }
            span[i] = stack.isEmpty() ? i + 1 : i - stack.peek();
            stack.push(i);
        }
        return span;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] prices = fs.nextIntArray(n);

        int[] span = spans(prices);

        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < span.length; i++) {
            if (i > 0) {
                sb.append(' ');
            }
            sb.append(span[i]);
        }
        System.out.println(sb);
    }
}
