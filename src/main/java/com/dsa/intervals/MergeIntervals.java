package com.dsa.intervals;

import com.dsa.utils.FastScanner;
import com.dsa.utils.Interval;

import java.util.ArrayList;
import java.util.List;

/**
 * Problem: Merge Intervals
 * LeetCode: 56 | Difficulty: Medium | Frequency: 5/5
 * Pattern: Sorting, Sweep line
 *
 * <p>Problem:
 * Given a collection of intervals, merge all overlapping intervals and return the
 * resulting collection. Intervals are half-open, {@code [start, end)}, so two intervals
 * that only touch ({@code a.end == b.start}) do not overlap.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * start[0] end[0]
 * start[1] end[1]
 * ...
 * start[n-1] end[n-1]
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 5
 * 1 3
 * 2 6
 * 8 10
 * 15 18
 * 4 5
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 1 6
 * 8 10
 * 15 18
 * </pre>
 *
 * <p>Approach: sort the intervals by start time and sweep once. Keep the interval that
 * is currently open; when the next one starts before the open one ends, extend the open
 * interval instead of starting a new one.
 *
 * <p>Complexity: Time O(n log n), Space O(n).
 */
public class MergeIntervals {

    /**
     * Merges all overlapping intervals.
     *
     * @param intervals the intervals to merge
     * @return the merged intervals, ordered by start time
     */
    public static List<Interval> merge(List<Interval> intervals) {
        List<Interval> merged = new ArrayList<>();
        if (intervals == null || intervals.isEmpty()) {
            return merged;
        }
        List<Interval> sorted = new ArrayList<>(intervals);
        sorted.sort(null);   // natural order: start first, then end

        Interval current = new Interval(sorted.get(0).start, sorted.get(0).end);
        for (int i = 1; i < sorted.size(); i++) {
            Interval next = sorted.get(i);
            if (next.start < current.end) {
                current.end = Math.max(current.end, next.end);
            } else {
                merged.add(current);
                current = new Interval(next.start, next.end);
            }
        }
        merged.add(current);
        return merged;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        List<Interval> intervals = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            int start = fs.nextInt();
            int end = fs.nextInt();
            intervals.add(new Interval(start, end));
        }

        for (Interval interval : merge(intervals)) {
            System.out.println(interval.start + " " + interval.end);
        }
    }
}
