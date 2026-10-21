---
title: Partition Equal Subset Sum
leetcode: 416
difficulty: Medium
patterns: [Subset-sum DP, 0/1 knapsack]
companies: [Amazon, Google, Meta, Microsoft]
frequency: 4
tags: [dynamic-programming, knapsack, arrays]
sampleInput: |
  4
  1 5 11 5
sampleOutput: "1"
---

# Partition Equal Subset Sum — LeetCode 416

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Subset-sum DP · 0/1 knapsack |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Microsoft |

## Problem Statement

Given a non-empty array `nums` of positive integers, return `true` if it is possible to split the array into two subsets such that the two subsets have the **same sum**.

The two subsets must together use every element exactly once.

## Input Format

The program reads from standard input:

```
n
nums[0] nums[1] ... nums[n-1]
```

- `n` — number of values (1 ≤ n ≤ 100)
- `nums` — n space-separated non-negative integers

## Sample Input

```
4
1 5 11 5
```

## Expected Output

```
1
```

Total = 22, half = 11. The subset `{11}` already sums to 11, so the split exists → **1**.

## Approach

The reduction is the whole trick:

> A partition into two equal halves exists **iff** some subset sums to exactly `total / 2`.

1. Compute `total`. If it is odd the answer is immediately `false`.
2. Let `target = total / 2`.
3. Subset-sum DP: `reachable[s]` = "some subset of the values processed so far sums to `s`".
   `reachable[0] = true` (the empty subset).
4. For every value `v`, update **downwards**:
   `reachable[s] |= reachable[s - v]` for `s = target … v`.
5. The answer is `reachable[target]`.

**Why downwards?** Each value may be used at most once. Iterating upwards would let the same value be used again inside one pass (that is the *unbounded* variant, and it gives the wrong answer here).

## Dry Run

Input: `nums = [1, 5, 11, 5]`, `total = 22`, `target = 11`.

| value | sums updated (downwards) | reachable sums ≤ 11 after the step |
|---:|---|---|
| 1 | 11 … 1 | `{0, 1}` |
| 5 | 11 … 5 | `{0, 1, 5, 6}` |
| 11 | 11 | `{0, 1, 5, 6, 11}` |
| 5 | 11 … 5 | `{0, 1, 5, 6, 10, 11}` |

`reachable[11] = true` → answer **true** (subset `{11}`, the rest sums to `1 + 5 + 5 = 11`).

**The last value in detail** (value `5`, target `11`) — the loop runs downwards, so `reachable[5]` still holds the *old* value when it is read:

| sum | old `reachable[sum]` | `reachable[sum-5]` (old) | new `reachable[sum]` |
|---:|---:|---:|---:|
| 11 | false | `reachable[6]` = true | **true** |
| 10 | false | `reachable[5]` = true | **true** |
| 6 | true | `reachable[1]` = true | true |
| 5 | true | `reachable[0]` = true | true |

**Odd total.** `nums = [1, 2, 5]` has total 8 → target 4 → `reachable[4]` is false → answer `false`. `nums = [1, 2]` has total 3 (odd) → immediately `false`.

## Java Solution

See [`PartitionEqualSubsetSum.java`](./PartitionEqualSubsetSum.java).

```java
    public static boolean canPartition(int[] nums) {
        if (nums.length == 0) {
            return false; // there is nothing to partition
        }
        int total = 0;
        for (int value : nums) {
            total += value;
        }
        if ((total & 1) != 0) {
            return false;
        }
        int target = total / 2;

        boolean[] reachable = new boolean[target + 1];
        reachable[0] = true;

        for (int value : nums) {
            for (int sum = target; sum >= value; sum--) {
                reachable[sum] = reachable[sum] || reachable[sum - value];
            }
        }
        return reachable[target];
    }
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n · S) | `n` values, each scanning at most `target` sums |
| **Space** | O(S) | the `reachable` array holds `target + 1` booleans |

**Time `O(n · S)`** where `S = total / 2`. If `S` is huge (values up to `10⁴` and `n` up to 100, `S` can reach `5 · 10⁵`) the table is still fine; beyond that people switch to a bitset or a meet-in-the-middle search.

## Interview Notes

**Follow-ups to raise yourself:**

- "What if I need the two subsets themselves?"* → keep a `parent[s]` array remembering which value created each reachable sum.
- "Why downwards?"* → so that each value is used at most once; upwards would be the unbounded variant.
- "How does this relate to Target Sum?"* → Target Sum is the same subset-sum machinery with a sign trick; see [Target Sum](./TargetSum.java).
- "Can it be `O(n · S / 64)`?"* → yes, pack the reachable flags into a `long[]` bitset.

**Common mistakes:**

- ❌ Iterating the sums upwards — that allows a value to be used twice and returns wrong answers.
- ❌ Forgetting the odd-total early exit (harmless, but you then scan the table for nothing).
- ❌ Using `reachable[sum - value]` after you have already overwritten it in this pass.

**How to narrate:**

> "An equal partition exists exactly when some subset sums to half of the total. So I run a 0/1 subset-sum DP: `reachable[s]` is true when a subset sums to `s`. I update the sums **downwards** so that each value is used at most once, and I answer with `reachable[total/2]`. An odd total can never be split, so that case returns immediately."

## Related Problems

- [Target Sum — LeetCode 494](./TargetSum.java) — the same subset-sum DP, counting assignments
- [Coin Change II — LeetCode 518](./CoinChangeII.java) — the unbounded cousin
