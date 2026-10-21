package com.dsa.stacks;

import com.dsa.utils.FastScanner;

import java.util.ArrayDeque;
import java.util.Arrays;
import java.util.Deque;

/**
 * Problem: Next Greater Element II
 * LeetCode: 503 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Monotonic stack, Circular array
 *
 * <p>Problem:
 * Given a **circular** array of integers, for every element find the first greater element
 * to its right, wrapping around at the end of the array. If there is none, the answer is
 * {@code -1}.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * values[0] values[1] ... values[n-1]
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 5
 * 1 2 3 4 3
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 2 3 4 -1 4
 * </pre>
 *
 * <p>Approach: run the monotonic stack algorithm over the array **twice**; only the first
 * pass pushes indices.
 *
 * <p>Complexity: Time O(n), Space O(n).
 */
public class NextGreaterElementII {

    /**
     * Returns the first strictly greater element to the right of every element, wrapping
     * around the end of the array.
     *
     * @param nums the circular array
     * @return the answers, {@code -1} where there is no greater element
     */
    public static int[] nextGreaterCircular(int[] nums) {
        int n = nums.length;
        int[] result = new int[n];
        Arrays.fill(result, -1);
        Deque<Integer> stack = new ArrayDeque<>();

        for (int i = 0; i < 2 * n; i++) {
            int value = nums[i % n];
            while (!stack.isEmpty() && nums[stack.peek() % n] < value) {
                result[stack.pop() % n] = value;
            }
            if (i < n) {
                stack.push(i);          // only the first pass adds new candidates
            }
        }
        return result;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] nums = fs.nextIntArray(n);

        int[] answer = nextGreaterCircular(nums);

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
