var e=`intervals.MeetingRoomsIII`,t=`package com.dsa.intervals;

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
`,n=`import java.util.Arrays;
import java.util.Comparator;
import java.util.Map;
import java.util.TreeMap;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

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
public class Main {

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

// ---------- inlined com.dsa.utils.FastScanner ----------
/**
 * Allocation-light scanner for contest-style stdin input.
 *
 * <p>Every problem in this repository reads its input through this class so the
 * expected stdin format stays consistent across the whole set.
 *
 * <p>Typical usage:
 * <pre>{@code
 * FastScanner fs = new FastScanner(System.in);
 * int n = fs.nextInt();
 * int[] nums = fs.nextIntArray(n);
 * }</pre>
 */
class FastScanner {

    private final BufferedReader reader;
    private final char[] buffer = new char[1 << 16];
    private int ptr = 0;
    private int len = 0;

    public FastScanner(InputStream in) {
        this.reader = new BufferedReader(new InputStreamReader(in, StandardCharsets.UTF_8), 1 << 16);
    }

    /** Returns the next raw character, or -1 at end of input. */
    private int read() throws IOException {
        if (ptr >= len) {
            len = reader.read(buffer);
            ptr = 0;
            if (len <= 0) {
                return -1;
            }
        }
        return buffer[ptr++];
    }

    private void skipWhitespace() throws IOException {
        int c;
        while ((c = read()) != -1) {
            if (!Character.isWhitespace(c)) {
                ptr--; // step back onto the first meaningful character
                return;
            }
        }
    }

    /** True when at least one more non-whitespace character exists. */
    public boolean hasNext() throws IOException {
        skipWhitespace();
        return ptr < len;
    }

    /** Reads the next whitespace-delimited token as a string. */
    public String next() throws IOException {
        skipWhitespace();
        StringBuilder sb = new StringBuilder();
        int c;
        while ((c = read()) != -1 && !Character.isWhitespace(c)) {
            sb.append((char) c);
        }
        return sb.toString();
    }

    public int nextInt() throws IOException {
        skipWhitespace();
        int c = read();
        while (c != -1 && c != '-' && (c < '0' || c > '9')) {
            c = read();
        }
        int sign = 1;
        if (c == '-') {
            sign = -1;
            c = read();
        }
        int value = 0;
        while (c >= '0' && c <= '9') {
            value = value * 10 + (c - '0');
            c = read();
        }
        return sign * value;
    }

    public long nextLong() throws IOException {
        skipWhitespace();
        int c = read();
        while (c != -1 && c != '-' && (c < '0' || c > '9')) {
            c = read();
        }
        int sign = 1;
        if (c == '-') {
            sign = -1;
            c = read();
        }
        long value = 0;
        while (c >= '0' && c <= '9') {
            value = value * 10 + (c - '0');
            c = read();
        }
        return sign * value;
    }

    public double nextDouble() throws IOException {
        return Double.parseDouble(next());
    }

    public char nextChar() throws IOException {
        skipWhitespace();
        int c = read();
        return c == -1 ? '\\0' : (char) c;
    }

    /** Reads exactly {@code n} integers. */
    public int[] nextIntArray(int n) throws IOException {
        int[] out = new int[n];
        for (int i = 0; i < n; i++) {
            out[i] = nextInt();
        }
        return out;
    }

    /** Reads exactly {@code n} longs. */
    public long[] nextLongArray(int n) throws IOException {
        long[] out = new long[n];
        for (int i = 0; i < n; i++) {
            out[i] = nextLong();
        }
        return out;
    }

    /** Reads exactly {@code n} whitespace-delimited strings. */
    public String[] nextStringArray(int n) throws IOException {
        String[] out = new String[n];
        for (int i = 0; i < n; i++) {
            out[i] = next();
        }
        return out;
    }
}

// ---------- inlined com.dsa.utils.Interval ----------
/**
 * Half-open interval {@code [start, end)} used by the interval problems.
 */
class Interval implements Comparable<Interval> {

    public int start;
    public int end;

    public Interval(int start, int end) {
        this.start = start;
        this.end = end;
    }

    public int length() {
        return end - start;
    }

    /** True when the two intervals overlap (touching endpoints do not overlap). */
    public boolean overlaps(Interval other) {
        return start < other.end && other.start < end;
    }

    @Override
    public int compareTo(Interval o) {
        int byStart = Integer.compare(start, o.start);
        return byStart != 0 ? byStart : Integer.compare(end, o.end);
    }

    @Override
    public String toString() {
        return "[" + start + ", " + end + ")";
    }
}
`,r=`
# Meeting Rooms III — LeetCode 1859

| | |
|---|---|
| **Difficulty** | Hard |
| **Pattern** | Greedy · Sorted sweep with room availability |
| **Interview heat** | ★★★☆☆ |
| **Asked at** | Amazon, Google, Meta, Microsoft |

## Problem Statement

Given the time spans of several meetings and a number of rooms, return the **largest
number of meetings** that can be scheduled. Each meeting occupies one room for its
whole span; a meeting may start exactly when another one ends.

> **Convention.** Intervals are half-open, \`[start, end)\`.

## Input Format

The program reads from standard input:

\`\`\`
n
start[0] end[0]
start[1] end[1]
...
start[n-1] end[n-1]
rooms
\`\`\`

- \`n\` — number of meetings (1 ≤ n ≤ 10⁵)
- \`start\` / \`end\` — the time span of each meeting, one meeting per line
- \`rooms\` — number of available rooms (1 ≤ rooms ≤ 10⁵)

## Sample Input

\`\`\`
4
1 3
2 5
3 7
4 8
2
\`\`\`

## Expected Output

\`\`\`
3
\`\`\`

Room 1 hosts \`[1, 3)\` and \`[3, 7)\`; room 2 hosts \`[2, 5)\`. The meeting \`[4, 8)\`
overlaps both and has to be dropped.

## Approach — sort by end time, assign to the latest free room

Sort the meetings by finishing time. Maintain a map from *"this room is free from
time \`t\`"* to the number of such rooms. Initially all \`rooms\` rooms are free from
time \`-∞\`.

For each meeting in order of finishing time:

- Find the **largest** \`t <= meeting.start\` in the map — the room that became free
  last but still in time.
- If there is no such room, the meeting has to be dropped.
- Otherwise consume one of those rooms and make it free again at \`meeting.end\`.

**Exchange argument (why the latest free room is the right choice):** suppose two
rooms became free at \`t₁ ≤ t₂ ≤ meeting.start\`. Both can host the meeting, but they
are not equivalent: the room free since \`t₁\` is also free for every meeting that
starts between \`t₁\` and \`t₂\`, while the room free since \`t₂\` is not. Using the room
free since \`t₂\` (the **latest** one) therefore preserves the more flexible room for
later meetings and can never reduce the number of meetings that still fit. Since every
meeting is processed in order of finishing time and the choice only ever "wastes" the
less flexible room, the greedy assignment is optimal.

The second half of the argument — processing meetings by finishing time — is the
classic activity-selection order: a meeting that finishes earlier leaves at least as
much room for the remaining meetings as any later-finishing meeting with the same
duration.

## Dry Run

Input: \`[(1,3), (2,5), (3,7), (4,8)]\`, \`rooms = 2\`

After sorting by end time: \`[(1,3), (2,5), (3,7), (4,8)]\`

| Step | meeting | map before (\`free from → count\`) | \`floorEntry(start)\` | action | map after | scheduled |
|---:|---|---|---|---|---|---:|
| 1 | \`(1,3)\` | \`{-∞: 2}\` | \`-∞\` (count 2) | use one room, it is free from 3 | \`{-∞: 1, 3: 1}\` | 1 |
| 2 | \`(2,5)\` | \`{-∞: 1, 3: 1}\` | \`-∞\` (count 1) | use the last free room, free from 5 | \`{3: 1, 5: 1}\` | 2 |
| 3 | \`(3,7)\` | \`{3: 1, 5: 1}\` | \`3\` (count 1) | use it, free from 7 | \`{5: 1, 7: 1}\` | 3 |
| 4 | \`(4,8)\` | \`{5: 1, 7: 1}\` | none (\`5 > 4\`) | **no room free in time → drop** | \`{5: 1, 7: 1}\` | 3 |

Answer: **3** scheduled.

## Java Solution

See [\`MeetingRoomsIII.java\`](./MeetingRoomsIII.java).

\`\`\`java
public static int maxMeetings(Interval[] meetings, int rooms) {
    Interval[] sorted = meetings.clone();
    Arrays.sort(sorted, Comparator.comparingInt((Interval interval) -> interval.end)
            .thenComparingInt(interval -> interval.start));

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
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n log n) | the sort plus one \`floorEntry\` and a few map updates per meeting |
| **Space** | O(n) | the sorted copy and the map of room availability |

## Interview Notes

**Follow-ups to raise yourself:**
- *"Return the meetings that were scheduled."* → collect them in a list while sweeping.
- *"What if the rooms have different sizes?"* → the map key must become a list of
  room capacities per availability time.
- *"Why not use a min-heap of room end times?"* → a min-heap hands out the **earliest**
  free room, which is not optimal (see the exchange argument). With a min-heap you
  must take the **largest** end time that is \`<= start\`, which is why the map with
  \`floorEntry\` is used here.

**Common mistakes:**
- ❌ Using a min-heap and popping the smallest end time — that grabs the *least*
  recently freed room and loses meetings.
- ❌ Forgetting the \`count\` bookkeeping when several rooms become free at the same
  time — the map value is the number of such rooms, not a flag.
- ❌ Sorting only by end time without a tie-break — with equal end times the order
  matters; sort by \`(end, start)\`.

**How to narrate:**
> "I sort the meetings by end time and keep a map of how many rooms are free from
> each moment. For every meeting I take the room that became free last but still in
> time — that keeps the rooms that were free earlier available for meetings that
> start earlier. If no room is free in time the meeting is dropped."

## Related Problems

- [Meeting Rooms II](./MeetingRoomsII.md) — the minimum number of rooms for all meetings
- [Non-overlapping Intervals](./NonOverlappingIntervals.md) — the one-room version of this problem
- [Maximum Profit Scheduling Jobs](../greedy/SchedulingMaximumProfit.md) — the weighted variant of the same sweep
`,i=[`maxMeetings`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};