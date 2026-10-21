package com.dsa.intervals;

import com.dsa.utils.FastScanner;
import com.dsa.utils.Interval;

import java.util.ArrayList;
import java.util.List;

/**
 * Problem: Interval List Intersections
 * LeetCode: 986 | Difficulty: Medium | Frequency: 3/5
 * Pattern: Two pointers, Sorted sweep
 *
 * <p>Problem:
 * Given two lists of sorted, disjoint intervals, return the intersections of the two
 * lists. Intervals are half-open, {@code [start, end)}, so touching intervals have an
 * empty intersection.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * start[0] end[0]
 * ...
 * start[n-1] end[n-1]
 * m
 * start[0] end[0]
 * ...
 * start[m-1] end[m-1]
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 3
 * 0 2
 * 5 10
 * 13 23
 * 3
 * 1 5
 * 8 12
 * 15 24
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 1 2
 * 8 10
 * 15 23
 * </pre>
 *
 * <p>Approach: two pointers. The next candidate intersection always starts at the
 * larger of the two start values and ends at the smaller of the two end values. If that
 * range is not empty it is an intersection; then the interval that ends first can
 * never overlap anything later in the other list, so advance that pointer.
 *
 * <p>Complexity: Time O(n + m), Space O(n + m).
 */
public class IntervalListIntersections {

    /**
     * Returns every intersection between the two lists.
     *
     * @param first  sorted, disjoint intervals
     * @param second sorted, disjoint intervals
     * @return the intersections, ordered by start time
     */
    public static List<Interval> intersect(List<Interval> first, List<Interval> second) {
        List<Interval> result = new ArrayList<>();
        if (first == null || second == null) {
            return result;
        }
        int i = 0;
        int j = 0;
        while (i < first.size() && j < second.size()) {
            Interval a = first.get(i);
            Interval b = second.get(j);

            int start = Math.max(a.start, b.start);
            int end = Math.min(a.end, b.end);
            if (start < end) {
                result.add(new Interval(start, end));
            }

            if (a.end < b.end) {
                i++;
            } else {
                j++;
            }
        }
        return result;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        List<Interval> first = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            int start = fs.nextInt();
            int end = fs.nextInt();
            first.add(new Interval(start, end));
        }
        int m = fs.nextInt();
        List<Interval> second = new ArrayList<>();
        for (int i = 0; i < m; i++) {
            int start = fs.nextInt();
            int end = fs.nextInt();
            second.add(new Interval(start, end));
        }

        for (Interval interval : intersect(first, second)) {
            System.out.println(interval.start + " " + interval.end);
        }
    }
}
