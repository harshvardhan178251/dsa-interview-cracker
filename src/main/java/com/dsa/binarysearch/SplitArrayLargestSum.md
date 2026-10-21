---
title: Split Array Largest Sum
leetcode: 410
difficulty: Hard
patterns: [Binary search on the answer, Greedy, Partition]
companies: [Google, Meta, Microsoft, Facebook, eBay]
frequency: 4
tags: [binary-search, greedy, partition, hard]
sampleInput: |
  5
  7 2 5 10 8
  2
sampleOutput: "18"
---

# Split Array Largest Sum — LeetCode 410

| | |
|---|---|
| **Difficulty** | Hard |
| **Pattern** | Binary search on the answer · Greedy · Partition |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Facebook, Uber |

## Problem Statement

Given a non-negative array `nums` and an integer `k`, split `nums` into `k` **non-empty
contiguous** groups so that the **largest** group sum is as small as possible. Return that
minimum possible largest group sum.

- `1 <= nums.length <= 10⁵`
- `0 <= nums[i] <= 10⁴`
- `1 <= k <= nums.length`

## Input Format

The program reads from standard input:

```
n
nums[0] nums[1] ... nums[n-1]
k
```

- `n` — length of the array (1 ≤ n ≤ 10⁵)
- `nums` — n space-separated non-negative integers
- `k` — the number of groups (1 ≤ k ≤ n)

## Sample Input

```
5
7 2 5 10 8
2
```

## Expected Output

```
18
```

The split `[7, 2, 5]` / `[10, 8]` gives group sums `14` and `18`, so the largest is `18`.
A limit of `17` would force three groups.

## Approach — Binary search on the limit

The unknown is the **largest group sum** we are willing to tolerate. Search a monotone
predicate:

> `P(L) = "the array can be split into at most k groups, none exceeding L"`.

`P` is monotone: if `L` works, every larger limit works too. So the feasible limits form
a suffix `[L*, ∞)` and the answer is the **first** element of that suffix.

**The feasibility check is greedy.** Walk the array, extending the current group while its
sum stays within `L`; when the next element would overflow, start a new group. Because the
groups must be contiguous, cutting a group earlier can only create *more* groups, so the
greedy split uses the **minimum** number of groups. If it needs more than `k`, the limit is
too small.

**The search range.** `low = max(nums)` (a group must hold at least the largest single
element) and `high = sum(nums)` (one group with everything).

**Note on `k > n` or `k == 1`.** `k == 1` gives `sum(nums)` directly — the search handles it
without a special case. `k > n` is excluded by the constraints.

## Dry Run

Input: `nums = [7, 2, 5, 10, 8]`, `k = 2`

| Step | low | high | mid | greedy groups for `mid` | group sums | groups | feasible? | range after |
|---:|---:|---:|---:|---|---|---:|---|---|
| 1 | 10 | 32 | 21 | `[7,2,5]` `[10,8]` | 14, 18 | 2 | yes | `[10, 21]` |
| 2 | 10 | 21 | 15 | `[7,2,5]` `[10]` `[8]` | 14, 10, 8 | 3 | no | `[16, 21]` |
| 3 | 16 | 21 | 18 | `[7,2,5]` `[10,8]` | 14, 18 | 2 | yes | `[16, 18]` |
| 4 | 16 | 18 | 17 | `[7,2,5]` `[10]` `[8]` | 14, 10, 8 | 3 | no | `[18, 18]` |

`low == high == 18` → return **18**.

### The greedy split in detail — limit `L = 17` on `[7, 2, 5, 10, 8]`

| Group | Element | Load before | Load after | Decision |
|---:|---:|---:|---:|---|
| 1 | 7 | 0 | 7 | fits |
| 1 | 2 | 7 | 9 | fits |
| 1 | 5 | 9 | 14 | fits |
| 1 | 10 | 14 | — | `14 + 10 = 24 > 17` → new group |
| 2 | 10 | 0 | 10 | fits |
| 2 | 8 | 10 | — | `10 + 8 = 18 > 17` → new group |
| 3 | 8 | 0 | 8 | fits → **3 groups needed** > 2 → infeasible |

With `L = 18`: group 1 = `[7,2,5]` (14), group 2 = `[10,8]` (18) — exactly 2 groups.

## Java Solution

See [`SplitArrayLargestSum.java`](./SplitArrayLargestSum.java).

```java
public static int splitArray(int[] nums, int k) {
    long low = 0;
    long high = 0;
    for (int value : nums) {
        low = Math.max(low, value);
        high += value;
    }
    while (low < high) {
        long mid = low + (high - low) / 2;
        if (groupsNeeded(nums, mid) <= k) {
            high = mid;
        } else {
            low = mid + 1;
        }
    }
    return (int) low;
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n log S) | S = sum(nums); one O(n) check per binary-search step |
| **Space** | O(1) | No extra containers |

## Interview Notes

**Follow-ups to raise yourself:**
- *"Return the actual groups."* → record the boundaries during the successful check.
- *"What if the groups did not have to be contiguous?"* → then the problem is
  `max(max(nums), ceil(sum / k))` and no search is needed; contiguity is what makes this
  hard.
- *"What if `k` is very large (close to n)?"* → the answer approaches `max(nums)`; the
  binary search still takes O(log S) steps.
- *"Can you prove the greedy split minimises the number of groups?"* → exchange argument:
  in any feasible split the first group ends no later than the greedy's first group, so
  the greedy never leaves more work behind.

**Common mistakes:**
- ❌ Using a **max** over groups instead of the count of groups in the check → the
  predicate is about *how many* groups, not how big they are.
- ❌ Binary searching for the *largest* feasible limit instead of the smallest → the answer
  would be `sum(nums)`.
- ❌ Starting `low` at `0` → a group limit of 0 cannot hold the largest element.
- ❌ Ignoring the `long` accumulator → `sum(nums)` reaches 10⁹ and `load + value` can
  overflow when the limit is large.

**How to narrate:**
> "I'll binary search the answer, which is the largest group sum we're allowed. The predicate
> 'can I split into at most k groups with each sum at most L' is monotone. The check is
> greedy — keep extending the current group until the next element overflows it — and
> because the groups are contiguous that greedy split uses the fewest possible groups. I
> then take the smallest L that passes."

## Related Problems

- [Allocate Minimum Number of Painters](./AllocateMinimumNumberOfPainters.java) — the same shape with painters
- [Capacity To Ship Packages Within D Days](./CapacityToShipPackages.java) — the same shape with days
- [Koko Eating Bananas](./KokoEatingBananas.java) — binary search on a rate
