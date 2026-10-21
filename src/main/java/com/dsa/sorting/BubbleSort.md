---
title: Bubble Sort
leetcode: null
difficulty: Easy
patterns: [Comparison sort, Repeated swapping]
companies: [Amazon, Google, Meta, Uber, Apple]
frequency: 3
tags: [sorting, bubble-sort, comparison-sort]
sampleInput: |
  5
  5 2 4 6 1
sampleOutput: "1 2 4 5 6"
---

# Bubble Sort

| | |
|---|---|
| **Difficulty** | Easy |
| **Pattern** | Comparison sort · Repeated swapping |
| **Interview heat** | ★★★☆☆ |
| **Asked at** | Amazon, Google, Meta, Uber, Apple |

## Problem Statement

Sort an array of integers in ascending order using **bubble sort** and print the
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

## Approach — Bubble every maximum to the back

Bubble sort makes repeated passes over the array. In each pass it compares
**adjacent** elements and swaps them when they are out of order. The largest element
of the unsorted region therefore "bubbles" to the back of that region, and after one
pass the last position is final.

Two details make it practical:

- **The pass gets shorter.** After the first pass the largest element is already in
  its final place, so the next pass only has to look at `n - 1` positions.
- **Early exit.** If a whole pass performs no swap, the array is already sorted and
  the algorithm can stop. That makes the best case **O(n)** instead of O(n²).

## Dry Run

Input: `nums = [5, 2, 4, 6, 1]`

### Pass 1 — `end = 4` (compare indices 0…3)

| Step | i | `nums[i]` | `nums[i+1]` | swap? | array after the step |
|---:|---:|---:|---:|---|---|
| 1 | 0 | 5 | 2 | ✔ swap | `[2, 5, 4, 6, 1]` |
| 2 | 1 | 5 | 4 | ✔ swap | `[2, 4, 5, 6, 1]` |
| 3 | 2 | 5 | 6 | ✘ | `[2, 4, 5, 6, 1]` |
| 4 | 3 | 6 | 1 | ✔ swap | `[2, 4, 5, 1, 6]` |

The largest element `6` has bubbled to index 4 — its final place.

### Pass 2 — `end = 3` (compare indices 0…2)

| Step | i | `nums[i]` | `nums[i+1]` | swap? | array after the step |
|---:|---:|---:|---:|---|---|
| 5 | 0 | 2 | 4 | ✘ | `[2, 4, 5, 1, 6]` |
| 6 | 1 | 4 | 5 | ✘ | `[2, 4, 5, 1, 6]` |
| 7 | 2 | 5 | 1 | ✔ swap | `[2, 4, 1, 5, 6]` |

`5` is now in its final place at index 3.

### Pass 3 — `end = 2` (compare indices 0…1)

| Step | i | `nums[i]` | `nums[i+1]` | swap? | array after the step |
|---:|---:|---:|---:|---|---|
| 8 | 0 | 2 | 4 | ✘ | `[2, 4, 1, 5, 6]` |
| 9 | 1 | 4 | 1 | ✔ swap | `[2, 1, 4, 5, 6]` |

### Pass 4 — `end = 1` (compare index 0 only)

| Step | i | `nums[i]` | `nums[i+1]` | swap? | array after the step |
|---:|---:|---:|---:|---|---|
| 10 | 0 | 2 | 1 | ✔ swap | `[1, 2, 4, 5, 6]` |

The outer loop ends (`end` has reached 0). Final array: **`[1, 2, 4, 5, 6]`**

## Java Solution

See [`BubbleSort.java`](./BubbleSort.java).

```java
public static int[] bubbleSort(int[] nums) {
    for (int end = nums.length - 1; end > 0; end--) {
        boolean swapped = false;
        for (int i = 0; i < end; i++) {
            if (nums[i] > nums[i + 1]) {
                int temp = nums[i];
                nums[i] = nums[i + 1];
                nums[i + 1] = temp;
                swapped = true;
            }
        }
        if (!swapped) {
            break;
        }
    }
    return nums;
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n²) worst, O(n) best | n(n−1)/2 comparisons; a sorted array exits after the first pass |
| **Space** | O(1) | Only a counter and a swap |

## Interview Notes

**Follow-ups to raise yourself:**
- *"Make it stable."* → bubble sort already is: equal elements are only swapped when
  `>` is true, never when they are equal.
- *"Why is it O(n²) when merge sort is O(n log n)?"* → bubble sort only knows how to
  move an element by **one position per pass**, so it needs O(n) passes.
- *"How would you detect that the array is already sorted?"* → the `swapped` flag.
- *"Can you make it faster?"* → cocktail shaker sort (bidirectional) or a
  "last swap position" optimisation that shrinks the pass boundary.

**Common mistakes:**
- ❌ Running the inner loop to `n - 1` on **every** pass → O(n²) even when sorted,
  and the last element is compared with a non-existent neighbour.
- ❌ Swapping when `nums[i] >= nums[i + 1]` → the sort is no longer stable.
- ❌ Forgetting the **early exit** → you always pay the full O(n²).
- ❌ Swapping `nums[i]` and `nums[i+1]` **after** incrementing `i` → off-by-one.

**How to narrate:**
> "Bubble sort makes repeated passes and swaps adjacent elements that are out of
> order. After each pass the largest remaining element is in its final position, so
> the next pass is one element shorter. I also keep a flag: if a pass performs no
> swap at all, the array is already sorted and I stop early. Worst case O(n²), best
> case O(n), and it's in place."

## Related Problems

- [Selection Sort](../../../../../../docs/topics/08-sorting.md) — the same O(n²), but only one swap per pass
- [Insertion Sort](../../../../../../docs/topics/08-sorting.md) — O(n²) but linear on nearly sorted data
- [Quick Sort](../../../../../../docs/topics/08-sorting.md) — the practical O(n log n) comparison sort
