---
title: Employee Free Time
leetcode: 759
difficulty: Medium
patterns: [Merge then complement]
companies: [Amazon, Google, Meta, Uber]
frequency: 3
tags: [arrays, sorting, intervals]
sampleInput: |
  2
  1 3
  6 7
  -1
  2 5
  8 9
  -1
sampleOutput: |
  5 6
  7 8
---

# Employee Free Time — LeetCode 759

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Merge then complement |
| **Interview heat** | ★★★☆☆ |
| **Asked at** | Amazon, Google, Meta, Uber |

## Problem Statement

Every employee has a list of busy time spans. Return the time spans during which
**every** employee is free — the complement of the union of all busy spans.

> **Convention.** Intervals are half-open, `[start, end)`.

## Input Format

The program reads from standard input. The first number is the number of employees.
Then comes **one group per employee**: a list of `start end` lines terminated by a
line containing the single marker `-1`.

```
n
start end          <- first employee's first busy block
...
-1                <- end of the first employee's blocks
start end          <- second employee's blocks
...
-1
```

- `n` — number of employees (1 ≤ n ≤ 10⁴)
- `start` / `end` — busy blocks, one per line, grouped per employee
- `-1` — the marker that ends an employee's group (a busy block never starts at `-1`)

## Sample Input

```
2
1 3
6 7
-1
2 5
8 9
-1
```

## Expected Output

```
5 6
7 8
```

Employee 1 is busy in `[1,3)` and `[6,7)`, employee 2 in `[2,5)` and `[8,9)`. The union
covers `[1,5)`, `[6,7)` and `[8,9)`, so the common free time is `[5,6)` and `[7,8)`.

## Approach — merge everything, then take the gaps

1. Collect the busy blocks of **all** employees into one list.
2. Sort them by start time and merge the overlapping ones into a single timeline of
   "somebody is busy".
3. The free time is exactly the **gaps** between consecutive merged blocks.

Merging first is what makes the problem easy: after the merge, no two busy blocks
overlap, so the complement is simply the space between them.

**Exchange argument (why merging first is safe):** the free time is defined as "not
covered by any employee's busy block". Whether two blocks overlap is irrelevant to
that definition — what matters is only the **union**. Merging replaces a set of
overlapping blocks with one block that covers exactly the same span, so the union —
and therefore the free time — is unchanged. After the merge every block is
disjoint and sorted, so a free gap exists exactly between two consecutive blocks
where `previous.end < next.start`, and no gap is missed.

## Dry Run

Input: employee 1 `[(1,3), (6,7)]`, employee 2 `[(2,5), (8,9)]`

All busy blocks, sorted by start: `[(1,3), (2,5), (6,7), (8,9)]`

| Step | block | `current` before | overlap? (`next.start < current.end`) | `current` after | free gap found | free time so far |
|---:|---|---|---|---|---|---|
| 1 | `(1,3)` | — | — | `(1,3)` | — | `[]` |
| 2 | `(2,5)` | `(1,3)` | `2 < 3` → yes | `(1, max(3,5) = 5)` | — | `[]` |
| 3 | `(6,7)` | `(1,5)` | `6 < 5`? no | `(6,7)` | `current.end = 5 < 6` → `[5,6]` | `[(5,6)]` |
| 4 | `(8,9)` | `(6,7)` | `8 < 7`? no | `(8,9)` | `current.end = 7 < 8` → `[7,8]` | `[(5,6), (7,8)]` |

The last block leaves no trailing gap (the free time is bounded by the schedule).

## Java Solution

See [`EmployeeFreeTime.java`](./EmployeeFreeTime.java).

```java
public static List<Interval> freeTime(List<List<Interval>> schedules) {
    List<Interval> free = new ArrayList<>();
    List<Interval> busy = new ArrayList<>();
    for (List<Interval> blocks : schedules) {
        busy.addAll(blocks);
    }
    if (busy.isEmpty()) {
        return free;
    }
    busy.sort(Comparator.comparingInt((Interval interval) -> interval.start)
            .thenComparingInt(interval -> interval.end));

    Interval current = new Interval(busy.get(0).start, busy.get(0).end);
    for (int i = 1; i < busy.size(); i++) {
        Interval next = busy.get(i);
        if (next.start < current.end) {
            current.end = Math.max(current.end, next.end);
        } else {
            if (current.end < next.start) {
                free.add(new Interval(current.end, next.start));
            }
            current = new Interval(next.start, next.end);
        }
    }
    return free;
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(B log B) | B busy blocks in total: the sort dominates |
| **Space** | O(B) | the collected list of busy blocks |

## Interview Notes

**Follow-ups to raise yourself:**
- *"What if the schedules arrive one employee at a time?"* → keep a merged, sorted
  structure of the busy blocks and insert each new block into it; the free time is
  derived from that structure.
- *"What if the employees work in different time zones?"* → convert everything to a
  common zone first.
- *"What if I need the free time of **any** `k` employees?"* → the problem becomes
  "find the spans covered by at most `n - k` employees", which is a sweep with a
  counter instead of a boolean union.

**Common mistakes:**
- ❌ Looking for gaps **inside** an employee's own schedule — the free time is the
  intersection of the free times, so all employees must be merged together first.
- ❌ Forgetting that the answer is empty when somebody is busy all day — the union
  then covers everything and there is no gap.
- ❌ Using a blank line as the group separator — the scanner treats whitespace
  uniformly, so the explicit `-1` marker is used instead.

**How to narrate:**
> "I throw all the busy blocks of all employees into one list, sort them and merge the
> overlapping ones. Merging does not change the union, so the free time is simply
> the gap between two consecutive merged blocks — one scan."

## Related Problems

- [Merge Intervals](./MergeIntervals.md) — the merging step on its own
- [Meeting Rooms](./MeetingRooms.md) — whether any two blocks conflict
