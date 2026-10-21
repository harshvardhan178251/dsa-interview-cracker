---
title: Non-overlapping Intervals
leetcode: 435
difficulty: Medium
patterns: [Greedy, Earliest finishing time]
companies: [Amazon, Google, Meta, Uber]
frequency: 4
tags: [array, sorting, greedy, intervals]
sampleInput: |
  5
  1 2
  2 3
  3 4
  4 5
  5 6
sampleOutput: "5"
---

# Non-overlapping Intervals — LeetCode 435

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Greedy · Earliest finishing time |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Uber |

## Problem Statement

Given a collection of intervals, return the **largest number of intervals** that can be
selected so that no two of them overlap.

> **Convention.** Intervals are half-open, `[start, end)`. Intervals that only touch
> (`a.end == b.start`) do **not** overlap.

## Input Format

The program reads from standard input:

```
n
start[0] end[0]
start[1] end[1]
...
start[n-1] end[n-1]
```

- `n` — number of intervals (1 ≤ n ≤ 10⁵)
- `start` / `end` — the endpoints of each interval, one interval per line

## Sample Input

```
5
1 2
2 3
3 4
4 5
5 6
```

## Expected Output

```
5
```

The five intervals only touch, so all of them fit.

## Approach — always take the interval that finishes first

Sort the intervals by **end time** and scan them, keeping an interval only when it
starts at or after the end of the last one you kept.

**Exchange argument (why the earliest finishing interval is safe):** let `I` be the
interval with the smallest end time and let `O` be the first interval of some optimal
solution. `I` ends no later than `O` ends, so replacing `O` with `I` cannot create an
overlap with any interval that follows `O` — those intervals start at or after
`O.end ≥ I.end`. Since `I` also cannot overlap an interval that comes before it (it
finishes first, so it overlaps at most the intervals that overlap `O`), the swap keeps
the solution valid and of the same size. Therefore there is always an optimal solution
that starts with `I`, and the same argument applies recursively to the remaining
intervals. Greedy by end time is optimal.

The classic companion question — *"how many intervals have to be removed?"* — is
`n - kept`.

## Dry Run

Input: `[(1,2), (2,3), (3,4), (4,5), (5,6)]` — already sorted by end time

| Step | interval | `lastEnd` before | `start >= lastEnd`? | action | kept |
|---:|---|---:|---|---|---:|
| 1 | `(1,2)` | -∞ | yes | keep, `lastEnd = 2` | 1 |
| 2 | `(2,3)` | 2 | `2 >= 2` ✓ | keep, `lastEnd = 3` | 2 |
| 3 | `(3,4)` | 3 | `3 >= 3` ✓ | keep, `lastEnd = 4` | 3 |
| 4 | `(4,5)` | 4 | `4 >= 4` ✓ | keep, `lastEnd = 5` | 4 |
| 5 | `(5,6)` | 5 | `5 >= 5` ✓ | keep, `lastEnd = 6` | 5 |

Answer: **5** kept (0 removed).

### Trace where intervals really overlap — `[(1,2), (2,3), (3,4), (4,5), (5,6)]` read as **closed** intervals

With half-open intervals the sample above keeps all five. Now consider
`[(1,4), (2,5), (3,6), (7,8)]`:

| Step | interval | `lastEnd` before | `start >= lastEnd`? | action | kept |
|---:|---|---:|---|---|---:|
| 1 | `(1,4)` | -∞ | yes | keep, `lastEnd = 4` | 1 |
| 2 | `(2,5)` | 4 | `2 >= 4`? no | skip | 1 |
| 3 | `(3,6)` | 4 | `3 >= 4`? no | skip | 1 |
| 4 | `(7,8)` | 4 | `7 >= 4` ✓ | keep, `lastEnd = 8` | 2 |

Answer: **2** kept (2 removed).

## Java Solution

See [`NonOverlappingIntervals.java`](./NonOverlappingIntervals.java).

```java
public static int maxNonOverlapping(List<Interval> intervals) {
    List<Interval> sorted = new ArrayList<>(intervals);
    sorted.sort(Comparator.comparingInt((Interval interval) -> interval.end)
            .thenComparingInt(interval -> interval.start));

    int kept = 0;
    int lastEnd = Integer.MIN_VALUE;
    for (Interval interval : sorted) {
        if (interval.start >= lastEnd) {
            kept++;
            lastEnd = interval.end;
        }
    }
    return kept;
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n log n) | the sort dominates, the scan is linear |
| **Space** | O(n) | the sorted copy of the list |

## Interview Notes

**Follow-ups to raise yourself:**
- *"Return the intervals that were removed."* → track them while scanning.
- *"What if the intervals are weighted?"* → the greedy by end time is no longer
  optimal; use the weighted interval scheduling DP of
  [Maximum Profit Scheduling Jobs](../greedy/SchedulingMaximumProfit.md).
- *"What if you want the minimum number of intervals to remove so that the rest are
  non-overlapping?"* → `n - kept` — the same scan answers both questions.

**Common mistakes:**
- ❌ Sorting by start time instead of end time — the classic activity-selection
  greedy needs the end time.
- ❌ Using `>` instead of `>=` — with half-open intervals a meeting may start exactly
  when the previous one ends.
- ❌ Forgetting the tie-break by start time — two intervals with the same end time must
  be ordered by start time, otherwise the shorter one may be skipped.

**How to narrate:**
> "I sort the intervals by end time and always take the first one that starts after
> the last one I kept. The exchange argument: the interval that finishes earliest
> can always replace the first interval of an optimal solution without making the
> rest of that solution overlap, so this greedy choice is safe."

## Related Problems

- [Meeting Rooms](./MeetingRooms.md) — the same sweep, answered with a boolean
- [Meeting Rooms III](./MeetingRoomsIII.md) — choosing which meetings to keep with several rooms
- [Maximum Profit Scheduling Jobs](../greedy/SchedulingMaximumProfit.md) — the weighted variant
