---
title: Target Sum
leetcode: 494
difficulty: Medium
patterns: [Subset-sum DP, Counting DP]
companies: [Amazon, Google, Airbnb, Uber, Pinterest]
frequency: 4
tags: [dynamic-programming, knapsack, arrays]
sampleInput: |
  5
  1 1 1 1 1
  3
sampleOutput: "5"
---

# Target Sum — LeetCode 494

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Subset-sum DP · Counting DP |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Adobe |

## Problem Statement

You are given an integer array `nums` and a target `target`. Assign a `+` or `-` sign to every number so that the signed sum equals `target`. Return the number of different assignments.

- Each number must get exactly one sign
- `0` can carry either sign and still counts as two assignments

## Input Format

The program reads from standard input:

```
n
nums[0] nums[1] ... nums[n-1]
target
```

- `n` — number of values (1 ≤ n ≤ 20)
- `nums` — n space-separated non-negative integers
- `target` — the target sum (−1000 ≤ target ≤ 1000)

## Sample Input

```
5
1 1 1 1 1
3
```

## Expected Output

```
5
```

The total is 5 and the positives must sum to `(5 + 3) / 2 = 4`, i.e. four of the five ones — **5** ways.

## Approach

**Brute force** tries every sign assignment: `2ⁿ` combinations, `O(2ⁿ · n)`.

**The reduction.** Let `P` be the sum of the numbers that get a `+` sign and `total` the sum of all numbers. The signed sum is `P - (total - P) = 2P - total`, so:

> `P = (total + target) / 2`

If `(total + target)` is negative or odd, no assignment exists. Otherwise the problem is exactly "count the subsets with sum `P`".

**The DP.** `dp[s]` = the number of subsets of the numbers processed so far whose sum is `s`.
`dp[0] = 1` (the empty subset). For each value `v` we update **downwards**:
`dp[s] += dp[s - v]` — each number may be used at most once.

**The alternative** is to keep the sign in the state: `dp[s]` = ways to reach signed sum `s`, with `dp[s + v] += dp[s]` and `dp[s - v] += dp[s]`. That needs a table over `[-total, total]`, and it counts `0` twice (once for `+0` and once for `-0`) just like this version does.

## Dry Run

Input: `nums = [1, 1, 1, 1, 1]`, `target = 3`.

`total = 5` → `wanted = 5 + 3 = 8` → `subsetSum = 4`.

| value | sums updated (downwards) | `dp` after the step |
|---:|---|---|
| 1 | 4 … 1 | `[1, 1, 0, 0, 0]` |
| 1 | 4 … 1 | `[1, 2, 1, 0, 0]` |
| 1 | 4 … 1 | `[1, 3, 3, 1, 0]` |
| 1 | 4 … 1 | `[1, 4, 6, 4, 1]` |
| 1 | 4 … 1 | `[1, 5, 10, 10, 5]` |

`dp[4] = 5` → answer **5**.

**Why five?** The subset must contain four of the five ones — `C(5, 4) = 5` choices. The remaining one gets the `-` sign.

**Zero handling.** `nums = [0]`, `target = 0` → `total = 0`, `wanted = 0`, `subsetSum = 0`, and the single zero produces `dp[0] = 2` — the `+0` and the `-0` assignments are counted separately, exactly as LeetCode expects.

**The direct formulation** (no reduction) for the same input:

| step | `dp` over signed sums `-4 … 4` |
|---:|---|
| start | `[0, 0, 0, 0, 0, 0, 0, 0, 0]` (only sum 0 reachable) |
| +1 | sums `±1` reachable once each |
| +1 | sums `0` (2 ways), `±2` (1 way each) |
| +1 | sums `±1` (3 ways), `±3` (1 way) |
| +1 | sums `0` (4), `±2` (3), `±4` (1) |
| +1 | sums `±1` (5), `±3` (4), `±5` (1) |

Sum `3` has 5 ways ✓ — the same answer, a bigger table.

## Java Solution

See [`TargetSum.java`](./TargetSum.java).

```java
    public static int findTargetSumWays(int[] nums, int target) {
        int total = 0;
        for (int value : nums) {
            total += value;
        }
        int wanted = total + target;
        if (wanted < 0 || (wanted & 1) != 0) {
            return 0;
        }
        int subsetSum = wanted / 2;

        int[] dp = new int[subsetSum + 1];
        dp[0] = 1;

        for (int value : nums) {
            for (int sum = subsetSum; sum >= value; sum--) {
                dp[sum] += dp[sum - value];
            }
        }
        return dp[subsetSum];
    }
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n · S) | `n` values, each scanning at most `subsetSum` sums |
| **Space** | O(S) | the `dp` array holds `subsetSum + 1` entries |

**Time `O(n · S)`** where `S = (total + target) / 2`. The brute force `O(2ⁿ)` is fine for `n ≤ 20` and is a good first answer to mention before optimising.

## Interview Notes

**Follow-ups to raise yourself:**

- "Can you solve it with the `O(2ⁿ)` brute force?"* → yes, recurse over "assign `+` or assign `-`".
- "What if the numbers can be negative?"* → the subset-sum reduction still works, but the sum range must be `[min, max]` and the table needs offsetting.
- "How does this compare with Partition Equal Subset Sum?"* → same subset-sum machinery, but that one asks for existence and this one asks for a count.
- "What if you had to return the assignments themselves?"* → backtrack through the DP table.

**Common mistakes:**

- ❌ Forgetting the parity check — `(total + target)` must be even.
- ❌ Iterating the sums upwards (that would count assignments that reuse a number).
- ❌ Dividing by two before adding the target: `P = (total + target) / 2`, not `(total − target) / 2`.

**How to narrate:**

> "Instead of trying all `2ⁿ` sign assignments I rewrite the condition. If the positives sum to `P`, the signed sum is `2P - total`, so `P` has to be `(total + target) / 2`. That turns the problem into counting subsets with a given sum, which is a one-dimensional DP updated downwards — `O(n·S)`."

## Related Problems

- [Partition Equal Subset Sum — LeetCode 416](./PartitionEqualSubsetSum.java) — existence instead of counting
- [Coin Change II — LeetCode 518](./CoinChangeII.java) — the unbounded cousin
