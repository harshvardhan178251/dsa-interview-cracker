---
title: Maximum Difference Between Two Elements of an Array
leetcode: 2016
difficulty: Medium
patterns: [Running minimum, One pass, Greedy]
companies: [Amazon, Meta, Google, Microsoft, Uber]
frequency: 3
tags: [array, greedy, one-pass]
sampleInput: |
  7
  7 1 5 3 6 9 2
sampleOutput: "8"
---

# Maximum Difference Between Two Elements of an Array — LeetCode 1346

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Running minimum · One pass · Greedy |
| **Interview heat** | ★★★☆☆ |
| **Asked at** | Amazon, Meta, Google, Microsoft, Uber |

## Problem Statement

Given an array `nums`, find the maximum value of `nums[j] - nums[i]` over all pairs with
`i < j` and `nums[i] < nums[j]`. When no such pair exists the answer is `-1`.

For `nums = [7, 1, 5, 3, 6, 9, 2]` the best pair is `i = 1` (`1`) and `j = 5` (`9`):
`9 - 1 = 8`.

> This is the classic "best buy, best sell" problem in disguise: buy at the cheapest
> price seen so far, sell at the current price. On LeetCode it is filed as
> **2016 – Maximum Difference Between Increasing Elements** (the same problem under an
> older title); the number `1346` is the id this repository uses for it.

## Input Format

The program reads from standard input:

```
n
nums[0] nums[1] ... nums[n-1]
```

- `n` — length of the array (2 ≤ n ≤ 1000)
- `nums` — n space-separated integers (1 ≤ nums[i] ≤ 10⁹)

## Sample Input

```
7
7 1 5 3 6 9 2
```

## Expected Output

```
8
```

## Approach — Keep the smallest value seen so far

For a fixed right end `j`, the best left end `i` is the one with the **smallest** value
before `j` — because `nums[j] - nums[i]` grows when `nums[i]` shrinks.

So one pass is enough:

```
smallest = +infinity
best = -1
for each value:
    if value > smallest:  best = max(best, value - smallest)
    smallest = min(smallest, value)
```

The order matters: the difference is computed **before** the minimum is updated, so an
element is never paired with itself.

**Why it is optimal:** every pair `(i, j)` is considered through its best possible
partner for `j`, and the best of all those is the global optimum.

## Dry Run

Input: `nums = [7, 1, 5, 3, 6, 9, 2]`

| Step | j | value | smallest before | difference | best | smallest after |
|---:|---:|---:|---:|---:|---:|---:|
| 1 | 0 | 7 | ∞ | — (nothing before) | -1 | 7 |
| 2 | 1 | 1 | 7 | — (1 < 7, not positive) | -1 | 1 |
| 3 | 2 | 5 | 1 | 5 − 1 = 4 | 4 | 1 |
| 4 | 3 | 3 | 1 | 3 − 1 = 2 | 4 | 1 |
| 5 | 4 | 6 | 1 | 6 − 1 = 5 | 5 | 1 |
| 6 | 5 | 9 | 1 | 9 − 1 = **8** | **8** | 1 |
| 7 | 6 | 2 | 1 | 2 − 1 = 1 | 8 | 1 |

The best difference is `8`, from `1` (index 1) to `9` (index 5) ✓

## Java Solution

See [`MaximumDifferenceBetweenTwoElements.java`](./MaximumDifferenceBetweenTwoElements.java).

```java
int smallest = Integer.MAX_VALUE;
int best = -1;
for (int value : nums) {
    if (value > smallest) {
        best = Math.max(best, value - smallest);
    }
    if (value < smallest) {
        smallest = value;
    }
}
return best;
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n) | a single pass, constant work per element |
| **Space** | O(1) | only the running minimum and the best are kept |

## Interview Notes

**Follow-ups to raise yourself:**
- *"What if the difference may be negative / you want the largest absolute difference?"*
  → track the running maximum as well and compare both directions.
- *"What if you also need the indices?"* → remember the index of the running minimum and
  of the best difference.
- *"What if the prices come as a stream?"* → the algorithm is already a stream algorithm.
- *"Is this the same as Best Time to Buy and Sell Stock?"* → yes, it is the same
  computation without the "at most one transaction" wording.

**Common mistakes:**
- ❌ Updating `smallest` **before** computing the difference → the element is paired with
  itself and the answer is always `0`.
- ❌ Returning `0` instead of `-1` when no positive difference exists → the contract
  says `-1`.
- ❌ Using `>=` in the comparison → the difference may be `0`, which is not a valid pair
  under "the difference must be positive".
- ❌ Initialising `smallest` with `0` instead of `+∞` → a negative first element breaks
  the first step.

**How to narrate:**
> "For a fixed right end, the best left end is the smallest value seen so far, because
> the difference `nums[j] - nums[i]` is largest when `nums[i]` is smallest. So I keep a
> running minimum and a running best. I compute the difference before updating the
> minimum so an element is never paired with itself. One pass, O(1) space, and `-1` when
> the array is strictly decreasing."

## Related Problems

- [Best Time to Buy and Sell Stock](../arrays/BestTimeToBuyAndSellStock.md) — the same computation
- [Container With Most Water](ContainerWithMostWater.md) — two pointers, a different objective
- [Maximum Gap](../arrays/MaxGap.md) — the maximum gap in the sorted array
- [Two Sum II - Input Array Is Sorted](TwoSumII.md) — two pointers, a different goal
