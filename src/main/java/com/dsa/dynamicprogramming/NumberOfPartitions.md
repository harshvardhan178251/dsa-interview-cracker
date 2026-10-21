---
title: Number of Partitions
leetcode: null
difficulty: Medium
patterns: [Counting DP, Unbounded knapsack]
companies: [Amazon, JP Morgan]
frequency: 3
tags: [dynamic-programming, combinatorics, knapsack]
sampleInput: |
  5
sampleOutput: "7"
---

# Number of Partitions

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Counting DP · Unbounded knapsack |
| **Interview heat** | ★★★☆☆ |
| **Asked at** | Amazon, Google, Microsoft |

## Problem Statement

Count the **partitions** of `n`: the ways to write `n` as a sum of positive integers where

- the order of the parts does not matter (`4+1` and `1+4` are the same partition), and
- a part size may be used as often as you like (`3+1+1` is allowed).

The single part `n` itself counts as a partition.

## Input Format

The program reads from standard input:

```
n
```

- `n` — the number to partition (1 ≤ n ≤ 200)

## Sample Input

```
5
```

## Expected Output

```
7
```

The seven partitions of 5 are `5`, `4+1`, `3+2`, `3+1+1`, `2+2+1`, `2+1+1+1` and `1+1+1+1+1` → **7**.

## Approach

A partition is completely described by **how many times each part size occurs**, so the DP iterates over the part sizes:

1. `dp[sum]` = the number of partitions of `sum` that use only the part sizes processed so far.
2. `dp[0] = 1` — the empty partition.
3. For each part size `part` (outer loop) and each sum `≥ part` (inner loop, increasing):
   `dp[sum] += dp[sum - part]` — every partition of `sum - part` becomes a partition of `sum` by    adding one more `part`.
4. The answer is `dp[n]`.

**The loop order is the whole point.** Because the part sizes are processed in order, a partition like `3+1+1` is generated exactly once — as `1+1` extended by `3` — and never again in a different order. This is the same "coin in the outer loop" rule as [Coin Change II](./CoinChangeII.java).

The first values are `p(0) = 1, p(1) = 1, p(2) = 2, p(3) = 3, p(4) = 5, p(5) = 7, …` — the **partition function**, which grows like `e^(π√(2n/3))`.

## Dry Run

Input: `n = 5`. One row per part size.

| part size | sums updated | `dp` after the step |
|---:|---|---|
| — | — | `[1, 0, 0, 0, 0, 0]` |
| 1 | 1 … 5 | `[1, 1, 1, 1, 1, 1]` |
| 2 | 2 … 5 | `[1, 1, 2, 2, 3, 3]` |
| 3 | 3 … 5 | `[1, 1, 2, 3, 4, 5]` |
| 4 | 4 … 5 | `[1, 1, 2, 3, 5, 6]` |
| 5 | 5 | `[1, 1, 2, 3, 5, 7]` |

`dp[5] = 7` → answer **7**.

**The seven partitions of 5** — one per row of the last column:

| partition | how the DP builds it |
|---|---|
| `5` | part size 5 on top of `0` |
| `4+1` | part size 4 on top of the partition `1` |
| `3+2` | part size 3 on top of the partition `2` |
| `3+1+1` | part size 3 on top of `1+1` |
| `2+2+1` | part size 2 on top of `2+1` |
| `2+1+1+1` | part size 2 on top of `1+1+1` |
| `1+1+1+1+1` | part size 1 on top of `1+1+1+1` |

**Why `p(5) = 7` and not 8** — `1+4` and `4+1` are the same partition, and the loop order generates it only once (as `1` extended by `4`).

## Java Solution

See [`NumberOfPartitions.java`](./NumberOfPartitions.java).

```java
    public static long countPartitions(int n) {
        long[] dp = new long[n + 1];
        dp[0] = 1;

        for (int part = 1; part <= n; part++) {
            for (int sum = part; sum <= n; sum++) {
                dp[sum] += dp[sum - part];
            }
        }
        return dp[n];
    }
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n²) | `n` part sizes, each scanning at most `n` sums |
| **Space** | O(n) | the `dp` array holds `n + 1` entries |

**Space `O(n)`.** A two-dimensional table `dp[part][sum]` is the same computation with `O(n²)` space; the one-dimensional version is its rolled-up form.

## Interview Notes

**Follow-ups to raise yourself:**

- "What if every part must be **distinct**?"* → iterate the sums **downwards** in the inner loop (that is the 0/1 variant).
- "What if the order matters?"* → that is the composition count, `2^(n-1)` for positive parts.
- "Can you list the partitions?"* → backtrack through the table.
- "How fast does the answer grow?"* → like `e^(π√(2n/3))`, so `p(200)` is already astronomically large — hence `long`.

**Common mistakes:**

- ❌ Iterating the sums downwards — that would count partitions with distinct parts only.
- ❌ Swapping the two loops — the partitions would be counted once per ordering.
- ❌ Forgetting `dp[0] = 1`, the empty partition.

**How to narrate:**

> "A partition is determined by how often each part size occurs, so I iterate over the part sizes. `dp[sum]` counts the partitions of `sum` that use the part sizes seen so far, and for every part size I add `dp[sum - part]` to `dp[sum]`. Because the part size is the outer loop, every partition is generated in exactly one canonical order — `O(n²)` time, `O(n)` space."

## Related Problems

- [Coin Change II — LeetCode 518](./CoinChangeII.java) — the same recurrence with a coin list
- [Catalan Number — LeetCode 96](./CatalanNumber.java) — another counting DP
