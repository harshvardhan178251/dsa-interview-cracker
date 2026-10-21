package com.dsa.strings;

import com.dsa.utils.FastScanner;

/**
 * Problem: String Compression
 * LeetCode: null | Difficulty: Easy | Frequency: 2/5
 * Pattern: Run-length encoding, Two pointers
 *
 * <p>Problem: Compress a string by replacing every run of equal consecutive
 * characters with the character followed by the number of times it occurs.
 *
 * <p>For example {@code "aabcccccaaa"} becomes {@code "a2b1c4a3"}.
 *
 * <p>Input format (stdin):
 * <pre>
 * s
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * aabcccccaaa
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * a2b1c5a3
 * </pre>
 *
 * <p>Approach: walk the string once. A second index runs ahead while the characters
 * are equal; when the run ends, the character and the run length are appended.
 *
 * <p>Complexity: Time O(n), Space O(n).
 */
public class StringCompression {

    /**
     * Compresses the runs of equal characters in {@code s}.
     *
     * @param s the string to compress
     * @return the run-length encoded string
     */
    public static String compress(String s) {
        if (s.isEmpty()) {
            return "";
        }

        StringBuilder sb = new StringBuilder();
        int runLength = 1;

        // The loop runs one step past the end so that the final run is flushed too.
        for (int i = 1; i <= s.length(); i++) {
            if (i < s.length() && s.charAt(i) == s.charAt(i - 1)) {
                runLength++;
            } else {
                sb.append(s.charAt(i - 1)).append(runLength);
                runLength = 1;
            }
        }
        return sb.toString();
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        String s = fs.next();

        System.out.println(compress(s));
    }
}
