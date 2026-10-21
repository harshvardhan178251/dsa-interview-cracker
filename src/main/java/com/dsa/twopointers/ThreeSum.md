---
title: 3Sum
leetcode: 15
difficulty: Medium
patterns: [Two Pointers, Sorting, Duplicate skipping]
companies: [Amazon, Google, Meta, Facebook, Microsoft, JP Morgan, Zillow]
frequency: 5
tags: [array, two-pointers, sorting, backtracking]
sampleInput: |
  6
  -1 0 1 2 -1 -4
sampleOutput: |
  -1 -1 2
  -1 0 1
---

# 3Sum — LeetCode 15

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Two Pointers · Sorting · Duplicate skipping |
| **Interview heat** | ★★★★★ |
| **Asked at** | Amazon, Meta, Google, Microsoft, Uber, Bloomberg, Apple |

## Problem Statement

Given an integer array `nums`, return **all unique triplets** `[nums[i], nums[j],
nums[k]]` that sum to zero.

- The solution set must not contain duplicate triplets.
- The order of the triplets and of the numbers inside them does not matter.
- The array may contain negative numbers, zero and duplicates.

For `nums = [-1, 0, 1, 2, -1, -4]` the answer is `[-1, -1, 2]` and `[-1, 0, 1]`.

## Input Format

The program reads from standard input:

```
n
nums[0] nums[1] ... nums[n-1]
```

- `n` — length of the array (1 ≤ n ≤ 3000)
- `nums` — n space-separated integers (-10⁴ ≤ nums[i] ≤ 10⁴)

The program prints **one triplet per line**, the three numbers separated by spaces. If
there is no triplet, nothing is printed.

## Sample Input

```
6
-1 0 1 2 -1 -4
```

## Expected Output

```
-1 -1 2
-1 0 1
```

## Approach — Sort once, then two pointers per first element

Sorting does three jobs at once:

1. the array is now ordered, so the two-pointer scan works;
2. duplicates are **adjacent**, so they can be skipped in O(1);
3. a triplet can be skipped entirely when its first element repeats.

The algorithm:

1. Sort the array.
2. For every index `i` (skipping equal neighbours), fix `nums[i]` as the first element.
3. Use `left = i + 1` and `right = n - 1` to look for the other two:
   - sum < 0 → `left++` (the pair must grow),
   - sum > 0 → `right--` (the pair must shrink),
   - sum == 0 → record the triplet and skip both duplicates.
4. Move both pointers inwards after a hit.

**The duplicate skipping is the whole difficulty of this problem.** Without it the
answer explodes: `[-1, -1, 0, 1]` would produce the same triplet over and over.

## Dry Run

Input: `nums = [-1, 0, 1, 2, -1, -4]` → sorted: `[-4, -1, -1, 0, 1, 2]`

| Step | `i` | `nums[i]` | left | right | sum | action |
|---:|---:|---:|---:|---:|---:|---|
| 1 | 0 | -4 | 1 | 5 | -4 + (-1) + 2 = -3 | too small → `left++` |
| 2 | 0 | -4 | 2 | 5 | -4 + (-1) + 2 = -3 | too small → `left++` |
| 3 | 0 | -4 | 3 | 5 | -4 + 0 + 2 = -2 | too small → `left++` |
| 4 | 0 | -4 | 4 | 5 | -4 + 1 + 2 = -1 | too small → `left++` → `left == right`, stop |
| 5 | 1 | -1 | 2 | 5 | -1 + (-1) + 2 = **0** | **hit** → record `(-1, -1, 2)` |
| 6 | 1 | -1 | 3 | 4 | -1 + 0 + 1 = **0** | **hit** → record `(-1, 0, 1)` |
| 7 | 2 | -1 | — | — | — | `nums[2] == nums[1]` → **skip** the whole outer loop |
| 8 | 3 | 0 | 4 | 5 | 0 + 1 + 2 = 3 | too large → `right--` → stop |

Two unique triplets, and the duplicate outer element at index 2 is skipped, so
`(-1, -1, 2)` is not reported twice ✓

## Java Solution

See [`ThreeSum.java`](./ThreeSum.java).

```java
for (int i = 0; i < sorted.length - 2; i++) {
    if (i > 0 && sorted[i] == sorted[i - 1]) {
        continue;
    }
    int left = i + 1;
    int right = sorted.length - 1;
    while (left < right) {
        int sum = sorted[i] + sorted[left] + sorted[right];
        if (sum < 0) {
            left++;
        } else if (sum > 0) {
            right--;
        } else {
            answer.add(new int[]{sorted[i], sorted[left], sorted[right]});
            while (left < right && sorted[left] == sorted[left + 1]) {
                left++;
            }
            while (left < right && sorted[right] == sorted[right - 1]) {
                right--;
            }
            left++;
            right--;
        }
    }
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n²) | n outer steps, each with a linear two-pointer scan |
| **Space** | O(n) for the sort, O(1) extra beyond the result | the two-pointer scan itself is in place |

## Interview Notes

**Follow-ups to raise yourself:**
- *"What about 4Sum?"* → nest the same idea: fix two elements and two-pointer the rest,
  O(n³).
- *"How do you avoid the duplicates?"* → sort, then skip equal neighbours on all three
  levels.
- *"Can you do it without sorting?"* → no efficient way: the sorting is what makes the
  duplicate handling and the two-pointer scan possible.
- *"What if the numbers are huge and overflow?"* → use a `long` for the sum.

**Common mistakes:**
- ❌ Forgetting the **outer** duplicate skip → the same triplet is reported several
  times.
- ❌ Forgetting the **inner** duplicate skips after a hit → duplicates such as
  `[-1, -1, 0, 1]` produce repeated triplets.
- ❌ Moving only one pointer after a hit → the scan continues inside the duplicate run.
- ❌ Assuming the input is sorted → the algorithm sorts it first; skipping the sort
  breaks everything.

**How to narrate:**
> "I sort the array first — that makes duplicates adjacent and lets me use two pointers.
> Then I fix the first element and scan the rest with two pointers, moving the left one
> when the sum is too small and the right one when it is too large. The part people
> forget is the duplicate handling: I skip equal first elements, and after every hit I
> skip equal values on both sides, so each triplet is reported exactly once."

## Related Problems

- [Two Sum II - Input Array Is Sorted](TwoSumII.md) — the two-pointer scan
- [3Sum Closest](ThreeSumClosest.md) — the same scan with a running best
- [4Sum](../../../../../../docs/topics/10-twopointers.md) — the nested version
- [Two Sum](../arrays/TwoSum.md) — the hash-map version
