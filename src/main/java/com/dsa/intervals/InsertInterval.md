---
title: Insert Interval
leetcode: 57
difficulty: Medium
patterns: [Sorting, Three-way sweep]
companies: [Amazon, Google, Meta, Uber]
frequency: 4
tags: [array, sorting, intervals]
sampleInput: |
  3
  1 3
  6 9
  12 15
  4 5
sampleOutput: |
  1 3
  4 5
  6 9
  12 15
---

# Insert Interval — LeetCode 57

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Sorting · Three-way sweep |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Uber |

## Problem Statement

Given a list of **sorted, non-overlapping** intervals and one new interval, insert the
new interval and merge it with every interval it overlaps.

> **Convention.** Intervals are half-open, `[start, end)`. Touching intervals
> (`a.end == b.start`) do **not** overlap and stay separate.

## Input Format

The program reads from standard input:

```
n
start[0] end[0]
start[1] end[1]
...
start[n-1] end[n-1]
newStart newEnd
```

- `n` — number of existing intervals (0 ≤ n ≤ 10⁴)
- `start` / `end` — endpoints of the existing intervals, sorted and non-overlapping
- `newStart newEnd` — the interval to insert

## Sample Input

```
3
1 3
6 9
12 15
4 5
```

## Expected Output

```
1 3
4 5
6 9
12 15
```

The new interval `[4, 5)` touches nothing — it fits between `[1, 3)` and `[6, 9)`.

## Approach — three phases, one pass

Because the list is already sorted, the new interval splits it into three parts:

1. **Before** — every interval that ends at or before the new interval starts. Copy
   them unchanged.
2. **Overlapping** — every interval that starts before the new interval ends. Merge
   them all into the new interval, growing its start leftwards and its end
   rightwards.
3. **After** — everything that starts at or after the merged interval ends. Copy it
   unchanged.

Only the middle part has to be scanned, and it is scanned only once.

**Exchange argument (why the three phases are exhaustive and safe):** the intervals
are sorted and disjoint, so their end times are increasing as well. Therefore the
intervals that end before the new one starts form a prefix of the list, the intervals
that start after the new one ends form a suffix, and everything in between overlaps
the new interval. Copying the prefix is mandatory (they can never be affected), and
merging the middle part is mandatory (each of those intervals overlaps the new one,
so they must end up in one merged interval). The suffix is copied unchanged because it
starts after the merged interval ends and can therefore not overlap it. No interval
is ever dropped or duplicated.

## Dry Run

Input: `[(1,3), (6,9), (12,15)]`, new interval `(4,5)`

| Step | interval | phase test | action | result so far | new interval |
|---:|---|---|---|---|---|
| 1 | `(1,3)` | `end <= new.start` → `3 <= 4` ✓ → **before** | copy | `[(1,3)]` | `(4,5)` |
| 2 | `(6,9)` | `start < end` → `6 < 5`? no → the overlap block is empty | stop scanning | `[(1,3)]` | `(4,5)` |
| 3 | — | — | insert the (unmerged) new interval | `[(1,3), (4,5)]` | `(4,5)` |
| 4 | `(6,9)` | **after** — starts at or after the merged end | copy | `[(1,3), (4,5), (6,9)]` | `(4,5)` |
| 5 | `(12,15)` | **after** | copy | `[(1,3), (4,5), (6,9), (12,15)]` | `(4,5)` |

Result: `1 3`, `4 5`, `6 9`, `12 15` ✓

### Trace with a real merge — `[(1,3), (6,9), (12,15)]`, new interval `(2,8)`

| Step | interval | phase test | action | result so far | new interval |
|---:|---|---|---|---|---|
| 1 | `(1,3)` | `3 <= 2`? no → **overlapping** (`1 < 8`) | `start = min(2,1) = 1`, `end = max(8,3) = 8` | `[]` | `(1,8)` |
| 2 | `(6,9)` | `6 < 8` → **overlapping** | `start = min(1,6) = 1`, `end = max(8,9) = 9` | `[]` | `(1,9)` |
| 3 | `(12,15)` | `12 < 9`? no → **after** | stop scanning | `[]` | `(1,9)` |
| 4 | — | — | insert the merged interval | `[(1,9)]` | `(1,9)` |
| 5 | `(12,15)` | **after** | copy | `[(1,9), (12,15)]` | `(1,9)` |

Result: `1 9`, `12 15` ✓

## Java Solution

See [`InsertInterval.java`](./InsertInterval.java).

```java
public static List<Interval> insert(List<Interval> intervals, Interval newInterval) {
    List<Interval> result = new ArrayList<>();
    int i = 0;
    int n = intervals.size();

    // 1. intervals that end before the new one starts
    while (i < n && intervals.get(i).end <= newInterval.start) {
        result.add(new Interval(intervals.get(i).start, intervals.get(i).end));
        i++;
    }
    // 2. the intervals that overlap the new one
    int start = newInterval.start;
    int end = newInterval.end;
    while (i < n && intervals.get(i).start < end) {
        start = Math.min(start, intervals.get(i).start);
        end = Math.max(end, intervals.get(i).end);
        i++;
    }
    result.add(new Interval(start, end));
    // 3. everything that starts after the merged interval
    while (i < n) {
        result.add(new Interval(intervals.get(i).start, intervals.get(i).end));
        i++;
    }
    return result;
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n) | a single pass over the list, no sorting needed |
| **Space** | O(n) | the result list |

## Interview Notes

**Follow-ups to raise yourself:**
- *"What if the list is not sorted?"* → sort it first, then the same three phases work.
- *"What if you have to insert several intervals?"* → sort all of them together and
  merge in one sweep.
- *"Can you do it in place?"* → yes for the array form: write the "before" intervals
  back in place, then the merged one, then the "after" ones.

**Common mistakes:**
- ❌ Using `<` instead of `<=` in the "before" test — with half-open intervals an
  interval that ends exactly when the new one starts does **not** overlap and must be
  copied separately.
- ❌ Forgetting that the merged interval can grow to the **right** and swallow further
  intervals — the loop condition uses the growing `end`.
- ❌ Not copying the intervals into new `Interval` objects — the input list may be
  reused by the caller.

**How to narrate:**
> "The list is sorted, so I don't have to sort anything: the new interval splits the
> list into a prefix that ends before it, the block it overlaps, and a suffix that
> starts after it. I copy the prefix, merge the overlapping block into the new
> interval, and copy the suffix — one linear pass."

## Related Problems

- [Merge Intervals](./MergeIntervals.md) — the general sweep
- [Non-overlapping Intervals](./NonOverlappingIntervals.md) — greedy selection by end time
