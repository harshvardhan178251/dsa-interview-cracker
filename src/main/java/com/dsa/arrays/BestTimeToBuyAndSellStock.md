---
title: Best Time to Buy and Sell Stock
leetcode: 121
difficulty: Easy
patterns: [Greedy, One-pass minimum tracking]
companies: [Amazon, Google, Meta, Uber, Bloomberg]
frequency: 4
tags: [array, greedy, stock]
sampleInput: |
  6
  7 1 5 3 6 4
sampleOutput: "5"
---

# Best Time to Buy and Sell Stock — LeetCode 121

| | |
|---|---|
| **Difficulty** | Easy |
| **Pattern** | Greedy · One-pass minimum tracking |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Uber, Bloomberg |

## Problem Statement

You are given an array `prices` where `prices[i]` is the price of a given stock on day `i`.

- You may **buy** on one day and **sell** on a later day.
- You may hold **at most one** share at a time.
- Return the **maximum profit** you can achieve.
- If no profitable transaction exists, return `0`.

## Input Format

```
n
prices[0] prices[1] ... prices[n-1]
```

- `n` — number of days (1 ≤ n ≤ 10⁵)
- `prices` — n space-separated integers, oldest first

## Sample Input

```
6
7 1 5 3 6 4
```

## Expected Output

```
5
```

Buy on day 1 at `1`, sell on day 4 at `6` → profit `5`.

## Approach — Running Minimum

The naive approach is to try every buy/sell pair: **O(n²)**. The key observation is that
for a fixed sell day, the best buy day is simply the **cheapest day before it**. So we
never need to look backwards.

Walk the array once, keeping two numbers:

- `minPrice` — the cheapest price seen so far
- `best` — the best profit found so far

At each day:

1. If `price < minPrice`, this day is the new cheapest → update `minPrice`.
2. Otherwise the profit from selling today is `price - minPrice` → update `best` if it
   beats what we have.

The buy day never has to be stored: `minPrice` always refers to *some* earlier day, and
that is all the profit calculation needs.

**Why it works:** for any sell day `j`, the best possible profit is
`prices[j] - min(prices[0..j-1])`. The loop computes exactly that value for every `j`,
so `best` is the maximum over all sell days — which is the maximum over all valid
transactions.

## Dry Run

Input: `prices = [7, 1, 5, 3, 6, 4]`

| Step | i | `price` | `minPrice` before | `best` before | `minPrice` after | `best` after | note |
|---:|---:|---:|---:|---:|---:|---:|---|
| 1 | 0 | 7 | ∞ | 0 | 7 | 0 | day 0 is the cheapest so far |
| 2 | 1 | 1 | 7 | 0 | 1 | 0 | new minimum — no profit yet |
| 3 | 2 | 5 | 1 | 0 | 1 | 4 | sell today: 5 − 1 = 4 |
| 4 | 3 | 3 | 1 | 4 | 1 | 4 | 3 − 1 = 2 < 4, keep 4 |
| 5 | 4 | 6 | 1 | 4 | 1 | 5 | sell today: 6 − 1 = 5 ✔ best |
| 6 | 5 | 4 | 1 | 5 | 1 | 5 | 4 − 1 = 3 < 5, keep 5 |

Answer: **5**

## Java Solution

See [`BestTimeToBuyAndSellStock.java`](./BestTimeToBuyAndSellStock.java).

```java
public static int maxProfit(int[] prices) {
    int minPrice = Integer.MAX_VALUE;
    int best = 0;
    for (int price : prices) {
        if (price < minPrice) {
            minPrice = price;
        } else if (price - minPrice > best) {
            best = price - minPrice;
        }
    }
    return best;
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n) | One pass, constant work per day |
| **Space** | O(1) | Two scalars, no extra arrays |

**Optimal?** Yes — every element must be looked at at least once, so O(n) is a lower bound.

## Interview Notes

**Follow-ups to raise yourself:**
- *"What if I can hold multiple shares?"* → the unlimited-transaction variant; see
  [Best Time to Buy and Sell Stock II](BestTimeToBuyAndSellStockII.md).
- *"What if transactions have a fee?"* → subtract the fee from every transaction; the
  same running-minimum idea still works.
- *"What if I must hold exactly one share for the whole period?"* → that is just
  `prices[n-1] - prices[0]`.
- *"Can this work on a stream of prices?"* → yes, the state is only `minPrice` and
  `best`, so it is O(1) memory and single-pass by construction.

**Common mistakes:**
- ❌ Forgetting that the **buy day must be strictly earlier** than the sell day — updating
  `minPrice` *after* computing the profit would allow buying and selling on the same day.
- ❌ Returning a negative number when prices only fall — the answer must be `0`.
- ❌ Using `Integer.MIN_VALUE` for `minPrice` and then subtracting from it (overflow) —
  seed it with `Integer.MAX_VALUE` or with `prices[0]`.

**How to narrate:**
> "For a fixed sell day, the best buy day is the cheapest day before it. So instead of
> trying all pairs, I scan once and keep the running minimum price. At each day I
> compute what selling today would earn, and I keep the max of those. That's O(n) time
> and O(1) space, and it naturally returns 0 when prices only fall."

## Related Problems

- [Best Time to Buy and Sell Stock II](BestTimeToBuyAndSellStockII.md) — unlimited transactions
- [Maximum Subarray](MaxSubarray.md) — the same "running best" shape over sums
- [Contains Duplicate II](ContainsDuplicateII.md) — a distance-limited scan
