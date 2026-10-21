package com.dsa.intervals;

import com.dsa.utils.FastScanner;
import com.dsa.utils.Interval;

import java.util.ArrayList;
import java.util.List;

/**
 * Problem: Meeting Rooms
 * LeetCode: 862 | Difficulty: Easy | Frequency: 4/5
 * Pattern: Sorting, Overlap detection
 *
 * <p>Problem:
 * Given the time spans of several meetings, decide whether a person could have attended
 * all of them. Intervals are half-open, {@code [start, end)}, so a meeting that ends
 * exactly when the next one begins does not conflict.
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
 * 3
 * 0 30
 * 5 10
 * 15 20
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * false
 * </pre>
 *
 * <p>Approach: sort the meetings by start time. In a sorted list two intervals can
 * only overlap when they are neighbours, so one pass over the list is enough.
 *
 * <p>Complexity: Time O(n log n), Space O(n).
 */
public class MeetingRooms {

    /**
     * Returns whether no two meetings overlap.
     *
     * @param meetings the meeting time spans
     * @return {@code true} when all meetings can be attended
     */
    public static boolean canAttendAll(List<Interval> meetings) {
        if (meetings == null || meetings.size() <= 1) {
            return true;
        }
        List<Interval> sorted = new ArrayList<>(meetings);
        sorted.sort(null);   // natural order: start first, then end
        for (int i = 1; i < sorted.size(); i++) {
            if (sorted.get(i).start < sorted.get(i - 1).end) {
                return false;
            }
        }
        return true;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        List<Interval> meetings = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            int start = fs.nextInt();
            int end = fs.nextInt();
            meetings.add(new Interval(start, end));
        }

        System.out.println(canAttendAll(meetings) ? "true" : "false");
    }
}
