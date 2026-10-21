---
title: Largest Prime Factor
leetcode: null
difficulty: Medium
patterns: [Number theory, Trial division]
companies: [Amazon, Bloomberg]
frequency: 2
tags: [math, numbers]
sampleInput: |
  13195
sampleOutput: "29"
---

# Largest Prime Factor

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Number theory · Trial division |
| **Interview heat** | ★★☆☆☆ |
| **Asked at** | Amazon, Google, Meta |

## Problem Statement

Return the **largest prime factor** of a number.

- `13195 = 5 × 7 × 13 × 29` → the answer is `29`.
- `600851475143 = 71 × 839 × 1471 × 6857` → the answer is `6857`.
- Numbers below 2 have no prime factor — the answer is `-1`.

## Input Format

The program reads from standard input:

```
n
```

- `n` — the number to factorise (1 ≤ n ≤ 2³¹ - 1)

## Sample Input

```
13195
```

## Expected Output

```
29
```

## Approach — divide out the factors as long as possible

Walk a candidate factor `d` from `2` upwards while `d² ≤ remaining`:

- while `d` divides `remaining`, divide it out and remember `d` as the latest factor
  removed;
- move on to the next `d`.

When the loop ends, `remaining` is either `1` (everything was divided out) or a
**prime** number larger than every factor that was removed — in that case it is the
answer.

**Why the leftover is prime:** the loop stops at the first `d` with `d² > remaining`.
If `remaining` were composite it would have a factor `p ≤ √remaining < d`, and `p`
would have been tried earlier and divided out — contradiction. So `remaining` is prime.
And because the factors are removed in increasing order, `remaining` is larger than
every factor removed before it.

## Dry Run

Input: `n = 13195`, `remaining = 13195`

| Step | factor `d` | `d² ≤ remaining`? | `remaining % d` | action | `remaining` after | largest |
|---:|---:|---|---|---|---:|---:|
| 1 | 2 | `4 ≤ 13195` ✓ | 1 | not divisible | 13195 | -1 |
| 2 | 3 | `9 ≤ 13195` ✓ | `13195 % 3 = 1` | not divisible | 13195 | -1 |
| 3 | 4 | `16 ≤ 13195` ✓ | 3 | not divisible | 13195 | -1 |
| 4 | 5 | `25 ≤ 13195` ✓ | **0** | divide out → `13195 / 5 = 2639` | 2639 | 5 |
| 5 | 5 | `25 ≤ 2639` ✓ | `2639 % 5 = 4` | not divisible | 2639 | 5 |
| 6 | 6 | `36 ≤ 2639` ✓ | 5 | not divisible | 2639 | 5 |
| 7 | 7 | `49 ≤ 2639` ✓ | **0** | divide out → `2639 / 7 = 377` | 377 | 7 |
| 8 | 8 | `64 ≤ 377` ✓ | 1 | not divisible | 377 | 7 |
| 9 | 9 | `81 ≤ 377` ✓ | 8 | not divisible | 377 | 7 |
| 10 | 10 | `100 ≤ 377` ✓ | 7 | not divisible | 377 | 7 |
| 11 | 11 | `121 ≤ 377` ✓ | 3 | not divisible | 377 | 7 |
| 12 | 12 | `144 ≤ 377` ✓ | 5 | not divisible | 377 | 7 |
| 13 | 13 | `169 ≤ 377` ✓ | **0** | divide out → `377 / 13 = 29` | 29 | 13 |
| 14 | 14 | `196 ≤ 29`? **no** | — | loop ends, `remaining = 29 > 1` | 29 | **29** |

Answer: **29** ✓

## Java Solution

See [`LargestPrimeFactor.java`](./LargestPrimeFactor.java).

```java
public static int largestPrimeFactor(int n) {
    if (n < 2) {
        return -1;
    }
    int largest = -1;
    int remaining = n;
    for (int factor = 2; (long) factor * factor <= remaining; factor++) {
        while (remaining % factor == 0) {
            largest = factor;
            remaining /= factor;
        }
    }
    if (remaining > 1) {
        largest = remaining;
    }
    return largest;
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(√n) | the factor only grows to √n |
| **Space** | O(1) | two counters |

## Interview Notes

**Follow-ups to raise yourself:**
- *"Return the full factorisation."* → collect the factors in a list.
- *"Return the number of distinct prime factors."* → count how often `largest` changes.
- *"How fast can you factorise a 64-bit number?"* → Pollard's rho, a probabilistic
  algorithm; that is a great follow-up for a systems interview.

**Common mistakes:**
- ❌ Forgetting that the same factor can appear several times (`12 = 2 × 2 × 3`) — the
  inner `while` loop handles that.
- ❌ Returning the last factor tried instead of the largest factor found.
- ❌ Forgetting the leftover: `n = 29` has no divisor `≤ √29`, so the loop never runs
  and the answer comes from the leftover.

**How to narrate:**
> "I divide out every factor as often as it occurs while the candidate factor squared
> is still at most the remaining number. Because the factors are removed in increasing
> order, the last one I removed is the largest prime factor — and whatever is left
> over at the end is either 1 or a prime that is even larger."

## Related Problems

- [Is a Number Prime](./DetectPrime.md) — the same trial division loop
- [Count Primes](./SieveOfEratosthenes.md) — primes for a whole range
- [Perfect Number](./PerfectNumber.md) — working with all divisors
