package com.dsa.templates;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * Copy-paste starting points for the two-pointer and sliding-window shapes.
 *
 * <p>See the [two pointers notes](../../../docs/topics/10-twopointers.md) and the
 * [sliding window notes](../../../docs/topics/11-slidingwindow.md).
 */
public final class TwoPointersTemplate {

    private TwoPointersTemplate() {
    }

    /** Pointers moving toward each other — the answer is a pair. */
    public static int[] twoSumSorted(int[] nums, int target) {
        int left = 0;
        int right = nums.length - 1;

        while (left < right) {
            int sum = nums[left] + nums[right];
            if (sum == target) {
                return new int[]{left, right};
            } else if (sum < target) {
                left++;                             // too small: need a bigger left value
            } else {
                right--;                            // too big: need a smaller right value
            }
        }
        return new int[]{-1, -1};
    }

    /** Write pointer — keeps the elements satisfying {@code keep}, in order. */
    public static int removeIf(int[] nums, java.util.function.IntPredicate keep) {
        int write = 0;
        for (int read = 0; read < nums.length; read++) {
            if (keep.test(nums[read])) {
                nums[write++] = nums[read];
            }
        }
        return write;                               // the new length
    }

    /** Variable window — expand on the right, shrink on the left until valid. */
    public static int longestValidWindow(String s, java.util.function.BiPredicate<Integer, Integer> valid) {
        int left = 0;
        int best = 0;

        for (int right = 0; right < s.length(); right++) {
            while (!valid.test(left, right)) {
                left++;
            }
            best = Math.max(best, right - left + 1);
        }
        return best;
    }

    /** Fixed-size window of width {@code k}. */
    public static int maxWindowSum(int[] nums, int k) {
        if (nums.length == 0 || k <= 0) {
            return 0;
        }
        int sum = 0;
        for (int i = 0; i < k; i++) {
            sum += nums[i];
        }
        int best = sum;

        for (int right = k; right < nums.length; right++) {
            sum += nums[right] - nums[right - k];
            best = Math.max(best, sum);
        }
        return best;
    }

    /** Sliding window maximum with a monotonic deque. */
    public static int[] slidingWindowMaximum(int[] nums, int k) {
        int[] result = new int[nums.length - k + 1];
        java.util.Deque<Integer> deque = new java.util.ArrayDeque<>();

        for (int i = 0; i < nums.length; i++) {
            while (!deque.isEmpty() && deque.peekFirst() <= i - k) {
                deque.pollFirst();                 // out of the window
            }
            while (!deque.isEmpty() && nums[deque.peekLast()] <= nums[i]) {
                deque.pollLast();                  // dominated by the new element
            }
            deque.addLast(i);
            if (i >= k - 1) {
                result[i - k + 1] = nums[deque.peekFirst()];
            }
        }
        return result;
    }

    public static void main(String[] args) {
        System.out.println("twoSumSorted       = " + Arrays.toString(twoSumSorted(new int[]{2, 7, 11, 15}, 9)));
        System.out.println("maxWindowSum       = " + maxWindowSum(new int[]{2, 1, 5, 1, 3, 2}, 3));
        System.out.println("slidingWindowMax   = " + Arrays.toString(
                slidingWindowMaximum(new int[]{1, 3, -1, -3, 5, 3, 6, 7}, 3)));
        List<Integer> kept = new ArrayList<>();
        for (int x : new int[]{0, 1, 2, 2, 3}) {
            if (x != 2) {
                kept.add(x);
            }
        }
        System.out.println("removeIf            = " + kept);
    }
}
