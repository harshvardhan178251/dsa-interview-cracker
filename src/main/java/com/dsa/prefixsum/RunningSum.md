---
title: Running Sum of 1d Array
leetcode: 1480
difficulty: Easy
patterns: [Running sum, In-place accumulation]
companies: [Meta, Salesforce]
frequency: 2
tags: [prefix-sum, array]
sampleInput: |
  4
  1 2 3 4
sampleOutput: "1 3 6 10"
---

# Running Sum of 1d Array — LeetCode 1480

| | |
|---|---|
| **Difficulty** | Easy |
| **Pattern** | Running sum · In-place accumulation |
| **Interview heat** | ★★☆☆☆ |
| **Asked at** | Amazon, Google, Meta, Uber |

## Problem Statement

Given an array `nums`, return an array `result` where `result[i]` is the **running
(prefix) sum** of the original array up to and including index `i`:

```
result[i] = nums[0] + nums[1] + ... + nums[i]
```

## Input Format

```
n
nums[0] nums[1] ... nums[n-1]
```

- `n` — length of the array (1 ≤ n ≤ 10⁴)
- `nums` — n space-separated integers

## Sample Input

```
4
1 2 3 4
```

## Expected Output

```
1 3 6 10
```

## Approach — One Pass with an Accumulator

Keep a running total. At each index:

1. Add `nums[i]` to the accumulator.
2. Store the accumulator in `result[i]`.

The accumulator always holds the sum of the elements seen so far, so after the update it
*is* `result[i]`.

**The invariant to state out loud:** after processing index `i`, `accumulator` equals the
sum of `nums[0..i]`. That single sentence is the whole proof.

**In-place variant:** if the caller allows the input to be modified, write the
accumulator back into `nums[i]` — but you must read the *old* value first, so the order
`accumulator += nums[i]; nums[i] = accumulator;` matters.

## Dry Run

Input: `nums = [1, 2, 3, 4]`, `accumulator = 0`

| Step | `i` | `nums[i]` | `accumulator` before | `accumulator` after (= `result[i]`) | `result` after |
|---:|---:|---:|---:|---:|---|
| 1 | 0 | 1 | 0 | 0 + 1 = 1 | `[1]` |
| 2 | 1 | 2 | 1 | 1 + 2 = 3 | `[1, 3]` |
| 3 | 2 | 3 | 3 | 3 + 3 = 6 | `[1, 3, 6]` |
| 4 | 3 | 4 | 6 | 6 + 4 = 10 | `[1, 3, 6, 10]` |

Answer: **1 3 6 10**

## Java Solution

See [`RunningSum.java`](./RunningSum.java).

```java
public static int[] runningSum(int[] nums) {
    int[] result = new int[nums.length];
    int accumulator = 0;
    for (int i = 0; i < nums.length; i++) {
        accumulator += nums[i];
        result[i] = accumulator;
    }
    return result;
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n) | One pass, constant work per element |
| **Space** | O(n) | The result array (O(1) extra if written in place) |

## Interview Notes

**Follow-ups to raise yourself:**
- *"Do it in place."* → write the accumulator back into `nums` (see the note above about
  reading the old value first).
- *"How do you get the sum of a range from this?"* → `runningSum[right] -
  runningSum[left - 1]` — this is the prefix-sum table, and it is the same thing.
- *"What if the array is streamed and you only need the last running sum?"* → you only
  need the accumulator, O(1) memory.
- *"What if you need the running **product**?"* → same loop with `*=`; watch out for
  zeros.
- *"How does this relate to Kadane's algorithm?"* → Kadane keeps a running sum of a
  *window* that can restart; here the window always starts at 0.

**Common mistakes:**
- ❌ Storing the accumulator **before** adding `nums[i]` — the result is then shifted by
  one position.
- ❌ Forgetting to allocate a separate result array and accidentally returning a mutated
  input when the caller expected the original.
- ❌ Off-by-one in the loop (`i < nums.length` vs `i <= nums.length`).
- ❌ Re-deriving the sum from scratch for every element — that is O(n²).

**How to narrate:**
> "It's a single pass with an accumulator: I add the current value to the running total
> and store the total. The invariant is that after index i the accumulator equals the
> sum of elements 0 through i, so the stored value is exactly the running sum. O(n)
> time, and the result array is the only extra space."

## Related Problems

- [Range Sum Query — Immutable](RangeSumQuery.md) — queries built on this table
- [2D Prefix Sum](TwoDimensionalPrefixSum.md) — the two-dimensional version
- [Pivot Index](PivotIndex.md) — uses a running sum as the pivot test
