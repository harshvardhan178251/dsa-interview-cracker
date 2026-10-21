---
title: Insertion Sort
leetcode: null
difficulty: Easy
patterns: [Comparison sort, Growing sorted prefix]
companies: [Amazon, Uber, Cognizant]
frequency: 3
tags: [sorting, insertion-sort, comparison-sort]
sampleInput: |
  5
  5 2 4 6 1
sampleOutput: "1 2 4 5 6"
---

# Insertion Sort

| | |
|---|---|
| **Difficulty** | Easy |
| **Pattern** | Comparison sort · Growing sorted prefix |
| **Interview heat** | ★★★☆☆ |
| **Asked at** | Amazon, Google, Meta, Uber, Adobe |

## Problem Statement

Sort an array of integers in ascending order using **insertion sort** and print the
result.

- The algorithm sorts the array in place.
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

## Approach — Insert the next element into the sorted prefix

The first element is already a sorted prefix of length one. For every following
element:

1. Take it out and remember it as **the key**.
2. Walk left through the sorted prefix, shifting every element that is **larger**
   than the key one position to the right.
3. Drop the key into the gap that opens up.

This is exactly how people sort a hand of playing cards: each new card is inserted
into the right place of the cards you already hold.

**Why it is good:** the inner loop only runs while elements are actually out of
place, so a nearly sorted array is sorted in O(n). That makes insertion sort the
standard choice for small arrays and for "almost sorted" data.

## Dry Run

Input: `nums = [5, 2, 4, 6, 1]`. The sorted prefix starts as `[5]`.

### `i = 1` — key = `2`

| Step | j | `nums[j]` | `nums[j] > key`? | action | array |
|---:|---:|---:|---|---|---|
| 1 | 0 | 5 | ✔ | shift `nums[1] = nums[0] = 5`, `j = -1` | `[5, 5, 4, 6, 1]` |
| 2 | -1 | — | — | loop ends, `nums[0] = key = 2` | **`[2, 5, 4, 6, 1]`** |

### `i = 2` — key = `4`

| Step | j | `nums[j]` | `nums[j] > key`? | action | array |
|---:|---:|---:|---|---|---|
| 3 | 1 | 5 | ✔ | shift `nums[2] = nums[1] = 5`, `j = 0` | `[2, 5, 5, 6, 1]` |
| 4 | 0 | 2 | ✘ | loop ends, `nums[1] = key = 4` | **`[2, 4, 5, 6, 1]`** |

### `i = 3` — key = `6`

| Step | j | `nums[j]` | `nums[j] > key`? | action | array |
|---:|---:|---:|---|---|---|
| 5 | 2 | 5 | ✘ | loop ends immediately, `nums[3] = key = 6` | **`[2, 4, 5, 6, 1]`** |

### `i = 4` — key = `1`

| Step | j | `nums[j]` | `nums[j] > key`? | action | array |
|---:|---:|---:|---|---|---|
| 6 | 3 | 6 | ✔ | shift `nums[4] = nums[3] = 6`, `j = 2` | `[2, 4, 5, 6, 6]` |
| 7 | 2 | 5 | ✔ | shift `nums[3] = nums[2] = 5`, `j = 1` | `[2, 4, 5, 5, 6]` |
| 8 | 1 | 4 | ✔ | shift `nums[2] = nums[1] = 4`, `j = 0` | `[2, 4, 4, 5, 6]` |
| 9 | 0 | 2 | ✔ | shift `nums[1] = nums[0] = 2`, `j = -1` | `[2, 2, 4, 5, 6]` |
| 10 | -1 | — | — | loop ends, `nums[0] = key = 1` | **`[1, 2, 4, 5, 6]`** |

Final array: **`[1, 2, 4, 5, 6]`**

## Java Solution

See [`InsertionSort.java`](./InsertionSort.java).

```java
public static int[] insertionSort(int[] nums) {
    for (int i = 1; i < nums.length; i++) {
        int key = nums[i];
        int j = i - 1;
        while (j >= 0 && nums[j] > key) {
            nums[j + 1] = nums[j];
            j--;
        }
        nums[j + 1] = key;
    }
    return nums;
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n²) worst, O(n) best | n(n−1)/2 shifts; a sorted array never enters the inner loop |
| **Space** | O(1) | Only the key and two counters |

## Interview Notes

**Follow-ups to raise yourself:**
- *"Is it stable?"* → **yes**: elements are only shifted when they are strictly
  larger, so equal elements keep their relative order.
- *"When is insertion sort the right choice?"* → small arrays (it beats quicksort
  below ~10 elements because of the low constant factor) and nearly sorted data.
- *"How many comparisons does it need for a given array?"* → exactly the number of
  inversions (plus one comparison per element) — that is the classic characterisation.
- *"Can you make it work on a linked list?"* → yes, and it is the natural choice
  there, since no random access is needed.

**Common mistakes:**
- ❌ Using `>=` in the shift condition → the sort becomes unstable.
- ❌ Forgetting to store `key` before shifting → the value being moved is lost.
- ❌ Placing the key at `nums[j]` instead of `nums[j + 1]` → off-by-one, the key
  overwrites a shifted element.
- ❌ Starting the outer loop at `i = 0` → the first element has no prefix to be
  inserted into.

**How to narrate:**
> "Insertion sort keeps a sorted prefix on the left and inserts each new element
> into it. I take the element out as the key, shift everything larger in the prefix
> one place to the right, and drop the key into the gap. It's O(n²) in the worst
> case but only O(n) on nearly sorted data, it's stable, and it's the algorithm
> people use to sort a hand of cards."

## Related Problems

- [Bubble Sort](../../../../../../docs/topics/08-sorting.md) — the other quadratic comparison sort
- [Selection Sort](../../../../../../docs/topics/08-sorting.md) — quadratic but with few swaps
- [Merge Sort](../../../../../../docs/topics/08-sorting.md) — the divide and conquer alternative
