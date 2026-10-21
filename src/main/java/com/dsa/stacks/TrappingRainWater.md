---
title: Trapping Rain Water
leetcode: 42
difficulty: Hard
patterns: [Two pointers, Running maxima]
companies: [Meta, Google, Amazon, Adobe, Airbnb, Uber, Cloudflare]
frequency: 5
tags: [array, two-pointers, stack, hard]
sampleInput: |
  6
  4 2 0 3 2 5
sampleOutput: "9"
---

# Trapping Rain Water — LeetCode 42

| | |
|---|---|
| **Difficulty** | Hard |
| **Pattern** | Two pointers · Running maxima |
| **Interview heat** | ★★★★★ |
| **Asked at** | Amazon, Google, Meta, Microsoft, Uber, Bloomberg, Adobe |

## Problem Statement

Given the height of each bar, compute how much rain water is **trapped** between the bars.

- `[4, 2, 0, 3, 2, 5]` → `9`
- the water above a bar is limited by the shorter of the two walls around it:
  `water[i] = min(maxLeft, maxRight) - height[i]`.

## Input Format

The program reads from standard input:

```
n
heights[0] heights[1] ... heights[n-1]
```

- `n` — the number of bars (1 ≤ n ≤ 2 × 10⁴)
- `heights` — n space-separated integers (0 ≤ h ≤ 10⁵)

## Sample Input

```
6
4 2 0 3 2 5
```

## Expected Output

```
9
```

The water above each bar is `0, 2, 4, 1, 2, 0` — nine units in total. ✓

## Approach — Two Pointers and Running Maxima

The formula `water[i] = min(maxLeft, maxRight) - height[i]` needs the maximum on **both**
sides of every bar. Precomputing both arrays is easy but costs O(n) space.

The two-pointer version avoids the arrays. The key observation:

> If `height[left] < height[right]`, the water above `left` is decided by the **left** side
> alone. Whatever wall is on the right, there is a bar at `right` that is at least as tall
> as `height[left]`, and the tallest bar seen so far on the left (`leftMax`) is at least as
> tall as `height[left]` too — so the level that matters is `leftMax`.

So we move the pointer at the **shorter** side, and we only ever need one running maximum
per side.

**Why this is correct:** the shorter side can never be the bottleneck — the other side
already has a wall that is at least as high, so the shorter side's own maximum is the
limiting factor.

## Dry Run

Input: `[4, 2, 0, 3, 2, 5]`, `left = 0`, `right = 5`

| Step | `height[left]` | `height[right]` | branch | `leftMax` | `rightMax` | water added | `water` |
|---:|---:|---:|---|---:|---:|---:|---:|
| 1 | `4` | `5` | left (`4 < 5`) | `max(0,4) = 4` | `0` | `4 - 4 = 0` | 0 |
| 2 | `2` | `5` | left (`2 < 5`) | `max(4,2) = 4` | `0` | `4 - 2 = 2` | 2 |
| 3 | `0` | `5` | left (`0 < 5`) | `max(4,0) = 4` | `0` | `4 - 0 = 4` | 6 |
| 4 | `3` | `5` | left (`3 < 5`) | `max(4,3) = 4` | `0` | `4 - 3 = 1` | 7 |
| 5 | `2` | `5` | left (`2 < 5`) | `max(4,2) = 4` | `0` | `4 - 2 = 2` | 9 |
| 6 | `5` | `5` | `left == right` → loop ends (`left = 5`, `right = 5`) | `4` | `0` | — | 9 |

Total water = `9` ✓ — the water above the bars is `0, 2, 4, 1, 2, 0`.

### The other branch — `[5, 1, 2, 1, 4]`

| Step | `height[left]` | `height[right]` | branch | `leftMax` | `rightMax` | water added | `water` |
|---:|---:|---:|---|---:|---:|---:|---:|
| 1 | `5` | `4` | right (`5 ≥ 4`) | `0` | `max(0,4) = 4` | `4 - 4 = 0` | 0 |
| 2 | `5` | `1` | right (`5 ≥ 1`) | `0` | `max(4,1) = 4` | `4 - 1 = 3` | 3 |
| 3 | `5` | `2` | right (`5 ≥ 2`) | `0` | `max(4,2) = 4` | `4 - 2 = 2` | 5 |
| 4 | `5` | `1` | right (`5 ≥ 1`) | `0` | `max(4,1) = 4` | `4 - 1 = 3` | 8 |
| 5 | `5` | `5` | loop ends | `0` | `4` | — | 8 |

Total = `8` ✓ (the classic example for this array).

## Java Solution

See [`TrappingRainWater.java`](./TrappingRainWater.java).

```java
public static int trap(int[] height) {
    if (height == null || height.length < 3) {
        return 0;
    }
    int left = 0;
    int right = height.length - 1;
    int leftMax = 0;
    int rightMax = 0;
    int water = 0;

    while (left < right) {
        if (height[left] < height[right]) {
            leftMax = Math.max(leftMax, height[left]);
            water += leftMax - height[left];
            left++;
        } else {
            rightMax = Math.max(rightMax, height[right]);
            water += rightMax - height[right];
            right--;
        }
    }
    return water;
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n) | Each bar is processed once |
| **Space** | O(1) | Two pointers and two running maxima |

## Interview Notes

**Follow-ups to raise yourself:**
- *"Do it with a stack instead of two pointers."* → keep the decreasing bars on a stack;
  when a taller bar arrives, pop and compute the trapped water — O(n) space, O(n) time.
- *"Precompute the left and right maxima."* → the textbook O(n) space version.
- *"What if the bars have different widths?"* → the area formulas change to use widths.
- *"Compute the largest square instead of the largest rectangle."* → the same idea with
  `min(width, height)`.

**Common mistakes:**
- ❌ Using `height[left] <= height[right]` and updating the **wrong** maximum → off-by-one
  errors; the comparison must match the update.
- ❌ Forgetting to update the running maximum **before** subtracting → the first bar of each
  side would contribute a negative amount.
- ❌ Looping with `left <= right` → the last bar would be counted twice.

**How to narrate:**
> "The water above a bar is `min(maxLeft, maxRight) - height`. Instead of precomputing both
> maxima I use two pointers and compare the two end bars. If the left bar is shorter, the
> right side already has a wall at least that tall, so the left side's own running maximum
> is the limiting factor — I add `leftMax - height[left]` and move the left pointer. The
> other case is symmetric. Each bar is visited once, so it is O(n) time and O(1) space."

## Related Problems

- [Container With Most Water](../../../../../../docs/topics/10-twopointers.md) — the same two-pointer family
- [Largest Rectangle in Histogram](LargestRectangleInHistogram.md) — the stack variant
- [Next Greater Element II](NextGreaterElementII.md) — running maxima, another style
