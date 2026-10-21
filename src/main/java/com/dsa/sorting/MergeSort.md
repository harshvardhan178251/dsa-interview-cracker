---
title: Merge Sort
leetcode: null
difficulty: Medium
patterns: [Divide and conquer, Merging]
companies: [Amazon, JP Morgan, Netflix, HCLTech, Barclays]
frequency: 4
tags: [sorting, merge-sort, divide-and-conquer]
sampleInput: |
  5
  5 2 4 6 1
sampleOutput: "1 2 4 5 6"
---

# Merge Sort

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Divide and conquer · Merging |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Uber, Microsoft, Apple |

## Problem Statement

Sort an array of integers in ascending order using **merge sort** and print the
result.

- The algorithm splits, sorts recursively and merges.
- Print the sorted array as space-separated integers on one line.

## Input Format

The program reads from standard input:

```
n
nums[0] nums[1] ... nums[n-1]
```

- `n` — the length of the array (0 ≤ n ≤ 10⁴).
- `nums` — n space-separated integers.

## Sample Input

```
5
5 2 4 6 1
```

## Expected Output

```
1 2 4 5 6
```

## Approach — Split, sort, merge

Merge sort is the textbook **divide and conquer** algorithm:

1. **Split** the array into two halves.
2. **Sort** each half recursively (the base case is an array of 0 or 1 elements).
3. **Merge** the two sorted halves into one sorted array in linear time.

The merge keeps two indices, one per half. It repeatedly takes the smaller of the
two current elements, which is why the merge step is O(n) and not O(n²).

**Why the total is O(n log n):** the recursion has log₂ n levels, and on every level
the merge work adds up to n elements.

## Dry Run

Input: `nums = [5, 2, 4, 6, 1]`

### The recursion tree

```
[5, 2, 4, 6, 1]
├── [5, 2]              → [5] + [2]        → merge → [2, 5]
└── [4, 6, 1]
    ├── [4]             → base case        → [4]
    └── [6, 1]          → [6] + [1]        → merge → [1, 6]
                          merge [4] + [1, 6] → [1, 4, 6]
        merge [2, 5] + [1, 4, 6]            → [1, 2, 4, 5, 6]
```

### Merge 1 — `[5]` and `[2]`

| k | `left[i]` | `right[j]` | smaller | `result` so far |
|---:|---:|---:|---|---|
| 0 | 5 | 2 | right → 2 | `[2]` |
| 1 | — | — | left exhausted → copy `5` | `[2, 5]` |

### Merge 2 — `[6]` and `[1]`

| k | `left[i]` | `right[j]` | smaller | `result` so far |
|---:|---:|---:|---|---|
| 0 | 6 | 1 | right → 1 | `[1]` |
| 1 | — | — | left exhausted → copy `6` | `[1, 6]` |

### Merge 3 — `[4]` and `[1, 6]`

| k | `left[i]` | `right[j]` | smaller | `result` so far |
|---:|---:|---:|---|---|
| 0 | 4 | 1 | right → 1 | `[1]` |
| 1 | 4 | 6 | left → 4 | `[1, 4]` |
| 2 | — | 6 | right exhausted → copy `6` | `[1, 4, 6]` |

### Merge 4 — `[2, 5]` and `[1, 4, 6]` (the final merge)

| k | `left[i]` | `right[j]` | smaller | `result` so far |
|---:|---:|---:|---|---|
| 0 | 2 | 1 | right → 1 | `[1]` |
| 1 | 2 | 4 | left → 2 | `[1, 2]` |
| 2 | 5 | 4 | right → 4 | `[1, 2, 4]` |
| 3 | 5 | 6 | left → 5 | `[1, 2, 4, 5]` |
| 4 | — | 6 | right exhausted → copy `6` | `[1, 2, 4, 5, 6]` |

Final array: **`[1, 2, 4, 5, 6]`**

## Java Solution

See [`MergeSort.java`](./MergeSort.java).

```java
public static int[] mergeSort(int[] nums) {
    if (nums.length <= 1) {
        return nums;
    }
    int mid = nums.length / 2;
    int[] left = Arrays.copyOfRange(nums, 0, mid);
    int[] right = Arrays.copyOfRange(nums, mid, nums.length);

    int[] sortedLeft = mergeSort(left);
    int[] sortedRight = mergeSort(right);
    return merge(sortedLeft, sortedRight);
}

private static int[] merge(int[] left, int[] right) {
    int[] result = new int[left.length + right.length];
    int i = 0, j = 0, k = 0;
    while (i < left.length && j < right.length) {
        if (left[i] <= right[j]) {
            result[k++] = left[i++];
        } else {
            result[k++] = right[j++];
        }
    }
    while (i < left.length) {
        result[k++] = left[i++];
    }
    while (j < right.length) {
        result[k++] = right[j++];
    }
    return result;
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n log n) | log n levels of recursion, n units of merge work per level |
| **Space** | O(n) | The halves plus the merge buffer — the recursion itself is O(log n) deep |

## Interview Notes

**Follow-ups to raise yourself:**
- *"Is it stable?"* → **yes**, as long as the merge uses `<=` when the two values are
  equal (take from the left half first).
- *"Can you make it in place?"* → not easily; in-place merge sort needs O(1) extra
  space tricks (rotation-based merge) and is rarely worth it.
- *"Merge sort for a linked list?"* → perfect fit: split at the middle by finding
  the midpoint with slow/fast pointers, then merge the two lists.
- *"When would you not use merge sort?"* → when you need O(1) extra space, or when
  the data is a linked list you cannot index — quicksort or heapsort fit better.

**Common mistakes:**
- ❌ **Ignoring the return value of the recursive calls** → the halves are never
  sorted; this is the classic merge sort bug.
- ❌ Using `<` instead of `<=` in the merge → the sort is no longer stable.
- ❌ Forgetting to copy the **remaining** elements after one half runs out → the tail
  of the array is lost or zero.
- ❌ Splitting into overlapping halves → elements are duplicated.

**How to narrate:**
> "Merge sort is divide and conquer: split the array, sort both halves recursively,
> then merge the two sorted halves in linear time by always taking the smaller head.
> The recursion is log n deep and each level merges n elements, so it's O(n log n)
> time with O(n) extra space. It's stable, which is why databases use it when the
> sort key has ties."

## Related Problems

- [Quick Sort](../../../../../../docs/topics/08-sorting.md) — the in-place alternative
- [Heap Sort](../../../../../../docs/topics/08-sorting.md) — O(n log n) with O(1) extra space
- [Counting Sort](../../../../../../docs/topics/08-sorting.md) — O(n) when the value range is small
