---
title: Search in Rotated Sorted Array
leetcode: 33
difficulty: Medium
patterns: [Binary search, Rotated array]
companies: [Meta, Amazon, Google, LinkedIn, Uber, Facebook, Pinterest, HCLTech, Wipro, Barclays]
frequency: 5
tags: [array, sorting, binary-search]
sampleInput: |
  7
  4 5 6 7 0 1 2
  0
sampleOutput: "4"
---

# Search in Rotated Sorted Array — LeetCode 33

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Binary search · Rotated array |
| **Interview heat** | ★★★★★ |
| **Asked at** | Amazon, Google, Meta, Microsoft, Uber, Bloomberg |

## Problem Statement

An array sorted in ascending order with **distinct** values is rotated at an unknown pivot.
For example `[0,1,2,4,5,6,7]` may become `[4,5,6,7,0,1,2]`.

Given the rotated array `nums` and a `target`, return the **index** of `target`, or `-1`
if it is not present.

You must achieve **O(log n)** time.

## Input Format

The program reads from standard input:

```
n
nums[0] nums[1] ... nums[n-1]
target
```

- `n` — length of the array (1 ≤ n ≤ 10⁵)
- `nums` — n space-separated integers: a rotated ascending array with distinct values
- `target` — the value to locate

## Sample Input

```
7
4 5 6 7 0 1 2
0
```

## Expected Output

```
4
```

`nums[4] == 0`, so the index `4` is returned.

## Approach — Find the sorted half, then use its value range

The array is no longer globally sorted, but it is made of **two sorted runs**. At any
midpoint, **at least one** of the halves `[left, mid]` / `[mid, right]` is sorted.

Which one? Compare `nums[left]` with `nums[mid]`:

- `nums[left] <= nums[mid]` → the **left** half is sorted.
- otherwise → the **right** half is sorted.

Once we know a half is sorted, its values span a contiguous range, so we can check in O(1)
whether the target is inside it:

- **Left half sorted** (`nums[left] <= nums[mid]`): the target is in this half iff
  `nums[left] <= target && target < nums[mid]`. Otherwise it is in the right half.
- **Right half sorted** (`nums[mid] > nums[right]` case): the target is in this half iff
  `nums[mid] < target && target <= nums[right]`.

Whichever half does **not** contain the target is discarded, so the range still halves every
iteration → O(log n).

**Note on the comparisons.** The inequalities are asymmetric on purpose: the left-half test
uses `target < nums[mid]` while the right-half test uses `nums[mid] < target`. Using `<=`
on both sides would make a target equal to the boundary value ambiguous.

## Dry Run

Input: `nums = [4, 5, 6, 7, 0, 1, 2]`, `target = 0`

| Step | left | right | mid | `nums[mid]` | sorted half | target inside it? | range after |
|---:|---:|---:|---:|---:|---|---|---|
| 1 | 0 | 6 | 3 | 7 | left: `nums[0]=4 <= 7` | no — `0 < 4` | `[4, 6]` |
| 2 | 4 | 6 | 5 | 1 | left: `nums[4]=0 <= 1` | **yes** — `0 <= 0 < 1` | `[4, 4]` |
| 3 | 4 | 4 | 4 | 0 | `nums[4] == target` | — | **return 4** |

Three probes for a 7-element array.

### Trace with a miss — `nums = [4,5,6,7,0,1,2]`, `target = 3`

| Step | left | right | mid | `nums[mid]` | sorted half | target inside it? | range after |
|---:|---:|---:|---:|---:|---|---|---|
| 1 | 0 | 6 | 3 | 7 | left (`4 <= 7`) | no — `3 < 4` | `[4, 6]` |
| 2 | 4 | 6 | 5 | 1 | left (`0 <= 1`) | no — `3 > 1` | `[6, 6]` |
| 3 | 6 | 6 | 6 | 2 | right (`nums[6]=2`, `2 > 1`) | no — `3 > 2` | `[6, 5]` |

`left > right` → the range is empty → return **-1**.

## Java Solution

See [`SearchInRotatedSortedArray.java`](./SearchInRotatedSortedArray.java).

```java
public static int search(int[] nums, int target) {
    int left = 0;
    int right = nums.length - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (nums[mid] == target) {
            return mid;
        }
        if (nums[left] <= nums[mid]) {
            // The left half [left, mid] is sorted.
            if (nums[left] <= target && target < nums[mid]) {
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        } else {
            // The right half [mid, right] is sorted.
            if (nums[mid] < target && target <= nums[right]) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
    }
    return -1;
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(log n) | One half of the range is discarded per iteration |
| **Space** | O(1) | Only three index variables |

**Optimal?** Yes — Ω(log n) probes are needed in the worst case.

## Interview Notes

**Follow-ups to raise yourself:**
- *"What if duplicates are allowed?"* → see
  [Search in Rotated Sorted Array II](./SearchInRotatedSortedArrayII.java);
  the worst case degrades to O(n).
- *"First find the pivot, then binary search the right half."* → a perfectly good
  alternative, and often easier to explain: O(log n) + O(log n) = O(log n).
- *"What if the array is rotated but you do not know by how much?"* → irrelevant; the
  algorithm never needs to know the rotation amount.
- *"Can you solve it in O(1) space with a different algorithm?"* → yes, the "binary search on
  the sorted half" method is already O(1) space.

**Common mistakes:**
- ❌ Assuming one half is *always* sorted (only **at least one** is) → wrong branch, wrong
  answer.
- ❌ Using `<=` on both sides of the range test → the target equal to `nums[mid]`'s
  neighbour is misclassified and can be skipped.
- ❌ Comparing `nums[left]` with `nums[right]` to decide which half is sorted → that tells
  you whether the array is rotated at all, not which half around `mid` is sorted.
- ❌ Forgetting that the array may not be rotated at all → the algorithm handles it, but only
  if you do not special-case it incorrectly.

**How to narrate:**
> "A rotated array has two sorted runs, so at any midpoint one of the halves is sorted. I
> detect which one by comparing the left end with the middle, then use that sorted half's
> value range to decide whether the target lives there. The other half is discarded, so the
> range halves each step and the whole search stays O(log n)."

## Related Problems

- [Search in Rotated Sorted Array II](./SearchInRotatedSortedArrayII.java) — the duplicate-heavy version
- [Find Minimum in Rotated Sorted Array](./FindMinimumInRotatedSortedArray.java) — the same shape, a different question
- [Search a 2D Matrix](./Search2DMatrix.java) — binary search over a flattened matrix
