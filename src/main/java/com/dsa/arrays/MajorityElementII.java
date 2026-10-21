package com.dsa.arrays;

import com.dsa.utils.FastScanner;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * Problem: Majority Element II
 * LeetCode: 229 | Difficulty: Medium | Frequency: 3/5
 * Pattern: Boyer-Moore voting, Extended to two candidates
 *
 * <p>Problem:
 * Given an integer array {@code nums}, return all elements that appear more than
 * {@code n / 3} times. The answer may contain at most two elements and is returned in
 * ascending order.
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
 * 1 1 1 2 2 2 3
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 1 2
 * </pre>
 *
 * <p>Approach: at most two elements can exceed the n/3 threshold, so the extended
 * Boyer-Moore vote keeps two candidates. A second pass recounts the candidates to confirm
 * that each one really crosses the threshold, because the voting pass alone only
 * nominates candidates.
 *
 * <p>Complexity: Time O(n), Space O(1).
 */
public class MajorityElementII {

    /**
     * Returns every element that appears in more than {@code n / 3} positions.
     *
     * @param nums the input array
     * @return the qualifying elements in ascending order
     */
    public static List<Integer> majorityElements(int[] nums) {
        int candidate1 = 0;
        int candidate2 = 0;
        int count1 = 0;
        int count2 = 0;

        for (int value : nums) {
            if (count1 > 0 && value == candidate1) {
                count1++;
            } else if (count2 > 0 && value == candidate2) {
                count2++;
            } else if (count1 == 0) {
                candidate1 = value;
                count1 = 1;
            } else if (count2 == 0) {
                candidate2 = value;
                count2 = 1;
            } else {
                count1--;
                count2--;
            }
        }

        count1 = 0;
        count2 = 0;
        for (int value : nums) {
            if (value == candidate1) {
                count1++;
            } else if (value == candidate2) {
                count2++;
            }
        }

        List<Integer> answer = new ArrayList<>();
        int n = nums.length;
        if (count1 > n / 3) {
            answer.add(candidate1);
        }
        if (count2 > n / 3) {
            answer.add(candidate2);
        }
        Collections.sort(answer);
        return answer;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] nums = fs.nextIntArray(n);

        List<Integer> answer = majorityElements(nums);
        StringBuilder out = new StringBuilder();
        for (int i = 0; i < answer.size(); i++) {
            if (i > 0) {
                out.append(' ');
            }
            out.append(answer.get(i));
        }
        System.out.println(out);
    }
}
