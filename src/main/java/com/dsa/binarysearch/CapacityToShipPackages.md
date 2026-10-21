---
title: Capacity To Ship Packages Within D Days
leetcode: 1011
difficulty: Medium
patterns: [Binary search on the answer, Greedy]
companies: [Amazon, Google, Apple, Netflix, eBay]
frequency: 4
tags: [binary-search, greedy, arrays]
sampleInput: |
  6
  1 2 3 4 5 6
  3
sampleOutput: "9"
---

# Capacity To Ship Packages Within D Days — LeetCode 1011

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Binary search on the answer · Greedy |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Uber, Microsoft |

## Problem Statement

A conveyor belt carries `n` packages in order; package `i` weighs `weights[i]`. Every day a
ship can carry packages of total weight at most `capacity` — and the packages on the belt
must be loaded **in order**, so a ship's cargo is always a contiguous run.

Return the **minimum** capacity that allows all packages to be shipped within `d` days.

- `1 <= n <= 10⁵`
- `1 <= weights[i] <= 10⁴`
- `1 <= d <= n`

## Input Format

The program reads from standard input:

```
n
weights[0] weights[1] ... weights[n-1]
d
```

- `n` — number of packages (1 ≤ n ≤ 10⁵)
- `weights` — n space-separated package weights, in conveyor order
- `d` — the number of days available

## Sample Input

```
6
1 2 3 4 5 6
3
```

## Expected Output

```
9
```

With capacity `9` the ship loads `[1,2,3]`, `[4,5]`, `[6]` — three days.
Capacity `8` would need `[1,2,3]`, `[4]`, `[5]`, `[6]` — four days, which is too many.

## Approach — Binary search on the capacity

The unknown is a **capacity**, so we binary search a monotone predicate:

> `P(c) = "all packages fit into at most d days when a ship carries c per day"`.

`P` is monotone: a bigger ship can always replicate a smaller ship's schedule. So the
feasible capacities form a suffix `[c*, ∞)` and we want the first element of that suffix.

**The feasibility check is greedy.** Load the ship until the next package would exceed the
capacity, then start a new day. Because packages must stay in order and cannot be split, the
greedy "fill each day as much as possible" schedule uses the **minimum** number of days. Any
other schedule that closes a day earlier leaves more work for the later days and can only
use more days.

**The search range.** `low = max(weights)` (a package heavier than the ship can never be
carried) and `high = sum(weights)` (one ship, one day, everything).

## Dry Run

Input: `weights = [1, 2, 3, 4, 5, 6]`, `d = 3`

| Step | low | high | mid | greedy day-by-day load | days needed | feasible? | range after |
|---:|---:|---:|---:|---|---:|---|---|
| 1 | 6 | 21 | 13 | `[1,2,3,4]` `[5]` `[6]` | 3 | yes | `[6, 13]` |
| 2 | 6 | 13 | 9 | `[1,2,3]` `[4,5]` `[6]` | 3 | yes | `[6, 9]` |
| 3 | 6 | 9 | 7 | `[1,2,3]` `[4]` `[5]` `[6]` | 4 | no | `[7, 9]` |
| 4 | 7 | 9 | 8 | `[1,2,3]` `[4]` `[5]` `[6]` | 4 | no | `[9, 9]` |

`low == high == 9` → return **9**.

### The greedy day-by-day detail for `capacity = 9`

| Day | Package | Load before | Load after | Decision |
|---:|---:|---:|---:|---|
| 1 | 1 | 0 | 1 | fits |
| 1 | 2 | 1 | 3 | fits |
| 1 | 3 | 3 | 6 | fits |
| 1 | 4 | 6 | — | `6 + 4 = 10 > 9` → new day |
| 2 | 4 | 0 | 4 | fits |
| 2 | 5 | 4 | 9 | fits |
| 2 | 6 | 9 | — | `9 + 6 = 15 > 9` → new day |
| 3 | 6 | 0 | 6 | fits → **3 days** |

## Java Solution

See [`CapacityToShipPackages.java`](./CapacityToShipPackages.java).

```java
public static int shipWithinDays(int[] weights, int days) {
    long low = 0;
    long high = 0;
    for (int weight : weights) {
        low = Math.max(low, weight);
        high += weight;
    }
    while (low < high) {
        long mid = low + (high - low) / 2;
        if (daysNeeded(weights, mid) <= days) {
            high = mid;
        } else {
            low = mid + 1;
        }
    }
    return (int) low;
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n log W) | W = sum(weights); one O(n) check per binary-search step |
| **Space** | O(1) | No extra containers |

## Interview Notes

**Follow-ups to raise yourself:**
- *"What if packages could be reordered?"* → then the answer is `max(max(weights), ceil(sum / d))`
  and no binary search is needed. **Ask about the ordering constraint** — it is the whole
  problem.
- *"What if a ship must carry exactly `d` days' worth, no more?"* → the same algorithm, but
  the search must also verify that `d` groups are achievable, which requires `n >= d`.
- *"Can you return the actual loading plan?"* → yes, record the day boundaries during the
  successful feasibility check.
- *"How would you parallelise this?"* → the feasibility check is a prefix scan; a
  parallel-prefix implementation gives O(n) work per check but with a much worse constant —
  rarely worth it.

**Common mistakes:**
- ❌ Forgetting the in-order constraint → the greedy check then produces a smaller answer
  than the problem allows.
- ❌ Starting `low` at `0` → capacity `0` cannot carry anything and makes the check loop
  forever on the first package.
- ❌ Using `int` for the running load → `load + weight` can overflow with 10⁵ packages of
  weight 10⁴ (sum ≈ 10⁹, still inside `int`, but the pattern is fragile).
- ❌ Checking `days == d` instead of `days <= d` → an early ship can finish before the
  deadline; that is allowed.

**How to narrate:**
> "The answer is a capacity, so I'll binary search over the predicate 'can we ship
> everything within d days at this capacity'. It's monotone, so that works. The check is
> greedy: keep loading packages until the next one doesn't fit, then start a new day —
> because packages are in order and can't be split, filling each day maximally minimises
> the number of days."

## Related Problems

- [Split Array Largest Sum](./SplitArrayLargestSum.java) — the same skeleton with groups instead of days
- [Allocate Minimum Number of Painters](./AllocateMinimumNumberOfPainters.java) — greedy check + binary search on a limit
- [Koko Eating Bananas](./KokoEatingBananas.java) — binary search on a rate
