package com.dsa.backtracking;

import com.dsa.utils.FastScanner;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * Problem: Subsets
 * LeetCode: 78 | Difficulty: Medium | Frequency: 5/5
 * Pattern: Backtracking, DFS with a path
 *
 * <p>Problem: Return every possible subset of a set of distinct integers -- each element is either taken or left out.
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
 * 1
 * 1 2
 * 1 2 3
 * 1 3
 * 2
 * 2 3
 * 3
 * </pre>
 *
 * <p>Approach: A depth-first search that adds the current path to the answer and then tries every element that may still be added.
 *
 * <p>Complexity: Time O(n x 2^n), Space O(n).
 */
public class Subsets {

    /**
     * Returns every subset of {@code nums}.
     *
     * <p>The elements of each subset are ascending, so the order of the input does not matter. The
     * result list is sorted lexicographically, which makes the output stable.
     *
     * @param nums the input values (distinct)
     * @return every subset, including the empty one
     */
    public static List<List<Integer>> subsets(int[] nums) {
        int[] sorted = nums.clone();
        Arrays.sort(sorted);

        List<List<Integer>> result = new ArrayList<>();
        generate(sorted, 0, new ArrayList<>(), result);
        result.sort((a, b) -> compareLists(a, b));
        return result;
    }

    /**
     * Depth-first search over the remaining candidates.
     *
     * @param nums   the sorted input values
     * @param start  the first index that may still be picked
     * @param path   the subset built so far
     * @param result the collected subsets
     */
    private static void generate(int[] nums, int start, List<Integer> path, List<List<Integer>> result) {
        result.add(new ArrayList<>(path)); // the current path is a subset of its own

        for (int i = start; i < nums.length; i++) {
            path.add(nums[i]);                       // choose nums[i]
            generate(nums, i + 1, path, result);     // explore
            path.remove(path.size() - 1);            // backtrack -- undo the choice
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
        for (List<Integer> subset : subsets(nums)) {
            if (subset.isEmpty()) {
                continue; // the empty subset would print an empty line
            }
            for (int i = 0; i < subset.size(); i++) {
                if (i > 0) {
                    out.append(' ');
                }
                out.append(subset.get(i));
            }
            out.append('\n');
        }
        System.out.print(out);
    }
}
