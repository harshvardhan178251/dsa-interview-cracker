package com.dsa.backtracking;

import com.dsa.utils.FastScanner;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * Problem: Combination Sum II
 * LeetCode: 40 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Backtracking, Duplicate pruning
 *
 * <p>Problem: Find every combination of candidates that sums to a target; each candidate may be used only once and the input may contain duplicates.
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
 * 7
 * 10 1 2 7 6 1 5
 * 8
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 1 1 6
 * 1 2 5
 * 1 7
 * 2 6
 * </pre>
 *
 * <p>Approach: Backtracking with two rules: recurse at `i + 1` (each candidate once) and skip equal candidates at the same level.
 *
 * <p>Complexity: Time O(n x 2^n), Space O(n).
 */
public class CombinationSumII {

    /**
     * Returns every combination of {@code candidates} that sums to {@code target}.
     *
     * <p>Each candidate may be used at most once. Because the input may contain duplicates, equal
     * candidates are skipped inside the same recursion level -- otherwise the same combination would be
     * produced several times.
     *
     * @param candidates the values to pick from
     * @param target     the wanted sum
     * @return every distinct combination, sorted lexicographically
     */
    public static List<List<Integer>> combinationSum2(int[] candidates, int target) {
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
            result.add(new ArrayList<>(path));
            return;
        }
        for (int i = start; i < candidates.length; i++) {
            if (i > start && candidates[i] == candidates[i - 1]) {
                continue; // the same value was already tried at this level
            }
            if (candidates[i] > remaining) {
                break; // sorted input: no later candidate can fit either
            }
            path.add(candidates[i]);                                            // choose
            generate(candidates, remaining - candidates[i], i + 1, path, result); // used once
            path.remove(path.size() - 1);                                       // backtrack
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
        for (List<Integer> combination : combinationSum2(candidates, target)) {
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
