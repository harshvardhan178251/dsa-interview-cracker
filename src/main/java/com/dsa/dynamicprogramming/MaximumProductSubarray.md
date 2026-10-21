---
title: Maximum Product Subarray
leetcode: 152
difficulty: Medium
patterns: [Bottom-up DP, State compression]
companies: [Amazon, Meta, Airbnb, Netflix, Visa]
frequency: 4
tags: [dynamic-programming, arrays]
sampleInput: |
  4
  2 3 -2 4
sampleOutput: "6"
---

# Maximum Product Subarray — LeetCode 152

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Bottom-up DP · State compression |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Uber |

## Problem Statement

Given an integer array `nums`, find the contiguous non-empty subarray with the **largest** product and return that product.

- `nums[i]` — the values of the array (they may be negative)

## Input Format

The program reads from standard input:

```
n
nums[0] nums[1] ... nums[n-1]
```

- `n` — length of the array (1 ≤ n ≤ 10⁴)
- `nums` — n space-separated integers

## Sample Input

```
4
2 3 -2 4
```

## Expected Output

```
6
```

The subarray `2, 3` has the product `6` — the largest one.

## Approach

The Maximum Subarray sum needs only one state; the product needs **two**:

- `maxEnding` — the largest product of a subarray that ends at the current position.
- `minEnding` — the smallest product of a subarray that ends at the current position.

Why both? Multiplying a negative product by a negative number turns it into a large positive one. So when the next value is negative, the *minimum* running product can become the new maximum. Concretely, for the next value `v` the subarray ending here is one of:

1. just `v` (start a new subarray),
2. `maxEnding × v` (extend the best one),
3. `minEnding × v` (extend the worst one — the one that may flip to the best).

`newMax = max(v, maxEnding × v, minEnding × v)` and `newMin = min(v, maxEnding × v, minEnding × v)`.
Both new values must be computed **before** overwriting the old ones.

## Dry Run

Input: `nums = [2, 3, -2, 4]`.

| `i` | `nums[i]` | `maxEnding × v` | `minEnding × v` | new `maxEnding` | new `minEnding` | `best` |
|---:|---:|---:|---:|---:|---:|---:|
| 0 | 2 | — | — | 2 | 2 | 2 |
| 1 | 3 | 2 × 3 = 6 | 2 × 3 = 6 | max(3, 6, 6) = 6 | min(3, 6, 6) = 3 | 6 |
| 2 | −2 | 6 × −2 = −12 | 3 × −2 = −6 | max(−2, −12, −6) = −2 | min(−2, −12, −6) = −12 | 6 |
| 3 | 4 | −2 × 4 = −8 | −12 × 4 = −48 | max(4, −8, −48) = 4 | min(4, −8, −48) = −48 | 6 |

`best = 6` → answer **6**.

**Where the sign flip pays off.** In `nums = [-2, 3, -4]`:

| `i` | `nums[i]` | new `maxEnding` | new `minEnding` |
|---:|---:|---:|---:|
| 0 | −2 | −2 | −2 |
| 1 | 3 | max(3, −6, −6) = 3 | min(3, −6, −6) = −6 |
| 2 | −4 | max(−4, −12, 24) = **24** | min(−4, −12, 24) = −12 |

The minimum `−6` times `−4` gives the maximum `24` — tracking only the maximum would have answered `3`.

**Zeros.** A zero resets both running products to `0` and the next element starts a fresh subarray, which the "just `v`" candidate already covers.

## Java Solution

See [`MaximumProductSubarray.java`](./MaximumProductSubarray.java).

```java
    public static int maxProduct(int[] nums) {
        int best = nums[0];
        int maxEnding = nums[0];
        int minEnding = nums[0];

        for (int i = 1; i < nums.length; i++) {
            int value = nums[i];
            int candidateMax = Math.max(value, Math.max(maxEnding * value, minEnding * value));
            int candidateMin = Math.min(value, Math.min(maxEnding * value, minEnding * value));
            maxEnding = candidateMax;
            minEnding = candidateMin;
            best = Math.max(best, maxEnding);
        }
        return best;
    }
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n) | one pass over the array |
| **Space** | O(1) | three integers |

**Space `O(1)`.** A DP array is not needed — only the previous step is used.

## Interview Notes

**Follow-ups to raise yourself:**

- "What if you had to return the subarray itself?"* → remember the start index of the best run.
- "Why is the brute force `O(n²)` wrong here?"* → it is not wrong, but `O(n)` is better.
- "What is the difference to Maximum Subarray?"* → that one needs a single state because addition never flips the sign.
- "What if the array contained only positives?"* → then the answer is simply the product of the whole array, and the DP is overkill.

**Common mistakes:**

- ❌ Tracking only the maximum running product — a negative run can turn into the maximum.
- ❌ Updating `maxEnding` before computing `minEnding`, so the second update uses the new value.
- ❌ Returning `maxEnding` at the end instead of the running `best` over all positions.
- ❌ Forgetting that the subarray may not be empty (the answer is `nums[0]` for a one-element array).

**How to narrate:**

> "Because a negative number flips the sign, the smallest product ending at a position can become the largest one. So I keep both the maximum and the minimum running product, and at each step the new subarray either starts at this element or extends one of the two running products. The answer is the best maximum seen along the way."

## Related Problems

- [House Robber — LeetCode 198](./HouseRobber.java) — one-state take-or-skip DP
- [MinimumJumpSteps — LeetCode 45](./MinimumJumpSteps.java) — another O(n) scan
