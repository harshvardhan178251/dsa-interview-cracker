---
title: Count Primes
leetcode: 204
difficulty: Medium
patterns: [Number theory, Sieve of Eratosthenes]
companies: [Amazon, Google, Airbnb, Bloomberg, ByteDance, Cognizant, Infosys, Bosch]
frequency: 4
tags: [math, sieve, arrays]
sampleInput: |
  20
sampleOutput: "8"
---

# Count Primes — LeetCode 204

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Number theory · Sieve of Eratosthenes |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Uber, Microsoft |

## Problem Statement

Count the prime numbers that are **smaller than or equal to** `n`.

For `n = 20` the primes are `2, 3, 5, 7, 11, 13, 17, 19` — eight of them.

## Input Format

The program reads from standard input:

```
n
```

- `n` — the upper bound (0 ≤ n ≤ 5 × 10⁶)

## Sample Input

```
20
```

## Expected Output

```
8
```

## Approach — the sieve of Eratosthenes

Instead of testing every number separately (O(n√n)), cross out the multiples of each
prime:

1. Start at `2` and walk upwards.
2. If the current number is not yet crossed out, it is prime: count it and cross out
   its multiples `i², i²+i, i²+2i, …`.

**Why start at `i²`?** Every multiple of `i` below `i²` has a smaller prime factor and
was already crossed out when that smaller prime was processed. Crossing it out again
would be wasted work.

**Why the sieve is complete:** every composite number `m` has a prime factor `p ≤ √m`.
When the sieve reaches `p`, the multiple `m` is crossed out (either directly or via a
smaller multiple of `p`). So exactly the primes survive, and every number below `p²`
that is a multiple of `p` was already handled — no composite escapes.

## Dry Run

Input: `n = 20`

| Step | `i` | crossed out? | action | numbers crossed out | count |
|---:|---:|---|---|---|---:|
| 1 | 2 | no | prime → cross out `4, 6, 8, 10, 12, 14, 16, 18, 20` | 4, 6, 8, 10, 12, 14, 16, 18, 20 | 1 |
| 2 | 3 | no | prime → cross out `9, 12, 15, 18` | 9, 15 | 2 |
| 3 | 4 | yes (`4 = 2²`) | skip | — | 2 |
| 4 | 5 | no | prime → cross out `25 > 20` (none) | — | 3 |
| 5 | 6 | yes | skip | — | 3 |
| 6 | 7 | no | prime → `49 > 20` (none) | — | 4 |
| 7 | 8 | yes | skip | — | 4 |
| 8 | 9 | yes (`9 = 3²`) | skip | — | 4 |
| 9 | 10 | yes | skip | — | 4 |
| 10 | 11 | no | prime → none | — | 5 |
| 11 | 12 | yes | skip | — | 5 |
| 12 | 13 | no | prime | — | 6 |
| 13 | 14 | yes | skip | — | 6 |
| 14 | 15 | yes | skip | — | 6 |
| 15 | 16 | yes | skip | — | 6 |
| 16 | 17 | no | prime | — | 7 |
| 17 | 18 | yes | skip | — | 7 |
| 18 | 19 | no | prime | — | 8 |
| 19 | 20 | yes | skip | — | 8 |

Count = **8** ✓

## Java Solution

See [`SieveOfEratosthenes.java`](./SieveOfEratosthenes.java).

```java
public static int countPrimes(int n) {
    if (n < 3) {
        return 0;
    }
    boolean[] composite = new boolean[n + 1];
    int count = 0;
    for (int i = 2; i <= n; i++) {
        if (composite[i]) {
            continue;
        }
        count++;
        for (int multiple = i * i; multiple <= n; multiple += i) {
            composite[multiple] = true;
        }
    }
    return count;
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n log log n) | each prime crosses out n/p multiples |
| **Space** | O(n) | the `composite` array (a bitset would use n/8 bytes) |

## Interview Notes

**Follow-ups to raise yourself:**
- *"List the primes instead of counting them."* → collect them in a list.
- *"What if n = 10⁸?"* → a segmented sieve, or a bitset with odd numbers only.
- *"Why is it O(n log log n) and not O(n log n)?"* → the harmonic series over the
  primes grows like log log n.

**Common mistakes:**
- ❌ Starting the inner loop at `i` instead of `i²` — every multiple is crossed out
  twice, which does not break the result but loses the complexity bound.
- ❌ Forgetting `0` and `1` — they are not prime; the loop starts at 2.
- ❌ Marking `composite[0]` and `composite[1]` as composite but then counting them —
  the loop must not start before 2.

**How to narrate:**
> "I use the sieve of Eratosthenes: I walk over the numbers and, whenever I find one
> that has not been crossed out, it is prime — I count it and cross out its multiples
> starting at its square, because the smaller multiples were already handled by
> smaller primes."

## Related Problems

- [Is a Number Prime](./DetectPrime.md) — testing a single number
- [Largest Prime Factor](./LargestPrimeFactor.md) — factorising a number
- [Factorial Trailing Zeroes](./FactorialTrailingZeroes.md) — counting prime factors
