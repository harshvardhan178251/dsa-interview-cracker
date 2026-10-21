---
title: Pivot Index
leetcode: 724
difficulty: Easy
patterns: [Prefix sums, Running balance]
companies: [Amazon, LinkedIn, Airbnb, Wipro, Samsung]
frequency: 3
tags: [prefix-sum, array]
sampleInput: |
  5
  1 2 3 1 2
sampleOutput: "2"
---

# Pivot Index — LeetCode 724

| | |
|---|---|
| **Difficulty** | Easy |
| **Pattern** | Prefix sums · Running balance |
| **Interview heat** | ★★★☆☆ |
| **Asked at** | Amazon, Meta, Uber |

## Problem Statement

Given an integer array `nums`, return the **index of the pivot element** — the element
for which the sum of all elements **strictly to its left** equals the sum of all
elements **strictly to its right**.

- If there is no such element, return `-1`.
- If several pivots exist, return the **leftmost** one.

## Input Format

```
n
nums[0] nums[1] ... nums[n-1]
```

- `n` — length of the array (1 ≤ n ≤ 10⁴)
- `nums` — n space-separated integers

## Sample Input

```
5
1 2 3 1 2
```

## Expected Output

```
2
```

At index 2 the left sum is `1 + 2 = 3` and the right sum is `1 + 2 = 3`.

## Approach — Total Sum + Running Left Sum

Two facts give the whole solution:

1. `total` = sum of the entire array — one O(n) pass.
2. While scanning index `i` with `left` = sum of `nums[0..i-1]`, the sum of
   `nums[i+1..n-1]` is `total - left - nums[i]`.

So index `i` is a pivot exactly when

```
left == total - left - nums[i]
```

**Why the leftmost pivot is returned:** the loop returns as soon as the condition holds,
and it visits indices in increasing order.

**Why the empty sides count as 0:** at index 0 the left sum is 0, and at index `n - 1`
the right sum is 0 — the formula handles both without a special case. For a single
element array, `left = 0` and `total - left - nums[0] = 0`, so index 0 is a pivot.

## Dry Run

Input: `nums = [1, 2, 3, 1, 2]`, `total = 9`

| Step | `i` | `nums[i]` | `left` before | right = `total - left - nums[i]` | pivot? | `left` after |
|---:|---:|---:|---:|---:|---|---:|
| 1 | 0 | 1 | 0 | 9 − 0 − 1 = 8 | 0 ≠ 8 → no | 1 |
| 2 | 1 | 2 | 1 | 9 − 1 − 2 = 6 | 1 ≠ 6 → no | 3 |
| 3 | 2 | 3 | 3 | 9 − 3 − 3 = 3 | 3 == 3 → **yes** | 6 |

Answer: **2** ✓ (the loop stops here)

## Java Solution

See [`PivotIndex.java`](./PivotIndex.java).

```java
public static int pivotIndex(int[] nums) {
    int total = 0;
    for (int value : nums) {
        total += value;
    }
    int left = 0;
    for (int i = 0; i < nums.length; i++) {
        if (left == total - left - nums[i]) {
            return i;
        }
        left += nums[i];
    }
    return -1;
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n) | Two passes |
| **Space** | O(1) | Two accumulators |

## Interview Notes

**Follow-ups to raise yourself:**
- *"What if the array is not modified but arrives as a stream?"* → you cannot know the
  total up front, so you need the array twice or a different technique.
- *"Find **all** pivots instead of the leftmost."* → remove the early `return` and
  collect all matching indices.
- *"What if the pivot had to satisfy a different condition, e.g. `left > right`?"* → the
  same running-sum scan works; just change the comparison.
- *"How does this relate to the prefix-sum table?"* → `left` is exactly `prefix[i]`, so
  the condition could be written with a precomputed table instead of a running scalar.
- *"What if the array can contain negative numbers?"* → no problem at all — the running
  sum handles negatives; only the "return the leftmost" tie-break needs care.

**Common mistakes:**
- ❌ Forgetting to subtract `nums[i]` from the right sum — `total - left` includes the
  pivot itself.
- ❌ Updating `left` **before** the comparison — then `left` would include `nums[i]`.
- ❌ Returning the *value* of the pivot instead of its **index**.
- ❌ Returning the rightmost pivot because the loop does not break — the early `return`
  is what gives the leftmost one.

**How to narrate:**
> "First I compute the total sum. Then I scan with a running left sum: at each index the
> right sum is total minus left minus the current element, so a pivot is where left
> equals that. I return the first match, which is the leftmost pivot, and -1 if there
> is none. Two passes, O(1) extra space."

## Related Problems

- [Running Sum of 1d Array](RunningSum.md) — the running accumulator
- [Subarray Sum Equals K](SubarraySumEqualsK.md) — prefix sums in a hash map
- [Range Sum Query — Immutable](RangeSumQuery.md) — prefix-sum table queries
