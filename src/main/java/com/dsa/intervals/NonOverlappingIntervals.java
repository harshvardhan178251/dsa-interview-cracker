package com.dsa.intervals;

import com.dsa.utils.FastScanner;
import com.dsa.utils.Interval;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

/**
 * Problem: Non-overlapping Intervals
 * LeetCode: 435 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Greedy, Earliest finishing time
 *
 * <p>Problem:
 * Given a collection of intervals, return the largest number of intervals that can be
 * selected so that no two of them overlap. Intervals are half-open, {@code [start, end)}.
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
 * 1 2
 * 2 3
 * 3 4
 * 4 5
 * 5 6
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 5
 * </pre>
 *
 * <p>Approach: sort the intervals by finishing time and always keep the interval that
 * finishes first — that choice leaves the most room for everything that comes after it.
 *
 * <p>Complexity: Time O(n log n), Space O(n).
 */
public class NonOverlappingIntervals {

    /**
     * Returns the maximum number of non-overlapping intervals.
     *
     * @param intervals the intervals to choose from
     * @return the maximum number of intervals that can be kept
     */
    public static int maxNonOverlapping(List<Interval> intervals) {
        if (intervals == null || intervals.isEmpty()) {
            return 0;
        }
        List<Interval> sorted = new ArrayList<>(intervals);
        sorted.sort(Comparator.comparingInt((Interval interval) -> interval.end)
                .thenComparingInt(interval -> interval.start));

        int kept = 0;
        int lastEnd = Integer.MIN_VALUE;
        for (Interval interval : sorted) {
            if (interval.start >= lastEnd) {
                kept++;
                lastEnd = interval.end;
            }
        }
        return kept;
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

        System.out.println(maxNonOverlapping(intervals));
    }
}
