---
title: Gray Code
leetcode: 89
difficulty: Medium
patterns: [Bit tricks, XOR]
companies: [Amazon, Adobe, Salesforce]
frequency: 3
tags: [bit-manipulation, numbers, math]
sampleInput: |
  2
sampleOutput: "0 1 3 2"
---

# Gray Code — LeetCode 89

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Bit tricks · XOR |
| **Interview heat** | ★★★☆☆ |
| **Asked at** | Amazon, Google, Meta, Uber, Apple |

## Problem Statement

An `n`-bit **Gray code** is a sequence of `2^n` integers that

- contains every integer from `0` to `2^n - 1` exactly once, and
- has the property that **consecutive entries differ in exactly one bit**.

Given the bit width `n`, return the Gray code sequence of length `2^n`.

- `n = 2` → `[0, 1, 3, 2]`.
- `n = 1` → `[0, 1]`.
- `n = 3` → `[0, 1, 3, 2, 6, 7, 5, 4]`.

## Input Format

The program reads from standard input:

```
n
```

- `n` — the bit width (0 ≤ n ≤ 16)

## Sample Input

```
2
```

## Expected Output

```
0 1 3 2
```

## Approach — The binary-reflected Gray code

The **i-th** value of the Gray code is simply

```
gray(i) = i XOR (i >> 1)
```

XOR-ing a number with its own right shift is exactly what makes consecutive entries differ
in a single bit:

- `i` and `i + 1` differ in the low bits; after the shift and the XOR, all but one of
  those differences cancel out.
- Equivalently: `gray(i)` and `gray(i + 1)` differ exactly in the position of the
  lowest set bit of `i + 1`.

**Why the sequence is a permutation.** `gray(i) = i ^ (i >> 1)` is invertible:
`i = gray(i) ^ (gray(i) >> 1) ^ (gray(i) >> 2) ^ …`. Since the transformation is a
bijection on `n`-bit values, the `2^n` Gray values are exactly `0 .. 2^n - 1` in some
order.

**Why it is called *binary-reflected*.** The sequence is built by reflecting the previous
one: `G(n) = [0G(n-1), 1 reverse(G(n-1))]`. The formula above produces exactly that.

## Dry Run

Input: `n = 2` → the sequence has `2² = 4` entries

| i | `i` (binary) | `i >> 1` (binary) | `i ^ (i >> 1)` (binary) | `gray(i)` |
|---:|---|---|---|---:|
| 0 | `00` | `00` | `00` | **0** |
| 1 | `01` | `00` | `01` | **1** |
| 2 | `10` | `01` | `11` | **3** |
| 3 | `11` | `01` | `10` | **2** |

Result: `[0, 1, 3, 2]`

### The one-bit-difference check

| pair | binary | differing bits |
|---|---|---|
| `0` → `1` | `00` → `01` | one (bit 0) |
| `1` → `3` | `01` → `11` | one (bit 1) |
| `3` → `2` | `11` → `10` | one (bit 0) |

### The recursive picture — `G(n) = [0G(n-1), 1 reverse(G(n-1))]`

```
G(0) = [0]
G(1) = [0, 1]
G(2) = [ 0 0, 0 1, 1 1, 1 0 ]  =  [0, 1, 3, 2]
G(3) = [ 0 0, 0 1, 0 3, 0 2 ,  1 2, 1 3, 1 1, 1 0 ]  =  [0, 1, 3, 2, 6, 7, 5, 4]
```

The second half is the first half **reversed** with a `1` prefix — that is the "binary
reflection". The formula `gray(i) = i ^ (i >> 1)` produces exactly this sequence:

| i | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| `i` | `000` | `001` | `010` | `011` | `100` | `101` | `110` | `111` |
| `i >> 1` | `000` | `000` | `001` | `001` | `010` | `010` | `011` | `011` |
| `i ^ (i >> 1)` | `000` | `001` | `011` | `010` | `110` | `111` | `101` | `100` |

## Java Solution

See [`GrayCode.java`](./GrayCode.java).

```java
public static int[] grayCode(int n) {
    int size = 1 << n; // 2^n entries
    int[] result = new int[size];
    for (int i = 0; i < size; i++) {
        result[i] = i ^ (i >> 1);
    }
    return result;
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(2ⁿ) | One entry per value in the range |
| **Space** | O(2ⁿ) | The result array |

## Interview Notes

**Follow-ups to raise yourself:**
- *"Prove it is a permutation."* → the transform is invertible: `i` can be recovered from
  `gray(i)` by XOR-ing all of its right shifts.
- *"Prove consecutive entries differ in one bit."* → `gray(i) ^ gray(i + 1)` equals the
  lowest set bit of `i + 1` — one bit, always.
- *"What is the Gray code of a large number?"* → `n ^ (n >> 1)` — O(1).
- *"Where is Gray code used?"* → it is the standard way to minimise the number of bit
  flips in hardware (e.g. the rotary encoders on old chessboards, and Gray-coded counters
  in electronics), because consecutive values differ in one bit.

**Common mistakes:**
- ❌ Returning only `n` entries instead of `2^n` → the problem asks for the whole sequence.
- ❌ Using `i >> 1` on the *previous* value instead of on `i`.
- ❌ Forgetting that `n` is the **bit width**, so `n = 2` gives 4 values.
- ❌ Building the sequence recursively and getting the reflection order wrong → the second
  half is the *reverse* of the first half with a `1` prefix.

**How to narrate:**
> "The i-th Gray code value is `i ^ (i >> 1)`. XOR-ing a number with its own right shift
> is what makes consecutive entries differ in exactly one bit, and the transform is
> invertible, so the 2^n values are a permutation of the range. I just fill the array with
> that formula — O(2^n) time."

## Related Problems

- [Reverse Bits](./ReverseBits.java) — another bit permutation
- [Single Number](./SingleNumber.java) — XOR fundamentals
- [Number of 1 Bits](./NumberOfSetBits.java) — counting set bits
