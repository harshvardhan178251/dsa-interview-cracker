---
title: Interval List Intersections
leetcode: 986
difficulty: Medium
patterns: [Two pointers, Sorted sweep]
companies: [Meta, Salesforce, Netflix, Capgemini, Zomato]
frequency: 3
tags: [array, two-pointers, intervals]
sampleInput: |
  3
  0 2
  5 10
  13 23
  3
  1 5
  8 12
  15 24
sampleOutput: |
  1 2
  8 10
  15 23
---

# Interval List Intersections — LeetCode 986

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Two pointers · Sorted sweep |
| **Interview heat** | ★★★☆☆ |
| **Asked at** | Amazon, Google, Meta |

## Problem Statement

Given two lists of sorted, mutually disjoint intervals, return the **intersections**
of the two lists — every interval that appears in both.

> **Convention.** Intervals are half-open, `[start, end)`. Two intervals that only
> touch (`a.end == b.start`) have an **empty** intersection and are not reported.

## Input Format

The program reads from standard input:

```
n
start[0] end[0]
...
start[n-1] end[n-1]
m
start[0] end[0]
...
start[m-1] end[m-1]
```

- `n` — number of intervals in the first list
- `m` — number of intervals in the second list
- the two lists are sorted and internally disjoint

## Sample Input

```
3
0 2
5 10
13 23
3
1 5
8 12
15 24
```

## Expected Output

```
1 2
8 10
15 23
```

## Approach — two pointers

Because both lists are sorted, the next candidate intersection always starts at the
**larger** start value and ends at the **smaller** end value:

```
start = max(a.start, b.start)
end   = min(a.end,   b.end)
```

If `start < end` the intersection is non-empty and is reported.

Then advance the pointer of the interval that **ends first**: that interval can never
overlap anything later in the other list, because all later intervals start even
further right.

**Exchange argument (why advancing the earlier-ending interval is safe):** suppose
`a.end <= b.end`. The current intersection is completely determined by `a` and `b`.
Any interval of the second list that comes after `b` starts at or after `b.end`
(sorting) and therefore at or after `a.end`, so it cannot overlap `a` at all — `a` is
finished for good and can be dropped. Symmetrically when `b.end <= a.end`. Dropping the
earlier-ending interval therefore never removes a possible intersection, and the
scan produces every intersection exactly once.

## Dry Run

Input: first `[(0,2), (5,10), (13,23)]`, second `[(1,5), (8,12), (15,24)]`

| Step | i | j | `a` | `b` | `start = max` | `end = min` | non-empty? | result | advance |
|---:|---:|---:|---|---|---:|---:|---|---|---|
| 1 | 0 | 0 | `(0,2)` | `(1,5)` | 1 | 2 | `1 < 2` ✓ | `[1,2]` | `a.end=2 <= b.end=5` → i++ |
| 2 | 1 | 0 | `(5,10)` | `(1,5)` | 5 | 5 | `5 < 5`? no | — | `b.end=5 <= a.end=10` → j++ |
| 3 | 1 | 1 | `(5,10)` | `(8,12)` | 8 | 10 | `8 < 10` ✓ | `[8,10]` | `a.end=10 <= b.end=12` → i++ |
| 4 | 2 | 1 | `(13,23)` | `(8,12)` | 13 | 12 | `13 < 12`? no | — | `b.end=12 <= a.end=23` → j++ |
| 5 | 2 | 2 | `(13,23)` | `(15,24)` | 15 | 23 | `15 < 23` ✓ | `[15,23]` | `a.end=23 <= b.end=24` → i++ |
| 6 | 3 | 2 | — | — | — | — | — | — | `i == 3` → stop |

Result: `[1,2]`, `[8,10]`, `[15,23]` ✓

## Java Solution

See [`IntervalListIntersections.java`](./IntervalListIntersections.java).

```java
public static List<Interval> intersect(List<Interval> first, List<Interval> second) {
    List<Interval> result = new ArrayList<>();
    int i = 0;
    int j = 0;
    while (i < first.size() && j < second.size()) {
        Interval a = first.get(i);
        Interval b = second.get(j);

        int start = Math.max(a.start, b.start);
        int end = Math.min(a.end, b.end);
        if (start < end) {
            result.add(new Interval(start, end));
        }

        if (a.end < b.end) {
            i++;
        } else {
            j++;
        }
    }
    return result;
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n + m) | every pointer only moves forward |
| **Space** | O(n + m) | the result list (O(1) auxiliary space) |

## Interview Notes

**Follow-ups to raise yourself:**
- *"What if the lists are not sorted?"* → sort both, then the same two-pointer sweep.
- *"What if the intervals are closed (`[start, end]`)"* → the intersection test becomes
  `start <= end` and the touching case produces a zero-length interval — LeetCode's
  own example does exactly that.
- *"What if you only need the total length of the intersections?"* → sum
  `end - start` instead of storing the intervals.

**Common mistakes:**
- ❌ Using `start <= end` — with half-open intervals that reports the empty
  intersection of two touching intervals.
- ❌ Advancing both pointers — one intersection can involve one interval from each
  list only, so exactly one pointer moves per step.
- ❌ Assuming the two lists have the same length.

**How to narrate:**
> "Both lists are sorted, so I walk them with two pointers. The intersection of the
> current pair starts at the larger start and ends at the smaller end. Then I advance
> the pointer of the interval that ends first, because everything after it in the
> other list starts too late to overlap it — that way I never miss an intersection."

## Related Problems

- [Merge Intervals](./MergeIntervals.md) — the other classic interval sweep
- [Insert Interval](./InsertInterval.md) — a specialised two-pointer merge
