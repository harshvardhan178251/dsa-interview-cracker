---
title: Missing Number
leetcode: 268
difficulty: Easy
patterns: [Arithmetic, XOR trick]
companies: [Amazon, Uber, Microsoft]
frequency: 3
tags: [array, math, bit-manipulation]
sampleInput: |
  3
  0 1 3
sampleOutput: "2"
---

# Missing Number — LeetCode 268

| | |
|---|---|
| **Difficulty** | Easy |
| **Pattern** | Arithmetic · XOR trick |
| **Interview heat** | ★★★☆☆ |
| **Asked at** | Amazon, Google, Meta, Uber, Airbnb |

## Problem Statement

Given an array `nums` containing `n` **distinct** integers taken from the range
`0 .. n` (inclusive), return the single number that is missing from it.

Exactly one value of the range is absent, and every other value appears exactly once.

## Input Format

```
n
nums[0] nums[1] ... nums[n-1]
```

- `n` — length of the array (1 ≤ n ≤ 10⁴)
- `nums` — n distinct integers from `0 .. n-1`

## Sample Input

```
3
0 1 3
```

## Expected Output

```
2
```

`2` is the only value of `0..2` that is not present.

## Approach — Subtract from the Expected Sum

The full range `0 .. n` has the well-known sum

```
0 + 1 + ... + n = n(n+1) / 2
```

The array contains every one of those values **except one**, so

```
missing = n(n+1)/2 − sum(nums)
```

**The XOR variant** is the one interviewers like. XOR all the values of the array
together with all the indices `0 .. n`:

```
missing = (0 ^ 1 ^ ... ^ n) ^ (nums[0] ^ nums[1] ^ ... ^ nums[n-1])
```

Every value that appears in both halves cancels out (`x ^ x == 0`), leaving only the
missing number. XOR also avoids the overflow that `n(n+1)/2` can cause for very large
`n`.

## Dry Run

Input: `nums = [0, 1, 3]`, `n = 3`

Expected sum of the range `0 .. 3`: `n(n+1)/2 = 3 * 4 / 2 = 6`

| Step | i | `nums[i]` | `actual` before | `actual` after | `expected` | `expected - actual` |
|---:|---:|---:|---:|---:|---:|---:|
| 1 | 0 | 0 | 0 | 0 | 6 | 6 |
| 2 | 1 | 1 | 0 | 1 | 6 | 5 |
| 3 | 2 | 3 | 1 | 4 | 6 | 2 |

Final answer: `expected (6) − actual (4) = 2` ✓ — the only value of `0..3` that is not
in `[0, 1, 3]`.

## Java Solution

See [`MissingNumber.java`](./MissingNumber.java).

```java
public static int missingNumber(int[] nums) {
    int n = nums.length;
    int expected = n * (n + 1) / 2;
    int actual = 0;
    for (int value : nums) {
        actual += value;
    }
    return expected - actual;
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n) | One pass over the array |
| **Space** | O(1) | Two accumulators |

## Interview Notes

**Follow-ups to raise yourself:**
- *"What if the array can contain duplicates?"* → the sum trick breaks; you need a
  frequency array or a set, and the answer is the value in the range that is under-used.
- *"What if the range is `1..n` instead of `0..n-1`?"* → the formula becomes
  `n(n+1)/2 - sum`, and the XOR variant XORs the indices `1..n` instead of `0..n-1`.
- *"Why XOR and not subtraction?"* → XOR cannot overflow, and it is the classic
  "every value appears twice except one" trick, which generalises to other frequencies.
- *"Can you do it in one pass without a second loop over the range?"* → yes, that is
  what the code does — the range sum is a closed form, so only the array is scanned.
- *"What if the array is huge and streamed?"* → same, it is a single O(1)-memory pass.

**Common mistakes:**
- ❌ Using `n(n-1)/2` when the range is `0..n` — off by one. The formula must match the
  range the values come from.
- ❌ Initialising `expected` with `n` and then adding `0..n-1` — that double counts.
- ❌ Forgetting the special case `n = 1` (the range is `0..1`, so the answer is `0` or
  `1`) — the formula still works, but hand-written XOR loops often forget `0`.

**How to narrate:**
> "The complete range sums to a closed form, so I can subtract the array's sum from the
> expected sum and the difference is the missing number. If I wanted to avoid overflow
> I'd use the XOR variant: XOR the array with all the indices, and every value that
> appears in both cancels out, leaving the missing one."

## Related Problems

- [Two Sum](TwoSum.md) — complements and hash maps
- [Find Minimum and Maximum Element](FindMinimumAndMaximumElement.md) — the single-pass scan
- [Rotate Array](RotateArray.md) — another "one value is out of place" family
