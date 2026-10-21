---
title: Best Time to Buy and Sell Stock II
leetcode: 122
difficulty: Medium
patterns: [Greedy, Running difference]
companies: [Amazon, Salesforce, Bloomberg]
frequency: 3
tags: [array, greedy, stock]
sampleInput: |
  7
  7 1 5 3 6 4
sampleOutput: "7"
---

# Best Time to Buy and Sell Stock II — LeetCode 122

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Greedy · Running difference |
| **Interview heat** | ★★★☆☆ |
| **Asked at** | Amazon, Google, Meta, Uber |

## Problem Statement

You are given an array `prices` where `prices[i]` is the price of a stock on day `i`.

- You may buy and sell as **often as you like**.
- You may hold **at most one** share at a time.
- Return the **maximum total profit**.

## Input Format

```
n
prices[0] prices[1] ... prices[n-1]
```

- `n` — number of days (1 ≤ n ≤ 10⁵)
- `prices` — n space-separated integers, oldest first

## Sample Input

```
7
7 1 5 3 6 4
```

## Expected Output

```
7
```

Buy at `1` → sell at `5` (profit 4), buy at `3` → sell at `6` (profit 3). Total = **7**.

## Approach — Sum the Positive Differences

The tempting mistake is to look for valleys and peaks. There is a much simpler way.

**Key insight:** because you may sell and re-buy on the same day for free, any single
rise from day `i-1` to day `i` can be captured on its own. A "buy at 1, sell at 6" trade
decomposes into buying at 1 and re-buying at 5 on the way up, which is exactly the same
profit.

So the answer is the sum of every **positive** day-to-day difference:

```
profit = Σ max(0, prices[i] - prices[i-1])
```

**Why it works (upper bound):** no strategy can earn more than the total upward movement
of the price, because that upward movement is exactly what a share gains while you hold
it. **Why it is achievable:** hold the share through every rising stretch and flatten out
during the falling ones — which is precisely what the sum of positive differences buys.

## Dry Run

Input: `prices = [7, 1, 5, 3, 6, 4]`

| Step | i | `prices[i-1]` | `prices[i]` | difference | `profit` before | taken? | `profit` after |
|---:|---:|---:|---:|---:|---:|---|---:|
| 1 | 1 | 7 | 1 | −6 | 0 | no (not positive) | 0 |
| 2 | 2 | 1 | 5 | +4 | 0 | **yes** | 4 |
| 3 | 3 | 5 | 3 | −2 | 4 | no | 4 |
| 4 | 4 | 3 | 6 | +3 | 4 | **yes** | 7 |
| 5 | 5 | 6 | 4 | −2 | 7 | no | 7 |

Answer: **7**

## Java Solution

See [`BestTimeToBuyAndSellStockII.java`](./BestTimeToBuyAndSellStockII.java).

```java
public static int maxProfit(int[] prices) {
    int profit = 0;
    for (int i = 1; i < prices.length; i++) {
        if (prices[i] > prices[i - 1]) {
            profit += prices[i] - prices[i - 1];
        }
    }
    return profit;
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n) | One pass |
| **Space** | O(1) | A single accumulator |

**Optimal?** Yes — O(n) time, O(1) space.

## Interview Notes

**Follow-ups to raise yourself:**
- *"What if there is a transaction fee `f`?"* → only take a rise when it exceeds `f`:
  `if (prices[i] - prices[i-1] > f) profit += prices[i] - prices[i-1] - f;`
- *"What if you can only hold at most `k` shares?"* → the answer becomes the `k` best
  non-overlapping rises; a heap or a DP over `k` handles it.
- *"How does this relate to the maximum subarray of the difference array?"* → the total
  upward movement is the sum of the positive entries of the difference array, i.e. the
  *maximum* subarray problem applied to `max(0, diff)`.
- *"Can I compute it in one pass without materialising the differences?"* → yes, that is
  exactly the code above.

**Common mistakes:**
- ❌ Trying to find local minima/maxima and pairing them up — it works but is longer and
  easier to get wrong on plateaus.
- ❌ Forgetting to start the loop at `i = 1` (there is no previous day for `i = 0`).
- ❌ Assuming you must sell before the next buy — here that is allowed, which is the whole
  reason the simple solution works.

**How to narrate:**
> "Because I can sell and re-buy on the same day at no cost, every upward move can be
> captured independently. So the maximum profit is the sum of all positive day-to-day
> differences. That's a single pass with O(1) space, and it also generalises nicely to
> transaction fees."

## Related Problems

- [Best Time to Buy and Sell Stock](BestTimeToBuyAndSellStock.md) — the single-transaction variant
- [Maximum Subarray](MaxSubarray.md) — Kadane over a difference array
- [Maximum Circular Subarray](MaxCircularSubarray.md) — the circular variant of Kadane
