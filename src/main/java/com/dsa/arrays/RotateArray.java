package com.dsa.arrays;

import com.dsa.utils.FastScanner;

/**
 * Problem: Rotate Array
 * LeetCode: 189 | Difficulty: Medium | Frequency: 3/5
 * Pattern: Modulo indexing, Cyclic shift
 *
 * <p>Problem:
 * Given an integer array {@code nums} and an integer {@code k}, rotate the array to the
 * right by {@code k} steps. The rotation is cyclic: elements that fall off the right end
 * reappear at the left end.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * nums[0] nums[1] ... nums[n-1]
 * k
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 5
 * 1 2 3 4 5
 * 2
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 4 5 1 2 3
 * </pre>
 *
 * <p>Approach: normalise {@code k} with {@code ((k % n) + n) % n} so that a huge or
 * negative shift still works. Then place every element at index {@code (i + k) % n} of a
 * fresh array — the destination is exactly the position it occupies after the rotation.
 *
 * <p>Complexity: Time O(n), Space O(n).
 */
public class RotateArray {

    /**
     * Rotates the array to the right by {@code k} positions.
     *
     * @param nums input array (not modified)
     * @param k    number of steps to rotate right
     * @return a new array holding the rotated values
     */
    public static int[] rotate(int[] nums, int k) {
        int n = nums.length;
        if (n == 0) {
            return new int[0];
        }
        int shift = ((k % n) + n) % n;
        int[] rotated = new int[n];
        for (int i = 0; i < n; i++) {
            rotated[(i + shift) % n] = nums[i];
        }
        return rotated;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] nums = fs.nextIntArray(n);
        int k = fs.nextInt();

        int[] rotated = rotate(nums, k);
        StringBuilder out = new StringBuilder();
        for (int i = 0; i < rotated.length; i++) {
            if (i > 0) {
                out.append(' ');
            }
            out.append(rotated[i]);
        }
        System.out.println(out);
    }
}
