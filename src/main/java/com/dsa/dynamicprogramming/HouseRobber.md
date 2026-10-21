---
title: House Robber
leetcode: 198
difficulty: Medium
patterns: [Bottom-up DP, Take-or-skip]
companies: [Amazon, Google, Meta, Uber, Adobe]
frequency: 5
tags: [dynamic-programming, arrays]
sampleInput: |
  4
  2 7 9 3
sampleOutput: "11"
---

# House Robber — LeetCode 198

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Bottom-up DP · Take-or-skip |
| **Interview heat** | ★★★★★ |
| **Asked at** | Amazon, Google, Meta, Uber, Adobe |

## Problem Statement

You are planning to rob houses on a street. Each house has a non-negative amount of money; **two adjacent houses must not both be robbed**. Return the maximum amount you can rob.

- `nums[i]` — money in the `i`-th house

## Input Format

The program reads from standard input:

```
n
nums[0] nums[1] ... nums[n-1]
```

- `n` — number of houses (1 ≤ n ≤ 100)
- `nums` — n space-separated non-negative integers

## Sample Input

```
4
2 7 9 3
```

## Expected Output

```
11
```

Robbing houses 1 and 3 (`7 + 3 = 10`) is legal but not optimal. The best legal choice is house 2 (`9`) together with house 0 (`2`) — houses 0 and 2 are not adjacent — giving `9 + 2 = 11`. See the dry run.

## Approach

This is the canonical **take-or-skip** dynamic programme.

1. Define `dp[i]` = the maximum total obtainable from houses `0 … i`.
2. At house `i` there are exactly two options:
   - **skip** it → we keep `dp[i-1]`;
   - **rob** it → we get `nums[i]` but must skip house `i-1`, so the total is `nums[i] + dp[i-2]`.
3. Take the better of the two: `dp[i] = max(dp[i-1], nums[i] + dp[i-2])`.
4. Base cases: `dp[-1] = dp[-2] = 0` (nothing to rob yet).

The recurrence only looks back two steps, so the table collapses into two rolling variables — `O(1)` space. Greedy does **not** work here: picking the richest house greedily (`9`) blocks `7` and `3`, giving `9`, while the optimum is `2 + 9 = 11`.

## Dry Run

Input: `nums = [2, 7, 9, 3]`. Two rolling variables hold `dp[i-2]` and `dp[i-1]`.

| house `i` | `nums[i]` | skip → `dp[i-1]` | rob → `nums[i] + dp[i-2]` | `dp[i]` | chosen |
|---:|---:|---:|---:|---:|---|
| 0 | 2 | 0 | 2 + 0 = 2 | **2** | rob |
| 1 | 7 | 2 | 7 + 0 = 7 | **7** | rob |
| 2 | 9 | 7 | 9 + 2 = 11 | **11** | rob |
| 3 | 3 | 11 | 3 + 7 = 10 | **11** | skip |

Full table: `dp = [2, 7, 11, 11]` → answer **11**.

**Greedy fails here.** Taking the richest house (`9`) first blocks both `7` and `3` and yields `9`. The DP instead keeps `9` *and* `3` (they are not adjacent) for `11`.

**Space optimisation.** The table `[2, 7, 11, 11]` is only ever read at offsets `0` and `1`, so the rolling variables `twoBack` / `oneBack` reproduce it exactly.

## Java Solution

See [`HouseRobber.java`](./HouseRobber.java).

```java
    public static int rob(int[] nums) {
        int twoBack = 0; // dp[i-2]
        int oneBack = 0; // dp[i-1]
        for (int i = 0; i < nums.length; i++) {
            int current = Math.max(oneBack, nums[i] + twoBack);
            twoBack = oneBack;
            oneBack = current;
        }
        return oneBack;
    }
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n) | one pass over the houses |
| **Space** | O(1) | two rolling variables replace the table |

**Space `O(1)`.** With a full table it would be `O(n)` time and `O(n)` space — the classic version you will see on LeetCode.

## Interview Notes

**Follow-ups to raise yourself:**

- "What if the houses are in a circle?"* → [House Robber II — LeetCode 213](./HouseRobberII.java): run the linear solution twice and take the max.
- "What if you cannot rob houses on two consecutive days?"* → same recurrence, different story.
- "What if each house has a different amount you want to steal per visit?"* → that is the unbounded knapsack / [Coin Change II](./CoinChangeII.java) shape.
- "Can you reconstruct which houses were robbed?"* → yes, keep the table and walk it backwards comparing `dp[i]` with `dp[i-1]`.
- "Why not a greedy strategy?"* → counter-example: `[2, 7, 9, 3]` — greedy takes `9`, the optimum takes `11`.

**Common mistakes:**

- ❌ Using `dp[i-1] + dp[i-2]` instead of `max(dp[i-1], nums[i] + dp[i-2])` — that is the "rob every other house" mistake and it over-counts.
- ❌ Reading `dp[i-2]` when `i == 0` (index out of bounds) instead of treating it as `0`.
- ❌ Forgetting that robbing house `i` forbids house `i-1`, not house `i-2`.

**How to narrate:**

> "At each house I have two choices: skip it, or rob it and forfeit the previous house. So the best total up to house `i` is `max(dp[i-1], nums[i] + dp[i-2])`. The recurrence only needs the last two values, so I keep two variables instead of a table. Greedy would take the biggest house and lose, so this really is a DP."

## Related Problems

- [House Robber II — LeetCode 213](./HouseRobberII.java) — the circular variant
- [Best Time to Buy and Sell Stock III — LeetCode 123](./BestTimeToBuySellStockIII.java) — another take-or-skip DP
- [Climbing Stairs — LeetCode 70](./ClimbingStairs.java) — the same rolling-window trick
