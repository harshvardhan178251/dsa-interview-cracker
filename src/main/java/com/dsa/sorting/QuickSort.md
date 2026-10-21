---
title: Quick Sort
leetcode: null
difficulty: Medium
patterns: [Divide and conquer, Partitioning]
companies: [Amazon, LinkedIn, Uber]
frequency: 4
tags: [sorting, quick-sort, divide-and-conquer]
sampleInput: |
  5
  5 2 4 6 1
sampleOutput: "1 2 4 5 6"
---

# Quick Sort

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Divide and conquer · Partitioning |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Uber, Microsoft, Apple |

## Problem Statement

Sort an array of integers in ascending order using **quick sort** and print the
result.

- The algorithm partitions the array around a pivot and recurses into both halves.
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

## Approach — Partition around a pivot

Quick sort picks a **pivot**, rearranges the range so that

- everything on the left of the pivot is `<= pivot` and
- everything on the right is `>= pivot`,

and then recurses into the two sides. The pivot ends up at its final position.

This implementation uses the **Lomuto partition** with the **last element of the
range** as the pivot:

1. `boundary` starts at `low - 1` — the last index of the "smaller or equal" region.
2. Scan `j` from `low` to `high - 1`. When `nums[j] <= pivot`, grow the region by
   one and swap `nums[boundary]` with `nums[j]`.
3. Finally swap the pivot (at `high`) with `nums[boundary + 1]` — that is the pivot's
   final index — and recurse into `[low, pivotIndex - 1]` and `[pivotIndex + 1, high]`.

**Why the average case is O(n log n):** for a random pivot the recursion is balanced.
**Why the worst case is O(n²):** if the pivot is always the smallest or the largest
element, the recursion degenerates into a chain of length n.

## Dry Run

Input: `nums = [5, 2, 4, 6, 1]`

### Call `quickSort(0, 4)` — pivot = `nums[4]` = **1**, `boundary = -1`

| Step | j | `nums[j]` | `<= pivot`? | action | array |
|---:|---:|---:|---|---|---|
| 1 | 0 | 5 | ✘ | — | `[5, 2, 4, 6, 1]` |
| 2 | 1 | 2 | ✘ | — | `[5, 2, 4, 6, 1]` |
| 3 | 2 | 4 | ✘ | — | `[5, 2, 4, 6, 1]` |
| 4 | 3 | 6 | ✘ | — | `[5, 2, 4, 6, 1]` |
| 5 | — | — | — | `swap(boundary+1=0, high=4)` → pivot to the front | `[1, 2, 4, 6, 5]` |

Pivot index = `0` → recurse into `quickSort(0, -1)` (empty) and `quickSort(1, 4)`.

### Call `quickSort(1, 4)` — pivot = `nums[4]` = **5**, `boundary = 0`

| Step | j | `nums[j]` | `<= pivot`? | action | array |
|---:|---:|---:|---|---|---|
| 6 | 1 | 2 | ✔ | `boundary = 1`, `swap(1, 1)` | `[1, 2, 4, 6, 5]` |
| 7 | 2 | 4 | ✔ | `boundary = 2`, `swap(2, 2)` | `[1, 2, 4, 6, 5]` |
| 8 | 3 | 6 | ✘ | — | `[1, 2, 4, 6, 5]` |
| 9 | — | — | — | `swap(boundary+1=3, high=4)` | `[1, 2, 4, 5, 6]` |

Pivot index = `3` → recurse into `quickSort(1, 2)` and `quickSort(4, 4)`.

### Call `quickSort(1, 2)` — pivot = `nums[2]` = **4**, `boundary = 0`

| Step | j | `nums[j]` | `<= pivot`? | action | array |
|---:|---:|---:|---|---|---|
| 10 | 1 | 2 | ✔ | `boundary = 1`, `swap(1, 1)` | `[1, 2, 4, 5, 6]` |
| 11 | — | — | — | `swap(boundary+1=2, high=2)` | `[1, 2, 4, 5, 6]` |

Pivot index = `2` → recurse into `quickSort(1, 1)` and `quickSort(3, 2)` — both empty.

### Remaining calls

| Call | Range | Result |
|---|---|---|
| `quickSort(0, -1)` | empty | done |
| `quickSort(4, 4)` | one element | done |
| `quickSort(1, 1)` | one element | done |
| `quickSort(3, 2)` | empty | done |

Final array: **`[1, 2, 4, 5, 6]`**

## Java Solution

See [`QuickSort.java`](./QuickSort.java).

```java
public static int[] quickSort(int[] nums) {
    quickSort(nums, 0, nums.length - 1);
    return nums;
}

private static void quickSort(int[] nums, int low, int high) {
    if (low >= high) {
        return;
    }
    int pivotIndex = partition(nums, low, high);
    quickSort(nums, low, pivotIndex - 1);
    quickSort(nums, pivotIndex + 1, high);
}

private static int partition(int[] nums, int low, int high) {
    int pivot = nums[high];
    int boundary = low - 1;
    for (int j = low; j < high; j++) {
        if (nums[j] <= pivot) {
            boundary++;
            swap(nums, boundary, j);
        }
    }
    swap(nums, boundary + 1, high);
    return boundary + 1;
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n log n) average, O(n²) worst | balanced recursion vs. a degenerate one |
| **Space** | O(log n) | The recursion stack (average case) |

## Interview Notes

**Follow-ups to raise yourself:**
- *"How do you avoid the O(n²) worst case?"* → pick a **random pivot**, or use the
  median-of-three, or use an introsort that switches to heapsort after too many
  recursive levels.
- *"Hoare vs. Lomuto partition — which one?"* → Lomuto does ~9 swaps for n = 10⁶ on
  random data while Hoare does ~1.4n; Hoare is faster but the pivot ends up in an
  arbitrary position, so the partition index has to be used differently.
- *"Is it stable?"* → **no**, the partition swaps elements that may be equal.
- *"What about the space complexity — is it really O(log n)?"* → yes on average, but
  O(n) in the worst case with the naive recursion; an explicit stack with the smaller
  side recursed into keeps it O(log n) always.

**Common mistakes:**
- ❌ Forgetting the **final swap** that puts the pivot between the two regions → the
  pivot is not at its final index.
- ❌ Using `nums[j] < pivot` instead of `<= ` → equal elements can end up on the
  wrong side.
- ❌ Swapping the pivot with `boundary` instead of `boundary + 1` → off-by-one.
- ❌ Missing the base case `low >= high` → infinite recursion on single-element
  ranges.

**How to narrate:**
> "Quick sort picks a pivot, partitions the range so everything smaller is on the
> left and everything larger on the right, and recurses. I use Lomuto partitioning
> with the last element as the pivot: a boundary index tracks the end of the
> 'smaller or equal' region, and after the scan I swap the pivot into place. Average
> case O(n log n) in place; the worst case is O(n²), which randomising the pivot
> makes vanishingly unlikely."

## Related Problems

- [Merge Sort](../../../../../../docs/topics/08-sorting.md) — the stable O(n log n) alternative
- [Heap Sort](../../../../../../docs/topics/08-sorting.md) — O(n log n) with guaranteed O(1) extra space
- [Dutch National Flag](../../../../../../docs/topics/08-sorting.md) — partitioning with three pointers
