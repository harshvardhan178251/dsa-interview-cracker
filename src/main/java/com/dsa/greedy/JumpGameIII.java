package com.dsa.greedy;

import com.dsa.utils.FastScanner;

import java.util.ArrayDeque;
import java.util.Deque;

/**
 * Problem: Jump Game III
 * LeetCode: 1306 | Difficulty: Medium | Frequency: 3/5
 * Pattern: Greedy reach, BFS over reachable indices
 *
 * <p>Problem:
 * You are given an array {@code arr} of non-negative integers and a start index
 * {@code start}. From index {@code i} you may move to {@code i + arr[i]} or to
 * {@code i - arr[i]} as long as the target index is inside the array. The walk is over
 * as soon as it lands on an index whose value is {@code 0}; return whether that
 * happens.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * arr[0] arr[1] ... arr[n-1]
 * start
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 7
 * 4 2 3 0 3 1 2
 * 0
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * true
 * </pre>
 *
 * <p>Approach: breadth-first search from {@code start}. Every index is visited at most
 * once, so the search terminates even when the jumps form cycles.
 *
 * <p>Complexity: Time O(n), Space O(n).
 */
public class JumpGameIII {

    /**
     * Returns whether the walk starting at {@code start} can land on a zero-valued index.
     *
     * @param arr   jump lengths, {@code arr[i]} is the jump length used at index i
     * @param start index the walk starts at
     * @return {@code true} when a zero-valued index is reachable
     */
    public static boolean canReach(int[] arr, int start) {
        if (arr == null || arr.length == 0) {
            return false;
        }
        if (start < 0 || start >= arr.length) {
            return false;
        }
        boolean[] visited = new boolean[arr.length];
        Deque<Integer> queue = new ArrayDeque<>();
        queue.add(start);
        visited[start] = true;

        while (!queue.isEmpty()) {
            int i = queue.poll();
            if (arr[i] == 0) {
                return true;   // a zero length jump means "we are already at the end"
            }
            int[] next = {i + arr[i], i - arr[i]};
            for (int j : next) {
                if (j >= 0 && j < arr.length && !visited[j]) {
                    visited[j] = true;
                    queue.add(j);
                }
            }
        }
        return false;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] arr = fs.nextIntArray(n);
        int start = fs.nextInt();

        System.out.println(canReach(arr, start) ? "true" : "false");
    }
}
