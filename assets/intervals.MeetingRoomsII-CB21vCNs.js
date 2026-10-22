var e=`intervals.MeetingRoomsII`,t=`package com.dsa.intervals;

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
`,n=`import java.util.ArrayList;
import java.util.List;
import java.util.PriorityQueue;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

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
public class Main {

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
# Meeting Rooms II — LeetCode 692

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Sweep line · Min-heap of end times |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Uber |

## Problem Statement

Given the time spans of several meetings, return the **smallest number of rooms** that
is needed so that every meeting can take place.

> **Convention.** Intervals are half-open, \`[start, end)\`. A meeting may start exactly
> when another one ends — the room is free again at that moment.

## Input Format

The program reads from standard input:

\`\`\`
n
start[0] end[0]
start[1] end[1]
...
start[n-1] end[n-1]
\`\`\`

- \`n\` — number of meetings (0 ≤ n ≤ 10⁵)
- \`start\` / \`end\` — the time span of each meeting, one meeting per line

## Sample Input

\`\`\`
3
0 30
5 10
15 20
\`\`\`

## Expected Output

\`\`\`
2
\`\`\`

The long meeting \`[0, 30)\` needs one room; the other two can share the second one.

## Approach — sort by start, keep the room end times in a min-heap

Sort the meetings by start time and keep a min-heap that holds the end time of every
**occupied** room. For each meeting:

1. While the earliest room ends at or before the meeting starts, that room is free →
   remove it from the heap.
2. Put the meeting into a room: push its end time.
3. The size of the heap after the push is the number of rooms in use at that moment;
   the largest size seen is the answer.

**Exchange argument (why reusing the earliest free room is safe):** when a meeting
starts, every room whose end time is \`<= start\` is free, and any of them can host the
meeting. The choice does not matter for the *number* of rooms: the room is occupied
again from \`start\` to \`meeting.end\` in either case, and all free rooms are
interchangeable for every future meeting (they are all free at \`start\` and stay free
until they are used). What matters is that we reuse a room whenever one is available
— opening a new room while a free one exists can only increase the answer, so the
greedy "reuse if possible, otherwise open a new room" is optimal. The maximum number
of simultaneously running meetings is a lower bound on the number of rooms, and the
greedy achieves exactly that bound.

## Dry Run

Input: \`[(0,30), (5,10), (15,20)]\`

After sorting by start: \`[(0,30), (5,10), (15,20)]\`

| Step | meeting | heap before | rooms freed (\`end <= start\`) | heap after | rooms in use | max rooms |
|---:|---|---|---|---|---:|---:|
| 1 | \`(0,30)\` | \`{}\` | — | \`{30}\` | 1 | 1 |
| 2 | \`(5,10)\` | \`{30}\` | \`30 <= 5\`? no | \`{10, 30}\` | 2 | 2 |
| 3 | \`(15,20)\` | \`{10, 30}\` | \`10 <= 15\` ✓ → pop \`10\` | \`{20, 30}\` | 2 | 2 |

The largest heap size is **2** ✓

### Trace where the rooms are reused heavily — \`[(1,2), (2,3), (3,4), (4,5)]\`

| Step | meeting | heap before | freed | heap after | rooms in use | max |
|---:|---|---|---|---|---:|---:|
| 1 | \`(1,2)\` | \`{}\` | — | \`{2}\` | 1 | 1 |
| 2 | \`(2,3)\` | \`{2}\` | \`2 <= 2\` ✓ → pop | \`{3}\` | 1 | 1 |
| 3 | \`(3,4)\` | \`{3}\` | \`3 <= 3\` ✓ → pop | \`{4}\` | 1 | 1 |
| 4 | \`(4,5)\` | \`{4}\` | \`4 <= 4\` ✓ → pop | \`{5}\` | 1 | 1 |

One room is enough because the meetings only touch.

## Java Solution

See [\`MeetingRoomsII.java\`](./MeetingRoomsII.java).

\`\`\`java
public static int minRooms(List<Interval> meetings) {
    List<Interval> sorted = new ArrayList<>(meetings);
    sorted.sort(null);

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
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n log n) | the sort plus one push and one pop per meeting |
| **Space** | O(n) | the heap can hold every meeting |

## Interview Notes

**Follow-ups to raise yourself:**
- *"Can you do it with a sweep line over events?"* → yes: create a \`+1\` event at every
  start and a \`-1\` event at every end, sort the events and sweep; process the \`-1\`
  events before the \`+1\` events at the same timestamp (half-open intervals).
- *"What if the meetings have different sizes?"* → a room may host several meetings at
  once; the sweep needs to track the free capacity, not just the count.
- *"Which room should a meeting go to?"* → any free room works; keep a min-heap of
  free room ids if the ids matter.

**Common mistakes:**
- ❌ Using \`<\` instead of \`<=\` when freeing a room — a meeting that starts exactly
  when another ends reuses that room.
- ❌ Forgetting to free **all** rooms that ended (a \`while\` loop, not an \`if\`).
- ❌ Returning the final heap size instead of the maximum size seen.

**How to narrate:**
> "I sort the meetings by start time and keep the end times of the occupied rooms in
> a min-heap. Before each meeting I release every room that has already become free,
> then I push the meeting's end time. The heap size after the push is the number of
> rooms in use, and the largest such size is the answer."

## Related Problems

- [Meeting Rooms](./MeetingRooms.md) — the boolean version of the same sweep
- [Meeting Rooms III](./MeetingRoomsIII.md) — the same idea, but choosing which meetings to keep
- [Car Fleet](./CarFleet.md) — another "group by arrival time" sweep
`,i=[`minRooms`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};