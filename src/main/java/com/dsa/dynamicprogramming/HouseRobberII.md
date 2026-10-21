---
title: House Robber II
leetcode: 213
difficulty: Medium
patterns: [Circular DP, Divide and conquer]
companies: [Amazon, Google, Facebook, LinkedIn, Cloudflare, Wipro, Capgemini, Zebra]
frequency: 4
tags: [dynamic-programming, arrays, circular]
sampleInput: |
  5
  2 3 2 3 2
sampleOutput: "6"
---

# House Robber II — LeetCode 213

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Circular DP · Divide and conquer |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta |

## Problem Statement

The houses on the street form a **circle**: house `0` and house `n-1` are neighbours. Rob two adjacent houses and the police catch you. Return the maximum money you can rob.

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
5
2 3 2 3 2
```

## Expected Output

```
6
```

Robbing houses 1 and 3 (`3 + 3 = 6`) is legal — they are not adjacent. The best possible total is **6**.

## Approach

The circular constraint only ever couples **house 0** and **house n-1**. Every valid solution must leave one of them empty:

- **Case A — skip the last house:** solve the linear problem on `nums[0 … n-2]`.
- **Case B — skip the first house:** solve the linear problem on `nums[1 … n-1]`.

The answer is `max(A, B)`. Both cases use the linear take-or-skip recurrence `dp[i] = max(dp[i-1], nums[i] + dp[i-2])`.

Taking the two halves separately is what keeps the solution correct — you must **not** just run the linear algorithm on the whole array, because that would happily rob houses 0 and n-1 together.

## Dry Run

Input: `nums = [2, 3, 2, 3, 2]`, `n = 5`.

**Case A — skip house 4, rob from `nums[0 … 3] = [2, 3, 2, 3]`**

| house `i` | `nums[i]` | skip → `dp[i-1]` | rob → `nums[i] + dp[i-2]` | `dp[i]` |
|---:|---:|---:|---:|---:|
| 0 | 2 | 0 | 2 + 0 = 2 | **2** |
| 1 | 3 | 2 | 3 + 0 = 3 | **3** |
| 2 | 2 | 3 | 2 + 2 = 4 | **4** |
| 3 | 3 | 4 | 3 + 3 = 6 | **6** |

**Case B — skip house 0, rob from `nums[1 … 4] = [3, 2, 3, 2]`**

| house `i` | `nums[i]` | skip → `dp[i-1]` | rob → `nums[i] + dp[i-2]` | `dp[i]` |
|---:|---:|---:|---:|---:|
| 1 | 3 | 0 | 3 + 0 = 3 | **3** |
| 2 | 2 | 3 | 2 + 0 = 2 | **3** |
| 3 | 3 | 3 | 3 + 3 = 6 | **6** |
| 4 | 2 | 6 | 2 + 3 = 5 | **6** |

`max(6, 6) = 6` → answer **6**.

**Why two cases and not one.** Any legal solution must skip house 0 or skip house 4, so the two cases cover every legal solution — and each case is a plain linear run.

**Edge cases.** `n == 1` → rob the only house. `n == 2` → rob the richer one (each case degenerates to a single house).

## Java Solution

See [`HouseRobberII.java`](./HouseRobberII.java).

```java
    public static int rob(int[] nums) {
        int n = nums.length;
        if (n == 0) {
            return 0;
        }
        if (n == 1) {
            return nums[0];
        }
        int skipLast = robRange(nums, 0, n - 2);
        int skipFirst = robRange(nums, 1, n - 1);
        return Math.max(skipLast, skipFirst);
    }
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n) | two linear passes, `O(n)` each |
| **Space** | O(1) | the rolling variables of the linear helper |

**Space `O(1)`.** A tabulated version of the linear helper would use `O(n)`.

## Interview Notes

**Follow-ups to raise yourself:**

- "What if the street is a circle of unknown size and you only know the values?"* → same idea, you still need the index of the first house.
- "What if you can rob at most `k` houses in a row on a circle?"* → the two-case trick still applies, the inner DP gains a "how many consecutive houses" dimension.
- "Can this be done in one pass?"* → yes, but you need to remember the value of `dp[n-1]` computed without the last house while the real pass also includes it — two runs are simpler to explain.

**Common mistakes:**

- ❌ Running the linear algorithm over the whole array and taking `dp[n-1]` — that robs house 0 and house n-1 together.
- ❌ Forgetting the `n == 1` case, which makes `robRange(nums, 1, 0)` return `0` and hides the answer.
- ❌ Taking `min` instead of `max` of the two cases.

**How to narrate:**

> "The circle only couples the first and the last house, so one of them has to be skipped. I run the linear take-or-skip DP twice — once on houses 0 to n-2 and once on houses 1 to n-1 — and take the better result. Each run is `O(n)` time and `O(1)` space."

## Related Problems

- [House Robber — LeetCode 198](./HouseRobber.java) — the linear version
- [Best Time to Buy and Sell Stock III — LeetCode 123](./BestTimeToBuySellStockIII.java) — state-compression DP
