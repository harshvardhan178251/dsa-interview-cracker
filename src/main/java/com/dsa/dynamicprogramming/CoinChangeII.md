---
title: Coin Change II
leetcode: 518
difficulty: Medium
patterns: [Unbounded knapsack, Counting DP]
companies: [Google, Amazon, LinkedIn, Airbnb, Flipkart, Tech Mahindra, Infosys, Canva]
frequency: 4
tags: [dynamic-programming, knapsack, unbounded, combinatorics]
sampleInput: |
  3
  1 2 5
  5
sampleOutput: "4"
---

# Coin Change II — LeetCode 518

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Unbounded knapsack · Counting DP |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Uber |

## Problem Statement

You have an unlimited number of coins of each denomination. Return the number of **different** combinations that sum to `amount`. Two combinations are different when the **multiset of coins** differs — the order of the coins does not matter.

- `coins[i]` — the value of the `i`-th coin
- `amount` — the target sum

## Input Format

The program reads from standard input:

```
n
coins[0] coins[1] ... coins[n-1]
amount
```

- `n` — number of coin denominations (1 ≤ n ≤ 12)
- `coins` — n space-separated positive integers
- `amount` — the target amount (0 ≤ amount ≤ 500)

## Sample Input

```
3
1 2 5
5
```

## Expected Output

```
4
```

The four combinations are `5`, `2+2+1`, `2+1+1+1` and `1+1+1+1+1`. `2+1+2` is the same combination as `2+2+1` — order does not create a new one.

## Approach

The state is again "how much money so far", but the aggregation is **addition** instead of `min`.

1. `dp[a]` = number of combinations that make `a` using the denominations processed so far.
2. `dp[0] = 1` — the empty combination.
3. For each coin `c` (outer loop) and each amount `a ≥ c` (inner loop, **increasing**):
   `dp[a] += dp[a - c]`.

**The loop order is the whole trick.**

- Coin in the outer loop → each combination is counted once, in the order the denominations are listed. `2+1` and `1+2` are the same combination, so we must not let the amount loop re-order the coins.
- Amount in the inner loop, increasing → the same coin may be used again and again (unbounded).

Swap the two loops and you get the *permutation* count instead (ordered sequences) — a classic bug.

## Dry Run

Input: `coins = [1, 2, 5]`, `amount = 5`. The table is filled one coin at a time.

| step | coin | amounts updated | `dp` after the step |
|---:|---:|---|---|
| 0 | — | — | `[1, 0, 0, 0, 0, 0]` |
| 1 | 1 | 1→5 | `[1, 1, 1, 1, 1, 1]` — one way per amount (all ones) |
| 2 | 2 | 2→5 | `[1, 1, 2, 2, 3, 3]` — +1 for every even split |
| 3 | 5 | 5 | `[1, 1, 2, 2, 3, 4]` — +`dp[0]` = +1 |

Full table: `dp = [1, 1, 2, 2, 3, 4]` → answer **4**.

**Cell by cell for coin 2** (`dp[a] += dp[a-2]`, using the values *before* coin 2 was added):

| amount `a` | `dp[a]` before | `dp[a-2]` before | `dp[a]` after |
|---:|---:|---:|---:|
| 2 | 1 | 1 | **2** |
| 3 | 1 | 1 | **2** |
| 4 | 1 | 2 | **3** |
| 5 | 1 | 2 | **3** |

**Swapping the loops changes the answer.** With the amount in the outer loop the same combination would be counted once per ordering (`2+1` and `1+2` both count), which is the permutation problem, not this one.

## Java Solution

See [`CoinChangeII.java`](./CoinChangeII.java).

```java
    public static int change(int amount, int[] coins) {
        int[] dp = new int[amount + 1];
        dp[0] = 1;

        for (int coin : coins) {
            for (int a = coin; a <= amount; a++) {
                dp[a] += dp[a - coin];
            }
        }
        return dp[amount];
    }
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n · amount) | every coin scans the amounts up to `amount` |
| **Space** | O(amount) | the `dp` array holds `amount + 1` entries |

**Space `O(amount)`.** A two-dimensional table (`dp[coin][amount]`) is often easier to explain and has the same asymptotic cost; the one-dimensional version is the rolled-up form of it.

## Interview Notes

**Follow-ups to raise yourself:**

- "How many **ordered** sequences?"* → move the amount loop outside the coin loop; the answer becomes much larger (for `coins = [1,2]`, `amount = 3`: 4 instead of 2).
- "What if each coin can be used at most once?"* → iterate the amounts **downwards** in the inner loop.
- "Can you do it with a 2-D table?"* → yes: `dp[i][a]` = combinations using the first `i` coins; the recurrence is `dp[i][a] = dp[i-1][a] + dp[i][a - coins[i]]`.
- "How does this relate to binomial coefficients?"* → with `coins = [1, 2, …, n]` the answer is the number of partitions of `amount` into at most `n` parts.

**Common mistakes:**

- ❌ Putting the amount loop outside the coin loop — that counts orderings, not combinations.
- ❌ Iterating the amounts downwards in the inner loop — that would make each coin usable only once.
- ❌ Forgetting `dp[0] = 1`; without it every count is `0`.

**How to narrate:**

> "This is Coin Change with addition instead of a minimum. I keep `dp[a]` = the number of combinations that make `a` with the coin types seen so far, and `dp[0] = 1` for the empty combination. The important detail is the loop order: coins outside, amounts inside and increasing. That way each combination is generated in one canonical order, and a coin can still be used repeatedly."

## Related Problems

- [Coin Change — LeetCode 322](./CoinChange.java) — the same table, minimising instead of counting
- [Target Sum — LeetCode 494](./TargetSum.java) — subset-sum counting
- [Number of Partitions](./NumberOfPartitions.java) — the same recurrence seen from the other side
