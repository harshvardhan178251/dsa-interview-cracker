---
title: Factorial Trailing Zeroes
leetcode: 172
difficulty: Easy
patterns: [Number theory, Counting factors]
companies: [Amazon, Meta, Google, Uber]
frequency: 3
tags: [math, numbers]
sampleInput: |
  25
sampleOutput: "6"
---

# Factorial Trailing Zeroes — LeetCode 172

| | |
|---|---|
| **Difficulty** | Easy |
| **Pattern** | Number theory · Counting factors |
| **Interview heat** | ★★★☆☆ |
| **Asked at** | Amazon, Meta, Google, Uber |

## Problem Statement

How many trailing zeroes does `n!` have?

```
5!  = 120        -> 1 trailing zero
10! = 3628800    -> 2 trailing zeroes
25! = 15511210043330985984000000 -> 6 trailing zeroes
```

## Input Format

The program reads from standard input:

```
n
```

- `n` — the factorial argument (0 ≤ n ≤ 10⁹)

## Sample Input

```
25
```

## Expected Output

```
6
```

## Approach — count the factors of 5

A trailing zero is a factor of `10 = 2 × 5`. A factorial contains far more 2s than 5s
(every multiple of 2 pairs with a multiple of 5), so the number of trailing zeroes is
exactly the number of factors of 5 in `n!`:

```
zeros = n/5 + n/25 + n/125 + n/625 + ...
```

The first term counts every multiple of 5, the second every multiple of 25 (which
contributes a *second* factor of 5), and so on. Dividing `n` by 5 repeatedly and
adding the quotients computes exactly this sum.

**Why the division is exact:** `n/5` (integer division) counts the multiples of 5 in
`1..n`; `n/25` counts the multiples of 25, each of which contributes one more factor
of 5; a multiple of 125 contributes a third, and is counted in all three terms.

## Dry Run

Input: `n = 25`

| Step | `n` before | `n = n / 5` | `zeroes` after | meaning |
|---:|---:|---:|---:|---|
| 1 | 25 | 5 | 5 | multiples of 5 |
| 2 | 5 | 1 | 6 | multiples of 25 (one extra factor of 5) |
| 3 | 1 | 0 | 6 | multiples of 125 — none |

Answer: **6**

### Trace with a bigger number — `n = 100`

| Step | `n` before | `n = n / 5` | `zeroes` after |
|---:|---:|---:|---:|
| 1 | 100 | 20 | 20 |
| 2 | 20 | 4 | 24 |
| 3 | 4 | 0 | 24 |

`100!` ends in 24 zeroes ✓

### Edge case — `n = 0` and `n = 4`

| n | rounds | zeroes | note |
|---:|---|---:|---|
| 0 | 0 | 0 | `0! = 1` has no trailing zero |
| 4 | 1 (`4/5 = 0`) | 0 | no multiple of 5 in `1..4` |

## Java Solution

See [`FactorialTrailingZeroes.java`](./FactorialTrailingZeroes.java).

```java
public static int trailingZeroes(int n) {
    int zeroes = 0;
    while (n > 0) {
        n /= 5;
        zeroes += n;
    }
    return zeroes;
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(log₅ n) | one round per power of 5 |
| **Space** | O(1) | one counter |

## Interview Notes

**Follow-ups to raise yourself:**
- *"How many trailing zeroes does `n!` have in base b?"* → sum `n / b^k` over all
  powers `b^k`.
- *"Why not count the 2s as well?"* → because there are always at least as many 2s:
  the multiples of 2 outnumber the multiples of 5.
- *"What if `n` is huge (up to 10¹⁸)?"* → the loop still works, but use `long` for
  `n`.

**Common mistakes:**
- ❌ Counting only `n / 5` and forgetting the multiples of 25, 125, …
- ❌ Computing `n!` explicitly — it overflows immediately and is astronomically slow.
- ❌ Looping `while (n > 0)` and dividing by 5 **after** adding — the order matters:
  divide first, then add.

**How to narrate:**
> "A trailing zero needs a 2 and a 5, and a factorial has plenty of 2s, so I only have
> to count the 5s. There are `n/5` multiples of 5, `n/25` multiples of 25 that each
> give one extra 5, and so on — so I divide by 5 repeatedly and add the quotients."

## Related Problems

- [Largest Prime Factor](./LargestPrimeFactor.md) — factoring a number
- [Detect Prime](./DetectPrime.md) — primality by trial division
- [Sieve of Eratosthenes](./SieveOfEratosthenes.md) — primes up to a bound
