---
title: Meeting Rooms II
leetcode: 692
difficulty: Medium
patterns: [Sweep line, Min-heap of end times]
companies: [Meta, Google, Microsoft, Uber, Paytm]
frequency: 4
tags: [array, heap, sorting, intervals]
sampleInput: |
  3
  0 30
  5 10
  15 20
sampleOutput: "2"
---

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

> **Convention.** Intervals are half-open, `[start, end)`. A meeting may start exactly
> when another one ends — the room is free again at that moment.

## Input Format

The program reads from standard input:

```
n
start[0] end[0]
start[1] end[1]
...
start[n-1] end[n-1]
```

- `n` — number of meetings (0 ≤ n ≤ 10⁵)
- `start` / `end` — the time span of each meeting, one meeting per line

## Sample Input

```
3
0 30
5 10
15 20
```

## Expected Output

```
2
```

The long meeting `[0, 30)` needs one room; the other two can share the second one.

## Approach — sort by start, keep the room end times in a min-heap

Sort the meetings by start time and keep a min-heap that holds the end time of every
**occupied** room. For each meeting:

1. While the earliest room ends at or before the meeting starts, that room is free →
   remove it from the heap.
2. Put the meeting into a room: push its end time.
3. The size of the heap after the push is the number of rooms in use at that moment;
   the largest size seen is the answer.

**Exchange argument (why reusing the earliest free room is safe):** when a meeting
starts, every room whose end time is `<= start` is free, and any of them can host the
meeting. The choice does not matter for the *number* of rooms: the room is occupied
again from `start` to `meeting.end` in either case, and all free rooms are
interchangeable for every future meeting (they are all free at `start` and stay free
until they are used). What matters is that we reuse a room whenever one is available
— opening a new room while a free one exists can only increase the answer, so the
greedy "reuse if possible, otherwise open a new room" is optimal. The maximum number
of simultaneously running meetings is a lower bound on the number of rooms, and the
greedy achieves exactly that bound.

## Dry Run

Input: `[(0,30), (5,10), (15,20)]`

After sorting by start: `[(0,30), (5,10), (15,20)]`

| Step | meeting | heap before | rooms freed (`end <= start`) | heap after | rooms in use | max rooms |
|---:|---|---|---|---|---:|---:|
| 1 | `(0,30)` | `{}` | — | `{30}` | 1 | 1 |
| 2 | `(5,10)` | `{30}` | `30 <= 5`? no | `{10, 30}` | 2 | 2 |
| 3 | `(15,20)` | `{10, 30}` | `10 <= 15` ✓ → pop `10` | `{20, 30}` | 2 | 2 |

The largest heap size is **2** ✓

### Trace where the rooms are reused heavily — `[(1,2), (2,3), (3,4), (4,5)]`

| Step | meeting | heap before | freed | heap after | rooms in use | max |
|---:|---|---|---|---|---:|---:|
| 1 | `(1,2)` | `{}` | — | `{2}` | 1 | 1 |
| 2 | `(2,3)` | `{2}` | `2 <= 2` ✓ → pop | `{3}` | 1 | 1 |
| 3 | `(3,4)` | `{3}` | `3 <= 3` ✓ → pop | `{4}` | 1 | 1 |
| 4 | `(4,5)` | `{4}` | `4 <= 4` ✓ → pop | `{5}` | 1 | 1 |

One room is enough because the meetings only touch.

## Java Solution

See [`MeetingRoomsII.java`](./MeetingRoomsII.java).

```java
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
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n log n) | the sort plus one push and one pop per meeting |
| **Space** | O(n) | the heap can hold every meeting |

## Interview Notes

**Follow-ups to raise yourself:**
- *"Can you do it with a sweep line over events?"* → yes: create a `+1` event at every
  start and a `-1` event at every end, sort the events and sweep; process the `-1`
  events before the `+1` events at the same timestamp (half-open intervals).
- *"What if the meetings have different sizes?"* → a room may host several meetings at
  once; the sweep needs to track the free capacity, not just the count.
- *"Which room should a meeting go to?"* → any free room works; keep a min-heap of
  free room ids if the ids matter.

**Common mistakes:**
- ❌ Using `<` instead of `<=` when freeing a room — a meeting that starts exactly
  when another ends reuses that room.
- ❌ Forgetting to free **all** rooms that ended (a `while` loop, not an `if`).
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
