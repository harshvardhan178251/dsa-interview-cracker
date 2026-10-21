---
title: Maximum Profit Scheduling Jobs
leetcode: null
difficulty: Medium
patterns: [Greedy sorting, Weighted interval scheduling]
companies: [Meta, Bloomberg, Infosys]
frequency: 3
tags: [intervals, dynamic-programming, greedy]
sampleInput: |
  4
  1 3 50
  2 5 20
  3 6 60
  4 7 30
sampleOutput: "110"
---

# Maximum Profit Scheduling Jobs

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Greedy sorting · Weighted interval scheduling |
| **Interview heat** | ★★★☆☆ |
| **Asked at** | Amazon, Google, Meta, Uber |

## Problem Statement

Every job `i` occupies the half-open time span `[start[i], end[i])` and pays
`profit[i]`. One machine can run at most one job at a time. Return the **largest total
profit** that can be earned.

- A job that ends at `t` and a job that starts at `t` do **not** conflict.
- Jobs are given in any order.

## Input Format

The program reads from standard input:

```
n
start[0] end[0] profit[0]
start[1] end[1] profit[1]
...
start[n-1] end[n-1] profit[n-1]
```

- `n` — number of jobs (1 ≤ n ≤ 10⁴)
- `start` — start of each job
- `end` — end of each job (`start < end`)
- `profit` — profit of each job

## Sample Input

```
4
1 3 50
2 5 20
3 6 60
4 7 30
```

## Expected Output

```
110
```

Take the job `[1, 3)` (profit 50) and then the job `[3, 6)` (profit 60): `50 + 60 = 110`.

## Approach — sort by finishing time, then DP

The greedy part is the **ordering**: sort the jobs by their finishing time. The
selection part is a DP, because a higher profit job may block two cheaper jobs.

Let `dp[i]` be the best profit obtainable from the first `i` jobs in that order. For
the `i`-th job there are exactly two options:

- **skip it** → `dp[i - 1]`;
- **take it** → `profit[i] + dp[c]`, where `c` is the number of earlier jobs that finish
  at or before `start[i]`. Those jobs are exactly the first `c` jobs of the sorted
  list, so `dp[c]` is a prefix entry.

`dp[i] = max(dp[i - 1], profit[i] + dp[c])`.

**Why sorting by finishing time is the right greedy choice:** every job that can
follow a job `X` must start after `X` ends, so it must end later than `X` ends.
Sorting by end time therefore puts all possible successors of a job *after* it, which
makes the "compatible prefix" `c` a simple prefix of the sorted list. Sorting by start
time or by profit would not have this property.

**Exchange argument (why taking a job is safe once it is chosen):** if we take job `i`,
every job that overlaps it is unusable anyway, so the only decision that matters is
which set of *compatible* jobs to add — and that is exactly the smaller problem
`dp[c]` that the DP already solves optimally. The DP never discards an option: for
every job it explicitly evaluates both "skip" and "take", so the maximum is never
below the optimum.

## Dry Run

Input: jobs `(1,3,50)`, `(2,5,20)`, `(3,6,60)`, `(4,7,30)`

Sorted by finishing time: `(1,3,50)`, `(2,5,20)`, `(3,6,60)`, `(4,7,30)`

| Step | job | `dp[i-1]` | compatible count `c` | `profit + dp[c]` | `dp[i]` | choice |
|---:|---|---:|---:|---:|---:|---|
| 1 | `(1,3,50)` | `dp[0] = 0` | 0 (nothing ends ≤ 1) | `50 + dp[0] = 50` | `max(0, 50) = 50` | take |
| 2 | `(2,5,20)` | `dp[1] = 50` | 0 (no job ends ≤ 2) | `20 + dp[0] = 20` | `max(50, 20) = 50` | skip |
| 3 | `(3,6,60)` | `dp[2] = 50` | 1 (job 1 ends at 3 ≤ 3) | `60 + dp[1] = 110` | `max(50, 110) = 110` | take |
| 4 | `(4,7,30)` | `dp[3] = 110` | 1 (job 1 ends at 3 ≤ 4) | `30 + dp[1] = 80` | `max(110, 80) = 110` | skip |

`dp[4] = 110` ✓ — jobs `(1,3,50)` and `(3,6,60)`.

## Java Solution

See [`SchedulingMaximumProfit.java`](./SchedulingMaximumProfit.java).

```java
public static int maxProfit(Interval[] jobs, int[] profits) {
    Integer[] order = new Integer[jobs.length];
    for (int i = 0; i < jobs.length; i++) {
        order[i] = i;
    }
    Arrays.sort(order, (a, b) -> {
        int byEnd = Integer.compare(jobs[a].end, jobs[b].end);
        return byEnd != 0 ? byEnd : Integer.compare(jobs[a].start, jobs[b].start);
    });

    int[] ends = new int[n];
    for (int i = 0; i < n; i++) {
        ends[i] = jobs[order[i]].end;
    }

    int[] dp = new int[n + 1];
    for (int i = 1; i <= n; i++) {
        Interval job = jobs[order[i - 1]];
        int profit = profits[order[i - 1]];

        int lo = 0, hi = i - 2, compatible = 0;
        while (lo <= hi) {
            int mid = (lo + hi) / 2;
            if (ends[mid] <= job.start) {
                compatible = mid + 1;
                lo = mid + 1;
            } else {
                hi = mid - 1;
            }
        }
        dp[i] = Math.max(dp[i - 1], profit + dp[compatible]);
    }
    return dp[n];
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n log n) | the sort plus one binary search per job |
| **Space** | O(n) | the sorted index array, the `ends` array and the `dp` table |

## Interview Notes

**Follow-ups to raise yourself:**
- *"What if there are `m` machines instead of one?"* → a different DP (one dimension
  per machine) or a greedy sweep with a heap of machine end times.
- *"What if every job has the same profit?"* → the answer is the classic activity
  selection greedy: sort by end time and always take the next compatible job.
- *"Can you recover the chosen jobs?"* → remember the decision in `dp[i]` and walk
  backwards.

**Common mistakes:**
- ❌ Sorting by profit instead of by finishing time — a very profitable job can block
  two better ones.
- ❌ Using `end < start` instead of `end <= start` when testing compatibility — with
  half-open intervals a job may start exactly when the previous one ends.
- ❌ Forgetting that the DP index `c` counts *jobs*, not time units.

**How to narrate:**
> "I sort the jobs by finishing time — that way all jobs that can follow a given job
> come after it, and the compatible set is a prefix of the sorted list. Then it's the
> classic weighted interval scheduling DP: for each job either skip it or take it plus
> the best profit of the jobs that finish before it starts. Both branches are
> evaluated, so the DP always keeps the better of the two."

## Related Problems

- [Non-overlapping Intervals](../intervals/NonOverlappingIntervals.md) — the unweighted version of this DP
- [Meeting Rooms III](../intervals/MeetingRoomsIII.md) — the same interval sweep with several rooms
