---
title: Find Minimum and Maximum Element
leetcode: null
difficulty: Easy
patterns: [Linear scan, Single pass]
companies: [Amazon, Google, Meta]
frequency: 2
tags: [array, scan, min-max]
sampleInput: |
  6
  3 -1 8 8 0 -5
sampleOutput: "-5 8"
---

# Find Minimum and Maximum Element — LeetCode 1470

| | |
|---|---|
| **Difficulty** | Easy |
| **Pattern** | Linear scan · Single pass |
| **Interview heat** | ★★☆☆☆ |
| **Asked at** | Amazon, Google, Meta |

## Problem Statement

Given an integer array `nums`, return its **smallest** element and its **largest**
element.

- The array is **not** guaranteed to be sorted.
- Duplicates, negative values and zeros are all allowed.
- The minimum comes first in the output, then the maximum.

> The LeetCode id `1470` is kept from the source list this problem was assigned from
> (the "Shuffle the Array" family). The task modelled here is the single-pass min/max
> scan that problem's sibling exercises.

## Input Format

```
n
nums[0] nums[1] ... nums[n-1]
```

- `n` — length of the array (1 ≤ n ≤ 10⁵)
- `nums` — n space-separated integers

## Sample Input

```
6
3 -1 8 8 0 -5
```

## Expected Output

```
-5 8
```

The smallest element is `-5` and the largest is `8`.

## Approach — One Pass, Two Accumulators

Keep a running `min` and a running `max`. Both are seeded with `nums[0]` so that the
loop body has no special case for the first element.

For every value `v`:

- if `v < min` → `min = v`
- if `v > max` → `max = v`

**Why two `if`s and not `else if`?** With `else if` the first element would still be
handled (both seeds start equal to `nums[0]`), but the code reads as if a value could
never be both the new minimum and the new maximum. Using two independent comparisons
makes the intent obvious and is what the reviewer expects.

**Why not `Arrays.sort`?** Sorting is O(n log n) and destroys the original order; the
scan is O(n) and O(1) space. If the array were already sorted, binary search would be
another option — but it is not guaranteed to be.

## Dry Run

Input: `nums = [3, -1, 8, 8, 0, -5]`

Seeds: `min = 3`, `max = 3`

| Step | i | `nums[i]` | `min` before | `min` after | `max` before | `max` after | note |
|---:|---:|---:|---:|---:|---:|---:|---|
| 1 | 0 | 3 | 3 | 3 | 3 | 3 | seed element, no change |
| 2 | 1 | −1 | 3 | **−1** | 3 | 3 | new minimum |
| 3 | 2 | 8 | −1 | −1 | 3 | **8** | new maximum |
| 4 | 3 | 8 | −1 | −1 | 8 | 8 | duplicate of the maximum — no change |
| 5 | 4 | 0 | −1 | −1 | 8 | 8 | between min and max |
| 6 | 5 | −5 | −1 | **−5** | 8 | 8 | new minimum |

Answer: **-5 8**

## Java Solution

See [`FindMinimumAndMaximumElement.java`](./FindMinimumAndMaximumElement.java).

```java
public static int[] minAndMax(int[] nums) {
    if (nums.length == 0) {
        return new int[]{Integer.MIN_VALUE, Integer.MAX_VALUE};
    }
    int min = nums[0];
    int max = nums[0];
    for (int value : nums) {
        if (value < min) {
            min = value;
        }
        if (value > max) {
            max = value;
        }
    }
    return new int[]{min, max};
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n) | One pass, two comparisons per element |
| **Space** | O(1) | Two scalars (the result array holds exactly two values) |

## Interview Notes

**Follow-ups to raise yourself:**
- *"What if the array is already sorted?"* → return `nums[0]` and `nums[n-1]`; O(1).
- *"What if I need the second smallest / second largest?"* → do a tournament-style
  second pass, or track the two largest and two smallest in one pass.
- *"Can this be done on a stream?"* → yes, it is a fold (reduction) over the array; O(1)
  memory and single pass by construction.
- *"What if the array contained `null`s?"* → skip them explicitly; the primitive
  `int` version of this problem has no nulls.
- *"How would you find the min and max of an array of `long`s?"* → identical code with
  `long` accumulators; the sentinel for "empty" becomes `Long.MAX_VALUE`.

**Common mistakes:**
- ❌ Seeding `min` with `0` and `max` with `0` — that breaks on all-negative and
  all-positive arrays. Seed with `nums[0]`.
- ❌ Using `else if` so that the very first element can never become the max on a
  single-element array (it works only because the seeds are equal).
- ❌ Forgetting that the **output order** is `min` then `max`.
- ❌ Sorting the array to find the extremes — O(n log n) and it mutates the input.

**How to narrate:**
> "This is a single fold over the array: I keep a running min and a running max, both
> seeded from the first element so there's no special case. Two independent comparisons
> per element, O(n) time, O(1) space, and I never touch the original order."

## Related Problems

- [Missing Number](MissingNumber.md) — a closed-form scan over the same family
- [Maximum Gap](MaxGap.md) — needs the sorted order, so it buckets instead
- [Two Sum](TwoSum.md) — the same single-pass shape with a hash map
