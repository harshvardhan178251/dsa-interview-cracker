---
title: Hamming Distance
leetcode: 461
difficulty: Easy
patterns: [XOR, Bit tricks]
companies: [Meta, Amazon, Facebook, Netflix, Zillow, Infosys, Tech Mahindra, Standard Chartered]
frequency: 4
tags: [bit-manipulation, math]
sampleInput: |
  1
  4
sampleOutput: "2"
---

# Hamming Distance — LeetCode 461

| | |
|---|---|
| **Difficulty** | Easy |
| **Pattern** | XOR · Bit tricks |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Uber, Apple |

## Problem Statement

Given two integers `x` and `y`, return the **Hamming distance** — the number of
corresponding bits that differ between them.

- `x = 1`, `y = 4` → `0001` vs `0100` → two bits differ → the answer is `2`.
- `x = 3`, `y = 3` → the answer is `0`.

## Input Format

The program reads from standard input:

```
x
y
```

- `x` — the first value (0 ≤ x ≤ 2³¹ − 1)
- `y` — the second value (0 ≤ y ≤ 2³¹ − 1)

## Sample Input

```
1
4
```

## Expected Output

```
2
```

## Approach — XOR, then count the set bits

XOR is bitwise "different": a bit of `x ^ y` is `1` exactly where `x` and `y` differ.
So the Hamming distance is the **population count** of `x ^ y` — and we already know how
to compute that with Kernighan's trick:

```java
int differing = x ^ y;
int count = 0;
while (differing != 0) {
    differing &= differing - 1;  // clear the lowest set bit
    count++;
}
```

**Two ideas, one line each.** XOR finds *where* the differences are; the `n & (n - 1)`
loop *counts* them without ever looking at a bit that is not set.

## Dry Run

Input: `x = 1 = 0001₂`, `y = 4 = 0100₂`

| Step | `x ^ y` (binary) | `differing - 1` | `differing & (differing - 1)` | `count` |
|---:|---|---|---|---:|
| 1 | `0101` | `0100` | `0100` | 1 |
| 2 | `0100` | `0011` | `0000` | **2** |

`differing` is now zero → the answer is **2** ✓

### The bit-by-bit picture

| bit | 3 | 2 | 1 | 0 |
|---|---:|---:|---:|---:|
| `x = 1` | 0 | 0 | 0 | 1 |
| `y = 4` | 0 | 1 | 0 | 0 |
| `x ^ y` | 0 | **1** | 0 | **1** |

Two set bits in the XOR → Hamming distance **2**.

## Java Solution

See [`HammingDistance.java`](./HammingDistance.java).

```java
public static int hammingDistance(int x, int y) {
    int differing = x ^ y;
    int count = 0;
    while (differing != 0) {
        differing &= differing - 1; // clear the lowest set bit
        count++;
    }
    return count;
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(k) where k = number of differing bits | One iteration per set bit (≤ 32) |
| **Space** | O(1) | A single counter |

## Interview Notes

**Follow-ups to raise yourself:**
- *"What if the inputs were 64-bit?"* → use `long`; the algorithm is unchanged.
- *"What if the inputs were strings?"* → compare character by character.
- *"How would you compute the Hamming distance between two very long bit vectors?"* →
  process 64 bits at a time with `Long.bitCount(a ^ b)`, or use the SIMD `popcount`
  instruction.
- *"What is the Hamming distance used for?"* → error-correcting codes (the parity bits of
  a Hamming code are exactly this technique), and the classic "find the unique number"
  interview variant.

**Common mistakes:**
- ❌ Using `&` instead of `^` → `x & y` marks the bits that are *equal* to 1.
- ❌ Using `|` instead of `^` → `x | y` marks every bit that is set in *either* number.
- ❌ Counting all 32 positions instead of only the set bits → the answer would be the
  number of positions, not the number of differences.
- ❌ Forgetting that the width matters → `1` and `4` differ in two positions within
  32 bits, not in 3.

**How to narrate:**
> "XOR marks every bit where the two numbers differ, so the Hamming distance is just the
> number of set bits in `x ^ y`. I count them with Kernighan's trick — `n & (n - 1)` clears
> the lowest set bit — so the loop runs once per differing bit rather than 32 times."

## Related Problems

- [Single Number](./SingleNumber.java) — XOR fundamentals
- [CountSetBits](./CountSetBits.java) — the counting routine on its own
- [Reverse Bits](./ReverseBits.java) — bit-level manipulation
