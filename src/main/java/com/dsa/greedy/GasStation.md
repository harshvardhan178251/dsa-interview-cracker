---
title: Gas Station
leetcode: 134
difficulty: Medium
patterns: [Greedy, Prefix-sum reset]
companies: [Amazon, Meta, Google, Microsoft, Uber]
frequency: 4
tags: [array, greedy, prefix-sum]
sampleInput: |
  5
  1 2 3 4 5
  3 4 5 1 2
sampleOutput: "3"
---

# Gas Station — LeetCode 134

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Greedy · Prefix-sum reset |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Meta, Google, Microsoft, Uber |

## Problem Statement

There are `n` gas stations arranged in a circle. Station `i` holds `gas[i]` units of
fuel; driving from station `i` to station `i+1` costs `cost[i]` units. You start with
an empty tank at some station and must complete the whole circle.

Return the **index of a station** from which the circuit can be completed, or `-1` when
it is impossible. If several stations work, any of them is accepted.

## Input Format

The program reads from standard input:

```
n
gas[0] gas[1] ... gas[n-1]
cost[0] cost[1] ... cost[n-1]
```

- `n` — number of stations (1 ≤ n ≤ 10⁵)
- `gas` — n space-separated non-negative integers
- `cost` — n space-separated non-negative integers

## Sample Input

```
5
1 2 3 4 5
3 4 5 1 2
```

## Expected Output

```
3
```

From station 3 the tank never goes negative: `4-1=3`, `+5-2=6`, `+1-3=4`, `+2-4=2`,
`+3-5=0`.

## Approach — reset the candidate start

Two numbers do all the work:

- `total` — `gas - cost` summed over **all** stations. If `total < 0` the whole circle
  consumes more fuel than it provides, so no start works → `-1`.
- `tank` — `gas - cost` summed from the **current candidate start** up to the station
  we are looking at.

Walk the stations in order. Whenever `tank` drops below zero, the current candidate
start is dead — the car ran dry *before* reaching the next station — so move the
candidate to the next station and reset `tank` to 0.

**Exchange argument (why skipping to the next station is safe):** suppose the candidate
start is `s` and the tank first goes negative at station `k`. Then the sum of
`gas - cost` over `[s .. k]` is negative. Any start `s' ∈ (s, k]` is worse: the sum
over `[s' .. k]` is *even smaller* (we removed a prefix whose sum is at least as large
as the whole negative sum), so the car also runs dry at or before `k` when starting
from `s'`. Therefore every station between `s` and `k` can be discarded, and the search
may continue at `k + 1`. No valid start is ever skipped.

Together with `total >= 0` (which guarantees that *some* start works) the final
candidate is the answer.

## Dry Run

Input: `gas = [1, 2, 3, 4, 5]`, `cost = [3, 4, 5, 1, 2]`

| Step | i | gas[i] | cost[i] | diff | `total` after | `tank` before | `tank` after | `start` after | Note |
|---:|---:|---:|---:|---:|---:|---:|---:|---:|---|
| 1 | 0 | 1 | 3 | -2 | -2 | 0 | -2 | 1 | tank negative → restart at 1 |
| 2 | 1 | 2 | 4 | -2 | -4 | 0 | -2 | 2 | tank negative → restart at 2 |
| 3 | 2 | 3 | 5 | -2 | -6 | 0 | -2 | 3 | tank negative → restart at 3 |
| 4 | 3 | 4 | 1 | 3 | -3 | 0 | 3 | 3 | tank positive, keep candidate |
| 5 | 4 | 5 | 2 | 3 | 0 | 3 | 6 | 3 | tank positive, keep candidate |

`total = 0 ≥ 0` → the circuit is possible and the answer is `start = 3`.

## Java Solution

See [`GasStation.java`](./GasStation.java).

```java
public static int canCompleteCircuit(int[] gas, int[] cost) {
    if (gas == null || cost == null || gas.length == 0 || gas.length != cost.length) {
        return -1;
    }
    int total = 0;
    int tank = 0;
    int start = 0;
    for (int i = 0; i < gas.length; i++) {
        int diff = gas[i] - cost[i];
        total += diff;
        tank += diff;
        if (tank < 0) {
            start = i + 1;
            tank = 0;
        }
    }
    return total >= 0 ? start % gas.length : -1;
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n) | a single pass over the stations |
| **Space** | O(1) | three counters |

## Interview Notes

**Follow-ups to raise yourself:**
- *"What if the stations are not given in a circle but on a line?"* → the same reset
  logic works, but you must also check that the total fuel covers the total distance.
- *"Return **all** valid starting stations."* → after finding one candidate, scan again
  from it and collect every index whose running tank never dips below zero.
- *"What if a station can hold only a limited amount of fuel?"* → the greedy reset no
  longer holds; it becomes a flow problem.

**Common mistakes:**
- ❌ Forgetting the `total` check — a candidate start can survive the scan even when
  the whole circle is impossible.
- ❌ Resetting `tank` but not `total` (or vice versa) — they track different ranges.
- ❌ Assuming the answer is unique — with `total >= 0` there can be several valid
  starts; any of them is accepted.

**How to narrate:**
> "Two running sums do the work. `total` tells me whether the circle is possible at
> all. `tank` tracks the fuel since my current candidate start; when it goes negative
> I know that start — and every start before the failure point — is dead, so I jump to
> the next station. That never skips a valid answer, because any start inside the
> failing segment has an even smaller amount of fuel."

## Related Problems

- [Jump Game](./JumpGame.md) — the same "extend or give up" greedy shape
- [Partition Array Into Maximum Subarrays](./PartitionArrayToMaximumSum.md) — greedy with a heap
