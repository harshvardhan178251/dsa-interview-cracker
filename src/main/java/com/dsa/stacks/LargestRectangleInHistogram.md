---
title: Largest Rectangle in Histogram
leetcode: 84
difficulty: Hard
patterns: [Monotonic stack, Sentinel]
companies: [Google, Amazon, Apple, LinkedIn, Visa, HCLTech, Cognizant, Deloitte]
frequency: 4
tags: [stack, monotonic-stack, array, hard]
sampleInput: |
  5
  2 1 5 6 2
sampleOutput: "10"
---

# Largest Rectangle in Histogram — LeetCode 84

| | |
|---|---|
| **Difficulty** | Hard |
| **Pattern** | Monotonic stack · Sentinel |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Microsoft, Uber, Bloomberg |

## Problem Statement

Given an array of bar heights, find the area of the **largest rectangle** that can be formed
from a contiguous run of bars.

- `[2, 1, 5, 6, 2]` → `10` (the bars of height 5 and 6 next to each other: 5 × 2).
- `[2, 4]` → `4`.
- The rectangle must stand on the ground: its height is limited by the **shortest** bar it
  covers.

## Input Format

The program reads from standard input:

```
n
heights[0] heights[1] ... heights[n-1]
```

- `n` — the number of bars (1 ≤ n ≤ 10⁵)
- `heights` — n space-separated integers (0 ≤ h ≤ 10⁴)

## Sample Input

```
5
2 1 5 6 2
```

## Expected Output

```
10
```

## Approach — Monotonic Increasing Stack

Think of every bar as the **shortest** bar of some rectangle. If bar `i` is the shortest bar
of a rectangle, that rectangle can extend left and right as far as the neighbouring bars are
at least as tall as `heights[i]`. The question is how far.

The stack answers exactly that. It holds indices with **increasing** heights (bottom to top).
When the current bar `i` is **shorter** than the bar on top of the stack, that bar can no
longer grow to the right — and the new bar blocks it from the left. So the rectangle is
final:

- `h` = the height of the popped bar,
- `left` = the index now on top of the stack (the nearest bar shorter than `h`), or `-1`,
- `width` = `i - left - 1`,
- area = `h * width`.

**The sentinel:** the loop runs one extra step with a virtual bar of height `0`. It pops
every remaining bar, so the ones at the end of the array are finalised too. Without it, the
tallest bar at the far right would never be evaluated.

**Why the stack is increasing:** the bars on the stack are exactly the ones that could still
extend to the right. A bar shorter than the current one ends that possibility, so it is
popped and its area is computed.

## Dry Run

Input: `[2, 1, 5, 6, 2]`, stack shown as **heights (bottom → top)**

| Step | i | height | stack before | popped (index, h) | `left` | width | area | best |
|---:|---:|---:|---|---|---:|---:|---:|---:|
| 1 | 0 | `2` | `[]` | — | — | — | — | 0 |
| 2 | 1 | `1` | `[2]` | `0` (2 ≥ 1) | `-1` | `1 - (-1) - 1 = 1` | `2 × 1 = 2` | 2 |
| 3 | 2 | `5` | `[1]` | — | — | — | — | 2 |
| 4 | 3 | `6` | `[1, 5]` | — | — | — | — | 2 |
| 5 | 4 | `2` | `[1, 5, 6]` | `3` (6 ≥ 2) | `2` | `4 - 2 - 1 = 1` | `6 × 1 = 6` | 6 |
| 6 | 4 | `2` | `[1, 5]` | `2` (5 ≥ 2) | `1` | `4 - 1 - 1 = 2` | `5 × 2 = 10` | **10** |
| 7 | 4 | `2` | `[1]` | — (1 < 2) | — | — | — | 10 |
| 8 | 5 (sentinel) | `0` | `[1, 2]` | `4` (2 ≥ 0) | `1` | `5 - 1 - 1 = 3` | `2 × 3 = 6` | 10 |
| 9 | 5 | `0` | `[1]` | `1` (1 ≥ 0) | `-1` | `5 - (-1) - 1 = 5` | `1 × 5 = 5` | 10 |

The best area is `10` ✓ — the bars `5` and `6` side by side.

## Java Solution

See [`LargestRectangleInHistogram.java`](./LargestRectangleInHistogram.java).

```java
public static int largestRectangle(int[] heights) {
    int n = heights.length;
    int best = 0;
    Deque<Integer> stack = new ArrayDeque<>();

    for (int i = 0; i <= n; i++) {
        int height = (i == n) ? 0 : heights[i];
        while (!stack.isEmpty() && heights[stack.peek()] >= height) {
            int h = heights[stack.pop()];
            int left = stack.isEmpty() ? -1 : stack.peek();
            int width = i - left - 1;
            best = Math.max(best, h * width);
        }
        if (i < n) {
            stack.push(i);
        }
    }
    return best;
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n) | Each index is pushed once and popped at most once |
| **Space** | O(n) | The stack |

## Interview Notes

**Follow-ups to raise yourself:**
- *"Return the rectangle itself, not just the area."* → keep the index and the width of the
  best rectangle.
- *"The histogram is a circle."* → double the array and run the same algorithm.
- *"Rotated array variant."* → find the minimum with a binary search, then rotate the
  histogram and solve the two parts.
- *"What if the bars have widths?"* → the width computation becomes the sum of widths.

**Common mistakes:**
- ❌ Forgetting the **sentinel** step → the bars at the right end never get their area
  computed.
- ❌ Computing the width as `i - left` → off by one; it is `i - left - 1` because both
  `left` and `i` are excluded.
- ❌ Using `>` instead of `>=` → equal heights pile up on the stack and the width of the
  earlier equal bar is computed too small.
- ❌ Forgetting the `left` neighbour when the stack becomes empty → use `-1`.

**How to narrate:**
> "Every bar is the shortest bar of some maximal rectangle, so I only have to find how far
> that rectangle can extend. I keep a stack of indices with increasing heights. When a
> shorter bar arrives, the bar on top can no longer grow, so I pop it, take the new top as
> the left boundary, and compute `height * (i - left - 1)`. I finish with a virtual bar of
> height 0 to flush the stack. Each index is pushed and popped once, so it is O(n)."

## Related Problems

- [Next Greater Element](NextGreaterElement.md) — the same stack family
- [Daily Temperatures](DailyTemperatures.md) — the same idea, a different answer
- [Trapping Rain Water](TrappingRainWater.md) — the other "extremes" problem
