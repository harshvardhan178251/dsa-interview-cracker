package com.dsa.strings;

import com.dsa.utils.FastScanner;

/**
 * Problem: Compare Version Numbers
 * LeetCode: 165 | Difficulty: Medium | Frequency: 3/5
 * Pattern: Two pointers, Segment by segment
 *
 * <p>Problem: Compare two version numbers given as dotted strings and return
 * {@code -1}, {@code 0} or {@code 1} depending on whether the first version is
 * smaller, equal or larger than the second. Revision numbers are compared
 * numerically, not as text, and a missing revision counts as zero.
 *
 * <p>Input format (stdin):
 * <pre>
 * version1
 * version2
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 1.2
 * 1.10
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * -1
 * </pre>
 *
 * <p>Approach: split both versions on {@code '.'} and compare the revisions one by
 * one as integers. As soon as a pair differs, that pair decides the result; if every
 * shared revision is equal, the version with more revisions wins.
 *
 * <p>Complexity: Time O(n + m), Space O(n + m) for the split arrays.
 */
public class CompareVersionNumbers {

    /**
     * Compares two version numbers.
     *
     * @param version1 the first version, e.g. {@code "1.2"}
     * @param version2 the second version, e.g. {@code "1.10"}
     * @return {@code -1} if version1 &lt; version2, {@code 0} if equal, {@code 1} otherwise
     */
    public static int compareVersions(String version1, String version2) {
        String[] a = version1.split("\\.");
        String[] b = version2.split("\\.");
        int revisions = Math.max(a.length, b.length);

        for (int i = 0; i < revisions; i++) {
            int left = (i < a.length) ? parseRevision(a[i]) : 0;
            int right = (i < b.length) ? parseRevision(b[i]) : 0;
            if (left != right) {
                return left < right ? -1 : 1;
            }
        }
        return 0;
    }

    /**
     * Parses a single revision into an integer.
     *
     * <p>Leading zeros are ignored ({@code "01"} is {@code 1}) and a revision that
     * does not fit into an {@code int} is saturated at {@code Integer.MAX_VALUE}.
     */
    private static int parseRevision(String revision) {
        long value = 0;
        for (int i = 0; i < revision.length(); i++) {
            char c = revision.charAt(i);
            if (c < '0' || c > '9') {
                break;
            }
            value = value * 10 + (c - '0');
            if (value > Integer.MAX_VALUE) {
                return Integer.MAX_VALUE;
            }
        }
        return (int) value;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        String version1 = fs.next();
        String version2 = fs.next();

        System.out.println(compareVersions(version1, version2));
    }
}
