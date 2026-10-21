---
title: Merge Intervals
leetcode: 56
difficulty: Medium
patterns: [Sorting, Sweep line]
companies: [Amazon, Google, Meta, Microsoft, Uber]
frequency: 5
tags: [array, sorting, intervals]
sampleInput: |
  5
  1 3
  2 6
  8 10
  15 18
  4 5
sampleOutput: |
  1 6
  8 10
  15 18
---

# Merge Intervals — LeetCode 56

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Sorting · Sweep line |
| **Interview heat** | ★★★★★ |
| **Asked at** | Amazon, Google, Meta, Microsoft, Uber |

## Problem Statement

Given a collection of intervals, merge every overlapping interval and return the
resulting collection.

> **Convention.** Every interval in this repository is **half-open**: `[start, end)`.
> Two intervals overlap iff `a.start < b.end && b.start < a.end`, so intervals that
> only touch (`a.end == b.start`) do **not** overlap and stay separate. This matches
> `com.dsa.utils.Interval.overlaps`.

## Input Format

The program reads from standard input:

```
n
start[0] end[0]
start[1] end[1]
...
start[n-1] end[n-1]
```

- `n` — number of intervals (0 ≤ n ≤ 10⁴)
- `start` / `end` — the endpoints of each interval, one interval per line
- `start < end` for every interval

## Sample Input

```
5
1 3
2 6
8 10
15 18
4 5
```

## Expected Output

```
1 6
8 10
15 18
```

`[1, 3)`, `[2, 6)` and `[4, 5)` all overlap into `[1, 6)`; `[8, 10)` and `[15, 18)`
stand alone.

## Approach — sort, then keep one open interval

Sort the intervals by start time and sweep once, keeping the interval that is
currently open:

- if the next interval **starts before** the open one ends, they overlap → extend the
  open interval to the larger end;
- otherwise a gap exists → close the open interval and start a new one.

**Exchange argument (why sorting is safe):** two intervals can only overlap if their
start times are close, so an interval can only be merged with intervals that start
after it. Sorting by start time therefore puts all potential partners of an interval
directly after it, and the sweep never has to look back. In particular, when the
sweep sees an interval that starts at or after the open interval ends, no *later*
interval can overlap the open one either (later intervals start even further right),
so closing it is final and correct — the greedy decision to close the interval can
never lose a merge.

## Dry Run

Input: `[(1,3), (2,6), (8,10), (15,18), (4,5)]`

After sorting by start: `[(1,3), (2,6), (4,5), (8,10), (15,18)]`

| Step | interval | `current` before | overlap? (`next.start < current.end`) | `current` after | merged output |
|---:|---|---|---|---|---|
| 1 | `(1,3)` | — | — | `(1,3)` | `[]` |
| 2 | `(2,6)` | `(1,3)` | `2 < 3` → **yes** | `(1, max(3,6) = 6)` | `[]` |
| 3 | `(4,5)` | `(1,6)` | `4 < 6` → **yes** | `(1, max(6,5) = 6)` | `[]` |
| 4 | `(8,10)` | `(1,6)` | `8 < 6` → no | `(8,10)` | `[(1,6)]` |
| 5 | `(15,18)` | `(8,10)` | `15 < 10` → no | `(15,18)` | `[(1,6), (8,10)]` |

After the loop the open interval is added: `[(1,6), (8,10), (15,18)]` ✓

### Touching intervals stay apart — `[(1,3), (3,5)]`

| Step | interval | `current` before | overlap? | `current` after | merged output |
|---:|---|---|---|---|---|
| 1 | `(1,3)` | — | — | `(1,3)` | `[]` |
| 2 | `(3,5)` | `(1,3)` | `3 < 3` → no | `(3,5)` | `[(1,3)]` |

Final: `[(1,3), (3,5)]` — with half-open intervals they do not overlap.
(LeetCode's closed-interval reading would merge them into `[(1,5)]`; change the
comparison to `<=` for that convention.)

## Java Solution

See [`MergeIntervals.java`](./MergeIntervals.java).

```java
public static List<Interval> merge(List<Interval> intervals) {
    List<Interval> merged = new ArrayList<>();
    if (intervals == null || intervals.isEmpty()) {
        return merged;
    }
    List<Interval> sorted = new ArrayList<>(intervals);
    sorted.sort(null);

    Interval current = new Interval(sorted.get(0).start, sorted.get(0).end);
    for (int i = 1; i < sorted.size(); i++) {
        Interval next = sorted.get(i);
        if (next.start < current.end) {
            current.end = Math.max(current.end, next.end);
        } else {
            merged.add(current);
            current = new Interval(next.start, next.end);
        }
    }
    merged.add(current);
    return merged;
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n log n) | the sort dominates, the sweep is linear |
| **Space** | O(n) | the sorted copy plus the result |

## Interview Notes

**Follow-ups to raise yourself:**
- *"What if the intervals arrive in a stream?"* → you need a data structure that keeps
  the merged intervals sorted (a `TreeMap` of start → end); insert each new interval
  and merge with the neighbours.
- *"What if the input is huge and does not fit in memory?"* → sort on disk / external
  merge sort, then sweep.
- *"What if you also need the original indices of the merged intervals?"* → keep the
  index in a wrapper object and carry it along.

**Common mistakes:**
- ❌ Sorting only by start and not handling equal starts correctly — sort by
  `(start, end)` so the shorter interval is processed first.
- ❌ Forgetting to add the last open interval after the loop.
- ❌ Using `<=` instead of `<` for the overlap test — with half-open intervals that
  merges intervals that only touch.

**How to narrate:**
> "I sort by start time and keep one open interval. While the next interval starts
> before the open one ends, I extend the open interval; otherwise the open interval is
> finished — no later interval can overlap it because later intervals start even
> further right — so I close it and start a new one. One pass, O(n log n)."

## Related Problems

- [Insert Interval](./InsertInterval.md) — the sorted-list variant of this sweep
- [Meeting Rooms II](./MeetingRoomsII.md) — the same sweep, counting rooms
- [Employee Free Time](./EmployeeFreeTime.md) — merging, then taking the complement
