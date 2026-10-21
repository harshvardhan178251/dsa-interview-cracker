---
title: Allocate Minimum Number of Painters
leetcode: null
difficulty: Hard
patterns: [Binary search on the answer, Greedy, Partition]
companies: [Google, Apple, Wipro]
frequency: 3
tags: [binary-search, greedy, partition, hard]
sampleInput: |
  4
  10 10 10 10
  2
sampleOutput: "20"
---

# Allocate Minimum Number of Painters — classic painter's-partition problem

| | |
|---|---|
| **Difficulty** | Hard |
| **Pattern** | Binary search on the answer · Greedy · Partition |
| **Interview heat** | ★★★☆☆ |
| **Asked at** | Amazon, Google, Adobe, Flipkart |

## Problem Statement

There are `n` boards with lengths `boards[0..n-1]` and `k` painters. Each painter paints one
**continuous run** of boards and takes exactly as much time as the total length of the boards
assigned to them. All painters work **in parallel**, so the total time is the **largest**
workload of any single painter.

Return the minimum possible total time.

- `1 <= n <= 10⁵`, `1 <= boards[i] <= 10⁵`
- `1 <= k <= n`
- A painter may take no boards at all (if there are more painters than boards the answer is
  the longest board).

## Input Format

The program reads from standard input:

```
n
boards[0] boards[1] ... boards[n-1]
k
```

- `n` — number of boards (1 ≤ n ≤ 10⁵)
- `boards` — n space-separated board lengths, in painting order
- `k` — the number of painters

## Sample Input

```
4
10 10 10 10
2
```

## Expected Output

```
20
```

Each painter takes two boards: `10 + 10 = 20`. With a limit of 19 each painter could take
only one board, so four painters would be needed — more than the two available.

## Approach — Binary search on the maximum workload

The unknown is the **maximum work** a single painter may be given. Search a monotone
predicate:

> `P(L) = "all boards can be painted by at most k painters if no painter exceeds L"`.

`P` is monotone: if `L` is enough, every larger limit is enough too. The feasible limits
form a suffix `[L*, ∞)`; we want the first element.

**The feasibility check is greedy.** Walk the boards in order, giving each painter as many
consecutive boards as fit under `L`, then start a new painter. This greedy split uses the
**minimum** number of painters for a given limit — closing a painter's run earlier only
creates more painters. If the greedy split needs more than `k` painters, the limit is too
small.

**The search range.** `low = max(boards)` (a board cannot be split between painters) and
`high = sum(boards)` (one painter takes everything).

**Why this is "Hard".** The greedy split is easy; the insight that the *limit* is the
monotone quantity — and that the answer is the **smallest** feasible limit — is what makes
it hard. Many candidates binary search on "how many painters" instead, which is not the
monotone direction.

## Dry Run

Input: `boards = [10, 10, 10, 10]`, `k = 2`

| Step | low | high | mid | greedy split for `mid` | painters needed | feasible? | range after |
|---:|---:|---:|---:|---|---:|---|---|
| 1 | 10 | 40 | 25 | `[10,10]` `[10,10]` | 2 | yes | `[10, 25]` |
| 2 | 10 | 25 | 17 | `[10]` `[10]` `[10]` `[10]` | 4 | no | `[18, 25]` |
| 3 | 18 | 25 | 21 | `[10,10]` `[10,10]` | 2 | yes | `[18, 21]` |
| 4 | 18 | 21 | 19 | `[10]` `[10]` `[10]` `[10]` | 4 | no | `[20, 21]` |

`low == high == 20` → return **20**.

### The greedy split in detail — limit `L = 19` on `[10, 10, 10, 10]`

| Painter | Boards taken | Load | Decision |
|---:|---|---:|---|
| 1 | 10 | 10 | next board would make `10 + 10 = 20 > 19` → new painter |
| 2 | 10 | 10 | `20 > 19` → new painter |
| 3 | 10 | 10 | `20 > 19` → new painter |
| 4 | 10 | 10 | done — **4 painters needed** > 2 → infeasible |

With `L = 20`: painter 1 takes `[10, 10]` (load 20), painter 2 takes `[10, 10]` (load 20) —
exactly 2 painters.

## Java Solution

See [`AllocateMinimumNumberOfPainters.java`](./AllocateMinimumNumberOfPainters.java).

```java
public static int minTimeToPaint(int[] boards, int painters) {
    long low = 0;
    long high = 0;
    for (int board : boards) {
        low = Math.max(low, board);
        high += board;
    }
    while (low < high) {
        long mid = low + (high - low) / 2;
        if (paintersNeeded(boards, mid) <= painters) {
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
| **Time** | O(n log S) | S = sum(boards); one O(n) check per binary-search step |
| **Space** | O(1) | No extra containers |

## Interview Notes

**Follow-ups to raise yourself:**
- *"Can you return the actual assignment of boards to painters?"* → yes, record the split
  boundaries during the successful check.
- *"What if the boards can be reordered?"* → the answer becomes
  `max(max(boards), ceil(sum / k))`; no search needed.
- *"What if a painter may skip boards (paint non-contiguous runs)?"* → the greedy
  justification changes; the binary search on the limit still works but the check becomes a
  bin-packing feasibility test (NP-hard in general).
- *"How would you prove the greedy check is optimal?"* → exchange argument: in any feasible
  split the first painter can be given at least as many boards as the greedy gives them
  without exceeding the limit, so the greedy never needs more painters.

**Common mistakes:**
- ❌ Binary searching on the number of painters instead of on the limit → the wrong monotone
  direction.
- ❌ Setting `low = 0` → a limit of 0 cannot hold any board.
- ❌ Returning the *number of painters* instead of the *limit* → the question asks for the
  time.
- ❌ Forgetting that the makespan is the **max** over painters, not the sum.

**How to narrate:**
> "The unknown is how much work one painter may be given. I binary search that limit: 'can
> k painters finish if nobody exceeds L?' The check is greedy — give each painter as many
> consecutive boards as fit — and because the answer is the *smallest* feasible limit, I
> keep the lower half whenever the check succeeds."

## Related Problems

- [Capacity To Ship Packages Within D Days](./CapacityToShipPackages.java) — the same shape with ships and days
- [Split Array Largest Sum](./SplitArrayLargestSum.java) — the same shape with groups
- [Koko Eating Bananas](./KokoEatingBananas.java) — binary search on a rate
