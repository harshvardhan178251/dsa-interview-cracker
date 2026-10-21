package com.dsa.stacks;

import com.dsa.utils.FastScanner;

import java.util.ArrayDeque;
import java.util.Arrays;
import java.util.Deque;

/**
 * Problem: Next Greater Element
 * LeetCode: 496 | Difficulty: Easy | Frequency: 4/5
 * Pattern: Monotonic stack
 *
 * <p>Problem:
 * Given an array of integers, for every element find the first element to its right that is
 * **strictly greater**. If there is none, the answer is {@code -1}.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * values[0] values[1] ... values[n-1]
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 4
 * 1 2 1 4
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 2 4 4 -1
 * </pre>
 *
 * <p>Approach: a monotonic decreasing stack of indices. When the current value is greater
 * than the value on top of the stack, that top element's answer is found.
 *
 * <p>Complexity: Time O(n), Space O(n).
 */
public class NextGreaterElement {

    /**
     * Returns the first strictly greater element to the right of every element.
     *
     * @param nums the input array
     * @return the answers, {@code -1} where there is no greater element
     */
    public static int[] nextGreaterElements(int[] nums) {
        int[] result = new int[nums.length];
        Arrays.fill(result, -1);
        Deque<Integer> stack = new ArrayDeque<>();   // indices, values in decreasing order

        for (int i = 0; i < nums.length; i++) {
            while (!stack.isEmpty() && nums[stack.peek()] < nums[i]) {
                result[stack.pop()] = nums[i];
            }
            stack.push(i);
        }
        return result;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] nums = fs.nextIntArray(n);

        int[] answer = nextGreaterElements(nums);

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
