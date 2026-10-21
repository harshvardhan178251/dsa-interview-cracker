package com.dsa.strings;

import com.dsa.utils.FastScanner;

/**
 * Problem: Count and Say
 * LeetCode: 38 | Difficulty: Medium | Frequency: 3/5
 * Pattern: Run-length encoding, String building
 *
 * <p>Problem: The "look-and-say" sequence starts with {@code "1"}. Each following term
 * describes the previous one by listing the length of every run of equal digits,
 * followed by the digit itself.
 *
 * <pre>
 * 1 -&gt; 11 -&gt; 21 -&gt; 1211 -&gt; 111221 -&gt; ...
 * </pre>
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 4
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 1211
 * </pre>
 *
 * <p>Approach: start from {@code "1"} and apply a "describe the runs" helper
 * {@code n - 1} times.
 *
 * <p>Complexity: Time O(total length of all generated terms), Space O(length of the
 * last term).
 */
public class CountAndSay {

    /**
     * Returns the {@code n}-th term of the look-and-say sequence.
     *
     * @param n the 1-based term number (n ≥ 1)
     * @return the term, e.g. {@code "1211"} for n = 4
     */
    public static String countAndSay(int n) {
        String current = "1";
        for (int step = 1; step < n; step++) {
            current = describe(current);
        }
        return current;
    }

    /**
     * Describes the runs of equal characters in {@code s}.
     *
     * <p>{@code "111221"} becomes {@code "312211"}: three {@code 1}s, two {@code 2}s,
     * one {@code 1}.
     */
    private static String describe(String s) {
        StringBuilder sb = new StringBuilder();
        int i = 0;
        while (i < s.length()) {
            int j = i;
            while (j < s.length() && s.charAt(j) == s.charAt(i)) {
                j++;
            }
            sb.append(j - i).append(s.charAt(i));
            i = j;
        }
        return sb.toString();
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();

        System.out.println(countAndSay(n));
    }
}
