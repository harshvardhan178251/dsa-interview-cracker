package com.dsa.binarysearch;

import com.dsa.utils.FastScanner;

/**
 * Problem: Sqrt(x)
 * LeetCode: 69 | Difficulty: Easy | Frequency: 4/5
 * Pattern: Binary search on the answer
 *
 * <p>Problem:
 * Given a non-negative integer {@code x}, return the largest integer {@code r} such that
 * {@code r * r <= x} — i.e. the integer square root of {@code x} rounded down.
 *
 * <p>Input format (stdin):
 * <pre>
 * x
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 8
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 2
 * </pre>
 *
 * <p>Approach: the square root is the answer to a monotone question — "is {@code mid} squared
 * still within {@code x}?". Binary search over the candidate range {@code [1, x/2]} and keep
 * the largest candidate whose square does not exceed {@code x}. Squaring is done in
 * {@code long} arithmetic so that large inputs cannot overflow.
 *
 * <p>Complexity: Time O(log x), Space O(1).
 */
public class SquareRootOfANumber {

    /**
     * Returns {@code floor(sqrt(x))} without using {@code Math.sqrt}.
     *
     * @param x the non-negative radicand
     * @return the integer square root, rounded down
     */
    public static int mySqrt(int x) {
        if (x < 2) {
            return x;
        }
        int left = 1;
        int right = x / 2;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            long square = (long) mid * mid;
            if (square == x) {
                return mid;
            } else if (square < x) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        // The loop exits with right = the largest value whose square is <= x.
        return right;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int x = fs.nextInt();

        System.out.println(mySqrt(x));
    }
}
