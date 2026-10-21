package com.dsa.arrays;

import com.dsa.utils.FastScanner;

import java.util.Random;

/**
 * Problem: Shuffle Array
 * LeetCode: 384 | Difficulty: Medium | Frequency: 3/5
 * Pattern: Fisher-Yates, Uniform random permutation
 *
 * <p>Problem:
 * Given an integer array {@code nums}, return the array shuffled with a uniform random
 * permutation. The Fisher-Yates (Durstenfeld) algorithm performs the shuffle in a single
 * pass by repeatedly picking a random index from the not-yet-shuffled suffix and swapping
 * it with the current position.
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
 * 4
 * 1 2 3 4
 * 3
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 3 2 4 1
 * </pre>
 *
 * <p>Approach: the generator is seeded with a fixed constant so that the program output is
 * reproducible — the repository requires deterministic output for the judge. The
 * algorithm itself is the standard unbiased Fisher-Yates shuffle: pick
 * {@code j} uniformly from {@code [i, n-1]} and swap {@code nums[i]} with {@code nums[j]}.
 *
 * <p>Complexity: Time O(n) (O(k) swaps), Space O(n) for the copy.
 */
public class ShuffleArray {

    /** Fixed seed keeps the shuffle reproducible for the judge. */
    private static final long SEED = 42L;

    /**
     * Shuffles the array with a Fisher-Yates pass of {@code k} swaps.
     *
     * @param nums the input array (not modified)
     * @param k    how many random swaps to perform
     * @return the shuffled array
     */
    public static int[] shuffle(int[] nums, int k) {
        int[] shuffled = nums.clone();
        Random random = new Random(SEED);
        for (int i = 0; i < k && i < shuffled.length; i++) {
            int j = i + random.nextInt(shuffled.length - i);
            int temp = shuffled[i];
            shuffled[i] = shuffled[j];
            shuffled[j] = temp;
        }
        return shuffled;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] nums = fs.nextIntArray(n);
        int k = fs.nextInt();

        int[] shuffled = shuffle(nums, k);
        StringBuilder out = new StringBuilder();
        for (int i = 0; i < shuffled.length; i++) {
            if (i > 0) {
                out.append(' ');
            }
            out.append(shuffled[i]);
        }
        System.out.println(out);
    }
}
