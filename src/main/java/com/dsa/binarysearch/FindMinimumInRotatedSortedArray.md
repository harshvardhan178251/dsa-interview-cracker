---
title: Find Minimum in Rotated Sorted Array
leetcode: 153
difficulty: Medium
patterns: [Binary search, Rotated array]
companies: [Amazon, Google, Meta, Microsoft, Uber]
frequency: 4
tags: [array, sorting, binary-search]
sampleInput: |
  5
  3 4 5 1 2
sampleOutput: "1"
---

# Find Minimum in Rotated Sorted Array — LeetCode 153

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Binary search · Rotated array |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Microsoft, Uber |

## Problem Statement

An array of **distinct** integers sorted in ascending order is rotated at an unknown pivot.
For example `[0,1,2,4,5,6,7]` may become `[4,5,6,7,0,1,2]`.

Find and return the **minimum** element.

You must achieve **O(log n)** time. (The naive answer — scan for the first drop — is O(n).)

## Input Format

The program reads from standard input:

```
n
nums[0] nums[1] ... nums[n-1]
```

- `n` — length of the array (1 ≤ n ≤ 10⁵)
- `nums` — n space-separated integers: a rotated ascending array with distinct values

## Sample Input

```
5
3 4 5 1 2
```

## Expected Output

```
1
```

The rotation point (the minimum) is at index `3`.

## Approach — Compare the middle with the right end

The pivot — the minimum — splits the array into a large sorted run and a small sorted run.
We do not know where it is, but the comparison `nums[mid] > nums[right]` reveals whether
the pivot is to the right of `mid`:

- **`nums[mid] > nums[right]`** → the rotation point is **after** `mid`. (If `mid` were in
  the small run, everything after it would be smaller, including `nums[right]`.) So set
  `left = mid + 1`.
- **`nums[mid] < nums[right]`** → `mid` is already in the small sorted run, so the minimum
  is at `mid` or to its **left**. Set `right = mid`.

The loop stops when `left == right`, and `nums[left]` is the minimum.

**Why compare with `nums[right]` and not `nums[left]`?** Because `nums[mid] > nums[right]`
is a *strict* statement about where the pivot lies, whereas `nums[mid] < nums[left]` is
also true when the array is **not rotated at all** — then the answer would be `nums[0]`,
which is at the far left, and the search would collapse incorrectly.

## Dry Run

Input: `nums = [3, 4, 5, 1, 2]`

| Step | left | right | mid | `nums[mid]` | `nums[right]` | `nums[mid] > nums[right]`? | range after |
|---:|---:|---:|---:|---:|---:|---|---|
| 1 | 0 | 4 | 2 | 5 | 2 | **yes** → pivot is right of `mid` | `[3, 4]` |
| 2 | 3 | 4 | 3 | 1 | 2 | no → minimum is at `mid` or left | `[3, 3]` |

`left == right == 3` → `nums[3] == 1` → return **1**.

### The picture

```
nums =  3  4  5 | 1  2
               ↑ pivot
               minimum = 1

step 1:  mid = 2 (value 5)  >  nums[right] = 2   →  pivot is to the right → left = 3
step 2:  mid = 3 (value 1)  <  nums[right] = 2   →  pivot is at mid or left → right = 3
```

### Trace on a non-rotated array — `nums = [1, 2, 3, 4]`

| Step | left | right | mid | `nums[mid]` | `nums[right]` | comparison | range after |
|---:|---:|---:|---:|---:|---:|---|---|
| 1 | 0 | 3 | 1 | 2 | 4 | 2 < 4 → `right = mid` | `[0, 1]` |
| 2 | 0 | 1 | 0 | 1 | 2 | 1 < 2 → `right = mid` | `[0, 0]` |

`left == right == 0` → `nums[0] == 1` → return **1** — correct even though the array was
never rotated.

## Java Solution

See [`FindMinimumInRotatedSortedArray.java`](./FindMinimumInRotatedSortedArray.java).

```java
public static int findMin(int[] nums) {
    int left = 0;
    int right = nums.length - 1;
    while (left < right) {
        int mid = left + (right - left) / 2;
        if (nums[mid] > nums[right]) {
            // The rotation point — and the minimum — is to the right of mid.
            left = mid + 1;
        } else {
            // nums[mid] is the smallest element seen so far.
            right = mid;
        }
    }
    return nums[left];
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(log n) | One half of the range is discarded per iteration |
| **Space** | O(1) | Only two index variables |

**Optimal?** Yes — Ω(log n) probes are needed in the worst case.

## Interview Notes

**Follow-ups to raise yourself:**
- *"What if duplicates are allowed?"* → the comparison `nums[mid] > nums[right]` is no longer
  decisive when they are equal; you must shrink one end and the worst case becomes O(n).
- *"Return the index of the minimum."* → the loop already knows it: `left` at the end.
- *"Find the maximum too."* → the maximum is just before the pivot: once you know the
  minimum's index `p`, the maximum is at `(p - 1 + n) % n`.
- *"How do you find the pivot itself?"* → the pivot is the only index `i` with
  `nums[i] < nums[i-1]` (with wrap-around) — one O(n) scan, or O(log n) with the same
  binary search.

**Common mistakes:**
- ❌ Comparing `nums[mid]` with `nums[left]` → breaks on a non-rotated array.
- ❌ Forgetting the `left < right` loop condition → `mid` would equal `left` and the
  `right = mid` branch would never shrink the range.
- ❌ Assuming the array is always rotated → the algorithm handles the unrotated case, but
  only if the comparison is against `nums[right]`.
- ❌ Returning `nums[mid]` from inside the loop → the minimum is at `left` when the loop
  ends, not necessarily at the last probed `mid`.

**How to narrate:**
> "A rotated array has a pivot where the values wrap around, and that pivot is the minimum.
> Comparing the middle element with the rightmost element tells me on which side of the
> pivot the middle sits: if the middle is bigger, the pivot is to the right; otherwise the
> middle is already in the small sorted run. Either way I halve the range, so I find the
> minimum in O(log n) probes."

## Related Problems

- [Search in Rotated Sorted Array](./SearchInRotatedSortedArray.java) — search by value instead
- [Search in Rotated Sorted Array II](./SearchInRotatedSortedArrayII.java) — the duplicate-heavy version
- [Find First and Last Position](./FindFirstAndLastPosition.java) — lower and upper bounds
