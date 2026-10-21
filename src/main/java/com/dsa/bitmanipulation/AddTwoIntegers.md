---
title: Sum of Two Integers
leetcode: 371
difficulty: Medium
patterns: [Bit tricks, Addition without the + operator]
companies: [Amazon, Meta, Uber, Facebook, Datadog]
frequency: 4
tags: [bit-manipulation, numbers]
sampleInput: |
  2
  3
sampleOutput: "5"
---

# Sum of Two Integers — LeetCode 371

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Bit tricks · Addition without the + operator |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Uber, Apple |

## Problem Statement

Given two integers `a` and `b`, return their sum **without using the `+` or `-`
operators**.

- The answer is guaranteed to fit into a signed 32-bit integer.
- `a = 1`, `b = 2` → `3`.
- `a = 2`, `b = 3` → `5`.
- `a = -5`, `b = 3` → `-2`.

## Input Format

The program reads from standard input:

```
a
b
```

- `a` — the first addend (−2³¹ ≤ a ≤ 2³¹ − 1)
- `b` — the second addend (−2³¹ ≤ b ≤ 2³¹ − 1)

## Sample Input

```
2
3
```

## Expected Output

```
5
```

## Approach — Add the bits, then add the carries

Binary addition happens in two parts:

1. **Sum bits** — the XOR of the two numbers. `1 + 1 = 0` in the sum column, and
   `0 + 1 = 1`.
2. **Carry bits** — `1 + 1 = 10` in binary, so the carry goes to the *next* column. The
   positions where both numbers have a `1` are `(a & b)`, and shifting them left by one
   places them in the next column: `(a & b) << 1`.

So:

```java
while (b != 0) {
    int carry = (a & b) << 1;
    a = a ^ b;
    b = carry;
}
return a;
```

The carry only ever moves **left**, so after at most 32 iterations it falls off the top and
the loop terminates. Negative numbers work automatically because Java uses two's
complement.

**Why `b` is the loop variable.** After the first iteration `a` holds the sum bits and
`b` holds the carries that still need to be added. Each iteration adds one more layer of
carry.

## Dry Run

Input: `a = 2 = 010₂`, `b = 3 = 011₂`

| Step | `a` | `b` | `(a & b) << 1` (new carry) | `a ^ b` (new a) |
|---:|---|---|---|---|
| 1 | `010` (2) | `011` (3) | `010 & 011 = 010`; `<< 1` → `100` (4) | `010 ^ 011 = 001` (1) |
| 2 | `001` (1) | `100` (4) | `001 & 100 = 000`; `<< 1` → `000` (0) | `001 ^ 100 = 101` (5) |
| 3 | `101` (5) | `000` (0) | loop ends (`b == 0`) | — |

Result: **5** ✓

### The same addition, done by hand

```
    010        (a = 2)
    011        (b = 3)
  ------
  sum  001    (a ^ b)
  carry 100   ((a & b) << 1)
  ------
        101    (1 + 4 = 5, no further carry)
```

### A negative addend — `a = -5`, `b = 3`

| Step | `a` | `b` | new carry | new `a` |
|---:|---|---|---|---|
| 1 | `-5` = `...11111011` | `3` = `...00000011` | `...00000010` → `4` | `...11111100` = `-8` |
| 2 | `-8` = `...11111000` | `4` = `...00000100` | `...00000000` → `0` | `...11111100` = `-2` |

`b` is now `0` → the answer is `-2` ✓ (Java's two's complement handles the sign for free.)

## Java Solution

See [`AddTwoIntegers.java`](./AddTwoIntegers.java).

```java
public static int add(int a, int b) {
    while (b != 0) {
        int carry = (a & b) << 1; // the places where both addends have a 1
        a = a ^ b;                // the sum bits, without the carry
        b = carry;                // fold the carry back in
    }
    return a;
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(32) = O(1) | The carry moves left on every iteration |
| **Space** | O(1) | Three variables |

## Interview Notes

**Follow-ups to raise yourself:**
- *"Now do subtraction without `-`."* → the borrow version of the same loop, see
  [Subtract Two Integers without Minus](./SubtractWithoutMinus.java).
- *"Now do multiplication."* → shift-and-add: for every set bit of `b`, add `a` shifted
  left by that bit's position.
- *"Now do division."* → shift-and-subtract, see
  [Divide Two Integers](./DivideTwoIntegers.java).
- *"What if the inputs were 64-bit?"* → the same algorithm; use `long`. The loop still
  terminates in at most 64 iterations.

**Common mistakes:**
- ❌ Swapping `a ^ b` and `(a & b) << 1` → you must compute the carry from the **old**
  values of `a` and `b`, which is why the carry is computed first into a temporary.
- ❌ Using `>>` instead of `<<` for the carry → the carry must move to the **more
  significant** end.
- ❌ Looping forever because the carry never becomes zero → it always does: each iteration
  shifts the carry left, so after at most 32 iterations it overflows to `0`.
- ❌ Forgetting that Java's `+` on `int` already wraps on overflow → the bitwise version
  has exactly the same overflow behaviour, which is why the problem guarantees the result
  fits.

**How to narrate:**
> "Binary addition is XOR plus carry. `a ^ b` gives the sum bits with no carry, and
> `(a & b) << 1` gives the carries moved into the next column. I add the carries back in
> and repeat until there are none left. The carry only moves left, so it terminates within
> 32 iterations, and two's complement makes negative inputs work for free."

## Related Problems

- [Subtract Two Integers without Minus](./SubtractWithoutMinus.java) — the borrow version
- [Divide Two Integers](./DivideTwoIntegers.java) — shift and subtract
- [Single Number](./SingleNumber.java) — a different XOR trick
