package com.dsa.prefixsum;

import com.dsa.utils.FastScanner;

/**
 * Problem: Product of Array Except Self
 * LeetCode: 238 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Prefix and suffix products, No division
 *
 * <p>Problem:
 * Given an integer array {@code nums}, return an array {@code answer} where
 * {@code answer[i]} is the product of all the elements of {@code nums} except
 * {@code nums[i]}. The solution must not use division.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * nums[0] nums[1] ... nums[n-1]
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 4
 * 1 2 3 4
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 24 12 8 6
 * </pre>
 *
 * <p>Approach: the product of everything except {@code nums[i]} is
 * {@code (product of the left part) * (product of the right part)}. A left-to-right pass
 * writes the running left product into the answer array, and a right-to-left pass
 * multiplies the running right product into it. No division is needed, so zeros are
 * handled naturally.
 *
 * <p>Complexity: Time O(n), Space O(n) for the output array (O(1) extra).
 */
public class ProductExceptSelf {

    /**
     * Returns, for every position, the product of all other elements.
     *
     * @param nums the input array
     * @return the array of "product except self" values
     */
    public static int[] productExceptSelf(int[] nums) {
        int n = nums.length;
        int[] answer = new int[n];

        int prefix = 1;
        for (int i = 0; i < n; i++) {
            answer[i] = prefix;      // product of everything strictly before i
            prefix *= nums[i];
        }

        int suffix = 1;
        for (int i = n - 1; i >= 0; i--) {
            answer[i] *= suffix;     // multiply by the product of everything after i
            suffix *= nums[i];
        }
        return answer;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] nums = fs.nextIntArray(n);

        int[] answer = productExceptSelf(nums);
        StringBuilder out = new StringBuilder();
        for (int i = 0; i < answer.length; i++) {
            if (i > 0) {
                out.append(' ');
            }
            out.append(answer[i]);
        }
        System.out.println(out);
    }
}
