---
title: GCD and LCM
leetcode: null
difficulty: Easy
patterns: [Euclidean algorithm]
companies: [Meta, Adobe, Bloomberg]
frequency: 4
tags: [math, numbers]
sampleInput: |
  12
  18
sampleOutput: "6 36"
---

# GCD and LCM

| | |
|---|---|
| **Difficulty** | Easy |
| **Pattern** | Euclidean algorithm |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Uber |

## Problem Statement

Given two positive integers `a` and `b`, return their **greatest common divisor** and
their **least common multiple**.

- `gcd(12, 18) = 6`
- `lcm(12, 18) = 36`

## Input Format

The program reads from standard input:

```
a
b
```

- `a` — the first number (1 ≤ a ≤ 10¹⁸)
- `b` — the second number (1 ≤ b ≤ 10¹⁸)

## Sample Input

```
12
18
```

## Expected Output

```
6 36
```

## Approach — the Euclidean algorithm

The GCD can be computed with the classic loop:

```
while (b != 0) {
    (a, b) = (b, a % b)
}
```

The last non-zero value of `a` is the GCD. This works because
`gcd(a, b) = gcd(b, a % b)` — the set of common divisors of `a` and `b` is exactly the
set of common divisors of `b` and `a % b`, and the remainder is strictly smaller than
`b`, so the loop makes progress.

The LCM follows from the identity `a × b = gcd × lcm`:

```
lcm(a, b) = (a / gcd) * b
```

Dividing **before** multiplying keeps the intermediate value small.

## Dry Run

Input: `a = 12`, `b = 18`

| Step | `a` | `b` | `a % b` | action |
|---:|---:|---:|---:|---|
| 1 | 12 | 18 | `12 % 18 = 12` | `(a, b) = (18, 12)` |
| 2 | 18 | 12 | `18 % 12 = 6` | `(a, b) = (12, 6)` |
| 3 | 12 | 6 | `12 % 6 = 0` | `(a, b) = (6, 0)` — loop ends |

`gcd = 6`. Then `lcm = (12 / 6) × 18 = 2 × 18 = 36`.

Output: **6 36** ✓

### Trace with a bigger pair — `a = 270`, `b = 192`

| Step | `a` | `b` | `a % b` | action |
|---:|---:|---:|---:|---|
| 1 | 270 | 192 | 78 | `(192, 78)` |
| 2 | 192 | 78 | 36 | `(78, 36)` |
| 3 | 78 | 36 | 6 | `(36, 6)` |
| 4 | 36 | 6 | 0 | `(6, 0)` — loop ends |

`gcd = 6`, `lcm = (270 / 6) × 192 = 45 × 192 = 8640`.

## Java Solution

See [`GcdAndLcm.java`](./GcdAndLcm.java).

```java
public static long gcd(long a, long b) {
    a = Math.abs(a);
    b = Math.abs(b);
    while (b != 0) {
        long remainder = a % b;
        a = b;
        b = remainder;
    }
    return a;
}

public static long lcm(long a, long b) {
    if (a == 0 || b == 0) {
        return 0;
    }
    long divisor = gcd(a, b);
    return Math.abs(a / divisor) * Math.abs(b);
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(log min(a, b)) | the remainder shrinks by at least a factor of 2 every other step |
| **Space** | O(1) | the iterative version keeps no stack |

## Interview Notes

**Follow-ups to raise yourself:**
- *"What if you have an array of numbers?"* → fold the GCD over the array; the LCM of
  an array needs care to avoid overflow.
- *"Implement it recursively."* → `gcd(a, b) = b == 0 ? a : gcd(b, a % b)`; the same
  complexity with O(log n) stack frames.
- *"How do you avoid overflow in the LCM?"* → divide before multiplying, and use
  `long` (or `BigInteger` when the result may exceed 64 bits).

**Common mistakes:**
- ❌ Computing the LCM as `a * b / gcd` — `a * b` may overflow even when the LCM fits.
- ❌ Forgetting the special case `gcd(0, 0) = 0`.
- ❌ Using the recursive version on `gcd(0, n)` — the base case must handle `b == 0`.

**How to narrate:**
> "The Euclidean algorithm repeatedly replaces the pair by `(b, a % b)`, which keeps the
> GCD unchanged and shrinks the numbers, so it finishes in logarithmic time. The LCM
> then follows from `a × b = gcd × lcm`, and I divide before multiplying to avoid
> overflow."

## Related Problems

- [Largest Prime Factor](./LargestPrimeFactor.md) — the other classic factorisation
- [Perfect Number](./PerfectNumber.md) — working with the divisors of a number
