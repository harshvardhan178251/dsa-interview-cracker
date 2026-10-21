---
title: Counting Bits
leetcode: 338
difficulty: Easy
patterns: [Bit tricks, Dynamic programming]
companies: [Amazon, Google, Meta, Uber]
frequency: 3
tags: [bit-manipulation, dynamic-programming, numbers]
sampleInput: |
  5
sampleOutput: "0 1 1 2 1 2"
---

# Counting Bits — LeetCode 338

| | |
|---|---|
| **Difficulty** | Easy |
| **Pattern** | Bit tricks · Dynamic programming |
| **Interview heat** | ★★★☆☆ |
| **Asked at** | Amazon, Google, Meta, Uber |

## Problem Statement

Given a non-negative integer `n`, return an array `ans` of length `n + 1` where
`ans[i]` is the number of set bits in the binary representation of `i`.

- `n = 5` → `[0, 1, 1, 2, 1, 2]` (for `0, 1, 2, 3, 4, 5`).

## Input Format

The program reads from standard input:

```
n
```

- `n` — a non-negative integer (0 ≤ n ≤ 10⁵)

## Sample Input

```
5
```

## Expected Output

```
0 1 1 2 1 2
```

## Approach — Halve the number and reuse the answer

Every positive integer is either `2k` or `2k + 1`:

- `2k` is `k` shifted left by one bit, so it has exactly the **same** number of set bits
  as `k` — i.e. `ans[2k] = ans[k]`.
- `2k + 1` is `k` shifted left with a `1` appended, so it has **one more** set bit —
  `ans[2k + 1] = ans[k] + 1`.

Both cases are the single formula:

```java
ans[i] = ans[i >> 1] + (i & 1);
```

`i >> 1` is always smaller than `i` (for `i >= 1`), so filling the array from `1` upwards
always reads an already-computed value. Total work: O(n), one pass, no bit tricks beyond
the shift and the mask.

## Dry Run

Input: `n = 5`

| i | `i` in binary | `i >> 1` | `ans[i >> 1]` | `i & 1` | `ans[i]` |
|---:|---|---:|---:|---:|---:|
| 0 | `000` | — | — | — | **0** (base case) |
| 1 | `001` | 0 | 0 | 1 | **1** |
| 2 | `010` | 1 | 1 | 0 | **1** |
| 3 | `011` | 1 | 1 | 1 | **2** |
| 4 | `100` | 2 | 1 | 0 | **1** |
| 5 | `101` | 2 | 1 | 1 | **2** |

Result: `[0, 1, 1, 2, 1, 2]`

### The array as it grows

| i | binary | `ans[i]` | reasoning |
|---:|---|---:|---|
| 0 | `0000` | 0 | zero has no set bits |
| 1 | `0001` | 1 | `ans[0] + 1` |
| 2 | `0010` | 1 | `ans[1] + 0` — a left shift keeps the count |
| 3 | `0011` | 2 | `ans[1] + 1` |
| 4 | `0100` | 1 | `ans[2] + 0` |
| 5 | `0101` | 2 | `ans[2] + 1` |
| 6 | `0110` | 2 | `ans[3] + 0` |
| 7 | `0111` | 3 | `ans[3] + 1` |

## Java Solution

See [`NumberOfSetBits.java`](./NumberOfSetBits.java).

```java
public static int[] countBits(int n) {
    int[] result = new int[n + 1];
    for (int i = 1; i <= n; i++) {
        result[i] = result[i >> 1] + (i & 1);
    }
    return result;
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n) | One pass, O(1) per value |
| **Space** | O(n) | The answer array itself |

## Interview Notes

**Follow-ups to raise yourself:**
- *"Can you do it in O(1) extra space?"* → no, you must return n + 1 values; the output
  array is the space.
- *"What if you wanted the counts for all values up to 2³²?"* → the same idea, but the
  array no longer fits in memory; process in blocks or use the formula
  `popcount(i) = popcount(i & 0xFFFF) + popcount(i >>> 16)`.
- *"How does this relate to `Integer.bitCount`?"* → that is the hardware instruction; this
  DP is the software equivalent that also produces *every* count at once.
- *"What is the total number of set bits from 0 to n?"* → sum the array; there is a closed
  form using the per-bit-cycle counts.

**Common mistakes:**
- ❌ Starting the loop at `i = 0` → `result[0] = result[0] + 0` reads an unwritten value
  (harmless here, but the loop must start at 1 conceptually).
- ❌ Forgetting the `+ 1` for odd numbers → `ans[3]` would be `1` instead of `2`.
- ❌ Using `i / 2` and `i % 2` instead of `i >> 1` and `i & 1` → equivalent, but the bit
  form is what the name of the problem suggests.
- ❌ Allocating an array of length `n` instead of `n + 1` → `ans[n]` would be out of
  bounds.

**How to narrate:**
> "Every positive number is `2k` or `2k + 1`. Shifting left by one doesn't change the number
> of set bits, and `2k + 1` adds exactly one. So `ans[i] = ans[i >> 1] + (i & 1)`, and
> because `i >> 1` is always smaller than `i` I can fill the array in one forward pass — O(n)
> time, one pass."

## Related Problems

- [Number of 1 Bits](./CountSetBits.java) — the count for a single value
- [Power of Two](./PowerOfTwo.java) — a single-bit special case
- [XOR of All Elements](./XOROfArrayElements.java) — bitwise folding over an array
