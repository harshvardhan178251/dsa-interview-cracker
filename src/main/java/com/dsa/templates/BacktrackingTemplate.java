package com.dsa.templates;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * Copy-paste starting points for the backtracking shapes.
 *
 * <p>The template is always: **choose → explore → undo**. See the
 * [backtracking notes](../../../docs/topics/18-backtracking.md).
 */
public final class BacktrackingTemplate {

    private BacktrackingTemplate() {
    }

    /** Subsets — each element used at most once, order does not matter. */
    public static List<List<Integer>> subsets(int[] nums) {
        List<List<Integer>> result = new ArrayList<>();
        backtrackSubsets(nums, 0, new ArrayList<>(), result);
        return result;
    }

    private static void backtrackSubsets(int[] nums, int start, List<Integer> path,
                                          List<List<Integer>> result) {
        result.add(new ArrayList<>(path));          // copy — never add the path itself
        for (int i = start; i < nums.length; i++) {
            path.add(nums[i]);                      // choose
            backtrackSubsets(nums, i + 1, path, result);
            path.remove(path.size() - 1);           // undo
        }
    }

    /** Combinations — a fixed size, order does not matter. */
    public static List<List<Integer>> combinations(int[] nums, int k) {
        List<List<Integer>> result = new ArrayList<>();
        backtrackCombinations(nums, k, 0, new ArrayList<>(), result);
        return result;
    }

    private static void backtrackCombinations(int[] nums, int k, int start, List<Integer> path,
                                              List<List<Integer>> result) {
        if (path.size() == k) {
            result.add(new ArrayList<>(path));
            return;
        }
        for (int i = start; i < nums.length; i++) {
            path.add(nums[i]);
            backtrackCombinations(nums, k, i + 1, path, result);
            path.remove(path.size() - 1);
        }
    }

    /** Permutations — order matters. */
    public static List<List<Integer>> permutations(int[] nums) {
        List<List<Integer>> result = new ArrayList<>();
        boolean[] used = new boolean[nums.length];
        backtrackPermutations(nums, used, new ArrayList<>(), result);
        return result;
    }

    private static void backtrackPermutations(int[] nums, boolean[] used, List<Integer> path,
                                              List<List<Integer>> result) {
        if (path.size() == nums.length) {
            result.add(new ArrayList<>(path));
            return;
        }
        for (int i = 0; i < nums.length; i++) {
            if (used[i]) {
                continue;
            }
            used[i] = true;
            path.add(nums[i]);
            backtrackPermutations(nums, used, path, result);
            path.remove(path.size() - 1);
            used[i] = false;
        }
    }

    /** Combinations with repetition — pass {@code i}, not {@code i + 1}. */
    public static List<List<Integer>> combinationSum(int[] candidates, int target) {
        List<List<Integer>> result = new ArrayList<>();
        backtrackCombinationSum(candidates, target, 0, new ArrayList<>(), result);
        return result;
    }

    private static void backtrackCombinationSum(int[] candidates, int remaining, int start,
                                                List<Integer> path, List<List<Integer>> result) {
        if (remaining == 0) {
            result.add(new ArrayList<>(path));
            return;
        }
        for (int i = start; i < candidates.length; i++) {
            if (candidates[i] > remaining) {
                break;                               // candidates are sorted
            }
            path.add(candidates[i]);
            backtrackCombinationSum(candidates, remaining - candidates[i], i, path, result);
            path.remove(path.size() - 1);
        }
    }

    /** Grid search — mark the cell, recurse, then restore it. */
    public static boolean wordSearch(char[][] board, String word) {
        for (int r = 0; r < board.length; r++) {
            for (int c = 0; c < board[0].length; c++) {
                if (search(board, word, r, c, 0)) {
                    return true;
                }
            }
        }
        return false;
    }

    private static boolean search(char[][] board, String word, int r, int c, int index) {
        if (r < 0 || r >= board.length || c < 0 || c >= board[0].length) {
            return false;
        }
        if (board[r][c] != word.charAt(index)) {
            return false;
        }
        if (index == word.length() - 1) {
            return true;
        }
        char saved = board[r][c];
        board[r][c] = '#';                            // mark visited
        boolean found = search(board, word, r + 1, c, index + 1)
                || search(board, word, r - 1, c, index + 1)
                || search(board, word, r, c + 1, index + 1)
                || search(board, word, r, c - 1, index + 1);
        board[r][c] = saved;                         // restore
        return found;
    }

    public static void main(String[] args) {
        System.out.println("subsets         = " + subsets(new int[]{1, 2, 3}));
        System.out.println("combinations(2) = " + combinations(new int[]{1, 2, 3}, 2));
        System.out.println("permutations    = " + permutations(new int[]{1, 2, 3}));
        System.out.println("combinationSum  = " + combinationSum(new int[]{2, 3, 6, 7}, 7));
        System.out.println("wordSearch      = "
                + wordSearch(new char[][]{{'A', 'B', 'C', 'E'}, {'S', 'F', 'C', 'S'},
                        {'A', 'D', 'E', 'E'}}, "ABCCED"));
        System.out.println("Arrays helper   = " + Arrays.asList(1, 2, 3));
    }
}
