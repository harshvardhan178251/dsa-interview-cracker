package com.dsa.intervals;

import com.dsa.utils.FastScanner;
import com.dsa.utils.Interval;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

/**
 * Problem: Employee Free Time
 * LeetCode: 759 | Difficulty: Medium | Frequency: 3/5
 * Pattern: Merge then complement
 *
 * <p>Problem:
 * Every employee has a list of busy time spans. Return the time spans during which
 * **every** employee is free. Intervals are half-open, {@code [start, end)}.
 *
 * <p>Input format (stdin): the number of employees, followed by one group of busy
 * blocks per employee. Every group is a list of {@code start end} lines terminated by a
 * line containing the single marker {@code -1}:
 * <pre>
 * n
 * start end
 * ...
 * -1
 * start end
 * ...
 * -1
 * ...
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 2
 * 1 3
 * 6 7
 * -1
 * 2 5
 * 8 9
 * -1
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 5 6
 * 7 8
 * </pre>
 *
 * <p>Approach: merge the busy blocks of all employees into one timeline, then the gaps
 * between the merged blocks are exactly the times when nobody is busy.
 *
 * <p>Complexity: Time O(n log n) for n busy blocks, Space O(n).
 */
public class EmployeeFreeTime {

    /**
     * Returns the spans during which every employee is free.
     *
     * @param schedules the busy blocks of every employee
     * @return the free spans, ordered by start time
     */
    public static List<Interval> freeTime(List<List<Interval>> schedules) {
        List<Interval> free = new ArrayList<>();
        if (schedules == null || schedules.isEmpty()) {
            return free;
        }
        List<Interval> busy = new ArrayList<>();
        for (List<Interval> blocks : schedules) {
            if (blocks != null) {
                busy.addAll(blocks);
            }
        }
        if (busy.isEmpty()) {
            return free;
        }
        busy.sort(Comparator.comparingInt((Interval interval) -> interval.start)
                .thenComparingInt(interval -> interval.end));

        Interval current = new Interval(busy.get(0).start, busy.get(0).end);
        for (int i = 1; i < busy.size(); i++) {
            Interval next = busy.get(i);
            if (next.start < current.end) {
                current.end = Math.max(current.end, next.end);
            } else {
                if (current.end < next.start) {
                    free.add(new Interval(current.end, next.start));
                }
                current = new Interval(next.start, next.end);
            }
        }
        return free;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        List<List<Interval>> schedules = new ArrayList<>();
        for (int employee = 0; employee < n; employee++) {
            List<Interval> blocks = new ArrayList<>();
            while (true) {
                int start = fs.nextInt();
                if (start == -1) {
                    break;   // end of this employee's blocks
                }
                int end = fs.nextInt();
                blocks.add(new Interval(start, end));
            }
            schedules.add(blocks);
        }

        for (Interval interval : freeTime(schedules)) {
            System.out.println(interval.start + " " + interval.end);
        }
    }
}
