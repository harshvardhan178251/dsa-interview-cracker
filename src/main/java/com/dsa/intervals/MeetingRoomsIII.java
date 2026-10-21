package com.dsa.intervals;

import com.dsa.utils.FastScanner;
import com.dsa.utils.Interval;

import java.util.Arrays;
import java.util.Comparator;
import java.util.Map;
import java.util.TreeMap;

/**
 * Problem: Meeting Rooms III
 * LeetCode: 1859 | Difficulty: Hard | Frequency: 3/5
 * Pattern: Greedy, Sorted sweep with room availability
 *
 * <p>Problem:
 * Given the time spans of several meetings and a number of rooms, return the largest
 * number of meetings that can be scheduled. A meeting occupies one room for its whole
 * span; intervals are half-open, {@code [start, end)}, so a meeting may start exactly
 * when another one ends.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * start[0] end[0]
 * start[1] end[1]
 * ...
 * start[n-1] end[n-1]
 * rooms
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 4
 * 1 3
 * 2 5
 * 4 8
 * 7 9
 * 2
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 3
 * </pre>
 *
 * <p>Approach: sort the meetings by finishing time and keep a map from "the room is
 * free at time t" to the number of such rooms. For every meeting take the room that
 * became free last but not later than the meeting's start — that keeps the rooms that
 * were free earlier around for the meetings that start earlier. When no room is free
 * in time the meeting is dropped.
 *
 * <p>Complexity: Time O(n log n), Space O(n).
 */
public class MeetingRoomsIII {

    /**
     * Returns the maximum number of meetings that can be scheduled.
     *
     * @param meetings the meeting time spans
     * @param rooms    number of available rooms
     * @return the number of scheduled meetings
     */
    public static int maxMeetings(Interval[] meetings, int rooms) {
        if (meetings == null || meetings.length == 0 || rooms <= 0) {
            return 0;
        }
        Interval[] sorted = meetings.clone();
        Arrays.sort(sorted, Comparator.comparingInt((Interval interval) -> interval.end)
                .thenComparingInt(interval -> interval.start));

        // freeAt -> number of rooms that are free from that moment on
        TreeMap<Integer, Integer> freeAt = new TreeMap<>();
        freeAt.put(Integer.MIN_VALUE, rooms);

        int scheduled = 0;
        for (Interval meeting : sorted) {
            Map.Entry<Integer, Integer> entry = freeAt.floorEntry(meeting.start);
            if (entry == null) {
                continue;   // no room is free in time
            }
            int freeFrom = entry.getKey();
            int count = entry.getValue();
            if (count == 1) {
                freeAt.remove(freeFrom);
            } else {
                freeAt.put(freeFrom, count - 1);
            }
            freeAt.merge(meeting.end, 1, Integer::sum);
            scheduled++;
        }
        return scheduled;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        Interval[] meetings = new Interval[n];
        for (int i = 0; i < n; i++) {
            int start = fs.nextInt();
            int end = fs.nextInt();
            meetings[i] = new Interval(start, end);
        }
        int rooms = fs.nextInt();

        System.out.println(maxMeetings(meetings, rooms));
    }
}
