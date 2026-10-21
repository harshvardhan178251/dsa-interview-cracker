---
title: Coin Change with Greedy
leetcode: null
difficulty: Medium
patterns: [Greedy, Largest denomination first]
companies: [Google, Microsoft, HCLTech]
frequency: 3
tags: [math, greedy, sorting]
sampleInput: |
  63
  4
  1 5 10 25
sampleOutput: "6"
---

# Coin Change with Greedy

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Greedy · Largest denomination first |
| **Interview heat** | ★★★☆☆ |
| **Asked at** | Amazon, Google, Meta, Uber |

## Problem Statement

Given an `amount` and a set of coin denominations, return the number of coins the
**greedy strategy** uses to make up that amount: always take as many coins as possible
of the largest denomination that still fits.

- Return `-1` when the amount cannot be made up.
- The greedy strategy is optimal for a **canonical** coin system such as `1, 5, 10, 25`
  (every denomination is a multiple of the one below it). For an arbitrary coin set
  the greedy answer can be larger than the true minimum — see *Interview Notes*.

## Input Format

The program reads from standard input:

```
amount
k
coins[0] coins[1] ... coins[k-1]
```

- `amount` — the amount to make up (0 ≤ amount ≤ 10⁹)
- `k` — number of denominations (1 ≤ k ≤ 100)
- `coins` — k space-separated positive denominations

## Sample Input

```
63
4
1 5 10 25
```

## Expected Output

```
6
```

`25 + 25 + 10 + 1 + 1 + 1 = 63` — six coins, which is also the true optimum.

## Approach — take the biggest coin that fits

Sort the denominations in descending order. For each denomination `c`:

- take `amount / c` coins of it (as many as still fit),
- shrink the remaining amount by `take * c`,
- move on to the next denomination.

When the remaining amount reaches `0` the job is done; if it is still positive after
the smallest denomination, the amount cannot be made up.

**Exchange argument (why the greedy choice is safe on a canonical system):** on a
canonical system, replacing `k` coins of a smaller denomination by one coin of the
next larger denomination never increases the number of coins and never changes the
total value — that is exactly what "canonical" means. Any solution that uses a
smaller coin where a larger one fits can therefore be rewritten without using more
coins, so a solution that always takes the largest possible coin is optimal.

**The counter-example to remember:** for the coin set `{1, 3, 4}` and amount `6` the
greedy takes `4 + 1 + 1` (3 coins) while the optimum is `3 + 3` (2 coins). The greedy
is only correct when the denominations are canonical — for a general system use the
dynamic program of [Coin Change](../dynamicprogramming/CoinChange.java).

## Dry Run

Input: `amount = 63`, coins `1, 5, 10, 25` (sorted descending: `25, 10, 5, 1`)

| Step | coin | remaining before | `remaining / coin` | coins taken | remaining after | coins used |
|---:|---:|---:|---:|---:|---:|---:|
| 1 | 25 | 63 | `63 / 25 = 2` | 2 | `63 - 50 = 13` | 2 |
| 2 | 10 | 13 | `13 / 10 = 1` | 1 | `13 - 10 = 3` | 3 |
| 3 | 5 | 3 | `3 / 5 = 0` | 0 | 3 | 3 |
| 4 | 1 | 3 | `3 / 1 = 3` | 3 | `3 - 3 = 0` | 6 |

The remaining amount is `0` → the answer is **6**.

### Trace where it is impossible — `amount = 7`, coins `2, 4`

| Step | coin | remaining before | taken | remaining after |
|---:|---:|---:|---:|---:|
| 1 | 4 | 7 | `7 / 4 = 1` | 3 |
| 2 | 2 | 3 | `3 / 2 = 1` | 1 |

The remaining amount is `1` and no coin of value `1` exists → the answer is **-1**.

## Java Solution

See [`GreedyCoinChange.java`](./GreedyCoinChange.java).

```java
public static int minCoins(int amount, int[] coins) {
    if (amount <= 0) {
        return 0;
    }
    int[] sorted = coins.clone();
    Arrays.sort(sorted);

    int used = 0;
    int remaining = amount;
    for (int i = sorted.length - 1; i >= 0 && remaining > 0; i--) {
        int coin = sorted[i];
        if (coin <= 0) {
            continue;
        }
        int take = remaining / coin;
        if (take > 0) {
            used += take;
            remaining -= take * coin;
        }
    }
    return remaining == 0 ? used : -1;
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(k log k) | one sort plus one linear pass |
| **Space** | O(k) | a copy of the denominations, sorted |

## Interview Notes

**Follow-ups to raise yourself:**
- *"What if the coin system is not canonical?"* → the greedy can be wrong; use the
  O(amount × k) dynamic program. Say this out loud — it is the whole point of the
  question.
- *"What if you have a limited number of each coin?"* → the greedy breaks immediately
  (take `amount / c` is no longer valid); it becomes a bounded knapsack.
- *"How do you check whether a system is canonical?"* → try small amounts and compare
  the greedy result with the DP result; there is no cheap closed form.

**Common mistakes:**
- ❌ Claiming the greedy is always optimal — it is only optimal for canonical systems.
- ❌ Returning the number of coins for a system where the amount cannot be made up
  instead of `-1`.
- ❌ Forgetting that a denomination of `0` would cause an infinite loop — the code
  skips non-positive coins.

**How to narrate:**
> "I'll sort the denominations and always take as many as possible of the largest one
> that fits. This is optimal on a canonical system like `1, 5, 10, 25`, because a
> group of smaller coins can always be swapped for one larger coin without increasing
> the coin count. I should mention that for a non-canonical system like `1, 3, 4` the
> greedy is not optimal and a DP would be required."

## Related Problems

- [Coin Change](../dynamicprogramming/CoinChange.java) — the DP that works for every system
- [Minimum Number of Refueling Stops](./MinimumNumberOfRefuelingStops.md) — the other "largest value first" greedy
