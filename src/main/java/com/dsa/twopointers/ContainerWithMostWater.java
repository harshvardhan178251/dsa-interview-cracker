package com.dsa.twopointers;

import com.dsa.utils.FastScanner;

/**
 * Problem: Container With Most Water
 * LeetCode: 11 | Difficulty: Medium | Frequency: 5/5
 * Pattern: Two pointers, Greedy
 *
 * <p>Problem:
 * Given {@code n} non-negative integers where each value is the height of a vertical
 * line, find two lines that together hold the most water.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * height[0] height[1] ... height[n-1]
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 9
 * 1 8 6 2 5 4 8 3 7
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 49
 * </pre>
 *
 * <p>Approach: start with one pointer at each end and always move the **shorter** of the
 * two lines. The width shrinks by one on every step, so keeping the shorter line could
 * only lose area - the taller one can stay, and moving the shorter one may find a
 * better partner.
 *
 * <p>Complexity: Time O(n), Space O(1).
 */
public class ContainerWithMostWater {

    /**
     * Returns the largest amount of water two lines can hold.
     *
     * @param height the line heights
     * @return the maximum area
     */
    public static int maxArea(int[] height) {
        if (height == null || height.length < 2) {
            return 0;
        }

        int left = 0;
        int right = height.length - 1;
        int best = 0;
        while (left < right) {
            int area = (right - left) * Math.min(height[left], height[right]);
            best = Math.max(best, area);
            if (height[left] < height[right]) {
                left++;
            } else {
                right--;
            }
        }
        return best;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] height = fs.nextIntArray(n);

        System.out.println(maxArea(height));
    }
}
