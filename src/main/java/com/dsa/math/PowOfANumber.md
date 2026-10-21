---
title: Pow(x, n)
leetcode: 50
difficulty: Medium
patterns: [Divide and conquer, Fast exponentiation]
companies: [Amazon, Google, Meta, Uber, Bloomberg]
frequency: 4
tags: [math, recursion, bit-manipulation]
sampleInput: |
  2.5
  3
sampleOutput: "15.625"
---

# Pow(x, n) — LeetCode 50

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Divide and conquer · Fast exponentiation |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Uber, Bloomberg |

## Problem Statement

Compute `x` raised to the power `n` without using `Math.pow`.

- `n` may be negative: `x^-n = 1 / x^n`.
- `n = 0` → the result is `1` (even for `x = 0`).
- The result may be fractional.

## Input Format

The program reads from standard input:

```
x
n
```

- `x` — the base (a floating point number)
- `n` — the exponent (an integer, may be negative)

## Sample Input

```
2.5
3
```

## Expected Output

```
15.625
```

`2.5³ = 2.5 × 2.5 × 2.5 = 15.625`.

## Approach — binary exponentiation

Multiplying `x` by itself `n` times costs O(n) — far too slow for `n = 2³¹`. Instead
use the fact that `x^n = (x^(n/2))²` when `n` is even:

- If the exponent is even, square the base and halve the exponent.
- If the exponent is odd, multiply the result by the base once, then do the same.

Each round halves the exponent, so there are only `O(log |n|)` rounds.

A negative exponent is handled by inverting the base (`x → 1/x`) and using the
absolute value of the exponent. `n = Integer.MIN_VALUE` is the classic trap: `-n`
overflows an `int`, so the exponent is kept in a `long`.

**Correctness invariant:** after every round the result of the algorithm equals
`result × base^exponent` of the original problem. Squaring the base and halving the
exponent preserves the product, and taking one factor out of the exponent (for an
odd exponent) multiplies it into the result — so the invariant holds and the loop
ends with `exponent = 0` and `result` equal to the answer.

## Dry Run

Input: `x = 2.5`, `n = 3`

| Round | exponent | base | result | action |
|---:|---:|---:|---:|---|
| 0 | 3 | 2.5 | 1.0 | `exponent` is odd → `result = 1.0 × 2.5 = 2.5`; `base = 2.5² = 6.25`; `exponent = 1` |
| 1 | 1 | 6.25 | 2.5 | odd → `result = 2.5 × 6.25 = 15.625`; `base = 6.25² = 39.0625`; `exponent = 0` |

`exponent = 0` → the result is `15.625` ✓

### Negative exponent — `x = 2`, `n = -3`

| Round | exponent | base | result | action |
|---:|---:|---:|---:|---|
| 0 | 3 | 0.5 (`1/2`) | 1.0 | odd → `result = 0.5`; `base = 0.25`; `exponent = 1` |
| 1 | 1 | 0.25 | 0.5 | odd → `result = 0.5 × 0.25 = 0.125`; `exponent = 0` |

`2^-3 = 0.125` ✓

### Exponent zero — `x = 2.5`, `n = 0`

| Round | exponent | base | result | action |
|---:|---:|---:|---:|---|
| 0 | 0 | 2.5 | 1.0 | the loop does not run → `result = 1.0` |

`x⁰ = 1` ✓

## Java Solution

See [`PowOfANumber.java`](./PowOfANumber.java).

```java
public static double pow(double x, int n) {
    long exponent = n;
    if (exponent < 0) {
        x = 1.0 / x;
        exponent = -exponent;
    }
    double result = 1.0;
    double base = x;
    while (exponent > 0) {
        if ((exponent & 1L) == 1L) {
            result *= base;
        }
        base *= base;
        exponent >>= 1;
    }
    return result;
}
```

The program prints whole results as integers (`2⁰¹⁰` → `1024`) and fractional results
as they are (`2.5³` → `15.625`).

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(log \|n\|) | the exponent is halved every round |
| **Space** | O(1) | iterative; the recursive version needs O(log \|n\|) stack frames |

## Interview Notes

**Follow-ups to raise yourself:**
- *"Write it recursively."* → `pow(x, n) = x * pow(x, n-1)` for odd `n` and
  `pow(x*x, n/2)` for even `n`; same complexity, but O(log n) stack frames.
- *"What if the exponent is huge (a `long` or a `BigInteger`)?"* → the same loop works
  with a `long` exponent; for a `BigInteger` you need a different approach.
- *"How do you avoid floating point error?"* → the binary expansion of `n` determines
  which powers are multiplied; with exact rational inputs (powers of two and five) the
  result is exact.

**Common mistakes:**
- ❌ `-n` on `Integer.MIN_VALUE` — the negation overflows; keep the exponent in a
  `long`.
- ❌ Using `Math.pow` — the exercise is to implement it yourself.
- ❌ Squaring the base **after** the exponent has been shifted in the wrong order —
  square every round, the result only picks up the factors it needs.
- ❌ Forgetting that `x⁰ = 1` even when `x = 0`.

**How to narrate:**
> "I use binary exponentiation: every round I square the base and halve the exponent,
> so there are only log n rounds. If the exponent is odd I first multiply the result by
> the base. A negative exponent is handled by inverting the base first, and I keep the
> exponent in a long so that `Integer.MIN_VALUE` cannot overflow."

## Related Problems

- [Factorial Trailing Zeroes](./FactorialTrailingZeroes.md) — counting factors instead of multiplying
- [Happy Number](./HappyNumber.md) — digit transformations
