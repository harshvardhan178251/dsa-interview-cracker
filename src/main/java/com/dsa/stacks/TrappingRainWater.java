package com.dsa.stacks;

import com.dsa.utils.FastScanner;

/**
 * Problem: Trapping Rain Water
 * LeetCode: 42 | Difficulty: Hard | Frequency: 5/5
 * Pattern: Two pointers, Running maxima
 *
 * <p>Problem:
 * Given the height of each bar, compute how much rain water is trapped between the bars.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * heights[0] heights[1] ... heights[n-1]
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 6
 * 4 2 0 3 2 5
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 9
 * </pre>
 *
 * <p>Approach: two pointers walking inwards, each remembering the tallest bar it has seen.
 *
 * <p>Complexity: Time O(n), Space O(1).
 */
public class TrappingRainWater {

    /**
     * Returns the total amount of trapped water.
     *
     * @param height the bar heights
     * @return the units of water trapped
     */
    public static int trap(int[] height) {
        if (height == null || height.length < 3) {
            return 0;
        }
        int left = 0;
        int right = height.length - 1;
        int leftMax = 0;
        int rightMax = 0;
        int water = 0;

        while (left < right) {
            if (height[left] < height[right]) {
                leftMax = Math.max(leftMax, height[left]);
                water += leftMax - height[left];
                left++;
            } else {
                rightMax = Math.max(rightMax, height[right]);
                water += rightMax - height[right];
                right--;
            }
        }
        return water;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] height = fs.nextIntArray(n);

        System.out.println(trap(height));
    }
}
