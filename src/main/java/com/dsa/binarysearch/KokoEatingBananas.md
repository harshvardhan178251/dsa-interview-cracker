---
title: Koko Eating Bananas
leetcode: 875
difficulty: Medium
patterns: [Binary search on the answer]
companies: [Meta, Google, Apple, Uber, Oracle]
frequency: 4
tags: [binary-search, arrays, greedy]
sampleInput: |
  5
  3 1 4 1 5
  5
sampleOutput: "5"
---

# Koko Eating Bananas — LeetCode 875

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Binary search on the answer |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Uber |

## Problem Statement

Koko eats bananas at a constant speed of `x` bananas per hour and prefers to eat as many
bananas as possible each hour, so she finishes a pile of `p` bananas in `ceil(p / x)` hours.

Given the pile sizes and a limit of `h` hours, return the **minimum** speed at which she can
finish all the piles.

- `1 <= piles.length <= 10⁴`
- `1 <= piles[i] <= 10⁹`
- `1 <= h <= 10⁹`

## Input Format

The program reads from standard input:

```
n
piles[0] piles[1] ... piles[n-1]
h
```

- `n` — number of piles (1 ≤ n ≤ 10⁴)
- `piles` — n space-separated integers, the banana count of each pile
- `h` — the hour budget

## Sample Input

```
5
3 1 4 1 5
5
```

## Expected Output

```
5
```

At speed `5` Koko needs `1 + 1 + 1 + 1 + 1 = 5` hours. At speed `4` she needs
`1 + 1 + 1 + 1 + 2 = 6` hours, which is too many.

## Approach — Binary search on the answer

The answer is not a position in the array, it is a **value** — the speed. That is the signal
to search for a *predicate* instead:

> `P(x) = "Koko can finish all piles within h hours when eating at speed x"`.

`P` is monotone: if speed `x` is fast enough, every larger speed is fast enough too. So the
set of feasible speeds is a suffix `[x*, ∞)` and we binary search for its first element.

**The feasibility check.** For a fixed speed `x`, the total time is

```
hours(x) = Σ ceil(piles[i] / x)
```

which we compute with integer arithmetic as `(piles[i] + x - 1) / x`. A `long` accumulator
is used because the sum can exceed `int` range (10⁴ piles × 10⁹ hours).

**The search range.** `low = 1` (you cannot eat slower than one banana per hour) and
`high = max(piles)` (at that speed every pile takes exactly one hour, which is the fastest
possible schedule shape).

## Dry Run

Input: `piles = [3, 1, 4, 1, 5]`, `h = 5`

| Step | low | high | mid | `hours(mid)` | feasible? | range after |
|---:|---:|---:|---:|---|---|---|
| 1 | 1 | 5 | 3 | `1+1+2+1+2 = 7` | no (7 > 5) | `[4, 5]` |
| 2 | 4 | 5 | 4 | `1+1+1+1+2 = 6` | no (6 > 5) | `[5, 5]` |

`low == high == 5` → return **5**.

### The per-pile detail — `hours(4)` for `piles = [3, 1, 4, 1, 5]`

| Pile | Bananas | `ceil(pile / 4)` | Running total |
|---:|---:|---:|---:|
| 0 | 3 | `ceil(3/4) = 1` | 1 |
| 1 | 1 | `ceil(1/4) = 1` | 2 |
| 2 | 4 | `ceil(4/4) = 1` | 3 |
| 3 | 1 | `ceil(1/4) = 1` | 4 |
| 4 | 5 | `ceil(5/4) = 2` | 6 |

`6 > 5` → speed `4` is too slow.

## Java Solution

See [`KokoEatingBananas.java`](./KokoEatingBananas.java).

```java
public static int minEatingSpeed(int[] piles, int h) {
    int low = 1;
    int high = 0;
    for (int pile : piles) {
        high = Math.max(high, pile);
    }
    while (low < high) {
        int mid = low + (high - low) / 2;
        if (hoursNeeded(piles, mid) <= h) {
            high = mid;
        } else {
            low = mid + 1;
        }
    }
    return low;
}

private static long hoursNeeded(int[] piles, int speed) {
    long hours = 0;
    for (int pile : piles) {
        hours += ((long) pile + speed - 1) / speed;
    }
    return hours;
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n log M) | M = max(piles); each feasibility check is O(n) |
| **Space** | O(1) | No extra containers |

## Interview Notes

**Follow-ups to raise yourself:**
- *"Can you avoid the O(n) feasibility check?"* → precompute prefix sums of the piles and
  note that `Σ ceil(p / x)` can be computed with a histogram of pile sizes in
  O(max(pile)) — but only pays off when max(pile) is small.
- *"What if `h` is very large?"* → the answer collapses to `1` as soon as
  `Σ piles <= h`; check that first.
- *"What if piles can be split between hours?"* → the model changes (it becomes a rate
  problem), and the ceil disappears.
- *"Why not binary search on the number of hours instead?"* → the hour budget is fixed; the
  unknown is the speed.

**Common mistakes:**
- ❌ Using integer division `pile / speed` instead of the ceiling → under-counts the hours
  and returns a speed that is too small.
- ❌ Overflowing `(pile + speed - 1)` → cast to `long` before adding.
- ❌ Searching the range `[0, max(piles)]` → speed `0` is meaningless and causes a division
  by zero.
- ❌ Assuming the piles can be eaten in parallel → the hours **add up**, they do not max out.

**How to narrate:**
> "The unknown here is a speed, not an index, so I'll binary search over the answer. The
> predicate 'can she finish in time at speed x' is monotone, so I search the range
> `[1, max(piles)]`. Each check sums `ceil(pile / x)` — the total number of hours — and I
> keep the smallest speed whose total fits in the budget."

## Related Problems

- [Capacity To Ship Packages Within D Days](./CapacityToShipPackages.java) — the same shape, a different feasibility check
- [Split Array Largest Sum](./SplitArrayLargestSum.java) — binary search on a limit
- [Square Root of a Number](./SquareRootOfANumber.java) — the simplest binary search on an answer
