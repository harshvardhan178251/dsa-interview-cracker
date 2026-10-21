---
title: Subtract Two Integers without Minus
leetcode: null
difficulty: Medium
patterns: [Bit tricks, Two's complement, Borrow propagation]
companies: [Amazon, Google, Meta, Adobe]
frequency: 3
tags: [bit-manipulation, numbers]
sampleInput: |
  5
  3
sampleOutput: "2"
---

# Subtract Two Integers without Minus — classic bit-twiddling problem

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Bit tricks · Two's complement · Borrow propagation |
| **Interview heat** | ★★★☆☆ |
| **Asked at** | Amazon, Google, Meta, Adobe |

## Problem Statement

Given two integers `a` and `b`, return `a - b` **without using the `+` or `-` operators**.

- `a = 5`, `b = 3` → `2`.
- `a = 3`, `b = 5` → `-2`.
- `a = 0`, `b = 0` → `0`.

## Input Format

The program reads from standard input:

```
a
b
```

- `a` — the minuend (−2³¹ ≤ a ≤ 2³¹ − 1)
- `b` — the subtrahend (−2³¹ ≤ b ≤ 2³¹ − 1)

## Sample Input

```
5
3
```

## Expected Output

```
2
```

## Approach — Mirror the borrow of binary subtraction

Binary subtraction works column by column. When you subtract a `1` from a `0`, you must
**borrow** from the next column to the left.

- `~a & b` marks exactly the positions where a borrow has to be produced: `b` has a `1`
  there and `a` has a `0`.
- `<< 1` moves each borrow to the next column, where it propagates.
- `a ^ b` writes the difference bits (the borrow positions become `1 - 1 = 0`).

```java
while (b != 0) {
    int borrow = (~a & b) << 1;
    a = a ^ b;
    b = borrow;
}
return a;
```

**Why the borrow keeps moving left.** A borrow out of bit `i` becomes a borrow *into* bit
`i + 1`, so each round of the loop shifts the pending borrows one position left. The
pending borrow is absorbed as soon as the bit above it can pay for it, and in the worst
case it walks off the top of the 32-bit word and the loop ends.

**Negative results fall out for free.** Because Java uses two's complement, `3 - 5` is
simply the bit pattern `...11111110` — the borrow chain walks all the way up and the
answer is `-2` without any special-casing.

## Dry Run

Input: `a = 5 = 0101₂`, `b = 3 = 0011₂`

| Step | `a` (binary) | `b` (binary) | `~a` | `~a & b` | `borrow = (~a & b) << 1` | new `a = a ^ b` |
|---:|---|---|---|---|---|---|
| 1 | `0101` (5) | `0011` (3) | `...1010` | `0010` | `0100` (4) | `0110` (6) |
| 2 | `0110` (6) | `0100` (4) | `...1001` | `0000` | `0000` (0) | `0010` (2) |

`b` is now `0` → the answer is **2** ✓

### The same subtraction, done by hand

```
    0101        (a = 5)
  - 0011        (b = 3)
  -------
  diff 0110     (a ^ b)
  borrow 0100   ((~a & b) << 1)
  -------
  result 0010   (0110 ^ 0100 = 2)
```

### A negative result — `a = 3`, `b = 5`

| Step | `a` | `b` | `borrow` | new `a` |
|---:|---|---|---|---|
| 1 | `0011` (3) | `0101` (5) | `1000` (8) | `0110` (6) |
| 2 | `0110` (6) | `1000` (8) | `10000` (16) | `1110` (14) |
| 3 | `1110` (14) | `10000` (16) | `100000` (32) | `11110` (30) |
| … | … | … | the borrow doubles each round | … |
| 30 | `1111…1110` (−2) | `0` | 0 | `1111…1110` (−2) |

The borrow chain walks left until it is absorbed; the final accumulator is
`...11111110` = `-2` ✓

## Java Solution

See [`SubtractWithoutMinus.java`](./SubtractWithoutMinus.java).

```java
public static int subtract(int a, int b) {
    while (b != 0) {
        int borrow = (~a & b) << 1; // positions that must borrow from the next bit
        a = a ^ b;                 // the difference bits
        b = borrow;                // propagate the borrow
    }
    return a;
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(32) = O(1) | The borrow moves left on every iteration |
| **Space** | O(1) | Three variables |

## Interview Notes

**Follow-ups to raise yourself:**
- *"Explain the two's complement view: `a - b == a + ~b + 1`."* → the alternative route;
  `~b` is the bitwise complement and `+ 1` turns it into `-b`. The borrow loop is the
  direct implementation of the same idea.
- *"Now multiply without `*`."* → shift-and-add over the set bits of one operand.
- *"Now divide without `/`."* → shift-and-subtract, see
  [Divide Two Integers](./DivideTwoIntegers.java).
- *"What if the values are 64-bit?"* → the same algorithm with `long`.

**Common mistakes:**
- ❌ Using `+` anywhere in the implementation (`a + 1`, or reusing the add helper with
  `~b + 1`) → it violates the constraint of the exercise.
- ❌ Shifting the borrow **right** instead of left → the borrow must move to the *more*
  significant column.
- ❌ Forgetting to update `b` with the borrow before the next iteration → infinite loop.
- ❌ Worrying about the negative case → two's complement handles it; demonstrate it with
  `3 - 5`.

**How to narrate:**
> "Subtraction is addition with a borrow. The positions that must borrow are the ones where
> `b` has a 1 and `a` has a 0, which is `~a & b`; shifting that left moves each borrow into
> the next column. `a ^ b` gives the difference bits. I repeat until the borrow is zero —
> it only ever moves left, so it terminates within 32 rounds, and two's complement gives the
> right answer for negative results automatically."

## Related Problems

- [Sum of Two Integers](./AddTwoIntegers.java) — the carry version
- [Divide Two Integers](./DivideTwoIntegers.java) — shift and subtract
- [Reverse Bits](./ReverseBits.java) — another bit permutation
