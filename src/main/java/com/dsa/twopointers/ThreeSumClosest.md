---
title: 3Sum Closest
leetcode: 16
difficulty: Medium
patterns: [Two Pointers, Sorting, Running best]
companies: [Google, Meta, Microsoft, Uber, Intel, Wipro, Tech Mahindra, Qualcomm]
frequency: 4
tags: [array, two-pointers, sorting]
sampleInput: |
  4
  -1 2 1 -4
  1
sampleOutput: "2"
---

# 3Sum Closest — LeetCode 16

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Two Pointers · Sorting · Running best |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Meta, Google, Microsoft, Uber |

## Problem Statement

Given an integer array `nums` of length `n` and an integer `target`, find the integer in
`nums` such that the sum of **three** elements is closest to `target`.

- Every input has exactly one answer.
- The three elements must be **distinct indices** (`i < j < k`).
- The answer is the **sum**, not the triplet.

For `nums = [-1, 2, 1, -4]` and `target = 1` the possible sums are
`-1 + 2 + 1 = 2` and `-1 + 2 + (-4) = -3` and `-1 + 1 + (-4) = -4` and
`2 + 1 + (-4) = -1` — the closest to `1` is `2`.

## Input Format

The program reads from standard input:

```
n
nums[0] nums[1] ... nums[n-1]
target
```

- `n` — length of the array (3 ≤ n ≤ 1000)
- `nums` — n space-separated integers (-10⁴ ≤ nums[i] ≤ 10⁴)
- `target` — the wanted sum (-10⁴ ≤ target ≤ 10⁴)

## Sample Input

```
4
-1 2 1 -4
1
```

## Expected Output

```
2
```

## Approach — Sort, then two pointers with a running best

The machinery is the same as [3Sum](ThreeSum.md): sort the array, fix the
first element, scan the rest with two pointers. The difference is the **goal** — instead
of looking for an exact hit, every sum that is visited is compared with the best one so
far.

```
sum = nums[i] + nums[left] + nums[right]
if |sum - target| < |best - target|:
    best = sum
if sum < target: left++      // we need a bigger sum
else:            right--     // we need a smaller sum
```

**Why the pointer movement is still right:** for a fixed `i`, the sums produced by
moving `left` up are increasing and the sums produced by moving `right` down are
decreasing. So the scan walks monotonically towards the target and the closest sum is
encountered on the way — no candidate is skipped by the movement rules.

## Dry Run

Input: `nums = [-1, 2, 1, -4]`, `target = 1` → sorted: `[-4, -1, 1, 2]`

| Step | `i` | left | right | sum | distance to `1` | best | action |
|---:|---:|---:|---:|---:|---:|---:|---|
| 0 | — | — | — | — | — | `-4 + -1 + 1 = -4` | initial best |
| 1 | 0 | 1 | 3 | -4 + -1 + 2 = -3 | 4 | -3 | sum < target → `left++` |
| 2 | 0 | 2 | 3 | -4 + 1 + 2 = -1 | 2 | -1 | sum < target → `left++` → `left == right`, stop |
| 3 | 1 | 2 | 3 | -1 + 1 + 2 = **2** | 1 | **2** | sum > target → `right--` → stop |

The best sum is `2`, at distance `1` from the target ✓

## Java Solution

See [`ThreeSumClosest.java`](./ThreeSumClosest.java).

```java
int best = sorted[0] + sorted[1] + sorted[2];
for (int i = 0; i < sorted.length - 2; i++) {
    int left = i + 1;
    int right = sorted.length - 1;
    while (left < right) {
        int sum = sorted[i] + sorted[left] + sorted[right];
        if (Math.abs(sum - target) < Math.abs(best - target)) {
            best = sum;
        }
        if (sum == target) {
            return sum;
        }
        if (sum < target) {
            left++;
        } else {
            right--;
        }
    }
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n²) | n outer steps, each with a linear two-pointer scan |
| **Space** | O(n) for the sort | the scan itself uses O(1) extra space |

## Interview Notes

**Follow-ups to raise yourself:**
- *"What if several sums are equally close?"* → return any of them; the problem
  guarantees a unique answer.
- *"How would you return the triplet instead of the sum?"* → keep the indices of the
  best sum alongside it.
- *"What if the array is huge?"* → the same algorithm, but the sort dominates.
- *"Can you avoid sorting?"* → not efficiently; sorting is what makes the monotonic
  pointer movement valid.

**Common mistakes:**
- ❌ Comparing the sums instead of their **distances** to the target → `sum < best` is
  meaningless when the target is not zero.
- ❌ Forgetting to update the best **before** moving the pointers → the final sum of
  every scan is missed.
- ❌ Returning the closest **element** instead of the sum.
- ❌ Using the same element twice (`left` may start at `i`, not `i`).

**How to narrate:**
> "This is 3Sum with a running best instead of an exact match. I sort the array, fix
> the first element and walk two pointers through the rest. Every sum I produce I
> compare with the best by distance to the target, and then I move the left pointer when
> the sum is too small and the right one when it is too large — because the sorted array
> makes the sums monotone in each direction, no candidate is skipped. O(n²) time."

## Related Problems

- [3Sum](ThreeSum.md) — the exact-match version
- [Two Sum II - Input Array Is Sorted](TwoSumII.md) — the two-pointer scan
- [3Sum with Smaller Target](../../../../../../docs/topics/10-twopointers.md) — the counting variant
- [Container With Most Water](ContainerWithMostWater.md) — two pointers with a greedy move
