---
title: Meeting Rooms
leetcode: 862
difficulty: Easy
patterns: [Sorting, Overlap detection]
companies: [Meta, Google, Facebook, Microsoft, Lyft, HCLTech, TCS, Sony]
frequency: 4
tags: [array, sorting, intervals]
sampleInput: |
  3
  0 30
  5 10
  15 20
sampleOutput: "false"
---

# Meeting Rooms — LeetCode 862

| | |
|---|---|
| **Difficulty** | Easy |
| **Pattern** | Sorting · Overlap detection |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Uber, Airbnb |

## Problem Statement

Given the time spans of several meetings, decide whether a single person could have
attended **all** of them.

> **Convention.** Intervals are half-open, `[start, end)`. A meeting that ends exactly
> when the next one begins does **not** conflict.

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
false
```

The meeting `[0, 30)` overlaps both other meetings.

## Approach — sort by start, compare neighbours

Sort the meetings by start time. In a sorted list, if any two meetings overlap then
some **pair of neighbours** overlaps as well: the interval that starts first also ends
first among the overlapping ones, so the conflict shows up between two consecutive
meetings.

That reduces the question to a single scan comparing each meeting with the one before
it.

**Exchange argument (why the neighbour test is complete):** suppose meetings `i` and
`j` (`i < j` in sorted order) overlap, i.e. `start[j] < end[i]`. Since the meetings
are sorted by start time, every meeting `k` with `i < k <= j` starts no later than
`start[j] < end[i]`, and no meeting ends before it started (the list is valid), so
`end[k] > start[k] >= start[i]`. Hence `k` overlaps meeting `i` as well — and
`i` and `k` are neighbours. So every conflict is visible between neighbours and the
single scan cannot miss one.

## Dry Run

Input: `[(0,30), (5,10), (15,20)]`

After sorting by start: `[(0,30), (5,10), (15,20)]`

| Step | i | meeting | previous meeting | overlap test | result |
|---:|---:|---|---|---|---|
| 1 | 1 | `(5,10)` | `(0,30)` | `5 < 30` → **overlap** | **false** |

The scan stops at the first conflict.

### Trace where nothing conflicts — `[(1,2), (2,3), (3,4)]`

| Step | i | meeting | previous | overlap test | result |
|---:|---:|---|---|---|---|
| 1 | 1 | `(2,3)` | `(1,2)` | `2 < 2`? no | continue |
| 2 | 2 | `(3,4)` | `(2,3)` | `3 < 3`? no | continue |

No conflict → **true** (the meetings only touch, which is allowed with half-open
intervals).

## Java Solution

See [`MeetingRooms.java`](./MeetingRooms.java).

```java
public static boolean canAttendAll(List<Interval> meetings) {
    if (meetings == null || meetings.size() <= 1) {
        return true;
    }
    List<Interval> sorted = new ArrayList<>(meetings);
    sorted.sort(null);
    for (int i = 1; i < sorted.size(); i++) {
        if (sorted.get(i).start < sorted.get(i - 1).end) {
            return false;
        }
    }
    return true;
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n log n) | the sort dominates |
| **Space** | O(n) | the sorted copy of the list |

## Interview Notes

**Follow-ups to raise yourself:**
- *"What is the minimum number of rooms needed?"* → [Meeting Rooms II](./MeetingRoomsII.md).
- *"Which pair overlaps?"* → return the conflicting pair instead of a boolean.
- *"What if the meetings are given as start/end pairs in an unsorted list?"* → sort
  first; the algorithm is unchanged.

**Common mistakes:**
- ❌ Comparing with `<=` instead of `<` — with half-open intervals touching meetings
  are compatible.
- ❌ Checking only the first and the last meeting — the conflict can be in the middle.
- ❌ Mutating the caller's list when sorting — copy it first.

**How to narrate:**
> "I sort the meetings by start time. In a sorted list any overlap shows up between
> two neighbouring meetings, because the meeting that starts first also ends first.
> So I scan once and compare each meeting with its predecessor — O(n log n) for the
> sort, O(n) for the scan."

## Related Problems

- [Meeting Rooms II](./MeetingRoomsII.md) — how many rooms are needed
- [Merge Intervals](./MergeIntervals.md) — the same sort, different sweep
- [Non-overlapping Intervals](./NonOverlappingIntervals.md) — how many can be kept
