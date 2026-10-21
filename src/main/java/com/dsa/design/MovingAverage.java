package com.dsa.design;

import com.dsa.utils.FastScanner;

import java.util.ArrayDeque;
import java.util.Deque;
import java.util.Locale;

/**
 * Problem: Moving Average
 * LeetCode: 346 | Difficulty: Easy | Frequency: 3/5
 * Pattern: Design, Running sum with a bounded window
 *
 * <p>Problem:
 * Keep a sliding window of the last {@code k} values and report the average of the
 * window after every new value. While fewer than {@code k} values have been seen, the
 * average is taken over everything seen so far.
 *
 * <p>Input format (stdin):
 * <pre>
 * k
 * n
 * v1
 * v2
 * ...
 * vn
 * </pre>
 * The program prints one line per value: the moving average formatted with two decimals.
 *
 * <p>Sample input:
 * <pre>
 * 3
 * 4
 * 1
 * 2
 * 3
 * 4
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 1.00
 * 1.50
 * 2.00
 * 3.00
 * </pre>
 *
 * <p>Approach: keep the window in a deque together with its sum. Adding a value only
 * touches the sum; once the window grows past {@code k} the oldest value is removed from
 * both. The average is {@code sum / size}.
 *
 * <p>Complexity: Time O(1) per value, Space O(k).
 */
public class MovingAverage {

    private final int k;
    private final Deque<Integer> window = new ArrayDeque<>();
    private long sum;

    public MovingAverage(int k) {
        this.k = Math.max(1, k);
    }

    /** Adds {@code value} to the window and returns the new average. */
    public double next(int value) {
        window.addLast(value);
        sum += value;
        if (window.size() > k) {
            sum -= window.pollFirst();
        }
        return (double) sum / window.size();
    }

    /** Number of values currently inside the window. */
    public int size() {
        return window.size();
    }

    /** Formats an average the same way on every machine and locale. */
    public static String format(double average) {
        return String.format(Locale.ROOT, "%.2f", average);
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int k = fs.nextInt();
        int n = fs.nextInt();

        MovingAverage average = new MovingAverage(k);
        StringBuilder out = new StringBuilder();
        for (int i = 0; i < n; i++) {
            out.append(format(average.next(fs.nextInt()))).append('\n');
        }
        System.out.print(out);
    }
}
