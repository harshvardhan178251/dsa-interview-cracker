---
title: Two Sum II - Input Array Is Sorted
leetcode: 167
difficulty: Easy
patterns: [Two Pointers, Sorted array]
companies: [Amazon, Meta, Google, Microsoft, Uber, Bloomberg]
frequency: 4
tags: [array, two-pointers, sorting]
sampleInput: |
  4
  2 7 11 15
  9
sampleOutput: "1 2"
---

# Two Sum II - Input Array Is Sorted — LeetCode 167

| | |
|---|---|
| **Difficulty** | Easy |
| **Pattern** | Two Pointers · Sorted array |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Meta, Google, Microsoft, Uber, Bloomberg |

## Problem Statement

Given a **1-indexed sorted** array `nums` and an integer `target`, return the 1-based
indices of the two numbers that add up to `target`.

- Exactly one solution exists.
- The same element may not be used twice.
- The indices are **1-based** (`i < j`).

## Input Format

The program reads from standard input:

```
n
nums[0] nums[1] ... nums[n-1]
target
```

- `n` — length of the array (2 ≤ n ≤ 10⁴)
- `nums` — n space-separated integers in **ascending** order
- `target` — the required sum

## Sample Input

```
4
2 7 11 15
9
```

## Expected Output

```
1 2
```

`nums[0] + nums[1] = 2 + 7 = 9`, so the 1-based indices `1` and `2` are returned.

## Approach — Two pointers from both ends

This is [Two Sum](../arrays/TwoSum.java) with the sortedness
turned into a much cheaper algorithm: no hash map, no extra space.

Place one pointer at the **left** end and one at the **right** end and look at the sum
of the two values:

- sum **too small** → the left value has to grow: `left++`.
- sum **too large** → the right value has to shrink: `right--`.
- sum **equal** → done.

**Why the moves are safe:** the sum of the two ends is the *largest* possible sum that
uses `nums[left]` together with any element to its right — no smaller element to the
right could make the sum larger. So if that sum is still too small, `nums[left]` can
never be part of a solution and the left pointer may move on. The argument for the
right pointer is symmetric.

## Dry Run

Input: `nums = [2, 7, 11, 15]`, `target = 9`

| Step | left | right | `nums[left]` | `nums[right]` | sum | action |
|---:|---:|---:|---:|---:|---:|---|
| 1 | 0 | 3 | 2 | 15 | 17 | too large → `right--` |
| 2 | 0 | 2 | 2 | 11 | 13 | too large → `right--` |
| 3 | 0 | 1 | 2 | 7 | **9** | equal → return `{1, 2}` (1-based) |

Only three steps — no element is examined twice, and the scan never revisits a
discarded pair.

## Java Solution

See [`TwoSumII.java`](./TwoSumII.java).

```java
int left = 0;
int right = nums.length - 1;
while (left < right) {
    int sum = nums[left] + nums[right];
    if (sum == target) {
        return new int[]{left + 1, right + 1};
    }
    if (sum < target) {
        left++;
    } else {
        right--;
    }
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n) | every step moves one pointer inwards |
| **Space** | O(1) | no extra data structure at all |

**Optimal?** Yes — every element has to be looked at, and this uses no extra memory,
unlike the hash-map solution.

## Interview Notes

**Follow-ups to raise yourself:**
- *"What if the array is not sorted?"* → use a hash map: O(n) time, O(n) space.
- *"What if there are multiple solutions?"* → return all of them, or count them; the
  two-pointer version finds one.
- *"What if the values are huge and could overflow an int?"* → compare with a `long`
  difference instead of summing.
- *"Can you do it with a fixed target and many queries?"* → two pointers per query is
  already optimal; for many queries, sort and binary search.

**Common mistakes:**
- ❌ Returning **0-based** indices → the problem asks for 1-based ones.
- ❌ Allowing `left == right` → the same element would be used twice.
- ❌ Moving the **wrong** pointer when the sum is too small → the scan stalls and misses
  the answer.
- ❌ Forgetting the array must be sorted → the whole reasoning collapses.

**How to narrate:**
> "The array is sorted, so I can use two pointers instead of a hash map. I start at both
> ends and look at the sum. If it's too small, the left value is too small to pair with
> anything that is left — I move it inwards; if it's too large, the right value is too
> large to pair with anything that is right, so I move that one. When the pointers meet
> there is no solution. That's O(n) time and O(1) space."

## Related Problems

- [Two Sum](../arrays/TwoSum.md) — the unsorted version
- [3Sum](ThreeSum.md) — the same idea, extended to triples
- [3Sum Closest](ThreeSumClosest.md) — the running-best variant
- [Squares of a Sorted Array](SquaresOfSortedArray.md) — two pointers filling from the back
