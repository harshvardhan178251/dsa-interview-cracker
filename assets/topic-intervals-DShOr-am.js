var e=`topic:intervals`,t=`
# Intervals — concept notes

## The mental model

An interval is a pair \`(start, end)\`. Almost every interval problem is solved by:

1. **Sorting by the right key** (usually \`end\`).
2. **One pass**, maintaining a running boundary.

---

## The sort key — the whole problem

| Sort by | Use when |
|---|---|
| **End** | Scheduling, merging, counting non-overlapping — **the default** |
| **Start** | When you need to detect overlaps by scanning left to right |
| **Duration** | Resource allocation problems |
| **Start, then end** | Merge intervals — so equal starts nest correctly |

**Why sorting by end is usually right:** it maximises the room left for everything else.
That single intuition solves most scheduling problems.

**For merging, sort by start.** And when starts are equal, sort by end ascending — so
\`[1,10]\` comes before \`[2,3]\` and you merge them into one interval rather than two
overlapping ones.

\`\`\`java
Arrays.sort(intervals, (a, b) -> {
    if (a.start != b.start) return Integer.compare(a.start, b.start);
    return Integer.compare(a.end, b.end);
});
\`\`\`

---

## Merge intervals (LC 56)

\`\`\`java
public static List<int[]> merge(int[][] intervals) {
    if (intervals.length == 0) return new ArrayList<>();
    Arrays.sort(intervals, (a, b) -> a[0] != b[0] ? Integer.compare(a[0], b[0])
                                                 : Integer.compare(a[1], b[1]));

    List<int[]> merged = new ArrayList<>();
    int[] current = new int[]{intervals[0][0], intervals[0][1]};

    for (int[] interval : intervals) {
        if (interval[0] <= current[1]) {
            current[1] = Math.max(current[1], interval[1]);   // extend
        } else {
            merged.add(current);
            current = new int[]{interval[0], interval[1]};
        }
    }
    merged.add(current);
    return merged;
}
\`\`\`

**The invariant:** \`current\` is the merged interval that the last group of overlapping
intervals forms.

**The \`Math.max\` on the end** is essential — intervals can be nested, and the merged end
must be the maximum, not the newest one.

**\`<=\` vs \`<\`:** touching intervals (\`[1,2]\` and \`[2,3]\`) **do** overlap when the
interval is closed. For half-open intervals \`[1,2)\` and \`[2,3)\` they do not. **State
which convention the problem uses.**

---

## Insert interval (LC 57)

**Three phases in one pass:**

\`\`\`java
public static List<int[]> insert(int[][] intervals, int[] newInterval) {
    List<int[]> result = new ArrayList<>();
    int i = 0, n = intervals.length;

    // 1. intervals entirely BEFORE the new interval
    while (i < n && intervals[i][1] < newInterval[0]) {
        result.add(intervals[i++]);
    }

    // 2. intervals that OVERLAP the new interval — merge them all
    while (i < n && intervals[i][0] <= newInterval[1]) {
        newInterval[0] = Math.min(newInterval[0], intervals[i][0]);
        newInterval[1] = Math.max(newInterval[1], intervals[i][1]);
        i++;
    }
    result.add(newInterval);

    // 3. intervals entirely AFTER
    while (i < n) {
        result.add(intervals[i++]);
    }
    return result;
}
\`\`\`

**Three phases** — before, overlapping, after. The phases are contiguous because the
input is sorted.

**The dry run should show the three phases** — that is the structure of the solution.

---

## Meeting rooms

**Meeting Rooms (LC 862)** — can someone attend all meetings?

\`\`\`java
public static boolean canAttendAllMeetings(int[][] intervals) {
    if (intervals.length == 0) return true;
    Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));
    for (int i = 1; i < intervals.length; i++) {
        if (intervals[i][0] < intervals[i - 1][1]) return false;
    }
    return true;
}
\`\`\`

**Sort by start, then check for any overlap.** O(n log n).

**Meeting Rooms II (LC 692)** — the minimum number of rooms needed:

\`\`\`java
public static int minMeetingRooms(int[][] intervals) {
    if (intervals.length == 0) return 0;
    int[] starts = new int[intervals.length];
    int[] ends = new int[intervals.length];
    for (int i = 0; i < intervals.length; i++) {
        starts[i] = intervals[i][0];
        ends[i] = intervals[i][1];
    }
    Arrays.sort(starts);
    Arrays.sort(ends);

    int rooms = 0, endIndex = 0;
    for (int i = 0; i < intervals.length; i++) {
        if (starts[i] < ends[endIndex]) {
            rooms++;
        } else {
            endIndex++;
        }
    }
    return rooms;
}
\`\`\`

**The insight:** sort the starts and the ends separately, then walk them together. If the
next start is before the current end, you need another room.

**The heap version** is clearer and equally fast:

\`\`\`java
PriorityQueue<Integer> ends = new PriorityQueue<>();
int rooms = 0;
for (int[] interval : intervals) {          // sorted by start
    if (!ends.isEmpty() && ends.peek() <= interval[0]) {
        ends.poll();                          // reuse a room
    }
    ends.add(interval[1]);
    rooms = Math.max(rooms, ends.size());
}
\`\`\`

**Say the "reuse a room when one frees up" logic out loud** — it is the key insight.

---

## The sweep line

**The general technique for "how many things are active at once".**

\`\`\`java
// Events: +1 at start, -1 at end
List<int[]> events = new ArrayList<>();
for (int[] interval : intervals) {
    events.add(new int[]{interval[0], 1});
    events.add(new int[]{interval[1], -1});
}
events.sort(Comparator.comparingInt(e -> e[0]));

int active = 0, maxActive = 0;
for (int[] event : events) {
    active += event[1];
    maxActive = Math.max(maxActive, active);
}
\`\`\`

**This is the general form.** It handles the meeting-room problem and the "maximum
overlap" problem, and it extends naturally to weighted events.

**The tie-breaking subtlety:** if a start and an end happen at the same time, the order
matters. For half-open intervals \`[start, end)\`, the end should be processed **first**
(releasing the room before the new meeting takes it). Sort by \`(time, -delta)\` so that
\`-1\` comes before \`+1\` at the same timestamp.

**Getting this wrong is the classic bug in meeting-room problems.** Say the convention
out loud.

---

## Minimum meeting rooms III (LC 1859)

**The hardest common interval problem:** find the minimum number of rooms such that no
room has more than \`k\` meetings, and return the smallest possible maximum number of
meetings in a room.

**The solution is a sweep line with a multiset:**

\`\`\`java
public static int minMeetingRooms(int[][] meetings, int k) {
    int[][] events = new int[meetings.length * 2];
    for (int i = 0; i < meetings.length; i++) {
        events[2 * i]     = new int[]{meetings[i][0], 1};
        events[2 * i + 1] = new int[]{meetings[i][1], -1};
    }
    Arrays.sort(events, (a, b) -> a[0] != b[0] ? Integer.compare(a[0], b[0])
                                                : Integer.compare(a[1], b[1]));

    TreeMap<Integer, Integer> counts = new TreeMap<>();   // end time → how many rooms free at that time
    Deque<Integer> ends = new ArrayDeque<>();              // active meetings' end times
    int best = Integer.MAX_VALUE;

    for (int[] event : events) {
        if (event[1] == 1) {
            ends.add(event[0]);
            // remove meetings that have already ended
            while (!ends.isEmpty() && ends.peekFirst() <= event[0]) {
                int ending = ends.pollFirst();
                counts.merge(ending, -1, Integer::sum);
            }
        }
        ...
    }
}
\`\`\`

**The idea:** maintain the active meetings in a sorted structure. When you need to free
a room, choose the room whose current meeting ends **latest** — that maximises the
freedom of the freed room.

**The greedy argument:** "when a meeting ends, I free the room whose previous meeting
ended most recently, so the freed room is available as early as possible. This minimises
the peak concurrency."

**This problem is hard enough that most candidates should ask for a hint.** If you get
stuck, say so and explain the sweep-line setup — partial credit is real credit.

---

## Interval list intersections (LC 986)

**Two pointers over two sorted lists:**

\`\`\`java
public static int[][] intersect(int[][] first, int[][] second) {
    List<int[]> result = new ArrayList<>();
    int i = 0, j = 0;
    while (i < first.length && j < second.length) {
        int start = Math.max(first[i][0], second[j][0]);
        int end = Math.min(first[i][1], second[j][1]);
        if (start <= end) result.add(new int[]{start, end});

        // advance the one that ends first
        if (first[i][1] < second[j][1]) i++;
        else j++;
    }
    return result.toArray(new int[0][]);
}
\`\`\`

**The advance rule:** after recording the overlap, advance the interval that **ends
first**, because the other one may still overlap the next one in the other list.

**The dry run should show both pointers.**

---

## Non-overlapping intervals (LC 435) and employee free time

**Already covered in the [greedy notes](./19-greedy.md).**

**Employee Free Time (LC 759)** — merge each employee's busy intervals, then find the
gaps common to everyone:

\`\`\`java
// 1. group intervals by employee
// 2. merge each employee's intervals
// 3. intersect all the merged lists (like interval list intersections)
// 4. the gaps between consecutive intersections are the free time
\`\`\`

**The structure:** merge first, then intersect, then find the gaps. Each step reuses a
technique you already know.

---

## Car fleet (LC 1491)

**A different kind of interval problem** — the "interval" is derived.

\`\`\`java
public static int carFleet(int target, int[] position, int[] speed) {
    // sort by position descending
    // compute the time each car takes to reach the target
    // count the "fleet leaders": a car that arrives slower than the car ahead forms a new fleet
}
\`\`\`

**The insight:** a car catches up to the car ahead and joins its fleet if it cannot
arrive sooner. So scan from the front (closest to the target) backwards, tracking the
maximum time seen.

\`\`\`java
double maxTime = 0;
int fleets = 0;
for (int i = 0; i < n; i++) {
    double time = (double)(target - position[i]) / speed[i];
    if (time > maxTime) {
        fleets++;
        maxTime = time;
    }
}
\`\`\`

**If the car's time is less than or equal to the max time so far, it joins the fleet
ahead.** Otherwise it is a new fleet leader.

**Say the reasoning:** "a car slower than the fleet ahead cannot catch up before the
target, so it forms its own fleet."

---

## Common traps

| Trap | Why it bites |
|---|---|
| Sorting by start when you should sort by end | Wrong answer in scheduling problems |
| Not handling equal start times in merge | Nested intervals produce two results instead of one |
| Using \`Math.max\` incorrectly when extending a merged interval | The merged end must be the maximum |
| Off-by-one in the overlap test | Touching intervals may or may not overlap |
| Not sorting the end events in the sweep line | Wrong concurrency counts |
| Tie-breaking start vs end events | A room is double-counted or a meeting overlaps itself |
| Forgetting the empty-input case | ArrayIndexOutOfBounds |
| Assuming the intervals are already sorted | The problem usually does not guarantee it |

---

## Complexity cheat sheet

| Problem | Time | Space |
|---|---|---|
| Merge intervals | O(n log n) | O(n) output |
| Insert interval | O(n log n) | O(n) output |
| Meeting rooms | O(n log n) | O(1) |
| Meeting rooms II | O(n log n) | O(n) |
| Interval list intersections | O(n + m) | O(n + m) output |
| Sweep line | O(n log n) | O(n) |
| Minimum meeting rooms III | O(n log n) | O(n) |
| Car fleet | O(n log n) | O(n) |

---

## How to crack it in an interview

1. **Say which key you sort by and why.** "I sort by end time, because choosing the
   earliest-finishing interval leaves the most room for the rest."
2. **State the convention** — are touching intervals overlapping?
3. **Describe the sweep in phases** — before, overlapping, after.
4. **For the heap-based problems, say what the heap holds** and when you pop it.
5. **Mention the separate-sorted-starts-and-ends trick** for meeting rooms II — it is
   simpler than it looks.
6. **Trace the pointers and the boundary values.**
`,n={id:e,body:t};export{t as body,n as default,e as id};