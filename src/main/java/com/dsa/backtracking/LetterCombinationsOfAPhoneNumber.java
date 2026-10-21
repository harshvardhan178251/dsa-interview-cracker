package com.dsa.backtracking;

import com.dsa.utils.FastScanner;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

/**
 * Problem: Letter Combinations of a Phone Number
 * LeetCode: 17 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Backtracking, DFS with a path
 *
 * <p>Problem: Return every combination of letters that the digits of a phone number can stand for.
 *
 * <p>Input format (stdin):
 * <pre>
 * digits
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 23
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * ad
 * ae
 * af
 * bd
 * be
 * bf
 * cd
 * ce
 * cf
 * </pre>
 *
 * <p>Approach: For every digit, try each of its letters and recurse -- the path is the combination that is built.
 *
 * <p>Complexity: Time O(4^n), Space O(n).
 */
public class LetterCombinationsOfAPhoneNumber {

    /** The letters of the telephone keypad, indexed by the digit. */
    private static final String[] KEYS = {
        "", "", "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"
    };

    /**
     * Returns every letter combination the digits of a phone number stand for.
     *
     * <p>The digits are mapped to the letters of the classic telephone keypad. The search builds the
     * combination one digit at a time.
     *
     * @param digits the phone number
     * @return every combination, sorted lexicographically
     */
    public static List<String> letterCombinations(String digits) {
        List<String> result = new ArrayList<>();
        if (digits == null || digits.isEmpty()) {
            return result;
        }
        build(digits, 0, new StringBuilder(), result);
        result.sort(Comparator.naturalOrder());
        return result;
    }

    /**
     * Depth-first search over the digits.
     *
     * @param digits the phone number
     * @param index  the digit that is handled next
     * @param path   the combination built so far
     * @param result the collected combinations
     */
    private static void build(String digits, int index, StringBuilder path, List<String> result) {
        if (index == digits.length()) {
            result.add(path.toString()); // every digit was expanded
            return;
        }
        String letters = KEYS[digits.charAt(index) - '0'];
        for (int i = 0; i < letters.length(); i++) {
            path.append(letters.charAt(i));      // choose a letter
            build(digits, index + 1, path, result);
            path.deleteCharAt(path.length() - 1); // backtrack
        }
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        String digits = fs.next();

        StringBuilder out = new StringBuilder();
        for (String combination : letterCombinations(digits)) {
            out.append(combination).append('\n');
        }
        System.out.print(out);
    }
}
