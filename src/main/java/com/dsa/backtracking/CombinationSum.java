package com.dsa.backtracking;

import com.dsa.utils.FastScanner;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * Problem: Combination Sum
 * LeetCode: 39 | Difficulty: Medium | Frequency: 5/5
 * Pattern: Backtracking, DFS with a path
 *
 * <p>Problem: Find every combination of candidates that sums to a target; the same candidate may be used an unlimited number of times.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * candidates[0] candidates[1] ... candidates[n-1]
 * target
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 4
 * 2 3 6 7
 * 7
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 2 2 3
 * 7
 * </pre>
 *
 * <p>Approach: Pick a candidate, subtract it from the remaining target and recurse -- from the **same** index, because a candidate may be reused.
 *
 * <p>Complexity: Time O(n^(target / min)), Space O(target / min).
 */
public class CombinationSum {

    /**
     * Returns every combination of {@code candidates} that sums to {@code target}.
     *
     * <p>A candidate may be used any number of times, so the recursion continues at the same index.
     * The candidates are sorted, which lets the loop stop as soon as a candidate is too large.
     *
     * @param candidates the values to pick from
     * @param target     the wanted sum
     * @return every combination, sorted lexicographically
     */
    public static List<List<Integer>> combinationSum(int[] candidates, int target) {
        int[] sorted = candidates.clone();
        Arrays.sort(sorted);

        List<List<Integer>> result = new ArrayList<>();
        generate(sorted, target, 0, new ArrayList<>(), result);
        result.sort((a, b) -> compareLists(a, b));
        return result;
    }

    /**
     * Depth-first search over the candidates.
     *
     * @param candidates the sorted candidates
     * @param remaining  the sum that is still missing
     * @param start      the first candidate that may still be picked
     * @param path       the combination built so far
     * @param result     the collected combinations
     */
    private static void generate(int[] candidates, int remaining, int start,
                                 List<Integer> path, List<List<Integer>> result) {
        if (remaining == 0) {
            result.add(new ArrayList<>(path)); // the target is reached
            return;
        }
        for (int i = start; i < candidates.length; i++) {
            if (candidates[i] > remaining) {
                break; // sorted input: no later candidate can fit either
            }
            path.add(candidates[i]);                                        // choose
            generate(candidates, remaining - candidates[i], i, path, result); // reuse allowed
            path.remove(path.size() - 1);                                   // backtrack
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
        int[] candidates = fs.nextIntArray(n);
        int target = fs.nextInt();

        StringBuilder out = new StringBuilder();
        for (List<Integer> combination : combinationSum(candidates, target)) {
            for (int i = 0; i < combination.size(); i++) {
                if (i > 0) {
                    out.append(' ');
                }
                out.append(combination.get(i));
            }
            out.append('\n');
        }
        System.out.print(out);
    }
}
