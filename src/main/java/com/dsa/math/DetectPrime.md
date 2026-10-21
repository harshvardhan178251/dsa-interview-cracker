---
title: Is a Number Prime
leetcode: null
difficulty: Medium
patterns: [Number theory, Trial division]
companies: [Google, Apple]
frequency: 3
tags: [math, numbers]
sampleInput: |
  97
sampleOutput: "true"
---

# Is a Number Prime

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Number theory · Trial division |
| **Interview heat** | ★★★☆☆ |
| **Asked at** | Amazon, Google, Meta, Uber |

## Problem Statement

Decide whether a given integer is a **prime number** — a number greater than 1 whose
only divisors are 1 and itself.

- `2` is prime, `1` is **not** (it has only one divisor), `0` and negative numbers are
  not prime.
- `97` is prime, `91 = 7 × 13` is not.

## Input Format

The program reads from standard input:

```
n
```

- `n` — the number to test (0 ≤ n ≤ 2³¹ - 1)

## Sample Input

```
97
```

## Expected Output

```
true
```

## Approach — trial division up to the square root

If `n` is composite, it has a divisor `d` with `1 < d ≤ sqrt(n)`: when `n = a × b`
with `a ≤ b`, then `a ≤ sqrt(n)`. So it is enough to try every possible divisor up to
the square root.

Two optimisations:

- handle `2` separately — every other even number is composite;
- after that only **odd** divisors need to be tried, halving the work.

The loop condition `d * d <= n` is written with a `long` multiplication so that `d * d`
cannot overflow for large `n`.

**Why this is complete:** if `n` is composite it has some divisor `d` with
`1 < d ≤ sqrt(n)` (shown above). The loop visits every such `d` — every odd `d` and,
through the special case for `2`, the even one as well. So the loop finds a divisor
exactly when one exists.

## Dry Run

Input: `n = 97`

| Step | check | value | result |
|---:|---|---|---|
| 1 | `n < 2`? | 97 | no |
| 2 | `n % 2 == 0`? | `97 % 2 = 1` | not even → continue with odd divisors |
| 3 | `d = 3`: `3 × 3 = 9 <= 97`? | yes | `97 % 3 = 1` → not a divisor |
| 4 | `d = 5`: `5 × 5 = 25 <= 97`? | yes | `97 % 5 = 2` → not a divisor |
| 5 | `d = 7`: `7 × 7 = 49 <= 97`? | yes | `97 % 7 = 6` → not a divisor |
| 6 | `d = 9`: `9 × 9 = 81 <= 97`? | yes | `97 % 9 = 7` → not a divisor |
| 7 | `d = 11`: `11 × 11 = 121 <= 97`? | **no** | loop ends → prime |

Answer: **true**

### Trace of a composite number — `n = 91`

| Step | check | value | result |
|---:|---|---|---|
| 1 | `n < 2`? | 91 | no |
| 2 | `n % 2 == 0`? | 1 | odd → continue |
| 3 | `d = 3`: `9 <= 91` | `91 % 3 = 1` | not a divisor |
| 4 | `d = 5`: `25 <= 91` | `91 % 5 = 1` | not a divisor |
| 5 | `d = 7`: `49 <= 91` | `91 % 7 = 0` | **divisor found → false** |

`91 = 7 × 13` ✓

## Java Solution

See [`DetectPrime.java`](./DetectPrime.java).

```java
public static boolean isPrime(int n) {
    if (n < 2) {
        return false;
    }
    if (n % 2 == 0) {
        return n == 2;
    }
    for (int d = 3; (long) d * d <= n; d += 2) {
        if (n % d == 0) {
            return false;
        }
    }
    return true;
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(√n) | at most √n/2 candidate divisors |
| **Space** | O(1) | a single counter |

## Interview Notes

**Follow-ups to raise yourself:**
- *"What if you have to test a million numbers?"* → use a sieve
  ([Sieve of Eratosthenes](./SieveOfEratosthenes.md)).
- *"Can you do it in O(1) space and O(√n) time for many queries?"* → precompute primes
  up to √(max n) with a sieve and test only those.
- *"What about very large numbers (beyond 64 bit)?"* → Miller–Rabin, which is
  probabilistic but extremely reliable in practice.

**Common mistakes:**
- ❌ Treating `1` as prime — it has only one divisor.
- ❌ Forgetting that `2` is the only even prime.
- ❌ Writing `d * d <= n` with `int` arithmetic — `d * d` overflows for `d > 46340`
  and the loop may end too early or never.

**How to narrate:**
> "A composite number always has a divisor no larger than its square root, so I only
> have to try divisors up to √n. I handle 2 separately and then step through the odd
> divisors, which halves the work."

## Related Problems

- [Sieve of Eratosthenes](./SieveOfEratosthenes.md) — primes for a whole range
- [Largest Prime Factor](./LargestPrimeFactor.md) — factorising a number
- [Perfect Number](./PerfectNumber.md) — working with the divisors of a number
