---
title: Burst Balloons
leetcode: 312
difficulty: Hard
patterns: [Interval DP, Bottom-up DP]
companies: [Google, Amazon, Bloomberg, LinkedIn, Flipkart]
frequency: 4
tags: [dynamic-programming, interval-dp, hard]
sampleInput: |
  3
  3 1 5
sampleOutput: "35"
---

# Burst Balloons — LeetCode 312

| | |
|---|---|
| **Difficulty** | Hard |
| **Pattern** | Interval DP · Bottom-up DP |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Uber |

## Problem Statement

You are given `n` balloons. The `i`-th balloon has the value `nums[i]`. Burst a balloon and you collect `nums[i-1] × nums[i] × nums[i+1]` coins — where the neighbours are the balloons that are still alive at that moment (a missing neighbour counts as `1`).

Return the **maximum** number of coins you can collect by bursting every balloon.

## Input Format

The program reads from standard input:

```
n
nums[0] nums[1] ... nums[n-1]
```

- `n` — number of balloons (1 ≤ n ≤ 100)
- `nums` — n space-separated non-negative integers

## Sample Input

```
3
3 1 5
```

## Expected Output

```
35
```

Burst the `1` first (`3 × 1 × 5 = 15`), then the `3` (`1 × 3 × 5 = 15`), then the `5` (`1 × 5 × 1 = 5`) → `35`.

## Approach

**The insight is to pick the LAST balloon of an interval, not the first.**

The naive state "the best score for the interval `[i, j]`" is broken, because bursting order changes the neighbours. But if we ask *"which balloon is burst last inside this interval?"*, then at that moment its two neighbours are exactly the balloons that frame the interval — and those are known.

1. Pad the array with two virtual balloons of value `1`: `a = [1, nums…, 1]`.
2. `dp[l][r]` = the best score for bursting everything **strictly between** `l` and `r`, while    `l` and `r` stay alive.
3. If balloon `k` (with `l < k < r`) is burst last, its neighbours are `a[l]` and `a[r]`, so it    earns `a[l] × a[k] × a[r]`, and the two sub-intervals are independent:
   `dp[l][r] = max over k of ( dp[l][k] + dp[k][r] + a[l]·a[k]·a[r] )`.
4. The answer is `dp[0][n+1]`.

The table is filled with `left` decreasing and `right` increasing, so both sub-intervals are already known when a cell is computed.

## Dry Run

Input: `nums = [3, 1, 5]` → padded `a = [1, 3, 1, 5, 1]` (indices 0 … 4).

| `dp[l][r]` | last balloon `k` | computation | value |
|---|---|---|---:|
| `dp[0][2]` | 1 | `dp[0][1] + dp[1][2] + 1·3·1 = 0 + 0 + 3` | **3** |
| `dp[1][3]` | 2 | `dp[1][2] + dp[2][3] + 3·1·5 = 15` | **15** |
| `dp[2][4]` | 3 | `dp[2][3] + dp[3][4] + 1·5·1 = 5` | **5** |
| `dp[0][3]` | 1 or 2 | `max(0 + 15 + 15, 3 + 0 + 5) = 30` | **30** |
| `dp[1][4]` | 2 or 3 | `max(0 + 5 + 3, 15 + 0 + 15) = 30` | **30** |
| `dp[0][4]` | 1, 2 or 3 | `max(0 + 30 + 3, 3 + 5 + 1, 30 + 0 + 5) = 35` | **35** |

Full table: `dp[0][4] = 35` → answer **35**.

**The whole table** (rows `l`, columns `r`, `-` means not applicable):

| | r=0 | r=1 | r=2 | r=3 | r=4 |
|---|---:|---:|---:|---:|---:|
| l=0 | – | 0 | 3 | 30 | **35** |
| l=1 | – | – | 0 | 15 | 30 |
| l=2 | – | – | – | 0 | 5 |
| l=3 | – | – | – | – | 0 |

**The optimal order** for `[3, 1, 5]`:

| step | balloon burst | coins | why |
|---:|---|---:|---|
| 1 | `1` (middle) | `3 × 1 × 5 = 15` | it separates the two big ones |
| 2 | `3` | `1 × 3 × 5 = 15` | its neighbours are now the virtual `1` and the `5` |
| 3 | `5` | `1 × 5 × 1 = 5` | only the virtual balloons are left |

Total `15 + 15 + 5 = 35` ✓

## Java Solution

See [`BurstBalloons.java`](./BurstBalloons.java).

```java
    public static int maxBurst(int[] nums) {
        int n = nums.length;
        int[] balloons = new int[n + 2];
        balloons[0] = 1;
        balloons[n + 1] = 1;
        for (int i = 0; i < n; i++) {
            balloons[i + 1] = nums[i];
        }

        int[][] dp = new int[n + 2][n + 2];
        for (int left = n; left >= 0; left--) {
            for (int right = left + 1; right <= n + 1; right++) {
                for (int last = left + 1; last < right; last++) {
                    int coins = balloons[left] * balloons[last] * balloons[right]
                            + dp[left][last] + dp[last][right];
                    dp[left][right] = Math.max(dp[left][right], coins);
                }
            }
        }
        return dp[0][n + 1];
    }
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n³) | `O(n²)` intervals, each trying `O(n)` last balloons |
| **Space** | O(n²) | the `(n + 2) × (n + 2)` table |

**Space `O(n²)`.** The table cannot be rolled up easily, because each cell reads two sub-intervals that are not adjacent in the filling order.

## Interview Notes

**Follow-ups to raise yourself:**

- "Why do we need the virtual balloons?"* → they model the "missing neighbour counts as 1" rule and make the answer a single cell, `dp[0][n+1]`.
- "Why can we not just pick the biggest balloon first?"* → because bursting a balloon changes the neighbours of its neighbours; the order matters and greedy fails.
- "How is this related to matrix chain multiplication?"* → it is the same interval DP with a different score function.
- "Can it be `O(n²)`?"* → not with the classic formulation; the `O(n³)` DP is the standard answer.

**Common mistakes:**

- ❌ Forgetting the virtual `1` balloons and then special-casing the edges.
- ❌ Choosing the **first** balloon of the interval instead of the last — the neighbours are then unknown and the recurrence does not close.
- ❌ Filling the table with `left` increasing (the sub-intervals would not be ready yet).

**How to narrate:**

> "The trick is to decide the **last** balloon of an interval, not the first. I pad the array with two virtual balloons of value 1, and `dp[l][r]` is the best score for bursting everything between `l` and `r` while they stay alive. If balloon `k` goes last, its neighbours are exactly `l` and `r`, so the score is `dp[l][k] + dp[k][r] + a[l]*a[k]*a[r]`, and I take the best `k`. That is `O(n³)` time and `O(n²)` space."

## Related Problems

- [Longest Palindromic Subsequence](./PalindromicSubstrings.java) — interval DP on strings
- [Unique Paths — LeetCode 62](./UniquePaths.java) — the 2-D DP baseline
