package com.dsa.design;

import com.dsa.utils.FastScanner;

import java.util.ArrayDeque;
import java.util.Deque;

/**
 * Problem: Rate Limiter
 * LeetCode: null | Difficulty: Medium | Frequency: 3/5
 * Pattern: Design, Sliding window over a request log
 *
 * <p>Problem:
 * A rate limiter allows at most {@code capacity} requests inside any window of
 * {@code window} seconds. Every request that arrives is either allowed or rejected.
 * The timestamps of the requests are given in non-decreasing order.
 *
 * <p>Input format (stdin):
 * <pre>
 * capacity window
 * n
 * t1
 * t2
 * ...
 * tn
 * </pre>
 * The program prints one line per request: {@code 1} when the request is allowed and
 * {@code 0} when it is rejected.
 *
 * <p>Sample input:
 * <pre>
 * 2 10
 * 5
 * 0
 * 0
 * 1
 * 11
 * 12
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 1
 * 1
 * 0
 * 1
 * 1
 * </pre>
 *
 * <p>Approach: keep a deque of the timestamps of the requests that are still inside the
 * window. A request at time {@code t} first evicts every timestamp {@code <= t - window},
 * then it is allowed when the deque holds fewer than {@code capacity} timestamps.
 *
 * <p>Complexity: Time O(1) amortised per request, Space O(capacity).
 */
public class RateLimiter {

    private final int capacity;
    private final long window;
    private final Deque<Long> hits = new ArrayDeque<>();

    public RateLimiter(int capacity, long window) {
        this.capacity = Math.max(0, capacity);
        this.window = Math.max(0, window);
    }

    /**
     * Decides whether the request arriving at {@code timestamp} is allowed.
     * Timestamps must be non-decreasing.
     */
    public boolean allow(long timestamp) {
        while (!hits.isEmpty() && hits.peekFirst() <= timestamp - window) {
            hits.pollFirst();
        }
        if (hits.size() >= capacity) {
            return false;
        }
        hits.addLast(timestamp);
        return true;
    }

    /** Number of requests still inside the window. */
    public int used() {
        return hits.size();
    }

    /** Human readable snapshot of the live window. */
    public String state() {
        return hits.toString();
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int capacity = fs.nextInt();
        long window = fs.nextLong();
        int n = fs.nextInt();

        RateLimiter limiter = new RateLimiter(capacity, window);
        StringBuilder out = new StringBuilder();
        for (int i = 0; i < n; i++) {
            long timestamp = fs.nextLong();
            out.append(limiter.allow(timestamp) ? 1 : 0).append('\n');
        }
        System.out.print(out);
    }
}
