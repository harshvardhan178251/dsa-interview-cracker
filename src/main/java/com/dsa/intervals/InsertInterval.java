package com.dsa.intervals;

import com.dsa.utils.FastScanner;
import com.dsa.utils.Interval;

import java.util.ArrayList;
import java.util.List;

/**
 * Problem: Insert Interval
 * LeetCode: 57 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Sorting, Three-way sweep
 *
 * <p>Problem:
 * Given a list of non-overlapping, sorted intervals and one new interval, insert the new
 * interval and merge it with every interval it overlaps. Intervals are half-open,
 * {@code [start, end)}.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * start[0] end[0]
 * start[1] end[1]
 * ...
 * start[n-1] end[n-1]
 * newStart newEnd
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 3
 * 1 3
 * 6 9
 * 12 15
 * 4 5
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 1 3
 * 4 5
 * 6 9
 * 12 15
 * </pre>
 *
 * <p>Approach: the list is already sorted, so the new interval splits it into three
 * parts — intervals that end before the new one starts, the intervals the new one
 * overlaps (which all merge into it), and the intervals that start after it. Only the
 * middle part has to be scanned to find the new end.
 *
 * <p>Complexity: Time O(n), Space O(n).
 */
public class InsertInterval {

    /**
     * Inserts {@code newInterval} into the sorted list and merges the overlaps.
     *
     * @param intervals   sorted, non-overlapping intervals
     * @param newInterval the interval to insert
     * @return the merged list
     */
    public static List<Interval> insert(List<Interval> intervals, Interval newInterval) {
        List<Interval> result = new ArrayList<>();
        if (intervals == null || intervals.isEmpty()) {
            if (newInterval != null) {
                result.add(new Interval(newInterval.start, newInterval.end));
            }
            return result;
        }
        if (newInterval == null) {
            result.addAll(intervals);
            return result;
        }

        int i = 0;
        int n = intervals.size();
        while (i < n && intervals.get(i).end <= newInterval.start) {
            result.add(new Interval(intervals.get(i).start, intervals.get(i).end));
            i++;
        }
        int start = newInterval.start;
        int end = newInterval.end;
        while (i < n && intervals.get(i).start < end) {
            start = Math.min(start, intervals.get(i).start);
            end = Math.max(end, intervals.get(i).end);
            i++;
        }
        result.add(new Interval(start, end));
        while (i < n) {
            result.add(new Interval(intervals.get(i).start, intervals.get(i).end));
            i++;
        }
        return result;
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
        int newStart = fs.nextInt();
        int newEnd = fs.nextInt();

        for (Interval interval : insert(intervals, new Interval(newStart, newEnd))) {
            System.out.println(interval.start + " " + interval.end);
        }
    }
}
