package com.dsa.twopointers;

import com.dsa.utils.FastScanner;

/**
 * Problem: Remove Duplicates from Sorted Array II
 * LeetCode: 80 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Two pointers, In-place compaction, Run detection
 *
 * <p>Problem:
 * Given a sorted array {@code nums}, remove the duplicates <b>in place</b> so that each
 * element appears **at most twice**. Return the number of elements kept, which occupy
 * the first {@code k} positions of {@code nums}.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * nums[0] nums[1] ... nums[n-1]
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 6
 * 1 1 1 2 2 3
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 5
 * 1 1 2 2 3
 * </pre>
 * The first line is the number of elements kept, the second line holds them.
 *
 * <p>Approach: the array is a sequence of runs of equal values. Walk the runs and copy
 * a run over to the output only when it is short enough (at most two elements).
 *
 * <p>Complexity: Time O(n), Space O(1).
 */
public class RemoveDuplicatesFromSortedArrayII {

    /**
     * Removes the duplicates in place, keeping at most two copies of every value.
     *
     * @param nums a sorted array
     * @return the number of elements kept, stored in {@code nums[0 .. k-1]}
     */
    public static int removeDuplicates(int[] nums) {
        if (nums == null || nums.length == 0) {
            return 0;
        }

        int write = 0;
        int read = 0;
        while (read < nums.length) {
            int runEnd = read;
            while (runEnd < nums.length && nums[runEnd] == nums[read]) {
                runEnd++;
            }
            // Keep at most two copies of the value.
            int copies = Math.min(runEnd - read, 2);
            for (int i = 0; i < copies; i++) {
                nums[write++] = nums[read];
            }
            read = runEnd;
        }
        return write;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] nums = fs.nextIntArray(n);

        int k = removeDuplicates(nums);

        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < k; i++) {
            if (i > 0) {
                sb.append(' ');
            }
            sb.append(nums[i]);
        }
        System.out.println(k);
        System.out.println(sb);
    }
}
