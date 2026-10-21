---
title: Reverse Bits
leetcode: 190
difficulty: Easy
patterns: [Bit tricks, Shifts]
companies: [Amazon, Google, Apple, Goldman Sachs, Spotify, TCS, HCLTech, Bosch]
frequency: 4
tags: [bit-manipulation, numbers]
sampleInput: |
  43261596
sampleOutput: "964176192"
---

# Reverse Bits — LeetCode 190

| | |
|---|---|
| **Difficulty** | Easy |
| **Pattern** | Bit tricks · Shifts |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Uber, Apple |

## Problem Statement

Given an unsigned 32-bit integer `n`, return the integer whose binary representation is the
**reverse** of `n`'s binary representation.

- The input is treated as exactly 32 bits, so leading zeros become trailing zeros.
- `43261596 = 00000010100101000001111010011100₂` → the answer is
  `964176192 = 00111001011110000010100101000000₂`.
- `4294967293 = 11111111111111111111111111111101₂` → the answer is `3221225471`.

## Input Format

The program reads from standard input:

```
n
```

- `n` — a non-negative integer (0 ≤ n ≤ 2³¹ − 1)

## Sample Input

```
43261596
```

## Expected Output

```
964176192
```

## Approach — Walk the bits from the bottom up

The reversed number is built one bit at a time, from the **least significant** bit of the
input:

```java
result = (result << 1) | (n & 1);
n >>>= 1;
```

Each iteration shifts `result` left by one (making room) and OR-s in the current low bit
of `n`. After 32 iterations `result` holds the reversed 32-bit value.

**Why exactly 32 iterations.** The input is an *unsigned* 32-bit number, so its binary
representation has 32 positions even when the value is small. `5 = 000000...00000101₂`
reverses to `101000...00000000₂ = 6710886400` — a number **larger** than
`Integer.MAX_VALUE`.

**Why the result is a `long`.** The reversed value can be up to 2³² − 1 = 4294967295, which
does not fit in a signed 32-bit `int`. The method returns a `long` so the full range is
representable.

**Why `>>>` and not `>>`.** `>>` is an *arithmetic* shift: it copies the sign bit, so a
negative number would stay negative forever. `>>>` is a *logical* shift that always brings
a zero into the top bit.

## Dry Run

Input: `n = 43261596 = 00000010100101000001111010011100₂`

| Step | bit taken (`n & 1`) | `result` before | `result` after (`<< 1` then `\| bit`) | `result` in binary |
|---:|---:|---:|---:|---|
| 1 | 0 | 0 | 0 | `0000…0` |
| 2 | 0 | 0 | 0 | `0000…0` |
| 3 | 0 | 0 | 0 | `0000…0` |
| 4 | 1 | 0 | 1 | `0000…1` |
| 5 | 1 | 1 | 3 | `0000…11` |
| 6 | 1 | 3 | 7 | `0000…111` |
| 7 | 0 | 7 | 14 | `0000…1110` |
| 8 | 1 | 14 | 29 | `0000…11101` |
| 9 | 1 | 29 | 59 | `0000…111011` |
| 10 | 0 | 59 | 118 | `0000…1110110` |
| … | … | … | … | … |
| 32 | 0 | 476043904 | **964176192** | `00111001011110000010100101000000` |

Reading the input's bits from the bottom up and appending them to the right of `result`
produces exactly the reversed bit string.

### The bit strings, end to end

| | 32-bit binary | decimal |
|---|---|---:|
| input | `00000010100101000001111010011100` | 43 261 596 |
| reversed | `00111001011110000010100101000000` | **964 176 192** |

Checking the other direction: `964176192 = 00111001011110000010100101000000₂`, and
reversing *that* gives `00000010100101000001111010011100₂ = 43261596` ✓

### The first ten steps in detail

| Step | `n` (binary, remaining bits) | `n & 1` | `result << 1` | `result` |
|---:|---|---:|---:|---:|
| 1 | `00000010100101000001111010011100` | 0 | 0 | 0 |
| 2 | `00000001010010100000111101001110` | 0 | 0 | 0 |
| 3 | `000000001010010100000011110100111` | 0 | 0 | 0 |
| 4 | `00000000010100101000001111010011` | 1 | 0 | 1 |
| 5 | `00000000001010010100000111101001` | 1 | 2 | 3 |
| 6 | `00000000000101001010000011110100` | 1 | 6 | 7 |
| 7 | `00000000000010100101000001111010` | 0 | 14 | 14 |
| 8 | `00000000000001010010100000111101` | 1 | 28 | 29 |
| 9 | `00000000000000101001010000011110` | 1 | 58 | 59 |
| 10 | `00000000000000010100101000001111` | 0 | 118 | 118 |

## Java Solution

See [`ReverseBits.java`](./ReverseBits.java).

```java
public static long reverseBits(int n) {
    long result = 0;
    for (int i = 0; i < 32; i++) {
        result = (result << 1) | (n & 1);
        n >>>= 1; // unsigned shift keeps the sign bit out of the way
    }
    return result;
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(32) = O(1) | Exactly 32 iterations |
| **Space** | O(1) | Two variables |

## Interview Notes

**Follow-ups to raise yourself:**
- *"What if the width were 64 bits?"* → loop 64 times and keep the accumulator in a `long`.
- *"Can you do it without a loop?"* → yes, with a sequence of masks:
  `((n & 0x55555555) << 1) | ((n >> 1) & 0x55555555)`, then 0x33333333, then 0x0F0F0F0F,
  then 0x00FF00FF, then 0x0000FFFF. Each step swaps adjacent bit pairs.
- *"Why not just convert to a string and reverse it?"* → you would, but then you have to
  handle the width (leading zeros) and the conversion is slower.
- *"How would you reverse the bits of a byte in a byte array?"* → the classic
  `0xF0 | 0xCC | 0xAA | 0x55` nibble-swap trick.

**Common mistakes:**
- ❌ Looping only while `n != 0` → the leading zeros of the 32-bit representation would be
  lost, so `5` would give `160` instead of `6710886400`.
- ❌ Using `>>` instead of `>>>` → a negative input would never terminate.
- ❌ Returning an `int` → the reversed value can exceed `Integer.MAX_VALUE`.
- ❌ Shifting the *input* left instead of the *result* → you would be rotating, not
  reversing.

**How to narrate:**
> "I read the input's bits from the least significant end and append each one to the result.
> Shifting the result left makes room and OR-ing the current low bit appends it. I do exactly
> 32 iterations because the input is an unsigned 32-bit value — its leading zeros are real
> bits and they become the trailing zeros of the answer. The result is a `long` because the
> reversed value can exceed `Integer.MAX_VALUE`."

## Related Problems

- [CountSetBits](./CountSetBits.java) — counting set bits
- [Power of Two](./PowerOfTwo.java) — a single-bit trick
- [Gray Code](./GrayCode.java) — another bit permutation
