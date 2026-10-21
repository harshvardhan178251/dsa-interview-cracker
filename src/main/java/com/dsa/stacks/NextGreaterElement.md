---
title: Next Greater Element
leetcode: 496
difficulty: Easy
patterns: [Monotonic stack]
companies: [Amazon, Google, Meta, Microsoft, Uber, Bloomberg]
frequency: 4
tags: [stack, monotonic-stack, array]
sampleInput: |
  4
  1 2 1 4
sampleOutput: "2 4 4 -1"
---

# Next Greater Element — LeetCode 496

| | |
|---|---|
| **Difficulty** | Easy |
| **Pattern** | Monotonic stack |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Microsoft, Uber, Bloomberg |

## Problem Statement

Given an array of integers, for every element return the **first** element to its right that
is strictly greater than it, or `-1` if no such element exists.

- `[1, 2, 1, 4]` → `[2, 4, 4, -1]`
  - the first `1` is followed by the `2`,
  - the `2` is followed by the `4`,
  - the second `1` is also followed by the `4`,
  - the `4` has nothing greater after it.
- `[5, 4, 3, 2, 1]` → `[-1, -1, -1, -1, -1]`

## Input Format

The program reads from standard input:

```
n
values[0] values[1] ... values[n-1]
```

- `n` — the length of the array (1 ≤ n ≤ 10⁴)
- `values` — n space-separated integers

## Sample Input

```
4
1 2 1 4
```

## Expected Output

```
2 4 4 -1
```

## Approach — Monotonic Decreasing Stack

The brute force is O(n²): for every element, scan to the right until you find a bigger one.
The stack version does it in O(n) by **deferring** the questions.

Keep a stack of **indices** whose answers are still unknown. The values on the stack are in
**decreasing** order from bottom to top — that is the invariant.

For each new value `nums[i]`:

1. While the stack is not empty and `nums[stack.top()] < nums[i]`, the current value is the
   first greater element for the index on top → pop it and write the answer.
2. Push `i`.

The loop repeats because one value can be the answer for **several** waiting elements.

**Why the stack stays decreasing:** if `nums[i]` is greater than the top, the top is
finished. But if a smaller value sits below a bigger one on the stack, the bigger one would
already have been popped when it was pushed. So the stack is always sorted, and the
comparison at the top is enough.

**Why each index is pushed and popped at most once:** the total work is O(n), not O(n²).

## Dry Run

Input: `[1, 2, 1, 4]`, stack shown as **values (top → bottom)**

| Step | i | `nums[i]` | stack before | popped (index, value) | stack after | answers so far |
|---:|---:|---:|---|---|---|---|
| 1 | 0 | `1` | `[]` | — | `[1]` | `[-1]` |
| 2 | 1 | `2` | `[1]` | `0` (1 < 2) | `[2]` | `[2, -1]` |
| 3 | 2 | `1` | `[2]` | — (2 ≥ 1) | `[2, 1]` | `[2, -1, -1]` |
| 4 | 3 | `4` | `[2, 1]` | `2` (1 < 4), then `1` (2 < 4) | `[4]` | `[2, 4, 4, -1]` |

The stack ends with the one element that never found a greater neighbour. ✓

## Java Solution

See [`NextGreaterElement.java`](./NextGreaterElement.java).

```java
public static int[] nextGreaterElements(int[] nums) {
    int[] result = new int[nums.length];
    Arrays.fill(result, -1);
    Deque<Integer> stack = new ArrayDeque<>();

    for (int i = 0; i < nums.length; i++) {
        while (!stack.isEmpty() && nums[stack.peek()] < nums[i]) {
            result[stack.pop()] = nums[i];
        }
        stack.push(i);
    }
    return result;
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n) | Every index is pushed once and popped at most once |
| **Space** | O(n) | The stack can hold the whole array (strictly decreasing input) |

## Interview Notes

**Follow-ups to raise yourself:**
- *"The array is circular."* → traverse it twice — see
  [Next Greater Element II](NextGreaterElementII.md).
- *"Find the number of days until a warmer day."* → the same stack, but the answer is the
  **distance** instead of the value — see
  [Daily Temperatures](DailyTemperatures.md).
- *"Find the next greater element in an array of strings."* → the same algorithm with a
  custom comparison.
- *"Find the next smaller element."* → flip the comparison.

**Common mistakes:**
- ❌ Using `<=` instead of `<` → equal elements are treated as "greater", which is wrong for
  a *strictly* greater requirement.
- ❌ Storing the **values** instead of the **indices** in the stack → you cannot compute the
  distance for the "days" variant, and you lose the position of the answer.
- ❌ Popping only **one** element per step → one value can be the answer for many elements;
  the `while` loop is essential.

**How to narrate:**
> "Brute force is O(n²). Instead I keep a stack of indices whose answer is still unknown,
> with the values decreasing from bottom to top. For each new value I pop every index whose
> value is smaller — the current value is the first greater element for all of them — and
> then push the new index. Each index is pushed and popped at most once, so it is O(n)."

## Related Problems

- [Next Greater Element II](NextGreaterElementII.md) — the circular version
- [Daily Temperatures](DailyTemperatures.md) — the distance instead of the value
- [Largest Rectangle in Histogram](LargestRectangleInHistogram.md) — the same idea, used differently
