package com.dsa.arrays;

import com.dsa.utils.FastScanner;

/**
 * Problem: Majority Element
 * LeetCode: 169 | Difficulty: Easy | Frequency: 4/5
 * Pattern: Boyer-Moore voting, Majority guarantee
 *
 * <p>Problem:
 * Given an array {@code nums} of size {@code n}, return the <em>majority element} — the
 * element that appears more than {@code n / 2} times. The problem guarantees that such
 * an element always exists.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * nums[0] nums[1] ... nums[n-1]
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 7
 * 2 2 1 1 1 2 2
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 2
 * </pre>
 *
 * <p>Approach: Boyer-Moore voting. Keep a candidate and a counter. A different value
 * cancels the candidate out, so the surplus of the true majority can never be erased —
 * whatever survives the whole scan is the majority. Because the existence of a majority
 * is guaranteed, no verification pass is needed.
 *
 * <p>Complexity: Time O(n), Space O(1).
 */
public class MajorityElement {

    /**
     * Returns the element appearing in more than half of the array.
     *
     * @param nums the input array (guaranteed to have a majority element)
     * @return the majority element
     */
    public static int majorityElement(int[] nums) {
        int candidate = 0;
        int count = 0;
        for (int value : nums) {
            if (count == 0) {
                candidate = value;
                count = 1;
            } else if (value == candidate) {
                count++;
            } else {
                count--;
            }
        }
        return candidate;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] nums = fs.nextIntArray(n);

        System.out.println(majorityElement(nums));
    }
}
