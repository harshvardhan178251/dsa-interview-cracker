---
title: Power of Two
leetcode: 231
difficulty: Easy
patterns: [Bit tricks]
companies: [Meta, Amazon, Microsoft, Netflix, Zillow]
frequency: 4
tags: [bit-manipulation, numbers]
sampleInput: |
  16
sampleOutput: "true"
---

# Power of Two — LeetCode 231

| | |
|---|---|
| **Difficulty** | Easy |
| **Pattern** | Bit tricks |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Uber, Apple |

## Problem Statement

Given an integer `n`, return `true` if it is a **power of two**, otherwise return `false`.

- A power of two is `2^k` for some non-negative integer `k`: `1, 2, 4, 8, 16, …`
- `0` is **not** a power of two, and neither is any negative number.
- `16` → `true`; `3` → `false`; `0` → `false`; `-16` → `false`.

## Input Format

The program reads from standard input:

```
n
```

- `n` — an integer (−2³¹ ≤ n ≤ 2³¹ − 1)

## Sample Input

```
16
```

## Expected Output

```
true
```

`16 = 10000₂` — exactly one set bit.

## Approach — One set bit and nothing else

A power of two has **exactly one** set bit in its binary representation. The trick is
Kernighan's again:

```java
n & (n - 1)
```

clears the lowest set bit. If `n` had **only one** set bit, the result is `0` — the bit is
gone and nothing is left. If `n` had more than one set bit, something always survives.

So the test is:

```java
n > 0 && (n & (n - 1)) == 0
```

**Why `n > 0` is needed.** For `n = 0`, `n & (n - 1)` is `0 & -1 = 0` — the test would
say "true", but `0` is not a power of two. Negative numbers also fail the positivity
check.

**The alternative.** `n > 0 && (n & (n - 1)) == 0` is O(1). The loop version — repeatedly
halve `n` and check that it stays even until it reaches `1` — is O(log n) and easier to
explain to a non-bit-twiddling audience. Know both.

## Dry Run

Input: `n = 16 = 10000₂`

| Step | `n` (binary) | `n - 1` (binary) | `n & (n - 1)` | `== 0`? |
|---:|---|---|---|---|
| 1 | `10000` | `01111` | `00000` | **yes** → power of two |

### The truth table

| `n` | binary | `n - 1` | `n & (n - 1)` | `n > 0`? | result |
|---:|---|---|---|---:|---|
| 16 | `10000` | `01111` | `00000` | ✔ | `true` |
| 1 | `00001` | `00000` | `00000` | ✔ | `true` |
| 12 | `01100` | `01011` | `01000` | ✔ | `false` |
| 3 | `00011` | `00010` | `00010` | ✔ | `false` |
| 0 | `00000` | `11111` | `00000` | ✘ | `false` |
| −16 | `11110000…0` | `11110000…1` | `11110000…0` | ✘ | `false` |

Rows 4 and 6 show why the `n > 0` guard is not optional.

## Java Solution

See [`PowerOfTwo.java`](./PowerOfTwo.java).

```java
public static boolean isPowerOfTwo(int n) {
    // n > 0 rules out 0 and the negative numbers, which have no single set bit.
    return n > 0 && (n & (n - 1)) == 0;
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(1) | A single AND and a comparison |
| **Space** | O(1) | No extra state |

## Interview Notes

**Follow-ups to raise yourself:**
- *"Without bit tricks?"* → loop: while `n` is even, halve it; the answer is `n == 1`.
- *"How would you check it for a very large number (beyond 64 bits)?"* → represent it as a
  `BigInteger` and use `bitCount() == 1`, or use the string form.
- *"What about powers of three?"* → the bit trick does not generalise; use division or
  logarithms (with care about floating point).
- *"Why is `1` a power of two?"* → `1 = 2⁰`; some definitions start at `2¹`, so state the
  convention explicitly.

**Common mistakes:**
- ❌ Omitting the `n > 0` check → `0` would be reported as a power of two.
- ❌ Using `(n & (n - 1)) == 0` alone → the same bug for `0`.
- ❌ Using `n & (n + 1)` → that tests a different property (it identifies numbers of the
  form `2^k - 1`).
- ❌ Testing with a floating-point `log2` → rounding errors for large values.

**How to narrate:**
> "A power of two has exactly one set bit. The expression `n & (n - 1)` clears the lowest
> set bit, so it is zero exactly when there was only one. I also require `n > 0`, because
> zero would otherwise pass the bit test and negative numbers never can."

## Related Problems

- [CountSetBits](./CountSetBits.java) — the same `n & (n - 1)` trick
- [Number of 1 Bits](./NumberOfSetBits.java) — the count for every value
- [Hamming Distance](./HammingDistance.java) — counting differing bits
