---
title: Design Underground System
leetcode: 373
difficulty: Medium
patterns: [Design, Aggregation, Sorted map]
companies: [Amazon, Adobe, LinkedIn, Wipro, Barclays]
frequency: 3
tags: [hashmap, aggregation, average]
sampleInput: |
  3
  1 2 4
  1 3 8
  1 2 6
sampleOutput: |
  1 2 5.00
  1 3 8.00
---

# Design Underground System — LeetCode 373

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Design · Aggregation · Sorted map |
| **Interview heat** | ★★★☆☆ |
| **Asked at** | Amazon, Google, Meta, Uber, Lyft |

## Problem Statement

Track the average travel time between every pair of stations of an underground system.

- A customer checks in at a start station and checks out at an end station; the trip
  duration is known.
- `getAverageTravelTime(start, end)` returns the mean duration of all the trips between
  that pair, or `0` when no such trip was recorded.

The pairs have to be reported in a stable order (by start station, then end station).

## Input Format

```
n
start end t
start end t
...
```

- `n` — the number of completed trips.
- `start end t` — the start station, the end station and the duration of the trip.

The program prints one line per station pair, sorted by start station and then end
station: `start end average` with the average formatted to two decimals.

## Sample Input

```
3
1 2 4
1 3 8
1 2 6
```

## Expected Output

```
1 2 5.00
1 3 8.00
```

Station pair `1 → 2` was used twice, with durations `4` and `6`, so the average is
`(4 + 6) / 2 = 5.00`. Pair `1 → 3` was used once, with duration `8`.

## Approach — a nested sorted map of running totals

Only two numbers are needed per station pair: the **sum** of the durations and the
**number** of trips. The average is derived on demand.

```
stats:  startStation → (endStation → {total, count})
```

A `TreeMap` is used instead of a `HashMap` so that iterating over it yields the pairs in
sorted order — the output does not depend on the hash order of the keys.

| Operation | Cost |
|---|---|
| record a trip | O(log p) — two tree lookups plus a constant update |
| read an average | O(log p) |
| print all pairs | O(p) — the trees are already sorted |

**Why not store the average directly?** Updating an average in place needs the old
average and the count, and floating point rounding accumulates. Keeping the exact
integer total and the count is exact and division happens only when the answer is
printed.

## Dry Run

Input: `n = 3`, trips `(1,2,4)`, `(1,3,8)`, `(1,2,6)`.

| Step | Trip | `stats` before | Cell touched | Action | `stats` after | Average of the cell |
|---:|---|---|---|---|---|---|
| 1 | `1 2 4` | `{}` | `1 → 2` | total `0+4 = 4`, count `0+1 = 1` | `{1 → {2 → {4, 1}}}` | `4 / 1 = 4.00` |
| 2 | `1 3 8` | `{1 → {2 → {4, 1}}}` | `1 → 3` | total `0+8 = 8`, count `0+1 = 1` | `{1 → {2 → {4, 1}, 3 → {8, 1}}}` | `8 / 1 = 8.00` |
| 3 | `1 2 6` | `{1 → {2 → {4, 1}, 3 → {8, 1}}}` | `1 → 2` | total `4+6 = 10`, count `1+1 = 2` | `{1 → {2 → {10, 2}, 3 → {8, 1}}}` | `10 / 2 = 5.00` |

The final walk over the sorted maps visits `1 → 2` before `1 → 3`:

| Order | Pair | `total` | `count` | Average |
|---:|---|---:|---:|---|
| 1 | `1 2` | 10 | 2 | `10 / 2 = 5.00` |
| 2 | `1 3` | 8 | 1 | `8 / 1 = 8.00` |

## Java Solution

See [`DesignUndergroundSystem.java`](./DesignUndergroundSystem.java).

```java
public double recordTrip(int startStation, int endStation, int travelTime) {
    Stats cell = stats
            .computeIfAbsent(startStation, k -> new TreeMap<>())
            .computeIfAbsent(endStation, k -> new Stats(0, 0));
    cell.total += travelTime;
    cell.count++;
    return average(startStation, endStation);
}

public double average(int startStation, int endStation) {
    TreeMap<Integer, Stats> inner = stats.get(startStation);
    if (inner == null) {
        return 0.0;
    }
    Stats cell = inner.get(endStation);
    if (cell == null || cell.count == 0) {
        return 0.0;
    }
    return (double) cell.total / cell.count;
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(log p) per trip, O(p) for the report | p = number of station pairs; tree lookups |
| **Space** | O(p) | one cell per station pair |

## Interview Notes

**Follow-ups to raise yourself:**
- *"What if the station names are strings?"* → the map stays the same, only the key type
  changes; the sorted output then follows the lexicographic order.
- *"How would you find the busiest route?"* → keep the count next to the sum and sort by
  it, or maintain a separate heap of the top-k routes.
- *"How would you scale this to 100 million trips?"* → shard by route hash, pre-aggregate
  per minute, and merge the partial aggregates.
- *"How would you report a median instead of an average?"* → keep a sketch (t-digest) or
  a per-route histogram of quantised durations.

**Common mistakes:**
- ❌ Updating the average in place instead of keeping the exact total and the count.
- ❌ Using a `HashMap` and then sorting by hash order — the output must be sorted.
- ❌ Forgetting the `count == 0` guard → division by zero.
- ❌ Formatting the average with the default locale → `1,50` instead of `1.50` on a
  German machine. Always use `Locale.ROOT`.

**How to narrate:**
> "For every route I only need two numbers: the total travel time and the number of
> trips. The average is the quotient, computed when it is asked for, so no rounding
> accumulates. I'll use a nested TreeMap so that the report comes out sorted by start and
> end station without an extra sort."

## Related Problems

- [MovingAverage — LeetCode 346](./MovingAverage.md) — a running average over a window
- [Design HitCounter — LeetCode 362](./DesignHitCounter.md) — counting inside a window
- [Design HashMap — LeetCode 706](./DesignHashMap.md) — the map underneath
