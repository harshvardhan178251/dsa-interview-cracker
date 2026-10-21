package com.dsa.design;

import com.dsa.utils.FastScanner;

import java.util.ArrayDeque;
import java.util.Deque;

/**
 * Problem: Design Hit Counter
 * LeetCode: 362 | Difficulty: Medium | Frequency: 3/5
 * Pattern: Design, Sliding window over a hit log
 *
 * <p>Problem:
 * Design a hit counter for a simple page counter. Every call to {@code hit} registers a
 * hit at the given timestamp and returns the number of hits in the last 5 minutes
 * (300 seconds), including the current one. Timestamps arrive in non-decreasing order.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * t1
 * t2
 * ...
 * tn
 * </pre>
 * The program prints one line per hit: the number of hits in the last 300 seconds.
 *
 * <p>Sample input:
 * <pre>
 * 5
 * 1
 * 2
 * 3
 * 300
 * 301
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 1
 * 2
 * 3
 * 4
 * 4
 * </pre>
 *
 * <p>Approach: a deque of timestamps. On every hit, drop the timestamps that fell out of
 * the 300 second window, then append the new one. The size of the deque is the answer.
 *
 * <p>Complexity: Time O(1) amortised per hit, Space O(hits inside the window).
 */
public class DesignHitCounter {

    /** Length of the counting window in seconds. */
    public static final int WINDOW_SECONDS = 300;

    private final Deque<Integer> hits = new ArrayDeque<>();

    /** Registers a hit at {@code timestamp} and returns the hits in the last 5 minutes. */
    public int hit(int timestamp) {
        while (!hits.isEmpty() && hits.peekFirst() <= timestamp - WINDOW_SECONDS) {
            hits.pollFirst();
        }
        hits.addLast(timestamp);
        return hits.size();
    }

    /** Number of hits currently inside the window. */
    public int size() {
        return hits.size();
    }

    /** Human readable snapshot of the live window. */
    public String state() {
        return hits.toString();
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();

        DesignHitCounter counter = new DesignHitCounter();
        StringBuilder out = new StringBuilder();
        for (int i = 0; i < n; i++) {
            int timestamp = fs.nextInt();
            out.append(counter.hit(timestamp)).append('\n');
        }
        System.out.print(out);
    }
}
