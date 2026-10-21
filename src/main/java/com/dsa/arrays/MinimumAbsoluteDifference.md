---
title: Minimum Absolute Difference
leetcode: 1200
difficulty: Medium
patterns: [Sorting, Adjacent pair scan]
companies: [Amazon, Google, Meta]
frequency: 2
tags: [array, sorting]
sampleInput: |
  5
  4 2 1 3 5
sampleOutput: "1"
---

# Minimum Absolute Difference — LeetCode 1200

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Sorting · Adjacent pair scan |
| **Interview heat** | ★★☆☆☆ |
| **Asked at** | Amazon, Google, Meta |

## Problem Statement

Given an integer array `nums`, return the **smallest absolute difference** between any
two **distinct** elements of the array.

LeetCode 1200 asks for the two *values*; this variant returns the **difference** itself.

## Input Format

```
n
nums[0] nums[1] ... nums[n-1]
```

- `n` — length of the array (2 ≤ n ≤ 10⁵)
- `nums` — n space-separated integers

## Sample Input

```
5
4 2 1 3 5
```

## Expected Output

```
1
```

`1` and `2` differ by `1`.

## Approach — Sort, then Look at the Neighbours

**Key insight:** once the array is sorted, the closest pair is always **adjacent**.

*Proof.* Suppose `sorted[i]` and `sorted[j]` (with `i < j`) form the closest pair but are
not adjacent. Then `j > i + 1`, and `sorted[i+1]` lies between them, so
`sorted[i+1] - sorted[i] < sorted[j] - sorted[i]` — a strictly smaller difference, a
contradiction.

So the algorithm is:

1. Sort the values.
2. Scan adjacent pairs and keep the smallest difference.

**Time:** the sort dominates → O(n log n). **Space:** O(n) for the sorted copy (a
`sort` in place would be O(1) extra space but mutates the input).

**Lower bound:** finding the minimum absolute difference is equivalent to checking
whether two equal values exist when the threshold is 0, so it is at least as hard as the
duplicate-detection problem, which is O(n) with hashing. O(n log n) via sorting is the
practical answer; the bucket technique from
[Maximum Gap](MaxGap.md) gives O(n) but only bounds the gap — it cannot compute the
minimum exactly.

## Dry Run

Input: `nums = [4, 2, 1, 3, 5]`

### Step 1 — sort

| Step | array before | array after |
|---:|---|---|
| 1 | `[4, 2, 1, 3, 5]` | `[1, 2, 3, 4, 5]` |

### Step 2 — scan adjacent pairs

| Step | `i` | `sorted[i-1]` | `sorted[i]` | difference | `best` before | `best` after |
|---:|---:|---:|---:|---:|---:|---:|
| 1 | 1 | 1 | 2 | 1 | ∞ | 1 |
| 2 | 2 | 2 | 3 | 1 | 1 | 1 |
| 3 | 3 | 3 | 4 | 1 | 1 | 1 |
| 4 | 4 | 4 | 5 | 1 | 1 | 1 |

Answer: **1**

## Java Solution

See [`MinimumAbsoluteDifference.java`](./MinimumAbsoluteDifference.java).

```java
public static int minimumAbsoluteDifference(int[] nums) {
    if (nums.length < 2) {
        return 0;
    }
    int[] sorted = nums.clone();
    Arrays.sort(sorted);
    int best = Integer.MAX_VALUE;
    for (int i = 1; i < sorted.length; i++) {
        best = Math.min(best, sorted[i] - sorted[i - 1]);
    }
    return best;
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n log n) | The sort dominates; the scan is O(n) |
| **Space** | O(n) | A sorted copy of the input |

## Interview Notes

**Follow-ups to raise yourself:**
- *"Return the two values, not the difference."* → remember the indices of the best pair
  while scanning.
- *"Can you do it in O(n)?"* → with a hash set: bucket the values by their range and
  check only the neighbouring buckets (this is how you find the minimum difference in
  O(n) with bounded integers).
- *"What if the array is already sorted?"* → skip the sort entirely, O(n).
- *"What if the array is huge and cannot be copied?"* → sort in place with
  `Arrays.sort(nums)` and accept the mutation.
- *"How does this relate to the duplicate-detection problem?"* → the minimum difference
  is 0 exactly when a duplicate exists, so this problem is at least as hard as finding
  duplicates.

**Common mistakes:**
- ❌ Comparing every pair instead of only adjacent ones after sorting — O(n²) and, more
  importantly, it hides the insight.
- ❌ Forgetting to **sort a copy** and accidentally returning a result on unsorted data.
- ❌ Initialising `best` to `0` instead of `Integer.MAX_VALUE` — the answer would always
  be 0.
- ❌ Using `Math.abs` on the difference of *unsorted* neighbours — after sorting the
  difference is already non-negative.

**How to narrate:**
> "After sorting, the closest pair must be adjacent — otherwise the value in between
> would be even closer. So I sort and then scan the neighbouring pairs, keeping the
> smallest difference. That's O(n log n) time and O(n) space for the sorted copy, and I
> never mutate the caller's array."

## Related Problems

- [Maximum Gap](MaxGap.md) — the largest adjacent gap, in linear time
- [Find Minimum and Maximum Element](FindMinimumAndMaximumElement.md) — the O(n) scan
- [Missing Number](MissingNumber.md) — a closed-form scan
