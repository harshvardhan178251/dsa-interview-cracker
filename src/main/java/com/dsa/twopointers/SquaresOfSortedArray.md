---
title: Squares of a Sorted Array
leetcode: 977
difficulty: Easy
patterns: [Two Pointers, Sorted array]
companies: [Amazon, Meta, Google, Microsoft, Uber, Facebook]
frequency: 4
tags: [array, two-pointers, sorting]
sampleInput: |
  5
  -4 -1 0 3 10
sampleOutput: "0 1 9 16 100"
---

# Squares of a Sorted Array — LeetCode 977

| | |
|---|---|
| **Difficulty** | Easy |
| **Pattern** | Two Pointers · Sorted array |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Meta, Google, Microsoft, Uber, Facebook |

## Problem Statement

Given an integer array `nums` sorted in **non-decreasing** order, return an array of the
**squares** of the numbers, also in non-decreasing order.

For `nums = [-4, -1, 0, 3, 10]` the squares are `[16, 1, 0, 9, 100]` and the sorted
answer is `[0, 1, 9, 16, 100]`.

## Input Format

The program reads from standard input:

```
n
nums[0] nums[1] ... nums[n-1]
```

- `n` — length of the array (1 ≤ n ≤ 10⁴)
- `nums` — n space-separated integers in **ascending** order (-10⁴ ≤ nums[i] ≤ 10⁴)

The program prints the n squares separated by single spaces on one line.

## Sample Input

```
5
-4 -1 0 3 10
```

## Expected Output

```
0 1 9 16 100
```

## Approach — Two pointers filling the result from the back

The largest square always comes from one of the two **ends** of the array:

- the **right** end holds the largest number, and
- the **left** end holds the most negative number, whose square is also large.

So two pointers walking inwards from both ends can produce the squares **in sorted
order** — if they are written into the result **from the back**.

Each step compares the two candidate squares, writes the larger one at the current write
position and moves that pointer inwards.

**Why no sorting is needed:** the squares of a sorted array are sorted except that the
negative part is reversed; merging the two monotone halves from the outside in is
exactly what the two pointers do.

## Dry Run

Input: `nums = [-4, -1, 0, 3, 10]`

| Step | left | right | left² | right² | write | action | result |
|---:|---:|---:|---:|---:|---:|---|---|
| 1 | 0 (-4) | 4 (10) | 16 | 100 | 4 | right² is larger → `result[4] = 100`, `right--` | `[_, _, _, _, 100]` |
| 2 | 0 (-4) | 3 (3) | 16 | 9 | 3 | left² is larger → `result[3] = 16`, `left++` | `[_, _, _, 16, 100]` |
| 3 | 1 (-1) | 3 (3) | 1 | 9 | 2 | right² is larger → `result[2] = 9`, `right--` | `[_, _, 9, 16, 100]` |
| 4 | 1 (-1) | 2 (0) | 1 | 0 | 1 | left² is larger → `result[1] = 1`, `left++` | `[_, 1, 9, 16, 100]` |
| 5 | 2 (0) | 2 (0) | 0 | 0 | 0 | equal → `result[0] = 0`, `right--` | `[0, 1, 9, 16, 100]` |

The result is sorted and every element was written exactly once ✓

## Java Solution

See [`SquaresOfSortedArray.java`](./SquaresOfSortedArray.java).

```java
int left = 0;
int right = n - 1;
int write = n - 1;
while (left <= right) {
    int leftSquare = nums[left] * nums[left];
    int rightSquare = nums[right] * nums[right];
    if (leftSquare > rightSquare) {
        result[write--] = leftSquare;
        left++;
    } else {
        result[write--] = rightSquare;
        right--;
    }
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n) | every element is read once |
| **Space** | O(n) for the result | the input is not modified |

## Interview Notes

**Follow-ups to raise yourself:**
- *"What if the array is not sorted?"* → sort it first, or use a max-heap of the
  absolute values.
- *"Can you do it in place?"* → only with extra care: the squares overwrite the input
  while it is still being read. It is possible (process from both ends) but easy to get
  wrong.
- *"What if the values are floats?"* → the same algorithm; watch out for `0.0` and
  negative zero.
- *"How would you find the k-th smallest square?"* → the same two-pointer scan, but stop
  after k writes.

**Common mistakes:**
- ❌ Writing the squares from the **front** → the result comes out in decreasing order.
- ❌ Forgetting that the **left** square is the square of a *negative* number (the sign
  disappears) → the comparison uses `nums[left] * nums[left]`, not `nums[left]`.
- ❌ Using `left < right` instead of `left <= right` → the middle element is never
  written.
- ❌ Sorting the squares instead of using two pointers → O(n log n) instead of O(n).

**How to narrate:**
> "The largest square is always at one of the two ends — the biggest number or the most
> negative number. So I walk two pointers inwards from both ends and write the larger
> square into the result **from the back**. That keeps the result sorted without any
> sorting step. O(n) time."

## Related Problems

- [Two Sum II - Input Array Is Sorted](TwoSumII.md) — the same pointer pattern
- [Container With Most Water](ContainerWithMostWater.md) — two pointers with a greedy move
- [Merge Two Sorted Arrays](../../../../../../docs/topics/01-arrays.md) — the same idea, merging instead of squaring
- [Valid Palindrome](ValidPalindrome.md) — two pointers over a string
