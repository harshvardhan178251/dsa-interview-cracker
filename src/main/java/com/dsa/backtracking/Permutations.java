package com.dsa.backtracking;

import com.dsa.utils.FastScanner;
import java.util.ArrayList;
import java.util.List;

/**
 * Problem: Permutations
 * LeetCode: 46 | Difficulty: Medium | Frequency: 5/5
 * Pattern: Backtracking, Used array
 *
 * <p>Problem: Return every possible permutation of an array of distinct integers.
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
 * 1 2 3
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 1 2 3
 * 1 3 2
 * 2 1 3
 * 2 3 1
 * 3 1 2
 * 3 2 1
 * </pre>
 *
 * <p>Approach: At every level pick one of the values that is not used yet, mark it, recurse and unmark it.
 *
 * <p>Complexity: Time O(n x n!), Space O(n).
 */
public class Permutations {

    /**
     * Returns every permutation of {@code nums}.
     *
     * <p>The values inside a permutation keep their original order, so the permutation itself is the
     * answer -- only the list of permutations is sorted, which makes the output stable.
     *
     * @param nums the input values (distinct)
     * @return every permutation, sorted lexicographically
     */
    public static List<List<Integer>> permutations(int[] nums) {
        List<List<Integer>> result = new ArrayList<>();
        generate(nums, new boolean[nums.length], new ArrayList<>(), result);
        result.sort((a, b) -> compareLists(a, b));
        return result;
    }

    /**
     * Depth-first search over the unused values.
     *
     * @param nums   the input values
     * @param used   which values are already in the path
     * @param path   the permutation built so far
     * @param result the collected permutations
     */
    private static void generate(int[] nums, boolean[] used, List<Integer> path, List<List<Integer>> result) {
        if (path.size() == nums.length) {
            result.add(new ArrayList<>(path)); // every value is used
            return;
        }
        for (int i = 0; i < nums.length; i++) {
            if (used[i]) {
                continue; // this value is already in the permutation
            }
            used[i] = true;                  // choose
            path.add(nums[i]);
            generate(nums, used, path, result); // explore
            path.remove(path.size() - 1);      // backtrack
            used[i] = false;                  // give the value back
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
        for (List<Integer> permutation : permutations(nums)) {
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
