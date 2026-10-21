package com.dsa.stacks;

import com.dsa.utils.FastScanner;

import java.util.ArrayDeque;
import java.util.Deque;

/**
 * Problem: Daily Temperatures
 * LeetCode: 739 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Monotonic stack
 *
 * <p>Problem:
 * Given the daily temperatures, for every day return the number of days you have to wait
 * until a **warmer** day. If no warmer day comes, the answer is {@code 0}.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * temps[0] temps[1] ... temps[n-1]
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 6
 * 73 74 75 71 69 76
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 1 1 3 2 1 0
 * </pre>
 *
 * <p>Approach: a monotonic decreasing stack of indices; when a warmer day arrives, the
 * waiting time of every waiting day is the index distance.
 *
 * <p>Complexity: Time O(n), Space O(n).
 */
public class DailyTemperatures {

    /**
     * Returns the number of days to wait for a warmer day.
     *
     * @param temps the daily temperatures
     * @return the waiting times, {@code 0} where no warmer day follows
     */
    public static int[] daysToWait(int[] temps) {
        int[] answer = new int[temps.length];
        Deque<Integer> stack = new ArrayDeque<>();   // indices, temperatures decreasing

        for (int i = 0; i < temps.length; i++) {
            while (!stack.isEmpty() && temps[stack.peek()] < temps[i]) {
                int waiting = stack.pop();
                answer[waiting] = i - waiting;      // the distance in days
            }
            stack.push(i);
        }
        return answer;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] temps = fs.nextIntArray(n);

        int[] answer = daysToWait(temps);

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
