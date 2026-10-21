package com.dsa.binarysearch;

import com.dsa.utils.FastScanner;

/**
 * Problem: First Bad Version
 * LeetCode: 278 | Difficulty: Easy | Frequency: 4/5
 * Pattern: Binary search on a monotone predicate
 *
 * <p>Problem:
 * You have {@code n} versions of a product. The first bad version is the earliest version that
 * contains a defect; every later version is bad as well. Given a predicate
 * {@code isBadVersion(v)} that reports whether version {@code v} is bad, find the first bad
 * version.
 *
 * <p>Because the answer is not given on stdin, the predicate is implemented here as a
 * documented stub: this exercise treats every version {@code >= 4} as bad. Change
 * {@link #FIRST_BAD_VERSION} (or the body of {@link #isBadVersion(int)}) to model a different
 * release history; the search algorithm does not change.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * </pre>
 * where {@code n} is the highest version number that exists (versions are 1..n).
 *
 * <p>Sample input:
 * <pre>
 * 5
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 4
 * </pre>
 *
 * <p>Approach: {@code isBadVersion} is monotone — false for every version before the first bad
 * one and true from that version onwards. Binary search for the first index where the
 * predicate turns true.
 *
 * <p>Complexity: Time O(log n), Space O(1).
 */
public class FirstBadVersion {

    /**
     * The first bad version in this exercise. Every version greater than or equal to this
     * number is considered bad.
     */
    public static final int FIRST_BAD_VERSION = 4;

    /**
     * Stub for the release-history oracle. In a real interview this would be a library call
     * the candidate does not control.
     *
     * @param version the version number to test (1-based)
     * @return {@code true} when the version contains the defect
     */
    public static boolean isBadVersion(int version) {
        return version >= FIRST_BAD_VERSION;
    }

    /**
     * Returns the smallest version number that is bad.
     *
     * @param n the highest version that exists
     * @return the first bad version, or {@code -1} when no version is bad
     */
    public static int firstBadVersion(int n) {
        if (n < 1 || !isBadVersion(n)) {
            return -1;
        }
        int left = 1;
        int right = n;
        // Invariant: the first bad version lies inside [left, right].
        while (left < right) {
            int mid = left + (right - left) / 2;
            if (isBadVersion(mid)) {
                right = mid;
            } else {
                left = mid + 1;
            }
        }
        return left;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();

        System.out.println(firstBadVersion(n));
    }
}
