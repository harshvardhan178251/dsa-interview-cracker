package com.dsa.backtracking;

import com.dsa.utils.FastScanner;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * Problem: Permutations II
 * LeetCode: 47 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Backtracking, Duplicate pruning
 *
 * <p>Problem: Return every distinct permutation of an array that may contain duplicate values.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * nums[0] nums[1] ... nums[n-1]
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 3
 * 1 1 2
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 1 1 2
 * 1 2 1
 * 2 1 1
 * </pre>
 *
 * <p>Approach: Sort the input and skip a duplicate value when the previous equal value has not been used yet.
 *
 * <p>Complexity: Time O(n x n!), Space O(n).
 */
public class PermutationsII {

    /**
     * Returns every distinct permutation of {@code nums}.
     *
     * <p>Equal values are treated as one candidate per level: a duplicate is only tried when the
     * previous equal value has already been used in the current permutation. That keeps the number of
     * permutations at {@code n! / (f1! x f2! x ...)}.
     *
     * @param nums the input values (may repeat)
     * @return every distinct permutation, sorted lexicographically
     */
    public static List<List<Integer>> permutationsUnique(int[] nums) {
        int[] sorted = nums.clone();
        Arrays.sort(sorted);

        List<List<Integer>> result = new ArrayList<>();
        generate(sorted, new boolean[sorted.length], new ArrayList<>(), result);
        result.sort((a, b) -> compareLists(a, b));
        return result;
    }

    /**
     * Depth-first search over the unused values.
     *
     * @param nums   the sorted input values
     * @param used   which values are already in the path
     * @param path   the permutation built so far
     * @param result the collected permutations
     */
    private static void generate(int[] nums, boolean[] used, List<Integer> path, List<List<Integer>> result) {
        if (path.size() == nums.length) {
            result.add(new ArrayList<>(path));
            return;
        }
        for (int i = 0; i < nums.length; i++) {
            if (used[i]) {
                continue;
            }
            if (i > 0 && nums[i] == nums[i - 1] && !used[i - 1]) {
                continue; // the previous equal value was not used, so skip this one
            }
            used[i] = true;                     // choose
            path.add(nums[i]);
            generate(nums, used, path, result); // explore
            path.remove(path.size() - 1);        // backtrack
            used[i] = false;                    // give the value back
        }
    }
    /**
     * Compares two lists element by element (lexicographic order).
     *
     * @param a the first list
     * @param b the second list
     * @param <T> the element type
     * @return a negative number, zero, or a positive number
     */
    private static <T extends Comparable<? super T>> int compareLists(List<T> a, List<T> b) {
        int limit = Math.min(a.size(), b.size());
        for (int i = 0; i < limit; i++) {
            int diff = a.get(i).compareTo(b.get(i));
            if (diff != 0) {
                return diff;
            }
        }
        return Integer.compare(a.size(), b.size());
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] nums = fs.nextIntArray(n);

        StringBuilder out = new StringBuilder();
        for (List<Integer> permutation : permutationsUnique(nums)) {
            for (int i = 0; i < permutation.size(); i++) {
                if (i > 0) {
                    out.append(' ');
                }
                out.append(permutation.get(i));
            }
            out.append('\n');
        }
        System.out.print(out);
    }
}
