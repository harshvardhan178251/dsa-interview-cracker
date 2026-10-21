---
title: Coin Change
leetcode: 322
difficulty: Medium
patterns: [Unbounded knapsack, Bottom-up DP]
companies: [Amazon, Google, Meta, Uber, Bloomberg]
frequency: 5
tags: [dynamic-programming, knapsack, unbounded]
sampleInput: |
  3
  1 2 5
  11
sampleOutput: "3"
---

# Coin Change — LeetCode 322

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Unbounded knapsack · Bottom-up DP |
| **Interview heat** | ★★★★★ |
| **Asked at** | Amazon, Google, Meta, Uber, Bloomberg |

## Problem Statement

You have an unlimited number of each coin denomination. Return the **fewest** coins needed to make up `amount`. If it cannot be made, return `-1`.

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
- `coins` — n space-separated positive integers (`coin[i] == 1` always exists)
- `amount` — the target amount (1 ≤ amount ≤ 10⁴)

## Sample Input

```
3
1 2 5
11
```

## Expected Output

```
3
```

`5 + 5 + 1 = 11` uses only three coins, and no two-coin sum reaches 11.

## Approach

This is the **unbounded knapsack** (min-coins) problem. The greedy choice "always take the biggest coin that fits" is wrong: for `coins = [1, 3, 4]` and `amount = 6` greedy takes `4 + 1 + 1` (three coins) while the optimum is `3 + 3` (two coins).

The DP state is the amount:

1. `dp[a]` = the minimum number of coins needed to make exactly `a`.
2. `dp[0] = 0`; everything else starts at "unreachable" (`Integer.MAX_VALUE`).
3. For each amount `a` and each coin `c ≤ a`, use `c` as the **last** coin:
   `dp[a] = min(dp[a], dp[a - c] + 1)`.
4. If `dp[amount]` is still unreachable, return `-1`.

Because the coin list is processed for every amount (not the other way round), the same denomination may be used any number of times — that is what makes it *unbounded*.

## Dry Run

Input: `coins = [1, 2, 5]`, `amount = 11`. The table has one cell per amount.

| amount `a` | `dp[a-1]` (coin 1) | `dp[a-2]` (coin 2) | `dp[a-5]` (coin 5) | `dp[a]` | winning coin |
|---:|---:|---:|---:|---:|---|
| 0 | — | — | — | **0** | base case |
| 1 | 0 + 1 = 1 | — | — | **1** | 1 |
| 2 | 1 + 1 = 2 | 0 + 1 = 1 | — | **1** | 2 |
| 3 | 1 + 1 = 2 | 1 + 1 = 2 | — | **2** | 1 or 2 |
| 4 | 2 + 1 = 3 | 2 + 1 = 3 | — | **2** | 2 |
| 5 | 2 + 1 = 3 | 2 + 1 = 3 | 0 + 1 = 1 | **1** | 5 |
| 6 | 1 + 1 = 2 | 2 + 1 = 3 | 1 + 1 = 2 | **2** | 1 or 5 |
| 7 | 2 + 1 = 3 | 1 + 1 = 2 | 2 + 1 = 3 | **2** | 2 |
| 8 | 2 + 1 = 3 | 2 + 1 = 3 | 1 + 1 = 2 | **3** | 5 |
| 9 | 3 + 1 = 4 | 2 + 1 = 3 | 2 + 1 = 3 | **3** | 2 or 5 |
| 10 | 3 + 1 = 4 | 3 + 1 = 4 | 1 + 1 = 2 | **2** | 5 |
| 11 | 2 + 1 = 3 | 3 + 1 = 4 | 2 + 1 = 3 | **3** | 1 |

Full table: `dp = [0, 1, 1, 2, 2, 1, 2, 2, 3, 3, 2, 3]` → answer **3**.

**Greedy is not optimal.** With `coins = [1, 3, 4]` and `amount = 6`, greedy takes `4 + 1 + 1` = three coins, while the DP finds `3 + 3` = two coins. The DP is the only safe answer.

**The `-1` case.** If no coin divides the amount — e.g. `coins = [3]`, `amount = 7` — every `dp[a]` stays at `Integer.MAX_VALUE` and the method returns `-1`.

## Java Solution

See [`CoinChange.java`](./CoinChange.java).

```java
    public static int coinChange(int[] coins, int amount) {
        int[] dp = new int[amount + 1];
        Arrays.fill(dp, Integer.MAX_VALUE);
        dp[0] = 0;

        for (int a = 1; a <= amount; a++) {
            for (int coin : coins) {
                if (coin <= a && dp[a - coin] != Integer.MAX_VALUE) {
                    dp[a] = Math.min(dp[a], dp[a - coin] + 1);
                }
            }
        }
        return dp[amount] == Integer.MAX_VALUE ? -1 : dp[amount];
    }
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n · amount) | `amount + 1` states, each trying every coin |
| **Space** | O(amount) | the `dp` array holds `amount + 1` entries |

**Space can be `O(amount)`** — that is what we use. There is no simple `O(1)` version because the amounts are visited out of order.

## Interview Notes

**Follow-ups to raise yourself:**

- "How many **ways** are there to make the amount?"* → that is [Coin Change II — LeetCode 518](./CoinChangeII.java), same table, different aggregation (sum instead of min).
- "What if each coin can be used only once?"* → 0/1 knapsack: iterate the coins in the outer loop.
- "Reconstruct the coins used."* → keep a `choice[a]` array remembering which coin won the `min`.
- "Why is greedy wrong?"* → the `[1, 3, 4]` / `6` counter-example.

**Common mistakes:**

- ❌ Using `Integer.MAX_VALUE` without the `dp[a - coin] != Integer.MAX_VALUE` guard — the addition overflows into a negative number.
- ❌ Looping over the coins in the outer loop and the amounts in the inner loop with the *same* formula — that silently turns the problem into the 0/1 variant.
- ❌ Forgetting `dp[0] = 0`, which makes every other entry unreachable.

**How to narrate:**

> "Greedy is wrong here — taking the largest coin first can cost extra coins. I define `dp[a]` as the minimum number of coins to make `a`. Every solution ends with some coin `c`, so I try each coin as the last one: `dp[a] = min(dp[a], dp[a-c] + 1)`. Amounts are computed in increasing order, so `dp[a-c]` is always ready, and the coin list is scanned inside the amount loop, which is what allows unlimited copies."

## Related Problems

- [Coin Change II — LeetCode 518](./CoinChangeII.java) — count the ways instead of minimising
- [Target Sum — LeetCode 494](./TargetSum.java) — the subset-sum cousin
- [Rod Cutting](./RodCutting.java) — unbounded knapsack with values
