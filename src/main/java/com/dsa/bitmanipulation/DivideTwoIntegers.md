---
title: Divide Two Integers
leetcode: 29
difficulty: Medium
patterns: [Bit tricks, Shifts, Long division]
companies: [Amazon, Google, Meta, Uber, Apple]
frequency: 4
tags: [bit-manipulation, numbers, math]
sampleInput: |
  10
  3
sampleOutput: "3"
---

# Divide Two Integers — LeetCode 29

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Bit tricks · Shifts · Long division |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Uber, Apple |

## Problem Statement

Given two integers `dividend` and `divisor`, compute their integer quotient, **truncated
toward zero** (the result must not round toward negative infinity).

- `10 / 3` → `3` (not `3.333…`).
- `7 / -3` → `-2` (truncated toward zero, **not** `-3`).
- Division by zero is not allowed.
- The quotient fits into a signed 32-bit integer.

## Input Format

The program reads from standard input:

```
dividend
divisor
```

- `dividend` — the number being divided (−2³¹ ≤ dividend ≤ 2³¹ − 1)
- `divisor` — the divisor (never zero, −2³¹ ≤ divisor ≤ 2³¹ − 1)

## Sample Input

```
10
3
```

## Expected Output

```
3
```

## Approach — Shift-and-subtract long division

Work with **absolute values** in `long` arithmetic, then restore the sign at the end.

The idea is the classic long division, done in binary:

1. Find the largest `2^k · divisor` that still fits into the current remainder, together
   with the matching `2^k`.
2. Subtract it from the remainder and add `2^k` to the quotient.
3. Repeat until the remainder is smaller than the divisor.

**Doubling instead of searching.** Instead of testing every power of two, start with
`chunk = divisor` and keep doubling it (`chunk <<= 1`, `multiple <<= 1`) while it still
fits. That finds the largest usable power of two in a handful of shifts.

**The sign.** `negative = (dividend < 0) ^ (divisor < 0)` — the result is negative exactly
when the operands have different signs. Applying the sign *after* the magnitude division
is what makes the truncation toward zero automatic: `7 / 3 = 2` and `7 / -3 = -2`, not `-3`.

**The overflow case.** `Integer.MIN_VALUE / -1` mathematically equals `2³¹`, which does not
fit in an `int`. Java's `int` division wraps it to `Integer.MIN_VALUE`; the explicit guard
reproduces that behaviour deliberately.

## Dry Run

Input: `dividend = 10`, `divisor = 3` — both positive, so the sign is positive

| Round | remainder `a` | `chunk` | `multiple` | `a` after | quotient |
|---:|---:|---:|---:|---:|---:|
| 1 | 10 | 6 | 2 | 10 − 6 = 4 | 2 |
| 2 | 4 | 3 | 1 | 4 − 3 = 1 | 3 |
| 3 | 1 | — | — | `1 < 3` → the remainder is smaller than the divisor | 3 |

Quotient `3`, remainder `1` → `10 / 3 = 3` ✓

### The doubling inside round 1

The inner loop doubles `chunk` while the *next* doubling would still fit:

| check | `chunk` | `multiple` | `a >= (chunk << 1)`? | action |
|---|---:|---:|---|---|
| start | 3 | 1 | `10 >= 6` ✔ | `chunk = 6`, `multiple = 2` |
| again | 6 | 2 | `10 >= 12` ✘ | stop |

So round 1 subtracts `6` and adds `2` to the quotient — exactly the binary long-division
step `10 = 1·6 + 4`.

### The binary long division, written out

```
dividend  1010   (10)
divisor   0011   (3)

step 1:  1010 - 0110 = 0100,  quotient += 0010
step 2:  0100 - 0011 = 0001,  quotient += 0001
                                  ---------
                                  0011   (3)
```

## Java Solution

See [`DivideTwoIntegers.java`](./DivideTwoIntegers.java).

```java
public static int divide(int dividend, int divisor) {
    // The only case whose mathematical result overflows a 32-bit signed integer.
    if (dividend == Integer.MIN_VALUE && divisor == -1) {
        return Integer.MIN_VALUE;
    }
    boolean negative = (dividend < 0) ^ (divisor < 0);
    long a = Math.abs((long) dividend);
    long b = Math.abs((long) divisor);

    long quotient = 0;
    while (a >= b) {
        long chunk = b;
        long multiple = 1;
        // Find the biggest 2^k * b that still fits into the remainder.
        while (a >= (chunk << 1)) {
            chunk <<= 1;
            multiple <<= 1;
        }
        a -= chunk;
        quotient += multiple;
    }
    return (int) (negative ? -quotient : quotient);
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(32) | The chunk doubles every round, so there are at most 32 rounds |
| **Space** | O(1) | A handful of variables |

## Interview Notes

**Follow-ups to raise yourself:**
- *"Now do it without `/` and `*`."* → this is that version: it uses only shifts,
  subtractions and comparisons.
- *"What if the divisor is a power of two?"* → just shift the dividend.
- *"How do you handle the remainder?"* → keep it; it is `dividend - quotient * divisor`.
- *"Why must you use `long` for the magnitudes?"* → `Math.abs(Integer.MIN_VALUE)` is still
  `Integer.MIN_VALUE` (it does not fit in an `int`), so the cast to `long` must come
  **before** the absolute value.

**Common mistakes:**
- ❌ Truncating toward negative infinity → `7 / -3` must be `-2`, not `-3`. Applying the
  sign after the magnitude division is what gets this right.
- ❌ Calling `Math.abs` on an `int` `Integer.MIN_VALUE` → the result is still negative, and
  the loop misbehaves. Cast to `long` first.
- ❌ Forgetting the `Integer.MIN_VALUE / -1` special case → `Math.abs` overflows and the
  loop never terminates.
- ❌ Adding `multiple` to the quotient but subtracting `chunk` from the wrong variable.

**How to narrate:**
> "I'll do binary long division on the absolute values. In each round I double the divisor
> as many times as it still fits into the remainder, tracking the matching power of two,
> then subtract it and add that power of two to the quotient. Because the chunk doubles
> each round, there are at most 32 rounds. I do the division on magnitudes and apply the
> sign at the end, which truncates toward zero for free."

## Related Problems

- [Sum of Two Integers](./AddTwoIntegers.java) — the carry version of arithmetic by hand
- [Subtract Two Integers without Minus](./SubtractWithoutMinus.java) — the borrow version
- [Power of Two](./PowerOfTwo.java) — the power-of-two special case
