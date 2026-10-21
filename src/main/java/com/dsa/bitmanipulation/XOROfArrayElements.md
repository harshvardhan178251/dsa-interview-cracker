---
title: XOR of All Elements
leetcode: 1486
difficulty: Easy
patterns: [XOR, Bit tricks]
companies: [Google, Uber, Microsoft]
frequency: 3
tags: [array, bit-manipulation, xor]
sampleInput: |
  4
  1 2 3 4
sampleOutput: "4"
---

# XOR of All Elements — LeetCode 1486

| | |
|---|---|
| **Difficulty** | Easy |
| **Pattern** | XOR · Bit tricks |
| **Interview heat** | ★★★☆☆ |
| **Asked at** | Amazon, Google, Meta, Uber, Apple |

## Problem Statement

Given an integer array `nums`, return the **bitwise XOR of all** of its elements.

- The XOR of a list is obtained by folding with `^`.
- `[1, 2, 3, 4]` → `1 ^ 2 ^ 3 ^ 4 = 4`.
- `[0]` → `0`.

## Input Format

The program reads from standard input:

```
n
nums[0] nums[1] ... nums[n-1]
```

- `n` — length of the array (1 ≤ n ≤ 10⁵)
- `nums` — n space-separated integers

## Sample Input

```
4
1 2 3 4
```

## Expected Output

```
4
```

## Approach — Fold the array with XOR

XOR is associative and commutative, so the order of the elements is irrelevant and the
array can simply be folded:

```java
int result = 0;
for (int num : nums) {
    result ^= num;
}
```

**Two useful corollaries.**

1. `x ^ x = 0` — every value that appears an **even** number of times cancels out, and
   every value that appears an **odd** number of times survives.
2. `x ^ 0 = x` — starting the accumulator at `0` is safe.

So for `[1, 2, 3, 4]` nothing cancels (each value appears once) and the result is
`1 ^ 2 ^ 3 ^ 4 = 4`.

## Dry Run

Input: `nums = [1, 2, 3, 4]`, running XOR starts at `0`

| Step | i | `nums[i]` | running XOR (binary) | running XOR (decimal) |
|---:|---:|---:|---|---:|
| 1 | 0 | 1 | `0000 ^ 0001` = `0001` | 1 |
| 2 | 1 | 2 | `0001 ^ 0010` = `0011` | 3 |
| 3 | 2 | 3 | `0011 ^ 0011` = `0000` | 0 |
| 4 | 3 | 4 | `0000 ^ 0100` = `0100` | **4** |

Result: **4** ✓

### The same fold, grouped by pairs

```
1 ^ 2 ^ 3 ^ 4
= (1 ^ 3) ^ (2 ^ 4)          (regrouping — XOR is associative and commutative)
= 2 ^ 6
= 4
```

## Java Solution

See [`XOROfArrayElements.java`](./XOROfArrayElements.java).

```java
public static int xorAll(int[] nums) {
    int result = 0;
    for (int num : nums) {
        result ^= num;
    }
    return result;
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n) | One pass |
| **Space** | O(1) | A single accumulator |

## Interview Notes

**Follow-ups to raise yourself:**
- *"What if every element except one appears twice?"* → the survivor is the XOR; see
  [Single Number](./SingleNumber.java).
- *"What if exactly two elements appear once?"* → XOR gives `a ^ b`; split by a differing
  bit; see [Single Number III](./SingleNumberIII.java).
- *"How would you compute the XOR of a huge array without holding it in memory?"* → fold
  as the values stream in; the accumulator is one integer.
- *"What if you wanted the XOR of all *subarrays*?"* → use the prefix-XOR identity: the
  XOR of the subarray `[l, r]` is `prefix[r] ^ prefix[l-1]`, and the XOR over all subarrays
  can be computed from the frequency of each prefix value.

**Common mistakes:**
- ❌ Using `|=` instead of `^=` → OR does not cancel duplicates.
- ❌ Initialising the accumulator with `nums[0]` and then looping from `nums[0]` again →
  the first element would be XORed twice and cancel itself out.
- ❌ Forgetting that XOR is order-independent → some candidates try to sort first.
- ❌ Using `long` for the result but returning an `int` → the values are 32-bit ints here.

**How to narrate:**
> "XOR is associative and commutative, so I can fold the whole array in one pass. The handy
> property is that `x ^ x = 0`, which means duplicated values cancel out — the result is
> the XOR of exactly the values that appear an odd number of times."

## Related Problems

- [Single Number](./SingleNumber.java) — the classic use of XOR cancellation
- [Single Number III](./SingleNumberIII.java) — two survivors
- [Hamming Distance](./HammingDistance.java) — XOR plus a bit count
