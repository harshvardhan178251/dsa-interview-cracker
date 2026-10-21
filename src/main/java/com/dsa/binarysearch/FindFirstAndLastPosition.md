---
title: Find First and Last Position of Element in Sorted Array
leetcode: 34
difficulty: Medium
patterns: [Binary search, Lower bound, Upper bound]
companies: [Amazon, Google, Meta, Microsoft, Uber]
frequency: 4
tags: [array, sorting, binary-search]
sampleInput: |
  6
  5 7 7 8 8 10
  8
sampleOutput: "3 4"
---

# Find First and Last Position of Element in Sorted Array — LeetCode 34

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Binary search · Lower bound · Upper bound |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Microsoft, Uber |

## Problem Statement

Given an array of integers `nums` sorted in **non-decreasing** order and a `target` value,
return the **starting** and **ending** index of `target` in that array.

- If `target` is not present, return `[-1, -1]`.
- The array may contain duplicates.
- The target occupies the whole range `[first, last]`; both ends are inclusive.

## Input Format

The program reads from standard input:

```
n
nums[0] nums[1] ... nums[n-1]
target
```

- `n` — length of the array (0 ≤ n ≤ 10⁵)
- `nums` — n space-separated integers, sorted non-decreasing
- `target` — the value to look for

## Sample Input

```
6
5 7 7 8 8 10
8
```

## Expected Output

```
3 4
```

`8` occupies indices `3` and `4`.

## Approach — Two boundary searches

The run of equal values is described by two boundaries:

| Boundary | Definition | Answer |
|---|---|---|
| **lower bound** | first index `i` with `nums[i] >= target` | `first` |
| **upper bound** | first index `i` with `nums[i] > target` | `last + 1` |

So: `first = lowerBound(target)`, `last = upperBound(target) - 1`. If the element at
`lowerBound` is not the target, the target is absent and we return `[-1, -1]`.

Both helpers share the same half-open skeleton; only the comparison differs:

```java
lowerBound: if (nums[mid] < target) left = mid + 1; else right = mid;
upperBound: if (nums[mid] <= target) left = mid + 1; else right = mid;
```

**Why `upperBound` instead of `lowerBound(target + 1)`?** Because `target + 1` overflows
when the target is `Integer.MAX_VALUE`. A dedicated upper-bound helper avoids the trap
entirely.

**Why the half-open range `[0, n)`?** The boundary may legitimately be `n` (the target is
larger than every element, or the target's run ends at the last index), and `n` must be a
reachable answer for both helpers.

## Dry Run

Input: `nums = [5, 7, 7, 8, 8, 10]`, `target = 8`

**Pass 1 — lowerBound(8)**

| Step | left | right | mid | `nums[mid]` | `nums[mid] < 8`? | range after |
|---:|---:|---:|---:|---:|---|---|
| 1 | 0 | 6 | 3 | 8 | no | `[0, 3)` |
| 2 | 0 | 3 | 1 | 7 | yes | `[2, 3)` |
| 3 | 2 | 3 | 2 | 7 | yes | `[3, 3)` |

`left == right == 3` → **lower bound = 3**. Check `nums[3] == 8` ✓ → the target exists.

**Pass 2 — upperBound(8)**

| Step | left | right | mid | `nums[mid]` | `nums[mid] <= 8`? | range after |
|---:|---:|---:|---:|---:|---|---|
| 1 | 0 | 6 | 3 | 8 | yes | `[4, 6)` |
| 2 | 4 | 6 | 5 | 10 | no | `[4, 5)` |
| 3 | 4 | 5 | 4 | 8 | yes | `[5, 5)` |

`left == right == 5` → **upper bound = 5** → `last = 5 - 1 = 4`.

Answer: **3 4**.

### Trace with an absent target — `nums = [5, 7, 7, 8, 8, 10]`, `target = 6`

| Step | left | right | mid | `nums[mid]` | `nums[mid] < 6`? | range after |
|---:|---:|---:|---:|---:|---|---|
| 1 | 0 | 6 | 3 | 8 | no | `[0, 3)` |
| 2 | 0 | 3 | 1 | 7 | no | `[0, 1)` |
| 3 | 0 | 1 | 0 | 5 | yes | `[1, 1)` |

`lowerBound = 1`, but `nums[1] == 7 != 6` → the target is absent → **-1 -1**.

## Java Solution

See [`FindFirstAndLastPosition.java`](./FindFirstAndLastPosition.java).

```java
public static int[] searchRange(int[] nums, int target) {
    int first = lowerBound(nums, target);
    if (first == nums.length || nums[first] != target) {
        return new int[]{-1, -1};
    }
    int last = upperBound(nums, target) - 1;
    return new int[]{first, last};
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(log n) | Two independent binary searches, each O(log n) |
| **Space** | O(1) | Only a few index variables |

**Optimal?** Yes — you need Ω(log n) probes to locate a boundary.

## Interview Notes

**Follow-ups to raise yourself:**
- *"Can you do it in one pass?"* → yes: run a normal binary search for the target, then
  expand left and right linearly from the hit. That is O(log n + k) where `k` is the run
  length — worse when the run is long.
- *"Return all indices of the target."* → collect them while expanding, or use a third
  binary search to find the run.
- *"What if the array is not sorted?"* → binary search is invalid; use a hash map of
  value → list of indices.
- *"How does this relate to a database index?"* → a B+ tree stores sorted keys with
  duplicate keys chained; `lowerBound`/`upperBound` are exactly the range-scan primitives.

**Common mistakes:**
- ❌ Using `target + 1` for the upper bound → overflow at `Integer.MAX_VALUE`.
- ❌ Returning `[-1, -1]` when the array is empty but forgetting the `first == nums.length`
  check → an `ArrayIndexOutOfBoundsException`.
- ❌ Forgetting the `-1` on the upper bound → the last index would point one past the run.
- ❌ Assuming the array is strictly increasing → the whole point of the problem is
  duplicates.

**How to narrate:**
> "A run of equal values is defined by two boundaries. The first occurrence is the lower
> bound of the target and the last occurrence is the upper bound minus one. Both are the same
> half-open binary search with a single different comparison, so I'll write them as two small
> helpers and run them back to back — O(log n) overall."

## Related Problems

- [Search Insert Position](./SearchInsertPosition.java) — the lower bound on its own
- [Binary Search](./BinarySearch.java) — the exact-match version
- [Search in Rotated Sorted Array](./SearchInRotatedSortedArray.java) — binary search on a rotated array
