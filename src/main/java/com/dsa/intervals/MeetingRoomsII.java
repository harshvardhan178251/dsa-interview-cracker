package com.dsa.intervals;

import com.dsa.utils.FastScanner;
import com.dsa.utils.Interval;

import java.util.ArrayList;
import java.util.List;
import java.util.PriorityQueue;

/**
 * Problem: Meeting Rooms II
 * LeetCode: 692 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Sweep line, Min-heap of end times
 *
 * <p>Problem:
 * Given the time spans of several meetings, return the smallest number of rooms needed
 * so that every meeting can take place. Intervals are half-open, {@code [start, end)}.
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
 * 2
 * </pre>
 *
 * <p>Approach: sort the meetings by start time and keep a min-heap with the end time of
 * every occupied room. A room whose meeting has already ended ({@code end <= start}) is
 * reused; otherwise a new room is needed. The largest size the heap reaches is the
 * answer.
 *
 * <p>Complexity: Time O(n log n), Space O(n).
 */
public class MeetingRoomsII {

    /**
     * Returns the minimum number of rooms needed.
     *
     * @param meetings the meeting time spans
     * @return the minimum number of rooms
     */
    public static int minRooms(List<Interval> meetings) {
        if (meetings == null || meetings.isEmpty()) {
            return 0;
        }
        List<Interval> sorted = new ArrayList<>(meetings);
        sorted.sort(null);   // natural order: start first, then end

        PriorityQueue<Integer> roomEnds = new PriorityQueue<>();
        int rooms = 0;
        for (Interval meeting : sorted) {
            while (!roomEnds.isEmpty() && roomEnds.peek() <= meeting.start) {
                roomEnds.poll();   // this room became free
            }
            roomEnds.offer(meeting.end);
            rooms = Math.max(rooms, roomEnds.size());
        }
        return rooms;
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

        System.out.println(minRooms(meetings));
    }
}
